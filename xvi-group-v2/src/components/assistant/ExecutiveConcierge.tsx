import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { loadMemory } from '../../hooks/executiveMemory';
import styles from './ExecutiveConcierge.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];
const ROBOT_SIZE = 64;
const SEEN_KEY = 'xviConciergeSeen';
const SESSION_KEY = 'xvi-concierge-session';
const GREET_DELAY = 2600;
const GREET_HOLD_MS = 3800;

type Phase = 'hidden' | 'arrive' | 'greet' | 'minimize' | 'robot';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function cornerPos(rtl: boolean) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return { x: rtl ? vw - ROBOT_SIZE - 16 : 16, y: vh - ROBOT_SIZE - 16 };
}

function heroRobotPos(rtl: boolean) {
  const vw = window.innerWidth;
  const y = Math.max(120, Math.min(340, Math.round(window.innerHeight * 0.24)));
  return { x: rtl ? vw - ROBOT_SIZE - 190 : 190, y };
}

export function ExecutiveConcierge() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>('hidden');
  const [robotPos, setRobotPos] = useState(() => cornerPos(isRTL));
  const [robotOffset, setRobotOffset] = useState({ x: 0, y: 0, scale: 1, opacity: 1 });
  const [dockOpen, setDockOpen] = useState(false);
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const robotRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const onceRef = useRef(false);
  const heroYieldRef = useRef(false);
  const seenState = useRef({
    ever: localStorage.getItem(SEEN_KEY) === 'true',
    session: sessionStorage.getItem(SESSION_KEY) === 'true',
  }).current;
  const memoryRef = useRef(loadMemory()).current;

  // Initialise once: corner robot for repeat/other-page visits.
  useEffect(() => {
    if (seenState.ever || seenState.session) {
      setPhase('robot');
      setRobotOffset({ x: 0, y: 0, scale: 1, opacity: 1 });
      return;
    }
    if (location.pathname !== '/') {
      setPhase('robot');
      setRobotOffset({ x: 0, y: 0, scale: 1, opacity: 1 });
      return;
    }
    setPhase('arrive');
  }, [location.pathname, seenState]);

  const startMinimize = useCallback(() => {
    if (phaseRef.current === 'minimize' || phaseRef.current === 'robot') return;
    setTooltipVisible(false);
    setPhase('minimize');
    setRobotOffset({ x: 0, y: 0, scale: 1, opacity: 1 });
  }, []);

  // Single robot entry: as the floating concierge arrives at the hero position,
  // the Hero robot yields so only one robot represents the AI during the greeting.
  useEffect(() => {
    if (phase !== 'arrive' || heroYieldRef.current) return;
    if (location.pathname !== '/') return;
    heroYieldRef.current = true;
    window.dispatchEvent(new CustomEvent('xvi:hero-robot-transition'));
  }, [phase, location.pathname]);

  // First visit: after arrival, auto-show the greeting, then settle to the corner.
  useEffect(() => {
    if (phase !== 'arrive') return;
    if (onceRef.current) return;
    onceRef.current = true;
    if (!(seenState.ever || seenState.session) && location.pathname === '/') {
      try {
        localStorage.setItem(SEEN_KEY, 'true');
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // ignore
      }
    }
    const t = setTimeout(() => {
      setTooltipVisible(true);
      setPhase('greet');
    }, GREET_DELAY);
    return () => clearTimeout(t);
  }, [phase, location.pathname, seenState]);

  // Auto-minimize after the greeting moment.
  useEffect(() => {
    if (phase !== 'greet') return;
    const t = setTimeout(() => startMinimize(), GREET_HOLD_MS);
    return () => clearTimeout(t);
  }, [phase, startMinimize]);

  const heroPos = useRef(heroRobotPos(isRTL));

  useEffect(() => {
    const onVoice = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      setListening(Boolean(d.listening));
      setSpeaking(Boolean(d.speaking));
      setThinking(Boolean(d.thinking));
    };
    window.addEventListener('xvi:voice-state', onVoice);
    return () => window.removeEventListener('xvi:voice-state', onVoice);
  }, []);

  const openDock = useCallback(() => {
    window.dispatchEvent(new CustomEvent('xvi:open-ai-dock'));
  }, []);

  // React to dock open/close so the robot never overlaps the AI panel.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setDockOpen(!!detail?.open);
    };
    window.addEventListener('xvi:ai-dock-state', handler);
    return () => window.removeEventListener('xvi:ai-dock-state', handler);
  }, []);

  // Keep the robot inside the viewport on resize.
  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setRobotPos((p) => ({
        x: clamp(p.x, 8, vw - ROBOT_SIZE - 8),
        y: clamp(p.y, 8, vh - ROBOT_SIZE - 8),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onRobotPointerDown = useCallback((e: React.PointerEvent) => {
    if (dockOpen) return;
    if (phaseRef.current === 'arrive' || phaseRef.current === 'greet') return;
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: robotPos.x, oy: robotPos.y, moved: false };
    setDragging(true);

    const onMove = (ev: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.sx;
      const dy = ev.clientY - d.sy;
      if (!d.moved && Math.hypot(dx, dy) > 5) d.moved = true;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setRobotPos({
        x: clamp(d.ox + dx, 8, vw - ROBOT_SIZE - 8),
        y: clamp(d.oy + dy, 8, vh - ROBOT_SIZE - 8),
      });
    };
    const onUp = () => {
      const d = dragRef.current;
      dragRef.current = null;
      setDragging(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (d && !d.moved) openDock();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [dockOpen, robotPos, openDock]);

  const onRobotHover = useCallback((e: React.MouseEvent) => {
    if (dragRef.current) return;
    const el = robotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > 140) {
      setMag({ x: 0, y: 0 });
      return;
    }
    const strength = (1 - dist / 140) * 7;
    setMag({ x: clamp(dx * 0.15, -strength, strength), y: clamp(dy * 0.15, -strength, strength) });
  }, []);

  const isGreeting = phase === 'arrive' || phase === 'greet';
  const showRobot = phase !== 'hidden';
  const corner = cornerPos(isRTL);
  const greetingFlow = useRef(!(seenState.ever || seenState.session) && location.pathname === '/').current;
  const heroOffset = {
    x: heroPos.current.x - corner.x,
    y: heroPos.current.y - corner.y,
  };

  const robotStateClass = [
    dragging ? styles.dragging : '',
    listening ? styles.listening : '',
    speaking ? styles.speaking : '',
    thinking ? styles.thinking : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.concierge}>
      {/* Floating robot — the single Executive AI entry point */}
      <AnimatePresence>
        {showRobot && (
          <motion.div
            ref={robotRef}
            className={`${styles.robot} ${robotStateClass}`}
            style={{ left: robotPos.x, top: robotPos.y, pointerEvents: dockOpen ? 'none' : 'auto' }}
            initial={{
              x: greetingFlow ? heroOffset.x : 0,
              y: greetingFlow ? heroOffset.y : 0,
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              x: isGreeting ? heroOffset.x : robotOffset.x,
              y: isGreeting ? heroOffset.y : robotOffset.y,
              scale: dockOpen ? 0.4 : robotOffset.scale,
              opacity: dockOpen ? 0 : robotOffset.opacity,
            }}
             transition={isGreeting ? { duration: 1.2, ease } : phase === 'minimize' ? { duration: 1.2, ease: [0.16, 0.8, 0.3, 1] } : { duration: 0.6, ease }}
            onPointerDown={onRobotPointerDown}
            onMouseMove={onRobotHover}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => { setTooltipVisible(false); setMag({ x: 0, y: 0 }); }}
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDock();
              }
            }}
             aria-label={isRTL ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}
             role="button"
             tabIndex={0}
           >
             <div className={`${styles.tooltip} ${tooltipVisible ? styles.tooltipShow : ''}`}>
               {memoryRef.name
                 ? isRTL
                   ? `مرحباً بعودتك، ${memoryRef.name}`
                   : `Welcome back, ${memoryRef.name}`
                 : isRTL ? 'كيف يمكنني مساعدتك؟' : 'Need help?'}
             </div>
             <div className={styles.floorShadow} />
            <motion.div
              className={styles.mag}
              animate={{ x: mag.x, y: mag.y }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
               <div className={styles.glow} />
              <svg className={styles.head} viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="xviFace" x1="32" y1="10" x2="32" y2="52" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.55" stopColor="#f8f6f1" />
                    <stop offset="1" stopColor="#efede6" />
                  </linearGradient>
                </defs>
                <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(17,17,17,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="5" r="2.5" fill="#c8a65a" stroke="rgba(17,17,17,0.35)" strokeWidth="0.75" />
                <rect x="8" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.35)" strokeWidth="1" />
                <rect x="50" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.35)" strokeWidth="1" />
                <path
                  d="M20 12 H44 A10 10 0 0 1 54 22 V36 A14 14 0 0 1 40 50 H24 A14 14 0 0 1 10 36 V22 A10 10 0 0 1 20 12 Z"
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth="1.5"
                  fill="url(#xviFace)"
                />
                <g className={styles.eyes}>
                  <rect x="20" y="24" width="8" height="9" rx="3.5" fill="#c8a65a" stroke="rgba(0,0,0,0.3)" strokeWidth="0.75" />
                  <rect x="36" y="24" width="8" height="9" rx="3.5" fill="#c8a65a" stroke="rgba(0,0,0,0.3)" strokeWidth="0.75" />
                  <g className={styles.pupils}>
                    <circle cx="24.5" cy="28.5" r="1.6" fill="#ffffff" />
                    <circle cx="40.5" cy="28.5" r="1.6" fill="#ffffff" />
                  </g>
                </g>
                <path className={styles.mouth} d="M26 40 H38" stroke="rgba(17,17,17,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
