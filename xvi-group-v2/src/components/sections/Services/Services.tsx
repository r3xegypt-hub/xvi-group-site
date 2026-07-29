import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Server, Cloud, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { BrokenGrid, BrokenGridItem } from '../../../motion/BrokenGrid';
import { ImageReveal } from '../../../motion/ImageReveal';
import { SectionSeparator } from '../../../motion/SectionSeparator';
import styles from './Services.module.scss';

const icons = [Brain, Server, Cloud, BarChart3];

const SERVICES = [
  {
    index: '01',
    title: 'Strategy & Advisory',
    titleAr: 'الاستراتيجية والاستشارات',
    description: 'AI roadmap development, opportunity assessment, governance frameworks, and enterprise AI strategy.',
    descriptionAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية المؤسسات.',
    span: 2,
    offset: 0,
    color: '#C8A65A',
  },
  {
    index: '02',
    title: 'AI Engineering',
    titleAr: 'هندسة الذكاء الاصطناعي',
    description: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.',
    descriptionAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
    span: 1,
    offset: 40,
    color: '#132238',
  },
  {
    index: '03',
    title: 'Operational Design',
    titleAr: 'التصميم التشغيلي',
    description: 'Process reengineering, automation strategy, change management, and operational excellence programs.',
    descriptionAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
    span: 1,
    offset: 0,
    color: '#C8A65A',
  },
  {
    index: '04',
    title: 'Intelligence Products',
    titleAr: 'منتجات الذكاء',
    description: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.',
    descriptionAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
    span: 2,
    offset: 0,
    color: '#132238',
  },
];

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';

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
        <BrokenGrid className={styles.grid} columns={3}>
          {SERVICES.map((s, i) => {
            const Icon = icons[i];
            return (
              <BrokenGridItem key={i} span={s.span} offset={s.offset}>
                <motion.div
                  className={styles.card}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex} style={{ color: s.color }}>{s.index}</span>
                    <div className={styles.cardIcon} style={{ background: `${s.color}12`, color: s.color }}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className={styles.cardTitle}>{ar ? s.titleAr : s.title}</h3>
                  <p className={styles.cardDesc}>{ar ? s.descriptionAr : s.description}</p>
                  <motion.span className={styles.cardLink} whileHover={{ gap: 12 }}>
                    {ar ? 'اعرف المزيد' : 'Learn More'}
                    <ArrowUpRight size={14} />
                  </motion.span>
                </motion.div>
              </BrokenGridItem>
            );
          })}
        </BrokenGrid>
      </Container>
      <SectionSeparator variant="gold-bar" />
    </Section>
  );
}
