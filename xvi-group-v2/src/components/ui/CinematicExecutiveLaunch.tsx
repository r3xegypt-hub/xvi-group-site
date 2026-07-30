import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
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
      const dur = 11;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.linearRampToValueAtTime(0.025, now + 1.5);
      master.gain.setValueAtTime(0.025, now + 7);
      master.gain.linearRampToValueAtTime(0.001, now + dur);
      master.connect(ctx.destination);

      // Ambient pad
      const p = ctx.createOscillator(); const pg = ctx.createGain(); const pf = ctx.createBiquadFilter();
      p.type = 'sawtooth'; p.frequency.setValueAtTime(55, now); p.frequency.linearRampToValueAtTime(65, now + 5);
      pg.gain.setValueAtTime(0.01, now); pg.gain.linearRampToValueAtTime(0.05, now + 2.5);
      pg.gain.setValueAtTime(0.05, now + 7); pg.gain.linearRampToValueAtTime(0.001, now + dur);
      pf.type = 'lowpass'; pf.frequency.setValueAtTime(180, now); pf.frequency.linearRampToValueAtTime(400, now + 5);
      p.connect(pf).connect(pg).connect(master); p.start(now); p.stop(now + dur);

      // Sub bass
      const sub = ctx.createOscillator(); const sg = ctx.createGain();
      sub.type = 'sine'; sub.frequency.setValueAtTime(27.5, now); sub.frequency.linearRampToValueAtTime(35, now + 6);
      sg.gain.setValueAtTime(0.001, now); sg.gain.linearRampToValueAtTime(0.018, now + 3);
      sg.gain.setValueAtTime(0.018, now + 7); sg.gain.linearRampToValueAtTime(0.001, now + dur);
      sub.connect(sg).connect(master); sub.start(now); sub.stop(now + dur);

      // Rising tone → chime at peak
      const r = ctx.createOscillator(); const rg = ctx.createGain();
      r.type = 'sine'; r.frequency.setValueAtTime(100, now + 1.5);
      r.frequency.linearRampToValueAtTime(880, now + 5);
      rg.gain.setValueAtTime(0.001, now); rg.gain.linearRampToValueAtTime(0.02, now + 3);
      rg.gain.linearRampToValueAtTime(0.001, now + 6);
      r.connect(rg).connect(master); r.start(now + 1.5); r.stop(now + 6);

      // Chime at 5s
      const c = ctx.createOscillator(); const cg = ctx.createGain();
      c.type = 'sine'; c.frequency.setValueAtTime(1200, now + 4.8);
      c.frequency.exponentialRampToValueAtTime(1800, now + 5.2);
      cg.gain.setValueAtTime(0.001, now); cg.gain.linearRampToValueAtTime(0.035, now + 5);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 7);
      c.connect(cg).connect(master); c.start(now + 4.8); c.stop(now + 7);

      // Soft wind
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / buf.length, 0.3);
      const n = ctx.createBufferSource(); const ng = ctx.createGain(); const nf = ctx.createBiquadFilter();
      n.buffer = buf; n.loop = true; nf.type = 'bandpass';
      nf.frequency.setValueAtTime(250, now); nf.Q.setValueAtTime(0.5, now);
      ng.gain.setValueAtTime(0.001, now); ng.gain.linearRampToValueAtTime(0.005, now + 2.5);
      ng.gain.setValueAtTime(0.005, now + 7); ng.gain.linearRampToValueAtTime(0.001, now + dur);
      n.connect(nf).connect(ng).connect(master); n.start(now); n.stop(now + dur);
    } catch { /* */ }
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (ctxRef.current) { try { ctxRef.current.close(); } catch { /* */ } ctxRef.current = null; }
  }, []);

  useEffect(() => () => stop(), [stop]);
  return { play, stop };
}

// ============================================
// Floating Particles
// ============================================

function FloatingParticles({ count }: { count: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      cx: 50 + (Math.random() - 0.5) * 60,
      cy: 50 + (Math.random() - 0.5) * 60,
      r: 0.4 + Math.random() * 0.8,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      dur: 3 + Math.random() * 3,
      delay: Math.random() * 2,
    })), [count]);

  return (
    <g>
      {particles.map(p => (
        <motion.circle
          key={p.id}
          cx={p.cx} cy={p.cy} r={p.r}
          fill="#c8a65a"
          opacity={0.08}
          animate={{
            cx: [p.cx, p.cx + p.dx, p.cx],
            cy: [p.cy, p.cy + p.dy, p.cy],
            opacity: [0.06, 0.2, 0.06],
          }}
          transition={{
            duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay,
          }}
        />
      ))}
    </g>
  );
}

