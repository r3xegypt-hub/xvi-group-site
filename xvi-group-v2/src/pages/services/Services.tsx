import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Brain, Workflow, Shield, BarChart3, Lightbulb, Target } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    id: 'strategic-ai',
    icon: Brain,
    num: '01',
    title: { en: 'Strategic AI', ar: 'الذكاء الاستراتيجي' },
    subtitle: { en: 'Frame the decision before the tool', ar: 'صياغة القرار قبل الأداة' },
    desc: {
      en: 'We start where most consultants stop — at the decision layer. Before selecting models or platforms, we map the highest-value choices your organization faces and design an intelligence strategy that makes those choices clearer, faster, and more confident.',
      ar: 'نبدأ حيث يتوقف معظم الاستشاريين — عند طبقة القرارات. قبل اختيار المنصات والنماذج، نرسم خريطة أعلى القرارات قيمة التي تواجه مؤسستك ونصمم استراتيجية ذكاء تجعل هذه القرارات أوضح وأسرع وأكثر ثقة.',
    },
    capabilities: [
      { en: 'Decision Architecture Mapping', ar: 'خريطة هندسة القرارات' },
      { en: 'AI Opportunity Assessment', ar: 'تقييم فرص الذكاء الاصطناعي' },
      { en: 'Intelligence Roadmap Design', ar: 'تصميم خارطة طريق الذكاء' },
      { en: 'Executive Alignment Workshops', ar: 'ورش عمل توافق تنفيذي' },
    ],
    bg: '#f4f4f2',
  },
  {
    id: 'automation-architecture',
    icon: Workflow,
    num: '02',
    title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' },
    subtitle: { en: 'Free expert attention for consequential work', ar: 'تحرير انتباه الخبراء للعمل المهم' },
    desc: {
      en: 'We design operational flows that eliminate friction and liberate your most valuable people from repetitive complexity. Our architectures don\'t just automate — they orchestrate, creating systems that learn, adapt, and improve with every cycle.',
      ar: 'نصمم تدفقات تشغيل تزيل الاحتكاك وتحرر أثمن أفرادك من التعقيد المتكرر. هندساتنا لا تؤتمت فقط — بل تنسيق، بإنشاء أنظمة تتعلم وتتكيف وتحسن مع كل دورة.',
    },
    capabilities: [
      { en: 'Process Intelligence Audit', ar: 'تدقيق ذكاء العمليات' },
      { en: 'Workflow Orchestration Design', ar: 'تصميم تنسيق تدفقات العمل' },
      { en: 'Intelligent Document Processing', ar: 'معالجة المستندات الذكية' },
      { en: 'Decision Automation Flows', ar: 'تدفقات أتمتة القرارات' },
    ],
    bg: '#132238',
    dark: true,
  },
  {
    id: 'executive-adoption',
    icon: Shield,
    num: '03',
    title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' },
    subtitle: { en: 'Clarity, confidence, and governance at every step', ar: 'الوضوح والثقة والحوكمة في كل خطوة' },
    desc: {
      en: 'Technology adoption fails when leadership doesn\'t trust it. We build the governance frameworks, training programs, and change management systems that turn executive skepticism into enthusiastic championship — ensuring every transformation sticks.',
      ar: 'يفشل تبني التكنولوجيا عندما لا يثق بها القيادة. نبني أطر الحوكمة وبرامج التدريب وأنظمة إدارة التغيير التي تحول الشك التنفيذي إلى حماس حقيقي — مما يضمن نجاح كل تحول.',
    },
    capabilities: [
      { en: 'Governance Framework Design', ar: 'تصميم إطار الحوكمة' },
      { en: 'Executive Training Programs', ar: 'برامج التدريب التنفيذي' },
      { en: 'Change Management Strategy', ar: 'استراتيجية إدارة التغيير' },
      { en: 'Adoption Metrics & Reporting', ar: 'مقاييس وتقارير التبني' },
    ],
    bg: '#ffffff',
    bordered: true,
  },
];

const processSteps = [
  { num: '01', title: { en: 'Discover', ar: 'اكتشف' }, desc: { en: 'Map decisions, not just processes', ar: 'رسّم القرارات، لا العمليات فقط' } },
  { num: '02', title: { en: 'Architect', ar: 'صمّم' }, desc: { en: 'Design the intelligence layer', ar: 'صمّم طبقة الذكاء' } },
  { num: '03', title: { en: 'Build', ar: 'ابنِ' }, desc: { en: 'Implement with precision', ar: 'نفّذ بدقة' } },
  { num: '04', title: { en: 'Evolve', ar: 'طوّر' }, desc: { en: 'Learn, adapt, improve', ar: 'تعلّم، تكيّف، حسّن' } },
];

export function ServicesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.gridLine} style={{ left: `${(i + 1) * 16.66}%` }} />
          ))}
        </div>
        <motion.div className={styles.heroContent} ref={heroRef} style={{ opacity: heroOpacity }}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'الحلول' : 'SOLUTIONS'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'نحوّل التعقيد إلى قرار واحد واضح' : 'We transform complexity into one clear decision.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'ثلاث حلول متكاملة. نهج واحد متماسك. نبدأ من القرار ونصل إلى النتيجة.'
              : 'Three integrated solutions. One coherent approach. From decision to outcome.'}
          </motion.p>
        </motion.div>
      </section>

      {/* SERVICES — FULL BLEED EDITORIAL */}
      {services.map((svc, idx) => (
        <section
          key={svc.id}
          className={`${styles.serviceSection} ${svc.dark ? styles.dark : ''} ${svc.bordered ? styles.bordered : ''}`}
          style={{ background: svc.dark ? svc.bg : svc.bordered ? '#fff' : svc.bg }}
        >
          <div className={styles.serviceInner}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceNum}>{svc.num}</span>
              <svc.icon size={32} strokeWidth={1.2} className={styles.serviceIcon} />
            </div>
            <div className={styles.serviceBody}>
              <h2 className={styles.serviceTitle}>{ar ? svc.title.ar : svc.title.en}</h2>
              <p className={styles.serviceSubtitle}>{ar ? svc.subtitle.ar : svc.subtitle.en}</p>
              <p className={styles.serviceDesc}>{ar ? svc.desc.ar : svc.desc.en}</p>
              <div className={styles.capabilities}>
                {(ar ? svc.capabilities.map(c => c.ar) : svc.capabilities.map(c => c.en)).map((cap, i) => (
                  <motion.div
                    key={i}
                    className={styles.capItem}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                  >
                    <span className={styles.capDot} />
                    <span>{cap}</span>
                  </motion.div>
                ))}
              </div>
              <a href="/contact" className={styles.serviceCta}>
                {ar ? 'اعرف المزيد' : 'Learn more'}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'المنهجية' : 'METHODOLOGY'}
          </motion.span>
          <motion.h2
            className={styles.processHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'أربع مراحل نحو التحول' : 'Four phases to transformation'}
          </motion.h2>
          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.processCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <span className={styles.processNum}>{step.num}</span>
                <h3 className={styles.processTitle}>{ar ? step.title.ar : step.title.en}</h3>
                <p className={styles.processDesc}>{ar ? step.desc.ar : step.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <motion.h2
            className={styles.ctaHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'جاهز لبدء التحول؟' : 'Ready to begin the transformation?'}
          </motion.h2>
          <motion.a
            href="/contact"
            className={styles.ctaBtn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar ? 'احجز استشارة' : 'Book a Consultation'}
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </section>
    </>
  );
}
