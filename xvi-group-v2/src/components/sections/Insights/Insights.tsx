import { motion } from 'framer-motion';
import styles from './Insights.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const articles = [
  {
    title: 'The operating model comes first.',
    desc: 'Most AI transformations fail because they optimize for the wrong layer. The operating model — not the technology — determines whether AI creates lasting value.',
  },
  {
    title: 'AI needs an executive mandate.',
    desc: 'Without C-suite ownership, AI remains a side project. The organizations winning with AI share one trait: executive accountability for outcomes, not outputs.',
  },
];

export function Insights() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          A point of view on intelligent enterprise.
        </motion.h2>

        <div className={styles.grid}>
          {articles.map((article, i) => (
            <motion.article
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.1 }}
            >
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardDesc}>{article.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
