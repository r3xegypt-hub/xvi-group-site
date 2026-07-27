// XVI GROUP — Industries Section
// Structured bento grid personality

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Industries.module.scss';

const INDUSTRIES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: 'Technology',
    titleAr: 'التكنولوجيا',
    description: 'Digital transformation, cloud architecture, and AI implementation for technology enterprises.',
    descriptionAr: 'التحول الرقمي وهندسة الحوسبة السحابية وتطبيق الذكاء الاصطناعي لمؤسسات التكنولوجيا.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L36 20L20 36L4 20Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: 'Finance',
    titleAr: 'المالية',
    description: 'Strategic advisory for banking, investment, and financial services across the Gulf.',
    descriptionAr: 'استشارات استراتيجية للبنوك والاستثمارات والخدمات المالية في جميع أنحاء الخليج.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 36C10 30 14 26 20 26C26 26 30 30 30 36" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Healthcare',
    titleAr: 'الصحة',
    description: 'Healthcare transformation, digital health platforms, and operational excellence.',
    descriptionAr: 'تحول الرعاية الصحية ومنصات الصحة الرقمية والتميز التشغيلي.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L36 14V26L20 36L4 26V14L20 4Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: 'Energy',
    titleAr: 'الطاقة',
    description: 'Energy transition strategy, sustainability advisory, and operational optimization.',
    descriptionAr: 'استراتيجية انتقال الطاقة والاستشارات البيئية وتحسين الأداء.',
  },
];

export function Industries() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'scale', duration: 700, stagger: 120 });

  return (
    <Section variant="default" id="industries">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'القطاعات' : 'INDUSTRIES'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar' ? 'القطاعات التي نخدمها' : 'Sectors We Serve'}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'خبراء عميقة في القطاعات الرئيسية التي تشكّل اقتصاد الغد.'
              : 'Deep expertise in the core sectors shaping tomorrow\'s economy.'}
          </p>
        </div>

        <div ref={gridRef} className={styles.bentoGrid}>
          {INDUSTRIES.map((industry, i) => (
            <div key={i} className={`${styles.bentoCard} ${i === 0 ? styles.bentoLarge : ''}`}>
              <div className={styles.cardIcon}>{industry.icon}</div>
              <h3 className={styles.cardTitle}>
                {language === 'ar' ? industry.titleAr : industry.title}
              </h3>
              <p className={styles.cardDescription}>
                {language === 'ar' ? industry.descriptionAr : industry.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
