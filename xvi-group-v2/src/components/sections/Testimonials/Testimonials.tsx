// XVI GROUP — Testimonials Section
// Human personality with oversized gold quotation marks

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Testimonials.module.scss';

const TESTIMONIALS = [
  {
    quote: 'XVI GROUP didn\'t just advise us — they transformed how we think about technology and strategy as an integrated discipline.',
    quoteAr: 'XVI GROUP لم تكن مجرد مستشيرة — بل غيّرت طريقة تفكيرنا في التكنولوجيا والاستراتيجية كتخصص متكامل.',
    author: 'Sarah Al-Mansouri',
    authorAr: 'سارة المنصوري',
    title: 'CTO',
    company: 'Emirates Digital Holdings',
    companyAr: 'مجموعة الإمارات الرقمية',
  },
  {
    quote: 'The sovereign AI architecture they designed gave us complete control over our intelligence infrastructure. No other firm could deliver this.',
    quoteAr: 'هندسة الذكاء الاصطناعي السيادي التي صمموها أعطتنا تحكماً كاملاً في بنية المعلومات الخاصة بنا. لا يمكن لأي مؤسسة أخرى تقديم هذا.',
    author: 'James Mitchell',
    authorAr: 'جيمس ميتشل',
    title: 'CEO',
    company: 'Gulf Financial Technologies',
    companyAr: 'تقنيات المالية الخليجية',
  },
  {
    quote: 'Their executive training program transformed our leadership team\'s approach to digital strategy. The ROI was immediate and measurable.',
    quoteAr: 'برنامج التدريب التنفيذي الذي قدّموه حوّل نهج فريق القيادة لدينا في الاستراتيجية الرقمية. العائد كان فورياً وقابل للقياس.',
    author: 'Dr. Fatima Al-Rashid',
    authorAr: 'د. فاطمة الراشد',
    title: 'Managing Director',
    company: 'Abu Dhabi Health Authority',
    companyAr: 'هيئة الصحة بأبو ظبي',
  },
];

export function Testimonials() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 800, stagger: 200 });

  return (
    <Section variant="default" id="testimonials">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'آراء شركائنا' : 'CLIENT TESTIMONIALS'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Partners Say'}
          </h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {TESTIMONIALS.map((testimonial, i) => (
            <blockquote key={i} className={styles.quote}>
              <span className={styles.quoteMark} aria-hidden="true">"</span>
              <p className={styles.quoteText}>
                {language === 'ar' ? testimonial.quoteAr : testimonial.quote}
              </p>
              <footer className={styles.author}>
                <div className={styles.authorAvatar}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M20 4L36 20L20 36L4 20Z" stroke="#C9A96E" strokeWidth="1" fill="rgba(201,169,110,0.08)" />
                  </svg>
                </div>
                <div>
                  <cite className={styles.authorName}>
                    {language === 'ar' ? testimonial.authorAr : testimonial.author}
                  </cite>
                  <span className={styles.authorRole}>
                    {testimonial.title}
                  </span>
                  <span className={styles.authorCompany}>
                    {language === 'ar' ? testimonial.companyAr : testimonial.company}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  );
}
