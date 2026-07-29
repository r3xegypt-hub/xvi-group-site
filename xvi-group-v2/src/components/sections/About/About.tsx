import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { IntelligenceCounter } from '../../ui/IntelligenceCounter';
import { DataStream } from '../../../motion/DataStream';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const timeline = [
  {
    year: '2020',
    title: 'Founded',
    titleAr: 'التأسيس',
    desc: 'XVI GROUP established in Dubai to bridge strategic advisory with enterprise AI capability.',
    descAr: 'تأسست XVI GROUP في دبي لسد الفجوة بين الاستشارات الاستراتيجية وقدرات الذكاء الاصطناعي.',
    point: 'ENTITY ESTABLISHED',
    pointAr: 'تأسيس الكيان',
  },
  {
    year: '2022',
    title: '50+ Projects',
    titleAr: '٥٠+ مشروع',
    desc: 'Expanded across MENA with a portfolio of digital transformation and AI strategy engagements.',
    descAr: 'التوسع عبر منطقة الشرق الأوسط وشمال أفريقيا بمحفظة من مشاريع التحول الرقمي.',
    point: 'REGIONAL EXPANSION',
    pointAr: 'التوسع الإقليمي',
  },
  {
    year: '2024',
    title: '200+ Enterprise Clients',
    titleAr: '٢٠٠+ عميل مؤسسي',
    desc: 'Became the trusted AI partner for leading enterprises across 12 countries.',
    descAr: 'أصبحنا الشريك الموثوق للذكاء الاصطناعي للمؤسسات الرائدة في ١٢ دولة.',
    point: 'MARKET LEADERSHIP',
    pointAr: 'الريادة السوقية',
  },
  {
    year: '2026',
    title: 'Sovereign Intelligence',
    titleAr: 'الذكاء السيادي',
    desc: 'Pioneering sovereign AI infrastructure and executive intelligence systems.',
    descAr: 'ريادة البنية التحتية السيادية للذكاء الاصطناعي وأنظمة الاستخبارات التنفيذية.',
    point: 'SOVEREIGN AI ERA',
    pointAr: 'عصر الذكاء السيادي',
  },
];

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const statsRef = useRef(null);

  return (
    <Section variant="warm" id="about" className={styles.section}>
      <DataStream count={15} color="#C8A65A" speed={0.3} />
      <Container>
        <motion.div
          className={styles.heroQuote}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <blockquote className={styles.quote}>
            {ar
              ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
              : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
          </blockquote>
        </motion.div>

        <div className={styles.timeline}>
          <motion.div
            className={styles.timelineLine}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
            style={{ transformOrigin: 'top' }}
          />
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.15 }}
            >
              <div className={styles.timelineDot}>
                <motion.span
                  className={styles.timelineDotInner}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: i * 0.15 + 0.2 }}
                />
              </div>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineContent}>
                <motion.span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#C8A65A',
                    marginBottom: 4,
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
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
          ref={statsRef}
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
        >
          <IntelligenceCounter
            value="200+"
            label="Projects"
            labelAr="مشروع"
            className={styles.stat}
          />
          <IntelligenceCounter
            value="12"
            label="Countries"
            labelAr="دولة"
            className={styles.stat}
            prefix=""
          />
          <IntelligenceCounter
            value="100%"
            label="Delivery"
            labelAr="التزام"
            className={styles.stat}
          />
        </motion.div>
      </Container>
    </Section>
  );
}
