import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import type { JourneyId } from '../../../hooks/journeyContext';
import { MouseReactive } from '../../../motion/MouseReactive';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    num: '01',
    title: { en: 'Strategic AI', ar: '╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è' },
    desc: {
      en: 'Frame the highest-value decisions before selecting the tools.',
      ar: '╪╡┘è╪º╪║╪⌐ ╪ú╪╣┘ä┘ë ╪º┘ä┘é╪▒╪º╪▒╪º╪¬ ┘é┘è┘à╪⌐ ┘é╪¿┘ä ╪º╪«╪¬┘è╪º╪▒ ╪º┘ä╪ú╪»┘ê╪º╪¬.',
    },
    bg: 'light' as const,
  },
  {
    num: '02',
    title: { en: 'Automation Architecture', ar: '┘ç┘å╪»╪│╪⌐ ╪º┘ä╪ú╪¬┘à╪¬╪⌐' },
    desc: {
      en: 'Design operational flows that free expert attention for consequential work.',
      ar: '╪¬╪╡┘à┘è┘à ╪¬╪»┘ü┘é╪º╪¬ ╪¬╪┤╪║┘è┘ä ╪¬╪¡╪▒╪▒ ╪º┘å╪¬╪¿╪º┘ç ╪º┘ä╪«╪¿╪▒╪º╪í ┘ä┘ä╪╣┘à┘ä ╪º┘ä┘à┘ç┘à.',
    },
    bg: 'dark' as const,
  },
  {
    num: '03',
    title: { en: 'Executive Adoption', ar: '╪º┘ä╪¬╪¿┘å┘è ╪º┘ä╪¬┘å┘ü┘è╪░┘è' },
    desc: {
      en: 'Build clarity, confidence, and governance into every transformation step.',
      ar: '╪¿┘å╪º╪í ╪º┘ä┘ê╪╢┘ê╪¡ ┘ê╪º┘ä╪½┘é╪⌐ ┘ê╪º┘ä╪¡┘ê┘â┘à╪⌐ ┘ü┘è ┘â┘ä ╪«╪╖┘ê╪⌐ ╪¬╪¡┘ê┘ä.',
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
  const isInView = useInView(ref, { once: true });

  const focusIndex = focus ? FOCUS_INDEX[focus] : -1;
  const ordered = focusIndex >= 0
    ? [services[focusIndex], ...services.filter((_, i) => i !== focusIndex)]
    : services;

  return (
    <section id="solutions" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          {ar ? '┘á┘í / ╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ╪º┘ä╪░┘â┘è╪⌐' : '01 / INTELLIGENT OPERATIONS'}
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {ar
            ? 'انتقل من حالات الاستخدام المعزولة إلى نظام ذكاء متصل.'
            : 'Move from isolated use cases to a connected intelligence system.'}
        </motion.h2>

        {/* ── Visual showcase: photo strip above the cards ── */}
        <motion.div
          className={styles.visualStrip}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          <div className={styles.visualStripText}>
            <p className={styles.visualStripBody}>
              {ar
                ? 'من الاستراتيجية إلى التشغيل — نبني أنظمة ذكاء تعمل في الواقع، لا في العروض التقديمية.'
                : 'From strategy to operations — we build intelligence systems that work in reality, not just in presentations.'}
            </p>
            <div className={styles.visualStripStats}>
              <div className={styles.visualStat}>
                <span className={styles.visualStatNum}>94%</span>
                <span className={styles.visualStatLabel}>{ar ? 'معدل نجاح التبني' : 'Adoption success rate'}</span>
              </div>
              <div className={styles.visualStat}>
                <span className={styles.visualStatNum}>3×</span>
                <span className={styles.visualStatLabel}>{ar ? 'متوسط عائد الاستثمار' : 'Average ROI multiple'}</span>
              </div>
              <div className={styles.visualStat}>
                <span className={styles.visualStatNum}>60d</span>
                <span className={styles.visualStatLabel}>{ar ? 'إلى أول نتيجة' : 'To first outcome'}</span>
              </div>
            </div>
          </div>
          <div className={styles.visualStripPhoto}>
            <img
              src="/images/services_visual.jpg"
              alt={ar ? 'فريق يعمل على حلول الذكاء الاصطناعي' : 'Team working on AI solutions'}
              className={styles.visualStripImg}
              loading="lazy"
            />
            <div className={styles.visualStripImgOverlay} />
          </div>
        </motion.div>

        <div className={styles.grid}>
          {ordered.map((service, i) => {
            const isFocus = focusIndex >= 0 && service === services[focusIndex];
            return (
              <MouseReactive key={service.num} intensity={6} perspective={1000}>
              <motion.div
                className={`${styles.card} ${styles[service.bg]} ${isFocus ? styles.focused : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
              >
                {isFocus && (
                  <span className={styles.focusTag}>
                    {ar ? '┘à╪│╪º╪▒┘â ╪º┘ä┘à╪«╪¬╪º╪▒' : 'Your journey'}
                  </span>
                )}
                <span className={styles.cardNum}>{service.num}</span>
                <h3 className={styles.cardTitle}>
                  {ar ? service.title.ar : service.title.en}
                </h3>
                <p className={styles.cardDesc}>
                  {ar ? service.desc.ar : service.desc.en}
                </p>
              </motion.div>
              </MouseReactive>
            );
          })}
        </div>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          <Link to="/services" className={styles.ctaLink}>
            {ar ? '╪º╪╣╪▒┘ü ╪º┘ä┘à╪▓┘è╪»' : 'Learn More'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
