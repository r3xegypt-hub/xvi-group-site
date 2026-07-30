import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

const easeCurve: Easing = [0.16, 1, 0.3, 1];

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(2px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, delay, ease: easeCurve },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerGroup({ children, className, once = true }: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(2px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: easeCurve },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  const variants: Record<string, { opacity: number; y?: number; x?: number; scale?: number; filter?: string }> = {
    up: { opacity: 0, y: 30, filter: 'blur(2px)' },
    down: { opacity: 0, y: -20, filter: 'blur(2px)' },
    left: { opacity: 0, x: -30, filter: 'blur(2px)' },
    right: { opacity: 0, x: 30, filter: 'blur(2px)' },
    scale: { opacity: 0, scale: 0.95, filter: 'blur(2px)' },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variants[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' } : variants[direction]}
      transition={{ duration: 0.8, delay, ease: easeCurve }}
    >
      {children}
    </motion.div>
  );
}
