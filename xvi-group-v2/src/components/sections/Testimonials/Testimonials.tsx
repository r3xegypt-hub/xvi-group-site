import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { AINetwork } from '../../ui/AINetwork';
import styles from './Testimonials.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    quote: 'XVI Group transformed our AI strategy from aspiration to operational reality. Their approach gave us complete control over our intelligence infrastructure.',
    quoteAr: 'حوّلت XVI Group استراتيجيتنا للذكاء الاصطناعي من طموح إلى واقع تشغيلي. نهجهم منحنا سيطرة كاملة على بنية الذكاء.',
    name: 'Khalid Al-Mansouri',
    nameAr: 'خالد المنصوري',
    title: 'Chief Digital Officer · Gulf Financial Holdings',
    titleAr: 'مدير التحول الرقمي · مجموعة الخليج المالية',
  },
  {
    quote: 'The depth of strategic thinking combined with technical execution is rare. XVI delivered an enterprise architecture that will serve us for decades.',
    quoteAr: 'عمق التفكير الاستراتيجي مع التنفيذ التقني نادر. قدمت XVI هندسة مؤسسية ستخدمنا لعقود.',
    name: 'Sarah Chen',
    nameAr: 'سارة تشين',
    title: 'VP of Technology · Meridian Energy Group',
    titleAr: 'نائب رئيس التكنولوجيا · مجموعة ميريديان للطاقة',
  },
  {
    quote: 'Their executive program reshaped how our leadership team thinks about AI. We now make decisions with confidence and clarity.',
    quoteAr: 'أعاد برنامجهم تشكيل طريقة تفكير فريق القيادة حول الذكاء الاصطناعي. نتخذ قراراتنا الآن بثقة ووضوح.',
    name: 'Dr. Amira Hassan',
    nameAr: 'د. أميرة حسن',
    title: 'Managing Director · National Health Systems',
    titleAr: 'المدير العام · الأنظمة الصحية الوطنية',
  },
];

const quoteVariants: Variants = {
  enter: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
  exit: { opacity: 0, y: -30, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

export function Testimonials() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const ar = language === 'ar';
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <Section variant="white" id="testimonials" className={styles.section}>
      <AINetwork nodeCount={20} color="#C8A65A" pulseSpeed={6} className={styles.networkBg} />
      <motion.div className={styles.cinemaBg} style={{ opacity: sectionOpacity }} />
      <Container>
        <motion.div className={styles.inner} ref={ref} style={{ scale: sectionScale }}>
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
                <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
                {ar ? t.quoteAr : t.quote}
                <span className={styles.quoteMarkEnd} aria-hidden="true">&rdquo;</span>
              </motion.blockquote>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={styles.attribution}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className={styles.attributionName}>{ar ? t.nameAr : t.name}</span>
                <span className={styles.attributionTitle}>{ar ? t.titleAr : t.title}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.dots}>
            {TESTIMONIALS.map((_, i) => (
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
        </motion.div>
      </Container>
    </Section>
  );
}
