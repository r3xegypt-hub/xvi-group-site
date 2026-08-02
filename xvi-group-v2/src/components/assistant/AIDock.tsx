import { useState, useCallback, useEffect, useRef, Fragment, useMemo } from 'react';
import type { ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { useMotion } from '../../motion/providers/MotionProvider';
import { signalAIDockAvailable } from '../../hooks/useCTA';
import { playSound } from '../../motion/audio/soundEngine';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTTS } from '../../hooks/useTTS';
import type { VoiceSettings } from '../../hooks/useTTS';
import { loadMemory, persistMemory, extractMemory, isMemoryAsk, hasLearnedFields } from '../../hooks/executiveMemory';
import type { ExecutiveMemory } from '../../hooks/executiveMemory';
import { classifyInput, createState, beginIntake, advanceIntake, intakeQuestion } from '../../assistant/consultant';
import type { ConversationState } from '../../assistant/consultant';
import { useJourney } from '../../hooks/journeyContext';
import { journeyMeta } from '../../hooks/journeyContext';
import type { JourneyId } from '../../hooks/journeyContext';
import { AIAvatar } from './AIAvatar';
import {
  Sparkles, Brain, X, BarChart3, Zap, FileText, Clock, CheckCircle2,
  Users, Shield, TrendingUp, Target, Lightbulb, Map,
  ArrowRight, Activity, Mic, Settings2, Volume2, User, Briefcase, Compass
} from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];
const font = "'Manrope', sans-serif";

const PERSONA_SIGNATURE: { en: string; ar: string } = {
  en: '— XVI Group · precision over speculation',
  ar: '— مجموعة XVI · الدقة قبل التكهن',
};

function PersonaSignature({ isAR }: { isAR: boolean }) {
  return (
    <div style={{ fontFamily: font, fontSize: '0.625rem', color: '#a98a45', fontStyle: 'italic', opacity: 0.8, marginTop: 10, letterSpacing: '0.02em' }}>
      {isAR ? PERSONA_SIGNATURE.ar : PERSONA_SIGNATURE.en}
    </div>
  );
}

type ActionId = 'strategy' | 'solutions' | 'roadmap' | 'readiness' | 'pricing' | 'deliverables' | 'automation' | 'timeline' | 'reports' | 'recommend' | 'journeyFocus';

const services = [
  { id: 'strategy', icon: Brain, title: { en: 'AI Strategy', ar: 'استراتيجية الذكاء الاصطناعي' }, desc: { en: 'Define your AI vision and roadmap', ar: 'تحديد رؤيتك وخريطة طريق الذكاء الاصطناعي' } },
  { id: 'automation', icon: Zap, title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' }, desc: { en: 'Design intelligent automation systems', ar: 'تصميم أنظمة الأتمتة الذكية' } },
  { id: 'adoption', icon: Users, title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' }, desc: { en: 'Enable leadership to champion AI', ar: 'تمكين القيادة من قيادة التحول' } },
  { id: 'governance', icon: Shield, title: { en: 'AI Governance', ar: 'حوكمة الذكاء الاصطناعي' }, desc: { en: 'Build responsible AI frameworks', ar: 'بناء أطر ذكاء اصطناعي مسؤولة' } },
];

const readinessChecks = [
  { en: 'Data Infrastructure', ar: 'البنية التحتية للبيانات', desc: { en: 'Do you have centralized, clean data?', ar: 'هل لديك بيانات مركزة ونظيفة؟' } },
  { en: 'Executive Sponsorship', ar: 'الرعاية التنفيذية', desc: { en: 'Is there C-suite commitment?', ar: 'هل هناك التزام من المستوى التنفيذي؟' } },
  { en: 'Technical Talent', ar: 'الكفاءات التقنية', desc: { en: 'Do you have AI/ML engineers?', ar: 'هل لديك مهندسو ذكاء اصطناعي؟' } },
  { en: 'Use Case Clarity', ar: 'وضوح حالات الاستخدام', desc: { en: 'Are high-value problems identified?', ar: 'هل تم تحديد المشكلات عالية القيمة؟' } },
  { en: 'Change Readiness', ar: 'استعداد التغيير', desc: { en: 'Is the organization ready to adapt?', ar: 'هل المؤسسة مستعدة للتكيف؟' } },
];

const automationOpps = [
  { en: 'Document Processing', ar: 'معالجة المستندات', impact: 'High', effort: 'Low' },
  { en: 'Customer Service', ar: 'خدمة العملاء', impact: 'High', effort: 'Medium' },
  { en: 'Financial Reporting', ar: 'التقارير المالية', impact: 'Medium', effort: 'Low' },
  { en: 'Supply Chain', ar: 'سلسلة التوريد', impact: 'High', effort: 'High' },
  { en: 'HR Processes', ar: 'عمليات الموارد البشرية', impact: 'Medium', effort: 'Medium' },
];

function ThinkingDots() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <>{dots}</>;
}

export function VoiceWaveform() {
  const { prefersReducedMotion } = useMotion();
  const bars = 16;
  if (prefersReducedMotion) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 16 }} data-testid="voice-waveform">
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i} style={{ width: 2, height: 8, borderRadius: 2, background: '#c8a65a', opacity: 0.5 }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 16 }} data-testid="voice-waveform">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: 2, borderRadius: 2, background: '#c8a65a', originY: 0.5 }}
          animate={{
            height: [4 + Math.random() * 8, 12 + Math.random() * 16, 4 + Math.random() * 8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.06,
          }}
        />
      ))}
    </div>
  );
}

const BASE_QUICK_ACTIONS = [
  { id: 'strategy', icon: Target, label: { en: 'Show me the strategic paths', ar: 'أرني المسارات الاستراتيجية' } },
  { id: 'solutions', icon: Brain, label: { en: 'Explore Solutions', ar: 'استكشف الحلول' } },
  { id: 'readiness', icon: CheckCircle2, label: { en: 'AI Assessment', ar: 'تقييم الذكاء الاصطناعي' } },
  { id: 'recommend', icon: Lightbulb, label: { en: 'Contact Expert', ar: 'تواصل مع خبير' } },
];

const allActions: { id: ActionId; icon: typeof Brain; label: { en: string; ar: string } }[] = [
  { id: 'strategy', icon: Target, label: { en: 'AI Strategy', ar: 'استراتيجية الذكاء الاصطناعي' } },
  { id: 'solutions', icon: Brain, label: { en: 'Our Services', ar: 'خدماتنا' } },
  { id: 'roadmap', icon: Map, label: { en: 'Generate Roadmap', ar: 'إنشاء خارطة طريق' } },
  { id: 'readiness', icon: CheckCircle2, label: { en: 'AI Readiness', ar: 'استعداد الذكاء الاصطناعي' } },
  { id: 'pricing', icon: FileText, label: { en: 'Pricing Model', ar: 'نموذج التسعير' } },
  { id: 'deliverables', icon: BarChart3, label: { en: 'Deliverables', ar: 'المخرجات' } },
  { id: 'automation', icon: Zap, label: { en: 'Automation Scan', ar: 'فحص الأتمتة' } },
  { id: 'timeline', icon: Clock, label: { en: 'Project Timeline', ar: 'الجدول الزمني' } },
  { id: 'reports', icon: TrendingUp, label: { en: 'Executive Reports', ar: 'التقارير التنفيذية' } },
  { id: 'recommend', icon: Lightbulb, label: { en: 'Recommend Solution', ar: 'توصية حل' } },
  { id: 'journeyFocus', icon: Compass, label: { en: 'Journey Focus', ar: 'محور الرحلة' } },
];

const ACTION_SPEECH: Record<string, { en: string; ar: string }> = {
  strategy: { en: 'Based on your context, I recommend a phased transformation strategy.', ar: 'بناءً على سياقك، أوصي باستراتيجية تحول مرحلية.' },
  solutions: { en: 'Our advisory services cover the full transformation lifecycle.', ar: 'خدماتنا الاستشارية تغطي دورة التحول الكاملة.' },
  roadmap: { en: 'Here is a sample AI transformation roadmap tailored for enterprise.', ar: 'إليك خارطة طريق نموذجية للتحول بالذكاء الاصطناعي.' },
  readiness: { en: 'I recommend evaluating these readiness dimensions.', ar: 'أوصي بتقييم أبعاد الاستعداد التالية.' },
  pricing: { en: 'Here is our pricing structure. We offer an advisory retainer, project-based, and transformation programs.', ar: 'إليك هيكل التسعير لدينا. نوفر استشارات دورية ومشاريع محددة وبرامج تحول شاملة.' },
  deliverables: { en: 'Executive deliverables include an AI strategy document, technology assessment, ROI analysis, and governance framework.', ar: 'تشمل المخرجات التنفيذية وثيقة استراتيجية الذكاء الاصطناعي وتقييم التكنولوجيا وتحليل العائد وإطار الحوكمة.' },
  automation: { en: 'Here is an automation opportunity scan across your key processes.', ar: 'إليك فحص فرص الأتمتة عبر عملياتك الرئيسية.' },
  timeline: { en: 'A typical engagement timeline spans twenty weeks, from discovery to deployment.', ar: 'الجدول الزمني النموذجي للاستشارة يمتد عشرين أسبوعاً من الاكتشاف إلى النشر.' },
  reports: { en: 'Here is an executive dashboard preview.', ar: 'إليك معاينة للوحة التنفيذية.' },
  recommend: { en: 'Let me recommend the best solution for your organization.', ar: 'دعني أوصيك بأفضل حل لمؤسستك.' },
};

