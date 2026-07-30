import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Particle {
  id: number;
  xEnd: number;
  yEnd: number;
  xStart: number;
  yStart: number;
  size: number;
  delay: number;
  duration: number;
}

function generateMeridianParticles(count: number): Particle[] {
  const cx = 50, cy = 50, r = 12;
  const lineCount = Math.floor(count * 0.35);
  const circleCount = Math.floor(count * 0.3);
  const glowCount = count - lineCount - circleCount;

  const particles: Particle[] = [];
  let id = 0;

  const rand = () => (Math.random() - 0.5) * 120;

  for (let i = 0; i < lineCount; i++) {
    const t = (i + 0.5) / lineCount;
    const isFirstLine = i < lineCount / 2;
    const localT = isFirstLine ? t * 2 : (t - 0.5) * 2;
    if (isFirstLine) {
      const x = 18 + localT * 64;
      const y = 18 + localT * 64;
      particles.push({ id: id++, xEnd: x, yEnd: y, xStart: 50 + rand(), yStart: 50 + rand(), size: 1.2 + Math.random() * 1.2, delay: Math.random() * 0.4, duration: 1.2 + Math.random() * 0.6 });
    } else {
      const x = 82 - localT * 64;
      const y = 18 + localT * 64;
      particles.push({ id: id++, xEnd: x, yEnd: y, xStart: 50 + rand(), yStart: 50 + rand(), size: 1.2 + Math.random() * 1.2, delay: Math.random() * 0.4, duration: 1.2 + Math.random() * 0.6 });
    }
  }

  for (let i = 0; i < circleCount; i++) {
    const angle = (i / circleCount) * Math.PI * 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    particles.push({ id: id++, xEnd: x, yEnd: y, xStart: 50 + rand(), yStart: 50 + rand(), size: 1 + Math.random() * 1.5, delay: 0.2 + Math.random() * 0.3, duration: 1 + Math.random() * 0.5 });
  }

  for (let i = 0; i < glowCount; i++) {
    const angle = (i / glowCount) * Math.PI * 2;
    const dist = r * 2 + Math.random() * r;
    const x = cx + dist * Math.cos(angle);
    const y = cy + dist * Math.sin(angle);
    particles.push({ id: id++, xEnd: x, yEnd: y, xStart: 50 + rand() * 2, yStart: 50 + rand() * 2, size: 0.8 + Math.random() * 0.8, delay: 0.4 + Math.random() * 0.3, duration: 0.8 + Math.random() * 0.4 });
  }

  return particles;
}

function MeridianRing({ show }: { show: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 0.06 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, ease }}
      style={{
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: '1px solid #C8A65A',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
}

interface CinematicIntroProps {
  onFinish: () => void;
}

export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const [phase, setPhase] = useState<'particles' | 'reveal' | 'hold' | 'exit'>('particles');
  const [skipped, setSkipped] = useState(false);
  const finishedRef = useRef(false);

  const particles = useMemo(() => generateMeridianParticles(50), []);

  const skip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setSkipped(true);
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 800);
    const t2 = setTimeout(() => setPhase('hold'), 2000);
    const t3 = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('exit');
        setTimeout(onFinish, 600);
      }
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#F7F6F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 100 100" style={{ width: 260, height: 260, position: 'relative' }}>
            {particles.map((p) => {
              const show = phase !== 'particles';
              return (
                <motion.circle
                  key={p.id}
                  r={p.size}
                  fill={phase === 'exit' ? '#F7F6F3' : '#C8A65A'}
                  initial={{ cx: p.xStart, cy: p.yStart, opacity: 0 }}
                  animate={{
                    cx: show ? p.xEnd : p.xStart,
                    cy: show ? p.yEnd : p.yStart,
                    opacity: phase === 'exit' ? 0 : (show ? 0.7 : 0.25),
                    fillOpacity: phase === 'exit' ? 0 : undefined,
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease,
                  }}
                />
              );
            })}
            {phase === 'hold' && (
              <>
                <motion.circle
                  cx={50} cy={50} r={3.5}
                  fill="#C8A65A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.5, ease }}
                />
                <motion.path
                  d="M 38 38 L 62 62"
                  stroke="#C8A65A"
                  strokeWidth={0.6}
                  strokeOpacity={0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease }}
                />
                <motion.path
                  d="M 62 38 L 38 62"
                  stroke="#C8A65A"
                  strokeWidth={0.6}
                  strokeOpacity={0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                />
                <MeridianRing show={phase === 'hold'} />
              </>
            )}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'hold' ? { opacity: 0.25, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '0.75rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            XVI GROUP
          </motion.div>

          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '10%',
              width: 40,
              height: 1,
              background: '#C8A65A',
              opacity: 0,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
