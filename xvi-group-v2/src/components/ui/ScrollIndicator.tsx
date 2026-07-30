import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        zIndex: 10,
      }}
    >
      <motion.span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.5625rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#999999',
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll
      </motion.span>
      <motion.div
        style={{
          width: 1,
          height: 32,
          background: 'linear-gradient(to bottom, rgba(200,166,90,0.4), transparent)',
        }}
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
