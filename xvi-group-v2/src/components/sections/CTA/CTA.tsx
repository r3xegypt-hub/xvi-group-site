import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA, useContactCTA } from '../../../hooks/useCTA';
import styles from './CTA.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CTA() {
  const handleCTA = useCTA();
  const handleContact = useContactCTA();
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          START WITH A CONVERSATION
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          Your next operating advantage starts here.
        </motion.h2>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.25 }}
        >
          <button type="button" className={styles.cta} onClick={handleCTA}>
            {ar ? 'تحدث مع المستشار الذكي' : 'Talk to the Executive AI'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <Link to="/contact" className={styles.ctaGhost} onClick={handleContact}>
            {ar ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
