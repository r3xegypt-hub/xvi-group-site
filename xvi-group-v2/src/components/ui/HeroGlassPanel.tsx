import { motion } from 'framer-motion';

interface HeroGlassPanelProps {
  width?: number;
  height?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  blur?: number;
  opacity?: number;
  delay?: number;
  borderOpacity?: number;
}

export function HeroGlassPanel({
  width = 200,
  height = 280,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  blur = 12,
  opacity = 0.6,
  delay = 0,
  borderOpacity = 0.06,
}: HeroGlassPanelProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width,
        height,
        top,
        left,
        right,
        bottom,
        background: 'linear-gradient(150deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.6) 100%)',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid rgba(200,166,90,${borderOpacity})`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 40px rgba(63,67,72,0.10)',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 40, rotate: rotate - 5 }}
      animate={{
        opacity: [0, opacity, opacity + 0.05, opacity],
        y: [40, 0, -8, 0],
        rotate: [rotate - 5, rotate, rotate + 0.5, rotate],
      }}
      transition={{
        duration: 8 + delay,
        times: [0, 0.15, 0.5, 1],
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay * 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 42%, rgba(255,255,255,0.12) 55%, transparent 75%)',
        }}
      />
    </motion.div>
  );
}
