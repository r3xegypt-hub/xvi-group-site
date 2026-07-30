import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { SectionSeparator } from '../../motion/SectionSeparator';
import { About } from '../../components/sections/About';
import { CTA } from '../../components/sections/CTA';
import { GeometricShapes } from '../../components/ui/GeometricShapes';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="warm" className={styles.pageHero}>
        <GeometricShapes count={12} color="#C8A65A" />
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
              {ar ? 'من نحن' : 'ABOUT XVI'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'حيث تلتقي الرؤية بالقدرة التنفيذية' : 'Where Vision Meets Execution'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'XVI GROUP هي شركة استشارات تنفيذية متخصصة في الذكاء الاصطناعي، تجمع بين الرؤية الاستراتيجية والخبرة التقنية.' : 'XVI GROUP is an executive advisory and AI consulting firm combining strategic vision with technical depth.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <About />

      <SectionSeparator variant="arch" />

      <SectionReveal variant="scaleIn">
        <Section variant="white" className={styles.statsSection}>
          <Container>
            <div className={styles.statsGrid}>
              {[
                { number: '200+', label: ar ? 'مشروع مكتمل' : 'Projects Delivered' },
                { number: '12', label: ar ? 'دولة' : 'Countries' },
                { number: '98%', label: ar ? 'احتفاظ بالعملاء' : 'Client Retention' },
                { number: '24/7', label: ar ? 'دعم متوفر' : 'Support Available' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                >
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <CTA />
    </>
  );
}
