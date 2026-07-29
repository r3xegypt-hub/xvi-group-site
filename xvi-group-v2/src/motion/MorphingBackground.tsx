import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MorphingBackgroundProps {
  className?: string;
  colors?: string[];
}

export function MorphingBackground({
  className,
  colors = ['rgba(247,246,243,1)', 'rgba(200,166,90,0.03)', 'rgba(19,34,56,0.02)'],
}: MorphingBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      `radial-gradient(ellipse at 20% 50%, ${colors[0]} 0%, transparent 70%)`,
      `radial-gradient(ellipse at 80% 50%, ${colors[1]} 0%, transparent 70%)`,
      `radial-gradient(ellipse at 50% 80%, ${colors[2]} 0%, transparent 70%)`,
    ]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background,
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'background',
      }}
    />
  );
}
