import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { ImageReveal } from '../../../motion/ImageReveal';
import { TextReveal } from '../../../motion/TextReveal';
import { MorphingBackground } from '../../../motion/MorphingBackground';
import { SectionSeparator } from '../../../motion/SectionSeparator';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const quoteX = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0.8]);

  return (
    <Section variant="warm" id="about" className={styles.section}>
      <MorphingBackground
        colors={['rgba(247,246,243,1)', 'rgba(200,166,90,0.04)', 'rgba(19,34,56,0.03)']}
        className={styles.morphBg}
      />
      <Container>
        <SectionHeader
          overline={ar ? 'عن XVI' : 'ABOUT'}
          title={ar ? 'شريكك في الاستراتيجية والذكاء' : 'Your Partner in Strategy & Intelligence'}
        />
        <div className={styles.editorial} ref={ref}>
          <motion.div className={styles.quoteCol} style={{ x: quoteX, opacity: quoteOpacity }}>
            <blockquote className={styles.quote}>
              {ar
                ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
                : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
            </blockquote>
          </motion.div>

          <div className={styles.imageCol}>
            <ImageReveal direction="left" aspectRatio="4/5">
              <div className={styles.imagePlaceholder}>
                <div className={styles.imageGrid}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className={styles.imageCell}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.06 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                    />
                  ))}
                </div>
              </div>
            </ImageReveal>
          </div>

          <div className={styles.bodyCol}>
            {ar ? (
              <>
                <p className={styles.bodyText}>
                  XVI GROUP شريك استراتيجي للمؤسسات التي تتعامل مع التعقيد وتقود التحول.
                </p>
                <p className={styles.bodyText}>
                  منذ 2020، عملنا مع أكثر من 200 مؤسسة عبر منطقة الشرق الأوسط وشمال أفريقيا.
                </p>
              </>
            ) : (
              <>
                <TextReveal text="XVI GROUP is a strategic partner to enterprises navigating complexity and leading transformation." className={styles.bodyText} />
                <TextReveal text="Since 2020, we have worked with over 200 enterprises across MENA." className={styles.bodyText} />
              </>
            )}
          </div>
        </div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>2020</span>
            <span className={styles.statLabel}>{ar ? 'تأسسنا' : 'Founded'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>{ar ? 'مشروع' : 'Projects'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>{ar ? 'دولة' : 'Countries'}</span>
          </div>
        </motion.div>
      </Container>
      <SectionSeparator variant="arch" />
    </Section>
  );
}