const VOICE_SETTING_ROWS: { key: keyof VoiceSettings; label: { en: string; ar: string } }[] = [
  { key: 'enabled', label: { en: 'Enable Voice', ar: 'تفعيل الصوت' } },
  { key: 'replies', label: { en: 'Voice Replies', ar: 'الردود الصوتية' } },
  { key: 'autoSpeak', label: { en: 'Auto Speak', ar: 'التحدث التلقائي' } },
  { key: 'mute', label: { en: 'Mute', ar: 'كتم الصوت' } },
  { key: 'langAuto', label: { en: 'Language Auto Detect', ar: 'كشف اللغة تلقائيًا' } },
];

function VoiceToggleRow({ row, settings, onToggle, isAR }: { row: { key: keyof VoiceSettings; label: { en: string; ar: string } }; settings: VoiceSettings; onToggle: () => void; isAR: boolean }) {
  const on = settings[row.key];
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0',
      }}
    >
      <span style={{ fontFamily: font, fontSize: '0.6875rem', color: '#555', fontWeight: 500 }}>
        {isAR ? row.label.ar : row.label.en}
      </span>
      <motion.span
        animate={{ background: on ? '#c8a65a' : 'rgba(17,17,17,0.1)' }}
        transition={{ duration: 0.25 }}
        style={{
          width: 30, height: 18, borderRadius: 999, padding: 2,
          display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
          flexShrink: 0,
        }}
      >
        <motion.span layout style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }} />
      </motion.span>
    </button>
  );
}

function StrategyCard() {
  const phases = [
    { icon: Target, title: 'Assess', desc: 'Current state analysis, data audit, use case identification', color: '#C8A65A' },
    { icon: Lightbulb, title: 'Design', desc: 'AI vision, technology architecture, governance framework', color: '#C8A65A' },
    { icon: Zap, title: 'Build', desc: 'Pilot development, testing, performance validation', color: '#132238' },
    { icon: TrendingUp, title: 'Scale', desc: 'Production deployment, change management, optimization', color: '#132238' },
  ];
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Transformation Strategy
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {phases.map((phase, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', background: '#f7f6f3', borderRadius: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${phase.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: phase.color }}>
              <phase.icon size={14} />
            </div>
            <div>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{phase.title}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 2 }}>{phase.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 10, fontStyle: 'italic' }}>
        Each phase includes executive alignment, technical validation, and measurable milestones.
      </div>
    </div>
  );
}

function KpiCard() {
  const metrics = [
    { label: 'AI Adoption Rate', value: '67%', trend: '+12%' },
    { label: 'Automation Coverage', value: '43%', trend: '+8%' },
    { label: 'Decision Speed', value: '2.4x', trend: '+0.6x' },
    { label: 'Cost Reduction', value: '18%', trend: '+3%' },
  ];
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Executive Dashboard Preview
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '10px', background: '#f7f6f3', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontFamily: font, fontSize: '0.625rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
            <div style={{ fontFamily: font, fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginTop: 4 }}>{m.value}</div>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#2D6A4F', marginTop: 2 }}>{m.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapCard() {
  const phases = [
    { phase: 'Phase 1', title: 'Assessment', duration: '2-3 weeks', tasks: ['Stakeholder interviews', 'Data audit', 'Use case identification'] },
    { phase: 'Phase 2', title: 'Strategy', duration: '2-4 weeks', tasks: ['AI roadmap', 'Priority matrix', 'ROI projections'] },
    { phase: 'Phase 3', title: 'Pilot', duration: '4-8 weeks', tasks: ['MVP development', 'Testing', 'Performance validation'] },
    { phase: 'Phase 4', title: 'Scale', duration: '8-12 weeks', tasks: ['Production deployment', 'Change management', 'Optimization'] },
  ];
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Sample AI Transformation Roadmap
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {phases.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ minWidth: 52, fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#C8A65A', flexShrink: 0 }}>{p.phase}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{p.title}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 2 }}>{p.duration}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 4 }}>{p.tasks.join(' · ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ memory, isAR }: { memory: ExecutiveMemory; isAR: boolean }) {
  const navigate = useNavigate();
  const meta = journeyMeta(memory.journey as JourneyId | null);
  const goal = memory.goal;
  const serviceLabel = meta
    ? (isAR ? meta.service.label.ar : meta.service.label.en)
    : (isAR ? 'استشارة تنفيذية' : 'Executive Consultation');
  const serviceTo = meta ? meta.service.to : '/contact';
  const caseTitle = meta ? (isAR ? meta.caseTitle.ar : meta.caseTitle.en) : null;
  const intro = goal
    ? (isAR ? `في ضوء هدفك «${goal}» أوصي بالخطوة التالية:` : `Given your goal — "${goal}" — here is my recommended next step:`)
    : meta
      ? (isAR ? 'بناءً على محور رحلتك، إليك الخطوة التالية الموصى بها:' : 'Based on your journey focus, here is my recommended next step:')
      : (isAR ? 'إليك الخطوة التالية الموصى بها:' : 'Here is my recommended next step:');

  return (
    <div style={{
      background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.14)',
      padding: 16, marginTop: 8, boxShadow: '0 8px 24px rgba(19,34,56,0.06)',
    }}>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 700, color: '#C8A65A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {isAR ? 'الخطوة الموصى بها' : 'Recommended Next Step'}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
        {intro}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f7f6f3', borderRadius: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(200,166,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#C8A65A' }}>
          <Compass size={14} />
        </div>
        <div>
          <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111' }}>{serviceLabel}</div>
          {caseTitle && (
            <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 2 }}>{caseTitle}</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <motion.button
          type="button"
          onClick={() => navigate(serviceTo)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '10px 16px', background: '#132238', color: '#fff', border: 'none',
            borderRadius: 999, cursor: 'pointer', fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.25s ease',
          }}
        >
          {isAR ? `استكشف ${serviceLabel} ←` : `Explore ${serviceLabel} →`}
        </motion.button>
        <motion.button
          type="button"
          onClick={() => navigate('/contact')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '10px 16px', background: 'transparent', color: '#132238', border: '1px solid rgba(200,166,90,0.25)',
            borderRadius: 999, cursor: 'pointer', fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.25s ease',
          }}
        >
          {isAR ? 'تحدث مع مستشار' : 'Talk to a consultant'}
        </motion.button>
      </div>
    </div>
  );
}

