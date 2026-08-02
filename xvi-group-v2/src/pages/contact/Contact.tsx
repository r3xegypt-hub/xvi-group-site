import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Contact } from '../../components/sections/Contact';
import { MapSection } from '../../components/sections/Map/MapSection';
import { CTA } from '../../components/sections/CTA';
import { FlowingWave } from '../../motion/FlowingWave';
import styles from './Contact.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function ContactPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="white" className={styles.pageHero}>
        <FlowingWave color="#2F3338" opacity={0.03} speed={0.4} />
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
              {ar ? 'اتصل بنا' : 'CONTACT'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'ابدأ محادثة استراتيجية' : 'Start a Strategic Conversation'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'نحن هنا لمناقشة كيف يمكن لـ XVI تحويل مؤسستك بالذكاء الاصطناعي.' : "We're here to discuss how XVI can transform your enterprise with AI."}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Contact />

      <MapSection />

      <CTA />
    </>
  );
}
