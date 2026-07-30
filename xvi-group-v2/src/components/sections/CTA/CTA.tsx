import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './CTA.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CTA() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section variant="navy" id="cta" className={styles.section}>
      <div className={styles.ambientGlow} />
      <div className={styles.topAccent} />
      <Container>
        <div className={styles.content} ref={ref}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {ar ? 'مستعد لتحويل مؤسستك؟' : 'Ready to Transform Your Enterprise?'}
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            {ar ? 'احجز استشارة سرية مع فريقنا الاستراتيجي.' : 'Book a confidential consultation with our strategy team.'}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
          >
            <a href="/contact" className={styles.ctaPrimary}>
              {ar ? 'احجز استشارة' : 'Book a Consultation'}
              <ArrowUpRight size={16} />
            </a>
            <a href="/services" className={styles.ctaSecondary}>
              {ar ? 'منهجيتنا' : 'Our Approach'}
            </a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}