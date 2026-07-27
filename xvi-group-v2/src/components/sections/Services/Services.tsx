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
      <svg viewBox="0 0 64 64" fill="none" className={styles.serviceIcon}>
        {/* Business Consulting — Strategic Grid: 4 quadrants with central diamond */}
        <rect x="8" y="8" width="48" height="48" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        {/* Central diamond — strategy nexus */}
        <path d="M32 18L42 32L32 46L22 32Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
        <path d="M32 24L37 32L32 40L27 32Z" fill="currentColor" opacity="0.1" />
        {/* Growth arrows at corners */}
        <path d="M12 20L20 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M44 12L52 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M52 44L44 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M20 52L12 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        {/* Connection lines from center to corners */}
        <line x1="32" y1="32" x2="14" y2="14" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
        <line x1="32" y1="32" x2="50" y2="14" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
        <line x1="32" y1="32" x2="50" y2="50" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
        <line x1="32" y1="32" x2="14" y2="50" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
        {/* Center dot */}
        <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.4" />
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
      <svg viewBox="0 0 64 64" fill="none" className={styles.serviceIcon}>
        {/* Technology Consulting — Layered Architecture: stacked layers with connections */}
        <rect x="12" y="44" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="16" y="34" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <rect x="20" y="24" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <rect x="24" y="14" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        {/* Vertical connection lines */}
        <line x1="32" y1="14" x2="32" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <line x1="28" y1="22" x2="28" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="36" y1="22" x2="36" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="24" y1="32" x2="24" y2="34" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="40" y1="32" x2="40" y2="34" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        {/* Top node — crown jewel */}
        <circle cx="32" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="8" r="1.2" fill="currentColor" opacity="0.5" />
        {/* Side nodes */}
        <circle cx="20" cy="48" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="48" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="44" cy="48" r="1.5" fill="currentColor" opacity="0.2" />
        {/* Horizontal connectors */}
        <line x1="12" y1="48" x2="20" y2="48" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
        <line x1="44" y1="48" x2="52" y2="48" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
        {/* Data flow dots */}
        <circle cx="26" cy="18" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="38" cy="18" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="22" cy="28" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="42" cy="28" r="0.8" fill="currentColor" opacity="0.2" />
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
      <svg viewBox="0 0 64 64" fill="none" className={styles.serviceIcon}>
        {/* AI Transformation — Neural Diamond Network */}
        <path d="M32 6L58 32L32 58L6 32Z" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <path d="M32 14L50 32L32 50L14 32Z" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M32 22L42 32L32 42L22 32Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
        <path d="M32 26L38 32L32 38L26 32Z" fill="currentColor" opacity="0.08" />
        {/* Neural network nodes at cardinal points */}
        <circle cx="32" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="58" cy="32" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="32" cy="58" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="32" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        {/* Inner nodes */}
        <circle cx="32" cy="14" r="1.8" fill="currentColor" opacity="0.3" />
        <circle cx="50" cy="32" r="1.8" fill="currentColor" opacity="0.3" />
        <circle cx="32" cy="50" r="1.8" fill="currentColor" opacity="0.3" />
        <circle cx="14" cy="32" r="1.8" fill="currentColor" opacity="0.3" />
        {/* Connection lines */}
        <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="58" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="32" y1="58" x2="32" y2="50" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <line x1="6" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        {/* Diagonal connections */}
        <line x1="32" y1="14" x2="14" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="32" y1="14" x2="50" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="32" y1="50" x2="14" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="32" y1="50" x2="50" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        {/* Center intelligence node */}
        <circle cx="32" cy="32" r="3.5" fill="currentColor" opacity="0.25" />
        <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="0.6" />
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
      <svg viewBox="0 0 64 64" fill="none" className={styles.serviceIcon}>
        {/* Executive Training — Ascending Pyramid with Knowledge Hierarchy */}
        <path d="M32 8L52 28L44 28L44 52L20 52L20 28L12 28Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" opacity="0.5" />
        {/* Internal structure — knowledge layers */}
        <line x1="20" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <line x1="22" y1="44" x2="42" y2="44" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        {/* Apex — leadership diamond */}
        <path d="M32 8L38 14L32 20L26 14Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
        {/* Side nodes — team members */}
        <circle cx="16" cy="30" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="48" cy="30" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="24" cy="38" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="38" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="46" r="1.5" fill="currentColor" opacity="0.2" />
        {/* Connection lines — mentorship paths */}
        <line x1="32" y1="20" x2="16" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="2 2" />
        <line x1="32" y1="20" x2="48" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="2 2" />
        <line x1="16" y1="30" x2="24" y2="38" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="48" y1="30" x2="40" y2="38" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="24" y1="38" x2="32" y2="46" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        <line x1="40" y1="38" x2="32" y2="46" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeDasharray="2 2" />
        {/* Center dot — core knowledge */}
        <circle cx="32" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
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
