import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Particle {
  id: number;
  xEnd: number; yEnd: number;
  xStart: number; yStart: number;
  size: number; delay: number; duration: number;
}

function generateParticles(count: number): Particle[] {
  const cx = 50, cy = 50, r = 14;
  const lineParticles = Math.floor(count * 0.35);
  const circleParticles = Math.floor(count * 0.25);
  const glowParticles = count - lineParticles - circleParticles;
  const particles: Particle[] = [];
  let id = 0;

  const rand = () => (Math.random() - 0.5) * 140;

  for (let i = 0; i < lineParticles; i++) {
    const t = (i + 0.5) / lineParticles;
    const isFirst = i < lineParticles / 2;
    const localT = isFirst ? t * 2 : (t - 0.5) * 2;
    if (isFirst) {
      particles.push({ id: id++, xEnd: 16 + localT * 68, yEnd: 16 + localT * 68, xStart: 50 + rand(), yStart: 50 + rand(), size: 1.4 + Math.random() * 1.4, delay: Math.random() * 0.3, duration: 1.2 + Math.random() * 0.6 });
    } else {
      particles.push({ id: id++, xEnd: 84 - localT * 68, yEnd: 16 + localT * 68, xStart: 50 + rand(), yStart: 50 + rand(), size: 1.4 + Math.random() * 1.4, delay: Math.random() * 0.3, duration: 1.2 + Math.random() * 0.6 });
    }
  }

  for (let i = 0; i < circleParticles; i++) {
    const angle = (i / circleParticles) * Math.PI * 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    particles.push({ id: id++, xEnd: x, yEnd: y, xStart: 50 + rand(), yStart: 50 + rand(), size: 1.2 + Math.random() * 1.6, delay: 0.15 + Math.random() * 0.25, duration: 1 + Math.random() * 0.5 });
  }

  for (let i = 0; i < glowParticles; i++) {
    const angle = (i / glowParticles) * Math.PI * 2;
    const dist = r * 2.5 + Math.random() * r * 2;
    particles.push({ id: id++, xEnd: cx + dist * Math.cos(angle), yEnd: cy + dist * Math.sin(angle), xStart: 50 + rand() * 1.5, yStart: 50 + rand() * 1.5, size: 0.6 + Math.random() * 0.6, delay: 0.3 + Math.random() * 0.2, duration: 0.8 + Math.random() * 0.4 });
  }

  return particles;
}

function NetworkLines({ show }: { show: boolean }) {
  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      const angle1 = (i / 12) * Math.PI * 2;
      const angle2 = ((i + 3) / 12) * Math.PI * 2;
      result.push({
        x1: 50 + 20 * Math.cos(angle1), y1: 50 + 20 * Math.sin(angle1),
        x2: 50 + 20 * Math.cos(angle2), y2: 50 + 20 * Math.sin(angle2),
      });
    }
    return result;
  }, []);

  return (
    <g>
      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#C8A65A" strokeWidth={0.3} strokeOpacity={0.08}
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.04, ease }}
        />
      ))}
    </g>
  );
}

interface CinematicIntroProps {
  onFinish: () => void;
}

export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const [phase, setPhase] = useState<'dawn' | 'forming' | 'reveal' | 'hold' | 'exit'>('dawn');
  const [skipped, setSkipped] = useState(false);
  const finishedRef = useRef(false);

  const particles = useMemo(() => generateParticles(55), []);

  const skip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setSkipped(true);
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('forming'), 300);
    const t2 = setTimeout(() => setPhase('reveal'), 900);
    const t3 = setTimeout(() => setPhase('hold'), 2000);
    const t4 = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('exit');
        setTimeout(onFinish, 700);
      }
    }, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onFinish]);

  const isFormed = phase !== 'dawn';

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'linear-gradient(180deg, #F7F6F3 0%, #FCFBFA 50%, #F7F6F3 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', overflow: 'hidden',
          }}
        >
          {/* Volumetric light */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 40%, rgba(200,166,90,0.04) 0%, transparent 60%)',
            }}
            animate={{ opacity: phase === 'dawn' ? 0.2 : 0.5 }}
            transition={{ duration: 1, ease }}
          />
          <motion.div
            style={{
              position: 'absolute', width: '60%', height: 2,
              top: '35%', left: '20%',
              background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.03), transparent)',
              filter: 'blur(4px)',
            }}
            animate={{ opacity: [0, 0.5, 0], scaleY: [1, 2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute', width: '40%', height: 1,
              top: '55%', right: '10%',
              background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.02), transparent)',
              filter: 'blur(3px)',
            }}
            animate={{ opacity: [0, 0.4, 0], scaleY: [1, 2.5, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />

          <svg viewBox="0 0 100 100" style={{ width: 280, height: 280, position: 'relative', zIndex: 1 }}>
            {/* Network */}
            <NetworkLines show={phase === 'forming' || phase === 'reveal' || phase === 'hold'} />

            {/* Particles */}
            {particles.map((p) => (
              <motion.circle
                key={p.id}
                r={p.size}
                fill={phase === 'exit' ? '#F7F6F3' : '#C8A65A'}
                initial={{ cx: p.xStart, cy: p.yStart, opacity: 0 }}
                animate={{
                  cx: isFormed ? p.xEnd : p.xStart,
                  cy: isFormed ? p.yEnd : p.yStart,
                  opacity: phase === 'exit' ? 0 : (isFormed ? 0.65 : 0.2),
                }}
                transition={{ duration: p.duration, delay: p.delay, ease }}
              />
            ))}

            {/* Logo reveal */}
            {(phase === 'reveal' || phase === 'hold') && (
              <>
                <motion.circle
                  cx={50} cy={50} r={4}
                  fill="#C8A65A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                />
                <motion.rect
                  x={34} y={34} width={32} height={32} rx={3}
                  stroke="#C8A65A" strokeWidth={0.4} strokeOpacity={0.15}
                  fill="none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 }}
                />
                <motion.path
                  d="M 40 40 L 60 60"
                  stroke="#C8A65A" strokeWidth={0.5} strokeOpacity={0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 }}
                />
                <motion.path
                  d="M 60 40 L 40 60"
                  stroke="#C8A65A" strokeWidth={0.5} strokeOpacity={0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.25 }}
                />
                <motion.circle
                  cx={50} cy={50} r={22}
                  stroke="#C8A65A" strokeWidth={0.3} strokeOpacity={0.06}
                  fill="none"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [1, 1.02, 1], opacity: [0.06, 0.1, 0.06] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}

            {/* Center glow */}
            {(phase === 'reveal' || phase === 'hold') && (
              <motion.circle
                cx={50} cy={50} r={8}
                fill="none" stroke="#C8A65A" strokeWidth={0.2}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'hold' ? { opacity: 0.25, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: 'absolute', bottom: '16%', zIndex: 1,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '0.75rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#111111',
            }}
          >
            XVI GROUP
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
