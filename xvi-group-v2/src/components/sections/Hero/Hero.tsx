import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const child = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  return (
    <motion.section
      className={styles.hero}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className={styles.inner}>
        <motion.p className={styles.eyebrow} variants={child}>
          AI CONSULTING · TRANSFORMATION · AUTOMATION
        </motion.p>

        <motion.h1 className={styles.title} variants={child}>
          Clarity for the next era of enterprise.
        </motion.h1>

        <motion.p className={styles.subtitle} variants={child}>
          AI strategy, business automation, and digital transformation for decisive leaders.
        </motion.p>

        <motion.div className={styles.actions} variants={child}>
          <a href="/contact" className={styles.cta}>
            Begin a conversation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>

        <motion.div className={styles.brandBlock} variants={child}>
          <div className={styles.brandHeader}>
            <span className={styles.brandSeal}>XVI</span>
            <span className={styles.brandName}>XVI INTELLIGENCE</span>
          </div>
          <p className={styles.brandDesc}>
            Decision intelligence for every operation.
          </p>
        </motion.div>

        <motion.div className={styles.signature} variants={child}>
          <span className={styles.location}>Cairo · MENA · Global</span>
          <span className={styles.separator} />
          <span className={styles.arabic}>ذكاء يُترجم إلى أثرٍ ملموس</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
