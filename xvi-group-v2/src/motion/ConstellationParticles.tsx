import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  connections: number[];
}

interface ConstellationParticlesProps {
  count?: number;
  color?: string;
  className?: string;
  connectionDistance?: number;
}

export function ConstellationParticles({
  count = 25,
  color = '#C8A65A',
  className,
  connectionDistance = 25,
}: ConstellationParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const pts: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.25 + 0.05,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      connections: [],
    }));

    pts.forEach((p, i) => {
      pts.forEach((q, j) => {
        if (i >= j) return;
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        if (Math.sqrt(dx * dx + dy * dy) < connectionDistance) {
          p.connections.push(j);
        }
      });
    });

    return pts;
  }, [count, connectionDistance]);

  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    particles.forEach((p) => {
      p.connections.forEach((ci) => {
        const q = particles[ci];
        result.push({
          x1: p.x,
          y1: p.y,
          x2: q.x,
          y2: q.y,
          id: `${p.id}-${ci}`,
        });
      });
    });
    return result;
  }, [particles]);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="constellation-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.08" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={color}
            strokeWidth="0.3"
            strokeOpacity="0"
            initial={{ strokeOpacity: 0 }}
            animate={{ strokeOpacity: [0, 0.08, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
