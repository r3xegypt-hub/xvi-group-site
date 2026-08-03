import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { ConstellationParticles } from '../../../motion/ConstellationParticles';
import { AINetwork } from '../../ui/AINetwork';
import { TiltCard } from '../../../motion/TiltCard';
import styles from './Technology.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Technology() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.section} ref={ref}>
      {/* Subtle constellation particles */}
      <ConstellationParticles count={20} color="#C8A65A" connectionDistance={30} />

      {/* Ambient light blobs */}
      <div className={styles.ambientBlob1} aria-hidden="true" />
      <div className={styles.ambientBlob2} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Text Side ── */}
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

          {/* Feature pills */}
          <motion.div
            className={styles.pillRow}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
          >
            {(ar
              ? ['استراتيجية', 'خدمة', 'مخاطر', 'تنفيذ']
              : ['Strategy', 'Service', 'Risk', 'Execution']
            ).map((tag) => (
              <span key={tag} className={styles.pill}>{tag}</span>
            ))}
          </motion.div>
        </div>

        {/* ── Visual Side ── */}
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, x: ar ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease, delay: 0.25 }}
        >
          <TiltCard tiltDegree={6} glare depthOffset={30}>
            <div className={styles.imageCard}>
              {/* Real photographic background */}
              <div className={styles.photoLayer}>
                <img
                  src="/images/technology_visual.jpg"
                  alt=""
                  aria-hidden="true"
                  className={styles.photo}
                />
                <div className={styles.photoOverlay} />
              </div>

              {/* Animated SVG/Network overlay on top of photo */}
              <div className={styles.visualField} aria-hidden="true">
                <AINetwork nodeCount={28} color="#C8A65A" pulseSpeed={3} />
                <div className={styles.visualCore}>
                  <svg viewBox="0 0 100 100" className={styles.visualDiamond}>
                    <polygon
                      points="50,6 94,50 50,94 6,50"
                      fill="none"
                      stroke="#C8A65A"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                    <polygon
                      points="50,26 74,50 50,74 26,50"
                      fill="none"
                      stroke="#C8A65A"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                    />
                    <circle cx="50" cy="50" r="3" fill="#C8A65A" style={{ filter: 'drop-shadow(0 0 6px #C8A65A)' }} />
                  </svg>
                </div>
                <span className={styles.visualAxis} />
              </div>

              {/* Glass info panel */}
              <div className={styles.glassPanel}>
                <span className={styles.glassLabel}>{ar ? 'إشارة تنفيذية' : 'EXECUTIVE SIGNAL'}</span>
                <p className={styles.glassText}>
                  {ar
                    ? 'مصمم للوضوح في لحظة القرار.'
                    : 'Designed for clarity at the moment of decision.'}
                </p>
              </div>

              {/* Floating metric badges */}
              <div className={styles.badge1}>
                <span className={styles.badgeValue}>98%</span>
                <span className={styles.badgeLabel}>{ar ? 'دقة' : 'Accuracy'}</span>
              </div>
              <div className={styles.badge2}>
                <span className={styles.badgeValue}>2.4×</span>
                <span className={styles.badgeLabel}>{ar ? 'إنتاجية' : 'Productivity'}</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
