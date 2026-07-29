import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Brain, Server, Cloud, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
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
    gradient: 'linear-gradient(135deg, rgba(200,166,90,0.08), rgba(200,166,90,0.02))',
    accentColor: '#C8A65A',
    visual: 'diamond',
  },
  {
    index: '02',
    title: 'AI Engineering',
    titleAr: 'هندسة الذكاء الاصطناعي',
    desc: 'Custom model development, data pipeline architecture, MLOps, and production-grade AI systems.',
    descAr: 'تطوير نماذج مخصصة، هندسة خطوط البيانات، MLOps، وأنظمة ذكاء اصطناعي إنتاجية.',
    icon: Server,
    gradient: 'linear-gradient(135deg, rgba(19,34,56,0.04), rgba(19,34,56,0.01))',
    accentColor: '#132238',
    visual: 'mesh',
  },
  {
    index: '03',
    title: 'Operational Design',
    titleAr: 'التصميم التشغيلي',
    desc: 'Process reengineering, automation strategy, change management, and operational excellence programs.',
    descAr: 'إعادة هندسة العمليات، استراتيجية الأتمتة، إدارة التغيير، وبرامج التميز التشغيلي.',
    icon: Cloud,
    gradient: 'linear-gradient(135deg, rgba(200,166,90,0.06), rgba(200,166,90,0.01))',
    accentColor: '#C8A65A',
    visual: 'grid',
  },
  {
    index: '04',
    title: 'Intelligence Products',
    titleAr: 'منتجات الذكاء',
    desc: 'Custom analytics platforms, executive dashboards, decision support systems, and AI-native applications.',
    descAr: 'منصات تحليل مخصصة، لوحات قيادة تنفيذية، أنظمة دعم القرار، وتطبيقات ذكاء اصطناعي.',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, rgba(19,34,56,0.03), rgba(19,34,56,0.01))',
    accentColor: '#132238',
    visual: 'lines',
  },
];

function ServiceVisual({ type, color }: { type: string; color: string }) {
  if (type === 'diamond') {
    return (
      <div className={styles.serviceVisual} style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.diamond}
            style={{
              borderColor: `${color}${(0.1 + i * 0.04).toFixed(2)}`,
              width: 60 + i * 40,
              height: 60 + i * 40,
            }}
            animate={{ rotate: [0, 45 + i * 5, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }
  if (type === 'mesh') {
    return (
      <div className={styles.serviceVisual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {Array.from({ length: 6 }).map((_, i) =>
            Array.from({ length: 6 }).map((_, j) => (
              <motion.circle
                key={`${i}-${j}`}
                cx={20 + i * 32} cy={20 + j * 32}
                r={1.5}
                fill={color}
                fillOpacity={0.15}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, delay: (i + j) * 0.15, repeat: Infinity }}
              />
            ))
          )}
        </svg>
      </div>
    );
  }
  if (type === 'grid') {
    return (
      <div className={styles.serviceVisual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line key={`h${i}`} x1={0} y1={i * 25} x2={200} y2={i * 25} stroke={color} strokeWidth={0.3} strokeOpacity={0.08} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line key={`v${i}`} x1={i * 25} y1={0} x2={i * 25} y2={200} stroke={color} strokeWidth={0.3} strokeOpacity={0.08} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} />
          ))}
        </svg>
      </div>
    );
  }
  return (
    <div className={styles.serviceVisual} style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.lineAccent}
          style={{
            background: color,
            width: 20 + Math.random() * 40,
            left: `${5 + i * 8}%`,
            opacity: 0.04 + Math.random() * 0.06,
          }}
          animate={{ height: [10, 30 + Math.random() * 20, 10] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
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
        <SectionHeader
          overline={ar ? 'خدماتنا' : 'SERVICES'}
          title={ar ? 'ما نقدمه' : 'What We Deliver'}
          description={ar ? 'تحول شامل بالذكاء الاصطناعي.' : 'End-to-end AI transformation.'}
        />
        <div className={styles.list}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                className={styles.serviceRow}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <ServiceVisual type={s.visual} color={s.accentColor} />
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIndex} style={{ color: s.accentColor }}>{s.index}</div>
                  <div className={styles.serviceInfo}>
                    <div className={styles.serviceIcon} style={{ color: s.accentColor }}>
                      <Icon size={22} />
                    </div>
                    <h3 className={styles.serviceTitle}>{ar ? s.titleAr : s.title}</h3>
                    <p className={styles.serviceDesc}>{ar ? s.descAr : s.desc}</p>
                    <motion.span className={styles.serviceLink} style={{ color: s.accentColor }} whileHover={{ gap: 12 }}>
                      {ar ? 'اعرف المزيد' : 'Learn More'}
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
