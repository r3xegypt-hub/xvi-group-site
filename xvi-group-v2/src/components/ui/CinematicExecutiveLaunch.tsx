import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];

// ============================================
// Sound Engine
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
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.018, now + 1.5);
      masterGain.gain.setValueAtTime(0.018, now + 8);
      masterGain.gain.linearRampToValueAtTime(0.001, now + 14);
      masterGain.connect(ctx.destination);

      // Ambient pad — filtered saw
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      const padFilter = ctx.createBiquadFilter();
      padOsc.type = 'sawtooth';
      padOsc.frequency.setValueAtTime(55, now);
      padOsc.frequency.linearRampToValueAtTime(65, now + 6);
      padGain.gain.setValueAtTime(0.01, now);
      padGain.gain.linearRampToValueAtTime(0.04, now + 3);
      padGain.gain.setValueAtTime(0.04, now + 10);
      padGain.gain.linearRampToValueAtTime(0.001, now + 14);
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(200, now);
      padFilter.frequency.linearRampToValueAtTime(350, now + 6);
      padOsc.connect(padFilter).connect(padGain).connect(masterGain);
      padOsc.start(now);
      padOsc.stop(now + 14);

      // Sub bass — very gentle
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(27.5, now);
      subOsc.frequency.linearRampToValueAtTime(32.5, now + 8);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.015, now + 4);
      subGain.gain.setValueAtTime(0.015, now + 10);
      subGain.gain.linearRampToValueAtTime(0.001, now + 14);
      subOsc.connect(subGain).connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + 14);

      // Rising tone
      const riseOsc = ctx.createOscillator();
      const riseGain = ctx.createGain();
      riseOsc.type = 'sine';
      riseOsc.frequency.setValueAtTime(120, now + 2);
      riseOsc.frequency.linearRampToValueAtTime(440, now + 6);
      riseGain.gain.setValueAtTime(0.001, now);
      riseGain.gain.linearRampToValueAtTime(0.02, now + 4);
      riseGain.gain.linearRampToValueAtTime(0.001, now + 7);
      riseOsc.connect(riseGain).connect(masterGain);
      riseOsc.start(now + 2);
      riseOsc.stop(now + 7);

      // Chime at logo reveal (~6s)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, now + 5.8);
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 6.3);
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.linearRampToValueAtTime(0.04, now + 6);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 8);
      chimeOsc.connect(chimeGain).connect(masterGain);
      chimeOsc.start(now + 5.8);
      chimeOsc.stop(now + 8);

      // Ambient noise texture (wind)
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.3);
      }
      const noise = ctx.createBufferSource();
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      noise.buffer = buffer;
      noise.loop = true;
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(300, now);
      noiseFilter.Q.setValueAtTime(0.5, now);
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.006, now + 3);
      noiseGain.gain.setValueAtTime(0.006, now + 10);
      noiseGain.gain.linearRampToValueAtTime(0.001, now + 14);
      noise.connect(noiseFilter).connect(noiseGain).connect(masterGain);
      noise.start(now);
      noise.stop(now + 14);
    } catch {
      // Audio not available
    }
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (ctxRef.current) {
      try { ctxRef.current.close(); } catch { /* ignore */ }
      ctxRef.current = null;
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { play, stop };
}

// ============================================
// Particles
// ============================================

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  const cx = 50, cy = 42;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 2 + Math.random() * 18;
    particles.push({
      id: i,
      x: 50 + (Math.random() - 0.5) * 100,
      y: 50 + (Math.random() - 0.5) * 80,
      targetX: cx + dist * Math.cos(angle),
      targetY: cy + dist * Math.sin(angle),
      size: 0.6 + Math.random() * 1.6,
      delay: Math.random() * 3,
      duration: 1.2 + Math.random() * 0.8,
      driftX: (Math.random() - 0.5) * 2,
      driftY: (Math.random() - 0.5) * 2,
    });
  }
  return particles;
}

// ============================================
// Holographic Executive AI
// ============================================

