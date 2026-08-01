import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './About.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const timeline = [
  {
    year: '2025', title: 'Founded', titleAr: 'التأسيس',
    desc: 'XVI GROUP established in Al Ain to bridge strategic advisory with enterprise AI capability.',
    descAr: 'تأسست XVI GROUP في العين لدمج الاستشارات الاستراتيجية مع قدرات الذكاء الاصطناعي.',
  },
  {
    year: '2026', title: 'Early Engagements', titleAr: 'المشاريع الأولى',
    desc: 'Delivering executive advisory and AI strategy engagements for forward-thinking enterprises across the UAE.',
    descAr: 'تقديم استشارات تنفيذية واستراتيجيات ذكاء اصطناعي للمؤسسات في الإمارات.',
  },
  {
    year: '2026+', title: 'Regional Growth', titleAr: 'النمو الإقليمي',
    desc: 'Scaling our sovereign intelligence framework across the region.',
    descAr: 'توسيع إطار الذكاء السيادي عبر المنطقة.',
  },
  {
    year: 'Future', title: 'Sovereign AI', titleAr: 'الذكاء السيادي',
    desc: 'Pioneering sovereign AI infrastructure for enterprises in control of their intelligence destiny.',
    descAr: 'ريادة البنية التحتية السيادية للذكاء الاصطناعي.',
  },
];

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Section variant="white" id="about" className={styles.section}>
      <Container>
        <motion.div
          className={styles.introBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className={styles.overline}>{ar ? 'عن XVI' : 'ABOUT XVI'}</p>
          <blockquote className={styles.quote}>
            {ar
              ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
              : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
          </blockquote>
          <div className={styles.quoteCredit}>
            <span className={styles.creditLine} />
            <span>XVI GROUP · {ar ? 'الاستراتيجية والذكاء' : 'Strategy & Intelligence'}</span>
          </div>
        </motion.div>

        <div className={styles.imageRow}>
          <motion.div
            className={styles.imageFrame}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div className={styles.imageBg} />
            <div className={styles.imageOverlay} />
            <svg
              className={styles.imageArt}
              viewBox="0 0 1600 700"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="about-art-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <line x1="120" y1="180" x2="1480" y2="180" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.18" />
              <line x1="120" y1="520" x2="1480" y2="520" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.18" />
              <line x1="220" y1="80" x2="220" y2="620" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.12" />
              <line x1="1380" y1="80" x2="1380" y2="620" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.12" />
              <polygon points="800,120 920,350 800,580 680,350" fill="none" stroke="url(#about-art-gold)" strokeWidth="2" />
              <polygon points="800,230 860,350 800,470 740,350" fill="none" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="800" y1="120" x2="800" y2="580" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.25" />
              <line x1="680" y1="350" x2="920" y2="350" stroke="#C8A65A" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="800" cy="350" r="4" fill="#C8A65A" fillOpacity="0.8" />
              <circle cx="280" cy="260" r="3" fill="#C8A65A" fillOpacity="0.5" />
              <circle cx="1320" cy="260" r="3" fill="#C8A65A" fillOpacity="0.5" />
              <circle cx="280" cy="440" r="3" fill="#C8A65A" fillOpacity="0.5" />
              <circle cx="1320" cy="440" r="3" fill="#C8A65A" fillOpacity="0.5" />
              <line x1="280" y1="260" x2="680" y2="350" stroke="#C8A65A" strokeWidth="0.75" strokeOpacity="0.3" />
              <line x1="920" y1="350" x2="1320" y2="260" stroke="#C8A65A" strokeWidth="0.75" strokeOpacity="0.3" />
              <line x1="280" y1="440" x2="680" y2="350" stroke="#C8A65A" strokeWidth="0.75" strokeOpacity="0.3" />
              <line x1="920" y1="350" x2="1320" y2="440" stroke="#C8A65A" strokeWidth="0.75" strokeOpacity="0.3" />
            </svg>
          </motion.div>

          <motion.div
            className={styles.imageCaption}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={styles.captionLine} />
            <span>{ar ? 'المقر الرئيسي — العين، الإمارات' : 'Headquarters — Al Ain, UAE'}</span>
          </motion.div>
        </div>

        <div className={styles.timelineWrap} ref={ref}>
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
          <div className={styles.statCell}>
            <span className={styles.statValue}>Vision</span>
            <span className={styles.statAccent} />
            <span className={styles.statLabel}>{ar ? 'استراتيجية قيادية' : 'Strategic Vision'}</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>AI</span>
            <span className={styles.statAccent} />
            <span className={styles.statLabel}>{ar ? 'نهج أصيل' : 'AI-Native Approach'}</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statAccent} />
            <span className={styles.statLabel}>{ar ? 'تركيز العميل' : 'Client Focus'}</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}