import type { Variants, Transition, Easing } from 'framer-motion';

// Stripe & Motion.page signature easing curves
export const easeCurve: Easing = [0.16, 1, 0.3, 1] as Easing; // Snappy acceleration, smooth deceleration
export const easeSmooth: Easing = [0.25, 0.1, 0.25, 1] as Easing;
export const easeCinematic: Easing = [0.77, 0, 0.175, 1] as Easing;

export const ease: Transition = {
  duration: 0.7,
  ease: easeCurve,
};

export const easeFast: Transition = {
  duration: 0.4,
  ease: easeCurve,
};

export const easeSlow: Transition = {
  duration: 1.0,
  ease: easeCurve,
};

export const springPhysics: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: ease,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: ease,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: ease,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: ease,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: ease,
  },
};

export const perspectiveIn: Variants = {
  hidden: { opacity: 0, rotateX: -15, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easeCurve,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const cardStagger: Variants = {
  hidden: { opacity: 0, y: 35, rotateX: -8, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: easeCurve,
      delay: i * 0.08,
    },
  }),
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easeCurve,
    },
  },
};

export const lineExpand: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.9,
      ease: easeCurve,
    },
  },
};

export const orbPulse: Variants = {
  idle: {
    scale: 1,
    opacity: 0.8,
  },
  active: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

