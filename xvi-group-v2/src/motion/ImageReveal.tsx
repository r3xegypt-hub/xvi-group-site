import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  aspectRatio?: string;
}

export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = 'left',
  aspectRatio = '4/3',
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const clipFrom = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
  };

  const clipTo = 'inset(0 0 0 0)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
      }}
    >
      <motion.div
        initial={{ clipPath: clipFrom[direction] }}
        animate={isInView ? { clipPath: clipTo } : { clipPath: clipFrom[direction] }}
        transition={{ duration: 1.2, delay, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'clip-path',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#C8A65A',
          transformOrigin: direction === 'left' || direction === 'up' ? 'right' : 'left',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
