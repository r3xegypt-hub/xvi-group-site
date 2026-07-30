import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../layout/Container';

const ease: Easing = [0.16, 1, 0.3, 1];

const kpis = [
  {
    value: '99.9%',
    label: 'Uptime',
    labelAr: 'وقت التشغيل',
    trend: '+0.4',
    trendAr: '٠٫٤+',
  },
  {
    value: '2.4s',
    label: 'Avg Response',
    labelAr: 'متوسط الاستجابة',
    trend: '-0.8s',
    trendAr: '٠٫٨ث-',
  },
  {
    value: '96%',
    label: 'Accuracy',
    labelAr: 'الدقة',
    trend: '+2.1',
    trendAr: '٢٫١+',
  },
  {
    value: '7',
    label: 'Active Models',
    labelAr: 'نماذج نشطة',
    trend: '+2',
    trendAr: '٢+',
  },
  {
    value: '12.4K',
    label: 'Data Points',
    labelAr: 'نقطة بيانات',
    trend: '+1.2K',
    trendAr: '١٫٢ك+',
  },
];

export function AIDashboard() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{
      background: '#111111',
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
          {kpis.map((kpi, i) => (
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
                borderRight: i < kpis.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              }}
            >
              <div style={{
                fontFamily: "'Manrope', Georgia, serif",
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 400,
                color: '#C8A65A',
                lineHeight: 1,
              }}>
                {kpi.value}
              </div>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {ar ? kpi.labelAr : kpi.label}
              </div>
              <motion.div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.5625rem',
                  fontWeight: 500,
                  color: kpi.trend.startsWith('+') ? '#2D6A4F' : '#C8A65A',
                  letterSpacing: '0.04em',
                }}
                animate={isInView ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
              >
                {ar ? kpi.trendAr : kpi.trend}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
