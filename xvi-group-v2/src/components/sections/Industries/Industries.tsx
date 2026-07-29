// XVI GROUP — Industries Section (Sprint 02)
// Executive consulting layout with animated iconography

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Industries.module.scss';

const INDUSTRIES = [
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className={styles.industryIcon}>
        <rect x="8" y="8" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="14" y="14" width="28" height="28" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="28" cy="28" r="8" stroke="currentColor" strokeWidth="1.5">
          <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: 'Technology',
    titleAr: 'التكنولوجيا',
    description: 'Digital transformation, cloud architecture, and AI implementation for technology enterprises.',
    descriptionAr: 'التحول الرقمي وهندسة الحوسبة السحابية وتطبيق الذكاء الاصطناعي لمؤسسات التكنولوجيا.',
    stat: '40+',
    statLabel: 'Tech mandates',
    statLabelAr: 'تكليف تقني',
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className={styles.industryIcon}>
        <path d="M28 6L50 28L28 50L6 28Z" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <path d="M28 14L42 28L28 42L14 28Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="28" y1="14" x2="28" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    title: 'Finance',
    titleAr: 'المالية',
    description: 'Strategic advisory for banking, investment, and financial services across the Gulf.',
    descriptionAr: 'استشارات استراتيجية للبنوك والاستثمارات والخدمات المالية في جميع أنحاء الخليج.',
    stat: '25+',
    statLabel: 'Financial institutions',
    statLabelAr: 'مؤسسة مالية',
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className={styles.industryIcon}>
        <circle cx="28" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 48C12 38 18 32 28 32C38 32 44 38 44 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="10" x2="28" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="28" cy="20" r="3" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    title: 'Healthcare',
    titleAr: 'الصحة',
    description: 'Healthcare transformation, digital health platforms, and operational excellence.',
    descriptionAr: 'تحول الرعاية الصحية ومنصات الصحة الرقمية والتميز التشغيلي.',
    stat: '18+',
    statLabel: 'Health systems',
    statLabelAr: 'نظام صحي',
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className={styles.industryIcon}>
        <path d="M28 4L48 16V40L28 52L8 40V16L28 4Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="28" y1="4" x2="28" y2="52" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <line x1="8" y1="28" x2="48" y2="28" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <circle cx="28" cy="28" r="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08">
          <animate attributeName="r" values="3.5;5;3.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    title: 'Energy',
    titleAr: 'الطاقة',
    description: 'Energy transition strategy, sustainability advisory, and operational optimization.',
    descriptionAr: 'استراتيجية انتقال الطاقة والاستشارات البيئية وتحسين الأداء.',
    stat: '12+',
    statLabel: 'Energy projects',
    statLabelAr: 'مشروع طاقة',
  },
];

export function Industries() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 700, stagger: 100 });
  const ar = language === 'ar';

  return (
    <Section variant="default" id="industries" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'القطاعات' : 'Industries'}</p>
            <h2 className={styles.title}>{ar ? 'القطاعات التي نخدمها' : 'Sectors We Serve'}</h2>
            <p className={styles.description}>
              {ar
                ? 'خبرة عميقة في القطاعات الرئيسية التي تشكّل اقتصاد الغد.'
                : 'Deep expertise in the core sectors shaping tomorrow\'s economy.'}
            </p>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {INDUSTRIES.map((industry, i) => (
              <article key={i} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>{industry.icon}</div>
                  <div className={styles.cardStat}>
                    <span className={styles.statValue}>{industry.stat}</span>
                    <span className={styles.statLabel}>{ar ? industry.statLabelAr : industry.statLabel}</span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{ar ? industry.titleAr : industry.title}</h3>
                <p className={styles.cardDescription}>{ar ? industry.descriptionAr : industry.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardAccent} aria-hidden="true" />
                  <span className={styles.cardLink}>
                    {ar ? 'استكشف' : 'Explore'}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
