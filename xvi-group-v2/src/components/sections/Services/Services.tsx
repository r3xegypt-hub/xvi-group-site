import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import styles from './Services.module.scss';

const SERVICES = [
  {
    index: '01',
    title: 'Strategy & Advisory',
    titleAr: 'الاستراتيجية والاستشارات',
    description: 'AI roadmap development, opportunity assessment, governance frameworks, and enterprise AI strategy.',
    descriptionAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية الذكاء الاصطناعي للمؤسسات.',
  },
  {
    index: '02',
    title: 'AI Engineering',
    titleAr: 'هندسة الذكاء الاصطناعي',
    description: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.',
    descriptionAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
  },
  {
    index: '03',
    title: 'Operational Design',
    titleAr: 'التصميم التشغيلي',
    description: 'Process reengineering, automation strategy, change management, and operational excellence programs.',
    descriptionAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
  },
  {
    index: '04',
    title: 'Intelligence Products',
    titleAr: 'منتجات الذكاء',
    description: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.',
    descriptionAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
  },
];

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="ink" id="services" className={styles.section}>
      <Container>
        <SectionHeader
          overline={ar ? 'خدماتنا' : 'SERVICES'}
          title={ar ? 'ما نقدمه' : 'What We Deliver'}
          description={ar
            ? 'تحول شامل بالذكاء الاصطناعي لأكثر مؤسسات الشرق الأوسط طموحاً.'
            : 'End-to-end AI transformation for the Middle East\'s most ambitious enterprises.'
          }
        />

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <a key={i} href={`/services/${s.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.card}>
              <span className={styles.cardIndex}>{s.index}</span>
              <span className={styles.cardAccent} aria-hidden="true" />
              <h3 className={styles.cardTitle}>{ar ? s.titleAr : s.title}</h3>
              <p className={styles.cardDesc}>{ar ? s.descriptionAr : s.description}</p>
              <span className={styles.cardLink}>
                {ar ? 'اعرف المزيد' : 'Learn More'}
                <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
