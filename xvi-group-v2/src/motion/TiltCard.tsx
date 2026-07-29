import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltDegree = 8,
  glare = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltDegree, tiltDegree]);

  const glareX = useTransform(xSpring, [0, 1], ['0%', '100%']);
  const glareY = useTransform(ySpring, [0, 1], ['0%', '100%']);

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
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ z: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(200,166,90,0.06) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
