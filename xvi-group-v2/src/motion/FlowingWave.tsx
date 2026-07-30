import { motion } from 'framer-motion';

interface FlowingWaveProps {
  className?: string;
  color?: string;
  opacity?: number;
  speed?: number;
}

export function FlowingWave({ className, color = '#C8A65A', opacity = 0.03, speed = 1 }: FlowingWaveProps) {
  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', width: '200%', height: '100%', left: '-50%' }} preserveAspectRatio="none" viewBox="0 0 1200 400">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity={opacity} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 200 Q150 50 300 200 T600 200 T900 200 T1200 200"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth={1}
          animate={{ d: [
            'M0 200 Q150 50 300 200 T600 200 T900 200 T1200 200',
            'M0 200 Q150 350 300 200 T600 200 T900 200 T1200 200',
            'M0 200 Q150 50 300 200 T600 200 T900 200 T1200 200',
          ]}}
          transition={{ duration: 8 / speed, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0 220 Q200 80 400 220 T800 220 T1200 220"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth={0.5}
          animate={{ d: [
            'M0 220 Q200 80 400 220 T800 220 T1200 220',
            'M0 220 Q200 360 400 220 T800 220 T1200 220',
            'M0 220 Q200 80 400 220 T800 220 T1200 220',
          ]}}
          transition={{ duration: 10 / speed, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
