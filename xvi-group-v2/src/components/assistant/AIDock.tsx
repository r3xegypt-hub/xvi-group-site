import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import type { ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { AIAvatar } from './AIAvatar';
import {
  Sparkles, Brain, X, BarChart3, Zap, FileText, Clock, CheckCircle2,
  ChevronRight, Users, Shield, TrendingUp, Target, Lightbulb, Map,
  Search, ArrowRight, Activity
} from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];
const font = "'Manrope', sans-serif";

type ConsultingView = 'overview' | 'services' | 'roadmap' | 'readiness' | 'pricing' | 'deliverables' | 'automation' | 'timeline' | 'strategy' | 'reports' | 'recommend';

type ActionId = 'strategy' | 'solutions' | 'roadmap' | 'readiness' | 'pricing' | 'deliverables' | 'automation' | 'timeline' | 'reports' | 'recommend';

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

function AnimatedOrb({ state = 'idle' }: { state?: 'idle' | 'listening' | 'thinking' | 'speaking' }) {
  return <AIAvatar state={state} />;
}

export function VoiceWaveform() {
  const bars = 16;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 16 }}>
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

function TypingCursor() {
  return (
    <motion.span
      style={{ display: 'inline-block', width: 2, height: 16, background: '#c8a65a', marginLeft: 2, verticalAlign: 'middle' }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const quickActions = [
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
];

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

export function AIDock() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ConsultingView>('overview');
  const [thoughtStage, setThoughtStage] = useState<'ready' | 'thinking' | 'synthesizing' | 'ready-again'>('ready');
  const avatarState: 'idle' | 'listening' | 'thinking' | 'speaking' =
    thoughtStage === 'thinking' || thoughtStage === 'synthesizing' ? 'thinking'
    : thoughtStage === 'ready-again' ? 'speaking'
    : 'idle';
  const [response, setResponse] = useState<ReactNode | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messageLog, setMessageLog] = useState<{ type: 'user' | 'ai'; content: ReactNode }[]>([]);
  const { language } = useLanguage();
  const isAR = language === 'ar';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  const simulateThinking = useCallback((responseContent: ReactNode) => {
    setThoughtStage('thinking');
    setShowResponse(false);
    setResponse(responseContent);
    setTimeout(() => setThoughtStage('synthesizing'), 1200);
    setTimeout(() => {
      setThoughtStage('ready-again');
      setShowResponse(true);
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
      case 'recommend':
        aiResponse = (
          <div>
            <div style={cmn}>Based on your context, I recommend connecting with our experts for a personalized consultation tailored to your industry, scale, and strategic objectives.</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {[
                { label: 'Financial Services', desc: 'Risk Intelligence' },
                { label: 'Public Sector', desc: 'Service Modernization' },
                { label: 'Enterprise', desc: 'Connected Intelligence' },
              ].map((rec, i) => (
                <div key={i} style={{ flex: 1, padding: '8px 10px', background: '#f7f6f3', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#111' }}>{rec.label}</div>
                  <div style={{ fontFamily: font, fontSize: '0.625rem', color: '#666', marginTop: 2 }}>{rec.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      default:
        aiResponse = <div style={cmn}>I'm ready to frame the next strategic decision. Please select a domain.</div>;
    }

    setMessageLog(prev => [...prev, { type: 'user', content: userMsg }]);
    simulateThinking(aiResponse);
  }, [isAR, simulateThinking]);

  const handleInputSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMsg = <span style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111' }}>{inputValue}</span>;
    const aiResponse = (
      <div>
        <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 500, color: '#666', marginBottom: 12 }}>
          Thank you for your question. I recommend scheduling a consultation with our executive team for a comprehensive analysis of <strong style={{ color: '#111' }}>{inputValue}</strong>. Our experts will provide a tailored strategy within 48 hours.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, padding: '10px 12px', background: '#132238', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#fff' }}>Book Consultation</div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: '#f7f6f3', borderRadius: 8, textAlign: 'center', border: '1px solid rgba(200,166,90,0.1)' }}>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#111' }}>Download Brief</div>
          </div>
        </div>
      </div>
    );
    setMessageLog(prev => [...prev, { type: 'user', content: userMsg }]);
    setInputValue('');
    simulateThinking(aiResponse);
  }, [inputValue, simulateThinking]);

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

      {/* Dock bar */}
      <motion.div
        layout
        style={{
          position: 'fixed', bottom: 24, left: '50%', zIndex: 601,
          transform: 'translateX(-50%)',
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
              animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.05)' }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>
            {isAR ? 'المستشار التنفيذي' : 'Executive AI'}
          </span>
          {open ? <X size={12} style={{ color: '#999' }} /> : <Sparkles size={12} style={{ color: '#C8A65A' }} />}
        </motion.button>
      </motion.div>

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
              transform: 'translateX(-50%)',
              width: 480, maxWidth: 'calc(100vw - 48px)',
              maxHeight: '70vh',
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
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top glow */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.2), transparent)',
              pointerEvents: 'none', zIndex: 2,
            }} />

            {/* Scan line */}
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 0.5,
                background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.1), transparent)',
                pointerEvents: 'none', zIndex: 1,
              }}
              animate={{ top: ['-1%', '101%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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
                      animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [0.9, 1, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick actions */}
              {thoughtStage === 'ready' || thoughtStage === 'ready-again' ? (
                <div>
                  {thoughtStage === 'ready' && (
                    <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginBottom: 12, lineHeight: 1.6 }}>
                      {isAR ? 'رفيق بصري للقرارات المعقدة، مصمم ليكون هادئاً ودقيقاً وقادراً على المساعدة.' : 'A visual companion for complex decisions, designed to feel composed, informed, and quietly capable.'}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.id}
                        onClick={() => handleAction(action.id)}
                        whileHover={{ y: -2, background: 'rgba(200,166,90,0.1)', borderColor: '#C8A65A' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          padding: '8px 14px',
                          background: 'rgba(200,166,90,0.04)',
                          border: '1px solid rgba(200,166,90,0.08)',
                          borderRadius: 999,
                          cursor: 'pointer',
                          fontFamily: font, fontSize: '0.6875rem',
                          fontWeight: 500, color: '#111111',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        <action.icon size={12} style={{ color: '#C8A65A' }} />
                        {isAR ? action.label.ar : action.label.en}
                      </motion.button>
                    ))}
                  </div>
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
