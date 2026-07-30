import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];
const dockBottom = 24;
const aiTargetY = 999; // Will be computed as viewport height - dock offset

// ============================================
// Sound Engine — Web Audio API
// ============================================

function useAudioLogo() {
  const ctxRef = useRef<AudioContext | null>(null);
  const playingRef = useRef(false);

  const play = useCallback(() => {
    if (playingRef.current) return;
    playingRef.current = true;
    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.linearRampToValueAtTime(0.02, now + 2);
      master.gain.setValueAtTime(0.02, now + 8);
      master.gain.linearRampToValueAtTime(0.001, now + 14);
      master.connect(ctx.destination);

      // Ambient pad
      const p = ctx.createOscillator(); const pg = ctx.createGain(); const pf = ctx.createBiquadFilter();
      p.type = 'sawtooth'; p.frequency.setValueAtTime(55, now); p.frequency.linearRampToValueAtTime(65, now + 6);
      pg.gain.setValueAtTime(0.01, now); pg.gain.linearRampToValueAtTime(0.04, now + 3);
      pg.gain.setValueAtTime(0.04, now + 10); pg.gain.linearRampToValueAtTime(0.001, now + 14);
      pf.type = 'lowpass'; pf.frequency.setValueAtTime(200, now); pf.frequency.linearRampToValueAtTime(350, now + 6);
      p.connect(pf).connect(pg).connect(master); p.start(now); p.stop(now + 14);

      // Sub bass
      const sub = ctx.createOscillator(); const sg = ctx.createGain();
      sub.type = 'sine'; sub.frequency.setValueAtTime(27.5, now); sub.frequency.linearRampToValueAtTime(32.5, now + 8);
      sg.gain.setValueAtTime(0.001, now); sg.gain.linearRampToValueAtTime(0.015, now + 4);
      sg.gain.setValueAtTime(0.015, now + 10); sg.gain.linearRampToValueAtTime(0.001, now + 14);
      sub.connect(sg).connect(master); sub.start(now); sub.stop(now + 14);

      // Rising tone
      const r = ctx.createOscillator(); const rg = ctx.createGain();
      r.type = 'sine'; r.frequency.setValueAtTime(120, now + 2); r.frequency.linearRampToValueAtTime(440, now + 6);
      rg.gain.setValueAtTime(0.001, now); rg.gain.linearRampToValueAtTime(0.02, now + 4);
      rg.gain.linearRampToValueAtTime(0.001, now + 7);
      r.connect(rg).connect(master); r.start(now + 2); r.stop(now + 7);

      // Chime at logo reveal
      const c = ctx.createOscillator(); const cg = ctx.createGain();
      c.type = 'sine'; c.frequency.setValueAtTime(880, now + 5.8); c.frequency.exponentialRampToValueAtTime(1760, now + 6.3);
      cg.gain.setValueAtTime(0.001, now); cg.gain.linearRampToValueAtTime(0.04, now + 6);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 8);
      c.connect(cg).connect(master); c.start(now + 5.8); c.stop(now + 8);

      // Wind texture
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / buf.length, 0.3);
      const n = ctx.createBufferSource(); const ng = ctx.createGain(); const nf = ctx.createBiquadFilter();
      n.buffer = buf; n.loop = true; nf.type = 'bandpass'; nf.frequency.setValueAtTime(300, now); nf.Q.setValueAtTime(0.5, now);
      ng.gain.setValueAtTime(0.001, now); ng.gain.linearRampToValueAtTime(0.006, now + 3);
      ng.gain.setValueAtTime(0.006, now + 10); ng.gain.linearRampToValueAtTime(0.001, now + 14);
      n.connect(nf).connect(ng).connect(master); n.start(now); n.stop(now + 14);
    } catch { /* audio unavailable */ }
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (ctxRef.current) { try { ctxRef.current.close(); } catch { /* */ } ctxRef.current = null; }
  }, []);

  useEffect(() => () => stop(), [stop]);
  return { play, stop };
}

// ============================================
// Particles
// ============================================

interface Particle { id: number; x: number; y: number; tx: number; ty: number; size: number; delay: number; dur: number }

