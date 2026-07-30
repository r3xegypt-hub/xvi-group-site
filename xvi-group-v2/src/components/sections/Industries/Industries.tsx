import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './Industries.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const INDUSTRIES = [
  {
    title: 'Technology', titleAr: 'التكنولوجيا',
    desc: 'Digital infrastructure, cloud architecture, and AI platform strategy for technology enterprises scaling for the next decade.',
    descAr: 'البنية التحتية الرقمية، هندسة السحابة، واستراتيجية منصات الذكاء الاصطناعي.',
    stat: '40+ Engagements',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',
  },
  {
    title: 'Finance', titleAr: 'المالية',
    desc: 'Strategic AI advisory for banking, investment management, and financial services navigating digital transformation.',
    descAr: 'استشارات ذكاء اصطناعي استراتيجية للخدمات المالية.',
    stat: '25+ Institutions',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=85',
  },
  {
    title: 'Healthcare', titleAr: 'الصحة',
    desc: 'AI-powered clinical intelligence, operational optimization, and digital health platform strategy for healthcare systems.',
    descAr: 'ذكاء اصطناعي سريري وتحسين تشغيلي للأنظمة الصحية.',
    stat: '18+ Health Systems',
    image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1600&q=85',
  },
  {
    title: 'Energy', titleAr: 'الطاقة',
    desc: 'Energy transition AI, sustainability analytics, and operational intelligence for the evolving energy landscape.',
    descAr: 'ذكاء اصطناعي لتحول الطاقة واستدامتها.',
    stat: '12+ Projects',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85',
  },
];

export function Industries() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="navy" id="industries" className={styles.section}>
      <Container>
        <motion.div
          className={styles.headerBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className={styles.overline}>{ar ? 'القطاعات' : 'SECTORS'}</p>
          <h2 className={styles.title}>{ar ? 'خبرة قطاعية' : 'Sector Expertise'}</h2>
          <p className={styles.headerDesc}>
            {ar ? 'خبرة عميقة في القطاعات التي تشكّل اقتصاد الغد.' : 'Deep experience across the sectors shaping tomorrow\'s economy.'}
          </p>
        </motion.div>
      </Container>

      <div className={styles.gallery} ref={ref}>
        {INDUSTRIES.map((item, i) => (
          <motion.article
            key={i}
            className={styles.world}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.12 }}
          >
            <div className={styles.worldImage} style={{ backgroundImage: `url(${item.image})` }}>
              <div className={styles.worldOverlay} />
              <div className={styles.worldContent}>
                <h3 className={styles.worldTitle}>{ar ? item.titleAr : item.title}</h3>
                <p className={styles.worldDesc}>{ar ? item.descAr : item.desc}</p>
                <span className={styles.worldStat}>{item.stat}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}