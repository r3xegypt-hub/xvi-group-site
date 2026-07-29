// XVI GROUP — Services Section
// Executive consulting cards

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './Services.module.scss';

const SERVICES = [
  {
    title: 'Business Consulting',
    titleAr: 'الاستشارات الاستراتيجية',
    description: 'Strategic advisory that transforms organizational performance. From market entry to operational restructuring.',
    descriptionAr: 'استشارات استراتيجية تحول أداء المؤسسات. من دخول السوق إلى إعادة الهيكلة التشغيلية.',
    href: '/services/business-consulting',
  },
  {
    title: 'Technology Consulting',
    titleAr: 'استشارات التكنولوجيا',
    description: 'Enterprise technology architecture and implementation. Cloud, infrastructure, and digital transformation.',
    descriptionAr: 'هندسة وتطبيق تكنولوجيا المؤسسات. الحوسبة السحابية والبنية التحتية والتحول الرقمي.',
    href: '/services/technology-consulting',
  },
  {
    title: 'AI Transformation',
    titleAr: 'التحول بالذكاء الاصطناعي',
    description: 'Enterprise AI strategy and implementation. From proof of concept to production-grade intelligent systems.',
    descriptionAr: 'استراتيجية وتطبيق الذكاء الاصطناعي للمؤسسات. من الإثبات إلى الأنظمة الذكية الإنتاجية.',
    href: '/services/ai-transformation',
  },
  {
    title: 'Executive Training',
    titleAr: 'التدريب التنفيذي',
    description: 'Bespoke executive education programs. Leadership development, strategic thinking, and operational excellence.',
    descriptionAr: 'برامج تعليم تنفيذي مخصصة. تطوير القيادة والتفكير الاستراتيجي والتميز التشغيلي.',
    href: '/services/executive-training',
  },
];

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="default" id="services" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <p className={styles.overline}>{ar ? 'خدماتنا' : 'Our Services'}</p>
            <h2 className={styles.title}>{ar ? 'حلول مؤسسية شاملة' : 'Enterprise Solutions'}</h2>
            <p className={styles.description}>
              {ar
                ? 'استشارات تقنية واستراتيجية للمؤسسات التي تعمل على أعلى مستوى.'
                : 'Comprehensive advisory and technology solutions for enterprises operating at the highest level.'}
            </p>
          </div>

          <div className={styles.grid}>
            {SERVICES.map((s, i) => (
              <a key={i} href={s.href} className={styles.card}>
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{ar ? s.titleAr : s.title}</h3>
                <p className={styles.cardDescription}>{ar ? s.descriptionAr : s.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardAccent} aria-hidden="true" />
                  <span className={styles.cardLink}>
                    {ar ? 'المزيد' : 'Learn More'}
                    <ArrowUpRight size={14} />
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
