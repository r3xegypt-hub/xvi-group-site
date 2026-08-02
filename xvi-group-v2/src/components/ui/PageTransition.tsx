import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease },
  },
  exit: {
    opacity: 0, y: -16, scale: 0.97,
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
        initial: { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
        animate: { opacity: 1, clipPath: 'inset(0 0% 0 0%)', transition: { duration: 0.7, ease } },
        exit: { opacity: 0, clipPath: 'inset(0 0% 0 100%)', transition: { duration: 0.3, ease } },
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
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
