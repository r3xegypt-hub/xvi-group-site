import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import styles from './Insights.module.scss';

const INSIGHTS = [
  {
    category: 'PERSPECTIVE',
    categoryAr: 'رؤية',
    title: 'The Sovereign AI Imperative: Why Enterprises Must Own Their Intelligence',
    titleAr: 'ضرورة الذكاء السيادي: لماذا يجب للمؤسسات أن تمتلك ذكاءها',
    date: 'Jan 2026',
    excerpt: 'As AI reshapes every industry, the enterprises that control their own AI infrastructure will define the next decade of competitive advantage.',
    excerptAr: 'مع إعادة تشكيل الذكاء الاصطناعي لكل صناعة، المؤسسات التي تتحكم في بنيتها التحتية ستحدد ميزة العقد القادم.',
    hero: true,
  },
  {
    category: 'CASE STUDY',
    categoryAr: 'دراسة حالة',
    title: 'Beyond Migration: Building Cloud-Native Enterprise Architecture',
    titleAr: 'ما وراء الترحيل: بناء هندسة سحابية أصلية',
    date: 'Dec 2025',
    excerpt: 'Most enterprise cloud migrations fail to deliver promised value. The solution is architectural redesign from the ground up.',
    excerptAr: 'معظم ترحيلات الحوسبة السحابية لا تحقق القيمة الموعودة. الحل هو إعادة التصميم المعماري من الأساس.',
  },
  {
    category: 'RESEARCH',
    categoryAr: 'بحث',
    title: 'Executive Decision Architecture in the Age of AI',
    titleAr: 'هندسة القرارات التنفيذية في عصر الذكاء الاصطناعي',
    date: 'Nov 2025',
    excerpt: 'How top executives redesign decision-making frameworks to integrate AI insights while maintaining strategic sovereignty.',
    excerptAr: 'كيف يعيد كبار التنفيذيين تصميم أطر اتخاذ القرارات لدمج رؤى الذكاء الاصطناعي مع الحفاظ على السيادة الاستراتيجية.',
  },
];

export function Insights() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="slate" id="insights" className={styles.section}>
      <Container>
        <SectionHeader
          overline={ar ? 'الرؤى' : 'INSIGHTS'}
          title={ar ? 'أحدث الأفكار' : 'Latest Thinking'}
          description={ar
            ? 'رؤى استراتيجية وتحليلات معمّقة من فريقنا الاستشاري.'
            : 'Strategic perspectives and deep analysis from our advisory team.'
          }
        />

        <div className={styles.grid}>
          {INSIGHTS.map((item, i) => (
            <article key={i} className={[styles.card, item.hero && styles.cardHero].filter(Boolean).join(' ')}>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>{ar ? item.categoryAr : item.category}</span>
                <time className={styles.cardDate}>{item.date}</time>
              </div>
              <h3 className={styles.cardTitle}>{ar ? item.titleAr : item.title}</h3>
              <p className={styles.cardExcerpt}>{ar ? item.excerptAr : item.excerpt}</p>
              <span className={styles.cardLink}>
                {ar ? 'اقرأ المزيد' : 'Read More'}
                <ArrowUpRight size={14} />
              </span>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
