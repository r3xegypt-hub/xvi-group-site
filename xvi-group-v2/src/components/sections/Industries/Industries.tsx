import { motion } from 'framer-motion';
import styles from './Industries.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const items = [
  'Financial Services',
  'Enterprise Operations',
  'Public Institutions',
];

export function Industries() {
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
          WHERE COMPLEXITY LIVES
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          Built for high-consequence decisions.
        </motion.h2>

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
        >
          We work with organizations where the stakes are highest — and the need for clarity is greatest.
        </motion.p>

        <div className={styles.list}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.1 }}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.label}>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
