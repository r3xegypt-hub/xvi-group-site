import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { EditorialHeroVisual } from '../../ui/EditorialHeroVisual';
import { AINetwork } from '../../ui/AINetwork';
import { LightBeam } from '../../../motion/LightBeam';
import { FloatingParticles } from '../../../motion/FloatingParticles';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.6]);

  return (
    <motion.section className={styles.hero} ref={ref} aria-label="Hero" style={{ opacity: contentOpacity }}>
      <motion.div className={styles.parallaxBg} style={{ y: yOffset }}>
        <AINetwork nodeCount={40} color="#C8A65A" pulseSpeed={5} className={styles.network} />
      </motion.div>

      <LightBeam position="top-right" intensity={0.1} />
      <LightBeam position="bottom-left" intensity={0.06} />

      <div className={styles.volumetricBg} />
      <FloatingParticles count={20} color="#C8A65A" speed={0.4} className={styles.particles} />

      <Container className={styles.inner}>
        <motion.div
          className={styles.split}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={styles.contentCol}>
            <motion.p
              className={styles.eyebrow}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 } } }}
            >
              {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
            </motion.p>

            <motion.h1
              className={styles.headline}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.25, duration: 0.8 } } }}
            >
              {ar ? (
                <>
                  <span className={styles.headlineLine}><span className={styles.goldWord}>الاستخبارات</span></span>
                  <span className={styles.headlineLine}>وراء</span>
                  <span className={styles.headlineLine}>الطموح</span>
                </>
              ) : (
                <>
                  <span className={styles.headlineLine}>The Intelligence</span>
                  <span className={styles.headlineLine}><span className={styles.goldWord}>Behind the</span></span>
                  <span className={styles.headlineLine}>Ambitious.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              className={styles.subhead}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.4 } } }}
            >
              {ar ? 'استراتيجية · ذكاء اصطناعي · عمليات — من الرؤية إلى التنفيذ.' : 'Strategy. AI. Operations. — From vision to execution.'}
            </motion.p>

            <motion.div
              className={styles.actions}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.5 } } }}
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
            className={styles.visualCol}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease, delay: 0.2 } } }}
          >
            <EditorialHeroVisual />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[
            { number: '12+', label: ar ? 'سنوات من الخبرة' : 'Years of Experience' },
            { number: '200+', label: ar ? 'مشروع مكتمل' : 'Projects Delivered' },
            { number: '100%', label: ar ? 'التزام بالنتائج' : 'Commitment to Results' },
          ].map((stat, i) => (
            <motion.div
              key={stat.number}
              className={styles.stat}
              custom={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.7 + i * 0.15 } }) }}
              whileHover={{ y: -4 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statAccent} />
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
