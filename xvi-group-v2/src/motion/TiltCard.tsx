import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
  depthOffset?: number;
}

export function TiltCard({
  children,
  className,
  tiltDegree = 12,
  glare = true,
  depthOffset = 25,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 240, damping: 24, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltDegree, tiltDegree]);

  const glareX = useTransform(xSpring, [0, 1], ['5%', '95%']);
  const glareY = useTransform(ySpring, [0, 1], ['5%', '95%']);
  const glareOpacity = useTransform(ySpring, [0, 0.5, 1], [0.15, 0.05, 0.15]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={shouldReduceMotion ? undefined : handleMouse}
      onMouseLeave={shouldReduceMotion ? undefined : handleLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        willChange: 'transform',
      }}
      whileHover={shouldReduceMotion ? undefined : {
        scale: 1.015,
        z: depthOffset,
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
    >
      {children}
      {!shouldReduceMotion && glare && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(200, 166, 90, ${glareOpacity}) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </motion.div>
  );
}

