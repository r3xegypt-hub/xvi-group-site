import { motion } from 'framer-motion';
import styles from './AIConsultant.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AIConsultant() {
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
          MEET THE XVI EXECUTIVE ADVISOR
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          A calmer way to ask the hard questions.
        </motion.h2>

        <motion.div
          className={styles.console}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.25 }}
        >
          <div className={styles.inputRow}>
            <span className={styles.prompt}>&gt;</span>
            <span className={styles.placeholder}>What should we automate next?</span>
            <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
