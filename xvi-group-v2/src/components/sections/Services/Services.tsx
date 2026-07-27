// XVI GROUP — Services Section
// Architectural personality with diamond card icons

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Services.module.scss';

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.serviceIcon}>
        <path d="M24 6L42 24L24 42L6 24Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 14L34 24L24 34L14 24Z" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
        <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="42" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="24" y1="42" x2="24" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="6" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      </svg>
    ),
    title: 'Business Consulting',
    titleAr: 'الاستشارات الاستراتيجية',
    description: 'Strategic advisory that transforms organizational performance. From market entry to operational restructuring.',
    descriptionAr: 'استشارات استراتيجية تحول أداء المؤسسات. من دخول السوق إلى إعادة الهيكلة التشغيلية.',
    href: '/services/business-consulting',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.serviceIcon}>
        <rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.25" />
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    title: 'Technology Consulting',
    titleAr: 'استشارات التكنولوجيا',
    description: 'Enterprise technology architecture and implementation. Cloud, infrastructure, and digital transformation.',
    descriptionAr: 'هندسة وتطبيق تكنولوجيا المؤسسات. الحوسبة السحابية والبنية التحتية والتحول الرقمي.',
    href: '/services/technology-consulting',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.serviceIcon}>
        <path d="M24 6L42 24L24 42L6 24Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 14L34 24L24 34L14 24Z" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M24 19L29 24L24 29L19 24Z" fill="currentColor" opacity="0.15" />
        <circle cx="24" cy="10" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="38" cy="24" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="38" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="10" cy="24" r="2" fill="currentColor" opacity="0.4" />
        <line x1="24" y1="10" x2="24" y2="19" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <line x1="38" y1="24" x2="29" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <line x1="24" y1="38" x2="24" y2="29" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <line x1="10" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      </svg>
    ),
    title: 'AI Transformation',
    titleAr: 'التحول بالذكاء الاصطناعي',
    description: 'Enterprise AI strategy and implementation. From proof of concept to production-grade intelligent systems.',
    descriptionAr: 'استراتيجية وتطبيق الذكاء الاصطناعي للمؤسسات. من الإثبات الأولي إلى الأنظمة الذكية الكاملة.',
    href: '/services/ai-transformation',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.serviceIcon}>
        <path d="M14 42L24 6L34 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="32" x2="31" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="16" r="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="24" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
        <line x1="24" y1="6" x2="24" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="18" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <line x1="30" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      </svg>
    ),
    title: 'Executive Training',
    titleAr: 'التدريب التنفيذي',
    description: 'Bespoke executive education programs. Leadership development, strategic thinking, and operational excellence.',
    descriptionAr: 'برامج تعليم تنفيذي مخصصة. تطوير القيادة والتفكير الاستراتيجي والتميز التشغيلي.',
    href: '/services/executive-training',
  },
];

export function Services() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 700, stagger: 120 });

  return (
    <Section variant="warm" id="services">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'خدماتنا' : 'OUR SERVICES'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar' ? 'حلول مؤسسية شاملة' : 'Enterprise Solutions'}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'استشارات تقنية واستراتيجية مُصمَّمة للمؤسسات التي تعمل على أعلى مستوى من الكفاءة والأداء.'
              : 'Comprehensive advisory and technology solutions designed for enterprises operating at the highest level.'}
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {SERVICES.map((service, i) => (
            <a key={i} href={service.href} className={styles.card}>
              <div className={styles.cardIcon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>
                {language === 'ar' ? service.titleAr : service.title}
              </h3>
              <p className={styles.cardDescription}>
                {language === 'ar' ? service.descriptionAr : service.description}
              </p>
              <span className={styles.cardLink}>
                {language === 'ar' ? 'المزيد ←' : 'Learn More →'}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
