import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { AINetwork } from '../../ui/AINetwork';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const categories = [
  { name: 'AI & ML', nameAr: 'الذكاء الاصطناعي', techs: ['Neural Networks', 'LLMs', 'Transformers', 'Computer Vision'], x: 10, y: 15 },
  { name: 'Data Engineering', nameAr: 'هندسة البيانات', techs: ['Data Lakes', 'ETL', 'Streaming', 'Warehousing'], x: 65, y: 10 },
  { name: 'Cloud & Infra', nameAr: 'السحابة والبنية', techs: ['AWS', 'Azure', 'GCP', 'Kubernetes'], x: 40, y: 30 },
  { name: 'Security', nameAr: 'الأمن', techs: ['Zero Trust', 'Compliance', 'Audit', 'Encryption'], x: 15, y: 50 },
  { name: 'DevOps', nameAr: 'التشغيل والتطوير', techs: ['CI/CD', 'GitOps', 'Monitoring', 'Automation'], x: 75, y: 55 },
  { name: 'Frontend', nameAr: 'الواجهات', techs: ['React', 'Next.js', 'Mobile', 'WebGL'], x: 50, y: 65 },
  { name: 'Data Science', nameAr: 'علوم البيانات', techs: ['ML Ops', 'Analytics', 'BI', 'Statistics'], x: 25, y: 78 },
  { name: 'Enterprise AI', nameAr: 'الذكاء المؤسسي', techs: ['RAG', 'Agents', 'Fine-tuning', 'Orchestration'], x: 70, y: 82 },
  { name: 'Governance', nameAr: 'الحوكمة', techs: ['AI Ethics', 'Policy', 'Risk', 'Audit'], x: 45, y: 90 },
];

const connectionPairs: [number, number][] = [
  [0, 1], [0, 3], [1, 2], [1, 4],
  [2, 3], [2, 5], [3, 6], [4, 7],
  [5, 6], [5, 8], [6, 7], [7, 8],
  [0, 2], [3, 5], [4, 6],
];

function DataParticles({ active }: { active: number | null }) {
  if (active === null) return null;
  return (
    <>
      {connectionPairs.map(([from, to], idx) => {
        const source = categories[from];
        const target = categories[to];
        if (!source || !target) return null;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return (
          <motion.circle
            key={idx}
            r={1.5}
            fill="#C8A65A"
            initial={{ cx: source.x, cy: source.y, opacity: 0 }}
            animate={{
              cx: [source.x, target.x],
              cy: [source.y, target.y],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: dist * 0.08,
              repeat: Infinity,
              delay: idx * 0.12,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </>
  );
}

export function Technology() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section variant="white" id="technology" className={styles.section}>
      <AINetwork nodeCount={45} color="#C8A65A" pulseSpeed={4} className={styles.networkBg} />
      <Container>
        <SectionReveal variant="depthIn">
          <SectionHeader
            overline={ar ? 'التقنيات' : 'TECHNOLOGY'}
            title={ar ? 'قدرات ذكاء اصطناعي شاملة' : 'Full-Stack AI Capability'}
            description={ar
              ? 'من البنية التحتية إلى التطبيقات — نبني أنظمة ذكاء اصطناعي تلبي أعلى معايير الأمان والأداء.'
              : 'From infrastructure to applications — we build AI systems that meet the highest security and performance standards.'}
          />
        </SectionReveal>
        <SectionReveal variant="scaleIn">
          <div className={styles.ecosystem}>
          <svg className={styles.connectionLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {categories.map((a, i) =>
              categories.slice(i + 1).map((b, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#C8A65A"
                  strokeWidth={0.15}
                  strokeOpacity={active !== null && (active === i || active === i + j + 1) ? 0.2 : 0.04}
                  initial={{ strokeOpacity: 0 }}
                  whileInView={{ strokeOpacity: active !== null && (active === i || active === i + j + 1) ? 0.2 : 0.04 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                />
              ))
            )}
            <DataParticles active={active} />
          </svg>
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              className={`${styles.node} ${active === i ? styles.nodeActive : ''}`}
              style={{ left: `${cat.x}%`, top: `${cat.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, delay: i * 0.08 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <motion.span
                className={styles.nodeDot}
                animate={active === i ? { scale: 1.8, backgroundColor: '#C8A65A' } : { scale: 1, backgroundColor: 'rgba(200,166,90,0.4)' }}
                transition={{ duration: 0.3, ease }}
              />
              <span className={styles.nodeLabel}>{ar ? cat.nameAr : cat.name}</span>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    className={styles.nodeTechs}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    {cat.techs.map((t, j) => (
                      <span key={j} className={styles.techChip}>{t}</span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
