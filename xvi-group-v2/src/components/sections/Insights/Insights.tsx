import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { PremiumCard } from '../../ui/PremiumCard';
import styles from './Insights.module.scss';

const articles = [
  {
    category: 'PERSPECTIVE',
    categoryAr: 'رؤية',
    title: 'The Sovereign AI Imperative',
    titleAr: 'ضرورة الذكاء السيادي',
    date: 'Jan 2026',
    excerpt: 'The enterprises that control their own AI infrastructure will define the next decade of competitive advantage. A deep dive into building sovereign intelligence capability.',
    excerptAr: 'المؤسسات التي تتحكم في بنيتها التحتية للذكاء الاصطناعي ستحدد ميزة العقد القادم.',
    hero: true,
    readTime: '12 min',
  },
  {
    category: 'CASE STUDY',
    categoryAr: 'دراسة حالة',
    title: 'Cloud-Native Enterprise Architecture',
    titleAr: 'هندسة سحابية أصلية للمؤسسات',
    date: 'Dec 2025',
    excerpt: 'Cloud migration failures are architectural, not technical. The solution is redesign from the ground up.',
    excerptAr: 'فشل الترحيل السحابي معماري وليس تقني.',
    readTime: '8 min',
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
  },
];

export function Insights() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="insights" className={styles.section}>
      <Container>
        <SectionReveal variant="depthIn">
          <SectionHeader
            overline={ar ? 'الرؤى' : 'INSIGHTS'}
            title={ar ? 'أحدث الأفكار' : 'Latest Thinking'}
            description={ar ? 'رؤى استراتيجية وتحليلات معمّقة من فريقنا الاستشاري.' : 'Strategic perspectives from our advisory team.'}
          />
        </SectionReveal>
        <div className={styles.layout}>
          <SectionReveal variant="slideLeft">
            <PremiumCard glassIntensity="light" hoverScale={false}>
              <article className={styles.heroArticle}>
                <div className={styles.heroVisual}>
                  <div className={styles.heroGrid}>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className={styles.heroCell}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.05 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.01 }}
                      />
                    ))}
                  </div>
                  <div className={styles.heroBadge}>
                    <span className={styles.badgeDot} />
                    {articles[0].readTime}
                  </div>
                </div>
                <div className={styles.heroContent}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleCategory}>{ar ? articles[0].categoryAr : articles[0].category}</span>
                    <time>{articles[0].date}</time>
                  </div>
                  <h3 className={styles.articleTitle}>{ar ? articles[0].titleAr : articles[0].title}</h3>
                  <p className={styles.articleExcerpt}>{ar ? articles[0].excerptAr : articles[0].excerpt}</p>
                  <motion.span className={styles.articleLink} whileHover={{ gap: 12 }}>
                    {ar ? 'قراءة المقال' : 'Read Article'}
                    <ArrowUpRight size={14} />
                  </motion.span>
                </div>
              </article>
            </PremiumCard>
          </SectionReveal>

          <div className={styles.sidebar}>
            {articles.slice(1).map((item, i) => (
              <SectionReveal key={i} variant="slideRight" delay={0.1 + i * 0.1}>
                <PremiumCard glassIntensity="medium" hoverScale={false}>
                  <article className={styles.sidebarArticle}>
                    <div className={styles.sidebarVisual}>
                      <div className={styles.sidebarGrid}>
                        {Array.from({ length: 9 }).map((_, j) => (
                          <motion.span
                            key={j}
                            className={styles.sidebarCell}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.04 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.02 }}
                          />
                        ))}
                      </div>
                      <span className={styles.sidebarBadge}>{item.readTime}</span>
                    </div>
                    <div className={styles.articleMeta}>
                      <span className={styles.articleCategory}>{ar ? item.categoryAr : item.category}</span>
                      <time>{item.date}</time>
                    </div>
                    <h3 className={styles.articleTitle}>{ar ? item.titleAr : item.title}</h3>
                    <p className={styles.articleExcerpt}>{ar ? item.excerptAr : item.excerpt}</p>
                    <motion.span className={styles.articleLink} whileHover={{ gap: 12 }}>
                      {ar ? 'قراءة' : 'Read'}
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </article>
                </PremiumCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
