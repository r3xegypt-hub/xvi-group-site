import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Technology() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.textSide}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? '٠٢ / تكنولوجيا بنيّة' : '02 / TECHNOLOGY WITH INTENT'}
          </motion.span>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {ar
              ? 'التكنولوجيا يجب أن تجعل المنظمة تشعر بثقة أكبر — لا بتعقيد أكبر.'
              : 'Technology should make the organization feel more certain — not more complex.'}
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? 'نتصل بالذكاء بالإيقاعات التشغيلية التي يثق بها القادة بالفعل: الاستراتيجية والخدمة والمخاطر والتنفيذ.'
              : 'We connect intelligence to the operating rhythms leaders already trust: strategy, service, risk, and execution.'}
          </motion.p>
        </div>

        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <div className={styles.imageCard}>
            <img
              src="https://framerusercontent.com/images/WI07vo4Oc8DKUKFAC8wO2HcWjcY.jpg"
              alt="Abstract Intelligence Field"
              className={styles.image}
            />
            <div className={styles.glassPanel}>
              <span className={styles.glassLabel}>{ar ? 'إشارة تنفيذية' : 'EXECUTIVE SIGNAL'}</span>
              <p className={styles.glassText}>
                {ar
                  ? 'مصمم للوضوح في لحظة القرار.'
                  : 'Designed for clarity at the moment of decision.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
