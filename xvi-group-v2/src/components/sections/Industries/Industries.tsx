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
    title: { en: 'Financial Services', ar: '╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à╪º┘ä┘è╪⌐' },
    desc: {
      en: 'Risk intelligence and service orchestration',
      ar: '╪░┘â╪º╪í ╪º┘ä┘à╪«╪º╪╖╪▒ ┘ê╪¬┘å╪│┘è┘é ╪º┘ä╪«╪»┘à╪º╪¬',
    },
  },
  {
    title: { en: 'Public Sector', ar: '╪º┘ä┘é╪╖╪º╪╣ ╪º┘ä╪╣╪º┘à' },
    desc: {
      en: 'More responsive services and confident operations',
      ar: '╪«╪»┘à╪º╪¬ ╪ú┘â╪½╪▒ ╪º╪│╪¬╪¼╪º╪¿╪⌐ ┘ê╪╣┘à┘ä┘è╪º╪¬ ┘ê╪º╪½┘é╪⌐',
    },
  },
  {
    title: { en: 'Complex Enterprise', ar: '╪º┘ä┘à╪ñ╪│╪│╪º╪¬ ╪º┘ä┘à╪╣┘é╪»╪⌐' },
    desc: {
      en: 'Connected decisions across people, processes, and platforms',
      ar: '┘é╪▒╪º╪▒╪º╪¬ ┘à╪¬╪╡┘ä╪⌐ ╪╣╪¿╪▒ ╪º┘ä╪ú╪┤╪«╪º╪╡ ┘ê╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ┘ê╪º┘ä┘à┘å╪╡╪º╪¬',
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
            {ar ? '┘á┘ú / ╪º┘ä┘é╪▒╪º╪▒ ╪º┘ä╪¬╪º┘ä┘è' : '03 / THE NEXT DECISION'}
          </motion.span>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {ar
              ? '╪ú╪¡╪╢╪▒ ╪º┘ä╪░┘â╪º╪í ╪º┘ä┘à┘å╪º╪│╪¿ ╪Ñ┘ä┘ë ╪º┘ä╪╖╪º┘ê┘ä╪⌐.'
              : 'Bring the right intelligence to the table.'}
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? '╪º╪¿╪»╪ú ╪¿╪º┘ä╪│╪ñ╪º┘ä ╪º┘ä┘à┘ç┘à. ╪│┘å╪│╪º╪╣╪»┘â ┘ü┘è ╪¬╪┤┘â┘è┘ä ╪º┘ä┘à╪│╪º╪▒ ┘à┘å ╪º┘ä╪╖┘à┘ê╪¡ ╪Ñ┘ä┘ë ╪º┘ä┘ê╪º┘é╪╣ ╪º┘ä╪¬╪┤╪║┘è┘ä┘è.'
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
            {ar ? '╪º╪¿╪»╪ú ┘à╪¡╪º╪»╪½╪⌐' : 'Start a conversation'}
          </MotionLink>
        </div>

        {/* ── Industry visual banner ── */}
        <motion.div
          className={styles.industryPhoto}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/industries_visual.jpg`}
            alt={ar ? 'القطاعات التي نخدمها' : 'Industries we serve'}
            className={styles.industryPhotoImg}
            loading="lazy"
          />
          <div className={styles.industryPhotoOverlay} />
          {/* Floating stat chips on the image */}
          <div className={styles.industryChips}>
            <span className={styles.industryChip}>
              <strong>$24B+</strong> {ar ? 'أصول مُدارة' : 'AUM advised'}
            </span>
            <span className={styles.industryChip}>
              <strong>40+</strong> {ar ? 'جهة حكومية' : 'Gov. entities'}
            </span>
            <span className={styles.industryChip}>
              <strong>92%</strong> {ar ? 'رضا العملاء' : 'Client satisfaction'}
            </span>
          </div>
        </motion.div>

        <div className={styles.list}>

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
                      {ar ? '┘à╪│╪º╪▒┘â ╪º┘ä┘à╪«╪¬╪º╪▒' : 'Your journey'}
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
