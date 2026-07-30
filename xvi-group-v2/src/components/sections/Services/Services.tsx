import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './Services.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    index: '01', title: 'Strategy & Advisory', titleAr: 'الاستراتيجية والاستشارات',
    desc: 'AI roadmap development, opportunity assessment, governance frameworks, and enterprise AI strategy.',
    descAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية المؤسسات.',
    tag: 'Executive', tagAr: 'تنفيذي',
    quote: 'Vision without execution is hallucination.', quoteAr: 'الرؤية بدون تنفيذ مجرد وهم.',
    stat: '4-Stage Framework',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85',
  },
  {
    index: '02', title: 'AI Engineering', titleAr: 'هندسة الذكاء الاصطناعي',
    desc: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.',
    descAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
    tag: 'Technical', tagAr: 'تقني',
    quote: 'Architecture is strategy made visible.', quoteAr: 'الهندسة هي الاستراتيجية المتجسدة.',
    stat: 'End-to-End Delivery',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85',
  },
  {
    index: '03', title: 'Operational Design', titleAr: 'التصميم التشغيلي',
    desc: 'Process reengineering, automation strategy, change management, and operational excellence programs.',
    descAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
    tag: 'Process', tagAr: 'تشغيلي',
    quote: 'Efficiency is the foundation of scale.', quoteAr: 'الكفاءة هي أساس التوسع.',
    stat: 'Lean Methodology',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85',
  },
  {
    index: '04', title: 'Intelligence Products', titleAr: 'منتجات الذكاء',
    desc: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.',
    descAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
    tag: 'Product', tagAr: 'منتج',
    quote: 'Data without decisions is noise.', quoteAr: 'البيانات بدون قرارات مجرد ضوضاء.',
    stat: 'AI-Native Platforms',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=85',
  },
];

function ImagePanel({ src, index }: { src: string; index: string }) {
  return (
    <div className={styles.imagePanel}>
      <div className={styles.imageFrame}>
        <div className={styles.imageBg} style={{ backgroundImage: `url(${src})` }} />
        <div className={styles.imageOverlay} />
        <div className={styles.imageBorder} />
        <span className={styles.imageIndex}>{index}</span>
      </div>
    </div>
  );
}

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="services" className={styles.section}>
      <Container>
        <SectionReveal variant="fadeUp">
          <header className={styles.header}>
            <p className={styles.overline}>{ar ? 'ما نقدمه' : 'WHAT WE DELIVER'}</p>
            <h2 className={styles.title}>
              {ar ? 'خدماتنا' : 'Our Services'}
            </h2>
            <p className={styles.headerDesc}>
              {ar
                ? 'من الرؤية إلى التنفيذ. كل خدمة مصممة لتحويل الطموح إلى أثر ملموس.'
                : 'From vision to execution. Every service is designed to transform ambition into measurable impact.'}
            </p>
          </header>
        </SectionReveal>
      </Container>

      <div className={styles.chapters}>
        {services.map((s, i) => (
          <motion.article
            key={i}
            className={styles.chapter}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
          >
            <div className={`${styles.chapterInner} ${i % 2 === 1 ? styles.chapterAlt : ''}`}>
              <div className={styles.chapterVisual}>
                <ImagePanel src={s.image} index={s.index} />
                <motion.blockquote
                  className={styles.chapterQuote}
                  initial={{ opacity: 0, x: i % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.4 }}
                >
                  <span className={styles.quoteMark}>&ldquo;</span>
                  {ar ? s.quoteAr : s.quote}
                </motion.blockquote>
              </div>

              <div className={styles.chapterContent}>
                <div className={styles.chapterTag}>{ar ? s.tagAr : s.tag}</div>
                <h3 className={styles.chapterTitle}>{ar ? s.titleAr : s.title}</h3>
                <p className={styles.chapterDesc}>{ar ? s.descAr : s.desc}</p>
                <div className={styles.chapterStat}>{s.stat}</div>
                <motion.a
                  href={`/services/${s.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className={styles.chapterLink}
                  whileHover={{ x: 4 }}
                >
                  {ar ? 'استكشف الخدمة' : 'Explore Service'}
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}