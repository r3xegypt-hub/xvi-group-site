import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { TextReveal } from '../../../motion/TextReveal';
import { AnimatedGradient } from '../../../motion/FloatingParticles';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section variant="warm" id="about" className={styles.section}>
      <AnimatedGradient
        colors={['rgba(200, 166, 90, 0.04)', 'rgba(200, 166, 90, 0.02)', 'transparent']}
        duration={15}
        className={styles.bgGradient}
      />
      <Container>
        <SectionHeader
          overline={ar ? 'عن XVI' : 'ABOUT'}
          title={ar ? 'شريكك في الاستراتيجية والذكاء' : 'Your Partner in Strategy & Intelligence'}
        />
        <div className={styles.split} ref={ref}>
          <motion.div
            className={styles.quoteCol}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease }}
          >
            <blockquote className={styles.quote}>
              {ar
                ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
                : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
            </blockquote>
          </motion.div>
          <motion.div
            className={styles.bodyCol}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            {ar ? (
              <>
                <p className={styles.bodyText}>
                  XVI GROUP شريك استراتيجي للمؤسسات التي تتعامل مع التعقيد وتقود التحول. نجمع بين الخبرة الاستشارية العميقة والقدرة التكنولوجية المتقدمة لتقديم نتائج ملموسة.
                </p>
                <p className={styles.bodyText}>
                  منذ 2020، عملنا مع أكثر من 200 مؤسسة عبر منطقة الشرق الأوسط وشمال أفريقيا، لمساعدتها على بناء قدرات الذكاء الاصطناعي السيادية وتحقيق التميز التشغيلي.
                </p>
              </>
            ) : (
              <>
                <TextReveal
                  text="XVI GROUP is a strategic partner to enterprises navigating complexity and leading transformation. We combine deep advisory expertise with advanced technological capability to deliver measurable results."
                  className={styles.bodyText}
                />
                <TextReveal
                  text="Since 2020, we have worked with over 200 enterprises across MENA, helping them build sovereign AI capabilities and achieve operational excellence."
                  className={styles.bodyText}
                />
              </>
            )}
          </motion.div>
        </div>
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
    </Section>
  );
}
