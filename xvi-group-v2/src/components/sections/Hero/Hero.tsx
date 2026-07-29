import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { AINetwork } from '../../ui/AINetwork';
import { LightBeam } from '../../../motion/LightBeam';
import { FloatingParticles, AnimatedGradient } from '../../../motion/FloatingParticles';
import { TextReveal } from '../../../motion/TextReveal';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);

  return (
    <motion.section className={styles.hero} aria-label="Hero" ref={ref} style={{ opacity }}>
      <motion.div className={styles.bgLayer} style={{ y: heroY }}>
        <AINetwork nodeCount={50} color="#C8A65A" pulseSpeed={4} className={styles.network} />
        <AnimatedGradient
          colors={['rgba(200, 166, 90, 0.05)', 'rgba(200, 166, 90, 0.02)', 'rgba(247, 246, 243, 0)']}
          duration={12}
          className={styles.gradientLayer}
        />
      </motion.div>

      <LightBeam position="top-right" intensity={0.12} className={styles.beam1} />
      <LightBeam position="bottom-left" intensity={0.08} className={styles.beam2} />

      <div className={styles.volumetricBg} />

      <FloatingParticles count={25} color="#C8A65A" speed={0.6} className={styles.particles} />

      <motion.div className={styles.contentWrapper} style={{ y: contentY }}>
        <Container className={styles.inner}>
          <motion.div
            className={styles.split}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className={styles.contentCol}>
              <motion.p
                className={styles.eyebrow}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } },
                }}
              >
                {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.3 } },
                }}
              >
                {ar ? (
                  <h1 className={styles.headline}>
                    الاستخبارات
                    <br />
                    <span className={styles.accentWord}>وراء</span>
                    <br />
                    الطموح
                  </h1>
                ) : (
                  <TextReveal text="The Intelligence Behind the Ambitious." as="h1" className={styles.headline} />
                )}
              </motion.div>

              <motion.p
                className={styles.subhead}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.4 } },
                }}
              >
                {ar
                  ? 'استراتيجية · ذكاء اصطناعي · عمليات — من الرؤية إلى التنفيذ.'
                  : 'Strategy. AI. Operations. — From vision to execution, across the Middle East and beyond.'}
              </motion.p>

              <motion.div
                className={styles.actions}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.5 } },
                }}
              >
                <a href="/contact" className={styles.ctaPrimary}>
                  {ar ? 'ابدأ الحوار' : 'Start a Conversation'}
                  <ArrowUpRight size={14} />
                </a>
                <a href="/services" className={styles.ctaSecondary}>
                  {ar ? 'منهجيتنا' : 'Our Approach'}
                </a>
              </motion.div>
            </div>

            <motion.div
              className={styles.illustrationCol}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease, delay: 0.3 } },
              }}
            >
              <div className={styles.illustrationGlow} />
              <svg width="100%" height="100%" viewBox="0 0 600 520" fill="none" aria-hidden="true" style={{ maxWidth: 600, maxHeight: 520, position: 'relative', zIndex: 1 }}>
                <rect x="40" y="20" width="520" height="480" rx="4" stroke="#C8A65A" strokeWidth="0.5" fill="rgba(200,166,90,0.03)" />
                <motion.line x1="40" y1="80" x2="560" y2="80" stroke="#C8A65A" strokeWidth="0.3" strokeOpacity={0.3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 }} />
                <motion.line x1="40" y1="140" x2="560" y2="140" stroke="#C8A65A" strokeWidth="0.3" strokeOpacity={0.2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} />
                <motion.line x1="40" y1="200" x2="560" y2="200" stroke="#C8A65A" strokeWidth="0.3" strokeOpacity={0.15} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
                <motion.line x1="40" y1="260" x2="560" y2="260" stroke="#C8A65A" strokeWidth="0.3" strokeOpacity={0.1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} />
                <motion.circle cx="120" cy="110" r="10" fill="#C8A65A" fillOpacity={0.6} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.8 }} />
                <motion.circle cx="200" cy="170" r="6" fill="#C8A65A" fillOpacity={0.3} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.9 }} />
                <motion.circle cx="480" cy="110" r="8" fill="#C8A65A" fillOpacity={0.4} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 1.0 }} />
                <motion.circle cx="320" cy="50" r="5" fill="#C8A65A" fillOpacity={0.2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 1.1 }} />
                <motion.rect x="100" y="220" width="160" height="1" fill="#C8A65A" fillOpacity={0.4} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.0 }} />
                <motion.rect x="340" y="220" width="80" height="1" fill="#C8A65A" fillOpacity={0.3} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.1 }} />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {[
              { number: '12+', label: ar ? 'سنوات' : 'Years' },
              { number: '200+', label: ar ? 'مشروع' : 'Projects' },
              { number: '100%', label: ar ? 'التزام' : 'Delivery' },
            ].map((stat, i) => (
              <motion.div
                key={stat.number}
                className={styles.stat}
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: (i: number) => ({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease, delay: 0.8 + i * 0.15 },
                  }),
                }}
                whileHover={{ y: -4 }}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statAccent} aria-hidden="true" />
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
    </motion.section>
  );
}
