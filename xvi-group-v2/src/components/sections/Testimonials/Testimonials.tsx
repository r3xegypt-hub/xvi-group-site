import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './Testimonials.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    quote: 'XVI Group transformed our AI strategy from aspiration to operational reality. Their approach gave us complete control over our intelligence infrastructure.',
    quoteAr: 'حوّلت XVI Group استراتيجيتنا للذكاء الاصطناعي من طموح إلى واقع تشغيلي.',
    name: 'Khalid Al-Mansouri',
    nameAr: 'خالد المنصوري',
    title: 'Chief Digital Officer · Gulf Financial Holdings',
    titleAr: 'مدير التحول الرقمي · مجموعة الخليج المالية',
    initials: 'KM',
  },
  {
    quote: 'The depth of strategic thinking combined with technical execution is rare. XVI delivered an enterprise architecture that will serve us for decades.',
    quoteAr: 'عمق التفكير الاستراتيجي مع التنفيذ التقني نادر. قدمت XVI هندسة مؤسسية.',
    name: 'Sarah Chen',
    nameAr: 'سارة تشين',
    title: 'VP of Technology · Meridian Energy Group',
    titleAr: 'نائب رئيس التكنولوجيا · مجموعة ميريديان للطاقة',
    initials: 'SC',
  },
  {
    quote: 'Their executive program reshaped how our leadership team thinks about AI. We now make decisions with confidence and clarity that sets a new standard.',
    quoteAr: 'أعاد برنامجهم تشكيل طريقة تفكير فريق القيادة حول الذكاء الاصطناعي.',
    name: 'Dr. Amira Hassan',
    nameAr: 'د. أميرة حسن',
    title: 'Managing Director · National Health Systems',
    titleAr: 'المدير العام · الأنظمة الصحية الوطنية',
    initials: 'AH',
  },
];

const quoteVariants: Variants = {
  enter: { opacity: 0, y: 20, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

export function Testimonials() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const ar = language === 'ar';

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <Section variant="white" id="testimonials" className={styles.section}>
      <div className={styles.glassBg} />
      <Container>
        <div className={styles.layout}>
          <div className={styles.portraitCol}>
            <motion.div
              className={styles.portraitFrame}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className={styles.portraitInitials}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {t.initials}
                </motion.div>
              </AnimatePresence>
              <div className={styles.portraitRing} />
              <div className={styles.portraitRingOuter} />
            </motion.div>
            <div className={styles.portraitGlow} />
          </div>

          <div className={styles.quoteCol}>
            <motion.div
              className={styles.overline}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className={styles.overlineLine} />
              <span>{ar ? 'ثقة القادة' : 'Trusted by Leaders'}</span>
              <span className={styles.overlineLine} />
            </motion.div>

            <div className={styles.quoteBlock}>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  className={styles.quote}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <span className={styles.quoteMark}>&ldquo;</span>
                  {ar ? t.quoteAr : t.quote}
                </motion.blockquote>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className={styles.attribution}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <span className={styles.attributionName}>{ar ? t.nameAr : t.name}</span>
                  <span className={styles.attributionTitle}>{ar ? t.titleAr : t.title}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
