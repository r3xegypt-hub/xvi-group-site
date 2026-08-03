import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import type { JourneyId } from '../../../hooks/journeyContext';
import { TiltCard } from '../../../motion/TiltCard';
import { MagneticButton } from '../../../motion/MagneticButton';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    num: '01',
    title: { en: 'Strategic AI', ar: 'الذكاء الاستراتيجي' },
    desc: {
      en: 'Frame the highest-value decisions before selecting the tools.',
      ar: 'صياغة أعلى القرارات قيمة قبل اختيار الأدوات.',
    },
    bg: 'light' as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
        <circle cx="24" cy="24" r="10" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="24" cy="24" r="4" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 6px rgba(200,166,90,0.8))' }} />
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 24 + 10 * Math.cos(rad);
          const y1 = 24 + 10 * Math.sin(rad);
          const x2 = 24 + 22 * Math.cos(rad);
          const y2 = 24 + 22 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.4" />;
        })}
        <circle cx="24" cy="2" r="2" fill="#C8A65A" fillOpacity="0.7" />
        <circle cx="24" cy="46" r="2" fill="#C8A65A" fillOpacity="0.7" />
        <circle cx="2" cy="24" r="2" fill="#C8A65A" fillOpacity="0.7" />
        <circle cx="46" cy="24" r="2" fill="#C8A65A" fillOpacity="0.7" />
      </svg>
    ),
  },
  {
    num: '02',
    title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' },
    desc: {
      en: 'Design operational flows that free expert attention for consequential work.',
      ar: 'تصميم تدفقات تشغيل تحرر انتباه الخبراء للعمل المهم.',
    },
    bg: 'dark' as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
        <rect x="4" y="18" width="12" height="12" rx="3" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.7" />
        <rect x="20" y="8" width="12" height="12" rx="3" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="20" y="28" width="12" height="12" rx="3" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="36" y="18" width="12" height="12" rx="3" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="16" y1="24" x2="20" y2="14" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="16" y1="24" x2="20" y2="34" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="32" y1="14" x2="36" y2="24" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="32" y1="34" x2="36" y2="24" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="10" cy="24" r="2.5" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 4px rgba(200,166,90,0.9))' }} />
        <circle cx="42" cy="24" r="2.5" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 4px rgba(200,166,90,0.9))' }} />
      </svg>
    ),
  },
  {
    num: '03',
    title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
    desc: {
      en: 'Build clarity, confidence, and governance into every transformation step.',
      ar: 'بناء الوضوح والثقة والحوكمة في كل خطوة تحول.',
    },
    bg: 'bordered' as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
        <polygon points="24,4 44,36 4,36" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.6" strokeLinejoin="round" />
        <polygon points="24,12 38,36 10,36" stroke="#C8A65A" strokeWidth="0.8" strokeOpacity="0.3" strokeLinejoin="round" />
        <circle cx="24" cy="4" r="2" fill="#C8A65A" fillOpacity="0.9" style={{ filter: 'drop-shadow(0 0 5px rgba(200,166,90,0.9))' }} />
        <line x1="24" y1="20" x2="24" y2="36" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="17" y1="28" x2="31" y2="28" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
];

const FOCUS_INDEX: Record<JourneyId, number> = {
  executive: 0,
  healthcare: 1,
  government: 2,
  explore: -1,
};

interface Props {
  focus?: JourneyId | null;
}

export function Services({ focus }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const focusIndex = focus ? FOCUS_INDEX[focus] : -1;
  const ordered = focusIndex >= 0
    ? [services[focusIndex], ...services.filter((_, i) => i !== focusIndex)]
    : services;

  return (
    <section id="solutions" className={styles.section} ref={ref}>
      {/* Background image layer */}
      <div className={styles.bgImage} aria-hidden="true">
        <img
          src="/images/services_visual.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'grayscale(20%)' }}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Ambient decorative lines */}
      <div className={styles.ambientLines} aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          {ar ? '٠١ / العمليات الذكية' : '01 / INTELLIGENT OPERATIONS'}
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {ar
            ? 'انتقل من حالات الاستخدام المعزولة إلى نظام ذكاء متصل.'
            : 'Move from isolated use cases to a connected intelligence system.'}
        </motion.h2>

        <div className={styles.grid}>
          {ordered.map((service, i) => {
            const isFocus = focusIndex >= 0 && service === services[focusIndex];
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 28, rotateX: -12 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.12 }}
              >
                <TiltCard tiltDegree={10} glare={true} depthOffset={20}>
                  <div
                    className={`${styles.card} ${styles[service.bg]} ${isFocus ? styles.focused : ''}`}
                  >
                    {isFocus && (
                      <span className={styles.focusTag}>
                        {ar ? 'مسارك المختار' : 'Your journey'}
                      </span>
                    )}
                    {/* Icon */}
                    <div className={styles.cardIcon}>
                      {service.icon}
                    </div>
                    <span className={styles.cardNum}>{service.num}</span>
                    <h3 className={styles.cardTitle}>
                      {ar ? service.title.ar : service.title.en}
                    </h3>
                    <p className={styles.cardDesc}>
                      {ar ? service.desc.ar : service.desc.en}
                    </p>
                    {/* Bottom gold accent line */}
                    <div className={styles.cardAccent} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease, delay: 0.55 }}
        >
          <MagneticButton strength={0.35}>
            <Link to="/services" className={styles.ctaLink}>
              {ar ? 'اعرف المزيد' : 'Learn More'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginInlineStart: 8 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
