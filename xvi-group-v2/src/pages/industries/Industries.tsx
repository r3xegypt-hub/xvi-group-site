import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Building2, Landmark, Factory, Globe, Heart, GraduationCap, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './Industries.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const industries = [
  {
    id: 'financial',
    icon: Landmark,
    title: { en: 'Financial Services', ar: 'الخدمات المالية' },
    desc: {
      en: 'Risk intelligence, regulatory compliance, and customer experience transformation for banks, insurers, and fintech operators across the MENA region.',
      ar: 'ذكاء المخاطر والامتثال التنظيمي وتحويل تجربة العملاء للبنوك والشركات التقنية المالية في المنطقة.',
    },
    challenges: [
      { en: 'Complex regulatory environments across multiple jurisdictions', ar: 'بيئات تنظيمية معقدة عبر عدة ولايات قضائية' },
      { en: 'Legacy systems blocking innovation and agility', ar: 'أنظمة تقليدية تعيق الابتكار والمرونة' },
      { en: 'Growing customer expectations for digital-first experiences', ar: 'توقعات متزايدة للتجارب الرقمية من العملاء' },
    ],
    capabilities: [
      { en: 'Risk Intelligence & Modeling', ar: 'ذكاء ونمذجة المخاطر' },
      { en: 'Regulatory Compliance Automation', ar: 'أتمتة الامتثال التنظيمي' },
      { en: 'Customer Experience Transformation', ar: 'تحويل تجربة العملاء' },
      { en: 'Fraud Detection & Prevention', ar: 'كشف ومنع الاحتيال' },
    ],
  },
  {
    id: 'public',
    icon: Building2,
    title: { en: 'Public Sector', ar: 'القطاع العام' },
    desc: {
      en: 'Citizen services modernization, operational efficiency, and data-driven governance for government entities and public institutions.',
      ar: 'تحديث الخدمات المدنية والكفاءة التشغيلية والحوكمة المبنية على البيانات للكيانات الحكومية.',
    },
    challenges: [
      { en: 'Balancing transparency with data security and privacy', ar: 'التوازن بين الشفافية وأمان البيانات والخصوصية' },
      { en: 'Modernizing citizen services at scale', ar: 'تحديث الخدمات المدنية على نطاق واسع' },
      { en: 'Building trust through evidence-based governance', ar: 'بناء الثقة عبر الحوكمة المبنية على الأدلة' },
    ],
    capabilities: [
      { en: 'Citizen Services Modernization', ar: 'تحديث الخدمات المدنية' },
      { en: 'Operational Efficiency', ar: 'الكفاءة التشغيلية' },
      { en: 'Data-Driven Governance', ar: 'الحوكمة المبنية على البيانات' },
      { en: 'Public Safety Intelligence', ar: 'ذكاء السلامة العامة' },
    ],
  },
  {
    id: 'enterprise',
    icon: Factory,
    title: { en: 'Complex Enterprise', ar: 'المؤسسات المعقدة' },
    desc: {
      en: 'Connected intelligence across people, processes, and platforms for large-scale organizations navigating digital transformation.',
      ar: 'ذكاء متصل عبر الأشخاص والعمليات والمنصات للمؤسسات الكبيرة التي تمر بتحول رقمي.',
    },
    challenges: [
      { en: 'Data silos preventing enterprise-wide intelligence', ar: 'عزل البيانات يمنع الذكاء على مستوى المؤسسة' },
      { en: 'Coordination complexity across business units', ar: 'تعقيد التنسيق عبر الوحدات التجارية' },
      { en: 'Measuring ROI on digital transformation investments', ar: 'قياس العائد على استثمارات التحول الرقمي' },
    ],
    capabilities: [
      { en: 'Connected Intelligence', ar: 'ذكاء متصل' },
      { en: 'Process Optimization', ar: 'تحسين العمليات' },
      { en: 'Platform Integration', ar: 'تكامل المنصات' },
      { en: 'Enterprise Data Strategy', ar: 'استراتيجية بيانات المؤسسة' },
    ],
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: { en: 'Healthcare & Life Sciences', ar: 'الصحة وعلوم الحياة' },
    desc: {
      en: 'Clinical intelligence, patient journey optimization, and regulatory AI for healthcare providers and pharmaceutical companies.',
      ar: 'الذكاء السريري وتحسين رحلة المريض والذكاء التنظيمي لمقدمي الخدمات الصحية وشركات الأدوية.',
    },
    challenges: [
      { en: 'Balancing innovation with patient safety and compliance', ar: 'التوازن بين الابتكار وسلامة المريض والامتثال' },
      { en: 'Integrating AI into clinical workflows responsibly', ar: 'دمج الذكاء الاصطناعي في التدفقات السريرية بمسؤولية' },
      { en: 'Managing sensitive health data at scale', ar: 'إدارة بيانات الصحة الحساسة على نطاق واسع' },
    ],
    capabilities: [
      { en: 'Clinical Intelligence', ar: 'الذكاء السريري' },
      { en: 'Patient Journey Optimization', ar: 'تحسين رحلة المريض' },
      { en: 'Regulatory AI', ar: 'الذكاء التنظيمي' },
      { en: 'Healthcare Operations', ar: 'عمليات الرعاية الصحية' },
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: { en: 'Education & Research', ar: 'التعليم والبحث' },
    desc: {
      en: 'Personalized learning, institutional intelligence, and research acceleration for universities, schools, and research organizations.',
      ar: 'التعلم الشخصي والذكاء المؤسسي وتسريع البحث للجامعات ومراكز البحث.',
    },
    challenges: [
      { en: 'Scaling personalized learning across diverse student populations', ar: 'توسيع التعلم الشخصي عبر مجتمعات طلابية متنوعة' },
      { en: 'Bridging the gap between research and practical application', ar: 'سد الفجوة بين البحث والتطبيق العملي' },
      { en: 'Managing institutional data for strategic decision-making', ar: 'إدارة البيانات المؤسسية لاتخاذ القرارات الاستراتيجية' },
    ],
    capabilities: [
      { en: 'Personalized Learning Systems', ar: 'أنظمة التعلم الشخصي' },
      { en: 'Research Intelligence', ar: 'ذكاء البحث' },
      { en: 'Institutional Analytics', ar: 'التحليلات المؤسسية' },
      { en: 'Academic Operations', ar: 'العمليات الأكاديمية' },
    ],
  },
  {
    id: 'technology',
    icon: Zap,
    title: { en: 'Technology & Telecom', ar: 'التكنولوجيا والاتصالات' },
    desc: {
      en: 'Network intelligence, platform optimization, and AI-native product development for technology companies and telecom operators.',
      ar: 'ذكاء الشبكات وتحسين المنصات وتطوير المنتجات الأصلية بالذكاء الاصطناعي لشركات التكنولوجيا والاتصالات.',
    },
    challenges: [
      { en: 'Managing network complexity at global scale', ar: 'إدارة تعقيد الشبكات على نطاق عالمي' },
      { en: 'Building AI-native products that scale', ar: 'بناء منتجات أصلية بالذكاء الاصطناعي قابلة للتوسع' },
      { en: 'Balancing speed-to-market with platform reliability', ar: 'التوازن بين السرعة إلى السوق وموثوقية المنصة' },
    ],
    capabilities: [
      { en: 'Network Intelligence', ar: 'ذكاء الشبكات' },
      { en: 'Platform Optimization', ar: 'تحسين المنصات' },
      { en: 'AI Product Development', ar: 'تطوير المنتجات بالذكاء الاصطناعي' },
      { en: 'Infrastructure Intelligence', ar: 'ذكاء البنية التحتية' },
    ],
  },
];

