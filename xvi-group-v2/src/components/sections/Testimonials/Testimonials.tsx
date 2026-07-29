// XVI GROUP — Testimonials Section (Sprint 02)
// Luxury consulting testimonials with editorial layout

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Testimonials.module.scss';

const TESTIMONIALS = [
  {
    quote: 'XVI Group transformed our AI strategy from aspiration to operational reality. Their sovereign approach gave us complete control over our intelligence infrastructure.',
    quoteAr: 'حوّلت XVI Group استراتيجيتنا للذكاء الاصطناعي من طموح إلى واقع تشغيلي. نهجهم السيادي منحنا سيطرة كاملة على بنية الذكاء.',
    name: 'Khalid Al-Mansouri',
    nameAr: 'خالد المنصوري',
    role: 'Chief Digital Officer',
    roleAr: 'مدير التحول الرقمي',
    company: 'Gulf Financial Holdings',
    companyAr: 'مجموعة الخليج المالية',
  },
  {
    quote: 'The depth of strategic thinking combined with technical execution is rare. XVI delivered an enterprise architecture that will serve us for decades.',
    quoteAr: 'عمق التفكير الاستراتيجي مع التنفيذ التقني نادر. قدمت XVI هندسة مؤسسية ستخدمنا لعقود.',
    name: 'Sarah Chen',
    nameAr: 'سارة تشين',
    role: 'VP of Technology',
    roleAr: 'نائب رئيس التكنولوجيا',
    company: 'Meridian Energy Group',
    companyAr: 'مجموعة ميريديان للطاقة',
  },
  {
    quote: 'Their executive training program reshaped how our leadership team thinks about AI. We now make decisions with confidence and strategic clarity.',
    quoteAr: 'أعاد برنامجهم التدريبي التنفيذي تشكيل طريقة تفكير فريق القيادة حول الذكاء الاصطناعي. نتخذ قراراتنا الآن بثقة ووضوح استراتيجي.',
    name: 'Dr. Amira Hassan',
    nameAr: 'د. أميرة حسن',
    role: 'Managing Director',
    roleAr: 'المدير العام',
    company: 'National Health Systems',
    companyAr: 'الأنظمة الصحية الوطنية',
  },
];

export function Testimonials() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 700, stagger: 140 });
  const ar = language === 'ar';

  return (
    <Section variant="default" id="testimonials" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'آراء العملاء' : 'Client Perspectives'}</p>
            <h2 className={styles.title}>
              {ar ? 'ثقة القادة التنفيذيين' : 'Trusted by Executive Leaders'}
            </h2>
            <p className={styles.description}>
              {ar
                ? 'شراكات استراتيجية مع مؤسسات تعمل على أعلى مستوى من الكفاءة.'
                : 'Strategic partnerships with enterprises operating at the highest level.'}
            </p>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {TESTIMONIALS.map((item, i) => (
              <blockquote key={i} className={styles.card}>
                <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
                <p className={styles.quote}>{ar ? item.quoteAr : item.quote}</p>
                <footer className={styles.author}>
                  <div className={styles.authorLine} aria-hidden="true" />
                  <cite className={styles.authorName}>{ar ? item.nameAr : item.name}</cite>
                  <span className={styles.authorRole}>
                    {ar ? item.roleAr : item.role}, {ar ? item.companyAr : item.company}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
