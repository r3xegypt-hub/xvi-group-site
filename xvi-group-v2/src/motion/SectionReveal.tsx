import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

type RevealVariant = 'fadeUp' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'clipReveal' | 'depthIn' | 'goldSweep';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  margin?: string;
  once?: boolean;
}

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40, filter: 'blur(2px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94, filter: 'blur(2px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60, filter: 'blur(2px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60, filter: 'blur(2px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  },
  clipReveal: {
    hidden: { opacity: 0, clipPath: 'inset(0 50% 0 50%)', filter: 'blur(3px)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0%)', filter: 'blur(0px)', transition: { duration: 0.9, ease } },
  },
  depthIn: {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
  },
  goldSweep: {
    hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 1.0, ease },
    },
  },
};

export function SectionReveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration,
  margin = '-80px',
  once = true,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  const baseVariants = variantMap[variant];
  const resolvedVariants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(baseVariants.visible as any)?.transition,
        delay,
        ...(duration ? { duration } : {}),
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={resolvedVariants}
    >
      {children}
    </motion.div>
  );
}
