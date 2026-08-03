import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA } from '../../../hooks/useCTA';
import type { JourneyId } from '../../../hooks/journeyContext';
import styles from './Industries.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

const industries = [
  {
    title: { en: 'Financial Services', ar: 'الخدمات المالية' },
    desc: {
      en: 'Risk intelligence and service orchestration',
      ar: 'ذكاء المخاطر وتنسيق الخدمات',
    },
  },
  {
    title: { en: 'Public Sector', ar: 'القطاع العام' },
    desc: {
      en: 'More responsive services and confident operations',
      ar: 'خدمات أكثر استجابة وعمليات واثقة',
    },
  },
  {
    title: { en: 'Complex Enterprise', ar: 'المؤسسات المعقدة' },
    desc: {
      en: 'Connected decisions across people, processes, and platforms',
      ar: 'قرارات متصلة عبر الأشخاص والعمليات والمنصات',
    },
  },
];

const FOCUS_INDEX: Record<JourneyId, number> = {
  executive: 2,
  healthcare: 2,
  government: 1,
  explore: -1,
};

interface Props {
  focus?: JourneyId | null;
}

export function Industries({ focus }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const handleCTA = useCTA();

  const focusIndex = focus ? FOCUS_INDEX[focus] : -1;
  const ordered = focusIndex >= 0
    ? [industries[focusIndex], ...industries.filter((_, i) => i !== focusIndex)]
    : industries;

  return (
    <section id="industries" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? '٠٣ / القرار التالي' : '03 / THE NEXT DECISION'}
          </motion.span>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {ar
              ? 'أحضر الذكاء المناسب إلى الطاولة.'
              : 'Bring the right intelligence to the table.'}
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? 'ابدأ بالسؤال المهم. سنساعدك في تشكيل المسار من الطموح إلى الواقع التشغيلي.'
              : 'Start with the question that matters. We\'ll help shape the path from aspiration to operating reality.'}
          </motion.p>

          <MotionLink
            to="/contact"
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            onClick={handleCTA}
          >
            {ar ? 'ابدأ محادثة' : 'Start a conversation'}
          </MotionLink>
        </div>

        <div className={styles.list}>
          {/* ── Industry visual banner ── */}
          <div className={styles.industryPhoto}>
            <img
              src={`${import.meta.env.BASE_URL}images/industries_visual.jpg`}
              alt={ar ? 'القطاعات التي نخدمها' : 'Industries we serve'}
              className={styles.industryPhotoImg}
              loading="lazy"
            />
            <div className={styles.industryPhotoOverlay} />
            <div className={styles.industryChips}>
              <span className={styles.industryChip}>
                <strong>3</strong> {ar ? 'قطاعات أساسية' : 'Core sectors'}
              </span>
              <span className={styles.industryChip}>
                <strong>6</strong> {ar ? 'ممارسات قطاعية' : 'Industry practices'}
              </span>
              <span className={styles.industryChip}>
                <strong>100%</strong> {ar ? 'قيادة تنفيذية' : 'Executive-led engagements'}
              </span>
            </div>
          </div>

          {ordered.map((item, i) => {
            const isFocus = focusIndex >= 0 && item === industries[focusIndex];
            return (
              <motion.div
                key={item.title.en}
                className={`${styles.item} ${isFocus ? styles.focused : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
              >
                <div className={styles.itemRow}>
                  {isFocus && (
                    <span className={styles.focusTag}>
                      {ar ? 'مسارك المختار' : 'Your journey'}
                    </span>
                  )}
                  <h3 className={styles.itemTitle}>
                    {ar ? item.title.ar : item.title.en}
                  </h3>
                </div>
                <p className={styles.itemDesc}>
                  {ar ? item.desc.ar : item.desc.en}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
