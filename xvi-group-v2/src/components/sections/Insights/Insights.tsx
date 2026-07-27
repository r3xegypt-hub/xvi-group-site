// XVI GROUP — Insights Section
// Editorial personality with article cards and category badges

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal } from '../../../motion/hooks/useScrollReveal';
import styles from './Insights.module.scss';

const INSIGHTS = [
  {
    category: 'AI Strategy',
    categoryAr: 'استراتيجية الذكاء الاصطناعي',
    title: 'The Sovereign AI Imperative: Why Enterprises Must Own Their Intelligence',
    titleAr: 'ضرورة الذكاء السيادي: لماذا يجب للمؤسسات أن تمتلك ذكاءها',
    excerpt: 'As AI reshapes every industry, the enterprises that control their own AI infrastructure will define the next decade of competitive advantage.',
    excerptAr: 'مع إعادة تشكيل الذكاء الاصطناعي لكل صناعة، المؤسسات التي تتحكم في بنية الذكاء الاصطناعي الخاصة بها ستحدد العقد التالي من الميزة التنافسية.',
    date: 'Jan 2026',
    readTime: '8 min read',
    readTimeAr: '8 دقائق قراءة',
  },
  {
    category: 'Digital Transformation',
    categoryAr: 'التحول الرقمي',
    title: 'Beyond Migration: Building Cloud-Native Enterprise Architecture',
    titleAr: 'ما وراء الترحيل: بناء هندسة الحوسبة السحابية الأصلية',
    excerpt: 'Most enterprise cloud migrations fail to deliver promised value. The solution is not migration — it\'s architectural redesign from first principles.',
    excerptAr: 'معظم ترحيلات الحوسبة السحابية للمؤسسات لا تحقق القيمة الموعودة. الحل ليس الترحيل — بل إعادة التصميم المعماري من المبادئ الأولى.',
    date: 'Dec 2025',
    readTime: '12 min read',
    readTimeAr: '12 دقيقة قراءة',
  },
  {
    category: 'Leadership',
    categoryAr: 'القيادة',
    title: 'Executive Decision Architecture in the Age of AI',
    titleAr: 'هندسة القرارات التنفيذية في عصر الذكاء الاصطناعي',
    excerpt: 'How top executives are redesigning their decision-making processes to integrate AI insights while maintaining strategic sovereignty.',
    excerptAr: 'كيف يعيد كبار التنفيذيين تصميم عمليات اتخاذ القرارات لدمج رؤى الذكاء الاصطناعي مع الحفاظ على السيادة الاستراتيجية.',
    date: 'Nov 2025',
    readTime: '6 min read',
    readTimeAr: '6 دقائق قراءة',
  },
];

export function Insights() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollReveal({ direction: 'up', duration: 800, delay: 200 });

  return (
    <Section variant="warm" id="insights">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'الرؤى' : 'INSIGHTS'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar' ? 'أحدث الأفكار والرؤى' : 'Latest Thinking'}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'رؤى استراتيجية وتحليلات عميقة من فريق الاستشاريين لدينا.'
              : 'Strategic perspectives and deep analysis from our advisory team.'}
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {INSIGHTS.map((insight, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>
                  {language === 'ar' ? insight.categoryAr : insight.category}
                </span>
                <span className={styles.cardDate}>{insight.date}</span>
              </div>
              <h3 className={styles.cardTitle}>
                {language === 'ar' ? insight.titleAr : insight.title}
              </h3>
              <p className={styles.cardExcerpt}>
                {language === 'ar' ? insight.excerptAr : insight.excerpt}
              </p>
              <div className={styles.cardFooter}>
                <span className={styles.readTime}>
                  {language === 'ar' ? insight.readTimeAr : insight.readTime}
                </span>
                <span className={styles.readMore}>
                  {language === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
