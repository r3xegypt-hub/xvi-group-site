import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Brain, Server, Cloud, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './Services.module.scss';

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    index: '01', title: 'Strategy & Advisory', titleAr: 'الاستراتيجية والاستشارات',
    desc: 'AI roadmap development, opportunity assessment, governance frameworks, and enterprise AI strategy.', descAr: 'تطوير خارطة طريق الذكاء الاصطناعي، تقييم الفرص، أطر الحوكمة، واستراتيجية المؤسسات.',
    icon: Brain, color: '#C8A65A', tag: 'Executive', tagAr: 'تنفيذي',
    quote: 'Vision without execution is hallucination.', quoteAr: 'الرؤية بدون تنفيذ مجرد وهم.',
    stat: '4-stage', statLabel: 'Framework', statLabelAr: 'إطار عمل',
  },
  {
    index: '02', title: 'AI Engineering', titleAr: 'هندسة الذكاء الاصطناعي',
    desc: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.', descAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
    icon: Server, color: '#132238', tag: 'Technical', tagAr: 'تقني',
    quote: 'Architecture is strategy made visible.', quoteAr: 'الهندسة هي الاستراتيجية المتجسدة.',
    stat: 'End-to-end', statLabel: 'Delivery', statLabelAr: 'تسليم',
  },
  {
    index: '03', title: 'Operational Design', titleAr: 'التصميم التشغيلي',
    desc: 'Process reengineering, automation strategy, change management, and operational excellence programs.', descAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
    icon: Cloud, color: '#C8A65A', tag: 'Process', tagAr: 'تشغيلي',
    quote: 'Efficiency is the foundation of scale.', quoteAr: 'الكفاءة هي أساس التوسع.',
    stat: 'Lean', statLabel: 'Methodology', statLabelAr: 'منهجية',
  },
  {
    index: '04', title: 'Intelligence Products', titleAr: 'منتجات الذكاء',
    desc: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.', descAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
    icon: BarChart3, color: '#132238', tag: 'Product', tagAr: 'منتج',
    quote: 'Data without decisions is noise.', quoteAr: 'البيانات بدون قرارات مجرد ضوضاء.',
    stat: 'AI-native', statLabel: 'Platforms', statLabelAr: 'منصات',
  },
];

function VisualPanel({ index, color }: { index: string; color: string }) {
  const n = parseInt(index);
  return (
    <div className={styles.visualPanel} style={{ background: `linear-gradient(135deg, ${color}04, ${color}01)` }}>
      <svg viewBox="0 0 400 400" className={styles.visualSvg}>
        <rect x="20" y="20" width="360" height="360" rx="1" stroke={color} strokeWidth="0.3" opacity="0.12" />
        <circle cx="200" cy="200" r={80 + n * 8} fill="none" stroke={color} strokeWidth="0.2" strokeDasharray="4 8" opacity="0.15" />
        <circle cx="200" cy="200" r={50 + n * 4} fill="none" stroke={color} strokeWidth="0.15" strokeDasharray="2 6" opacity="0.2" />
        <circle cx="200" cy="200" r="3" fill={color} opacity="0.3" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 + n * 15) * Math.PI / 180;
          const r = 100 + n * 6;
          return (
            <line key={i} x1="200" y1="200" x2={200 + r * Math.cos(angle)} y2={200 + r * Math.sin(angle)}
              stroke={color} strokeWidth="0.15" opacity="0.08" />
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const r = 30 + Math.random() * 70;
          return (
            <circle key={i + 20} cx={200 + r * Math.cos(angle)} cy={200 + r * Math.sin(angle)}
              r="1.5" fill={color} opacity={0.08 + Math.random() * 0.12} />
          );
        })}
      </svg>
    </div>
  );
}

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="white" id="services" className={styles.section}>
      <Container>
        <SectionReveal variant="depthIn">
          <div className={styles.headerBlock}>
            <p className={styles.overline}>{ar ? 'خدماتنا' : 'SERVICES'}</p>
            <div className={styles.headerSplit}>
              <h2 className={styles.title}>{ar ? 'ما نقدمه' : 'What We Deliver'}</h2>
              <p className={styles.headerDesc}>
                {ar ? 'تحول شامل بالذكاء الاصطناعي — من الرؤية إلى التنفيذ.' : 'End-to-end AI transformation — from vision to execution.'}
              </p>
            </div>
          </div>
        </SectionReveal>
      </Container>

      <div className={styles.spreads}>
        {services.map((s, i) => {
          const Icon = s.icon;
          const isAlt = i % 2 === 1;
          return (
            <motion.article
              key={i}
              className={styles.spread}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              <div className={`${styles.spreadInner} ${isAlt ? styles.spreadAlt : ''}`}>
                <motion.div
                  className={styles.spreadVisual}
                  initial={{ opacity: 0, x: isAlt ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.2 }}
                >
                  <div className={styles.visualFrame}>
                    <VisualPanel index={s.index} color={s.color} />
                    <motion.div className={styles.visualBadge}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <span className={styles.badgeDot} />
                      {s.stat}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.spreadContent}
                  initial={{ opacity: 0, x: isAlt ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 }}
                >
                  <div className={styles.spreadIndex} style={{ color: s.color }}>{s.index}</div>
                  <div className={styles.spreadTag} style={{ color: s.color, borderColor: `${s.color}20` }}>
                    {ar ? s.tagAr : s.tag}
                  </div>

                  <div className={styles.spreadIcon} style={{ background: `${s.color}06`, borderColor: `${s.color}10`, color: s.color }}>
                    <Icon size={22} />
                  </div>

                  <h3 className={styles.spreadTitle}>{ar ? s.titleAr : s.title}</h3>
                  <p className={styles.spreadDesc}>{ar ? s.descAr : s.desc}</p>

                  <motion.a
                    href={`/services/${s.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className={styles.spreadLink}
                    style={{ color: s.color }}
                    whileHover={{ x: 4 }}
                  >
                    {ar ? 'استكشف الخدمة' : 'Explore Service'}
                    <ArrowUpRight size={14} />
                  </motion.a>
                </motion.div>
              </div>

              <motion.blockquote
                className={`${styles.pullQuote} ${isAlt ? styles.pullQuoteAlt : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className={styles.pullMark}>&ldquo;</span>
                {ar ? s.quoteAr : s.quote}
              </motion.blockquote>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}