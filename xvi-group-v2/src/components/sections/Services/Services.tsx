import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Brain, Server, Cloud, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { PremiumServicePanel } from '../../ui/PremiumServicePanel';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    index: '01',
    title: 'Strategy & Advisory',
    titleAr: 'الاستراتيجية والاستشارات',
    desc: 'AI roadmap development, opportunity assessment, governance frameworks, and enterprise AI strategy.',
    descAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية المؤسسات.',
    icon: Brain,
    color: '#C8A65A',
    visual: 'diamond',
    tag: 'Executive',
    tagAr: 'تنفيذي',
  },
  {
    index: '02',
    title: 'AI Engineering',
    titleAr: 'هندسة الذكاء الاصطناعي',
    desc: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.',
    descAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
    icon: Server,
    color: '#132238',
    visual: 'mesh',
    tag: 'Technical',
    tagAr: 'تقني',
  },
  {
    index: '03',
    title: 'Operational Design',
    titleAr: 'التصميم التشغيلي',
    desc: 'Process reengineering, automation strategy, change management, and operational excellence programs.',
    descAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
    icon: Cloud,
    color: '#C8A65A',
    visual: 'grid',
    tag: 'Process',
    tagAr: 'تشغيلي',
  },
  {
    index: '04',
    title: 'Intelligence Products',
    titleAr: 'منتجات الذكاء',
    desc: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.',
    descAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
    icon: BarChart3,
    color: '#132238',
    visual: 'lines',
    tag: 'Product',
    tagAr: 'منتج',
  },
];

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="white" id="services" className={styles.section}>
      <Container>
        <SectionReveal variant="depthIn">
          <SectionHeader
            overline={ar ? 'خدماتنا' : 'SERVICES'}
            title={ar ? 'ما نقدمه' : 'What We Deliver'}
            description={ar ? 'تحول شامل بالذكاء الاصطناعي.' : 'End-to-end AI transformation.'}
          />
        </SectionReveal>
        <div className={styles.grid} ref={ref}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.12 }}
              >
                <PremiumServicePanel
                  icon={Icon}
                  title={ar ? s.titleAr : s.title}
                  desc={ar ? s.descAr : s.desc}
                  tag={ar ? s.tagAr : s.tag}
                  index={s.index}
                  color={s.color}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}