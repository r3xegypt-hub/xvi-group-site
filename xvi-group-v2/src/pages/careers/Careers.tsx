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
                { icon: Briefcase, title: ar ? 'عمل ذو معنى' : 'Meaningful Work', desc: ar ? 'فرص للعمل على تحويلات حقيقية بالذكاء الاصطناعي في_sector مختلف.' : 'Opportunities to work on real AI transformations across sectors.' },
                { icon: Users, title: ar ? 'فريق متميز' : 'Distinction Team', desc: ar ? 'انضم إلى فريق يلتبت بالتميز والابتكار في كل ما نفعله.' : 'Join a team committed to excellence and innovation in everything we do.' },
                { icon: Globe, title: ar ? 'نمو بلا حدود' : 'Limitless Growth', desc: ar ? 'فرص للتطور المهني والتعلم المستمر.' : 'Opportunities for professional development and continuous learning.' },
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
            <div className={styles.comingSoonCard}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className={styles.comingSoonInner}
              >
                <h3 className={styles.comingSoonTitle}>
                  {ar ? 'الوظائف قادمة قريباً' : 'Positions Opening Soon'}
                </h3>
                <p className={styles.comingSoonDesc}>
                  {ar
                    ? 'نحن في مرحلة بناء الفريق. ستظهر الفرص المتاحة هنا قريباً.'
                    : 'We are in the team-building phase. Open positions will appear here soon.'}
                </p>
                <a href="/contact" className={styles.contactLink}>
                  {ar ? 'تواصل معنا' : 'Get in touch'}
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <CTA />
    </>
  );
}
