import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface IntelligenceCounterProps {
  value: string;
  label: string;
  labelAr?: string;
  className?: string;
  prefix?: string;
}

export function IntelligenceCounter({ value, label, labelAr, className, prefix }: IntelligenceCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const isNumeric = !isNaN(Number(value.replace(/[^0-9]/g, '')));

  return (
    <div ref={ref} className={className}>
      <motion.span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(2rem, 3vw, 3rem)',
          fontWeight: 400,
          color: '#111111',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {prefix && <span style={{ fontSize: '0.5em', color: '#C8A65A', marginRight: 4 }}>{prefix}</span>}
        {isNumeric ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {value}
          </motion.span>
        )}
      </motion.span>
      <motion.span
        style={{
          display: 'block',
          width: 24,
          height: 1,
          background: '#C8A65A',
          marginTop: 8,
          marginBottom: 8,
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.8125rem',
          fontWeight: 400,
          color: '#999999',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {labelAr || label}
      </span>
    </div>
  );
}
