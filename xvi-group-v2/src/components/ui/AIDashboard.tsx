import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../layout/Container';

const ease: Easing = [0.16, 1, 0.3, 1];

const pillars = [
  {
    value: 'Sovereign',
    valueAr: 'سيادي',
    label: 'Owned infrastructure',
    labelAr: 'بنية مملوكة',
  },
  {
    value: 'Governed',
    valueAr: 'محكوم',
    label: 'End-to-end governance',
    labelAr: 'حوكمة شاملة',
  },
  {
    value: 'Measured',
    valueAr: 'مُقاس',
    label: 'Outcome-driven design',
    labelAr: 'تصميم مدفوع بالنتائج',
  },
  {
    value: 'Scalable',
    valueAr: 'قابل للتوسع',
    label: 'Built for growth',
    labelAr: 'مصمم للنمو',
  },
  {
    value: 'Secure',
    valueAr: 'آمن',
    label: 'Privacy by default',
    labelAr: 'الخصوصية افتراضياً',
  },
];

export function AIDashboard() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{
      background: '#ECEAE6',
      padding: '32px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(200,166,90,0.03) 0%, transparent 60%)',
        }}
        animate={isInView ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 24,
          position: 'relative',
          zIndex: 1,
        }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: '12px 16px',
                borderRight: i < pillars.length - 1 ? '1px solid rgba(63,67,72,0.06)' : 'none',
              }}
            >
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                fontWeight: 400,
                color: '#C8A65A',
                lineHeight: 1.15,
              }}>
                {ar ? p.valueAr : p.value}
              </div>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 500,
                color: '#90949A',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                {ar ? p.labelAr : p.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
