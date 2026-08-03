import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Workflow, Shield, BarChart3, Lightbulb, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { useCTA } from '../../hooks/useCTA';
import { DecisionArchitecture } from '../../components/ui/visuals/DecisionArchitecture';
import { EnterpriseOrchestration } from '../../components/ui/visuals/EnterpriseOrchestration';
import { GovernanceShield } from '../../components/ui/visuals/GovernanceShield';
import styles from './Services.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const services = [
  {
    id: 'strategic-ai',
    icon: Brain,
    num: '01',
    title: { en: 'Strategic AI Advisory', ar: 'الاستشارات الاستراتيجية للذكاء الاصطناعي' },
    subtitle: { en: 'Frame the decision before the tool', ar: 'صياغة القرار قبل الأداة' },
    desc: {
      en: 'We start where most consultants stop — at the decision layer. Before selecting models or platforms, we map the highest-value choices your organization faces and design an intelligence strategy that makes those choices clearer, faster, and more confident.',
      ar: 'نبدأ حيث يتوقف معظم الاستشاريين — عند طبقة القرارات. قبل اختيار المنصات والنماذج، نرسم خريطة أعلى القرارات قيمة التي تواجه مؤسستك ونصمم استراتيجية ذكاء تجعل هذه القرارات أوضح وأسرع وأكثر ثقة.',
    },
    outcomes: [
      { en: 'Strategic AI roadmap aligned to business objectives', ar: 'خارطة طريق استراتيجية للذكاء الاصطناعي متوافقة مع الأهداف التجارية' },
      { en: 'Decision architecture mapped across all business units', ar: 'هندسة قارات مرسومة عبر جميع الوحدات التجارية' },
      { en: 'Executive alignment on AI priorities and investment', ar: 'التوافق التنفيذي على أولويات واستثمارات الذكاء الاصطناعي' },
      { en: 'Risk-adjusted AI adoption framework', ar: 'إطار تبني ذكاء اصطناعي مقاوم للمخاطر' },
    ],
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
    outcomes: [
      { en: 'Reduced operational friction across critical workflows', ar: 'تقليل الاحتكاك التشغيلي عبر تدفقات العمل الحيوية' },
      { en: 'Intelligent automation that learns and adapts', ar: 'أتمتة ذكية تتعلم وتتكيف' },
      { en: 'Expert time freed for high-value strategic work', ar: 'تحرير وقت الخبراء للعمل الاستراتيجي عالي القيمة' },
      { en: 'Measurable efficiency gains within 90 days', ar: 'تحقيق مكاسب كفاءة قابلة للقياس خلال 90 يوماً' },
    ],
    capabilities: [
      { en: 'Process Intelligence Audit', ar: 'تدقيق ذكاء العمليات' },
      { en: 'Workflow Orchestration Design', ar: 'تصميم تنسيق تدفقات العمل' },
      { en: 'Intelligent Document Processing', ar: 'معالجة المستندات الذكية' },
      { en: 'Decision Automation Flows', ar: 'تدفقات أتمتة القرارات' },
    ],
    bg: '#2F3338',
    dark: true,
  },
  {
    id: 'executive-adoption',
    icon: Shield,
    num: '03',
    title: { en: 'Executive Adoption & Governance', ar: 'التبني التنفيذي والحوكمة' },
    subtitle: { en: 'Clarity, confidence, and governance at every step', ar: 'الوضوح والثقة والحوكمة في كل خطوة' },
    desc: {
      en: 'Technology adoption fails when leadership doesn\'t trust it. We build the governance frameworks, training programs, and change management systems that turn executive skepticism into enthusiastic championship — ensuring every transformation sticks.',
      ar: 'يفشل تبني التكنولوجيا عندما لا يثق بها القيادة. نبني أطر الحوكمة وبرامج التدريب وأنظمة إدارة التغيير التي تحول الشك التنفيذي إلى حماس حقيقي — مما يضمن نجاح كل تحول.',
    },
    outcomes: [
      { en: 'Executive confidence in AI decision-making', ar: 'ثقة التنفيذية في اتخاذ قرارات الذكاء الاصطناعي' },
      { en: 'Governance framework aligned to regulatory requirements', ar: 'إطار حوكمة متوافق مع المتطلبات التنظيمية' },
      { en: 'Measurable adoption rates across leadership teams', ar: 'معدلات تبني قابلة للقياس عبر فرق القيادة' },
      { en: 'Sustainable transformation culture embedded', ar: 'iculture تحول مستدام متجذر في المنظمة' },
    ],
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
  {
    num: '01',
    icon: Target,
    title: { en: 'Discover', ar: 'اكتشف' },
    desc: { en: 'Map decisions, not just processes. We analyze your strategic landscape to identify where AI creates the highest value.', ar: 'رسّم القرارات، لا العمليات فقط. نحلل مشهدك الاستراتيجي لتحديد أين يخلق الذكاء الاصطناعي أعلى قيمة.' },
  },
  {
    num: '02',
    icon: Lightbulb,
    title: { en: 'Architect', ar: 'صمّم' },
    desc: { en: 'Design the intelligence layer. Technology, processes, and governance aligned to your business vision.', ar: 'صمّم طبقة الذكاء. التكنولوجيا والعمليات والحوكمة متوافقة مع رؤيتك التجارية.' },
  },
  {
    num: '03',
    icon: CheckCircle2,
    title: { en: 'Build', ar: 'ابنِ' },
    desc: { en: 'Implement with precision. Measured milestones, continuous validation, zero disruption to operations.', ar: 'نفّذ بدقة. مراحل قياسية، تحقق مستمر، صفر تعطيل للعمليات.' },
  },
  {
    num: '04',
    icon: BarChart3,
    title: { en: 'Evolve', ar: 'طوّر' },
    desc: { en: 'Learn, adapt, improve. Turn initial wins into lasting competitive advantage.', ar: 'تعلّم، تكيّف، حسّن. نحول الانتصارات الأولية إلى ميزة تنافسية دائمة.' },
  },
];

