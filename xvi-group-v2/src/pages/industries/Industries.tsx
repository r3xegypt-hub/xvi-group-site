import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Building2, Landmark, Factory, Globe, ChevronRight } from 'lucide-react';
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
    metrics: [
      { label: { en: 'Risk Reduction', ar: 'تقليل المخاطر' }, value: '40%' },
      { label: { en: 'Process Speed', ar: 'سرعة العمليات' }, value: '3x' },
      { label: { en: 'Compliance Score', ar: 'تصنيف الامتثال' }, value: '98%' },
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
    metrics: [
      { label: { en: 'Service Efficiency', ar: 'كفاءة الخدمة' }, value: '60%' },
      { label: { en: 'Cost Savings', ar: 'توفير التكاليف' }, value: '35%' },
      { label: { en: 'Citizen Satisfaction', ar: 'رضا المواطن' }, value: '92%' },
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
    metrics: [
      { label: { en: 'Decision Speed', ar: 'سرعة القرار' }, value: '5x' },
      { label: { en: 'Operational Cost', ar: 'التكلفة التشغيلية' }, value: '-28%' },
      { label: { en: 'Innovation Rate', ar: 'معدل الابتكار' }, value: '2.5x' },
    ],
  },
  {
    id: 'healthcare',
    icon: Globe,
    title: { en: 'Healthcare & Life Sciences', ar: 'الصحة وعلوم الحياة' },
    desc: {
      en: 'Clinical intelligence, patient journey optimization, and regulatory AI for healthcare providers and pharmaceutical companies.',
      ar: 'الذكاء السريري وتحسين رحلة المريض والذكاء التنظيمي لمقدمي الخدمات الصحية وشركات الأدوية.',
    },
    metrics: [
      { label: { en: 'Diagnostic Accuracy', ar: 'دقة التشخيص' }, value: '95%' },
      { label: { en: 'Patient Throughput', ar: 'تسعير المرضى' }, value: '+45%' },
      { label: { en: 'Compliance', ar: 'الامتثال' }, value: '100%' },
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
                <div className={styles.metricsGrid}>
                  {industries[active].metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      className={styles.metricCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{ar ? m.label.ar : m.label.en}</span>
                    </motion.div>
                  ))}
                </div>
                <a href="/contact" className={styles.detailCta}>
                  {ar ? 'ابدأ المحادثة' : 'Start a conversation'}
                  <ArrowUpRight size={14} />
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
              ? 'القطاعات التي نعمل بها —金融服务、القطاع العام、المؤسسات المعقدة، والصحة.'
              : 'Financial Services — Public Sector — Complex Enterprise — Healthcare & Life Sciences'}
          </motion.p>
        </div>
      </section>
    </>
  );
}
