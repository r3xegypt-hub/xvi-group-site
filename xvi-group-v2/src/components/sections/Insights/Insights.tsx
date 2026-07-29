// XVI GROUP — Insights Section (Sprint 02)
// Magazine-quality editorial cards

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Insights.module.scss';

const INSIGHTS = [
  {
    category: 'AI Strategy',
    categoryAr: 'استراتيجية الذكاء الاصطناعي',
    title: 'The Sovereign AI Imperative: Why Enterprises Must Own Their Intelligence',
    titleAr: 'ضرورة الذكاء السيادي: لماذا يجب للمؤسسات أن تمتلك ذكاءها',
    excerpt: 'As AI reshapes every industry, the enterprises that control their own AI infrastructure will define the next decade.',
    excerptAr: 'مع إعادة تشكيل الذكاء الاصطناعي لكل صناعة، المؤسسات التي تتحكم في بنية الذكاء الاصطناعي ستحدد العقد التالي.',
    date: 'Jan 2026',
    readTime: '8 min',
    readTimeAr: '8 د',
    gradient: 'linear-gradient(145deg, #0A1628 0%, #1a3050 50%, #0A1628 100%)',
    accent: '#C9A96E',
  },
  {
    category: 'Digital Transformation',
    categoryAr: 'التحول الرقمي',
    title: 'Beyond Migration: Building Cloud-Native Enterprise Architecture',
    titleAr: 'ما وراء الترحيل: بناء هندسة الحوسبة السحابية الأصلية',
    excerpt: 'Most enterprise cloud migrations fail to deliver promised value. The solution is architectural redesign.',
    excerptAr: 'معظم ترحيلات الحوسبة السحابية لا تحقق القيمة الموعودة. الحل هو إعادة التصميم المعماري.',
    date: 'Dec 2025',
    readTime: '12 min',
    readTimeAr: '12 د',
    gradient: 'linear-gradient(145deg, #1a2535 0%, #2a3a50 50%, #0f1a28 100%)',
    accent: '#8BA4C4',
  },
  {
    category: 'Leadership',
    categoryAr: 'القيادة',
    title: 'Executive Decision Architecture in the Age of AI',
    titleAr: 'هندسة القرارات التنفيذية في عصر الذكاء الاصطناعي',
    excerpt: 'How top executives redesign decision-making to integrate AI insights while maintaining strategic sovereignty.',
    excerptAr: 'كيف يعيد كبار التنفيذيين تصميم عمليات اتخاذ القرارات لدمج رؤى الذكاء الاصطناعي.',
    date: 'Nov 2025',
    readTime: '6 min',
    readTimeAr: '6 د',
    gradient: 'linear-gradient(145deg, #152030 0%, #0A1628 60%, #1a2840 100%)',
    accent: '#C9A96E',
  },
];

export function Insights() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 700, stagger: 130 });
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="insights" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'الرؤى' : 'Insights'}</p>
            <h2 className={styles.title}>{ar ? 'أحدث التوجهات والرؤى' : 'Latest Thinking'}</h2>
            <p className={styles.description}>
              {ar
                ? 'رؤى استراتيجية وتحليلات معمّقة من فريق الاستشاريين لدينا.'
                : 'Strategic perspectives and deep analysis from our advisory team.'}
            </p>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {INSIGHTS.map((insight, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.cardImage} style={{ background: insight.gradient }}>
                  <div className={styles.imageOverlay} />
                  <span className={styles.imageCategory} style={{ borderColor: insight.accent }}>
                    {ar ? insight.categoryAr : insight.category}
                  </span>
                  <div className={styles.imagePattern} aria-hidden="true">
                    <svg viewBox="0 0 200 120" fill="none" preserveAspectRatio="xMidYMid slice">
                      <line x1="0" y1="60" x2="200" y2="60" stroke={insight.accent} strokeWidth="0.5" opacity="0.2" />
                      <line x1="100" y1="0" x2="100" y2="120" stroke={insight.accent} strokeWidth="0.5" opacity="0.15" />
                      <circle cx="100" cy="60" r="30" stroke={insight.accent} strokeWidth="0.8" opacity="0.25" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <time className={styles.cardDate}>{insight.date}</time>
                    <span className={styles.readTime}>{ar ? insight.readTimeAr : insight.readTime}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{ar ? insight.titleAr : insight.title}</h3>
                  <p className={styles.cardExcerpt}>{ar ? insight.excerptAr : insight.excerpt}</p>
                  <span className={styles.readMore}>
                    {ar ? 'اقرأ المزيد' : 'Read More'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