export function ServicesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const handleCTA = useCTA();

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
              ? 'ثلاث حلول متكاملة. نهج واحد متماسك. من القرار إلى النتيجة.'
              : 'Three integrated solutions. One coherent approach. From decision to outcome.'}
          </motion.p>
        </motion.div>

        <div className={styles.heroVisual}>
          <EnterpriseOrchestration />
        </div>
      </section>

      {/* SERVICES — FULL BLEED EDITORIAL */}
      {services.map((svc, _idx) => (
        <section
          key={svc.id}
          className={`${styles.serviceSection} ${svc.dark ? styles.dark : ''} ${svc.bordered ? styles.bordered : ''}`}
          style={{ background: svc.dark ? svc.bg : svc.bordered ? '#fff' : svc.bg }}
        >
          <div className={styles.serviceVisual} aria-hidden="true">
            {svc.id === 'strategic-ai' && <DecisionArchitecture />}
            {svc.id === 'automation-architecture' && <EnterpriseOrchestration />}
            {svc.id === 'executive-adoption' && <GovernanceShield />}
          </div>
          <div className={styles.serviceInner}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceNum}>{svc.num}</span>
              <svc.icon size={32} strokeWidth={1.2} className={styles.serviceIcon} />
            </div>
            <div className={styles.serviceBody}>
              <h2 className={styles.serviceTitle}>{ar ? svc.title.ar : svc.title.en}</h2>
              <p className={styles.serviceSubtitle}>{ar ? svc.subtitle.ar : svc.subtitle.en}</p>
              <p className={styles.serviceDesc}>{ar ? svc.desc.ar : svc.desc.en}</p>

              <div className={styles.outcomesSection}>
                <span className={styles.outcomesLabel}>{ar ? 'النتائج المطلقة' : 'Key Outcomes'}</span>
                <div className={styles.outcomesList}>
                  {svc.outcomes.map((outcome, i) => (
                    <motion.div
                      key={i}
                      className={styles.outcomeItem}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                    >
                      <CheckCircle2 size={16} strokeWidth={1.5} className={styles.outcomeIcon} />
                      <span>{ar ? outcome.ar : outcome.en}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={styles.capabilities}>
                <span className={styles.capLabel}>{ar ? 'القدرات' : 'Capabilities'}</span>
                <div className={styles.capGrid}>
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
              </div>

              <Link to="/contact" className={styles.serviceCta} onClick={handleCTA}>
                {ar ? 'ابدأ المحادثة' : 'Start a conversation'}
                <ArrowRight size={14} />
              </Link>
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
            {ar ? 'أربع مراحل نحو التحول الذكي' : 'Four phases to intelligent transformation'}
          </motion.h2>
          <motion.p
            className={styles.processSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {ar
              ? 'منهجية متكاملة مبنية على سنوات من الخبرة في تحويل المؤسسات بالذكاء الاصطناعي.'
              : 'An integrated methodology built on years of experience transforming enterprises with AI.'}
          </motion.p>
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
                <div className={styles.processCardHeader}>
                  <span className={styles.processNum}>{step.num}</span>
                  <div className={styles.processIconWrap}>
                    <step.icon size={20} strokeWidth={1.5} className={styles.processIcon} />
                  </div>
                </div>
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
          <motion.p
            className={styles.ctaSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar
              ? 'استشارة أولية مجانية لفهم تحدياتك وتحديد فرص الذكاء الاصطناعي.'
              : 'Free initial consultation to understand your challenges and identify AI opportunities.'}
          </motion.p>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className={styles.ctaBtn}>
              {ar ? 'احجز استشارتك' : 'Book a Consultation'}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
