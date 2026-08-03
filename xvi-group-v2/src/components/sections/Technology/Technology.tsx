import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { ConstellationParticles } from '../../../motion/ConstellationParticles';
import { AINetwork } from '../../ui/AINetwork';
import { AIWorkflowGraphics } from '../../ui/AIWorkflowGraphics';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Technology() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.section} ref={ref}>
      <AIWorkflowGraphics />
      <ConstellationParticles count={20} color="#C8A65A" connectionDistance={30} />
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
            <div className={styles.visualField} aria-hidden="true">
              {/* ── Real photo behind the AI network — subtle & premium ── */}
              <div className={styles.photoBack}>
                <img
                  src={`${import.meta.env.BASE_URL}images/technology_visual.jpg`}
                  alt=""
                  className={styles.photoBackImg}
                  loading="lazy"
                />
                <div className={styles.photoBackOverlay} />
              </div>
              <AINetwork nodeCount={34} color="#C8A65A" pulseSpeed={3} />
              <div className={styles.visualCore}>
                <svg viewBox="0 0 100 100" className={styles.visualDiamond}>
                  <polygon
                    points="50,6 94,50 50,94 6,50"
                    fill="none"
                    stroke="#C8A65A"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,26 74,50 50,74 26,50"
                    fill="none"
                    stroke="#C8A65A"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                  <line x1="50" y1="6" x2="50" y2="94" stroke="#C8A65A" strokeWidth="0.5" strokeOpacity="0.4" />
                  <line x1="6" y1="50" x2="94" y2="50" stroke="#C8A65A" strokeWidth="0.5" strokeOpacity="0.4" />
                  <circle cx="50" cy="50" r="2.5" fill="#C8A65A" />
                </svg>
              </div>
              <span className={styles.visualAxis} />
            </div>
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
