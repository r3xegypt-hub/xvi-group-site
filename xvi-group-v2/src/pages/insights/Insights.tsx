import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './Insights.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function InsightsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent} ref={ref}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'الرؤى' : 'INSIGHTS'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'أفكار تشكل المستقبل' : 'Ideas that shape the future.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'رؤى واستشارات حول الذكاء الاصطناعي والتحول الرقمي.'
              : 'Perspectives and advisory on AI and enterprise transformation.'}
          </motion.p>
        </div>
      </section>

      {/* COMING SOON */}
      <section className={styles.comingSoonSection}>
        <div className={styles.comingSoonInner}>
          <motion.div
            className={styles.comingSoonCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className={styles.comingSoonIcon}>
              <Clock size={32} strokeWidth={1.5} />
            </div>
            <h2 className={styles.comingSoonTitle}>
              {ar ? 'المحتوى قادم قريباً' : 'Content Coming Soon'}
            </h2>
            <p className={styles.comingSoonDesc}>
              {ar
                ? 'نعمل حالياً على محتوى قيّم يشمل تحليلات واستشارات حول الذكاء الاصطناعي والتحول الرقمي. تابعونا.'
                : 'We are currently developing valuable content including analysis and advisory on AI and enterprise transformation. Stay tuned.'}
            </p>
            <div className={styles.topicsGrid}>
              {[
                { en: 'AI Strategy', ar: 'استراتيجية الذكاء الاصطناعي' },
                { en: 'Automation', ar: 'الأتمتة' },
                { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
                { en: 'Risk Intelligence', ar: 'ذكاء المخاطر' },
              ].map((topic, i) => (
                <motion.span
                  key={i}
                  className={styles.topicTag}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {ar ? topic.ar : topic.en}
                </motion.span>
              ))}
            </div>
            <a href="/contact" className={styles.contactCta}>
              {ar ? 'تواصل معنا' : 'Get in touch'}
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
