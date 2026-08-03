import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  as: Component = 'button',
  href,
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 20, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={shouldReduceMotion ? undefined : handleMouse}
      onMouseLeave={shouldReduceMotion ? undefined : handleLeave}
      className={className}
      style={{
        x: shouldReduceMotion ? 0 : xSpring,
        y: shouldReduceMotion ? 0 : ySpring,
        willChange: 'transform',
        display: 'inline-block',
        position: 'relative',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={onClick}
    >
      {Component === 'a' && href ? (
        <a href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );
}

