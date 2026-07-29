// XVI GROUP — Services Section (Sprint 02)
// Executive luxury card system with animated SVG icons

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Services.module.scss';

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className={styles.serviceIcon}>
        <rect x="8" y="8" width="48" height="48" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        <path d="M32 18L42 32L32 46L22 32Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M32 24L37 32L32 40L27 32Z" fill="currentColor" opacity="0.1" />
        <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.4">
          <animate attributeName="r" values="2;3;2" dur="2.5s" repeatCount="indefinite" />
        </circle>
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
        <rect x="12" y="44" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="16" y="34" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <rect x="20" y="24" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <rect x="24" y="14" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="32" cy="8" r="3" stroke="currentColor" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="8" r="1.2" fill="currentColor" opacity="0.5" />
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
        <path d="M32 6L58 32L32 58L6 32Z" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <path d="M32 22L42 32L32 42L22 32Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
        <circle cx="32" cy="32" r="3.5" fill="currentColor" opacity="0.25">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="58" cy="32" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="32" cy="58" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="32" r="2.5" stroke="currentColor" strokeWidth="1.2" />
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
        <path d="M32 8L52 28L44 28L44 52L20 52L20 28L12 28Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" opacity="0.5" />
        <path d="M32 8L38 14L32 20L26 14Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
        <circle cx="32" cy="14" r="1.5" fill="currentColor" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <line x1="32" y1="20" x2="16" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="2 2" />
        <line x1="32" y1="20" x2="48" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="2 2" />
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
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="services" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'خدماتنا' : 'Our Services'}</p>
            <h2 className={styles.title}>{ar ? 'حلول مؤسسية شاملة' : 'Enterprise Solutions'}</h2>
            <p className={styles.description}>
              {ar
                ? 'استشارات تقنية واستراتيجية مُصمَّمة للمؤسسات التي تعمل على أعلى مستوى من الكفاءة والأداء.'
                : 'Comprehensive advisory and technology solutions designed for enterprises operating at the highest level.'}
            </p>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {SERVICES.map((service, i) => (
              <a key={i} href={service.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.cardIcon}>{service.icon}</div>
                </div>
                <h3 className={styles.cardTitle}>{ar ? service.titleAr : service.title}</h3>
                <p className={styles.cardDescription}>{ar ? service.descriptionAr : service.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardAccent} aria-hidden="true" />
                  <span className={styles.cardLink}>
                    {ar ? 'المزيد' : 'Learn More'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
