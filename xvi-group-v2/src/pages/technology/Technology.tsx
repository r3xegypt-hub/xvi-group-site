import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { SectionSeparator } from '../../motion/SectionSeparator';
import { Technology } from '../../components/sections/Technology';
import { AIDashboard } from '../../components/ui/AIDashboard';
import { CTA } from '../../components/sections/CTA';
import { FlowingWave } from '../../motion/FlowingWave';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function TechnologyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="white" className={styles.pageHero}>
        <FlowingWave color="#C8A65A" opacity={0.04} speed={0.5} />
        <Container>
          <motion.div
            ref={ref}
            className={styles.heroInner}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              className={styles.overline}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } } }}
            >
              {ar ? 'التقنيات' : 'TECHNOLOGY'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'قدرات تقنية من الطراز الأول' : 'Enterprise-Grade Technology'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'نبني أنظمة ذكاء اصطناعي تلبي أعلى معايير الأمان والأداء.' : 'We build AI systems that meet the highest security and performance standards.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Technology />

      <SectionSeparator variant="gold-bar" />

      <SectionReveal variant="fadeUp">
        <AIDashboard />
      </SectionReveal>

      <CTA />
    </>
  );
}