// ============================================
// Main Component
// ============================================

interface CinematicExecutiveLaunchProps {
  onFinish: () => void;
}

export function CinematicExecutiveLaunch({ onFinish }: CinematicExecutiveLaunchProps) {
  const [phase, setPhase] = useState<'dawn' | 'form' | 'hero' | 'zoom' | 'exit'>('dawn');
  const [muted, setMuted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const finishedRef = useRef(false);
  const { play, stop } = useAudioLogo();
  const audioStartedRef = useRef(false);

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
    const t1 = setTimeout(() => setPhase('form'), 2500);
    const t2 = setTimeout(() => setPhase('hero'), 4800);
    const t3 = setTimeout(() => setPhase('zoom'), 7800);
    const t4 = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('exit');
        stop();
        setTimeout(onFinish, 800);
      }
    }, 10600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [skipped, onFinish, stop]);

  const showControls = phase !== 'exit';

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', cursor: 'pointer',
          }}
          onClick={handleSkip}
        >
          {/* =============== ATMOSPHERIC BLOOM =============== */}
          {/* Soft golden bloom behind logo */}
          <motion.div
            style={{
              position: 'absolute', width: '70vmin', height: '70vmin',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,166,90,0.06) 0%, rgba(200,166,90,0.02) 40%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none', zIndex: 1,
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: phase === 'dawn' ? 0.2 : phase === 'exit' ? 0 : 0.6,
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary bloom */}
          <motion.div
            style={{
              position: 'absolute', width: '50vmin', height: '50vmin',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,166,90,0.04) 0%, transparent 60%)',
              filter: 'blur(60px)',
              pointerEvents: 'none', zIndex: 1,
            }}
            animate={{
              scale: [1.05, 0.95, 1.05],
              opacity: phase === 'dawn' ? 0.1 : phase === 'exit' ? 0 : 0.4,
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* =============== LOGO CONTAINER WITH ZOOM =============== */}
          <motion.div
            animate={{
              scale: phase === 'zoom' ? [1, 1.12, 0.95, 1] : 1,
            }}
            transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], times: [0, 0.4, 0.7, 1] }}
            style={{
              position: 'relative', zIndex: 2,
              width: 'clamp(200px, 38vw, 440px)',
              height: 'clamp(200px, 38vw, 440px)',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              style={{ width: '100%', height: '100%' }}
            >
              {/* =============== SCENE 1: Dawn particles (0-2.5s) =============== */}
              {phase === 'dawn' && (
                Array.from({ length: 50 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const dist = 10 + Math.random() * 30;
                  return (
                    <motion.circle
                      key={i}
                      r={0.4 + Math.random() * 1.2}
                      fill="#c8a65a"
                      initial={{ cx: 50, cy: 50, opacity: 0 }}
                      animate={{
                        cx: 50 + Math.cos(angle) * dist,
                        cy: 50 + Math.sin(angle) * dist,
                        opacity: [0, 0.15, 0.05],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 1.5,
                        delay: Math.random() * 1.5,
                        ease,
                      }}
                    />
                  );
                })
              )}

              {/* =============== SCENE 2+: Logo emerges (2.5s+) =============== */}
              {(phase !== 'dawn') && (
                <>
                  {/* Particles converging */}
                  {Array.from({ length: 40 }).map((_, i) => {
                    const a = Math.random() * Math.PI * 2;
                    const d = 2 + Math.random() * 16;
                    return (
                      <motion.circle
                        key={`p-${i}`}
                        r={0.5 + Math.random() * 1}
                        fill="#c8a65a"
                        initial={{ cx: 50 + (Math.random() - 0.5) * 80, cy: 50 + (Math.random() - 0.5) * 80, opacity: 0 }}
                        animate={{
                          cx: 50 + Math.cos(a) * d,
                          cy: 50 + Math.sin(a) * d,
                          opacity: phase === 'exit' ? 0 : 0.2 + Math.random() * 0.3,
                        }}
                        transition={{ duration: 1.5, delay: Math.random() * 0.6, ease }}
                      />
                    );
                  })}

                  {/* =============== THE LOGO =============== */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.7, filter: 'blur(4px)' }}
                    animate={{
                      opacity: phase === 'exit' ? 0 : 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    }}
                    transition={{ duration: 1.2, ease, delay: 0.2 }}
                    style={{ transformOrigin: '50px 50px' }}
                  >
                    {/* Ambient glow trail */}
                    <motion.circle
                      cx={50} cy={38} r={24}
                      fill="none" stroke="#c8a65a" strokeWidth={0.15}
                      animate={{
                        opacity: [0.06, 0.18, 0.06],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      style={{ transformOrigin: '50px 38px' }}
                    />
                    <motion.circle
                      cx={50} cy={38} r={16}
                      fill="none" stroke="#c8a65a" strokeWidth={0.08}
                      animate={{
                        opacity: [0.04, 0.12, 0.04],
                        scale: [1, 1.12, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      style={{ transformOrigin: '50px 38px' }}
                    />

                    {/* =============== THE LOGO SYMBOL — NO BOX =============== */}
                    {/* X — left-to-right diagonal */}
                    <motion.line
                      x1={38} y1={24} x2={62} y2={52}
                      stroke="#c8a65a" strokeWidth={1.4} strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.8, ease, delay: 0.1 }}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(200,166,90,0.3))' }}
                    />
                    {/* X — right-to-left diagonal */}
                    <motion.line
                      x1={62} y1={24} x2={38} y2={52}
                      stroke="#c8a65a" strokeWidth={1.4} strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.8, ease, delay: 0.25 }}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(200,166,90,0.3))' }}
                    />
                    {/* Center dot */}
                    <motion.circle
                      cx={50} cy={38} r={2.5} fill="#c8a65a"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.4, 1],
                        opacity: [0, 0.8, 0.5],
                        filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
                      }}
                      transition={{ duration: 0.8, ease, delay: 0.5 }}
                    />

                    {/* "XVI" — Playfair Display */}
                    <motion.text
                      x={50} y={72}
                      textAnchor="middle"
                      fill="#c8a65a"
                      fontFamily="'Playfair Display', Georgia, serif"
                      fontSize={9}
                      fontWeight={500}
                      letterSpacing="0.02em"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{
                        opacity: phase === 'exit' ? 0 : 0.85,
                        y: 0,
                      }}
                      transition={{ duration: 0.6, ease, delay: 0.6 }}
                    >
                      XVI
                    </motion.text>

                    {/* "GROUP" — Inter */}
                    <motion.text
                      x={50} y={83}
                      textAnchor="middle"
                      fill="#c8a65a"
                      fontFamily="'Inter', sans-serif"
                      fontSize={4}
                      fontWeight={500}
                      letterSpacing="0.5em"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: phase === 'exit' ? 0 : 0.45 }}
                      transition={{ duration: 0.6, ease, delay: 0.75 }}
                    >
                      GROUP
                    </motion.text>
                  </motion.g>

                  {/* =============== FLOATING PARTICLES =============== */}
                  {phase !== 'dawn' && (
                    <FloatingParticles count={20} />
                  )}

                  {/* =============== PULSE RING =============== */}
                  <motion.circle
                    cx={50} cy={38} r={28}
                    fill="none" stroke="#c8a65a" strokeWidth={0.2} strokeOpacity={0.08}
                    animate={{
                      scale: [1, 1.06, 1],
                      opacity: [0.08, 0.18, 0.08],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    style={{ transformOrigin: '50px 38px' }}
                  />
                  <motion.circle
                    cx={50} cy={38} r={36}
                    fill="none" stroke="#c8a65a" strokeWidth={0.1} strokeOpacity={0.04}
                    animate={{
                      scale: [1, 1.04, 1],
                      opacity: [0.04, 0.1, 0.04],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    style={{ transformOrigin: '50px 38px' }}
                  />
                </>
              )}
            </svg>
          </motion.div>

          {/* =============== CINEMATIC LIGHT SWEEP (Scene 3: 4.8-7s) =============== */}
          {phase === 'hero' && (
            <motion.div
              initial={{ x: '-120%' }}
              animate={{ x: '350%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
              style={{
                position: 'absolute', top: '-15%', left: 0, right: 0, bottom: '-15%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(200,166,90,0.03) 20%, rgba(200,166,90,0.07) 40%, rgba(200,166,90,0.03) 60%, transparent 100%)',
                pointerEvents: 'none', zIndex: 3,
                transform: 'skewX(-10deg)',
              }}
            />
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
                  backdropFilter: 'blur(12px)',
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
                  backdropFilter: 'blur(12px)',
                }}
              >
                <SkipForward size={12} />
                Skip
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
