import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import styles from './About.module.scss';

export function About() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="slate" id="about" className={styles.section}>
      <Container>
        <SectionHeader
          overline={ar ? 'عن XVI' : 'ABOUT'}
          title={ar ? 'شريكك في الاستراتيجية والذكاء' : 'Your Partner in Strategy & Intelligence'}
        />

        <div className={styles.split}>
          <div className={styles.quoteCol}>
            <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
            <blockquote className={styles.quote}>
              {ar
                ? 'نجمع بين الرؤية الاستراتيجية والقدرة التنفيذية لتحويل الطموح إلى أداء سيادي قابل للقياس.'
                : 'We combine strategic vision with execution capability to transform ambition into sovereign, measurable performance.'}
            </blockquote>
            <div className={styles.quoteAttribution}>
              <span className={styles.quoteLine} aria-hidden="true" />
              <span className={styles.quoteLabel}>{ar ? 'فلسفة XVI' : 'XVI Philosophy'}</span>
            </div>
          </div>

          <div className={styles.bodyCol}>
            <p className={styles.bodyText}>
              {ar
                ? 'XVI GROUP شريك استراتيجي للمؤسسات التي تتعامل مع التعقيد وتقود التحول. نجمع بين الخبرة الاستشارية العميقة والقدرة التكنولوجية المتقدمة لتقديم نتائج ملموسة.'
                : 'XVI GROUP is a strategic partner to enterprises navigating complexity and leading transformation. We combine deep advisory expertise with advanced technological capability to deliver measurable results.'}
            </p>
            <p className={styles.bodyText}>
              {ar
                ? 'منذ 2020، عملنا مع أكثر من 200 مؤسسة عبر منطقة الشرق الأوسط وشمال أفريقيا، لمساعدتها على بناء قدرات الذكاء الاصطناعي السيادية وتحقيق التميز التشغيلي.'
                : 'Since 2020, we have worked with over 200 enterprises across MENA, helping them build sovereign AI capabilities and achieve operational excellence.'}
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statDot} aria-hidden="true" />
            <span className={styles.statNumber}>2020</span>
            <span className={styles.statLabel}>{ar ? 'تأسسنا' : 'Founded'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statDot} aria-hidden="true" />
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>{ar ? 'مشروع' : 'Projects'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statDot} aria-hidden="true" />
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>{ar ? 'دولة' : 'Countries'}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
