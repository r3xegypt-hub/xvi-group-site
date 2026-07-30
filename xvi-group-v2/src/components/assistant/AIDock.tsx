import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Sparkles, Brain, X, ArrowUpRight, BarChart3, Globe, Zap, MessageSquare, FileText, Clock, CheckCircle2, ChevronRight, Send, ArrowRight, Users, Shield, Map, TrendingUp, Target, Lightbulb } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];
const font = "'Manrope', sans-serif";

type ConversationState = 'idle' | 'menu' | 'service' | 'roadmap' | 'readiness' | 'pricing' | 'deliverables' | 'automation' | 'timeline' | 'strategy' | 'reports' | 'recommend';

interface Message {
  id: string;
  type: 'assistant' | 'user' | 'card';
  content: string;
  card?: React.ReactNode;
}

const services = [
  { id: 'strategy', icon: Brain, title: { en: 'AI Strategy', ar: 'استراتيجية الذكاء الاصطناعي' }, desc: { en: 'Define your AI vision and roadmap', ar: 'تحديد رؤيتك وخريطة طريق الذكاء الاصطناعي' } },
  { id: 'automation', icon: Zap, title: { en: 'Automation Architecture', ar: 'هندسة الأتمتة' }, desc: { en: 'Design intelligent automation systems', ar: 'تصميم أنظمة الأتمتة الذكية' } },
  { id: 'adoption', icon: Users, title: { en: 'Executive Adoption', ar: 'التبني التنفيذي' }, desc: { en: 'Enable leadership to champion AI', ar: 'تمكين القيادة من قيادة الت变革' } },
  { id: 'governance', icon: Shield, title: { en: 'AI Governance', ar: 'حوكمة الذكاء الاصطناعي' }, desc: { en: 'Build responsible AI frameworks', ar: 'بناء أطر ذكاء اصطناعي مسؤولة' } },
];

const readinessChecks = [
  { en: 'Data Infrastructure', ar: 'البنية التحتية للبيانات', desc: { en: 'Do you have centralized, clean data?', ar: 'هل لديك بيانات مركزة ونظيفة؟' } },
  { en: 'Executive Sponsorship', ar: 'الرعاية التنفيذية', desc: { en: 'Is there C-suite commitment?', ar: 'هل هناك التزام من المستوى التنفيذي؟' } },
  { en: 'Technical Talent', ar: 'الكفاءات التقنية', desc: { en: 'Do you have AI/ML engineers?', ar: 'هل لديك مهندسو ذكاء اصطناعي؟' } },
  { en: 'Use Case Clarity', ar: 'وضوح حالات الاستخدام', desc: { en: 'Are high-value problems identified?', ar: 'هل تم تحديد المشكلات عالية القيمة؟' } },
  { en: 'Change Readiness', ar: 'استعداد التغيير', desc: { en: 'Is the organization ready to adapt?', ar: 'هل المؤسسة مستعدة للتكيّف؟' } },
];

const automationOpps = [
  { en: 'Document Processing', ar: 'معالجة المستندات', impact: { en: 'High', ar: 'عالي' }, effort: { en: 'Low', ar: 'منخفض' } },
  { en: 'Customer Service', ar: 'خدمة العملاء', impact: { en: 'High', ar: 'عالي' }, effort: { en: 'Medium', ar: 'متوسط' } },
  { en: 'Financial Reporting', ar: 'التقارير المالية', impact: { en: 'Medium', ar: 'متوسط' }, effort: { en: 'Low', ar: 'منخفض' } },
  { en: 'Supply Chain', ar: 'سلسلة التوريد', impact: { en: 'High', ar: 'عالي' }, effort: { en: 'High', ar: 'عالي' } },
  { en: 'HR Processes', ar: 'عمليات الموارد البشرية', impact: { en: 'Medium', ar: 'متوسط' }, effort: { en: 'Medium', ar: 'متوسط' } },
];

function AIOrb({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={isOpen ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease }}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(200,166,90,0.15), rgba(200,166,90,0.05))',
        border: '1px solid rgba(200,166,90,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', cursor: 'pointer', color: '#C8A65A',
      }}
    >
      <Brain size={20} />
      <motion.div
        style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.08)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.04)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.div>
  );
}

