import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import styles from './Technology.module.scss';

const CATEGORIES = [
  { name: 'AI & ML', nameAr: 'الذكاء الاصطناعي', techs: 'Neural Networks · LLMs · Transformers' },
  { name: 'Data Engineering', nameAr: 'هندسة البيانات', techs: 'Data Lakes · ETL · Streaming Analytics' },
  { name: 'Cloud & Infra', nameAr: 'السحابة والبنية', techs: 'AWS · Azure · GCP · Kubernetes' },
  { name: 'Security', nameAr: 'الأمن', techs: 'Zero Trust · Compliance · Audit' },
  { name: 'DevOps', nameAr: 'التشغيل والتطوير', techs: 'CI/CD · GitOps · Monitoring' },
  { name: 'Frontend', nameAr: 'الواجهات', techs: 'React · Next.js · Mobile' },
  { name: 'Data Science', nameAr: 'علوم البيانات', techs: 'ML Ops · Analytics · BI' },
  { name: 'Enterprise AI', nameAr: 'الذكاء المؤسسي', techs: 'RAG · Agents · Fine-tuning' },
  { name: 'Governance', nameAr: 'الحوكمة', techs: 'AI Ethics · Policy · Risk' },
];

export function Technology() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="white" id="technology">
      <Container>
        <SectionHeader
          overline={ar ? 'التقنيات' : 'TECHNOLOGY'}
          title={ar ? 'قدرات ذكاء اصطناعي شاملة' : 'Full-Stack AI Capability'}
          description={ar
            ? 'من البنية التحتية إلى التطبيقات — نبني أنظمة ذكاء اصطناعي تلبي أعلى معايير الأمان والأداء.'
            : 'From infrastructure to applications — we build AI systems that meet the highest standards of security and performance.'
          }
        />
        <div className={styles.grid} ref={ref}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              className={styles.cell}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.06,
              }}
              whileHover={{ backgroundColor: '#F7F6F3', transition: { duration: 0.2 } }}
            >
              <motion.span
                className={styles.cellDot}
                aria-hidden="true"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: i * 0.06 + 0.2, type: 'spring', stiffness: 200 }}
              />
              <h3 className={styles.cellTitle}>{ar ? cat.nameAr : cat.name}</h3>
              <p className={styles.cellTechs}>{cat.techs}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
