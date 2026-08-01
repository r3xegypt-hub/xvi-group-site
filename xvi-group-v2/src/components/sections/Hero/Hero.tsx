import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion, useInView, useAnimationControls, useMotionValue, useSpring, useTransform, useScroll,
} from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA } from '../../../hooks/useCTA';
import { useMotion } from '../../../motion/providers/MotionProvider';
import { ExecutiveScene } from '../../scene/ExecutiveScene';
import { HeroRobot } from './HeroRobot';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const navigate = useNavigate();
  const handleCTA = useCTA();
  const { prefersReducedMotion } = useMotion();

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [lettersVisible, setLettersVisible] = useState(false);
  const bgControls = useAnimationControls();

  // Interactive mouse parallax (spring-smoothed, normalized -1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 45, damping: 15, mass: 0.5 });

  // Autonomous "camera" drift for a living 3D environment
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      camX.set(Math.sin(t * 0.16) * 16);
      camY.set(Math.cos(t * 0.12) * 11);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, camX, camY]);

  const bgScrollY = useTransform(scrollYProgress, (v: number) => v * 140);

  const bgLayerX = useTransform([sx, camX], (v: number[]) => v[0] * 0.3 + v[1]);
  const bgLayerY = useTransform([sy, camY, bgScrollY], (v: number[]) => v[0] * 0.26 + v[1] + v[2]);
  const sceneX = useTransform([sx, camX], (v: number[]) => v[0] * 0.55 + v[1] * 0.6);
  const sceneY = useTransform([sy, camY], (v: number[]) => v[0] * 0.5 + v[1] * 0.55);
  const robotX = useTransform([sx], (v: number[]) => v[0] * 1.25);
  const robotY = useTransform([sy], (v: number[]) => v[0] * 1.05);
  const contentX = useTransform([sx], (v: number[]) => v[0] * 0.85);
  const contentY = useTransform([sy], (v: number[]) => v[0] * 0.8);

  const contentScrollY = useTransform(scrollYProgress, (v: number) => v * 90);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.25]);

  const handlePrimary = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  const handleSecondary = useCallback(() => {
    handleCTA();
  }, [handleCTA]);

  useEffect(() => {
    if (isInView) {
      if (!prefersReducedMotion) {
        bgControls.start({
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        });
      }
      const timer = setTimeout(() => setLettersVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, bgControls, prefersReducedMotion]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }, [mx, my]);

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const headline = ar
    ? 'اجعل الذكاء ميزة استراتيجية'
    : 'Make intelligence a strategic advantage.';

  const subtitle = ar
    ? 'نتشارك مع فرق القيادة لتحويل الذكاء الاصطناعي والأتمتة والبيانات إلى قرارات أوضح ونماذج تشغيل أقوى.'
    : 'We partner with leadership teams to turn artificial intelligence, automation, and data into clearer decisions and stronger operating models.';

  return (
    <section
      ref={ref}
      className={styles.hero}
      onPointerMove={prefersReducedMotion ? undefined : onPointerMove}
      onPointerLeave={prefersReducedMotion ? undefined : onPointerLeave}
    >
      <motion.div
        className={styles.bgGradient}
        animate={bgControls}
        style={{
          x: bgLayerX,
          y: bgLayerY,
          background: 'linear-gradient(135deg, #0a1628 0%, #101010 35%, #1e1a14 65%, #0f0b06 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <motion.div className={styles.sceneLayer} style={{ x: sceneX, y: sceneY }}>
        <ExecutiveScene density={56} interactive={!prefersReducedMotion} />
      </motion.div>
      <motion.div className={styles.gridLayer} style={{ x: bgLayerX, y: bgLayerY }}>
        <div className={styles.gridBackdrop} />
      </motion.div>
      <div className={styles.lightRays} />
      <div className={styles.spotlight} />
      <motion.div className={styles.robot} style={{ x: robotX, y: robotY }}>
        <div className={styles.robotInner}>
          <HeroRobot />
        </div>
      </motion.div>

      <motion.div
        className={styles.container}
        style={{ y: contentScrollY, opacity: contentOpacity }}
      >
        <motion.div style={{ x: contentX, y: contentY }}>
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
        </motion.div>
      </motion.div>

      <div className={styles.vignette} />
    </section>
  );
}
