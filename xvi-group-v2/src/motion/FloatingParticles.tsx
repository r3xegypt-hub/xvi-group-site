import { useEffect, useRef, useMemo } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export function FloatingParticles({
  count = 20,
  color = '#C8A65A',
  speed = 1,
  className,
}: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.3 + 0.05,
      duration: (Math.random() * 10 + 8) / speed,
      delay: Math.random() * 5,
    }));
  }, [count, speed]);

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
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
          }}
          animate={{
            y: [0, -30, 0],
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

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  duration?: number;
}

export function AnimatedGradient({
  className,
  colors = ['rgba(200, 166, 90, 0.03)', 'rgba(200, 166, 90, 0.01)', 'rgba(247, 246, 243, 0)'],
  duration = 10,
}: AnimatedGradientProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      background: [
        `radial-gradient(ellipse at 30% 20%, ${colors[0]} 0%, transparent 60%)`,
        `radial-gradient(ellipse at 70% 80%, ${colors[1]} 0%, transparent 60%)`,
        `radial-gradient(ellipse at 50% 50%, ${colors[2]} 0%, transparent 60%)`,
        `radial-gradient(ellipse at 30% 20%, ${colors[0]} 0%, transparent 60%)`,
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }, [controls, colors, duration]);

  return (
    <motion.div
      className={className}
      animate={controls}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
