import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA } from '../../../hooks/useCTA';
import { TiltCard } from '../../../motion/TiltCard';
import type { JourneyId } from '../../../hooks/journeyContext';
import styles from './Industries.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

// SVG icons per industry
function IconFinancial() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <rect x="6" y="28" width="6" height="14" rx="2" fill="#C8A65A" fillOpacity="0.7" />
      <rect x="16" y="20" width="6" height="22" rx="2" fill="#C8A65A" fillOpacity="0.85" />
      <rect x="26" y="14" width="6" height="28" rx="2" fill="#C8A65A" />
      <rect x="36" y="8" width="6" height="34" rx="2" fill="#C8A65A" fillOpacity="0.9" style={{ filter: 'drop-shadow(0 0 6px rgba(200,166,90,0.6))' }} />
      <path d="M 6 28 Q 16 16 26 14 Q 36 12 42 8" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 2" fill="none" />
    </svg>
  );
}

function IconPublic() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <polygon points="24,4 44,18 44,44 4,44 4,18" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.7" strokeLinejoin="round" />
      <rect x="16" y="28" width="6" height="16" rx="1" stroke="#C8A65A" strokeWidth="1.2" strokeOpacity="0.5" />
      <rect x="26" y="28" width="6" height="16" rx="1" stroke="#C8A65A" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="24" cy="18" r="4" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="24" cy="18" r="1.5" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 4px rgba(200,166,90,0.9))' }} />
      <line x1="4" y1="44" x2="44" y2="44" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  );
}

function IconEnterprise() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <circle cx="24" cy="8" r="4" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="8" cy="36" r="4" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="40" cy="36" r="4" stroke="#C8A65A" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="24" cy="24" r="3" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 5px rgba(200,166,90,0.9))' }} />
      <line x1="24" y1="12" x2="24" y2="21" stroke="#C8A65A" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="21" y1="26" x2="11" y2="33" stroke="#C8A65A" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="27" y1="26" x2="37" y2="33" stroke="#C8A65A" strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  );
}

const industries = [
  {
    title: { en: 'Financial Services', ar: 'الخدمات المالية' },
    desc: {
      en: 'Risk intelligence and service orchestration',
      ar: 'ذكاء المخاطر وتنسيق الخدمات',
    },
    icon: <IconFinancial />,
    stat: { value: '$24B', label: { en: 'value created', ar: 'قيمة مولّدة' } },
    accentColor: '#C8A65A',
  },
  {
    title: { en: 'Public Sector', ar: 'القطاع العام' },
    desc: {
      en: 'More responsive services and confident operations',
      ar: 'خدمات أكثر استجابة وعمليات واثقة',
    },
    icon: <IconPublic />,
    stat: { value: '40+', label: { en: 'national programs', ar: 'برنامج وطني' } },
    accentColor: '#A08040',
  },
  {
    title: { en: 'Complex Enterprise', ar: 'المؤسسات المعقدة' },
    desc: {
      en: 'Connected decisions across people, processes, and platforms',
      ar: 'قرارات متصلة عبر الأشخاص والعمليات والمنصات',
    },
    icon: <IconEnterprise />,
    stat: { value: '92%', label: { en: 'repeat clients', ar: 'عملاء متكررون' } },
    accentColor: '#BF9950',
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
      {/* Background image */}
      <div className={styles.bgLayer} aria-hidden="true">
        <img src="/images/industries_visual.jpg" alt="" className={styles.bgPhoto} />
        <div className={styles.bgPhotoOverlay} />
      </div>

      <div className={styles.container}>
        {/* ── Header column ── */}
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
              : "Start with the question that matters. We'll help shape the path from aspiration to operating reality."}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginInlineStart: 8 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MotionLink>
        </div>

        {/* ── Industry cards grid ── */}
        <div className={styles.cardsGrid}>
          {ordered.map((item, i) => {
            const isFocus = focusIndex >= 0 && item === industries[focusIndex];
            return (
              <motion.div
                key={item.title.en}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.3 + i * 0.1 }}
              >
                <TiltCard tiltDegree={8} glare depthOffset={20}>
                  <div className={`${styles.card} ${isFocus ? styles.focused : ''}`}>
                    {isFocus && (
                      <span className={styles.focusTag}>
                        {ar ? 'مسارك المختار' : 'Your journey'}
                      </span>
                    )}

                    {/* Icon */}
                    <div className={styles.cardIcon}>{item.icon}</div>

                    {/* Title */}
                    <h3 className={styles.cardTitle}>
                      {ar ? item.title.ar : item.title.en}
                    </h3>

                    {/* Description */}
                    <p className={styles.cardDesc}>
                      {ar ? item.desc.ar : item.desc.en}
                    </p>

                    {/* Stat chip */}
                    <div className={styles.statChip}>
                      <span className={styles.statValue}>{item.stat.value}</span>
                      <span className={styles.statLabel}>
                        {ar ? item.stat.label.ar : item.stat.label.en}
                      </span>
                    </div>

                    {/* Bottom accent bar */}
                    <div className={styles.cardBar} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