function WhatsAppFallback({ query, isAR }: { query: string; isAR: boolean }) {
  const number = '971569220064';
  const message = isAR
    ? `مرحباً، أنا مهتم بـ: ${query}\n\nمن فضلكم أود معرفة المزيد عن خدمات XVI GROUP.`
    : `Hello, I'm interested in: ${query}\n\nI'd like to learn more about XVI GROUP's services.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{
        padding: 16, background: 'linear-gradient(135deg, rgba(37,211,102,0.06), rgba(37,211,102,0.02))',
        borderRadius: 14, border: '1px solid rgba(37,211,102,0.12)',
      }}>
        <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#075E54', marginBottom: 6 }}>
          {isAR ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
        </div>
        <div style={{ fontFamily: font, fontSize: '0.7rem', color: '#666', marginBottom: 12, lineHeight: 1.6 }}>
          {isAR
            ? 'سنقوم بإنشاء رسالة مخصصة لك. فقط اضغط على الزر أدناه لإرسالها.'
            : 'We\'ll generate a custom message for you. Just tap the button below to send it.'}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', background: '#25D366', color: '#fff',
            borderRadius: 999, textDecoration: 'none',
            fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
            boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.35)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.25)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {isAR ? 'أرسل عبر واتساب' : 'Send via WhatsApp'}
        </a>
      </div>
    </div>
  );
}

interface ContentEntry {
  keywords: string[];
  response: (isAR: boolean) => ReactNode;
  cta?: { label: { en: string; ar: string }; to: string };
}

const contentMap: ContentEntry[] = [
  {
    keywords: ['ai transformation', 'ai strategy', 'ai adoption', 'sovereign ai', 'ai consulting', 'تحول ذكاء اصطناعي', 'استراتيجية ذكاء اصطناعي', 'ذكاء سيادي'],
    response: (isAR) => isAR
      ? 'نقدم تحولاً شاملاً للذكاء الاصطناعي: استراتيجية مخصصة، حوكمة سيادية، تطوير نماذج، ونشر مع الحفاظ على ملكية بياناتك.'
      : 'We deliver end-to-end AI transformation: custom strategy, sovereign governance, model development, and deployment with full data ownership.',
    cta: { label: { en: 'AI Transformation →', ar: 'التحول بالذكاء الاصطناعي ←' }, to: '/services/ai-transformation' },
  },
  {
    keywords: ['business consulting', 'business advisory', 'استشارات الأعمال', 'استشارات إدارية'],
    response: (isAR) => isAR
      ? 'نساعد القادة على تحقيق الوضوح الاستراتيجي في عصر الذكاء الاصطناعي — رؤية، خارطة طريق، وتنفيذ بدقة.'
      : 'We help leaders achieve strategic clarity in the AI era — vision, roadmap, and execution with precision.',
    cta: { label: { en: 'Business Consulting →', ar: 'استشارات الأعمال ←' }, to: '/services/business-consulting' },
  },
  {
    keywords: ['technology consulting', 'tech consulting', 'digital transformation', 'cloud', 'infrastructure', 'استشارات تكنولوجيا', 'تحول رقمي', 'سحابة'],
    response: (isAR) => isAR
      ? 'نهندس الأساس التكنولوجي للمؤسسات الذكية: استراتيجية سحابية، هندسة بيانات، أمان zero-trust.'
      : 'We architect the technology foundation for AI-native enterprises: cloud strategy, data engineering, zero-trust security.',
    cta: { label: { en: 'Technology Consulting →', ar: 'استشارات التكنولوجيا ←' }, to: '/services/technology-consulting' },
  },
  {
    keywords: ['executive training', 'leadership training', 'ai training', 'تدريب تنفيذي', 'تدريب قيادات', 'تدريب ذكاء اصطناعي'],
    response: (isAR) => isAR
      ? 'نمكن فرق القيادة بمعرفة وأطر العمل بالذكاء الاصطناعي لقيادة الثقة في العصر الرقمي.'
      : 'We empower leadership teams with AI knowledge and frameworks to lead confidently in the AI era.',
    cta: { label: { en: 'Executive Training →', ar: 'التدريب التنفيذي ←' }, to: '/services/executive-training' },
  },
  {
    keywords: ['services', 'خدمات', 'what do you do', 'ماذا تقدمون'],
    response: (isAR) => isAR
      ? 'نقدم أربع خدمات رئيسية:\n١. استشارات الأعمال — وضوح استراتيجي\n٢. استشارات التكنولوجيا — بنية تحتية ذكية\n٣. التحول بالذكاء الاصطناعي — تبني شامل\n٤. التدريب التنفيذي — تمكين القيادة'
      : 'We offer four core services:\n1. Business Consulting — strategic clarity\n2. Technology Consulting — smart infrastructure\n3. AI Transformation — end-to-end adoption\n4. Executive Training — leadership empowerment',
    cta: { label: { en: 'All Services →', ar: 'جميع الخدمات ←' }, to: '/services' },
  },
  {
    keywords: ['industries', 'sectors', 'financial services', 'public sector', 'healthcare', 'education', 'enterprise', 'القطاعات', 'الخدمات المالية', 'القطاع العام', 'الصحة', 'التعليم'],
    response: (isAR) => isAR
      ? 'نخدم ستة قطاعات: الخدمات المالية، القطاع العام، المؤسسات الكبرى، الرعاية الصحية، التعليم والتكنولوجيا والاتصالات.'
      : 'We serve six sectors: Financial Services, Public Sector, Complex Enterprise, Healthcare, Education, and Technology & Telecom.',
    cta: { label: { en: 'Industries →', ar: 'القطاعات ←' }, to: '/industries' },
  },
  {
    keywords: ['about', 'company', 'who are you', 'vision', 'mission', 'values', 'من أنتم', 'عن الشركة', 'رؤية', 'رسالة'],
    response: (isAR) => isAR
      ? 'XVI GROUP هي شركة استشارات تنفيذية متخصصة في تحول الذكاء الاصطناعي، مقرها العين، الإمارات. رؤيتنا: الريادة في شراكة التحول بالذكاء الاصطناعي في المنطقة. قيمنا: الوضوح، الدقة، الشراكة، الأثر.'
      : 'XVI GROUP is an executive advisory firm specializing in AI transformation, based in Al Ain, UAE. Our vision: to be the leading strategic partner for AI transformation in the region. Values: Clarity, Precision, Partnership, Impact.',
    cta: { label: { en: 'About Us →', ar: 'عن الشركة ←' }, to: '/about' },
  },
  {
    keywords: ['contact', 'consultation', 'book', 'meeting', 'call', 'تواصل', 'استشارة', 'اتصال', 'موعد'],
    response: (isAR) => isAR
      ? 'يسعدنا التواصل معك! يمكنك حجز استشارة مجانية أو مراسلتنا مباشرة.'
      : 'We\'d love to hear from you! You can book a free consultation or reach out directly.',
    cta: { label: { en: 'Contact Us →', ar: 'تواصل معنا ←' }, to: '/contact' },
  },
  {
    keywords: ['automation', 'workflow', 'process', 'rpa', 'أتمتة', 'تدفق عمل'],
    response: (isAR) => isAR
      ? 'نصمم أنظمة أتمتة ذكية: معالجة المستندات، خدمة العملاء، التقارير المالية، وسلاسل التوريد.'
      : 'We design intelligent automation systems: document processing, customer service, financial reporting, and supply chain.',
    cta: { label: { en: 'Automation Scan →', ar: 'فحص الأتمتة ←' }, to: '/services/technology-consulting' },
  },
  {
    keywords: ['governance', 'ai ethics', 'responsible ai', 'compliance', 'حوكمة', 'أخلاقيات ذكاء اصطناعي'],
    response: (isAR) => isAR
      ? 'نبني أطر حوكمة شاملة للذكاء الاصطناعي: السياسات، الأخلاقيات، إدارة المخاطر، والامتثال.'
      : 'We build comprehensive AI governance frameworks: policies, ethics, risk management, and compliance.',
    cta: { label: { en: 'Governance →', ar: 'الحوكمة ←' }, to: '/services/ai-transformation' },
  },
  {
    keywords: ['methodology', 'process', 'approach', 'how', 'منهجية', 'نهج', 'كيف'],
    response: (isAR) => isAR
      ? 'منهجيتنا تعتمد على أربع مراحل: اكتشف ← صمم ← ابنِ ← طوّر.每条 مرحلة تشمل مواءمة تنفيذية وتحقق تقني.'
      : 'Our methodology follows four phases: Discover → Architect → Build → Evolve. Each phase includes executive alignment and technical validation.',
    cta: { label: { en: 'Our Approach →', ar: 'منهجيتنا ←' }, to: '/about' },
  },
  {
    keywords: ['insights', 'thought leadership', 'research', 'resources', 'رؤى', 'فكر قيادي', 'أبحاث', 'موارد'],
    response: (isAR) => isAR
      ? 'تصفح رؤانا حول استراتيجية الذكاء الاصطناعي، الأتمتة، التبني التنفيذي، ذكاء المخاطر، والتحول الرقمي.'
      : 'Explore our insights on AI Strategy, Automation, Executive Adoption, Risk Intelligence, and Digital Transformation.',
    cta: { label: { en: 'Insights →', ar: 'الرؤى ←' }, to: '/insights' },
  },
  {
    keywords: ['careers', 'jobs', 'join', 'hiring', 'work', 'وظائف', 'انضم', 'توظيف'],
    response: (isAR) => isAR
      ? 'نبحث عن أفراد استثنائيين! لدينا فرص في استشارات استراتيجية الذكاء الاصطناعي، هندسة الأتمتة، وحوكمة الذكاء الاصطناعي.'
      : 'We\'re looking for exceptional individuals! Openings in AI Strategy Consulting, Automation Architecture, and AI Governance.',
    cta: { label: { en: 'Careers →', ar: 'الوظائف ←' }, to: '/careers' },
  },
  {
    keywords: ['pricing', 'cost', 'price', 'fee', 'engagement', 'budget', 'تسعير', 'تكلفة', 'سعر', 'رسوم', 'ميزانية'],
    response: (isAR) => isAR
      ? 'هيكل التسعير لدينا:\n• استشارات دورية — اشتراك شهري\n• مشاريع محددة — 4-12 أسبوعاً\n• برامج تحول شاملة — 3-6 أشهر\nللحصول على عرض سعر مخصص، تواصل معنا.'
      : 'Our pricing structure:\n• Advisory Retainer — monthly engagement\n• Project-Based — 4-12 weeks\n• Transformation Program — 3-6 months\nContact us for a custom quote.',
    cta: { label: { en: 'Get a Quote →', ar: 'احصل على عرض سعر ←' }, to: '/contact' },
  },
  {
    keywords: ['timeline', 'duration', 'how long', 'roadmap', 'schedule', 'الجدول الزمني', 'المدة', 'خارطة طريق', 'مدة المشروع'],
    response: (isAR) => isAR
      ? 'الجدول الزمني النموذجي:\n• الأسبوع 1-2: الاكتشاف والتقييم\n• الأسبوع 3-4: تطوير الاستراتيجية\n• الأسبوع 5-8: التصميم المعماري\n• الأسبوع 9-12: تطوير النموذج التجريبي\n• الأسبوع 13-20: الاختبار والنشر'
      : 'Typical timeline:\n• Week 1-2: Discovery & Assessment\n• Week 3-4: Strategy Development\n• Week 5-8: Architecture & Design\n• Week 9-12: Pilot Development\n• Week 13-20: Testing & Deployment',
    cta: { label: { en: 'Timeline →', ar: 'الجدول الزمني ←' }, to: '/services' },
  },
];

function findContentMatch(input: string): { entry: ContentEntry; score: number } | null {
  const normalized = input.toLowerCase().trim();
  let best: { entry: ContentEntry; score: number } | null = null;

  for (const entry of contentMap) {
    let score = 0;
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) {
        score += kwLower.split(' ').length;
      }
      if (kwLower.includes(normalized) && normalized.length > 2) {
        score += 3;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best;
}

export function AIDock({ hideDock = false }: { hideDock?: boolean }) {
  const [open, setOpen] = useState(false);
  const [thoughtStage, setThoughtStage] = useState<'ready' | 'thinking' | 'synthesizing' | 'ready-again'>('ready');
  const [response, setResponse] = useState<ReactNode | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messageLog, setMessageLog] = useState<{ type: 'user' | 'ai'; content: ReactNode }[]>([]);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState('');
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [memory, setMemory] = useState<ExecutiveMemory>(() => loadMemory());
  const memoryRef = useRef(memory);
  const stateRef = useRef<ConversationState>(createState());
  const prevOpenRef = useRef(false);
  const { language } = useLanguage();
  const isAR = language === 'ar';
  const { prefersReducedMotion: rm } = useMotion();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { journey } = useJourney();

  // Journey-aware quick actions: lead with the selected journey's focus service.
  const quickActions = useMemo<{ id: string; icon: typeof Brain; label: { en: string; ar: string }; color?: string }[]>(() => {
    const meta = journey ? journeyMeta(journey) : null;
    if (!meta) return BASE_QUICK_ACTIONS;
    return [
      { id: 'journeyFocus', icon: Compass, label: meta.service.label, color: meta.color },
      ...BASE_QUICK_ACTIONS,
    ];
  }, [journey]);

  // Keep the selected journey in the executive memory profile.
  useEffect(() => {
    if (journey === memoryRef.current.journey) return;
    const next = { ...memoryRef.current };
    next.journey = journey ?? undefined;
    updateMemory(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey]);

  const updateMemory = useCallback((next: ExecutiveMemory) => {
    memoryRef.current = next;
    setMemory(next);
    persistMemory(next);
  }, []);

  useEffect(() => {
    if (open && !prevOpenRef.current && memoryRef.current.name) {
      const greeting = isAR
        ? `مرحباً بعودتك، ${memoryRef.current.name}. كيف يمكنني مساعدتك اليوم؟`
        : `Welcome back, ${memoryRef.current.name}. How can I help you today?`;
      setMessageLog(prev => [...prev, { type: 'ai', content: <span style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111' }}>{greeting}</span> }]);
    }
    prevOpenRef.current = open;
  }, [open, isAR]);

  const siteLang = isAR ? 'ar-SA' : 'en-US';
  const {
    supported: ttsSupported, speaking: ttsSpeaking, settings: voiceSettings,
    speak: speakText, stop: stopSpeech, update: updateVoiceSettings,
  } = useTTS(siteLang);
  const voiceLang = voiceSettings.langAuto
    ? siteLang
    : (typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('ar') ? 'ar-SA' : 'en-US');
  const { supported: micSupported, listening: isListening, error: voiceError, start: startVoice, stop: stopVoice } = useSpeechRecognition(voiceLang);

  const avatarState: 'idle' | 'listening' | 'thinking' | 'speaking' =
    isListening ? 'listening'
    : thoughtStage === 'thinking' || thoughtStage === 'synthesizing' ? 'thinking'
    : thoughtStage === 'ready-again' ? 'speaking'
    : 'idle';

  useEffect(() => {
    signalAIDockAvailable(true);
    return () => signalAIDockAvailable(false);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('xvi:ai-dock-state', { detail: { open } }));
  }, [open]);

  const soundPrevOpenRef = useRef(false);
  useEffect(() => {
    if (soundPrevOpenRef.current !== open) {
      soundPrevOpenRef.current = open;
      playSound(open ? 'dockOpen' : 'dockClose');
    }
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('xvi:voice-state', {
      detail: {
        listening: isListening,
        speaking: ttsSpeaking,
        thinking: thoughtStage === 'thinking' || thoughtStage === 'synthesizing',
      },
    }));
  }, [isListening, ttsSpeaking, thoughtStage]);

  useEffect(() => {
    if (!open) stopSpeech();
  }, [open, stopSpeech]);

  useEffect(() => {
    if (!voiceNotice) return;
    const t = setTimeout(() => setVoiceNotice(null), 5200);
    return () => clearTimeout(t);
  }, [voiceNotice]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('xvi:open-ai-dock', handler);
    return () => window.removeEventListener('xvi:open-ai-dock', handler);
  }, []);

  useEffect(() => {
    if (showResponse && lastSpeechText && voiceSettings.autoSpeak && voiceSettings.replies && voiceSettings.enabled && !voiceSettings.mute) {
      speakText(lastSpeechText, { lang: voiceLang });
    }
  }, [showResponse, lastSpeechText, voiceSettings, speakText, voiceLang]);

  const simulateThinking = useCallback((responseContent: ReactNode) => {
    setThoughtStage('thinking');
    setShowResponse(false);
    setResponse(responseContent);
    playSound('aiThink');
    setTimeout(() => setThoughtStage('synthesizing'), 1200);
    setTimeout(() => {
      setThoughtStage('ready-again');
      setShowResponse(true);
      playSound('aiRespond');
    }, 2400);
  }, []);

  const handleAction = useCallback((actionId: string) => {
    const action = allActions.find(a => a.id === actionId);
    if (!action) return;

    const question = isAR ? action.label.ar : action.label.en;
    const userMsg = <span style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111' }}>{question}</span>;

    let aiResponse: ReactNode;
    const cmn = { fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', marginBottom: 12 };

    switch (actionId) {
      case 'strategy':
        aiResponse = <div><div style={cmn}>Based on your context, I recommend a phased transformation strategy.</div><StrategyCard /></div>;
        break;
      case 'solutions':
        aiResponse = (
          <div>
            <div style={cmn}>Our advisory services cover the full transformation lifecycle:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {services.map((s) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f7f6f3', borderRadius: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(200,166,90,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#C8A65A' }}>
                    <s.icon size={14} />
                  </div>
                  <div>
                    <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111' }}>{isAR ? s.title.ar : s.title.en}</div>
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 2 }}>{isAR ? s.desc.ar : s.desc.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'roadmap':
        aiResponse = <div><div style={cmn}>Here is a sample AI transformation roadmap tailored for enterprise:</div><RoadmapCard /></div>;
        break;
      case 'readiness':
        aiResponse = (
          <div>
            <div style={cmn}>I recommend evaluating these readiness dimensions:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {readinessChecks.map((check, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#f7f6f3', borderRadius: 8 }}>
                  <CheckCircle2 size={14} style={{ color: '#C8A65A', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 500, color: '#111' }}>{isAR ? check.ar : check.en}</div>
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999' }}>{isAR ? check.desc.ar : check.desc.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'pricing':
        aiResponse = (
          <div>
            <div style={cmn}>Our pricing is structured around engagement type:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { type: 'Advisory Retainer', desc: 'Ongoing strategic guidance', range: 'Monthly engagement' },
                { type: 'Project-Based', desc: 'Defined scope and deliverables', range: '4-12 weeks' },
                { type: 'Transformation Program', desc: 'End-to-end AI transformation', range: '3-6 months' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '10px 12px', background: '#f7f6f3', borderRadius: 8 }}>
                  <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111' }}>{item.type}</div>
                  <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 2 }}>{item.desc}</div>
                  <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#C8A65A', marginTop: 2, fontWeight: 500 }}>{item.range}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'deliverables':
        aiResponse = (
          <div>
            <div style={cmn}>Executive deliverables include:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'AI Strategy Document', desc: 'Comprehensive AI vision, objectives, and phased roadmap' },
                { name: 'Technology Assessment', desc: 'Current state analysis and target architecture' },
                { name: 'ROI Analysis', desc: 'Projected returns for each AI initiative' },
                { name: 'Governance Framework', desc: 'Policies, ethics, and risk management' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#f7f6f3', borderRadius: 8 }}>
                  <FileText size={14} style={{ color: '#C8A65A', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 500, color: '#111' }}>{item.name}</div>
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'automation':
        aiResponse = (
          <div>
            <div style={cmn}>Automation opportunity scan results:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px 10px', alignItems: 'center', padding: '4px 8px', background: '#f7f6f3', borderRadius: 8 }}>
              <div style={{ fontFamily: font, fontSize: '0.625rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Process</div>
              <div style={{ fontFamily: font, fontSize: '0.625rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Impact</div>
              <div style={{ fontFamily: font, fontSize: '0.625rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Effort</div>
              {automationOpps.map((opp, i) => (
                <Fragment key={i}>
                  <div style={{ fontFamily: font, fontSize: '0.75rem', color: '#111' }}>{isAR ? opp.ar : opp.en}</div>
                  <div style={{ fontFamily: font, fontSize: '0.6875rem', color: opp.impact === 'High' ? '#2D6A4F' : '#666', fontWeight: 500 }}>{opp.impact}</div>
                  <div style={{ fontFamily: font, fontSize: '0.6875rem', color: opp.effort === 'Low' ? '#2D6A4F' : opp.effort === 'Medium' ? '#D4A017' : '#666', fontWeight: 500 }}>{opp.effort}</div>
                </Fragment>
              ))}
            </div>
          </div>
        );
        break;
      case 'timeline':
        aiResponse = (
          <div>
            <div style={cmn}>Typical AI transformation timeline:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: '4px 8px', background: '#f7f6f3', borderRadius: 8 }}>
              {[
                { week: 'Week 1-2', activity: 'Discovery & Assessment' },
                { week: 'Week 3-4', activity: 'Strategy Development' },
                { week: 'Week 5-8', activity: 'Architecture & Design' },
                { week: 'Week 9-12', activity: 'Pilot Development' },
                { week: 'Week 13-16', activity: 'Testing & Validation' },
                { week: 'Week 17-20', activity: 'Production Deployment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                  <div style={{ minWidth: 68, fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#C8A65A', flexShrink: 0 }}>{item.week}</div>
                  <div style={{ fontFamily: font, fontSize: '0.75rem', color: '#111' }}>{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'reports':
        aiResponse = <div><div style={cmn}>Here is an executive dashboard preview:</div><KpiCard /></div>;
        break;
      case 'journeyFocus': {
        const meta = journeyMeta(memoryRef.current.journey as JourneyId | null);
        if (meta) {
          aiResponse = (
            <div>
              <div style={cmn}>{isAR ? meta.prompt.ar : meta.prompt.en}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f7f6f3', borderRadius: 8, border: `1px solid ${meta.color}22` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${meta.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: meta.color }}>
                    <Compass size={14} />
                  </div>
                  <div>
                    <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111' }}>{isAR ? meta.label.ar : meta.label.en}</div>
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 2 }}>
                      {isAR ? meta.service.label.ar : meta.service.label.en} · {isAR ? meta.caseTitle.ar : meta.caseTitle.en}
                    </div>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => navigate(meta.service.to)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '10px 14px', background: meta.color, color: '#fff', border: 'none',
                    borderRadius: 8, cursor: 'pointer', fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
                    transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <ArrowRight size={14} />
                  {isAR ? meta.service.label.ar : meta.service.label.en}
                </motion.button>
              </div>
            </div>
          );
        } else {
          aiResponse = <div style={cmn}>Tell me which journey you would like to focus on first.</div>;
        }
        break;
      }
      case 'recommend':
        aiResponse = (
          <div>
            <div style={cmn}>{isAR ? 'دعني أوصيك بأفضل حل لمؤسستك.' : 'Let me recommend the best solution for your organization.'}</div>
            <RecommendationCard memory={memoryRef.current} isAR={isAR} />
          </div>
        );
        break;
      default:
        aiResponse = <div style={cmn}>I'm ready to frame the next strategic decision. Please select a domain.</div>;
    }

    const prevMem = memoryRef.current;
    const lastRec = prevMem.recommendations[prevMem.recommendations.length - 1];
    let recLabel = isAR ? action.label.ar : action.label.en;
    if (actionId === 'recommend') {
      const recMeta = journeyMeta(prevMem.journey as JourneyId | null);
      if (recMeta) recLabel = isAR ? recMeta.service.label.ar : recMeta.service.label.en;
    }
    if (lastRec !== recLabel) {
      updateMemory({ ...prevMem, recommendations: [...prevMem.recommendations, recLabel].slice(-10) });
    }

    setMessageLog(prev => [...prev, { type: 'user', content: userMsg }]);
    setLastSpeechText(ACTION_SPEECH[actionId]?.[isAR ? 'ar' : 'en'] || '');
    simulateThinking(aiResponse);
  }, [isAR, simulateThinking, navigate, updateMemory]);

  const submitQuery = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    const userMsg = <span style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111' }}>{q}</span>;

    const learned = extractMemory(q);
    const learnedFields = hasLearnedFields(learned);
    const memoryAsk = !learnedFields && isMemoryAsk(q);

    const prev = memoryRef.current;
    const merged: ExecutiveMemory = {
      name: learned.name || prev.name,
      company: learned.company || prev.company,
      industry: learned.industry || prev.industry,
      goal: learned.goal || prev.goal,
      journey: prev.journey,
      questions: [...prev.questions, q].slice(-20),
      recommendations: prev.recommendations,
    };

    const match = findContentMatch(q);
    const recommendIntent =
      /\b(recommend(ation|s|ed)?|advise|suggest(ion)?|what should (i|we)|best solution|best path)\b/i.test(q) ||
      /(أوصي|نصيحة|تنصح|توصي(ة|ة)|ماذا تنصح|أفضل حل|أنسب مسار)/.test(q);

    const classify = classifyInput(q);
    const conv = stateRef.current;
    const inIntake =
      conv.stage === 'intake-industry' ||
      conv.stage === 'intake-goal' ||
      conv.stage === 'intake-timeline' ||
      conv.stage === 'intake-size';

    const ackLines: string[] = [];
    const ackNodeParts: ReactNode[] = [];
    if (learned.name) {
      ackLines.push(isAR ? `سعدت بلقائك، ${learned.name}.` : `Nice to meet you, ${learned.name}.`);
      ackNodeParts.push(
        <div key="name" style={{ color: '#111', fontWeight: 600 }}>
          {isAR ? `سعدت بلقائك، ${learned.name} 👋` : `Nice to meet you, ${learned.name} 👋`}
        </div>
      );
    }
    if (learned.company) {
      ackLines.push(isAR ? `فهمت أنك تعمل في ${learned.company}.` : `Got it — ${learned.company}.`);
      ackNodeParts.push(
        <div key="company" style={{ color: '#666' }}>
          {isAR ? `سجّلت شركتك: ${learned.company}` : `I've noted your company: ${learned.company}`}
        </div>
      );
    }
    if (learned.industry) {
      ackLines.push(isAR ? `سجّلت القطاع: ${learned.industry}.` : `Noted: ${learned.industry} sector.`);
      ackNodeParts.push(
        <div key="industry" style={{ color: '#666' }}>
          {isAR ? `قطاعك: ${learned.industry}` : `Your sector: ${learned.industry}`}
        </div>
      );
    }
    if (learned.goal) {
      ackLines.push(isAR ? `تذكرت هدفك: ${learned.goal}.` : `Understood — goal: ${learned.goal}.`);
      ackNodeParts.push(
        <div key="goal" style={{ color: '#666' }}>
          {isAR ? `هدفك: ${learned.goal}` : `Your goal: ${learned.goal}`}
        </div>
      );
    }

    let aiResponse: ReactNode;
    let speechText: string;
    let recommendation: string | undefined;

    const matchBody = (entry: ContentEntry) => {
      const resp = entry.response(isAR);
      recommendation = isAR ? (entry.cta?.label?.ar || entry.keywords[0]) : (entry.cta?.label?.en || entry.keywords[0]);
      return (
        <div>
          <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', marginBottom: 12, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {resp}
          </div>
          {entry.cta && (
            <a
              href={entry.cta.to}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', background: '#132238', color: '#fff',
                borderRadius: 999, textDecoration: 'none',
                fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 12px rgba(19,34,56,0.15)',
                marginTop: 8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#c8a65a'; e.currentTarget.style.color = '#132238'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#132238'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'none'; }}
            >
              {isAR ? entry.cta.label.ar : entry.cta.label.en}
            </a>
          )}
          <PersonaSignature isAR={isAR} />
        </div>
      );
    };

    const textBlock = (text: string) => (
      <div>
        <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {text}
        </div>
        <PersonaSignature isAR={isAR} />
      </div>
    );

    if (memoryAsk) {
      const summary = [
        merged.name ? `${isAR ? 'الاسم' : 'Name'}: ${merged.name}` : '',
        merged.company ? `${isAR ? 'الشركة' : 'Company'}: ${merged.company}` : '',
        merged.industry ? `${isAR ? 'القطاع' : 'Industry'}: ${merged.industry}` : '',
        merged.goal ? `${isAR ? 'الهدف' : 'Goal'}: ${merged.goal}` : '',
      ].filter(Boolean);
      const counts = isAR
        ? `سجّلت ${merged.questions.length} سؤالاً و${merged.recommendations.length} توصية خلال هذه الجلسة.`
        : `I've recorded ${merged.questions.length} question${merged.questions.length === 1 ? '' : 's'} and ${merged.recommendations.length} recommendation${merged.recommendations.length === 1 ? '' : 's'} this session.`;
      const body = summary.length
        ? (isAR ? `أتذكر: ${summary.join(' · ')}` : `I remember: ${summary.join(' · ')}`)
        : (isAR ? 'لم أقم بحفظ أي تفاصيل بعد. أخبرني باسمك أو شركتك أو أهدافك وسأحتفظ بها لهذه الجلسة.' : "I don't have any session details saved yet. Tell me your name, company, or goals and I'll remember them for this session.");
      speechText = `${body}. ${counts}`;
      aiResponse = (
        <div>
          <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', lineHeight: 1.7 }}>
            <div style={{ color: '#111', fontWeight: 600, marginBottom: 4 }}>
              {isAR ? 'ذاكرة الجلسة' : 'Session Memory'}
            </div>
            <div style={{ whiteSpace: 'pre-line' }}>{body}</div>
            <div style={{ color: '#999', marginTop: 4, fontSize: '0.6875rem' }}>{counts}</div>
          </div>
          <PersonaSignature isAR={isAR} />
        </div>
      );
    } else if (inIntake) {
      const recorded: ConversationState = { ...conv, exchanges: conv.exchanges + 1 };
      switch (conv.stage) {
        case 'intake-industry': recorded.industry = q; break;
        case 'intake-goal': recorded.goal = q; break;
        case 'intake-timeline': recorded.timeline = q; break;
        case 'intake-size': recorded.size = q; break;
      }
      const nextState = advanceIntake(recorded);
      stateRef.current = nextState;

      if (nextState.stage === 'consult') {
        const parts = [
          recorded.industry ? (isAR ? `القطاع: ${recorded.industry}` : `industry: ${recorded.industry}`) : null,
          recorded.goal ? (isAR ? `الهدف: ${recorded.goal}` : `goal: ${recorded.goal}`) : null,
          recorded.timeline ? (isAR ? `الإطار الزمني: ${recorded.timeline}` : `timeline: ${recorded.timeline}`) : null,
          recorded.size ? (isAR ? `الحجم: ${recorded.size}` : `size: ${recorded.size}`) : null,
        ].filter(Boolean).join(' · ');
        speechText = isAR
          ? `شكراً — أصبحت الصورة واضحة الآن: ${parts}. سأبني توصية مخصصة بناءً على ذلك. قبل أن أفعل، هل توجد نتيجة محددة تريد مني أن أعطيها الأولوية؟`
          : `Thank you — I now have a clear picture: ${parts}. I'll shape a tailored recommendation around this. Before I do, is there any specific outcome you want me to prioritize?`;
        aiResponse = textBlock(speechText);
      } else {
        const step = intakeQuestion(nextState, isAR ? 'ar' : 'en');
        speechText = isAR
          ? `ممتاز — سجّلت ذلك. ${step.question}`
          : `Great — noted. ${step.question}`;
        aiResponse = textBlock(speechText);
      }
    } else if (learnedFields) {
      if (match && match.score >= 2) {
        speechText = ackLines.join(' ') + ' ' + (typeof match.entry.response(isAR) === 'string' ? (match.entry.response(isAR) as string) : '');
        aiResponse = (
          <div>
            <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
              {ackNodeParts}
            </div>
            {matchBody(match.entry)}
          </div>
        );
      } else {
        speechText = ackLines.join(' ') + ' ' + (isAR
          ? 'سأحتفظ بهذه التفاصيل لهذه الجلسة، وأنا هنا لمساعدتك في أي قرار تنفيذي.'
          : "I've noted these details for our session, and I'm here for any executive decision you need help with.");
        aiResponse = (
          <div>
            <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', lineHeight: 1.7 }}>
              {ackNodeParts}
              <div style={{ color: '#999', marginTop: 6, fontSize: '0.6875rem' }}>
                {isAR
                  ? 'سأحتفظ بهذه التفاصيل لهذه الجلسة فقط.'
                  : "These details will be kept for this session only — they won't persist after you close the tab."}
              </div>
            </div>
            <PersonaSignature isAR={isAR} />
          </div>
        );
      }
    } else if (recommendIntent && !(match && match.score >= 2)) {
      const recMeta = journeyMeta(merged.journey as JourneyId | null);
      recommendation = recMeta
        ? (isAR ? recMeta.service.label.ar : recMeta.service.label.en)
        : (isAR ? 'استشارة تنفيذية' : 'Executive Consultation');
      speechText = isAR
        ? 'دعني أوصيك بأفضل حل لمؤسستك، بناءً على ما نعرفه عن أهدافك ومحور رحلتك.'
        : 'Let me recommend the best solution for your organization, based on what we know about your goals and journey focus.';
      aiResponse = (
        <div>
          <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', marginBottom: 4, lineHeight: 1.7 }}>
            {speechText}
          </div>
          <RecommendationCard memory={merged} isAR={isAR} />
          <PersonaSignature isAR={isAR} />
        </div>
      );
    } else if (match && match.score >= 2) {
      const entry = match.entry;
      const resp = entry.response(isAR);
      speechText = typeof resp === 'string' ? resp : '';
      recommendation = isAR ? (entry.cta?.label?.ar || entry.keywords[0]) : (entry.cta?.label?.en || entry.keywords[0]);
      aiResponse = matchBody(entry);
    } else if (classify.intent === 'project' && classify.projectType) {
      const nextState = beginIntake(conv, classify.projectType);
      stateRef.current = nextState;
      const label = classify.projectLabel ? (isAR ? classify.projectLabel.ar : classify.projectLabel.en) : null;
      const step = intakeQuestion(nextState, isAR ? 'ar' : 'en');
      speechText = label
        ? isAR
          ? `فهمت — تخطط لإنشاء ${label}. ${step.question}`
          : `Got it — you're planning ${/^[aeiou]/i.test(label) ? 'an' : 'a'} ${label}. ${step.question}`
        : step.question;
      aiResponse = textBlock(speechText);
    } else {
      speechText = isAR
        ? 'شكراً لسؤالك. لم أجد إجابة محددة في قاعدة معرفتنا. يمكننا تحويل طلبك إلى فريق الاستشارات لدينا.'
        : 'Thank you for your question. I couldn\'t find a specific answer in our knowledge base. I can forward your request to our consulting team.';
      aiResponse = (
        <div>
          <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', marginBottom: 12, lineHeight: 1.7 }}>
            {isAR
              ? 'شكراً لسؤالك. لم أجد إجابة محددة في قاعدة معرفتنا. يمكننا تحويل طلبك إلى فريق الاستشارات لدينا.'
              : 'Thank you for your question. I couldn\'t find a specific answer in our knowledge base. I can forward your request to our consulting team.'}
          </div>
          <WhatsAppFallback query={q} isAR={isAR} />
          <button
            onClick={() => navigate('/contact')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
              padding: '10px 20px', background: 'transparent', color: '#132238',
              borderRadius: 999, border: '1px solid rgba(200,166,90,0.2)',
              fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,166,90,0.08)'; e.currentTarget.style.borderColor = '#c8a65a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,166,90,0.2)'; }}
          >
            {isAR ? 'تواصل معنا ←' : 'Contact Us →'}
          </button>
          <PersonaSignature isAR={isAR} />
        </div>
      );
    }

    if (recommendation) {
      const recs = prev.recommendations;
      if (recs[recs.length - 1] !== recommendation) {
        merged.recommendations = [...recs, recommendation].slice(-10);
      }
    }

    updateMemory(merged);
    setMessageLog(prev => [...prev, { type: 'user', content: userMsg }]);
    setInputValue('');
    setLastSpeechText(speechText);
    simulateThinking(aiResponse);
  }, [simulateThinking, isAR, updateMemory]);

  const handleInputSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    submitQuery(inputValue);
  }, [inputValue, submitQuery]);

  const handleVoiceResult = useCallback((text: string) => {
    setInputValue(text);
    submitQuery(text);
  }, [submitQuery]);

  const manualStopRef = useRef(false);

  const handleVoiceInterim = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  const handleVoiceEnd = useCallback((hadResult: boolean) => {
    if (manualStopRef.current) {
      manualStopRef.current = false;
      return;
    }
    if (!hadResult) {
      setVoiceNotice(isAR
        ? 'لم أسمع أي صوت. اضغط على الميكروفون وحاول مرة أخرى.'
        : 'No speech detected. Tap the mic and try again.');
    }
  }, [isAR]);

  const handleMicClick = useCallback(() => {
    if (!micSupported) {
      setVoiceNotice(isAR
        ? 'الصوت غير مدعوم في هذا المتصفح. يمكنك الكتابة مباشرة وسنتولى الباقي.'
        : 'Voice input isn\'t supported in this browser. You can type your question and we\'ll take it from there.');
      return;
    }
    if (isListening) {
      manualStopRef.current = true;
      stopVoice();
      return;
    }
    startVoice({ onInterim: handleVoiceInterim, onResult: handleVoiceResult, onEnd: handleVoiceEnd });
  }, [micSupported, isListening, stopVoice, startVoice, handleVoiceResult, handleVoiceInterim, handleVoiceEnd, isAR]);

  const statusText = thoughtStage === 'thinking'
    ? (isAR ? 'تفكير...' : 'Thinking…')
    : thoughtStage === 'synthesizing'
    ? (isAR ? 'جاري تجميع الموجز التنفيذي...' : 'Synthesizing your executive brief…')
    : (isAR ? 'جاهز لصياغة القرار التالي' : "I'm ready to frame the next strategic decision.");

  const statusColor = thoughtStage === 'thinking' ? '#c8a65a' : thoughtStage === 'synthesizing' ? '#d4b76e' : '#2D6A4F';

  const handleToggle = useCallback(() => {
    setOpen((p) => !p);
    if (!open) {
      setThoughtStage('ready');
      setShowResponse(false);
      setResponse(null);
      setMessageLog([]);
      stateRef.current = createState();
    }
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 598,
              background: 'rgba(17,17,17,0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Dock bar — hidden on Hero page (functionality accessible via floating robot only) */}
      {!hideDock && (
      <motion.div
        layout
        style={{
          position: 'fixed', bottom: 24, left: '50%', zIndex: 601,
          x: '-50%',
          maxWidth: 'calc(100vw - 16px)',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          border: '1px solid rgba(200,166,90,0.12)',
          borderRadius: 999,
          boxShadow: '0 8px 32px rgba(17,17,17,0.06), 0 1px 2px rgba(17,17,17,0.04), 0 0 40px rgba(200,166,90,0.02), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
      >
          <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label={isAR ? 'فتح المستشار التنفيذي' : 'Open Executive AI'}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px 6px 6px',
            border: 'none', cursor: 'pointer',
            borderRadius: 999,
            background: open
              ? 'linear-gradient(135deg, rgba(200,166,90,0.15), rgba(200,166,90,0.04))'
              : 'linear-gradient(135deg, rgba(200,166,90,0.08), rgba(200,166,90,0.02))',
            fontFamily: font, fontSize: '0.75rem',
            fontWeight: 600, color: '#111111', letterSpacing: '0.02em',
            transition: 'background 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #ffffff, #c8a65a 45%, #8a7040 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#132238', fontSize: 18, fontWeight: 700,
              boxShadow: '0 2px 8px rgba(200,166,90,0.15)',
            }}>X</div>
            <motion.div
              style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.12)' }}
              animate={rm ? { opacity: 0.3 } : { scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: rm ? 0 : Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.05)' }}
              animate={rm ? { opacity: 0.15 } : { scale: [1, 1.04, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 3.5, repeat: rm ? 0 : Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
            {isAR ? 'المستشار التنفيذي' : 'Executive AI'}
          </span>
          {open ? <X size={12} style={{ color: '#999' }} /> : <Sparkles size={12} style={{ color: '#C8A65A' }} />}
        </motion.button>
      </motion.div>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', bottom: 100, left: '50%', zIndex: 601,
              x: '-50%',
              width: 480, maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'min(70vh, calc(100vh - 190px))',
              background: 'rgba(255,255,255,0.985)',
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
              borderRadius: 28,
              boxShadow:
                '0 40px 120px rgba(17,17,17,0.12), 0 8px 24px rgba(17,17,17,0.04), 0 0 100px rgba(200,166,90,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Holographic border overlay */}
            <motion.div
              style={{
                position: 'absolute', inset: 0, borderRadius: 28,
                pointerEvents: 'none', zIndex: 1,
                background: 'linear-gradient(135deg, rgba(200,166,90,0.08) 0%, transparent 50%, rgba(200,166,90,0.04) 100%)',
              }}
              animate={rm ? { opacity: 0.3 } : { opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: rm ? 0 : Infinity, ease: 'easeInOut' }}
            />

            {/* Top glow */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.2), transparent)',
              pointerEvents: 'none', zIndex: 2,
            }} />

            {/* Gold corner ornaments */}
            {(['tl', 'br'] as const).map((pos) => (
              <motion.div
                key={pos}
                data-testid={`xvi-dock-corner-${pos}`}
                style={{
                  position: 'absolute',
                  width: 26,
                  height: 26,
                  top: pos === 'tl' ? 0 : undefined,
                  left: pos === 'tl' ? 0 : undefined,
                  bottom: pos === 'br' ? 0 : undefined,
                  right: pos === 'br' ? 0 : undefined,
                  borderTopLeftRadius: pos === 'tl' ? 28 : 0,
                  borderBottomRightRadius: pos === 'br' ? 28 : 0,
                  borderTop: pos === 'tl' ? '1.5px solid rgba(200,166,90,0.4)' : 'none',
                  borderLeft: pos === 'tl' ? '1.5px solid rgba(200,166,90,0.4)' : 'none',
                  borderBottom: pos === 'br' ? '1.5px solid rgba(200,166,90,0.4)' : 'none',
                  borderRight: pos === 'br' ? '1.5px solid rgba(200,166,90,0.4)' : 'none',
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
                animate={rm ? { opacity: 0.7 } : { opacity: [0.45, 0.95, 0.45] }}
                transition={{ duration: 5, repeat: rm ? 0 : Infinity, ease: 'easeInOut', delay: 1 }}
              />
            ))}

            {/* Scan line */}
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 0.5,
                background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.1), transparent)',
                pointerEvents: 'none', zIndex: 1,
              }}
              animate={rm ? { opacity: 0 } : { top: ['-1%', '101%'] }}
              transition={{ duration: 8, repeat: rm ? 0 : Infinity, ease: 'easeInOut' }}
            />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 20px', borderBottom: '1px solid rgba(17,17,17,0.03)',
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              position: 'relative', zIndex: 2,
            }}>
              <AIAvatar state={avatarState} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', color: '#111111', textTransform: 'uppercase' }}>
                  {isAR ? 'المستشار الذكي' : 'XVI EXECUTIVE AI'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <motion.span
                    style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: statusColor }}
                    animate={rm ? { scale: 1 } : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: rm ? 0 : Infinity }}
                  />
                  <span style={{ fontFamily: font, fontSize: '0.5625rem', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {isAR ? 'الذكاء التنفيذي · إشارة صوتية' : 'Executive Intelligence · VOICE SIGNAL'}
                  </span>
                </div>
              </div>
              {thoughtStage !== 'ready' && thoughtStage !== 'ready-again' && (
                <VoiceWaveform />
              )}
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1, color: '#111111', background: 'rgba(200,166,90,0.08)' }}
                whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: 6, borderRadius: '50%', transition: 'all 0.3s ease' }}
              >
                <X size={14} />
              </motion.button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {/* Session memory chips */}
              {(memory.name || memory.company || memory.industry || memory.goal || memory.journey) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 12 }}
                >
                  {memory.journey && (() => {
                    const meta = journeyMeta(memory.journey as JourneyId);
                    if (!meta) return null;
                    return (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(200,166,90,0.08)', border: '1px solid rgba(200,166,90,0.14)', borderRadius: 999, fontFamily: font, fontSize: '0.625rem', fontWeight: 600, color: meta.color }}>
                        <Compass size={11} /> {isAR ? meta.label.ar : meta.label.en}
                      </span>
                    );
                  })()}
                  {memory.name && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(200,166,90,0.08)', border: '1px solid rgba(200,166,90,0.14)', borderRadius: 999, fontFamily: font, fontSize: '0.625rem', fontWeight: 500, color: '#8a7040' }}>
                      <User size={11} /> {memory.name}
                    </span>
                  )}
                  {memory.company && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(200,166,90,0.08)', border: '1px solid rgba(200,166,90,0.14)', borderRadius: 999, fontFamily: font, fontSize: '0.625rem', fontWeight: 500, color: '#8a7040' }}>
                      <Briefcase size={11} /> {memory.company}
                    </span>
                  )}
                  {memory.industry && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(200,166,90,0.08)', border: '1px solid rgba(200,166,90,0.14)', borderRadius: 999, fontFamily: font, fontSize: '0.625rem', fontWeight: 500, color: '#8a7040' }}>
                      <Activity size={11} /> {memory.industry}
                    </span>
                  )}
                  {memory.goal && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(200,166,90,0.08)', border: '1px solid rgba(200,166,90,0.14)', borderRadius: 999, fontFamily: font, fontSize: '0.625rem', fontWeight: 500, color: '#8a7040' }}>
                      <Target size={11} /> {memory.goal}
                    </span>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => updateMemory({ questions: [], recommendations: [] })}
                    whileHover={{ color: '#b45309' }}
                    aria-label={isAR ? 'مسح الذاكرة' : 'Clear session memory'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: 'none', border: '1px solid rgba(17,17,17,0.08)', borderRadius: 999, cursor: 'pointer', fontFamily: font, fontSize: '0.625rem', color: '#999', transition: 'all 0.2s ease' }}
                  >
                    <X size={10} />
                    {isAR ? 'مسح الذاكرة' : 'Clear memory'}
                  </motion.button>
                </motion.div>
              )}

              {/* Message log */}
              {messageLog.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  style={{
                    display: 'flex', gap: 10, marginBottom: 12,
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    padding: '10px 14px',
                    background: msg.type === 'user' ? 'rgba(200,166,90,0.08)' : 'transparent',
                    borderRadius: msg.type === 'user' ? '14px 14px 4px 14px' : 0,
                    maxWidth: '85%',
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Thinking state */}
              {thoughtStage !== 'ready' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginBottom: 12 }}
                >
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    padding: '10px 14px', background: 'rgba(200,166,90,0.03)',
                    borderRadius: 12, border: '1px solid rgba(200,166,90,0.06)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <motion.div
                        style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: '2px solid rgba(200,166,90,0.15)',
                          borderTopColor: '#c8a65a', flexShrink: 0,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      />
                      <span style={{ fontFamily: font, fontSize: '0.75rem', color: '#666' }}>
                        {isAR && thoughtStage === 'thinking' ? 'تفكير' : ''}
                        {thoughtStage === 'thinking' ? (isAR ? '' : 'Thinking') : ''}
                        {thoughtStage === 'synthesizing' ? (isAR ? 'جاري تجميع الموجز التنفيذي' : 'Synthesizing your executive brief') : ''}
                        <ThinkingDots />
                      </span>
                    </div>
                    <motion.div
                      style={{
                        height: 1, borderRadius: 1,
                        background: 'linear-gradient(90deg, transparent, #c8a65a, transparent)',
                      }}
                      animate={rm ? { opacity: 0.4 } : { opacity: [0.1, 0.5, 0.1], scaleX: [0.9, 1, 0.9] }}
                      transition={{ duration: 2, repeat: rm ? 0 : Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* AI response */}
              <AnimatePresence>
                {showResponse && response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{ marginBottom: 16 }}
                  >
                    <div style={{
                      padding: '12px 14px', background: '#ffffff',
                      borderRadius: 14,
                      border: '1px solid rgba(200,166,90,0.12)',
                      boxShadow: '0 4px 20px rgba(200,166,90,0.04), 0 1px 2px rgba(0,0,0,0.03), inset 0 1px 0 rgba(200,166,90,0.02)',
                    }}>
                      {response}
                    </div>
                    {lastSpeechText && !voiceSettings.autoSpeak && voiceSettings.replies && voiceSettings.enabled && !voiceSettings.mute && ttsSupported && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                        <motion.button
                          type="button"
                          onClick={() => speakText(lastSpeechText, { lang: voiceLang })}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={isAR ? 'استمع إلى الرد' : 'Listen to reply'}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '6px 12px',
                            background: ttsSpeaking ? 'rgba(200,166,90,0.18)' : 'rgba(200,166,90,0.06)',
                            border: '1px solid rgba(200,166,90,0.2)',
                            borderRadius: 999, cursor: 'pointer',
                            color: '#a98a45',
                            fontFamily: font, fontSize: '0.6875rem', fontWeight: 600,
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <Volume2 size={13} />
                          {ttsSpeaking ? (isAR ? 'يتم التشغيل...' : 'Speaking…') : (isAR ? 'استمع' : 'Listen')}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick actions */}
              {thoughtStage === 'ready' || thoughtStage === 'ready-again' ? (
                <div>
                  {thoughtStage === 'ready' && (
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginBottom: 12, lineHeight: 1.6 }}>
                      {(() => {
                        const meta = journeyMeta(journey);
                        if (meta) return isAR ? meta.prompt.ar : meta.prompt.en;
                        return isAR
                          ? 'رفيق بصري للقرارات المعقدة، مصمم ليكون هادئاً ودقيقاً وقادراً على المساعدة.'
                          : 'A visual companion for complex decisions, designed to feel composed, informed, and quietly capable.';
                      })()}
                    </div>
                  )}
                  <motion.div
                    initial={rm ? false : 'hidden'}
                    animate={rm ? undefined : 'show'}
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                    }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
                  >
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.id}
                        variants={rm ? undefined : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                        onClick={() => handleAction(action.id)}
                        whileHover={{ y: -2, background: 'rgba(200,166,90,0.1)', borderColor: '#C8A65A' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          padding: '8px 14px',
                          background: action.id === 'journeyFocus' ? 'rgba(200,166,90,0.12)' : 'rgba(200,166,90,0.04)',
                          border: action.id === 'journeyFocus' ? '1px solid rgba(200,166,90,0.45)' : '1px solid rgba(200,166,90,0.08)',
                          borderRadius: 999,
                          cursor: 'pointer',
                          fontFamily: font, fontSize: '0.6875rem',
                          fontWeight: action.id === 'journeyFocus' ? 700 : 500,
                          color: '#111111',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        <action.icon size={12} style={{ color: action.color || '#C8A65A' }} />
                        {isAR ? action.label.ar : action.label.en}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              ) : null}

              {/* Status message */}
              <AnimatePresence>
                {(thoughtStage === 'ready' || thoughtStage === 'ready-again') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <motion.span
                      style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: '#C8A65A', flexShrink: 0 }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span style={{ fontFamily: font, fontSize: '0.625rem', color: '#999' }}>
                      {statusText}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 16px 16px',
              borderTop: '1px solid rgba(17,17,17,0.04)',
            }}>
              {showVoiceSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease }}
                  style={{ overflow: 'hidden', marginBottom: 8 }}
                >
                  <div style={{
                    border: '1px solid rgba(200,166,90,0.12)',
                    background: 'rgba(200,166,90,0.03)',
                    borderRadius: 12, padding: '8px 12px',
                  }}>
                    <div style={{ fontFamily: font, fontSize: '0.625rem', fontWeight: 700, color: '#132238', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {isAR ? 'إعدادات الصوت' : 'Voice Settings'}
                    </div>
                    {VOICE_SETTING_ROWS.map((row) => (
                      <VoiceToggleRow
                        key={row.key}
                        row={row}
                        settings={voiceSettings}
                        isAR={isAR}
                        onToggle={() => updateVoiceSettings({ [row.key]: !voiceSettings[row.key] } as Partial<VoiceSettings>)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              {isListening && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
                  <VoiceWaveform />
                  <span style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', fontWeight: 500 }}>
                    {isAR ? `الاستماع... (${voiceLang})` : `Listening... (${voiceLang})`}
                  </span>
                  <span style={{ fontFamily: font, fontSize: '0.625rem', color: '#c8a65a', fontWeight: 500 }}>
                    {isAR ? '· اضغط للإيقاف' : '· tap to stop'}
                  </span>
                </div>
              )}
              {ttsSpeaking && !isListening && !voiceError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
                  <Volume2 size={13} style={{ color: '#c8a65a', flexShrink: 0 }} />
                  <span style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', fontWeight: 500 }}>
                    {isAR ? 'جاري التحدث...' : 'Speaking…'}
                  </span>
                </div>
              )}
              {voiceError && !isListening && (voiceError === 'not-allowed' || voiceError === 'service-not-allowed' || voiceError === 'network' || voiceError === 'audio-capture') && (
                <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#b45309', paddingBottom: 8 }}>
                  {isAR ? 'تعذر الوصول إلى الميكروفون. حاول مرة أخرى.' : 'Microphone unavailable. Try again.'}
                </div>
              )}
              {voiceNotice && (
                <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', paddingBottom: 8 }}>
                  {voiceNotice}
                </div>
              )}
              <form onSubmit={handleInputSubmit} style={{ display: 'flex', gap: 8 }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isAR ? 'اكتب سؤالك...' : 'ask me anything...'}
                  style={{
                    flex: 1, padding: '10px 14px',
                    background: 'rgba(200,166,90,0.03)',
                    border: '1px solid rgba(200,166,90,0.1)',
                    borderRadius: 12, outline: 'none',
                    fontFamily: font, fontSize: '0.75rem', color: '#111',
                    transition: 'all 0.25s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8A65A'; e.target.style.boxShadow = '0 0 0 3px rgba(200,166,90,0.08)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(200,166,90,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
                <motion.button
                  type="button"
                  onClick={handleMicClick}
                  whileHover={micSupported ? { scale: 1.04 } : {}}
                  whileTap={micSupported ? { scale: 0.97 } : {}}
                  title={micSupported
                    ? (isListening
                      ? (isAR ? 'اضغط لإيقاف التسجيل' : 'Tap to stop listening')
                      : (isAR ? 'تحدث للكتابة' : 'Speak to write'))
                    : (isAR ? 'الصوت غير مدعوم في هذا المتصفح' : 'Voice not supported in this browser')}
                  aria-label={isAR ? 'تحدث للكتابة' : 'Speak to write'}
                  style={{
                    padding: '10px 12px',
                    background: !micSupported ? 'rgba(17,17,17,0.04)' : isListening ? 'rgba(200,166,90,0.18)' : 'rgba(200,166,90,0.06)',
                    border: !micSupported ? '1px solid rgba(17,17,17,0.08)' : isListening ? '1px solid #c8a65a' : '1px solid rgba(200,166,90,0.2)',
                    borderRadius: 12, cursor: micSupported ? 'pointer' : 'not-allowed',
                    color: !micSupported ? '#aaa' : isListening ? '#c8a65a' : '#a98a45',
                    display: 'flex', alignItems: 'center',
                    boxShadow: isListening ? '0 0 0 3px rgba(200,166,90,0.15)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                  animate={isListening ? (rm ? { scale: 1 } : { scale: [1, 1.08, 1] }) : { scale: 1 }}
                  transition={{ duration: 1, repeat: (isListening && !rm) ? Infinity : 0, ease: 'easeInOut' }}
                >
                  <Mic size={16} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowVoiceSettings((v) => !v)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  title={isAR ? 'إعدادات الصوت' : 'Voice settings'}
                  aria-label={isAR ? 'إعدادات الصوت' : 'Voice settings'}
                  style={{
                    padding: '10px 11px',
                    background: showVoiceSettings ? 'rgba(200,166,90,0.18)' : 'rgba(200,166,90,0.06)',
                    border: showVoiceSettings ? '1px solid #c8a65a' : '1px solid rgba(200,166,90,0.2)',
                    borderRadius: 12, cursor: 'pointer',
                    color: showVoiceSettings ? '#c8a65a' : '#a98a45',
                    display: 'flex', alignItems: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Settings2 size={16} />
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, background: '#d4b76e' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '10px 16px',
                    background: '#c8a65a', border: 'none',
                    borderRadius: 12, cursor: 'pointer',
                    color: '#132238', display: 'flex', alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(200,166,90,0.15)',
                  }}
                >
                  <ArrowRight size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
