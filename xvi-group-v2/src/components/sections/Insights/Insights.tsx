import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { BrokenGrid, BrokenGridItem } from '../../../motion/BrokenGrid';
import { ImageReveal } from '../../../motion/ImageReveal';
import { SectionSeparator } from '../../../motion/SectionSeparator';
import styles from './Insights.module.scss';

const INSIGHTS = [
  {
    category: 'PERSPECTIVE',
    categoryAr: 'رؤية',
    title: 'The Sovereign AI Imperative',
    titleAr: 'ضرورة الذكاء السيادي',
    date: 'Jan 2026',
    excerpt: 'The enterprises that control their own AI infrastructure will define the next decade of competitive advantage.',
    excerptAr: 'المؤسسات التي تتحكم في بنيتها التحتية للذكاء الاصطناعي ستحدد ميزة العقد القادم.',
    span: 2,
    offset: 0,
  },
  {
    category: 'CASE STUDY',
    categoryAr: 'دراسة حالة',
    title: 'Cloud-Native Enterprise Architecture',
    titleAr: 'هندسة سحابية أصلية للمؤسسات',
    date: 'Dec 2025',
    excerpt: 'Cloud migration failures are architectural, not technical. The solution is redesign from the ground up.',
    excerptAr: 'فشل الترحيل السحابي معماري وليس تقني. الحل هو إعادة التصميم من الأساس.',
    span: 1,
    offset: 40,
  },
  {
    category: 'RESEARCH',
    categoryAr: 'بحث',
    title: 'Executive Decision Architecture in the Age of AI',
    titleAr: 'هندسة القرارات التنفيذية في عصر الذكاء الاصطناعي',
    date: 'Nov 2025',
    excerpt: 'How top executives redesign decision-making frameworks to integrate AI insights with strategic sovereignty.',
    excerptAr: 'كيف يعيد كبار التنفيذيين تصميم أطر اتخاذ القرارات لدمج رؤى الذكاء الاصطناعي.',
    span: 1,
    offset: 0,
  },
];

export function Insights() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="insights" className={styles.section}>
      <Container>
        <SectionHeader
          overline={ar ? 'الرؤى' : 'INSIGHTS'}
          title={ar ? 'أحدث الأفكار' : 'Latest Thinking'}
          description={ar
            ? 'رؤى استراتيجية وتحليلات معمّقة من فريقنا الاستشاري.'
            : 'Strategic perspectives and analysis from our advisory team.'
          }
        />
        <BrokenGrid className={styles.grid} columns={3}>
          {INSIGHTS.map((item, i) => (
            <BrokenGridItem key={i} span={item.span} offset={item.offset}>
              <motion.article
                className={`${styles.card} ${i === 0 ? styles.cardHero : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                {i === 0 && (
                  <ImageReveal direction="right" aspectRatio="16/9">
                    <div className={styles.cardImage}>
                      <div className={styles.cardImageGrid}>
                        {Array.from({ length: 24 }).map((_, j) => (
                          <motion.span
                            key={j}
                            className={styles.cardImageCell}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.04 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.015 }}
                          />
                        ))}
                      </div>
                    </div>
                  </ImageReveal>
                )}
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{ar ? item.categoryAr : item.category}</span>
                  <time className={styles.cardDate}>{item.date}</time>
                </div>
                <h3 className={styles.cardTitle}>{ar ? item.titleAr : item.title}</h3>
                <p className={styles.cardExcerpt}>{ar ? item.excerptAr : item.excerpt}</p>
                <motion.span className={styles.cardLink} whileHover={{ gap: 12 }}>
                  {ar ? 'اقرأ المزيد' : 'Read More'}
                  <ArrowUpRight size={14} />
                </motion.span>
              </motion.article>
            </BrokenGridItem>
          ))}
        </BrokenGrid>
      </Container>
      <SectionSeparator variant="line" />
    </Section>
  );
}
