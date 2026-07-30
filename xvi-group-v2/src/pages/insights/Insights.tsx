import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './Insights.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const featured = {
  tag: { en: 'Featured', ar: 'مميّز' },
  title: { en: 'The Decision Layer: Why AI Strategy Starts Before Technology', ar: 'طبقة القرارات: لماذا تبدأ استراتيجية الذكاء الاصطناعي قبل التكنولوجيا' },
  excerpt: {
    en: 'Most AI implementations fail not because of technology, but because organizations skip the decision architecture phase. We explore why framing the right questions matters more than finding the right algorithms.',
    ar: 'فشل معظم تطبيقات الذكاء الاصطناعي ليس بسبب التكنولوجيا، بل لأن المؤسسات تتجاوز مرحلة هندسة القرارات. نستكشف لماذا صياغة الأسئلة الصحيحة أهم من إيجاد الخوارزميات الصحيحة.',
  },
  date: 'Jul 2026',
  readTime: { en: '8 min read', ar: '8 دقائق قراءة' },
};

const articles = [
  {
    title: { en: 'Automation Beyond Efficiency: The Orchestrated Enterprise', ar: 'الأتمتةeyond الكفاءة: المؤسسة المنظمة' },
    excerpt: {
      en: 'Why the next wave of automation isn\'t about replacing humans — it\'s about orchestrating human-machine collaboration at scale.',
      ar: 'لماذا الموجة القادمة من الأتمتة ليست عن استبدال البشر — بل عن تنسيق التعاون بين الإنسان والآلة على نطاق واسع.',
    },
    tag: { en: 'Automation', ar: 'الأتمتة' },
    date: 'Jul 2026',
  },
  {
    title: { en: 'Executive AI Adoption: From Skepticism to Championship', ar: 'تبني الذكاء الاصطناعي التنفيذي: من الشك إلى الحماس' },
    excerpt: {
      en: 'The governance frameworks and change management strategies that turn executive resistance into enthusiastic advocacy.',
      ar: 'أطر الحوكمة واستراتيجيات إدارة التغيير التي تحول مقاومة القيادة إلى دعم حماسي.',
    },
    tag: { en: 'Adoption', ar: 'التبني' },
    date: 'Jun 2026',
  },
  {
    title: { en: 'Risk Intelligence in Financial Services: A New Paradigm', ar: 'ذكاء المخاطر في الخدمات المالية: نموذج جديد' },
    excerpt: {
      en: 'How leading banks are using AI not just to manage risk, but to see opportunities that traditional models miss.',
      ar: 'كيف تستخدم البنوك الرائدة الذكاء الاصطناعي ليس فقط لإدارة المخاطر، بل لرؤية الفرص التي يفوتتها النماذج التقليدية.',
    },
    tag: { en: 'Financial Services', ar: 'الخدمات المالية' },
    date: 'Jun 2026',
  },
  {
    title: { en: 'The Connected Intelligence Framework', ar: 'إطار الذكاء المتصل' },
    excerpt: {
      en: 'Moving from isolated AI use cases to a connected system that creates compounding value across the organization.',
      ar: 'الانتقال من حالات استخدام الذكاء الاصطناعي المعزولة إلى نظام متصل ي创造 قيمة متراكمة عبر المؤسسة.',
    },
    tag: { en: 'Strategy', ar: 'الاستراتيجية' },
    date: 'May 2026',
  },
  {
    title: { en: 'Public Sector Modernization: Intelligence at Scale', ar: 'تحديث القطاع العام: ذكاء على نطاق واسع' },
    excerpt: {
      en: 'Designing citizen-centric AI systems that respect privacy while delivering dramatically better public services.',
      ar: 'تصميم أنظمة ذكاء اصطناعي تركز على المواطن مع احترام الخصوصية وتقديم خدمات عامة أفضل بشكل كبير.',
    },
    tag: { en: 'Public Sector', ar: 'القطاع العام' },
    date: 'May 2026',
  },
];

export function InsightsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent} ref={ref}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'الرؤى' : 'INSIGHTS'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'أفكار تshape المستقبل' : 'Ideas that shape the future.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'تحليلات معمّقة ورؤى استراتيجية من فريقنا الاستشاري حول الذكاء الاصطناعي والتحول الرقمي.'
              : 'Deep analysis and strategic perspectives from our advisory team on AI, automation, and enterprise transformation.'}
          </motion.p>
        </div>
      </section>

      {/* FEATURED */}
      <section className={styles.featuredSection}>
        <div className={styles.featuredInner}>
          <motion.div
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className={styles.featuredMeta}>
              <span className={styles.featuredTag}>{ar ? featured.tag.ar : featured.tag.en}</span>
              <span className={styles.featuredDate}>{featured.date}</span>
            </div>
            <h2 className={styles.featuredTitle}>{ar ? featured.title.ar : featured.title.en}</h2>
            <p className={styles.featuredExcerpt}>{ar ? featured.excerpt.ar : featured.excerpt.en}</p>
            <div className={styles.featuredFooter}>
              <span className={styles.readTime}>
                <Clock size={14} />
                {ar ? featured.readTime.ar : featured.readTime.en}
              </span>
              <span className={styles.readMore}>
                {ar ? 'اقرأ المقال' : 'Read article'}
                <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className={styles.articlesSection}>
        <div className={styles.articlesInner}>
          <div className={styles.articlesGrid}>
            {articles.map((article, i) => (
              <motion.article
                key={i}
                className={styles.articleCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <div className={styles.articleMeta}>
                  <span className={styles.articleTag}>
                    <Tag size={12} />
                    {ar ? article.tag.ar : article.tag.en}
                  </span>
                  <span className={styles.articleDate}>{article.date}</span>
                </div>
                <h3 className={styles.articleTitle}>{ar ? article.title.ar : article.title.en}</h3>
                <p className={styles.articleExcerpt}>{ar ? article.excerpt.ar : article.excerpt.en}</p>
                <span className={styles.articleLink}>
                  {ar ? 'اقرأ المزيد' : 'Read more'}
                  <ArrowUpRight size={12} />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterInner}>
          <motion.h2
            className={styles.newsletterHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'ابقَ على اطلاع' : 'Stay informed'}
          </motion.h2>
          <motion.p
            className={styles.newsletterSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar
              ? 'رسائل شهرية عن آخر التطورات في الذكاء الاصطناعي والتحول الرقمي.'
              : 'Monthly briefings on the latest developments in AI and enterprise transformation.'}
          </motion.p>
          <motion.div
            className={styles.newsletterForm}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <input type="email" placeholder={ar ? 'بريدك الإلكتروني' : 'your@email.com'} className={styles.newsletterInput} />
            <button className={styles.newsletterBtn}>{ar ? 'اشترك' : 'Subscribe'}</button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
