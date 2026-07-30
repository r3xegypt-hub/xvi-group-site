import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [lettersVisible, setLettersVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLettersVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const headline = ar
    ? 'اجعل الذكاء ميزة استراتيجية'
    : 'Make intelligence a strategic advantage.';

  const subtitle = ar
    ? 'نتشارك مع فرق القيادة لتحويل الذكاء الاصطناعي والأتمتة والبيانات إلى قرارات أوضح ونماذج تشغيل أقوى.'
    : 'We partner with leadership teams to turn artificial intelligence, automation, and data into clearer decisions and stronger operating models.';

  return (
    <section className={styles.hero}>
      <div className={styles.bgGradient} />
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.container} ref={ref}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {ar ? 'XVI GROUP / التحول الذكي' : 'XVI GROUP / INTELLIGENT TRANSFORMATION'}
        </motion.span>

        <h1 className={styles.headline}>
          {headline.split('').map((char, i) => (
            <span
              key={i}
              className={`${styles.letter} ${lettersVisible ? styles.letterVisible : ''}`}
              style={{ transitionDelay: `${i * 0.03}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.8 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 1.0 }}
        >
          <a href="#solutions" className={styles.ctaGold}>
            {ar ? 'استكشف نهجنا' : 'Explore our approach'}
          </a>
        </motion.div>

        <motion.div
          className={styles.aiWidget}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
        >
          <div className={styles.orbContainer}>
            <div className={styles.orb}>
              <div className={styles.orbInner} />
              <div className={styles.orbRing} />
              <div className={styles.orbRing2} />
            </div>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={styles.particleOrbit}
                style={{
                  animationDelay: `${i * 0.8}s`,
                  transform: `rotate(${i * 72}deg)`,
                }}
              />
            ))}
          </div>

          <div className={styles.widgetContent}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetBadge}>{ar ? 'جاهز' : 'Ready'}</span>
              <span className={styles.widgetTitle}>{ar ? 'المساعد التنفيذي الذكي' : 'XVI EXECUTIVE AI'}</span>
            </div>
            <p className={styles.widgetDesc}>
              {ar
                ? 'رفيق بصري للقرارات المعقدة، مصمم ليكون هادئاً ودقيقاً.'
                : 'A visual companion for complex decisions, designed to feel composed, informed, and quietly capable.'}
            </p>
            <div className={styles.widgetInput}>
              <span className={styles.widgetPrompt}>{ar ? 'ask me anything...' : 'ask me anything...'}</span>
              <span className={styles.cursor} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
