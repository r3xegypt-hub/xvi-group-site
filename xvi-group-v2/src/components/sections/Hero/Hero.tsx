import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion, useInView, useAnimationControls, useMotionValue, useSpring, useTransform, useScroll,
} from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCTA } from '../../../hooks/useCTA';
import { useMotion } from '../../../motion/providers/MotionProvider';
import { playSound } from '../../../motion/audio/soundEngine';
import { ExecutiveScene } from '../../scene/ExecutiveScene';
import { AICore } from './AICore';
import { MagneticButton } from '../../../motion/MagneticButton';
import { FloatingParticles } from '../../../motion/FloatingParticles';
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
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });

  // Autonomous "camera" drift for a living 3D environment
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      camX.set(Math.sin(t * 0.16) * 18);
      camY.set(Math.cos(t * 0.12) * 12);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, camX, camY]);

  // Scrubbed Scroll Transforms for Cinematic Parallax Depth
  const bgScrollY = useTransform(scrollYProgress, (v: number) => v * 160);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, 6]);

  const bgLayerX = useTransform([sx, camX], (v: number[]) => v[0] * 0.35 + v[1]);
  const bgLayerY = useTransform([sy, camY, bgScrollY], (v: number[]) => v[0] * 0.3 + v[1] + v[2]);
  const sceneX = useTransform([sx, camX], (v: number[]) => v[0] * 0.6 + v[1] * 0.65);
  const sceneY = useTransform([sy, camY], (v: number[]) => v[0] * 0.55 + v[1] * 0.6);
  const robotX = useTransform([sx], (v: number[]) => v[0] * 1.35);
  const robotY = useTransform([sy], (v: number[]) => v[0] * 1.15);
  const contentX = useTransform([sx], (v: number[]) => v[0] * 0.9);
  const contentY = useTransform([sy], (v: number[]) => v[0] * 0.85);

  const contentScrollY = useTransform(scrollYProgress, (v: number) => v * 110);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);

  const handlePrimary = useCallback(() => {
    playSound('ctaClick');
    navigate('/services');
  }, [navigate]);

  const handleSecondary = useCallback(() => {
    handleCTA();
  }, [handleCTA]);

  const onCtaHover = useCallback(() => {
    playSound('ctaHover');
  }, []);

  useEffect(() => {
    if (isInView) {
      if (!prefersReducedMotion) {
        bgControls.start({
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        });
      }
      const timer = setTimeout(() => setLettersVisible(true), 250);
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
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          scale: heroScale,
          rotateX: heroRotateX,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        <motion.div
          className={styles.bgGradient}
          animate={bgControls}
          style={{
            x: bgLayerX,
            y: bgLayerY,
            background: 'linear-gradient(135deg, #080810 0%, #0e1018 40%, #0a0c12 70%, #060708 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* ── Rich Photographic Background ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            x: bgLayerX,
            y: bgLayerY,
          }}
        >
          <img
            src="/images/hero_ai_visual.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.32,
              mixBlendMode: 'luminosity',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
          {/* Dark vignette to integrate photo with design */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 70% 50%, transparent 20%, rgba(6,7,8,0.7) 80%), linear-gradient(to right, rgba(6,7,8,0.9) 0%, rgba(6,7,8,0.3) 60%, rgba(6,7,8,0.5) 100%)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        <motion.div className={styles.sceneLayer} style={{ x: sceneX, y: sceneY }}>
          <ExecutiveScene density={60} interactive={!prefersReducedMotion} />
        </motion.div>

        {/* Ambient Gold Floating Dust Particles */}
        <FloatingParticles count={28} color="#C8A65A" speed={1.2} />

        <motion.div className={styles.gridLayer} style={{ x: bgLayerX, y: bgLayerY }}>
          <div className={styles.gridBackdrop} />
        </motion.div>
        <div className={styles.lightRays} />
        <div className={styles.spotlight} />
        <div className={styles.ambientLight} />
        <div className={styles.headlineSweep} />
        <div className={styles.goldenReflection} />
        <motion.div
          className={styles.robot}
          style={{ x: robotX, y: robotY }}
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, ease }}
        >
          <div className={styles.robotInner}>
            <AICore />
          </div>
        </motion.div>

        <motion.div
          className={styles.container}
          style={{ y: contentScrollY, opacity: contentOpacity }}
        >
          <motion.div style={{ x: contentX, y: contentY }}>
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, y: 14 }}
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
                      style={{ transitionDelay: `${i * 0.12}s` }}
                    >
                      {word}{i < headline.split(' ').length - 1 ? '\u00A0' : ''}
                    </span>
                  ))
                : headline.split('').map((char, i) => (
                    <span
                      key={i}
                      className={`${styles.letter} ${lettersVisible ? styles.letterVisible : ''}`}
                      style={{ transitionDelay: `${i * 0.025}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))
              }
            </h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease, delay: 0.75 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease, delay: 0.95 }}
            >
              <MagneticButton strength={0.4} onClick={handlePrimary}>
                <button className={styles.ctaGold} onMouseEnter={onCtaHover}>
                  {ar ? 'استكشف حلولنا' : 'Explore our solutions'}
                </button>
              </MagneticButton>
              <MagneticButton strength={0.3} onClick={handleSecondary}>
                <button className={styles.ctaGhost} onMouseEnter={onCtaHover}>
                  {ar ? 'تحدث مع المستشار الذكي' : 'Talk to the Executive AI'}
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className={styles.vignette} />
      </motion.div>
    </section>
  );
}