function genParticles(count: number): Particle[] {
  const cx = 50, cy = 42;
  return Array.from({ length: count }, (_, i) => {
    const a = Math.random() * Math.PI * 2;
    const d = 2 + Math.random() * 18;
    return {
      id: i,
      x: 50 + (Math.random() - 0.5) * 100,
      y: 50 + (Math.random() - 0.5) * 80,
      tx: cx + d * Math.cos(a),
      ty: cy + d * Math.sin(a),
      size: 0.6 + Math.random() * 1.6,
      delay: Math.random() * 0.8,
      dur: 1.2 + Math.random() * 0.8,
    };
  });
}

// ============================================
// Official XVI Logo (SVG)
// ============================================

function XVILogo({ phase, isAR }: { phase: string; isAR: boolean }) {
  const show = phase === 'forming' || phase === 'reveal' || phase === 'aiEnter' || phase === 'aiIdle' || phase === 'exit';
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
    >
      {/* Glow behind symbol */}
      <motion.circle
        cx={50} cy={36} r={22}
        fill="none" stroke="#c8a65a" strokeWidth={0.2}
        animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Symbol: rounded square with X */}
      <motion.rect
        x={34} y={20} width={32} height={32} rx={3}
        stroke="#c8a65a" strokeWidth={1} fill="none" strokeOpacity={0.15}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        style={{ transformOrigin: '50px 36px' }}
      />
      <motion.line
        x1={40} y1={26} x2={60} y2={46}
        stroke="#c8a65a" strokeWidth={1.2} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
      />
      <motion.line
        x1={60} y1={26} x2={40} y2={46}
        stroke="#c8a65a" strokeWidth={1.2} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
      />
      <motion.circle
        cx={50} cy={36} r={3} fill="#c8a65a"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: [0, 0.7, 0.4] }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
      />
      <motion.circle
        cx={50} cy={36} r={6} fill="none" stroke="#c8a65a" strokeWidth={0.3}
        animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
      />

      {/* "XVI" text */}
      <motion.text
        x={50} y={67}
        textAnchor="middle"
        fill="#c8a65a"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={9}
        fontWeight={500}
        letterSpacing="0.02em"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
      >
        XVI
      </motion.text>

      {/* "GROUP" text */}
      <motion.text
        x={50} y={77}
        textAnchor="middle"
        fill="#c8a65a"
        fontFamily="'Inter', sans-serif"
        fontSize={3.8}
        fontWeight={500}
        letterSpacing="0.45em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
      >
        GROUP
      </motion.text>
    </motion.g>
  );
}

// ============================================
// Light Sweep
// ============================================

function LightSweep({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ x: '-120%' }}
      animate={active ? { x: '350%' } : { x: '-120%' }}
      transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
      style={{
        position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,166,90,0.04) 25%, rgba(200,166,90,0.09) 45%, rgba(200,166,90,0.04) 65%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
        transform: 'skewX(-12deg)',
      }}
    />
  );
}

// ============================================
// Holographic Executive AI
// ============================================

