import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface StreamParticle {
  id: number;
  x1: number; y1: number;
  x2: number; y2: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface DataStreamProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
}

export function DataStream({ className, count = 30, color = '#C8A65A', speed = 1 }: DataStreamProps) {
  const particles = useMemo<StreamParticle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: (Math.random() * 4 + 3) / speed,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.03,
    }));
  }, [count, speed]);

  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {particles.map((p) => (
          <g key={p.id}>
            <motion.circle
              cx={p.x1} cy={p.y1} r={p.size}
              fill={color}
              opacity={p.opacity}
              animate={{
                cx: [p.x1, p.x2, p.x1],
                cy: [p.y1, p.y2, p.y1],
                opacity: [p.opacity, p.opacity * 2, p.opacity],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
            <motion.line
              x1={p.x1} y1={p.y1} x2={p.x1} y2={p.y1}
              stroke={color}
              strokeWidth={0.3}
              strokeOpacity={0.03}
              animate={{
                x2: [p.x1, p.x2, p.x1],
                y2: [p.y1, p.y2, p.y1],
                strokeOpacity: [0, 0.05, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
