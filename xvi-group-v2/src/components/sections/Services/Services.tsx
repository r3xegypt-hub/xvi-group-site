import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Brain, Server, Cloud, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { PremiumCard } from '../../ui/PremiumCard';
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

function ServiceVisual({ type, color }: { type: string; color: string }) {
  if (type === 'diamond') {
    return (
      <div className={styles.visual} style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.diamond}
            style={{
              borderColor: `${color}${(0.08 + i * 0.03).toFixed(2)}`,
              width: 40 + i * 36,
              height: 40 + i * 36,
            }}
            animate={{ rotate: [0, 30 + i * 8, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }
  if (type === 'mesh') {
    return (
      <div className={styles.visual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {Array.from({ length: 8 }).map((_, i) =>
            Array.from({ length: 8 }).map((_, j) => (
              <motion.circle
                key={`${i}-${j}`}
                cx={12.5 + i * 25} cy={12.5 + j * 25}
                r={1.2}
                fill={color}
                fillOpacity={0.12}
                animate={{ opacity: [0.06, 0.25, 0.06], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, delay: (i + j) * 0.08, repeat: Infinity }}
              />
            ))
          )}
          {Array.from({ length: 7 }).map((_, i) =>
            Array.from({ length: 7 }).map((_, j) => (
              <motion.line key={`h${i}-${j}`} x1={12.5 + i * 25} y1={12.5 + j * 25} x2={12.5 + (i + 1) * 25} y2={12.5 + j * 25} stroke={color} strokeWidth={0.2} strokeOpacity={0.04} />
            ))
          )}
        </svg>
      </div>
    );
  }
  if (type === 'grid') {
    return (
      <div className={styles.visual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line key={`h${i}`} x1={0} y1={i * 20} x2={200} y2={i * 20} stroke={color} strokeWidth={0.3} strokeOpacity={0.06}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={200} stroke={color} strokeWidth={0.3} strokeOpacity={0.06}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} />
          ))}
        </svg>
      </div>
    );
  }
  return (
    <div className={styles.visual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.bar}
          style={{
            background: color,
            height: 15 + Math.abs(i - 7) * 6,
            left: `${i * 6.5 + 2}%`,
            opacity: 0.03 + (i % 3) * 0.03,
          }}
          animate={{ height: [15 + Math.abs(i - 7) * 6, 20 + Math.abs(i - 7) * 8, 15 + Math.abs(i - 7) * 6] }}
          transition={{ duration: 2.5 + i * 0.1, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
        />
      ))}
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
          <SectionHeader
            overline={ar ? 'خدماتنا' : 'SERVICES'}
            title={ar ? 'ما نقدمه' : 'What We Deliver'}
            description={ar ? 'تحول شامل بالذكاء الاصطناعي.' : 'End-to-end AI transformation.'}
          />
        </SectionReveal>
        <div className={styles.grid}>
          {services.map((s, i) => {
            const Icon = s.icon;
            const isAlt = i % 2 === 1;
            return (
              <SectionReveal key={i} variant={isAlt ? 'slideLeft' : 'slideRight'} delay={i * 0.08}>
                <PremiumCard delay={i * 0.08} glassIntensity={i % 3 === 0 ? 'light' : i % 3 === 1 ? 'medium' : 'heavy'}>
                  <div className={`${styles.card} ${isAlt ? styles.cardAlt : ''}`}>
                    <div className={styles.cardVisual}>
                      <ServiceVisual type={s.visual} color={s.color} />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardIndex} style={{ color: s.color }}>{s.index}</span>
                        <span className={styles.cardTag} style={{ background: `${s.color}08`, color: s.color }}>
                          {ar ? s.tagAr : s.tag}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{ar ? s.titleAr : s.title}</h3>
                      <p className={styles.cardDesc}>{ar ? s.descAr : s.desc}</p>
                      <motion.a
                        href="#"
                        className={styles.cardLink}
                        style={{ color: s.color }}
                        whileHover={{ x: 4 }}
                      >
                        {ar ? 'اعرف المزيد' : 'Explore Service'}
                        <ArrowUpRight size={14} />
                      </motion.a>
                    </div>
                  </div>
                </PremiumCard>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