function HolographicAI({ phase }: { phase: string }) {
  const visible = phase === 'aiEnter' || phase === 'aiIdle' || phase === 'exit';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, filter: 'blur(8px)' }}
      animate={visible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.5, filter: 'blur(8px)' }}
      transition={{ duration: 1.4, ease }}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 200 240" style={{ width: 148, height: 178, filter: 'drop-shadow(0 0 40px rgba(200,166,90,0.1))' }}>
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8a65a" stopOpacity={0.35} />
            <stop offset="50%" stopColor="#d4b76e" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#c8a65a" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8a65a" stopOpacity={0.15} />
            <stop offset="50%" stopColor="#d4b76e" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#c8a65a" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Head shape */}
        <motion.path
          d="M100 20 C136 20 158 42 166 74 L178 138 C182 160 168 180 150 192 L120 212 C110 218 90 218 80 212 L50 192 C32 180 18 160 22 138 L34 74 C42 42 64 20 100 20Z"
          fill="none" stroke="url(#hg)" strokeWidth={0.7}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
        />

        {/* Facial grid */}
        <motion.g opacity={0.1} initial={{ opacity: 0 }} animate={visible ? { opacity: 0.1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          {[70, 90, 110, 130, 150].map(y => <line key={y} x1={55} y1={y} x2={145} y2={y} stroke="#c8a65a" strokeWidth={0.25} />)}
          {[80, 100, 120].map(x => <line key={x} x1={x} y1={36} x2={x} y2={196} stroke="#c8a65a" strokeWidth={0.2} />)}
        </motion.g>

        {/* Center vertical glow line */}
        <motion.line
          x1={100} y1={28} x2={100} y2={204}
          stroke="url(#hg2)" strokeWidth={0.3}
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
        />

        {/* Eyes */}
        <motion.g initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5, delay: 1 }}>
          <motion.path
            d="M70 90 Q78 82 86 90 Q78 98 70 90Z" fill="none" stroke="#c8a65a" strokeWidth={0.7}
            animate={{ d: ['M70 90 Q78 82 86 90 Q78 98 70 90Z', 'M70 90 Q78 84 86 90 Q78 96 70 90Z', 'M70 90 Q78 82 86 90 Q78 98 70 90Z'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle cx={78} cy={90} r={1.2} fill="#c8a65a"
            animate={{ cx: [78, 79, 77, 78], cy: [90, 89, 91, 90] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M114 90 Q122 82 130 90 Q122 98 114 90Z" fill="none" stroke="#c8a65a" strokeWidth={0.7}
            animate={{ d: ['M114 90 Q122 82 130 90 Q122 98 114 90Z', 'M114 90 Q122 84 130 90 Q122 96 114 90Z', 'M114 90 Q122 82 130 90 Q122 98 114 90Z'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />
          <motion.circle cx={122} cy={90} r={1.2} fill="#c8a65a"
            animate={{ cx: [122, 123, 121, 122], cy: [90, 89, 91, 90] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </motion.g>

        {/* Eyebrows — subtle movement */}
        <motion.g initial={{ opacity: 0 }} animate={visible ? { opacity: 0.2 } : { opacity: 0 }} transition={{ duration: 0.5, delay: 1 }}>
          <motion.path d="M68 78 Q78 73 88 78" fill="none" stroke="#c8a65a" strokeWidth={0.4}
            animate={{ d: ['M68 78 Q78 73 88 78', 'M68 77 Q78 72 88 77', 'M68 78 Q78 73 88 78'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path d="M112 78 Q122 73 132 78" fill="none" stroke="#c8a65a" strokeWidth={0.4}
            animate={{ d: ['M112 78 Q122 73 132 78', 'M112 77 Q122 72 132 77', 'M112 78 Q122 73 132 78'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </motion.g>

        {/* Mouth with subtle animation */}
        <motion.path
          d="M86 122 Q100 126 114 122" fill="none" stroke="url(#hg)" strokeWidth={0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        />

        {/* Nose line */}
        <motion.path
          d="M100 98 L100 112" fill="none" stroke="#c8a65a" strokeWidth={0.3} strokeOpacity={0.15}
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />

        {/* Gold reflection sweep on face */}
        <motion.path
          d="M55 50 Q100 38 145 50" fill="none" stroke="#c8a65a" strokeWidth={0.3} strokeOpacity={0.06}
          animate={{ d: ['M55 50 Q100 38 145 50', 'M55 52 Q100 40 145 52', 'M55 50 Q100 38 145 50'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pulse ring */}
        <motion.circle
          cx={100} cy={115} r={80} fill="none" stroke="#c8a65a" strokeWidth={0.25} strokeOpacity={0.05}
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 115px' }}
        />

        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2 + Math.random() * 0.3;
          const d = 65 + Math.random() * 25;
          const ox = Math.cos(a) * d;
          const oy = Math.sin(a) * d + 115;
          return (
            <motion.circle
              key={i}
              cx={100 + ox} cy={oy} r={0.5 + Math.random() * 0.8}
              fill="#c8a65a" opacity={0.06}
              animate={{
                cx: [100 + ox, 100 + ox + (Math.random() - 0.5) * 12, 100 + ox],
                cy: [oy, oy + (Math.random() - 0.5) * 10, oy],
                opacity: [0.06, 0.18, 0.06],
              }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
            />
          );
        })}
      </svg>

      {/* Voice waveform */}
      {(phase === 'aiEnter' || phase === 'aiIdle') && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          style={{ position: 'absolute', bottom: '10%', display: 'flex', alignItems: 'center', gap: 2 }}
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.div
              key={i}
              style={{ width: 2, borderRadius: 2, background: '#c8a65a' }}
              animate={{
                height: [2 + Math.random() * 4, 8 + Math.random() * 16, 2 + Math.random() * 4],
                opacity: [0.1, 0.45, 0.1],
              }}
              transition={{ duration: 0.8 + Math.random() * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// Main Component
// ============================================

interface CinematicExecutiveLaunchProps {
  onFinish: () => void;
}

export function CinematicExecutiveLaunch({ onFinish }: CinematicExecutiveLaunchProps) {
  const { language } = useLanguage();
  const isAR = language === 'ar';
  const [phase, setPhase] = useState<'dawn' | 'forming' | 'reveal' | 'aiEnter' | 'aiIdle' | 'exit'>('dawn');
  const [muted, setMuted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const finishedRef = useRef(false);
  const { play, stop } = useAudioLogo();
  const audioStartedRef = useRef(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const [winH, setWinH] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);

  const particles = useMemo(() => genParticles(65), []);

  useEffect(() => {
    const onResize = () => setWinH(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSkip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    stop();
    setSkipped(true);
    onFinish();
  }, [onFinish, stop]);

  const toggleMute = useCallback(() => setMuted(m => !m), []);

  useEffect(() => {
    if (muted) { stop(); return; }
    if (!audioStartedRef.current && !skipped) {
      audioStartedRef.current = true;
      setTimeout(() => play(), 100);
    }
  }, [muted, skipped, play, stop]);

  useEffect(() => {
    if (skipped) return;
    const t1 = setTimeout(() => setPhase('forming'), 2800);
    const t2 = setTimeout(() => setPhase('reveal'), 5600);
    const t3 = setTimeout(() => setPhase('aiEnter'), 9000);
    const t4 = setTimeout(() => setPhase('aiIdle'), 10400);
    const t5 = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('exit');
        stop();
        setTimeout(onFinish, 1000);
      }
    }, 14600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [skipped, onFinish, stop]);

  const sloganEN = '"Where Intelligence Becomes Strategy"';
  const sloganAR = '"حيث يتحول الذكاء إلى ميزة استراتيجية"';
  const welcomeEN = 'Welcome... Executive Intelligence begins now.';
  const welcomeAR = 'مرحبًا بك... حيث يتحول الذكاء إلى ميزة استراتيجية.';

  const showLogo = phase === 'forming' || phase === 'reveal';
  const showSlogan = phase === 'aiEnter' || phase === 'aiIdle';
  const showControls = phase !== 'exit';

  // AI exit: compute distance to dock position
  const dockY = winH - dockBottom - 40; // approximate dock center
  const aiExitY = (dockY / winH) * 100; // percentage of viewport

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          ref={viewRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', cursor: 'pointer',
          }}
          onClick={handleSkip}
        >
          {/* =============== ATMOSPHERE =============== */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 40%, rgba(200,166,90,0.03) 0%, transparent 60%)',
            }}
            animate={{ opacity: phase === 'dawn' ? 0.2 : phase === 'exit' ? 0 : 0.5 }}
            transition={{ duration: 1.5, ease }}
          />

          {/* =============== SCENE 1 + 2: Particles & X Logo =============== */}
          <svg
            viewBox="0 0 100 100"
            style={{
              width: 'clamp(200px, 38vw, 440px)',
              height: 'clamp(200px, 38vw, 440px)',
              position: 'relative', zIndex: 2,
            }}
          >
            {/* Particles */}
            {particles.map((p) => (
              <motion.circle
                key={p.id}
                r={p.size}
                fill="#c8a65a"
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{
                  cx: phase === 'dawn'
                    ? p.x + Math.sin(p.id * 1.7) * 3
                    : phase === 'exit' ? 50 + (Math.random() - 0.5) * 140
                    : p.tx,
                  cy: phase === 'dawn'
                    ? p.y + Math.cos(p.id * 2.1) * 3
                    : phase === 'exit' ? 50 + (Math.random() - 0.5) * 120
                    : p.ty,
                  opacity: phase === 'dawn'
                    ? 0.1 + Math.random() * 0.2
                    : phase === 'exit' ? 0
                    : 0.3 + Math.random() * 0.35,
                }}
                transition={{
                  duration: phase === 'dawn' ? 0.001 : p.dur,
                  delay: phase === 'dawn' ? 0 : p.delay * 0.12,
                  ease,
                  repeat: phase === 'dawn' ? Infinity : 0,
                  repeatType: 'mirror',
                  repeatDelay: 1 + Math.random(),
                }}
              />
            ))}

            {/* Scene 2: XVI Logo */}
            <XVILogo phase={phase} isAR={isAR} />
          </svg>

          {/* =============== SCENE 3: Light Sweep =============== */}
          {phase !== 'dawn' && phase !== 'forming' && (
            <LightSweep active={phase === 'reveal'} />
          )}

          {/* =============== SCENE 4: Holographic AI =============== */}
          {(phase === 'aiEnter' || phase === 'aiIdle' || phase === 'exit') && (
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 3,
              }}
              animate={
                phase === 'exit'
                  ? { y: (dockY - winH * 0.5) * 0.6, scale: 0.25, opacity: 0 }
                  : { y: 0, scale: 1, opacity: 1 }
              }
              transition={{ duration: 1.4, ease }}
            >
              {/* Slogan above AI */}
              {showSlogan && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 }}
                  style={{
                    position: 'absolute', top: '16%',
                    textAlign: 'center', maxWidth: '75%',
                  }}
                >
                  <p style={{
                    fontFamily: isAR ? "'Alexandria', 'Noto Naskh Arabic', sans-serif" : "'Manrope', sans-serif",
                    fontSize: 'clamp(0.65rem, 1.3vw, 1rem)',
                    fontWeight: 300,
                    color: 'rgba(200,166,90,0.5)',
                    letterSpacing: isAR ? 0 : '0.06em',
                    lineHeight: 1.8,
                    margin: 0,
                  }}>
                    {isAR ? sloganAR : sloganEN}
                  </p>
                </motion.div>
              )}

              <HolographicAI phase={phase} />

              {/* Welcome speech */}
              {(phase === 'aiEnter' || phase === 'aiIdle') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  style={{
                    position: 'absolute', bottom: phase === 'exit' ? '50%' : '8%',
                    left: '50%', transform: 'translateX(-50%)',
                    textAlign: 'center', width: 'max-content', maxWidth: '85vw',
                  }}
                >
                  <span style={{
                    fontFamily: isAR ? "'Alexandria', 'Noto Naskh Arabic', sans-serif" : "'Manrope', sans-serif",
                    fontSize: 'clamp(0.75rem, 1.5vw, 1.1rem)',
                    fontWeight: 300,
                    color: 'rgba(200,166,90,0.7)',
                    letterSpacing: isAR ? 0 : '0.04em',
                    lineHeight: 1.6,
                  }}>
                    {isAR ? welcomeAR : welcomeEN}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* =============== CONTROLS =============== */}
          {showControls && (
            <div
              style={{
                position: 'fixed', top: 24, right: 24, zIndex: 10000,
                display: 'flex', gap: 8,
              }}
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.05, background: 'rgba(200,166,90,0.15)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,166,90,0.12)',
                  borderRadius: '50%', width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(200,166,90,0.6)',
                  backdropFilter: 'blur(12px)', transition: 'all 0.3s ease',
                }}
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </motion.button>

              <motion.button
                onClick={handleSkip}
                whileHover={{ scale: 1.05, background: 'rgba(200,166,90,0.15)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,166,90,0.12)',
                  borderRadius: 999, padding: '8px 16px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  cursor: 'pointer', color: 'rgba(200,166,90,0.6)',
                  fontFamily: "'Manrope', sans-serif", fontSize: '0.6875rem', fontWeight: 500,
                  backdropFilter: 'blur(12px)', transition: 'all 0.3s ease',
                }}
              >
                <SkipForward size={12} />
                {isAR ? 'تخط' : 'Skip'}
              </motion.button>
            </div>
          )}

          {/* =============== BOTTOM BRANDING =============== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'dawn' ? 0 : phase === 'exit' ? 0 : 0.1 }}
            transition={{ duration: 1, delay: 2 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10000,
              fontFamily: "'Manrope', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.45em',
              textTransform: 'uppercase', color: '#c8a65a', pointerEvents: 'none',
            }}
          >
            XVI GROUP · EXECUTIVE INTELLIGENCE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
