import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Briefcase, Users, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { GeometricShapes } from '../../components/ui/GeometricShapes';
import { CTA } from '../../components/sections/CTA';
import styles from './Careers.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const openings = [
  {
    id: 'senior-ai-strategist',
    title: { en: 'Senior AI Strategist', ar: 'استراتيجي ذكاء اصطناعي أول' },
    department: { en: 'Strategy', ar: 'الاستراتيجية' },
    location: { en: 'Al Ain, UAE / Remote', ar: 'العين، الإمارات / عن بُعد' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
  {
    id: 'business-consultant',
    title: { en: 'Business Transformation Consultant', ar: 'استشاري تحويل أعمال' },
    department: { en: 'Consulting', ar: 'الاستشارات' },
    location: { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
  {
    id: 'ai-engineer',
    title: { en: 'AI Solutions Engineer', ar: 'مهندس حلول ذكاء اصطناعي' },
    department: { en: 'Technology', ar: 'التكنولوجيا' },
    location: { en: 'Remote (MENA)', ar: 'عن بُعد (الشرق الأوسط)' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
];

export function CareersPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="warm" className={styles.pageHero}>
        <GeometricShapes count={12} color="#C8A65A" />
        <Container>
          <motion.div
            ref={ref}
            className={styles.heroInner}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              className={styles.overline}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } } }}
            >
              {ar ? 'الوظائف' : 'CAREERS'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'ابنِ المستقبل معنا' : 'Build the Future With Us'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar
                ? 'نبحث عن أفراد استثنائيين يريدون تشكيل مستقبل الذكاء الاصطناعي في الأعمال.'
                : 'We seek extraordinary individuals who want to shape the future of AI in business.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <SectionReveal variant="fadeUp">
        <Section variant="white" className={styles.valuesSection}>
          <Container>
            <h2 className={styles.sectionTitle}>{ar ? 'لماذا XVI؟' : 'Why XVI?'}</h2>
            <div className={styles.valuesGrid}>
              {[
                { icon: Briefcase, title: ar ? 'عمل ذو معنى' : 'Meaningful Work', desc: ar ? 'نعمل مع أكبر المؤسسات في المنطقة على تحويلات حقيقية بالذكاء الاصطناعي.' : 'We work with leading enterprises on real AI transformations.' },
                { icon: Users, title: ar ? 'فريق عالمي' : 'Global Team', desc: ar ? 'فريق متعدد الجنسيات يعمل عن بُعد من مختلف أنحاء المنطقة والعالم.' : 'A multinational team working remotely across the region and beyond.' },
                { icon: Globe, title: ar ? 'نمو بلا حدود' : 'Limitless Growth', desc: ar ? 'فرص للتطور المهني والتعلم المستمر والمشاركة في مؤتمرات عالمية.' : 'Opportunities for professional development, continuous learning, and global conferences.' },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                >
                  <value.icon size={24} strokeWidth={1.5} className={styles.valueIcon} />
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <SectionReveal variant="scaleIn">
        <Section variant="warm" className={styles.openingsSection}>
          <Container>
            <h2 className={styles.sectionTitle}>{ar ? 'الفرص المتاحة' : 'Open Positions'}</h2>
            <div className={styles.openingsList}>
              {openings.map((job, i) => (
                <motion.div
                  key={job.id}
                  className={styles.openingCard}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                >
                  <div className={styles.openingInfo}>
                    <h3 className={styles.openingTitle}>{ar ? job.title.ar : job.title.en}</h3>
                    <div className={styles.openingMeta}>
                      <span>{ar ? job.department.ar : job.department.en}</span>
                      <span className={styles.dot} />
                      <span>{ar ? job.location.ar : job.location.en}</span>
                      <span className={styles.dot} />
                      <span>{ar ? job.type.ar : job.type.en}</span>
                    </div>
                  </div>
                  <a href={`mailto:careers@xvigroup.com?subject=Application: ${job.title.en}`} className={styles.applyLink}>
                    {ar ? 'قدم الآن' : 'Apply'}
                    <ArrowUpRight size={16} />
                  </a>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <CTA />
    </>
  );
}
