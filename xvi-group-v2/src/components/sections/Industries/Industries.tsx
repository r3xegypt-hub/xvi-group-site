import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './Industries.module.scss';

const ease = [0.16, 1, 0.3, 1] as const;

const INDUSTRIES = [
  {
    title: 'Technology', titleAr: 'التكنولوجيا',
    description: 'Digital infrastructure, cloud architecture, and AI platform strategy for technology enterprises scaling for the next decade.',
    descriptionAr: 'البنية التحتية الرقمية وهندسة السحابة.', stat: '40+', statLabel: 'Engagements', statLabelAr: 'مشروع',
    color: '#C8A65A',
    lines: [
      { label: 'Cloud-Native', value: '90%' },
      { label: 'AI-Adopted', value: '75%' },
    ],
  },
  {
    title: 'Finance', titleAr: 'المالية',
    description: 'Strategic AI advisory for banking, investment management, and financial services navigating digital transformation.',
    descriptionAr: 'استشارات ذكاء اصطناعي للخدمات المالية.', stat: '25+', statLabel: 'Institutions', statLabelAr: 'مؤسسة',
    color: '#132238',
    lines: [
      { label: 'Risk Models', value: '40+' },
      { label: 'Compliance', value: '100%' },
    ],
  },
  {
    title: 'Healthcare', titleAr: 'الصحة',
    description: 'AI-powered clinical intelligence, operational optimization, and digital health platform strategy for healthcare systems.',
    descriptionAr: 'ذكاء اصطناعي للرعاية الصحية.', stat: '18+', statLabel: 'Health Systems', statLabelAr: 'نظام صحي',
    color: '#C8A65A',
    lines: [
      { label: 'Clinical AI', value: '12+' },
      { label: 'Efficiency', value: '+35%' },
    ],
  },
  {
    title: 'Energy', titleAr: 'الطاقة',
    description: 'Energy transition AI, sustainability analytics, and operational intelligence for the evolving energy landscape.',
    descriptionAr: 'ذكاء اصطناعي لتحول الطاقة.', stat: '12+', statLabel: 'Projects', statLabelAr: 'مشروع',
    color: '#132238',
    lines: [
      { label: 'Optimization', value: '+25%' },
      { label: 'Emissions', value: '-40%' },
    ],
  },
];

export function Industries() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="warm" id="industries" className={styles.section}>
      <Container>
        <motion.div
          className={styles.headerBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className={styles.overline}>{ar ? 'القطاعات' : 'INDUSTRIES'}</p>
          <div className={styles.headerSplit}>
            <h2 className={styles.title}>{ar ? 'خبرة قطاعية عميقة' : 'Sector Expertise'}</h2>
            <p className={styles.headerDesc}>
              {ar ? 'خبرة عميقة في القطاعات الرئيسية التي تشكّل اقتصاد الغد.' : 'Deep experience across the sectors shaping tomorrow\'s economy.'}
            </p>
          </div>
        </motion.div>

        <div className={styles.grid} ref={ref}>
          {INDUSTRIES.map((item, i) => (
            <motion.article
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
            >
              <div className={styles.cardVisual} style={{ background: `linear-gradient(135deg, ${item.color}04, transparent)` }}>
                <svg viewBox="0 0 200 200" className={styles.cardSvg}>
                  <rect x="10" y="10" width="180" height="180" rx="1" stroke={item.color} strokeWidth="0.3" opacity="0.1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke={item.color} strokeWidth="0.2" strokeDasharray="3 6" opacity="0.15" />
                  <circle cx="100" cy="100" r="3" fill={item.color} opacity="0.2" />
                  {item.lines.map((_, j) => {
                    const angle = (j * 60 + i * 30) * Math.PI / 180;
                    return (
                      <line key={j}
                        x1="100" y1="100"
                        x2={100 + 70 * Math.cos(angle)} y2={100 + 70 * Math.sin(angle)}
                        stroke={item.color} strokeWidth="0.15" opacity="0.06" />
                    );
                  })}
                </svg>
                <div className={styles.cardStat}>
                  <span className={styles.cardStatValue}>{item.stat}</span>
                  <span className={styles.cardStatLabel}>{ar ? item.statLabelAr : item.statLabel}</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{ar ? item.titleAr : item.title}</h3>
                <p className={styles.cardDesc}>{ar ? item.descriptionAr : item.description}</p>
                <div className={styles.cardMetrics}>
                  {item.lines.map((line, j) => (
                    <div key={j} className={styles.metric}>
                      <span className={styles.metricValue} style={{ color: item.color }}>{line.value}</span>
                      <span className={styles.metricLabel}>{line.label}</span>
                    </div>
                  ))}
                </div>
                <motion.a
                  href="#"
                  className={styles.cardLink}
                  whileHover={{ x: 4 }}
                  style={{ color: item.color }}
                >
                  {ar ? 'استكشف' : 'Explore'} <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}