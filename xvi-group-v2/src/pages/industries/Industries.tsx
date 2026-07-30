import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Industries } from '../../components/sections/Industries';
import { AIDashboard } from '../../components/ui/AIDashboard';
import { CTA } from '../../components/sections/CTA';
import { GeometricShapes } from '../../components/ui/GeometricShapes';
import { SectionReveal } from '../../motion/SectionReveal';
import styles from './Industries.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function IndustriesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="white" className={styles.pageHero}>
        <GeometricShapes count={10} color="#C8A65A" />
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
              {ar ? 'القطاعات' : 'INDUSTRIES'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'خبرة قطاعية عميقة' : 'Deep Industry Expertise'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'خبرة عميقة في القطاعات الرئيسية التي تشكّل اقتصاد الغد.' : 'Deep expertise in the core sectors shaping tomorrow\'s economy.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <SectionReveal variant="fadeUp">
        <Industries />
      </SectionReveal>

      <SectionReveal variant="scaleIn">
        <AIDashboard />
      </SectionReveal>

      <CTA />
    </>
  );
}
