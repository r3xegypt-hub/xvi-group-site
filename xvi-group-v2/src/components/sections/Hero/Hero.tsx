import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { StaggerText } from '../../../motion/StaggerText';
import { ScrollIndicator } from '../../ui/ScrollIndicator';
import styles from './Hero.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=85';

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <motion.section className={styles.hero} ref={ref} style={{ opacity: contentOpacity }}>
      <motion.div className={styles.bgLayer} style={{ y: bgParallax }}>
        <div className={`${styles.bgImage} ${imageLoaded ? styles.bgLoaded : ''}`} />
        <div className={styles.bgOverlay} />
        <div className={styles.bgGradient} />
      </motion.div>

      <div className={styles.geometry}>
        <motion.div
          className={styles.geoCircle}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={styles.geoRing}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={styles.geoOrbit}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className={styles.geoDot} />
        </motion.div>
        <motion.div
          className={styles.geoOrbitReverse}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <div className={styles.geoDotSmall} />
        </motion.div>
        <motion.div
          className={styles.geoLine}
          animate={{ scaleX: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.geoLineVertical}
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <Container className={styles.inner}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <h1 className={styles.headline}>
              {ar ? (
                <StaggerText
                  text="الاستخبارات وراء الطموح"
                  as="div"
                  splitBy="char"
                  stagger={0.025}
                  delay={0.2}
                />
              ) : (
                <StaggerText
                  text="The Intelligence Behind The Ambitious"
                  as="div"
                  splitBy="char"
                  stagger={0.02}
                  delay={0.2}
                />
              )}
            </h1>
          </motion.div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
          >
            {ar
              ? 'نحوّل الرؤى الجريئة إلى مؤسسات ذات سيادة. استراتيجية، ذكاء، تنفيذ.'
              : 'We transform bold visions into sovereign enterprises. Strategy. Intelligence. Execution.'}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 1.2 }}
          >
            <a href="/contact" className={styles.cta}>
              <span>{ar ? 'ابدأ الحوار' : 'Begin the Conversation'}</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />
    </motion.section>
  );
}