export function IndustriesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>
        <div className={styles.heroContent} ref={ref}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'القطاعات' : 'INDUSTRIES'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'كل قطاع له ذكاؤه الخاص' : 'Every sector has its own intelligence.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'نفهم التعقيدات الفريدة لكل قطاع ونصمم حلولاً ذكية مخصصة تحقق نتائج حقيقية.'
              : 'We understand the unique complexities of each sector and design bespoke intelligent solutions that deliver real results.'}
          </motion.p>
        </div>
      </section>

      {/* INDUSTRY CARDS — INTERACTIVE */}
      <section className={styles.industriesSection}>
        <div className={styles.industriesInner}>
          <div className={styles.industryNav}>
            {industries.map((ind, i) => (
              <motion.button
                key={ind.id}
                className={`${styles.industryTab} ${active === i ? styles.activeTab : ''}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
              >
                <ind.icon size={20} strokeWidth={1.5} />
                <span>{ar ? ind.title.ar : ind.title.en}</span>
                <ChevronRight size={16} className={styles.tabArrow} />
              </motion.button>
            ))}
          </div>

          <div className={styles.industryContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={styles.industryDetail}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className={styles.detailHeader}>
                  <span className={styles.detailNum}>0{active + 1}</span>
                  <h2 className={styles.detailTitle}>
                    {ar ? industries[active].title.ar : industries[active].title.en}
                  </h2>
                </div>
                <p className={styles.detailDesc}>
                  {ar ? industries[active].desc.ar : industries[active].desc.en}
                </p>

                <div className={styles.challengesSection}>
                  <span className={styles.challengesLabel}>{ar ? 'التحديات الرئيسية' : 'Key Challenges'}</span>
                  <div className={styles.challengesList}>
                    {industries[active].challenges.map((challenge, i) => (
                      <motion.div
                        key={i}
                        className={styles.challengeItem}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                      >
                        <span className={styles.challengeDot} />
                        <span>{ar ? challenge.ar : challenge.en}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className={styles.capabilitiesGrid}>
                  <span className={styles.capLabel}>{ar ? 'القدرات' : 'Capabilities'}</span>
                  <div className={styles.capGrid}>
                    {industries[active].capabilities.map((cap, i) => (
                      <motion.div
                        key={i}
                        className={styles.capabilityCard}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                      >
                        <span className={styles.capabilityText}>{ar ? cap.ar : cap.en}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <a href="/contact" className={styles.detailCta}>
                  {ar ? 'ابدأ المحادثة' : 'Start a conversation'}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <motion.h2
            className={styles.ctaHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'sectors of expertise' : 'Sectors of expertise'}
          </motion.h2>
          <motion.p
            className={styles.ctaSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar
              ? 'القطاعات التي نعمل بها — الخدمات المالية، القطاع العام، المؤسسات المعقدة، الصحة، التعليم، والتكنولوجيا.'
              : 'Financial Services — Public Sector — Complex Enterprise — Healthcare — Education — Technology & Telecom'}
          </motion.p>
        </div>
      </section>
    </>
  );
}
