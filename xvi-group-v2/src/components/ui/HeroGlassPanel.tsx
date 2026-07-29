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
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid rgba(200,166,90,${borderOpacity})`,
        pointerEvents: 'none',
        zIndex: 0,
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
    />
  );
}
