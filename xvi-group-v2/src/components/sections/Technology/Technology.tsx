import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { StaggerGroup, StaggerItem } from '../../../motion/AnimatedSection';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

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
        <StaggerGroup className={styles.grid} staggerDelay={0.06}>
          {CATEGORIES.map((cat, i) => (
            <StaggerItem key={i}>
              <motion.div
                className={styles.cell}
                whileHover={{ backgroundColor: '#F7F6F3', transition: { duration: 0.2 } }}
              >
                <motion.span
                  className={styles.cellDot}
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                />
                <h3 className={styles.cellTitle}>{ar ? cat.nameAr : cat.name}</h3>
                <p className={styles.cellTechs}>{cat.techs}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
