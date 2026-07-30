import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './Insights.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const articles = [
  {
    category: 'PERSPECTIVE',
    categoryAr: 'رؤية',
    title: 'The Sovereign AI Imperative',
    titleAr: 'ضرورة الذكاء السيادي',
    date: 'Jan 2026',
    excerpt: 'The enterprises that control their own AI infrastructure will define the next decade of competitive advantage.',
    excerptAr: 'المؤسسات التي تتحكم في بنيتها التحتية للذكاء الاصطناعي ستحدد ميزة العقد القادم.',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=85',
  },
  {
    category: 'CASE STUDY',
    categoryAr: 'دراسة حالة',
    title: 'Cloud-Native Enterprise Architecture',
    titleAr: 'هندسة سحابية للمؤسسات',
    date: 'Dec 2025',
    excerpt: 'Cloud migration failures are architectural, not technical. The solution is redesign from the ground up.',
    excerptAr: 'فشل الترحيل السحابي معماري وليس تقني. الحل هو إعادة التصميم من الأساس.',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
  },
  {
    category: 'RESEARCH',
    categoryAr: 'بحث',
    title: 'Executive Decision Architecture in the Age of AI',
    titleAr: 'هندسة القرارات التنفيذية في عصر الذكاء',
    date: 'Nov 2025',
    excerpt: 'How top executives redesign decision-making frameworks to integrate AI insights with strategic sovereignty.',
    excerptAr: 'كيف يعيد التنفيذيون تصميم أطر اتخاذ القرارات.',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=85',
  },
];

export function Insights() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const hero = articles[0];
  const side = articles.slice(1);

  return (
    <Section variant="warm" id="insights" className={styles.section}>
      <Container>
        <SectionReveal variant="fadeUp">
          <header className={styles.header}>
            <p className={styles.overline}>{ar ? 'الرؤى' : 'INSIGHTS'}</p>
            <h2 className={styles.title}>{ar ? 'أحدث الأفكار' : 'Latest Thinking'}</h2>
          </header>
        </SectionReveal>

        <div className={styles.layout}>
          <SectionReveal variant="slideLeft" className={styles.heroCol}>
            <article className={styles.heroArticle}>
              <div className={styles.heroImage} style={{ backgroundImage: `url(${hero.image})` }}>
                <div className={styles.heroOverlay} />
                <span className={styles.readBadge}>{hero.readTime}</span>
              </div>
              <div className={styles.heroContent}>
                <div className={styles.articleMeta}>
                  <span className={styles.articleCategory}>{ar ? hero.categoryAr : hero.category}</span>
                  <time>{hero.date}</time>
                </div>
                <h3 className={styles.heroTitle}>{ar ? hero.titleAr : hero.title}</h3>
                <p className={styles.heroExcerpt}>{ar ? hero.excerptAr : hero.excerpt}</p>
                <motion.a href="#" className={styles.articleLink} whileHover={{ gap: 12 }}>
                  {ar ? 'قراءة المقال' : 'Read Article'}
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </article>
          </SectionReveal>

          <aside className={styles.sidebar}>
            {side.map((item, i) => (
              <SectionReveal key={i} variant="slideRight" delay={0.1 + i * 0.1}>
                <article className={styles.sideArticle}>
                  <div className={styles.sideImage} style={{ backgroundImage: `url(${item.image})` }}>
                    <span className={styles.readBadgeSmall}>{item.readTime}</span>
                  </div>
                  <div className={styles.sideContent}>
                    <div className={styles.articleMeta}>
                      <span className={styles.articleCategory}>{ar ? item.categoryAr : item.category}</span>
                      <time>{item.date}</time>
                    </div>
                    <h3 className={styles.sideTitle}>{ar ? item.titleAr : item.title}</h3>
                    <p className={styles.sideExcerpt}>{ar ? item.excerptAr : item.excerpt}</p>
                    <motion.a href="#" className={styles.articleLink} whileHover={{ gap: 12 }}>
                      {ar ? 'قراءة' : 'Read'}
                      <ArrowUpRight size={14} />
                    </motion.a>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </aside>
        </div>
      </Container>
    </Section>
  );
}