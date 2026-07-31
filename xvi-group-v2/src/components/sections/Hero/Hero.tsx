import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA } from '../../../hooks/useCTA';
import { FlowingWave } from '../../../motion/FlowingWave';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const navigate = useNavigate();
  const handleCTA = useCTA();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [lettersVisible, setLettersVisible] = useState(false);
  const bgControls = useAnimationControls();

  const handlePrimary = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  const handleSecondary = useCallback(() => {
    handleCTA();
  }, [handleCTA]);

  useEffect(() => {
    if (isInView) {
      bgControls.start({
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
      });
      const timer = setTimeout(() => setLettersVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, bgControls]);

  const headline = ar
    ? 'اجعل الذكاء ميزة استراتيجية'
    : 'Make intelligence a strategic advantage.';

  const subtitle = ar
    ? 'نتشارك مع فرق القيادة لتحويل الذكاء الاصطناعي والأتمتة والبيانات إلى قرارات أوضح ونماذج تشغيل أقوى.'
    : 'We partner with leadership teams to turn artificial intelligence, automation, and data into clearer decisions and stronger operating models.';

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.bgGradient}
        animate={bgControls}
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #101010 35%, #1e1a14 65%, #0f0b06 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(200,166,90,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 70%, rgba(200,166,90,0.03) 0%, transparent 60%)',
          backgroundSize: '100% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '2% 3%', '0% 0%'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={styles.lightRays} />
      <FlowingWave color="#C8A65A" opacity={0.08} speed={0.8} />
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
          {ar
            ? headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={`${styles.word} ${lettersVisible ? styles.wordVisible : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {word}{i < headline.split(' ').length - 1 ? '\u00A0' : ''}
                </span>
              ))
            : headline.split('').map((char, i) => (
                <span
                  key={i}
                  className={`${styles.letter} ${lettersVisible ? styles.letterVisible : ''}`}
                  style={{ transitionDelay: `${i * 0.03}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))
          }
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
          <button className={styles.ctaGold} onClick={handlePrimary}>
            {ar ? 'استكشف حلولنا' : 'Explore our solutions'}
          </button>
          <button className={styles.ctaGhost} onClick={handleSecondary}>
            {ar ? 'تحدث مع المستشار الذكي' : 'Talk to the Executive AI'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
