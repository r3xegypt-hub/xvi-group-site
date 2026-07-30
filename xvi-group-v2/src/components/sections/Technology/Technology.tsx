import { motion } from 'framer-motion';
import styles from './Technology.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Technology() {
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
          XVI ORCHESTRATION
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          Data · Models · Workflows
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
        >
          The integration layer that connects your data, models, and business processes into a unified intelligence system.
        </motion.p>

        <div className={styles.divider} />

        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          THE INTELLIGENCE LAYER
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
        >
          The era of fragmented AI is over.
        </motion.h2>

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
        >
          We orchestrate data pipelines, model deployment, and business workflows into a single coherent system — built for enterprises that cannot afford fragmentation.
        </motion.p>
      </div>
    </section>
  );
}
