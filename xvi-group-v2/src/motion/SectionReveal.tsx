import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

type RevealVariant = 'fadeUp' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'clipReveal' | 'depthIn';

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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  },
  clipReveal: {
    hidden: { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0%)', transition: { duration: 0.8, ease } },
  },
  depthIn: {
    hidden: { opacity: 0, y: 30, scale: 0.97, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
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
