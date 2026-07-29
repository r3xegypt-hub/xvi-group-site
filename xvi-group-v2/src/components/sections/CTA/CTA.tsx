import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { LightBeam } from '../../../motion/LightBeam';
import { ConstellationParticles } from '../../../motion/ConstellationParticles';
import styles from './CTA.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function CTA() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <Section variant="navy" id="cta" className={styles.section}>
      <motion.div className={styles.bgOverlay} style={{ opacity: bgOpacity }} />
      <LightBeam position="top-right" intensity={0.08} color="#C8A65A" className={styles.beam} />
      <ConstellationParticles count={20} color="#C8A65A" className={styles.constellation} connectionDistance={30} />
      <div className={styles.volumetricGlow} />

      <Container>
        <SectionReveal variant="depthIn">
        <motion.div
          className={styles.content}
          ref={ref}
        >
          <motion.span
            className={styles.accentTop}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          />

          <h2 className={styles.title}>
            {ar ? 'مستعد لتحويل مؤسستك؟' : 'Ready to Transform Your Enterprise?'}
          </h2>

          <motion.span
            className={styles.divider}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
          />

          <p className={styles.description}>
            {ar ? 'احجز استشارة سرية مع فريقنا الاستراتيجي.' : 'Book a confidential consultation with our strategy team.'}
          </p>

          <div className={styles.actions}>
            <motion.a
              href="/contact"
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.03, backgroundColor: '#B8963E' }}
              whileTap={{ scale: 0.98 }}
            >
              {ar ? 'احجز استشارة' : 'Book a Consultation'}
              <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="/services"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.03, borderColor: '#C8A65A', color: '#C8A65A' }}
              whileTap={{ scale: 0.98 }}
            >
              {ar ? 'استكشف منهجيتنا' : 'Explore Our Approach'}
            </motion.a>
          </div>
        </motion.div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
