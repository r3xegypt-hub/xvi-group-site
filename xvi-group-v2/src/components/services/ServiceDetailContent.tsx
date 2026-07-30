import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Check, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../layout/Container';
import { PremiumCard } from '../ui/PremiumCard';
import { CTA } from '../sections/CTA';

const ease: Easing = [0.16, 1, 0.3, 1];

const serviceContent = {
  'business-consulting': {
    hero: {
      title: { en: 'Business Consulting', ar: 'استشارات الأعمال' },
      subtitle: { en: 'Strategic clarity for the AI era. We help leaders define vision, build roadmaps, and execute with precision.', ar: 'وضوح استراتيجي لعصر الذكاء الاصطناعي.' },
    },
    problem: {
      title: { en: 'The Challenge', ar: 'التحدي' },
      desc: { en: 'Executives face unprecedented complexity — rapid AI advancement, shifting market dynamics, and the pressure to transform without disrupting core operations. The cost of strategic indecision is measured in market position.', ar: 'التعقيد غير المسبوق في عصر الذكاء الاصطناعي.' },
    },
    solution: {
      title: { en: 'Our Approach', ar: 'منهجنا' },
      desc: { en: 'We combine strategic advisory with technical depth to deliver actionable roadmaps for AI transformation.', ar: 'نجمع بين الاستشارات الاستراتيجية والعمق التقني لتقديم خرائط طريق عملية للتحول بالذكاء الاصطناعي.' },
    },
    process: [
      { step: '01', title: { en: 'Discovery', ar: 'الاستكشاف' }, desc: { en: 'Deep-dive into your business context, competitive landscape, and AI readiness.', ar: 'غوص عميق في سياق عملك.' } },
      { step: '02', title: { en: 'Strategy', ar: 'الاستراتيجية' }, desc: { en: 'Define vision, objectives, and a phased roadmap aligned with your enterprise goals.', ar: 'تحديد الرؤية والأهداف.' } },
      { step: '03', title: { en: 'Architecture', ar: 'الهندسة' }, desc: { en: 'Design the technology and operational architecture to execute the strategy.', ar: 'تصميم الهندسة التقنية والتشغيلية.' } },
      { step: '04', title: { en: 'Execution', ar: 'التنفيذ' }, desc: { en: 'Guided implementation with measurable milestones and continuous optimization.', ar: 'تنفيذ موجه مع مراحل قياسية.' } },
    ],
    benefits: [
      { en: 'Executive-aligned AI strategy', ar: 'استراتيجية ذكاء اصطناعي متوافقة تنفيذياً' },
      { en: 'Clear, phased implementation roadmap', ar: 'خارطة طريق تنفيذية واضحة' },
      { en: 'Risk-mitigated transformation', ar: 'تحول مع تخفيف المخاطر' },
      { en: 'Measurable ROI framework', ar: 'إطار عائد استثمار قابل للقياس' },
    ],
    faq: [
      { q: { en: 'How long does a typical engagement last?', ar: 'كم تستمر الاستشارة النموذجية؟' }, a: { en: 'Engagements typically range from 4–12 weeks depending on scope and complexity.', ar: 'تتراوح عادة من 4 إلى 12 أسبوعاً.' } },
      { q: { en: 'Do you work with early-stage companies?', ar: 'هل تعملون مع الشركات الناشئة؟' }, a: { en: 'Yes. We work with ambitious organizations at any stage, from startups to established enterprises.', ar: 'نعم. نعمل مع المؤسسات الطموحة في أي مرحلة.' } },
      { q: { en: 'What industries do you serve?', ar: 'ما القطاعات التي تخدمونها؟' }, a: { en: 'We serve technology, finance, healthcare, energy, and government sectors.', ar: 'نخدم قطاعات التكنولوجيا والمالية والصحة والطاقة والحكومة.' } },
    ],
  },
  'technology-consulting': {
    hero: {
      title: { en: 'Technology Consulting', ar: 'استشارات التكنولوجيا' },
      subtitle: { en: 'Architecting the technology foundation for AI-native enterprises. Cloud, data, security, and infrastructure.', ar: 'هندسة الأساس التقني لمؤسسات الذكاء الاصطناعي.' },
    },
    problem: {
      title: { en: 'The Challenge', ar: 'التحدي' },
      desc: { en: 'Legacy infrastructure, fragmented data, and security complexity prevent organizations from adopting AI at scale. Technology decisions made in isolation create debt that compounds over time.', ar: 'البنية التحتية القديمة والبيانات المجزأة تمنع تبني الذكاء الاصطناعي.' },
    },
    solution: {
      title: { en: 'Our Approach', ar: 'منهجنا' },
      desc: { en: 'We design technology architectures that are secure, scalable, and AI-ready. From cloud strategy to data engineering to zero-trust security — we build the foundation for intelligent enterprise.', ar: 'نصمم بنى تقنية آمنة وقابلة للتطوير وجاهزة للذكاء الاصطناعي.' },
    },
    process: [
      { step: '01', title: { en: 'Assessment', ar: 'التقييم' }, desc: { en: 'Comprehensive audit of current technology stack, architecture, and security posture.', ar: 'تدقيق شامل للبنية التقنية الحالية.' } },
      { step: '02', title: { en: 'Design', ar: 'التصميم' }, desc: { en: 'Target architecture design with cloud-native, AI-ready principles.', ar: 'تصميم البنية المستهدفة.' } },
      { step: '03', title: { en: 'Migration', ar: 'الترحيل' }, desc: { en: 'Phased migration with minimal business disruption and continuous validation.', ar: 'ترحيل مرحلي مع أقل تعطيل.' } },
      { step: '04', title: { en: 'Optimization', ar: 'التحسين' }, desc: { en: 'Performance tuning, cost optimization, and security hardening.', ar: 'ضبط الأداء وتحسين التكلفة.' } },
    ],
    benefits: [
      { en: 'AI-ready infrastructure', ar: 'بنية تحتية جاهزة للذكاء الاصطناعي' },
      { en: 'Reduced technical debt', ar: 'تقليل الديون التقنية' },
      { en: 'Enterprise-grade security', ar: 'أمان على مستوى المؤسسات' },
      { en: 'Scalable cloud architecture', ar: 'هندسة سحابية قابلة للتوسع' },
    ],
    faq: [
      { q: { en: 'Do you work with existing cloud providers?', ar: 'هل تعملون مع مزودي الخدمات السحابية الحاليين؟' }, a: { en: 'Yes. We are cloud-agnostic and work with AWS, Azure, GCP, and private cloud.', ar: 'نعم. نحن محايدون تجاه مزود الخدمة السحابية.' } },
      { q: { en: 'How do you handle data migration?', ar: 'كيف تتعاملون مع ترحيل البيانات؟' }, a: { en: 'We use a phased approach with validation at every stage to ensure data integrity.', ar: 'نستخدم نهجاً مرحلياً مع التحقق في كل مرحلة.' } },
    ],
  },
  'ai-transformation': {
    hero: {
      title: { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' },
      subtitle: { en: 'From strategy to deployment. We help enterprises adopt AI with purpose, governance, and measurable impact.', ar: 'من الاستراتيجية إلى النشر.' },
    },
    problem: {
      title: { en: 'The Challenge', ar: 'التحدي' },
      desc: { en: 'AI adoption is not a technology problem — it is a strategy, people, and process challenge. Without clear vision and governance, AI initiatives fail to deliver business value.', ar: 'تبني الذكاء الاصطناعي ليس مشكلة تقنية.' },
    },
    solution: {
      title: { en: 'Our Approach', ar: 'منهجنا' },
      desc: { en: 'We deliver end-to-end AI transformation: strategy, governance, model development, deployment, and change management. Built on a foundation of sovereignty and executive alignment.', ar: 'نقدم تحولاً كاملاً بالذكاء الاصطناعي.' },
    },
    process: [
      { step: '01', title: { en: 'Opportunity Mapping', ar: 'تحديد الفرص' }, desc: { en: 'Identify high-impact AI opportunities aligned with business strategy.', ar: 'تحديد فرص الذكاء الاصطناعي عالية التأثير.' } },
      { step: '02', title: { en: 'Governance', ar: 'الحوكمة' }, desc: { en: 'Establish AI governance, ethics frameworks, and risk management.', ar: 'إنشاء حوكمة الذكاء الاصطناعي.' } },
      { step: '03', title: { en: 'Development', ar: 'التطوير' }, desc: { en: 'Custom model development, training, and integration with existing systems.', ar: 'تطوير نماذج مخصصة.' } },
      { step: '04', title: { en: 'Deployment', ar: 'النشر' }, desc: { en: 'Production deployment with monitoring, feedback loops, and continuous improvement.', ar: 'نشر إنتاجي مع مراقبة وتحسين مستمر.' } },
    ],
    benefits: [
      { en: 'Purpose-driven AI adoption', ar: 'تبني ذكاء اصطناعي موجه بالهدف' },
      { en: 'Sovereign AI infrastructure', ar: 'بنية تحتية سيادية للذكاء الاصطناعي' },
      { en: 'Executive-aligned governance', ar: 'حوكمة متوافقة تنفيذياً' },
      { en: 'Measurable business impact', ar: 'تأثير تجاري قابل للقياس' },
    ],
    faq: [
      { q: { en: 'What is sovereign AI?', ar: 'ما هو الذكاء السيادي؟' }, a: { en: 'Sovereign AI means the enterprise owns and controls its AI infrastructure, data, and models.', ar: 'الذكاء السيادي يعني امتلاك المؤسسة للبنية التحتية للذكاء الاصطناعي.' } },
      { q: { en: 'How long until we see results?', ar: 'كم من الوقت حتى نرى النتائج؟' }, a: { en: 'Timelines vary, but initial pilots typically deliver insights within 8–12 weeks.', ar: 'تختلف الجداول الزمنية، لكن النماذج الأولية تظهر نتائج في 8-12 أسبوعاً.' } },
    ],
  },
  'executive-training': {
    hero: {
      title: { en: 'Executive Training', ar: 'التدريب التنفيذي' },
      subtitle: { en: 'Empowering leadership teams with the knowledge and frameworks to lead in the AI era.', ar: 'تمكين فرق القيادة بالمعرفة.' },
    },
    problem: {
      title: { en: 'The Challenge', ar: 'التحدي' },
      desc: { en: 'Leadership teams are expected to make AI-driven decisions without deep AI literacy. The gap between technical capability and executive understanding creates risk and missed opportunities.', ar: 'فجوة بين القدرة التقنية والفهم التنفيذي.' },
    },
    solution: {
      title: { en: 'Our Approach', ar: 'منهجنا' },
      desc: { en: 'Our executive programs are designed for non-technical leaders. We translate complex AI concepts into strategic frameworks, enabling confident decision-making.', ar: 'برامجنا التنفيذية مصممة للقادة غير التقنيين.' },
    },
    process: [
      { step: '01', title: { en: 'Assessment', ar: 'التقييم' }, desc: { en: 'Evaluate current AI literacy and identify capability gaps in the leadership team.', ar: 'تقييم المعرفة الحالية بالذكاء الاصطناعي.' } },
      { step: '02', title: { en: 'Curriculum', ar: 'المنهج' }, desc: { en: 'Custom-designed curriculum covering AI strategy, governance, and decision-making.', ar: 'منهج مصمم خصيصاً.' } },
      { step: '03', title: { en: 'Workshops', ar: 'ورش العمل' }, desc: { en: 'Interactive sessions with real-world case studies and strategic exercises.', ar: 'جلسات تفاعلية مع دراسات حالة.' } },
      { step: '04', title: { en: 'Application', ar: 'التطبيق' }, desc: { en: 'Apply learnings to real business challenges with ongoing advisory support.', ar: 'تطبيق التعلم على تحديات حقيقية.' } },
    ],
    benefits: [
      { en: 'AI-literate leadership team', ar: 'فريق قيادة مثقف بالذكاء الاصطناعي' },
      { en: 'Strategic decision-making confidence', ar: 'ثقة في اتخاذ القرارات الاستراتيجية' },
      { en: 'Common AI vocabulary across teams', ar: 'مفردات ذكاء اصطناعي مشتركة' },
      { en: 'Immediate business application', ar: 'تطبيق فوري في الأعمال' },
    ],
    faq: [
      { q: { en: 'How long are the programs?', ar: 'كم مدة البرامج؟' }, a: { en: 'Programs range from 1-day executive briefings to 8-week comprehensive courses.', ar: 'تتراوح من يوم واحد إلى 8 أسابيع.' } },
      { q: { en: 'Can this be delivered at our location?', ar: 'هل يمكن تقديمه في موقعنا؟' }, a: { en: 'Yes. We deliver on-site, off-site, and hybrid programs.', ar: 'نعم. نقدم برامج في الموقع وخارجه.' } },
    ],
  },
};

const serviceIds = ['business-consulting', 'technology-consulting', 'ai-transformation', 'executive-training'] as const;
type ServiceId = typeof serviceIds[number];

export function ServiceDetailContent({ serviceId }: { serviceId: ServiceId }) {
  const { language } = useLanguage();
  const content = serviceContent[serviceId];
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!content) return null;

  const L = (obj: { en: string; ar: string }) => ar ? obj.ar : obj.en;

  return (
    <>
      <div style={{ position: 'relative', padding: '160px 0 80px', overflow: 'hidden', background: '#ECE8E2' }}>
        <Container>
          <motion.div
            ref={ref}
            style={{ maxWidth: 680 }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A65A',
                display: 'block', marginBottom: 20,
              }}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } } }}
            >
              {ar ? 'الخدمات' : 'SERVICES'}
            </motion.span>
            <motion.h1
              style={{
                fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: ar ? 400 : 600, lineHeight: 1.05,
                letterSpacing: ar ? 0 : '-0.03em', color: '#111111', margin: '0 0 20px',
              }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {L(content.hero.title)}
            </motion.h1>
            <motion.p
              style={{
                fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '1.125rem', lineHeight: 1.7,
                color: '#666666', margin: 0, maxWidth: 520,
              }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {L(content.hero.subtitle)}
            </motion.p>
          </motion.div>
        </Container>
      </div>

      <div style={{ position: 'relative', padding: '100px 0', background: '#FFFFFF' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '1.75rem', fontWeight: ar ? 400 : 600, color: '#111111', margin: '0 0 16px' }}>
                <span style={{ color: '#C8A65A', marginRight: 12 }}>//</span>
                {L(content.problem.title)}
              </h2>
              <p style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.9375rem', lineHeight: 1.7, color: '#666666', margin: 0 }}>
                {L(content.problem.desc)}
              </p>
            </div>
            <div>
              <h2 style={{ fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '1.75rem', fontWeight: ar ? 400 : 600, color: '#111111', margin: '0 0 16px' }}>
                <span style={{ color: '#C8A65A', marginRight: 12 }}>//</span>
                {L(content.solution.title)}
              </h2>
              <p style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.9375rem', lineHeight: 1.7, color: '#666666', margin: 0 }}>
                {L(content.solution.desc)}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div style={{ position: 'relative', padding: '100px 0', background: '#ECE8E2' }}>
        <Container>
          <h2 style={{
            fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: ar ? 400 : 600, color: '#111111', textAlign: 'center', margin: '0 0 48px',
          }}>
            {ar ? 'عملية العمل' : 'Our Process'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {content.process.map((step, i) => (
              <PremiumCard key={i} glassIntensity={i % 2 === 0 ? 'light' : 'medium'} delay={i * 0.08}>
                <div style={{ padding: 32 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, opacity: 0.08, color: '#C8A65A', lineHeight: 1 }}>
                    {step.step}
                  </span>
                  <h3 style={{ fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', fontWeight: ar ? 400 : 600, color: '#111111', margin: '12px 0 8px' }}>
                    {L(step.title)}
                  </h3>
                  <p style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.875rem', lineHeight: 1.7, color: '#666666', margin: 0 }}>
                    {L(step.desc)}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </Container>
      </div>

      <div style={{ position: 'relative', padding: '100px 0', background: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: ar ? 400 : 600, color: '#111111', textAlign: 'center', margin: '0 0 36px',
            }}>
              {ar ? 'الفوائد الرئيسية' : 'Key Benefits'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {content.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '16px 20px',
                    background: 'rgba(200,166,90,0.03)',
                    border: '1px solid rgba(200,166,90,0.06)',
                  }}
                >
                  <Check size={16} color="#C8A65A" />
                  <span style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.875rem', color: '#444444' }}>
                    {L(b)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div style={{ position: 'relative', padding: '100px 0', background: '#ECE8E2' }}>
        <Container>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: ar ? "'Amiri', serif" : "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: ar ? 400 : 600, color: '#111111', textAlign: 'center', margin: '0 0 36px',
            }}>
              {ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {content.faq.map((item, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(200,166,90,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  <summary style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '18px 24px',
                    fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 500,
                    color: '#111111', cursor: 'pointer',
                    listStyle: 'none',
                  }}>
                    <HelpCircle size={16} color="#C8A65A" style={{ flexShrink: 0 }} />
                    {L(item.q)}
                  </summary>
                  <p style={{
                    padding: '0 24px 18px 52px',
                    fontFamily: ar ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif", fontSize: '0.875rem', lineHeight: 1.7,
                    color: '#666666', margin: 0,
                  }}>
                    {L(item.a)}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <CTA />
    </>
  );
}