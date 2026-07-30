import { motion } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './Testimonials.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Testimonials() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="white" id="testimonials" className={styles.section}>
      <Container>
        <SectionReveal variant="fadeUp">
          <div className={styles.layout}>
            <div className={styles.portraitCol}>
              <div className={styles.portraitFrame}>
                <div className={styles.portraitInitials}>
                  {ar ? 'ق' : 'X'}
                </div>
                <div className={styles.portraitRing} />
              </div>
            </div>

            <div className={styles.quoteCol}>
              <div className={styles.quoteBlock}>
                <blockquote className={styles.quote}>
                  <span className={styles.quoteMark}>&ldquo;</span>
                  {ar
                    ? 'ستظهر الشهادات من عملائنا هنا بعد إطلاق أولى المشاريع.'
                    : 'Client testimonials will appear here as we launch our first engagements.'}
                </blockquote>
                <div className={styles.attribution}>
                  <span className={styles.attributionName}>{ar ? 'قريباً' : 'Coming Soon'}</span>
                  <span className={styles.attributionTitle}>{ar ? 'شركاؤنا يتحدثون' : 'Our partners will speak'}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}