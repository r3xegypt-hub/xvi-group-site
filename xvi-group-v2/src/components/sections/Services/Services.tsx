import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    descriptionAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية المؤسسات.',
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section variant="white" id="services" className={styles.section}>
      <Container>
        <SectionHeader
          overline={ar ? 'خدماتنا' : 'SERVICES'}
          title={ar ? 'ما نقدمه' : 'What We Deliver'}
          description={ar
            ? 'تحول شامل بالذكاء الاصطناعي لأكثر المؤسسات طموحاً.'
            : 'End-to-end AI transformation for the most ambitious enterprises.'
          }
        />
        <div className={styles.grid} ref={ref}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <span className={styles.cardIndex}>{s.index}</span>
              <h3 className={styles.cardTitle}>{ar ? s.titleAr : s.title}</h3>
              <p className={styles.cardDesc}>{ar ? s.descriptionAr : s.description}</p>
              <motion.span
                className={styles.cardLink}
                whileHover={{ gap: '12px', transition: { duration: 0.2 } }}
              >
                {ar ? 'اعرف المزيد' : 'Learn More'}
                <ArrowUpRight size={14} />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
