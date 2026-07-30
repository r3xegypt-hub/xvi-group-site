import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { Insights } from '../../components/sections/Insights';
import { CTA } from '../../components/sections/CTA';
import { GeometricShapes } from '../../components/ui/GeometricShapes';
import styles from './Insights.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function InsightsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="warm" className={styles.pageHero}>
        <GeometricShapes count={8} color="#132238" />
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
              {ar ? 'الرؤى' : 'INSIGHTS'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'أحدث الأفكار والتحليلات' : 'Latest Thinking & Analysis'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'رؤى استراتيجية وتحليلات معمّقة من فريقنا الاستشاري حول الذكاء الاصطناعي والتحول الرقمي.' : 'Strategic perspectives and deep analysis from our advisory team on AI and digital transformation.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <SectionReveal variant="fadeUp">
        <Insights />
      </SectionReveal>

      <CTA />
    </>
  );
}
