import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { SectionSeparator } from '../../motion/SectionSeparator';
import { Services } from '../../components/sections/Services';
import { AIProcessFlow } from '../../components/ui/AIProcessFlow';
import { AIDashboard } from '../../components/ui/AIDashboard';
import { CTA } from '../../components/sections/CTA';
import { DataStream } from '../../motion/DataStream';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function ServicesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="white" className={styles.pageHero}>
        <DataStream count={25} color="#C8A65A" speed={0.3} />
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
              {ar ? 'خدماتنا' : 'OUR SERVICES'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'نحو تحول ذكي لمؤسستك' : 'Enterprise Intelligence Services'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'من الاستراتيجية إلى التنفيذ — نقدم خدمات متكاملة للتحول بالذكاء الاصطناعي.' : 'From strategy to execution — comprehensive AI transformation services for the modern enterprise.'}
            </motion.p>
            <motion.div
              className={styles.actions}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.4 } } }}
            >
              <a href="/contact" className={styles.ctaPrimary}>
                {ar ? 'احجز استشارة' : 'Book a Consultation'}
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Services />

      <SectionSeparator variant="gold-bar" />

      <Section variant="warm">
        <Container>
          <SectionReveal variant="depthIn">
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: '#111111',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              {ar ? 'كيف نعمل' : 'How We Deliver'}
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#666666',
              textAlign: 'center',
              maxWidth: 600,
              margin: '0 auto 24px',
            }}>
              {ar ? 'عملية مثبتة تحول الرؤية إلى نتائج ملموسة.' : 'A proven process that transforms vision into measurable outcomes.'}
            </p>
          </SectionReveal>
          <AIProcessFlow />
        </Container>
      </Section>

      <AIDashboard />
      <CTA />
    </>
  );
}
