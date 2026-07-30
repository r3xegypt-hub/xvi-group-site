import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { IntelligenceCounter } from '../../ui/IntelligenceCounter';
import { DataStream } from '../../../motion/DataStream';
import styles from './About.module.scss';

const ease = [0.16, 1, 0.3, 1] as const;

const timeline = [
  {
    year: '2025', title: 'Founded', titleAr: 'التأسيس',
    desc: 'XVI GROUP established in Al Ain to bridge strategic advisory with enterprise AI capability — built on a foundation of decades of combined executive experience.', descAr: 'تأسست XVI GROUP في العين.',
    point: 'FOUNDATION', pointAr: 'التأسيس',
  },
  {
    year: '2026', title: 'Early Engagements', titleAr: 'المشاريع الأولى',
    desc: 'Delivering executive advisory and AI strategy engagements for forward-thinking enterprises across the UAE.', descAr: 'تقديم استشارات تنفيذية.',
    point: 'EARLY MOMENTUM', pointAr: 'الانطلاقة',
  },
  {
    year: '2026+', title: 'Growth & Scale', titleAr: 'النمو والتوسع',
    desc: 'Scaling our sovereign intelligence framework across the region — bringing enterprise-grade AI strategy to ambitious organizations.', descAr: 'توسيع إطار الذكاء السيادي.',
    point: 'REGIONAL AMBITION', pointAr: 'الطموح الإقليمي',
  },
  {
    year: 'Future', title: 'Sovereign Intelligence', titleAr: 'الذكاء السيادي',
    desc: 'Pioneering sovereign AI infrastructure and executive intelligence systems that put enterprises in control of their AI destiny.', descAr: 'ريادة البنية التحتية السيادية.',
    point: 'SOVEREIGN AI ERA', pointAr: 'عصر الذكاء السيادي',
  },
];

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Section variant="warm" id="about" className={styles.section}>
      <DataStream count={15} color="#C8A65A" speed={0.3} />
      <Container>
        <motion.div
          className={styles.editorialIntro}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className={styles.editorialAccent} />
          <blockquote className={styles.editorialQuote}>
            {ar
              ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
              : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
          </blockquote>
          <div className={styles.editorialCredit}>
            <span className={styles.creditLine} />
            <span className={styles.creditText}>XVI GROUP · {ar ? 'الاستراتيجية والذكاء' : 'Strategy & Intelligence'}</span>
          </div>
        </motion.div>

        <div className={styles.timeline} ref={ref}>
          <motion.div
            className={styles.timelineLine}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease }}
            style={{ transformOrigin: 'top' }}
          />
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: i * 0.15 }}
            >
              <div className={styles.timelineDot}>
                <motion.span
                  className={styles.timelineDotInner}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: i * 0.15 + 0.2 }}
                />
              </div>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineContent}>
                <motion.span
                  className={styles.timelinePoint}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease }}
                >
                  {ar ? item.pointAr : item.point}
                </motion.span>
                <h3 className={styles.timelineTitle}>{ar ? item.titleAr : item.title}</h3>
                <p className={styles.timelineDesc}>{ar ? item.descAr : item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
        >
          <div className={styles.statsRowAccent} />
          <div className={styles.statsGrid}>
            <div className={styles.statCell} style={{ border: 'none' }}>
              <span className={styles.statValue}>Vision</span>
              <span className={styles.statDivider} />
              <span className={styles.statLabel}>{ar ? 'استراتيجية' : 'Driven Strategy'}</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>AI</span>
              <span className={styles.statDivider} />
              <span className={styles.statLabel}>{ar ? 'ذكاء أصيل' : 'Native Approach'}</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statDivider} />
              <span className={styles.statLabel}>{ar ? 'تركيز عميل' : 'Client Focus'}</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}