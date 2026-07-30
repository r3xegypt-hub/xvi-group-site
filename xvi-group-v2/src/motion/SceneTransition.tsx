import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

interface SceneTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'blurIn' | 'scaleIn' | 'clipReveal' | 'slideUp' | 'depthIn';
  delay?: number;
  duration?: number;
}

const ease: Easing = [0.16, 1, 0.3, 1];

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  clipReveal: {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: { clipPath: 'inset(0 0 0% 0)' },
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  depthIn: {
    hidden: { opacity: 0, y: 40, rotateX: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
};

export function SceneTransition({
  children,
  className,
  variant = 'fade',
  delay = 0,
  duration = 0.6,
}: SceneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, ease, delay }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.3, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? `translateY(${speed * 20}px)` : 'translateY(0px)',
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}