import { useEffect, useRef, useState } from 'react';
import { useMotion } from '../../../motion/providers/MotionProvider';
import styles from './HeroRobot.module.scss';

type RobotState = 'idle' | 'listening' | 'speaking';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const SACCADE_TARGETS = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: -1.1, y: -0.7 },
  { x: 1.1, y: -0.7 },
  { x: -1.0, y: 0.9 },
  { x: 1.0, y: 0.9 },
  { x: 0, y: -1.3 },
];

export function HeroRobot() {
  const { prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const [state, setState] = useState<RobotState>('idle');

  // Mirror the Executive AI voice state so the hero robot reacts live.
  useEffect(() => {
    const onVoice = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      setState(d.speaking ? 'speaking' : d.listening ? 'listening' : 'idle');
    };
    window.addEventListener('xvi:voice-state', onVoice);
    return () => window.removeEventListener('xvi:voice-state', onVoice);
  }, []);

  // Autonomous eyes: idle saccades + pointer gaze-follow, driven by rAF and
  // applied to the SVG pupils so they stay inside their sockets.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = sceneRef.current;
    const pupils = pupilsRef.current;
    if (!el || !pupils) return;

    let raf = 0;
    let nextSaccade = performance.now() + 1600 + Math.random() * 2400;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let look = { x: 0, y: 0 };

    const pick = () => {
      target = SACCADE_TARGETS[(Math.random() * SACCADE_TARGETS.length) | 0];
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        look = { x: 0, y: 0 };
        return;
      }
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      look = { x: dx * 1.8, y: dy * 2 };
    };

    pick();
    const tick = (now: number) => {
      if (now > nextSaccade) {
        pick();
        nextSaccade = now + 2400 + Math.random() * 3600;
      }
      const tx = clamp(target.x + look.x, -1.3, 1.3);
      const ty = clamp(target.y + look.y, -1.6, 1.6);
      current.x += (tx - current.x) * 0.12;
      current.y += (ty - current.y) * 0.12;
      pupils.setAttribute('transform', `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={sceneRef} className={styles.scene} data-state={state} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.orbit}>
        <span className={styles.orbitArc} />
      </div>
      <div className={styles.drone}>
        <div className={styles.body} />
        <svg className={styles.head} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="xviHeroFace" x1="32" y1="10" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#f8f6f1" />
              <stop offset="1" stopColor="#efede6" />
            </linearGradient>
          </defs>
          <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(17,17,17,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <circle className={styles.antennaTip} cx="32" cy="5" r="2.5" fill="#c8a65a" stroke="rgba(17,17,17,0.3)" strokeWidth="0.75" />
          <rect className={styles.ear} x="8" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
          <rect className={styles.ear} x="50" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
          <path
            d="M20 12 H44 A10 10 0 0 1 54 22 V36 A14 14 0 0 1 40 50 H24 A14 14 0 0 1 10 36 V22 A10 10 0 0 1 20 12 Z"
            stroke="rgba(17,17,17,0.4)"
            strokeWidth="1.5"
            fill="url(#xviHeroFace)"
          />
          <g className={styles.brows}>
            <path d="M19 20 H27" stroke="rgba(17,17,17,0.3)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M37 20 H45" stroke="rgba(17,17,17,0.3)" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          <g className={styles.eyes}>
            <rect className={styles.eye} x="19" y="24" width="9" height="10" rx="4.5" fill="rgba(17,17,17,0.55)" />
            <rect className={styles.eye} x="36" y="24" width="9" height="10" rx="4.5" fill="rgba(17,17,17,0.55)" />
            <g ref={pupilsRef}>
              <circle cx="23.5" cy="29" r="2.6" fill="#e3c27a" />
              <circle cx="40.5" cy="29" r="2.6" fill="#e3c27a" />
              <circle cx="23.5" cy="29" r="1.1" fill="#8a5f13" />
              <circle cx="40.5" cy="29" r="1.1" fill="#8a5f13" />
            </g>
          </g>
          <path className={styles.mouthIdle} d="M26 43 C29 45 35 45 38 43" stroke="rgba(17,17,17,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          <g className={styles.mouthBars}>
            <rect x="25" y="40.5" width="3" height="5" rx="1.5" fill="#c8a65a" />
            <rect x="29.3" y="40.5" width="3" height="5" rx="1.5" fill="#c8a65a" />
            <rect x="33.6" y="40.5" width="3" height="5" rx="1.5" fill="#c8a65a" />
            <rect x="37.9" y="40.5" width="3" height="5" rx="1.5" fill="#c8a65a" />
          </g>
        </svg>
      </div>
      <div className={styles.holoBase}>
        <span className={styles.holoRing} />
        <span className={styles.holoRing2} />
        <div className={styles.holoParticles}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className={styles.holoScan} />
        <span className={styles.holoCore} />
        <div className={styles.holoEQ}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
