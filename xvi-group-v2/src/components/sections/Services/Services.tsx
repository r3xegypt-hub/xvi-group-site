import { motion } from 'framer-motion';
import styles from './Services.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cards = [
  {
    num: '01',
    tag: 'STRATEGY',
    title: 'AI Strategy',
    desc: 'Enterprise AI roadmap development, governance frameworks, and strategic advisory for decisive leadership.',
    dark: false,
  },
  {
    num: '02',
    tag: 'AUTOMATION',
    title: 'Business Automation',
    desc: 'Workflow intelligence, process reengineering, and AI-driven automation for operational excellence.',
    dark: true,
  },
  {
    num: '03',
    tag: 'TRANSFORMATION',
    title: 'Digital Transformation',
    desc: 'End-to-end digital strategy, legacy modernization, and technology architecture for the next decade.',
    dark: false,
  },
];

export function Services() {
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
          THE XVI PRACTICE
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          Intelligence, designed to move.
        </motion.h2>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.article
              key={i}
              className={`${styles.card} ${card.dark ? styles.cardDark : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.1 }}
            >
              <div className={styles.cardTag}>{card.num} / {card.tag}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <span className={`${styles.badge} ${card.dark ? styles.badgeDark : ''}`}>
                Coming soon
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
