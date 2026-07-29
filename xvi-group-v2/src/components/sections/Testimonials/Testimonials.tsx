import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './Testimonials.module.scss';

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
    <Section variant="white" id="testimonials">
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            {ar ? 'ثقة القادة' : 'Trusted by Leaders'}
          </h2>
          <div className={styles.quoteBlock}>
            <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
            <blockquote className={styles.quote}>
              {ar ? t.quoteAr : t.quote}
            </blockquote>
            <div className={styles.attribution}>
              <span className={styles.attributionName}>{ar ? t.nameAr : t.name}</span>
              <span className={styles.attributionTitle}>{ar ? t.titleAr : t.title}</span>
            </div>
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
