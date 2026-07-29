import { motion } from 'framer-motion';

interface LightBeamProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  intensity?: number;
  color?: string;
}

export function LightBeam({
  className,
  position = 'top-right',
  intensity = 0.15,
  color = '#C8A65A',
}: LightBeamProps) {
  const positions: Record<string, { top: string; left: string; right: string; bottom: string; transform: string }> = {
    'top-left': { top: '-10%', left: '-10%', right: 'auto', bottom: 'auto', transform: 'rotate(135deg)' },
    'top-right': { top: '-10%', left: 'auto', right: '-10%', bottom: 'auto', transform: 'rotate(-135deg)' },
    'bottom-left': { top: 'auto', left: '-10%', right: 'auto', bottom: '-10%', transform: 'rotate(45deg)' },
    'bottom-right': { top: 'auto', left: 'auto', right: '-10%', bottom: '-10%', transform: 'rotate(-45deg)' },
    'center': { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%) rotate(0deg)' },
  };

  const pos = positions[position];

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...pos,
        width: '80%',
        height: '200%',
        background: `linear-gradient(180deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
        opacity: 0,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
