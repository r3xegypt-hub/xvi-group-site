import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useMotion } from '../../../motion/providers/MotionProvider';
import styles from './MetricsStrip.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Principle {
  id: string;
  value: { en: string; ar: string };
  note: { en: string; ar: string };
}

const PRINCIPLES: Principle[] = [
  {
    id: 'decision',
    value: { en: 'Every transformation starts with one decision.', ar: 'كل تحوّل يبدأ بقرار واحد.' },
    note: { en: 'Executive AI built for measurable impact.', ar: 'ذكاء اصطناعي تنفيذي مبنيٌّ لأثر قابل للقياس.' },
  },
  {
    id: 'strategy',
    value: { en: 'Strategy before technology.', ar: 'الاستراتيجية قبل التقنية.' },
    note: { en: 'Intent and governance come first — the tools follow.', ar: 'النية والحوكمة أولاً — ثم تأتي الأدوات.' },
  },
  {
    id: 'impact',
    value: { en: 'Building the future with AI.', ar: 'نبني المستقبل بالذكاء الاصطناعي.' },
    note: { en: 'Every blueprint is designed around outcomes, not features.', ar: 'كل مخطط مصمم حول النتائج، لا المزايا.' },
  },
  {
    id: 'trust',
    value: { en: 'Your success story could be the next one.', ar: 'قصة نجاحك قد تكون التالية.' },
    note: { en: 'We earn trust through narrative — never statistics.', ar: 'نكسب الثقة بالحكاية — لا بالأرقام.' },
  },
];

export function MetricsStrip() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const { prefersReducedMotion } = useMotion();
  const reduced = prefersReducedMotion;

  return (
    <section className={styles.section} aria-label={ar ? 'المبادئ التنفيذية' : 'Executive principles'}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>{ar ? 'مبادئ تنفيذية' : 'EXECUTIVE PRINCIPLES'}</span>
          <span className={styles.tagline}>
            {ar ? 'كيف نفكر في الذكاء الاصطناعي المؤسسي.' : 'How we think about enterprise AI.'}
          </span>
        </div>
        <div className={styles.grid}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.id}
              className={styles.metric}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduced ? 0 : 0.6, ease }}
            >
              <span className={styles.value}>{ar ? p.value.ar : p.value.en}</span>
              <span className={styles.rule} aria-hidden="true" />
              <span className={styles.label}>{ar ? p.note.ar : p.note.en}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
