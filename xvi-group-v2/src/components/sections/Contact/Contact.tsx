import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { FloatingParticles } from '../../../motion/FloatingParticles';
import styles from './Contact.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Props {
  cta?: { en: string; ar: string } | null;
}

export function Contact({ cta }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const ctaText = cta ? (ar ? cta.ar : cta.en) : ar ? 'تواصل معنا' : 'Get in touch';

  return (
    <section id="contact-cta" className={styles.section} ref={ref}>
      {/* ── Subtle background photo ── */}
      <div className={styles.contactPhoto} aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/contact_visual.jpg`}
          alt=""
          className={styles.contactPhotoImg}
          loading="lazy"
        />
        <div className={styles.contactPhotoOverlay} />
      </div>
      <FloatingParticles count={15} color="#C8A65A" speed={0.8} />
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          {ar ? 'الذكاء، بتأثير حقيقي.' : 'Intelligence, made consequential.'}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <Link to="/contact" className={styles.cta}>
            {ctaText}
          </Link>
        </motion.div>

        <motion.div
          className={styles.contactInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{ar ? 'البريد الإلكتروني' : 'Email'}</span>
            <a href="mailto:contact@xvigroup.com" className={styles.contactValue}>contact@xvigroup.com</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{ar ? 'الهاتف' : 'Phone'}</span>
            <a href="tel:+971569220064" className={styles.contactValue}>+971 56 922 0064</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{ar ? 'الموقع' : 'Location'}</span>
            <span className={styles.contactValue}>Al Ain, UAE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
