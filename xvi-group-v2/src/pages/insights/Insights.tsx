import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, FileText, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { ExecutiveCaseStudies } from '../../components/sections/CaseStudies/ExecutiveCaseStudies';
import { ExecutiveDashboard } from '../../components/ui/visuals/ExecutiveDashboard';
import styles from './Insights.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const featuredTopics = [
  { en: 'AI Strategy', ar: 'استراتيجية الذكاء الاصطناعي' },
  { en: 'Automation', ar: 'الأتمتة' },
  { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
  { en: 'Risk Intelligence', ar: 'ذكاء المخاطر' },
  { en: 'Digital Transformation', ar: 'التحول الرقمي' },
  { en: 'Sovereign AI', ar: 'الذكاء السيادي' },
];

const perspectives = [
  {
    icon: Lightbulb,
    title: { en: 'The Decision Layer', ar: 'طبقة القرارات' },
    desc: {
      en: 'Why the most valuable AI implementations start with decisions, not technology. A framework for executives who want clarity before complexity.',
      ar: 'لماذا تبدأ أكثر تطبيقات الذكاء الاصطناعي قيمة بالقرارات وليس التكنولوجيا. إطار عمل للمديرين التنفيذيين الذين يريدون الوضوح قبل التعقيد.',
    },
    tag: { en: 'Framework', ar: 'إطار عمل' },
  },
  {
    icon: TrendingUp,
    title: { en: 'Sovereign AI in Practice', ar: 'الذكاء السيادي في التطبيق' },
    desc: {
      en: 'How enterprises can maintain full ownership and control of their AI infrastructure, data, and models — without vendor lock-in.',
      ar: 'كيف يمكن للمؤسسات الحفاظ على امتلاك وتحكم كامل في بنية ذكائها التحتية وبياناتها ونماذجها — بدون تقييد بالمورد.',
    },
    tag: { en: 'Strategy', ar: 'استراتيجية' },
  },
  {
    icon: BookOpen,
    title: { en: 'Building AI Governance', ar: 'بناء حوكمة الذكاء الاصطناعي' },
    desc: {
      en: 'The essential governance frameworks every enterprise needs before deploying AI at scale. From policy to practice.',
      ar: 'أطر الحوكمة الأساسية التي تحتاجها كل مؤسسة قبل نشر الذكاء الاصطناعي على نطاق واسع. من السياسة إلى التطبيق.',
    },
    tag: { en: 'Governance', ar: 'حوكمة' },
  },
  {
    icon: FileText,
    title: { en: 'Automation ROI', ar: 'عائد الاستثمار في الأتمتة' },
    desc: {
      en: 'Measuring the real impact of intelligent automation. Beyond cost savings — how to track value creation and strategic advantage.',
      ar: 'قياس التأثير الحقيقي للأتمتة الذكية. التكاليف وراء — كيفية تتبع خلق القيمة والميزة الاستراتيجية.',
    },
    tag: { en: 'Measurement', ar: 'قياس' },
  },
];

const resourceCategories = [
  { icon: BookOpen, count: 4, title: { en: 'White Papers', ar: 'أوراق بحثية' } },
  { icon: FileText, count: 6, title: { en: 'Case Studies', ar: 'دراسات حالة' } },
  { icon: Lightbulb, count: 3, title: { en: 'Frameworks', ar: 'أطر عمل' } },
  { icon: TrendingUp, count: 5, title: { en: 'Industry Reports', ar: 'تقارير قطاعية' } },
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
            {ar ? 'أفكار تشكل المستقبل' : 'Ideas that shape the future.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'رؤى واستشارات حول الذكاء الاصطناعي والتحول الرقمي. أطر عمل وتحليلات للمديرين التنفيذيين.'
              : 'Perspectives and advisory on AI and enterprise transformation. Frameworks and analysis for executives.'}
          </motion.p>
        </div>

        <div className={styles.heroVisual}>
          <ExecutiveDashboard />
        </div>
      </section>

      {/* FEATURED TOPICS */}
      <section className={styles.topicsSection}>
        <div className={styles.topicsInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'المواضيع' : 'TOPICS'}
          </motion.span>
          <div className={styles.topicsGrid}>
            {featuredTopics.map((topic, i) => (
              <motion.span
                key={i}
                className={styles.topicTag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {ar ? topic.ar : topic.en}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* PERSPECTIVES */}
      <section className={styles.perspectivesSection}>
        <div className={styles.perspectivesInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'الرؤى' : 'PERSPECTIVES'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'تحليلات واستشارات' : 'Analysis and advisory'}
          </motion.h2>
          <div className={styles.perspectivesGrid}>
            {perspectives.map((item, i) => (
              <motion.div
                key={i}
                className={styles.perspectiveCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <div className={styles.perspectiveHeader}>
                  <div className={styles.perspectiveIconWrap}>
                    <item.icon size={20} strokeWidth={1.5} className={styles.perspectiveIcon} />
                  </div>
                  <span className={styles.perspectiveTag}>{ar ? item.tag.ar : item.tag.en}</span>
                </div>
                <h3 className={styles.perspectiveTitle}>{ar ? item.title.ar : item.title.en}</h3>
                <p className={styles.perspectiveDesc}>{ar ? item.desc.ar : item.desc.en}</p>
                <Link to="/contact" className={styles.perspectiveLink}>
                  <span>{ar ? 'اقرأ المزيد' : 'Read more'}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className={styles.resourcesSection}>
        <div className={styles.resourcesInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'الموارد' : 'RESOURCES'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'أدوات ومعرفة' : 'Tools and knowledge'}
          </motion.h2>
          <div className={styles.resourcesGrid}>
            {resourceCategories.map((cat, i) => (
              <motion.div
                key={i}
                className={styles.resourceCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <div className={styles.resourceIconWrap}>
                  <cat.icon size={24} strokeWidth={1.5} className={styles.resourceIcon} />
                </div>
                <div className={styles.resourceInfo}>
                  <span className={styles.resourceCount}>{cat.count}</span>
                  <h3 className={styles.resourceTitle}>{ar ? cat.title.ar : cat.title.en}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE CASE STUDIES */}
      <ExecutiveCaseStudies />
    </>
  );
}
