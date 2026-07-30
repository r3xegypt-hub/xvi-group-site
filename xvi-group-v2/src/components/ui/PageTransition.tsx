import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

const transition = { duration: 0.6, ease };

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)', scale: 0.98 },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition,
  },
  exit: {
    opacity: 0, y: -12, filter: 'blur(4px)', scale: 0.98,
    transition: { duration: 0.35, ease },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'standard' | 'maskReveal';
}

export function PageTransition({ children, variant = 'standard' }: PageTransitionProps) {
  const location = useLocation();

  const variants = variant === 'maskReveal'
    ? {
        initial: { opacity: 0, clipPath: 'inset(0 50% 0 50%)', filter: 'blur(6px)' },
        animate: { opacity: 1, clipPath: 'inset(0 0% 0 0%)', filter: 'blur(0px)', transition: { duration: 0.7, ease } },
        exit: { opacity: 0, clipPath: 'inset(0 0% 0 100%)', filter: 'blur(4px)', transition: { duration: 0.3, ease } },
      }
    : pageVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants as Variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'transform, opacity, filter, clip-path' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
