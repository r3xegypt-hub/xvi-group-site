import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Compass, Users, Zap, Quote, ChevronDown, Target, Lightbulb, Shield, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './About.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const values = [
  {
    icon: Eye,
    title: { en: 'Clarity', ar: 'الوضوح' },
    desc: { en: 'We make the complex simple and the ambiguous decisive.', ar: 'نجعل المعقد بسيطاً والغامض حاسماً.' },
  },
  {
    icon: Compass,
    title: { en: 'Precision', ar: 'الدقة' },
    desc: { en: 'Every recommendation is grounded in data and validated by experience.', ar: 'كل توصية مبنية على بيانات ومثبتة بالخبرة.' },
  },
  {
    icon: Users,
    title: { en: 'Partnership', ar: 'الشراكة' },
    desc: { en: 'We work alongside leadership, not in replacement of it.', ar: 'نعمل بجانب القيادة، لا بديلاً عنها.' },
  },
  {
    icon: Zap,
    title: { en: 'Impact', ar: 'التأثير' },
    desc: { en: 'Technology without transformation is expense. We deliver outcomes.', ar: 'التكنولوجيا بدون تحول هي مصروف. نقدم نتائج.' },
  },
];

const methodologySteps = [
  {
    num: '01',
    icon: Target,
    title: { en: 'Discover', ar: 'اكتشف' },
    desc: { en: 'We map your strategic landscape — identifying where AI creates the highest value for your organization.', ar: 'نرسم المشهد الاستراتيجي لمؤسستك — ونحدد أين يخلق الذكاء الاصطناعي أعلى قيمة.' },
  },
  {
    num: '02',
    icon: Lightbulb,
    title: { en: 'Architect', ar: 'صمم' },
    desc: { en: 'We design the intelligence architecture — technology, processes, and governance aligned to your vision.', ar: 'نصمم هندسة الذكاء — التكنولوجيا والعمليات والحوكمة متوافقة مع رؤيتك.' },
  },
  {
    num: '03',
    icon: Shield,
    title: { en: 'Build', ar: 'ابنِ' },
    desc: { en: 'We develop and deploy with precision — measured milestones, continuous validation, zero disruption.', ar: 'نطور ونشر بدقة — مراحل قياسية، تحقق مستمر، صفر تعطيل.' },
  },
  {
    num: '04',
    icon: TrendingUp,
    title: { en: 'Evolve', ar: 'طوّر' },
    desc: { en: 'We optimize and expand — turning initial wins into lasting competitive advantage.', ar: 'نحسن ونوسّع — نحول الانتصارات الأولية إلى ميزة تنافسية دائمة.' },
  },
];

const journeySteps = [
  { en: 'Strategic Assessment', ar: 'التقييم الاستراتيجي' },
  { en: 'AI Opportunity Mapping', ar: 'تحديد فرص الذكاء الاصطناعي' },
  { en: 'Architecture Design', ar: 'تصميم الهيكلية' },
  { en: 'Governance Framework', ar: 'إطار الحوكمة' },
  { en: 'Pilot Development', ar: 'تطوير النموذج الأولي' },
  { en: 'Production Deployment', ar: 'النشر الإنتاجي' },
  { en: 'Continuous Optimization', ar: 'التحسين المستمر' },
];

