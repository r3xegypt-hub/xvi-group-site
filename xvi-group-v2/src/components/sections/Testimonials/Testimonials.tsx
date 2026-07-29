import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
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
    quote: 'Their executive program reshaped how our leadership team thinks about AI. We now make decisions with confidence and strategic clarity.',
    quoteAr: 'أعاد برنامجهم التدريبي تشكيل طريقة تفكير فريق القيادة حول الذكاء الاصطناعي. نتخذ قراراتنا الآن بثقة ووضوح استراتيجي.',
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
  const [active, setActive] = useState(0);
  const ar = language === 'ar';

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <Section variant="ink" id="testimonials" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            {ar ? 'ثقة القادة' : 'Trusted by Leaders'}
          </h2>

          <div className={styles.frame}>
            <span className={styles.frameLine} aria-hidden="true" />
            <div className={styles.quoteBlock}>
              <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
              <blockquote className={styles.quote}>
                {ar ? t.quoteAr : t.quote}
              </blockquote>
              <div className={styles.attribution}>
                <span className={styles.attributionName}>{ar ? t.nameAr : t.name}</span>
                <span className={styles.attributionRole}>
                  {ar ? t.roleAr : t.role}, {ar ? t.companyAr : t.company}
                </span>
              </div>
            </div>
            <span className={styles.frameLine} aria-hidden="true" />
          </div>

          <div className={styles.dots}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={[styles.dot, i === active && styles.dotActive].filter(Boolean).join(' ')}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
