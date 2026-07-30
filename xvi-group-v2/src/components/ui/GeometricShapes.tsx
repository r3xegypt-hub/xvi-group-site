import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Shape {
  id: number;
  type: 'circle' | 'rect' | 'diamond' | 'triangle';
  x: number; y: number; size: number;
  rotate: number; opacity: number;
  delay: number; duration: number;
}

interface GeometricShapesProps {
  className?: string;
  count?: number;
  color?: string;
}

const shapeTypes: Shape['type'][] = ['circle', 'rect', 'diamond', 'triangle'];

export function GeometricShapes({ className, count = 8, color = '#C8A65A' }: GeometricShapesProps) {
  const shapes = useMemo<Shape[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: shapeTypes[i % shapeTypes.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      rotate: Math.random() * 360,
      opacity: 0.02 + Math.random() * 0.04,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 8,
    }));
  }, [count]);

  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {shapes.map((s) => {
        const isDiamond = s.type === 'diamond';
        return (
          <motion.div
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.type === 'triangle' ? s.size * 0.866 : s.size,
              border: s.type === 'triangle' ? 'none' : `1px solid ${color}`,
              borderRadius: s.type === 'circle' ? '50%' : s.type === 'rect' ? 2 : 0,
              transform: isDiamond ? 'rotate(45deg)' : 'none',
              opacity: s.opacity,
              ...(s.type === 'triangle' ? {
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: 'none',
                border: 'none',
                borderTop: `1px solid ${color}`,
              } : {}),
            } as React.CSSProperties}
            animate={{
              y: [0, -8, 0],
              rotate: [s.rotate, s.rotate + 10, s.rotate],
              opacity: [s.opacity, s.opacity * 1.5, s.opacity],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
