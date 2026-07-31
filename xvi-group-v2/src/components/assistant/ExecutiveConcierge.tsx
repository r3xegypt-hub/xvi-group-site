import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Rocket, Bot } from 'lucide-react';
import styles from './ExecutiveConcierge.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];
const ROBOT_SIZE = 56;
const SEEN_KEY = 'xviConciergeSeen';
const GREETING_MS = 7000;

type Phase = 'hidden' | 'enter' | 'minimize' | 'robot';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function cornerPos(rtl: boolean) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return { x: rtl ? vw - ROBOT_SIZE - 16 : 16, y: vh - ROBOT_SIZE - 16 };
}

function heroTop() {
  return Math.max(120, Math.min(340, Math.round(window.innerHeight * 0.26)));
}

interface ConciergeAction {
  icon: typeof Rocket;
  label: string;
  to?: string;
  dock?: boolean;
}

export function ExecutiveConcierge() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const navigate = useNavigate();
  const location = useLocation();

  const seenRef = useRef(localStorage.getItem(SEEN_KEY) === 'true');
  const [phase, setPhase] = useState<Phase>(seenRef.current ? 'robot' : 'hidden');
  const [cardTop, setCardTop] = useState(heroTop);
  const [robotPos, setRobotPos] = useState(() => cornerPos(isRTL));
  const [dockOpen, setDockOpen] = useState(false);
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [minimize, setMinimize] = useState({ x: 0, y: 0, active: false });
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  useEffect(() => {
    const onVoice = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      setListening(Boolean(d.listening));
      setSpeaking(Boolean(d.speaking));
    };
    window.addEventListener('xvi:voice-state', onVoice);
    return () => window.removeEventListener('xvi:voice-state', onVoice);
  }, []);

  const openDock = useCallback(() => {
    window.dispatchEvent(new CustomEvent('xvi:open-ai-dock'));
  }, []);

  const startMinimize = useCallback(() => {
    setPhase('minimize');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cornerX = isRTL ? vw - ROBOT_SIZE - 16 : 16;
    const cornerY = vh - ROBOT_SIZE - 16;
    const r = cardRef.current ? cardRef.current.getBoundingClientRect() : { left: 16, top: cardTop, width: 300 };
    setMinimize({ x: cornerX - r.left, y: cornerY - r.top, active: true });
  }, [isRTL, cardTop]);

  // First-visit flow: greet on the homepage, otherwise go straight to robot.
  useEffect(() => {
    if (seenRef.current) return;
    localStorage.setItem(SEEN_KEY, 'true');
    if (location.pathname === '/') {
      const t = setTimeout(() => {
        setCardTop(heroTop());
        setPhase('enter');
      }, 700);
      return () => clearTimeout(t);
    }
    setPhase('robot');
  }, [location.pathname]);

  // Auto-minimize after the greeting window.
  useEffect(() => {
    if (phase !== 'enter') return;
    const t = setTimeout(() => startMinimize(), GREETING_MS);
    return () => clearTimeout(t);
  }, [phase, startMinimize]);

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

  const handleAction = useCallback((action: ConciergeAction) => {
    startMinimize();
    if (action.dock) {
      openDock();
    } else if (action.to) {
      navigate(action.to);
    }
  }, [startMinimize, openDock, navigate]);

  const actions: ConciergeAction[] = isRTL
    ? [
        { icon: Rocket, label: 'ابدأ مشروعًا', to: '/contact' },
        { icon: Bot, label: 'استشارة ذكاء اصطناعي', dock: true },
      ]
    : [
        { icon: Rocket, label: 'Start a Project', to: '/contact' },
        { icon: Bot, label: 'AI Consultation', dock: true },
      ];

  const showCard = phase === 'enter' || phase === 'minimize';
  const showRobot = phase === 'minimize' || phase === 'robot';

  return (
    <div className={styles.concierge}>
      {showCard && (
        <motion.div
          ref={cardRef}
          className={styles.card}
          style={{ left: isRTL ? 'auto' : 16, right: isRTL ? 16 : 'auto', top: cardTop }}
          initial={{ x: isRTL ? 420 : -420, opacity: 0 }}
          animate={
            minimize.active
              ? { x: minimize.x, y: minimize.y, scale: 0.1, opacity: 0 }
              : { x: 0, y: 0, scale: 1, opacity: 1 }
          }
          transition={
            minimize.active
              ? { duration: 0.9, ease }
              : { duration: 0.7, ease }
          }
          onAnimationComplete={
            minimize.active
              ? () => {
                  setPhase('robot');
                  setMinimize((m) => ({ ...m, active: false }));
                }
              : undefined
          }
        >
          <div className={styles.cardHead}>
            <div className={styles.cardHeadIcon}>
              <Bot size={18} />
            </div>
            <span className={styles.cardHeadLabel}>
              {isRTL ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={styles.cardTitle}
          >
            {isRTL ? 'مرحبًا بك في XVI GROUP' : 'Welcome to XVI GROUP'}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={styles.cardSub}
          >
            {isRTL ? 'أنا المستشار التنفيذي الذكي.' : "I'm your Executive AI Consultant."}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={styles.actions}
          >
            {actions.map((a) => (
              <motion.button
                key={a.label}
                className={styles.action}
                onClick={() => handleAction(a)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <a.icon size={16} />
                <span style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>{a.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}

      {showRobot && (
        <motion.div
          ref={robotRef}
          className={`${styles.robot}${dragging ? ` ${styles.dragging}` : ''}${listening ? ` ${styles.listening}` : ''}${speaking ? ` ${styles.speaking}` : ''}`}
          style={{ left: robotPos.x, top: robotPos.y, pointerEvents: dockOpen ? 'none' : 'auto' }}
          initial={{ scale: phase === 'minimize' ? 0 : 1, opacity: phase === 'minimize' ? 0 : 1 }}
          animate={{ scale: dockOpen ? 0.4 : 1, opacity: dockOpen ? 0 : 1 }}
          transition={{ duration: 0.45, ease }}
          onPointerDown={onRobotPointerDown}
          onMouseMove={onRobotHover}
          onMouseLeave={() => setMag({ x: 0, y: 0 })}
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
          <motion.div
            className={styles.mag}
            animate={{ x: mag.x, y: mag.y }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className={styles.glow} />
            <svg className={styles.head} viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="xviHolo" x1="10" y1="10" x2="54" y2="50">
                  <stop stopColor="#e8cf8f" />
                  <stop offset="1" stopColor="#c8a65a" />
                </linearGradient>
              </defs>
              <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(200,166,90,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="32" cy="5" r="2.5" fill="#c8a65a" />
              <rect x="8" y="24" width="6" height="12" rx="3" stroke="rgba(200,166,90,0.35)" fill="rgba(200,166,90,0.06)" />
              <rect x="50" y="24" width="6" height="12" rx="3" stroke="rgba(200,166,90,0.35)" fill="rgba(200,166,90,0.06)" />
              <path
                d="M20 12 H44 A10 10 0 0 1 54 22 V36 A14 14 0 0 1 40 50 H24 A14 14 0 0 1 10 36 V22 A10 10 0 0 1 20 12 Z"
                stroke="url(#xviHolo)"
                strokeWidth="1.4"
                fill="rgba(200,166,90,0.05)"
              />
              <g className={styles.eyes}>
                <rect x="20" y="24" width="8" height="9" rx="3.5" fill="rgba(200,166,90,0.85)" />
                <rect x="36" y="24" width="8" height="9" rx="3.5" fill="rgba(200,166,90,0.85)" />
              </g>
              <path d="M26 40 H38" stroke="rgba(200,166,90,0.35)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
