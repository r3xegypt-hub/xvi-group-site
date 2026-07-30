import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Eye, Compass, Users, Zap, Quote } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const values = [
  {
    icon: Eye,
    title: { en: 'Clarity', ar: 'الوضوح' },
    desc: { en: 'We make the complex simple and the ambiguous decisive.', ar: 'نجعل المعقد بسيطاً والغامض حاسماً.' },
  },
  {
    icon: Compass,
    title: { en: 'Precision', ar: 'الدقة' },
    desc: { en: 'Every recommendation is grounded in data and validated by experience.', ar: 'كل توصية مبنية على بيانات ومثبتة بالخبرة.' },
  },
  {
    icon: Users,
    title: { en: 'Partnership', ar: 'الشراكة' },
    desc: { en: 'We work alongside leadership, not in replacement of it.', ar: 'نعمل بجانب القيادة، لا بديلاً عنها.' },
  },
  {
    icon: Zap,
    title: { en: 'Impact', ar: 'التأثير' },
    desc: { en: 'Technology without transformation is expense. We deliver outcomes.', ar: 'التكنولوجيا بدون تحول هي مصروف. ن deliver نتائج.' },
  },
];

const stats = [
  { value: 'MENA', label: { en: 'Region', ar: 'المنطقة' } },
  { value: '2025', label: { en: 'Founded', ar: 'التأسيس' } },
  { value: 'AI', label: { en: 'Native', ar: 'أصيل' } },
  { value: '24/7', label: { en: 'Always-On', ar: 'دائماً متصل' } },
];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <>
      {/* HERO — CINEMATIC */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div className={styles.heroContent} ref={ref} style={{ y: parallaxY }}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'الشركة' : 'COMPANY'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'الرؤية تلتقي التنفيذ' : 'Where vision meets execution.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'XVI GROUP هي شركة استشارات تنفيذية متخصصة في الذكاء الاصطناعي. نجمع بين الرؤية الاستراتيجية والخبرة التقنية لتحويل المؤسسات.'
              : 'XVI GROUP is an executive advisory firm specializing in AI transformation. We combine strategic vision with technical depth to transform enterprises.'}
          </motion.p>
        </motion.div>
      </section>

      {/* MISSION */}
      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <motion.div
            className={styles.missionQuote}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <Quote size={40} strokeWidth={1} className={styles.quoteIcon} />
            <blockquote className={styles.quoteText}>
              {ar
                ? 'لا نبيع التكنولوجيا. نبيع الوضوح. التكنولوجيا هي الأداة، والوضوح هو النتيجة.'
                : 'We don\'t sell technology. We sell clarity. Technology is the tool; clarity is the outcome.'}
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'القيم' : 'VALUES'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'مبدأ يوجه كل قرار' : 'Principles that guide every decision'}
          </motion.h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <v.icon size={24} strokeWidth={1.5} className={styles.valueIcon} />
                <h3 className={styles.valueTitle}>{ar ? v.title.ar : v.title.en}</h3>
                <p className={styles.valueDesc}>{ar ? v.desc.ar : v.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'قصتنا' : 'OUR STORY'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'مبني على رؤية واضحة' : 'Built on a clear vision'}
          </motion.h2>
          <motion.p
            className={styles.timelineDesc}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar
              ? 'XVI GROUP تأسست في العين، الإمارات العربية المتحدة. نحن نؤمن بأن الذكاء الاصطناعي يجب أن يكون أداة استراتيجية واضحة، لا مصطلحات معقدة. مهمتنا هي مساعدة المؤسسات على اتخاذ قرارات ذكية יותר.'
              : 'XVI GROUP was founded in Al Ain, UAE. We believe AI should be a clear strategic tool — not complex jargon. Our mission is helping enterprises make smarter decisions.'}
          </motion.p>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.statItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{ar ? s.label.ar : s.label.en}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <motion.h2
            className={styles.ctaHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'انضم إلينا' : 'Join us'}
          </motion.h2>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <a href="/contact" className={styles.ctaPrimary}>
              {ar ? 'تواصل معنا' : 'Get in touch'}
              <ArrowUpRight size={14} />
            </a>
            <a href="/careers" className={styles.ctaSecondary}>
              {ar ? 'الوظائف' : 'Careers'}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
