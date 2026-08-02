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
  },
  {
    num: '02',
    title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' },
    desc: {
      en: 'Design operational flows that free expert attention for consequential work.',
      ar: 'تصميم تدفقات تشغيل تحرر انتباه الخبراء للعمل المهم.',
    },
    bg: 'dark' as const,
  },
  {
    num: '03',
    title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
    desc: {
      en: 'Build clarity, confidence, and governance into every transformation step.',
      ar: 'بناء الوضوح والثقة والحوكمة في كل خطوة تحول.',
    },
    bg: 'bordered' as const,
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
                    <span className={styles.cardNum}>{service.num}</span>
                    <h3 className={styles.cardTitle}>
                      {ar ? service.title.ar : service.title.en}
                    </h3>
                    <p className={styles.cardDesc}>
                      {ar ? service.desc.ar : service.desc.en}
                    </p>
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
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

