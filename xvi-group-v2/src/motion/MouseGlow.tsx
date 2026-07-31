import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotion } from './providers/MotionProvider';

interface MouseGlowProps {
  color?: string;
  radius?: number;
  className?: string;
}

export function MouseGlow({ color = '#C8A65A', radius = 300, className }: MouseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const [isVisible, setIsVisible] = useState(false);
  const { prefersReducedMotion } = useMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const handleLeave = () => {
      x.set(-1000);
      y.set(-1000);
      setIsVisible(false);
    };
    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [x, y, isVisible, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}44 0%, ${color}22 30%, transparent 70%)`,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      />
    </motion.div>
  );
}