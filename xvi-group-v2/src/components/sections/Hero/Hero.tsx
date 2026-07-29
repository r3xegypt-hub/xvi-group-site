import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { HeroIllustration } from '../../ui/HeroIllustration';
import { FloatingParticles, AnimatedGradient } from '../../../motion/FloatingParticles';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: 0.8 + i * 0.15 },
  }),
};

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.hero} aria-label="Hero" ref={ref}>
      <FloatingParticles count={30} color="#C8A65A" speed={0.7} className={styles.particles} />
      <AnimatedGradient className={styles.gradient} />
      <Container className={styles.inner}>
        <motion.div
          className={styles.split}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={styles.contentCol}>
            <motion.p className={styles.eyebrow} variants={childVariants}>
              {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
            </motion.p>
            <motion.h1 className={styles.headline} variants={childVariants}>
              {ar ? (
                <>
                  الاستخبارات
                  <br />
                  <span className={styles.accentWord}>وراء</span>
                  <br />
                  الطموح
                </>
              ) : (
                <>
                  The Intelligence
                  <br />
                  <span className={styles.accentWord}>Behind the</span>
                  <br />
                  Ambitious.
                </>
              )}
            </motion.h1>
            <motion.p className={styles.subhead} variants={childVariants}>
              {ar
                ? 'استراتيجية · ذكاء اصطناعي · عمليات — من الرؤية إلى التنفيذ.'
                : 'Strategy. AI. Operations. — From vision to execution, across the Middle East and beyond.'}
            </motion.p>
            <motion.div className={styles.actions} variants={childVariants}>
              <a href="/contact" className={styles.ctaPrimary}>
                {ar ? 'ابدأ الحوار' : 'Start a Conversation'}
                <ArrowUpRight size={14} />
              </a>
              <a href="/services" className={styles.ctaSecondary}>
                {ar ? 'منهجيتنا' : 'Our Approach'}
              </a>
            </motion.div>
          </div>

          <motion.div className={styles.illustrationCol} variants={childVariants}>
            <HeroIllustration />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'grid' }}
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
              variants={statVariants}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statAccent} aria-hidden="true" />
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