const quickActions = [
  { id: 'services', icon: Brain, label: { en: 'Our Services', ar: 'خدماتنا' } },
  { id: 'roadmap', icon: Map, label: { en: 'Generate Roadmap', ar: 'إنشاء خارطة طريق' } },
  { id: 'readiness', icon: CheckCircle2, label: { en: 'AI Readiness', ar: 'استعداد الذكاء الاصطناعي' } },
  { id: 'pricing', icon: FileText, label: { en: 'Pricing Model', ar: 'نموذج التسعير' } },
  { id: 'deliverables', icon: BarChart3, label: { en: 'Deliverables', ar: 'المخرجات' } },
  { id: 'automation', icon: Zap, label: { en: 'Automation Scan', ar: 'فحص الأتمتة' } },
  { id: 'timeline', icon: Clock, label: { en: 'Project Timeline', ar: 'الجدول الزمني' } },
  { id: 'strategy', icon: Target, label: { en: 'Transformation Strategy', ar: 'استراتيجية التحول' } },
  { id: 'reports', icon: TrendingUp, label: { en: 'Executive Reports', ar: 'التقارير التنفيذية' } },
  { id: 'recommend', icon: Lightbulb, label: { en: 'Recommend Solution', ar: 'توصية حل' } },
];

function ServiceCard({ service, onClick }: { service: typeof services[0]; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, borderColor: 'rgba(200,166,90,0.3)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', background: 'rgba(200,166,90,0.03)',
        border: '1px solid rgba(200,166,90,0.08)', borderRadius: 12,
        cursor: 'pointer', textAlign: 'left', width: '100%',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(200,166,90,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#C8A65A' }}>
        <service.icon size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{service.title.en}</div>
        <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 2 }}>{service.desc.en}</div>
      </div>
      <ChevronRight size={14} style={{ color: '#C8A65A', flexShrink: 0 }} />
    </motion.button>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phases.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 48, fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#C8A65A', flexShrink: 0 }}>{p.phase}</div>
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

function ReadinessCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        AI Readiness Checklist
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {readinessChecks.map((check, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#f7f6f3', borderRadius: 8 }}>
            <CheckCircle2 size={14} style={{ color: '#C8A65A', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 500, color: '#111111' }}>{check.en}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999' }}>{check.desc.en}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Pricing Methodology
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { type: 'Advisory Retainer', desc: 'Ongoing strategic guidance', range: 'Monthly engagement' },
          { type: 'Project-Based', desc: 'Defined scope and deliverables', range: '4-12 weeks' },
          { type: 'Transformation Program', desc: 'End-to-end AI transformation', range: '3-6 months' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: '#f7f6f3', borderRadius: 8 }}>
            <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{item.type}</div>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 4 }}>{item.desc}</div>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#C8A65A', marginTop: 4, fontWeight: 500 }}>{item.range}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 12, fontStyle: 'italic' }}>
        Pricing is customized based on scope, complexity, and engagement duration.
      </div>
    </div>
  );
}

function DeliverablesCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Sample Executive Deliverables
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: 'AI Strategy Document', desc: 'Comprehensive AI vision, objectives, and phased roadmap' },
          { name: 'Technology Assessment', desc: 'Current state analysis and target architecture' },
          { name: 'ROI Analysis', desc: 'Projected returns for each AI initiative' },
          { name: 'Governance Framework', desc: 'Policies, ethics, and risk management' },
          { name: 'Implementation Playbook', desc: 'Step-by-step execution guide' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', background: '#f7f6f3', borderRadius: 8 }}>
            <FileText size={14} style={{ color: '#C8A65A', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 500, color: '#111111' }}>{item.name}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Automation Opportunity Scan
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px 12px', alignItems: 'center' }}>
        <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Process</div>
        <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Impact</div>
        <div style={{ fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>Effort</div>
        {automationOpps.map((opp, i) => (
          <React.Fragment key={i}>
            <div style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111111' }}>{opp.en}</div>
            <div style={{ fontFamily: font, fontSize: '0.75rem', color: opp.impact.en === 'High' ? '#2D6A4F' : '#666', fontWeight: 500 }}>{opp.impact.en}</div>
            <div style={{ fontFamily: font, fontSize: '0.75rem', color: opp.effort.en === 'Low' ? '#2D6A4F' : opp.effort.en === 'Medium' ? '#D4A017' : '#666', fontWeight: 500 }}>{opp.effort.en}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function TimelineCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Typical Project Timeline
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {[
          { week: 'Week 1-2', activity: 'Discovery & Assessment', color: '#C8A65A' },
          { week: 'Week 3-4', activity: 'Strategy Development', color: '#C8A65A' },
          { week: 'Week 5-8', activity: 'Architecture & Design', color: '#132238' },
          { week: 'Week 9-12', activity: 'Pilot Development', color: '#132238' },
          { week: 'Week 13-16', activity: 'Testing & Validation', color: '#666' },
          { week: 'Week 17-20', activity: 'Production Deployment', color: '#666' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
            <div style={{ width: 72, fontFamily: font, fontSize: '0.6875rem', fontWeight: 600, color: item.color, flexShrink: 0 }}>{item.week}</div>
            <div style={{ fontFamily: font, fontSize: '0.8125rem', color: '#111111' }}>{item.activity}</div>
          </div>
        ))}
      </div>
    </div>
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
        Digital Transformation Strategy
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phases.map((phase, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px', background: '#f7f6f3', borderRadius: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${phase.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: phase.color }}>
              <phase.icon size={16} />
            </div>
            <div>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{phase.title}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 2 }}>{phase.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 12, fontStyle: 'italic' }}>
        Each phase includes executive alignment, technical validation, and measurable milestones.
      </div>
    </div>
  );
}

function ReportsCard() {
  const metrics = [
    { label: 'AI Adoption Rate', value: '67%', trend: '+12%', status: 'positive' },
    { label: 'Automation Coverage', value: '43%', trend: '+8%', status: 'positive' },
    { label: 'Decision Speed', value: '2.4x', trend: '+0.6x', status: 'positive' },
    { label: 'Cost Reduction', value: '18%', trend: '+3%', status: 'positive' },
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Executive Dashboard Preview
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '12px', background: '#f7f6f3', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontFamily: font, fontSize: '0.625rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
            <div style={{ fontFamily: font, fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginTop: 4 }}>{m.value}</div>
            <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#2D6A4F', marginTop: 2 }}>{m.trend}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 12, fontStyle: 'italic' }}>
        Sample metrics. Actual dashboards are customized to your KPIs and transformation goals.
      </div>
    </div>
  );
}

function RecommendCard() {
  const recommendations = [
    { industry: 'Financial Services', solution: 'Risk Intelligence + Regulatory Automation', priority: 'High' },
    { industry: 'Public Sector', solution: 'Citizen Services Modernization + Data Governance', priority: 'High' },
    { industry: 'Enterprise', solution: 'Connected Intelligence + Process Optimization', priority: 'Medium' },
    { industry: 'Healthcare', solution: 'Clinical Intelligence + Patient Journey Optimization', priority: 'Medium' },
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(200,166,90,0.1)', padding: 16, marginTop: 8 }}>
      <div style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 600, color: '#C8A65A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Sector-Specific Recommendations
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recommendations.map((rec, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#f7f6f3', borderRadius: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: rec.priority === 'High' ? '#C8A65A' : '#999', marginTop: 6, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>{rec.industry}</div>
              <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#666', marginTop: 2 }}>{rec.solution}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font, fontSize: '0.6875rem', color: '#999', marginTop: 12, fontStyle: 'italic' }}>
        Contact us for a personalized recommendation based on your specific context.
      </div>
    </div>
  );
}

export function AIDock() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ConversationState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const { language } = useLanguage();
  const isAR = language === 'ar';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const handleToggle = useCallback(() => setOpen((p) => !p), []);

  const addMessage = useCallback((type: 'assistant' | 'user' | 'card', content: string, card?: React.ReactNode) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), type, content, card }]);
  }, []);

  const handleQuickAction = useCallback((actionId: string) => {
    setState(actionId as ConversationState);

    const responses: Record<string, { en: string; ar: string }> = {
      services: { en: 'Here are our core advisory services. Select one to learn more:', ar: 'هذه هي خدماتنا الاستشارية الأساسية. اختر واحدة لمعرفة المزيد:' },
      roadmap: { en: 'Here is a sample AI transformation roadmap we typically deliver:', ar: 'هذه خارطة طريق تحول الذكاء الاصطناعي النموذجية التي نقدمها عادة:' },
      readiness: { en: 'Assess your organization\'s AI readiness with these key indicators:', ar: 'قيّم استعداد مؤسستك للذكاء الاصطناعي بهذه المؤشرات الرئيسية:' },
      pricing: { en: 'Our pricing is structured around three engagement models:', ar: 'تسعيرنا منظم حول ثلاث نماذج تعاون:' },
      deliverables: { en: 'Here are the executive deliverables you can expect:', ar: 'هذه المخرجات التنفيذية التي يمكن توقعها:' },
      automation: { en: 'Quick scan of automation opportunities across your operations:', ar: 'فحص سريع لفرص الأتمتة عبر عملياتك:' },
      timeline: { en: 'Typical project timeline for an AI transformation engagement:', ar: 'الجدول الزمني النموذجي لمشروع تحول بالذكاء الاصطناعي:' },
      strategy: { en: 'Our digital transformation strategy framework:', ar: 'إطار استراتيجيتنا للتحول الرقمي:' },
      reports: { en: 'Preview of executive reporting dashboards:', ar: 'معاينة لوحات التقارير التنفيذية:' },
      recommend: { en: 'Sector-specific AI recommendations:', ar: 'توصيات ذكاء اصطناعي مخصصة لكل قطاع:' },
    };

    addMessage('user', isAR ? quickActions.find(a => a.id === actionId)?.label.ar || '' : quickActions.find(a => a.id === actionId)?.label.en || '');
    addMessage('assistant', isAR ? responses[actionId]?.ar || '' : responses[actionId]?.en || '');

    if (actionId === 'services') {
      addMessage('card', '', <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} onClick={() => {
            setState('service');
            addMessage('assistant', isAR
              ? `خدمة ${s.title.ar}: ${s.desc.ar}. نقدم استشارات مخصصة في هذا المجال.`
              : `${s.title.en}: ${s.desc.en}. We deliver tailored advisory in this domain.`
            );
          }} />
        ))}
      </div>);
    } else if (actionId === 'roadmap') {
      addMessage('card', '', <RoadmapCard />);
    } else if (actionId === 'readiness') {
      addMessage('card', '', <ReadinessCard />);
    } else if (actionId === 'pricing') {
      addMessage('card', '', <PricingCard />);
    } else if (actionId === 'deliverables') {
      addMessage('card', '', <DeliverablesCard />);
    } else if (actionId === 'automation') {
      addMessage('card', '', <AutomationCard />);
    } else if (actionId === 'timeline') {
      addMessage('card', '', <TimelineCard />);
    } else if (actionId === 'strategy') {
      addMessage('card', '', <StrategyCard />);
    } else if (actionId === 'reports') {
      addMessage('card', '', <ReportsCard />);
    } else if (actionId === 'recommend') {
      addMessage('card', '', <RecommendCard />);
    }
  }, [isAR, addMessage]);

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
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(200,166,90,0.1)',
          borderRadius: 999,
          boxShadow: '0 8px 32px rgba(17,17,17,0.06), 0 1px 2px rgba(17,17,17,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px 6px 6px',
            border: 'none', cursor: 'pointer',
            borderRadius: 999,
            background: 'linear-gradient(135deg, rgba(200,166,90,0.08), rgba(200,166,90,0.02))',
            fontFamily: font, fontSize: '0.75rem',
            fontWeight: 600, color: '#111111', letterSpacing: '0.02em',
          }}
        >
          <AIOrb isOpen={open} />
          <span style={{ whiteSpace: 'nowrap' }}>{isAR ? 'المستشار الذكي' : 'AI Advisor'}</span>
          {open ? <X size={14} /> : <Sparkles size={14} />}
        </motion.button>
      </motion.div>

      {/* Floating panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', bottom: 100, left: '50%', zIndex: 601,
              transform: 'translateX(-50%)',
              width: 440, maxWidth: 'calc(100vw - 48px)',
              maxHeight: '65vh',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(200,166,90,0.12)',
              borderRadius: 20,
              boxShadow: '0 32px 100px rgba(17,17,17,0.1), 0 8px 24px rgba(17,17,17,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Scan line */}
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.2), transparent)',
                pointerEvents: 'none',
              }}
              animate={{ top: ['-2%', '102%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 20px', borderBottom: '1px solid rgba(17,17,17,0.04)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(200,166,90,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#C8A65A',
              }}>
                <Brain size={18} />
              </div>
              <div>
                <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                  {isAR ? 'مستشار XVI التنفيذي' : 'XVI Executive Advisor'}
                </div>
                <div style={{ fontFamily: font, fontSize: '0.5625rem', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <motion.span
                    style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#2D6A4F', marginRight: 6 }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  SYSTEM ONLINE · ANALYTICAL AI
                </div>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1, color: '#111111' }}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 4 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(200,166,90,0.1), rgba(200,166,90,0.02))',
                    border: '1px solid rgba(200,166,90,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A65A', margin: '0 auto 16px', position: 'relative',
                  }}>
                    <Brain size={24} />
                    <motion.div
                      style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.08)' }}
                      animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Alexandria', serif",
                    fontSize: '0.9375rem', lineHeight: 1.6, color: '#666',
                    maxWidth: 320, margin: '0 auto 20px',
                  }}>
                    {isAR
                      ? 'مرحباً. أنا مستشار XVI التنفيذي. كيف يمكنني توجيه استراتيجية مؤسستك اليوم؟'
                      : 'Good afternoon. I am the XVI Executive Advisor. How may I direct your enterprise strategy today?'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {quickActions.slice(0, 4).map((action) => (
                      <motion.button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        whileHover={{ y: -2, background: 'rgba(200,166,90,0.08)', borderColor: 'rgba(200,166,90,0.2)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '10px 12px',
                          background: 'rgba(200,166,90,0.03)',
                          border: '1px solid rgba(200,166,90,0.06)',
                          borderRadius: 10,
                          cursor: 'pointer',
                          fontFamily: font, fontSize: '0.75rem',
                          fontWeight: 500, color: '#111111',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <action.icon size={14} style={{ color: '#C8A65A', flexShrink: 0 }} />
                        {isAR ? action.label.ar : action.label.en}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.type === 'user' ? (
                    <div style={{
                      maxWidth: '80%', padding: '10px 14px',
                      background: '#132238', color: '#f7f6f3',
                      fontFamily: font, fontSize: '0.8125rem',
                      borderRadius: '12px 12px 4px 12px',
                    }}>
                      {msg.content}
                    </div>
                  ) : (
                    <div style={{ maxWidth: '90%' }}>
                      {msg.content && (
                        <div style={{
                          padding: '10px 14px',
                          background: '#f7f6f3',
                          fontFamily: font, fontSize: '0.8125rem',
                          color: '#111111',
                          borderRadius: '12px 12px 12px 4px',
                          lineHeight: 1.5,
                        }}>
                          {msg.content}
                        </div>
                      )}
                      {msg.card}
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions bar */}
            {messages.length > 0 && (
              <div style={{
                display: 'flex', gap: 6, padding: '8px 16px',
                borderTop: '1px solid rgba(17,17,17,0.04)',
                overflowX: 'auto',
              }}>
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    whileHover={{ background: 'rgba(200,166,90,0.1)', borderColor: '#C8A65A' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '6px 10px',
                      background: 'transparent',
                      border: '1px solid rgba(17,17,17,0.06)',
                      borderRadius: 999,
                      cursor: 'pointer',
                      fontFamily: font, fontSize: '0.625rem',
                      fontWeight: 500, color: '#666',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    <action.icon size={10} />
                    {isAR ? action.label.ar : action.label.en}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderTop: '1px solid rgba(17,17,17,0.04)',
            }}>
              <input
                type="text"
                placeholder={isAR ? 'اكتب استفسارك الاستراتيجي...' : 'Type your strategic inquiry...'}
                style={{
                  flex: 1, border: 'none', background: 'rgba(17,17,17,0.02)',
                  padding: '10px 14px', borderRadius: 12,
                  fontFamily: font, fontSize: '0.8125rem',
                  color: '#111111', outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#B8963E' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 40, height: 40,
                  background: '#C8A65A', color: '#FFFFFF',
                  border: 'none', cursor: 'pointer', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
