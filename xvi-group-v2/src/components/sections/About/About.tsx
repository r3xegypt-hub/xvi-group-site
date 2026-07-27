// XVI GROUP — About Section
// Editorial personality with large serif pull-quote

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal } from '../../../motion/hooks/useScrollReveal';
import styles from './About.module.scss';

export function About() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const quoteRef = useScrollReveal({ direction: 'blur', duration: 1200, delay: 300 });
  const columnsRef = useScrollReveal({ direction: 'up', duration: 800, delay: 200 });

  return (
    <Section variant="default" id="about">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'عن XVI GROUP' : 'ABOUT XVI GROUP'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar'
              ? 'شريك المؤسسات في الاستراتيجية والتكنولوجيا'
              : 'The Enterprise Partner for Strategy and Technology'}
          </h2>
        </div>

        <div ref={quoteRef} className={styles.quoteBlock}>
          <span className={styles.quoteMark}>"</span>
          <blockquote className={styles.quote}>
            {language === 'ar'
              ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
              : 'We combine strategic vision with execution capability to transform ambition into sovereign performance.'}
          </blockquote>
          <span className={styles.quoteMarkRight}>"</span>
        </div>

        <div ref={columnsRef} className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
            </h3>
            <p className={styles.columnText}>
              {language === 'ar'
                ? 'تمكين المؤسسات من الرؤية الاستراتيجية والقدرة التكنولوجية لقيادة قطاعاتها.'
                : 'To empower enterprises with the strategic insight and technological capability to lead their industries.'}
            </p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className={styles.columnText}>
              {language === 'ar'
                ? 'أن نكون الشريك الأكثر ثقة للمؤسسات التي تتعامل مع التعقيد وتقود التحول.'
                : 'To be the most trusted partner for enterprises navigating complexity and driving transformation.'}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
