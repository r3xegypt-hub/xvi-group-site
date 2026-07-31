import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { MouseReactive } from '../../../motion/MouseReactive';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    num: '01',
    title: { en: 'Strategic AI', ar: 'الذكاء الاستراتيجي' },
    desc: {
      en: 'Frame the highest-value decisions before selecting the tools.',
      ar: 'صياغة أعلى القرارات قيمة قبل اختيار الأدوات.',
    },
    bg: 'light' as const,
  },
  {
    num: '02',
    title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' },
    desc: {
      en: 'Design operational flows that free expert attention for consequential work.',
      ar: 'تصميم تدفقات تشغيل تحرر انتباه الخبراء للعمل المهم.',
    },
    bg: 'dark' as const,
  },
  {
    num: '03',
    title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
    desc: {
      en: 'Build clarity, confidence, and governance into every transformation step.',
      ar: 'بناء الوضوح والثقة والحوكمة في كل خطوة تحول.',
    },
    bg: 'bordered' as const,
  },
];

export function Services() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="solutions" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          {ar ? '٠١ / العمليات الذكية' : '01 / INTELLIGENT OPERATIONS'}
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {ar
            ? 'انتقل من حالات الاستخدام المعزولة إلى نظام ذكاء متصل.'
            : 'Move from isolated use cases to a connected intelligence system.'}
        </motion.h2>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <MouseReactive key={service.num} intensity={6} perspective={1000}>
            <motion.div
              className={`${styles.card} ${styles[service.bg]}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
            >
              <span className={styles.cardNum}>{service.num}</span>
              <h3 className={styles.cardTitle}>
                {ar ? service.title.ar : service.title.en}
              </h3>
              <p className={styles.cardDesc}>
                {ar ? service.desc.ar : service.desc.en}
              </p>
            </motion.div>
            </MouseReactive>
          ))}
        </div>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          <Link to="/services" className={styles.ctaLink}>
            {ar ? 'اعرف المزيد' : 'Learn More'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