function HolographicAI({ phase }: { phase: string }) {
  const visible = phase === 'aiEnter' || phase === 'aiIdle' || phase === 'exit';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 1.2, ease }}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 200 240" style={{ width: 160, height: 192, filter: 'drop-shadow(0 0 30px rgba(200,166,90,0.15))' }}>
        <defs>
          <linearGradient id="holograd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8a65a" stopOpacity={0.3} />
            <stop offset="50%" stopColor="#d4b76e" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#c8a65a" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="holograd2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8a65a" stopOpacity={0.15} />
            <stop offset="50%" stopColor="#d4b76e" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#c8a65a" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Head silhouette */}
        <motion.path
          d="M100 24 C130 24 152 42 160 70 L172 130 C176 150 164 170 148 180 L120 200 C110 206 90 206 80 200 L52 180 C36 170 24 150 28 130 L40 70 C48 42 70 24 100 24Z"
          fill="none"
          stroke="url(#holograd)"
          strokeWidth={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease, delay: 0.3 }}
        />

        {/* Inner face grid */}
        <motion.g
          opacity={0.12}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.12 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <line x1="60" y1="70" x2="140" y2="70" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="55" y1="90" x2="145" y2="90" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="50" y1="110" x2="150" y2="110" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="55" y1="130" x2="145" y2="130" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="60" y1="150" x2="140" y2="150" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="80" y1="40" x2="80" y2="190" stroke="#c8a65a" strokeWidth={0.2} />
          <line x1="100" y1="30" x2="100" y2="200" stroke="#c8a65a" strokeWidth={0.3} />
          <line x1="120" y1="40" x2="120" y2="190" stroke="#c8a65a" strokeWidth={0.2} />
        </motion.g>

        {/* Eyes */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* Left eye */}
          <motion.path
            d="M72 90 Q78 84 86 90 Q78 96 72 90Z"
            fill="none"
            stroke="#c8a65a"
            strokeWidth={0.8}
            animate={{ d: ['M72 90 Q78 84 86 90 Q78 96 72 90Z', 'M72 90 Q78 86 86 90 Q78 94 72 90Z', 'M72 90 Q78 84 86 90 Q78 96 72 90Z'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Left pupil */}
          <motion.circle
            cx={79} cy={90} r={1.5}
            fill="#c8a65a"
            animate={{ cx: [79, 80, 78, 79], cy: [90, 89, 91, 90] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Right eye */}
          <motion.path
            d="M114 90 Q120 84 128 90 Q120 96 114 90Z"
            fill="none"
            stroke="#c8a65a"
            strokeWidth={0.8}
            animate={{ d: ['M114 90 Q120 84 128 90 Q120 96 114 90Z', 'M114 90 Q120 86 128 90 Q120 94 114 90Z', 'M114 90 Q120 84 128 90 Q120 96 114 90Z'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          {/* Right pupil */}
          <motion.circle
            cx={121} cy={90} r={1.5}
            fill="#c8a65a"
            animate={{ cx: [121, 122, 120, 121], cy: [90, 89, 91, 90] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d="M88 118 Q100 122 112 118"
          fill="none"
          stroke="url(#holograd)"
          strokeWidth={0.6}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Gold reflection line */}
        <motion.path
          d="M60 50 Q100 40 140 50"
          fill="none"
          stroke="#c8a65a"
          strokeWidth={0.4}
          strokeOpacity={0.08}
          animate={{ d: ['M60 50 Q100 40 140 50', 'M60 52 Q100 42 140 52', 'M60 50 Q100 40 140 50'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pulse ring */}
        <motion.circle
          cx={100} cy={110} r={75}
          fill="none"
          stroke="#c8a65a"
          strokeWidth={0.3}
          strokeOpacity={0.06}
          animate={{ scale: [1, 1.04, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 110px' }}
        />

        {/* Floating particles around head */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const dist = 60 + Math.random() * 20;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist + 110;
          return (
            <motion.circle
              key={i}
              cx={100 + dx}
              cy={dy}
              r={0.8 + Math.random() * 0.8}
              fill="#c8a65a"
              opacity={0.08}
              animate={{
                cx: [100 + dx, 100 + dx + (Math.random() - 0.5) * 10, 100 + dx],
                cy: [dy, dy + (Math.random() - 0.5) * 8, dy],
                opacity: [0.08, 0.2, 0.08],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          );
        })}
      </svg>

      {/* Breathing — subtle whole-div animation */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Voice waveform */}
      {phase === 'aiEnter' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          style={{
            position: 'absolute', bottom: '12%',
            display: 'flex', alignItems: 'center', gap: 2,
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              style={{ width: 2, borderRadius: 2, background: '#c8a65a' }}
              animate={{
                height: [2 + Math.random() * 4, 8 + Math.random() * 14, 2 + Math.random() * 4],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// Light Sweep
// ============================================

function LightSweep({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={active ? { x: '300%' } : { x: '-100%' }}
      transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,166,90,0.04) 30%, rgba(200,166,90,0.08) 50%, rgba(200,166,90,0.04) 70%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
        transform: 'skewX(-15deg)',
      }}
    />
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

  const particles = useMemo(() => generateParticles(60), []);

  const handleSkip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    stop();
    setSkipped(true);
    onFinish();
  }, [onFinish, stop]);

  const toggleMute = useCallback(() => {
    setMuted(m => !m);
  }, []);

  useEffect(() => {
    if (muted) { stop(); return; }
    if (!audioStartedRef.current && !skipped) {
      audioStartedRef.current = true;
      const t = setTimeout(() => play(), 100);
      return () => clearTimeout(t);
    }
  }, [muted, skipped, play, stop]);

  useEffect(() => {
    if (skipped) return;
    const t1 = setTimeout(() => setPhase('forming'), 2800);
    const t2 = setTimeout(() => setPhase('reveal'), 5600);
    const t3 = setTimeout(() => setPhase('aiEnter'), 9000);
    const t4 = setTimeout(() => setPhase('aiIdle'), 10200);
    const t5 = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('exit');
        stop();
        setTimeout(onFinish, 800);
      }
    }, 14600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [skipped, onFinish, stop]);

  const sloganEN = '"Where Intelligence Becomes Strategy"';
  const sloganAR = '"حيث يتحول الذكاء إلى ميزة استراتيجية"';
  const welcomeEN = 'Welcome... Executive Intelligence begins now.';
  const welcomeAR = 'مرحبًا بك... حيث يتحول الذكاء إلى ميزة استراتيجية.';

  const daysSinceVisit = useMemo(() => {
    const last = localStorage.getItem('xviCinematicDate');
    if (!last) return 999;
    return Math.floor((Date.now() - parseInt(last)) / 86400000);
  }, []);

  const showControls = phase !== 'exit';

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', cursor: 'pointer',
          }}
          onClick={handleSkip}
        >
          {/* ============================================ */}
          {/* Illuminated atmosphere                        */}
          {/* ============================================ */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 40%, rgba(200,166,90,0.03) 0%, transparent 60%)',
            }}
            animate={{ opacity: phase === 'dawn' ? 0.3 : phase === 'exit' ? 0 : 0.6 }}
            transition={{ duration: 1.5, ease }}
          />

          {/* ============================================ */}
          {/* Scene 1-2: Black → Particles form X           */}
          {/* ============================================ */}
          <svg
            viewBox="0 0 100 100"
            style={{
              width: 'clamp(200px, 35vw, 400px)',
              height: 'clamp(200px, 35vw, 400px)',
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
                    ? p.x + Math.sin(Date.now() * 0.001 + p.id) * p.driftX
                    : phase === 'exit' ? 50 + (Math.random() - 0.5) * 120
                    : p.targetX,
                  cy: phase === 'dawn'
                    ? p.y + Math.cos(Date.now() * 0.001 + p.id) * p.driftY
                    : phase === 'exit' ? 50 + (Math.random() - 0.5) * 100
                    : p.targetY,
                  opacity: phase === 'dawn'
                    ? 0.15 + Math.random() * 0.2
                    : phase === 'exit' ? 0
                    : 0.3 + Math.random() * 0.4,
                }}
                transition={{
                  duration: phase === 'dawn' ? 2.5 : p.duration,
                  delay: phase === 'dawn' ? 0 : p.delay * 0.15,
                  ease,
                }}
              />
            ))}

            {/* ============================================ */}
            {/* Scene 2: The "X" emerges (3-6s)              */}
            {/* ============================================ */}
            {(phase === 'forming' || phase === 'reveal' || phase === 'aiEnter' || phase === 'aiIdle') && (
              <g>
                {/* Outer glow */}
                <motion.circle
                  cx={50} cy={45} r={28}
                  fill="none" stroke="#c8a65a" strokeWidth={0.2}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* X symbol — two crossing lines */}
                <motion.line
                  x1={30} y1={25} x2={70} y2={65}
                  stroke="#c8a65a" strokeWidth={1.2} strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.8, ease, delay: 0.1 }}
                />
                <motion.line
                  x1={70} y1={25} x2={30} y2={65}
                  stroke="#c8a65a" strokeWidth={1.2} strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.8, ease, delay: 0.3 }}
                />

                {/* Center glow dot */}
                <motion.circle
                  cx={50} cy={45} r={3}
                  fill="#c8a65a"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0.8], opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 1, ease, delay: 0.5 }}
                />
                <motion.circle
                  cx={50} cy={45} r={6}
                  fill="none" stroke="#c8a65a" strokeWidth={0.5}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                />

                {/* Diamond frame */}
                <motion.rect
                  x={26} y={21} width={48} height={48} rx={4}
                  fill="none" stroke="#c8a65a" strokeWidth={0.4} strokeOpacity={0.12}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.4 }}
                  style={{ transformOrigin: '50px 45px' }}
                />
              </g>
            )}

            {/* ============================================ */}
            {/* Scene 3: Light sweep + Slogan (6-9s)         */}
            {/* ============================================ */}
            {(phase === 'reveal' || phase === 'aiEnter' || phase === 'aiIdle') && (
              <g>
                {/* Brand name below X */}
                <motion.text
                  x={50} y={82}
                  textAnchor="middle"
                  fill="#c8a65a"
                  fontFamily="'Manrope', sans-serif"
                  fontSize={7}
                  fontWeight={600}
                  letterSpacing="0.35em"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.3 }}
                >
                  XVI GROUP
                </motion.text>

                {/* Slogan */}
                {(phase === 'aiEnter' || phase === 'aiIdle') && (
                  <motion.text
                    x={50} y={92}
                    textAnchor="middle"
                    fill="#c8a65a"
                    fontFamily={isAR ? "'Alexandria', sans-serif" : "'Manrope', sans-serif"}
                    fontSize={2.8}
                    fontWeight={400}
                    letterSpacing={isAR ? 0 : '0.15em'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.8, ease, delay: 0.2 }}
                    style={{ direction: isAR ? 'rtl' : 'ltr' }}
                  >
                    {isAR ? sloganAR : sloganEN}
                  </motion.text>
                )}
              </g>
            )}
          </svg>

          {/* ============================================ */}
          {/* Scene 4: Holographic AI (9-12s)               */}
          {/* ============================================ */}
          {phase !== 'dawn' && phase !== 'forming' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', zIndex: 3,
            }}>
              {/* Slogan text above AI */}
              {(phase === 'aiEnter' || phase === 'aiIdle') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.3 }}
                  style={{
                    position: 'absolute', top: '18%',
                    textAlign: 'center', maxWidth: '70%',
                  }}
                >
                  <motion.p
                    style={{
                      fontFamily: isAR ? "'Alexandria', 'Noto Naskh Arabic', sans-serif" : "'Manrope', sans-serif",
                      fontSize: 'clamp(0.7rem, 1.4vw, 1.1rem)',
                      fontWeight: 300,
                      color: 'rgba(200,166,90,0.6)',
                      letterSpacing: isAR ? 0 : '0.08em',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {isAR ? sloganAR : sloganEN}
                  </motion.p>
                </motion.div>
              )}

              {/* Holographic AI */}
              {phase === 'aiEnter' || phase === 'aiIdle' || phase === 'exit' ? (
                <motion.div
                  style={{ position: 'relative' }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={
                    phase === 'exit'
                      ? { opacity: 0, scale: 0.3, y: 100 }
                      : { opacity: 1, scale: 1, y: 0 }
                  }
                  transition={{ duration: 1.2, ease }}
                >
                  <HolographicAI phase={phase} />

                  {/* Welcome text */}
                  {(phase === 'aiEnter' || phase === 'aiIdle') && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2 }}
                      style={{
                        position: 'absolute', bottom: '-24%',
                        left: '50%', transform: 'translateX(-50%)',
                        textAlign: 'center', width: 'max-content',
                        maxWidth: '90vw',
                      }}
                    >
                      <motion.span
                        style={{
                          fontFamily: isAR ? "'Alexandria', 'Noto Naskh Arabic', sans-serif" : "'Manrope', sans-serif",
                          fontSize: 'clamp(0.8rem, 1.6vw, 1.2rem)',
                          fontWeight: 300,
                          color: 'rgba(200,166,90,0.8)',
                          letterSpacing: isAR ? 0 : '0.04em',
                          lineHeight: 1.6,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.5] }}
                        transition={{ duration: 0.8, delay: 2.5 }}
                      >
                        {isAR ? welcomeAR : welcomeEN}
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              ) : null}
            </div>
          )}

          {/* ============================================ */}
          {/* Controls                                       */}
          {/* ============================================ */}
          {showControls && (
            <div style={{
              position: 'fixed', top: 24, right: 24, zIndex: 10000,
              display: 'flex', gap: 8,
            }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.05, background: 'rgba(200,166,90,0.15)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(200,166,90,0.12)',
                  borderRadius: '50%',
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(200,166,90,0.6)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
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
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(200,166,90,0.12)',
                  borderRadius: 999,
                  padding: '8px 16px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  cursor: 'pointer', color: 'rgba(200,166,90,0.6)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.6875rem', fontWeight: 500,
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <SkipForward size={12} />
                {isAR ? 'تخط' : 'Skip'}
              </motion.button>
            </div>
          )}

          {/* ============================================ */}
          {/* Bottom branding                                */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'dawn' ? 0 : phase === 'exit' ? 0 : 0.12 }}
            transition={{ duration: 1, delay: 2 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%',
              transform: 'translateX(-50%)', zIndex: 10000,
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.5625rem', letterSpacing: '0.45em',
              textTransform: 'uppercase', color: '#c8a65a',
              pointerEvents: 'none',
            }}
          >
            XVI GROUP · EXECUTIVE INTELLIGENCE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