const faqItems = [
  {
    q: { en: 'What makes XVI GROUP different from other AI consultancies?', ar: 'ما الذي يميز XVI GROUP عن الاستشارات الأخرى للذكاء الاصطناعي؟' },
    a: { en: 'We focus on the decision layer, not just technology. Our approach starts with understanding your strategic objectives, then architecting AI solutions that align with your business vision. We combine executive-level advisory with technical depth.', ar: 'نركز على طبقة القرارات، وليس فقط التكنولوجيا. منهجنا يبدأ بفهم أهدافك الاستراتيجية، ثم تصميم حلول ذكاء اصطناعي متوافقة مع رؤية أعمالك. نجمع بين الاستشارات التنفيذية والعمق التقني.' },
  },
  {
    q: { en: 'How long does a typical engagement last?', ar: 'كم تستمر الاستشارة النموذجية؟' },
    a: { en: 'Engagements typically range from 4–12 weeks depending on scope and complexity. We offer flexible engagement models from focused advisory to full transformation programs.', ar: 'تتراوح عادة من 4 إلى 12 أسبوعاً حسب النطاق والتعقيد. نقدم نماذج تعاون مرنة من الاستشارات المركزة إلى برامج التحول الكاملة.' },
  },
  {
    q: { en: 'Do you work with early-stage companies?', ar: 'هل تعملون مع الشركات الناشئة؟' },
    a: { en: 'Yes. We work with ambitious organizations at any stage — from startups building their first AI capabilities to established enterprises scaling intelligent operations.', ar: 'نعم. نعمل مع المؤسسات الطموحة في أي مرحلة — من الشركات الناشئة التي تبني أولى قدرات الذكاء الاصطناعي إلى المؤسسات Established التي توسّع العمليات الذكية.' },
  },
  {
    q: { en: 'What industries do you serve?', ar: 'ما القطاعات التي تخدمونها؟' },
    a: { en: 'We serve financial services, public sector, complex enterprise, and healthcare & life sciences. Our methodology is sector-agnostic but our solutions are deeply customized.', ar: 'نخدم القطاعات المالية والقطاع العام والمؤسسات المعقدة والصحة وعلوم الحياة. منهجنا غير مقتصر على قطاع معين لكن حلولنا مخصصة بعمق.' },
  },
  {
    q: { en: 'What is sovereign AI?', ar: 'ما هو الذكاء السيادي؟' },
    a: { en: 'Sovereign AI means the enterprise owns and controls its AI infrastructure, data, and models. We help organizations build AI capabilities that are secure, compliant, and fully within their control.', ar: 'الذكاء السيادي يعني امتلاك المؤسسة والتحكم في بنيتها التحتية للذكاء الاصطناعي وبياناتها ونماذجها. نساعد المؤسسات على بناء قدرات ذكية آمنة ومتوافقة وضمن سيطرتها الكاملة.' },
  },
];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO — CINEMATIC */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>
        <motion.div className={styles.heroContent} ref={ref} style={{ y: parallaxY }}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar ? 'الشركة' : 'COMPANY'}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {ar ? 'الرؤية تلتقي التنفيذ' : 'Where vision meets execution.'}
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {ar
              ? 'XVI GROUP هي شركة استشارات تنفيذية متخصصة في الذكاء الاصطناعي. نجمع بين الرؤية الاستراتيجية والخبرة التقنية لتحويل المؤسسات.'
              : 'XVI GROUP is an executive advisory firm specializing in AI transformation. We combine strategic vision with technical depth to transform enterprises.'}
          </motion.p>
        </motion.div>
      </section>

      {/* VISION & MISSION */}
      <section className={styles.visionMissionSection}>
        <div className={styles.visionMissionInner}>
          <motion.div
            className={styles.visionBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className={styles.sectionLabel}>{ar ? 'الرؤية' : 'VISION'}</span>
            <h2 className={styles.sectionHeading}>
              {ar
                ? 'أن نكون الشريك الاستراتيجي الأول للتحول بالذكاء الاصطناعي في المنطقة.'
                : 'To be the leading strategic partner for AI transformation in the region.'}
            </h2>
          </motion.div>

          <motion.div
            className={styles.missionBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className={styles.sectionLabel}>{ar ? 'المهمة' : 'MISSION'}</span>
            <h2 className={styles.sectionHeading}>
              {ar
                ? 'تمكين المؤسسات من اتخاذ قرارات ذكية hơn عبر تحويل الذكاء الاصطناعي إلى نتائج حقيقية.'
                : 'Empowering enterprises to make smarter decisions by turning AI into real outcomes.'}
            </h2>
          </motion.div>

          <motion.div
            className={styles.quoteBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <Quote size={32} strokeWidth={1} className={styles.quoteIcon} />
            <blockquote className={styles.quoteText}>
              {ar
                ? 'لا نبيع التكنولوجيا. نبيع الوضوح. التكنولوجيا هي الأداة، والوضوح هو النتيجة.'
                : 'We don\'t sell technology. We sell clarity. Technology is the tool; clarity is the outcome.'}
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'القيم الجوهرية' : 'CORE VALUES'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'مبادئ توجه كل قرار' : 'Principles that guide every decision'}
          </motion.h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <div className={styles.valueIconWrap}>
                  <v.icon size={24} strokeWidth={1.5} className={styles.valueIcon} />
                </div>
                <h3 className={styles.valueTitle}>{ar ? v.title.ar : v.title.en}</h3>
                <p className={styles.valueDesc}>{ar ? v.desc.ar : v.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY XVI */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'لماذا XVI' : 'WHY XVI'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'لماذا تختارنا كشريك استراتيجي' : 'Why choose us as your strategic partner'}
          </motion.h2>
          <div className={styles.whyGrid}>
            {[
              { icon: Target, title: { en: 'Decision-First Approach', ar: 'نهج يبدأ بالقرارات' }, desc: { en: 'We start where most consultants stop — at the decision layer. Before selecting models or platforms, we map the highest-value choices your organization faces.', ar: 'نبدأ حيث يتوقف معظم الاستشاريين — عند طبقة القرارات. قبل اختيار النماذج أو المنصات، نرسم أعلى القرارات قيمة التي تواجه مؤسستك.' } },
              { icon: Shield, title: { en: 'Sovereign AI', ar: 'الذكاء السيادي' }, desc: { en: 'We help you own and control your AI infrastructure. No vendor lock-in. No data dependency. Full sovereignty over your intelligence assets.', ar: 'نساعدك في امتلاك والتحكم في بنية ذكائك التحتية. لا تقييد بالمورد. لا اعتماد على البيانات. سيادة كاملة على أصول ذكائك.' } },
              { icon: Users, title: { en: 'Executive Alignment', ar: 'التوافق التنفيذي' }, desc: { en: 'We work directly with leadership teams. Our advisory is designed for decision-makers, not just technical teams.', ar: 'نعمل مباشرة مع فرق القيادة. استشاراتنا مصممة لصانعي القرارات، وليس فقط الفرق التقنية.' } },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={styles.whyCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <div className={styles.whyIconWrap}>
                  <item.icon size={24} strokeWidth={1.5} className={styles.whyIcon} />
                </div>
                <h3 className={styles.whyTitle}>{ar ? item.title.ar : item.title.en}</h3>
                <p className={styles.whyDesc}>{ar ? item.desc.ar : item.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className={styles.methodologySection}>
        <div className={styles.methodologyInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'منهجيتنا' : 'OUR METHODOLOGY'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'منهجية مُجربة للتحول الذكي' : 'A proven methodology for intelligent transformation'}
          </motion.h2>
          <div className={styles.methodGrid}>
            {methodologySteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.methodCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <span className={styles.methodNum}>{step.num}</span>
                <div className={styles.methodIconWrap}>
                  <step.icon size={20} strokeWidth={1.5} className={styles.methodIcon} />
                </div>
                <h3 className={styles.methodTitle}>{ar ? step.title.ar : step.title.en}</h3>
                <p className={styles.methodDesc}>{ar ? step.desc.ar : step.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TRANSFORMATION JOURNEY */}
      <section className={styles.journeySection}>
        <div className={styles.journeyInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'رحلة التحول' : 'TRANSFORMATION JOURNEY'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'خطوات رحلة التحول بالذكاء الاصطناعي' : 'The AI transformation journey'}
          </motion.h2>
          <div className={styles.journeyTimeline}>
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.journeyStep}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <div className={styles.journeyMarker}>
                  <span className={styles.journeyNum}>{String(i + 1).padStart(2, '0')}</span>
                  {i < journeySteps.length - 1 && <div className={styles.journeyLine} />}
                </div>
                <span className={styles.journeyLabel}>{ar ? step.ar : step.en}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'عملية الاستشارة' : 'CONSULTATION PROCESS'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'كيف نعمل معك' : 'How we work with you'}
          </motion.h2>
          <div className={styles.processGrid}>
            {[
              { step: '01', title: { en: 'Initial Consultation', ar: 'الاستشارة الأولية' }, desc: { en: 'A focused 60-minute session to understand your strategic objectives and AI readiness.', ar: 'جلسة مركزة لمدة 60 دقيقة لفهم أهدافك الاستراتيجية واستعدادك للذكاء الاصطناعي.' } },
              { step: '02', title: { en: 'Strategic Assessment', ar: 'التقييم الاستراتيجي' }, desc: { en: 'Deep analysis of your organization\'s data, technology, and operational landscape.', ar: 'تحليل عميق لبيانات مؤسستك وتكنولوجيتها والمشهد التشغيلي.' } },
              { step: '03', title: { en: 'Roadmap Delivery', ar: 'تقديم خارطة الطريق' }, desc: { en: 'A clear, phased roadmap with prioritized initiatives and measurable milestones.', ar: 'خارطة طريق واضحة ومرحلية مع مبادرات أولوية ومراحل قياسية.' } },
              { step: '04', title: { en: 'Guided Execution', ar: 'التنفيذ الموجه' }, desc: { en: 'Hands-on partnership through implementation with continuous advisory support.', ar: 'شراكة عملية أثناء التنفيذ مع دعم استشاري مستمر.' } },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={styles.processCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                <span className={styles.processNum}>{item.step}</span>
                <h3 className={styles.processTitle}>{ar ? item.title.ar : item.title.en}</h3>
                <p className={styles.processDesc}>{ar ? item.desc.ar : item.desc.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {ar ? 'الأسئلة الشائعة' : 'FAQ'}
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ar ? 'أسئلة متكررة' : 'Frequently asked questions'}
          </motion.h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{ar ? item.q.ar : item.q.en}</span>
                  <motion.span
                    className={styles.faqChevron}
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <p>{ar ? item.a.ar : item.a.en}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            {ar ? 'ابدأ رحلة التحول' : 'Start your transformation'}
          </motion.h2>
          <motion.p
            className={styles.ctaSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {ar
              ? 'استشارة أولية مجانية لفهم تحدياتك وتحديد الفرص.'
              : 'Free initial consultation to understand your challenges and identify opportunities.'}
          </motion.p>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className={styles.ctaPrimary}>
              {ar ? 'احجز استشارتك' : 'Book your consultation'}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
