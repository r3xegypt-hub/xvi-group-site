import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './CTA.module.scss';

export function CTA() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section variant="navy" id="cta" className={styles.section}>
      <Container>
        <motion.div
          className={styles.content}
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>
            {ar ? 'مستعد لتحويل مؤسستك؟' : 'Ready to Transform Your Enterprise?'}
          </h2>
          <motion.span
            className={styles.divider}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <p className={styles.description}>
            {ar ? 'احجز استشارة سرية مع فريقنا الاستراتيجي.' : 'Book a confidential consultation with our strategy team.'}
          </p>
          <div className={styles.actions}>
            <motion.a
              href="/contact"
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.02, backgroundColor: '#B8963E' }}
              whileTap={{ scale: 0.98 }}
            >
              {ar ? 'احجز استشارة' : 'Book a Consultation'}
              <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="/services"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.02, borderColor: '#C8A65A', color: '#C8A65A' }}
              whileTap={{ scale: 0.98 }}
            >
              {ar ? 'استكشف منهجيتنا' : 'Explore Our Approach'}
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
