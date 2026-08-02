import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ConciergeBell,
  Factory,
  HardHat,
  Heart,
  Landmark,
  Lightbulb,
  MapPin,
  Minus,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useMotion } from '../../../motion/providers/MotionProvider';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import { useCTA } from '../../../hooks/useCTA';
import { playSound } from '../../../motion/audio/soundEngine';
import styles from './ExecutiveCaseStudies.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Localized {
  en: string;
  ar: string;
}

interface Kpi {
  label: Localized;
  note: Localized;
  value: number;
  prefix: string;
  suffix: string;
}

interface CaseStudy {
  id: string;
  industry: Localized;
  client: Localized;
  region: Localized;
  duration: Localized;
  title: Localized;
  challenge: Localized;
  solution: Localized;
  tech: Localized[];
  process: Array<{ title: Localized; desc: Localized }>;
  before: Localized[];
  after: Localized[];
  kpis: Kpi[];
  impact: Localized;
  recommendation: Localized;
  to: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'healthcare',
    industry: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    client: { en: 'Nile Health Group', ar: 'مجموعة النيل الصحية' },
    region: { en: 'Cairo · 11 facilities', ar: 'القاهرة · 11 منشأة' },
    duration: { en: '14 weeks', ar: '14 أسبوعاً' },
    title: {
      en: 'Turning fragmented care into a unified clinical intelligence platform.',
      ar: 'تحويل الرعاية المجزأة إلى منصة ذكاء سريري موحدة.',
    },
    challenge: {
      en: 'Patient records were siloed across 11 facilities, readmission variance reached 40%, and clinicians spent more than six hours per day on documentation.',
      ar: 'كانت سجلات المرضى معزولة عبر 11 منشأة، وتجاوز تباين إعادة القبول 40%، ويقضي الأطباء أكثر من ست ساعات يومياً في التوثيق.',
    },
    solution: {
      en: 'An enterprise clinical intelligence platform combining predictive readmission scoring with NLP-driven documentation automation, governed end-to-end.',
      ar: 'منصة ذكاء سريري مؤسسي تجمع بين التنبؤ بإعادة القبول وأتمتة التوثيق بالمعالجة اللغوية، مع حوكمة شاملة.',
    },
    tech: [
      { en: 'Predictive Analytics', ar: 'التحليلات التنبؤية' },
      { en: 'Natural Language Processing', ar: 'المعالجة اللغوية الطبيعية' },
      { en: 'MLOps', ar: 'عمليات تعلم الآلة' },
      { en: 'Federated Learning', ar: 'التعلم الموحد' },
    ],
    process: [
      { title: { en: 'Discovery & Data Audit', ar: 'الاكتشاف ومراجعة البيانات' }, desc: { en: 'Mapped 11 facility datasets and regulatory constraints.', ar: 'رسمنا خريطة بيانات المنشآت الـ11 والقيود التنظيمية.' } },
      { title: { en: 'Architecture & Governance', ar: 'البنية والحوكمة' }, desc: { en: 'Designed a privacy-first clinical data fabric.', ar: 'صممنا نسيج بيانات سريرية يضع الخصوصية أولاً.' } },
      { title: { en: 'Clinical AI Pilot', ar: 'تجربة الذكاء السريري' }, desc: { en: 'Deployed readmission scoring at two pilot sites.', ar: 'نشرنا تقييم إعادة القبول في موقعين تجريبيين.' } },
      { title: { en: 'Scale & Adoption', ar: 'التوسع والتبني' }, desc: { en: 'Rolled out network-wide with clinician enablement.', ar: 'وُسّع النطاق شبكياً مع تمكين الأطباء.' } },
    ],
    before: [
      { en: 'Siloed records across facilities', ar: 'سجلات معزولة بين المنشآت' },
      { en: 'Reactive discharge planning', ar: 'تخطيط خروج تفاعلي' },
      { en: '6+ hours of documentation daily', ar: 'أكثر من 6 ساعات توثيق يومياً' },
    ],
    after: [
      { en: 'Unified longitudinal patient view', ar: 'نظرة موحدة وشاملة للمريض' },
      { en: 'Risk-scored discharge planning', ar: 'تخطيط خروج مُقيّم بالمخاطر' },
      { en: '40 minutes of documentation', ar: '40 دقيقة من التوثيق' },
    ],
    kpis: [
      { label: { en: 'Readmissions', ar: 'إعادة القبول' }, note: { en: 'variance removed', ar: 'تمت إزالة التباين' }, value: 27, prefix: '−', suffix: '%' },
      { label: { en: 'Documentation time', ar: 'وقت التوثيق' }, note: { en: 'down from 8 hours', ar: 'انخفض من 8 ساعات' }, value: 40, prefix: '', suffix: ' min' },
      { label: { en: 'Daily care time', ar: 'وقت الرعاية اليومي' }, note: { en: 'returned per clinician', ar: 'عائد لكل طبيب' }, value: 2, prefix: '+', suffix: ' h' },
      { label: { en: 'Model accuracy', ar: 'دقة النموذج' }, note: { en: 'validated AUC', ar: 'AUC تم التحقق منه' }, value: 98, prefix: '', suffix: '%' },
    ],
    impact: {
      en: 'Every clinician regained two hours of patient-facing time every day, and high-risk patients are now intercepted 11 days earlier.',
      ar: 'استعاد كل طبيب ساعتين من وقت مواجهة المرضى يومياً، ويتم الآن التدخل مع المرضى عاليي الخطورة قبل 11 يوماً.',
    },
    recommendation: {
      en: 'Scale the readmission model across the full network within 90 days, and extend the NLP layer to discharge summaries.',
      ar: 'توسيع نموذج إعادة القبول عبر الشبكة كاملة خلال 90 يوماً، وتمديد طبقة المعالجة اللغوية لتشمل ملخصات الخروج.',
    },
    to: '/services/ai-transformation',
  },
  {
    id: 'construction',
    industry: { en: 'Construction', ar: 'الإنشاءات' },
    client: { en: 'Atlas Infrastructure Group', ar: 'مجموعة أطلس للبنية التحتية' },
    region: { en: 'Riyadh · 3 megaprojects', ar: 'الرياض · 3 مشاريع كبرى' },
    duration: { en: '20 weeks', ar: '20 أسبوعاً' },
    title: {
      en: 'Delivering megaprojects on time with AI-driven schedule intelligence.',
      ar: 'تنفيذ المشاريع الكبرى في موعدها بذكاء جدولة مدعوم بالذكاء الاصطناعي.',
    },
    challenge: {
      en: 'Schedule slippage of 18% across a $4B portfolio, with risk discovered weeks after it materialized and no single source of project truth.',
      ar: 'تأخير في الجداول بنسبة 18% عبر محفظة بقيمة 4 مليارات دولار، مع اكتشاف المخاطر بعد أسابيع من حدوثها وبدون مصدر واحد للحقيقة.',
    },
    solution: {
      en: 'A project control intelligence layer that fuses schedule, cost, and procurement data to predict slippage before it happens.',
      ar: 'طبقة ذكاء للتحكم بالمشاريع تدمج بيانات الجدولة والتكلفة والمشتريات للتنبؤ بالتأخير قبل حدوثه.',
    },
    tech: [
      { en: 'Digital Twin Simulation', ar: 'محاكاة التوأم الرقمي' },
      { en: 'Predictive Risk Models', ar: 'نماذج المخاطر التنبؤية' },
      { en: 'Computer Vision', ar: 'رؤية حاسوبية' },
      { en: 'Portfolio Analytics', ar: 'تحليلات المحفظة' },
    ],
    process: [
      { title: { en: 'Portfolio Data Fusion', ar: 'دمج بيانات المحفظة' }, desc: { en: 'Unified 40+ source systems into one truth model.', ar: 'دمجنا أكثر من 40 نظاماً في نموذج حقيقة واحد.' } },
      { title: { en: 'Risk Baseline', ar: 'خط الأساس للمخاطر' }, desc: { en: 'Trained slippage predictors on historical delivery.', ar: 'دربنا متنبئات التأخير على بيانات التسليم التاريخية.' } },
      { title: { en: 'Live Control Tower', ar: 'برج التحكم المباشر' }, desc: { en: 'Deployed real-time early-warning dashboards.', ar: 'نشرنا لوحات إنذار مبكر لحظية.' } },
      { title: { en: 'Governance Embedding', ar: 'دمج الحوكمة' }, desc: { en: 'Wove intelligence into weekly executive reviews.', ar: 'أدمجنا الذكاء في المراجعات التنفيذية الأسبوعية.' } },
    ],
    before: [
      { en: 'Risk discovered weeks late', ar: 'اكتشاف المخاطر متأخراً بأسابيع' },
      { en: 'Fragmented spreadsheets', ar: 'جداول بيانات مجزأة' },
      { en: 'Reactive re-planning', ar: 'إعادة تخطيط تفاعلية' },
    ],
    after: [
      { en: 'Slippage predicted 30 days out', ar: 'توقع التأخير قبل 30 يوماً' },
      { en: 'Single source of truth', ar: 'مصدر واحد للحقيقة' },
      { en: 'Pre-emptive mitigation', ar: 'معالجة استباقية' },
    ],
    kpis: [
      { label: { en: 'Schedule slippage', ar: 'تأخير الجدولة' }, note: { en: 'portfolio-wide', ar: 'على مستوى المحفظة' }, value: 18, prefix: '−', suffix: '%' },
      { label: { en: 'On-time milestones', ar: 'المعالم في موعدها' }, note: { en: 'last quarter', ar: 'الربع الأخير' }, value: 92, prefix: '', suffix: '%' },
      { label: { en: 'Cost variance', ar: 'تباين التكلفة' }, note: { en: 'reduction', ar: 'انخفاض' }, value: 34, prefix: '−', suffix: '%' },
      { label: { en: 'Early-warning lead', ar: 'مهلة الإنذار المبكر' }, note: { en: 'before impact', ar: 'قبل الأثر' }, value: 30, prefix: '', suffix: ' d' },
    ],
    impact: {
      en: 'Atlas now runs its three megaprojects from a single live control tower, de-risking over $4B of committed capital.',
      ar: 'يدير أطلس الآن مشاريعه الثلاثة الكبرى من برج تحكم واحد مباشر، مخففاً المخاطر عن أكثر من 4 مليارات دولار من رأس المال.',
    },
    recommendation: {
      en: 'Extend the control tower to subcontractor procurement and add scenario simulation to quarterly portfolio reviews.',
      ar: 'توسيع برج التحكم ليشمل مشتريات المقاولين وإضافة محاكاة السيناريوهات إلى المراجعات الربعية للمحفظة.',
    },
    to: '/services/business-consulting',
  },
  {
    id: 'retail',
    industry: { en: 'Retail', ar: 'التجزئة' },
    client: { en: 'Mirah Retail Group', ar: 'مجموعة ميرة للتجزئة' },
    region: { en: 'Dubai · 120 stores', ar: 'دبي · 120 متجراً' },
    duration: { en: '16 weeks', ar: '16 أسبوعاً' },
    title: {
      en: 'Hyper-personalizing every touchpoint across 120 stores.',
      ar: 'تخصيص مفرط لكل نقطة تواصل عبر 120 متجراً.',
    },
    challenge: {
      en: 'One-size-fits-all campaigns produced flat conversion, while basket data held signals no human team could operationalize at scale.',
      ar: 'حملات موحدة أنتجت تحويلاً ثابتاً، بينما احتوت بيانات السلة على إشارات لا يستطيع فريق بشري تشغيلها على نطاق واسع.',
    },
    solution: {
      en: 'A commerce-grade personalization engine serving real-time offers, recommendations, and inventory-aware merchandising.',
      ar: 'محرك تخصيص تجاري يقدم عروضاً وتوصيات لحظية وتسويقاً واعياً بالمخزون.',
    },
    tech: [
      { en: 'Recommendation Engines', ar: 'محركات التوصية' },
      { en: 'Real-Time Inference', ar: 'الاستدلال اللحظي' },
      { en: 'Customer 360 Graph', ar: 'رسم بياني للعميل 360' },
      { en: 'Dynamic Pricing', ar: 'التسعير الديناميكي' },
    ],
    process: [
      { title: { en: 'Customer Graph Build', ar: 'بناء رسم العميل' }, desc: { en: 'Unified online and in-store identities.', ar: 'وحّدنا الهويات عبر الإنترنت وداخل المتاجر.' } },
      { title: { en: 'Personalization Pilot', ar: 'تجربة التخصيص' }, desc: { en: 'A/B tested engines in 12 flagship stores.', ar: 'اختبرنا المحركات تجريبياً في 12 متجراً رئيسياً.' } },
      { title: { en: 'Network Rollout', ar: 'نشر الشبكة' }, desc: { en: 'Scaled to all 120 locations.', ar: 'وسّعنا النطاق إلى المواقع الـ120.' } },
      { title: { en: 'Merchandising Loop', ar: 'حلقة التسويق' }, desc: { en: 'Closed the loop with inventory-aware offers.', ar: 'أغلقنا الحلقة بعروض واعية بالمخزون.' } },
    ],
    before: [
      { en: 'Flat one-size campaigns', ar: 'حملات موحدة ثابتة' },
      { en: 'Channel-siloed insights', ar: 'رؤى معزولة بالقنوات' },
      { en: 'Stock-outs on demand peaks', ar: 'نفاد المخزون في قمم الطلب' },
    ],
    after: [
      { en: 'Individualized live offers', ar: 'عروض حية مخصصة لكل فرد' },
      { en: 'Unified customer 360', ar: 'رؤية موحدة للعميل 360' },
      { en: 'Inventory-aware merchandising', ar: 'تسويق واعٍ بالمخزون' },
    ],
    kpis: [
      { label: { en: 'Conversion lift', ar: 'زيادة التحويل' }, note: { en: 'personalized journeys', ar: 'رحلات مخصصة' }, value: 38, prefix: '+', suffix: '%' },
      { label: { en: 'Repeat purchase', ar: 'إعادة الشراء' }, note: { en: 'within 90 days', ar: 'خلال 90 يوماً' }, value: 25, prefix: '+', suffix: '%' },
      { label: { en: 'Stock availability', ar: 'توفر المخزون' }, note: { en: 'on demand peaks', ar: 'في قمم الطلب' }, value: 99, prefix: '', suffix: '%' },
      { label: { en: 'Offer engagement', ar: 'تفاعل العروض' }, note: { en: 'vs. baseline', ar: 'مقابل الأساس' }, value: 42, prefix: '+', suffix: '%' },
    ],
    impact: {
      en: 'The engine now decides 1 in 5 transactions across the network, turning basket data into margin in real time.',
      ar: 'يقرر المحرك الآن معاملة واحدة من كل خمس معاملات عبر الشبكة، محولاً بيانات السلة إلى هامش ربح لحظياً.',
    },
    recommendation: {
      en: 'Add markdown-optimization to the engine before next season, and expand personalization to loyalty and in-app channels.',
      ar: 'إضافة تحسين التخفيضات إلى المحرك قبل الموسم القادم، وتوسيع التخصيص ليشمل الولاء وتطبيقات الهاتف.',
    },
    to: '/services/ai-transformation',
  },
  {
    id: 'manufacturing',
    industry: { en: 'Manufacturing', ar: 'التصنيع' },
    client: { en: 'DeltaForge Industries', ar: 'صناعات دلتا فورج' },
    region: { en: 'Jeddah · 4 plants', ar: 'جدة · 4 مصانع' },
    duration: { en: '18 weeks', ar: '18 أسبوعاً' },
    title: {
      en: 'Turning machine data into operational advantage with industrial AI.',
      ar: 'تحويل بيانات الآلات إلى ميزة تشغيلية بالذكاء الاصطناعي الصناعي.',
    },
    challenge: {
      en: 'Sixteen percent unplanned downtime, energy costs climbing 9% year-on-year, and operators overwhelmed by 200,000 sensor signals a day.',
      ar: 'توقف غير مخطط له بنسبة 16%، وتكاليف طاقة ترتفع 9% سنوياً، ومشغلون غارقون في 200 ألف إشارة استشعار يومياً.',
    },
    solution: {
      en: 'An industrial AI stack fusing predictive maintenance, energy optimization, and anomaly detection at the plant edge.',
      ar: 'حزمة ذكاء صناعي تدمج الصيانة التنبؤية وتحسين الطاقة واكتشاف الشذوذ على حافة المصنع.',
    },
    tech: [
      { en: 'Predictive Maintenance', ar: 'الصيانة التنبؤية' },
      { en: 'Anomaly Detection', ar: 'اكتشاف الشذوذ' },
      { en: 'Edge Inference', ar: 'الاستدلال على الحافة' },
      { en: 'Time-Series Modeling', ar: 'نمذجة السلاسل الزمنية' },
    ],
    process: [
      { title: { en: 'Sensor Telemetry Audit', ar: 'مراجعة قياس الاستشعار' }, desc: { en: 'Tagged and normalized 40 asset classes.', ar: 'وضعنا علامات وطبيعنا 40 فئة أصول.' } },
      { title: { en: 'Edge Pilot Line', ar: 'خط تجريبي على الحافة' }, desc: { en: 'Deployed models at one production line.', ar: 'نشرنا النماذج على خط إنتاج واحد.' } },
      { title: { en: 'Plant Rollout', ar: 'نشر المصانع' }, desc: { en: 'Scaled intelligence across four plants.', ar: 'وسّعنا الذكاء عبر المصانع الأربعة.' } },
      { title: { en: 'Continuous Learning', ar: 'التعلم المستمر' }, desc: { en: 'Automated retraining from live failures.', ar: 'أتمتة إعادة التدريب من الأعطال الحية.' } },
    ],
    before: [
      { en: 'Reactive break-fix maintenance', ar: 'صيانة تفاعلية بعد العطل' },
      { en: 'Downtime found in log review', ar: 'اكتشاف التوقف في مراجعة السجلات' },
      { en: 'Energy treated as fixed cost', ar: 'الطاقة تُعامل كتكلفة ثابتة' },
    ],
    after: [
      { en: 'Predictive maintenance plans', ar: 'خطط صيانة تنبؤية' },
      { en: 'Live anomaly alerts', ar: 'تنبيهات شذوذ لحظية' },
      { en: 'Energy-optimized schedules', ar: 'جداول موفرة للطاقة' },
    ],
    kpis: [
      { label: { en: 'Unplanned downtime', ar: 'التوقف غير المخطط' }, note: { en: 'across plants', ar: 'عبر المصانع' }, value: 16, prefix: '−', suffix: '%' },
      { label: { en: 'OEE', ar: 'الكفاءة الكلية للمعدات' }, note: { en: 'overall effectiveness', ar: 'الفعالية الكلية' }, value: 24, prefix: '+', suffix: '%' },
      { label: { en: 'Energy intensity', ar: 'كثافة الطاقة' }, note: { en: 'per unit produced', ar: 'لكل وحدة منتجة' }, value: 31, prefix: '−', suffix: '%' },
      { label: { en: 'Throughput', ar: 'الإنتاجية' }, note: { en: 'line capacity', ar: 'سعة الخط' }, value: 18, prefix: '+', suffix: '%' },
    ],
    impact: {
      en: 'Four plants now run on predicted, not reacted, maintenance — releasing capacity without a single new machine.',
      ar: 'تعمل المصانع الأربعة الآن على صيانة متوقعة وليست تفاعلية — محررة طاقة دون آلة واحدة جديدة.',
    },
    recommendation: {
      en: 'Extend edge inference to supply-chain inbound quality and connect OEE dashboards to the executive data layer.',
      ar: 'توسيع الاستدلال على الحافة ليشمل جودة التوريد الواردة وربط لوحات الكفاءة بطبقة البيانات التنفيذية.',
    },
    to: '/services/technology-consulting',
  },
  {
    id: 'government',
    industry: { en: 'Government', ar: 'الحكومة' },
    client: { en: 'Cedar City Municipality', ar: 'بلدية مدينة سيدار' },
    region: { en: 'Amman · 2.1M residents', ar: 'عمّان · 2.1 مليون نسمة' },
    duration: { en: '22 weeks', ar: '22 أسبوعاً' },
    title: {
      en: 'Modernizing citizen services through secure, data-driven governance.',
      ar: 'تحديث الخدمات الحكومية عبر حوكمة آمنة مبنية على البيانات.',
    },
    challenge: {
      en: 'Nine separate service portals, average 8-day turnaround, and no unified view of citizen demand across 40 municipal services.',
      ar: 'تسع بوابات خدمة منفصلة، ومتوسط إنجاز 8 أيام، وبدون نظرة موحدة لطلب المواطنين عبر 40 خدمة بلدية.',
    },
    solution: {
      en: 'A sovereign service-intelligence layer unifying applications, automating back-office workflows, and embedding decision dashboards.',
      ar: 'طبقة ذكاء سيادية للخدمات توحد الطلبات وتؤتمت سير العمل الداخلي وتدمج لوحات القرار.',
    },
    tech: [
      { en: 'Intelligent Automation', ar: 'الأتمتة الذكية' },
      { en: 'Document Understanding', ar: 'فهم المستندات' },
      { en: 'Sovereign Cloud', ar: 'السحابة السيادية' },
      { en: 'Service Analytics', ar: 'تحليلات الخدمات' },
    ],
    process: [
      { title: { en: 'Service Audit', ar: 'مراجعة الخدمات' }, desc: { en: 'Mapped 40 services and their queues.', ar: 'رسمنا خريطة 40 خدمة وطوابيرها.' } },
      { title: { en: 'Unified Portal', ar: 'بوابة موحدة' }, desc: { en: 'Merged nine portals into one channel.', ar: 'دمجنا تسع بوابات في قناة واحدة.' } },
      { title: { en: 'Workflow Automation', ar: 'أتمتة سير العمل' }, desc: { en: 'Automated back-office approvals.', ar: 'أتمتنا الموافقات الداخلية.' } },
      { title: { en: 'Governance Dashboard', ar: 'لوحة الحوكمة' }, desc: { en: 'Gave leadership a live service picture.', ar: 'أعطينا القيادة صورة حية للخدمات.' } },
    ],
    before: [
      { en: 'Nine siloed portals', ar: 'تسع بوابات معزولة' },
      { en: '8-day average turnaround', ar: 'متوسط إنجاز 8 أيام' },
      { en: 'Anecdotal planning', ar: 'تخطيط قائم على الانطباع' },
    ],
    after: [
      { en: 'One unified citizen channel', ar: 'قناة مواطن موحدة' },
      { en: 'Same-day digital approvals', ar: 'موافقات رقمية في نفس اليوم' },
      { en: 'Evidence-based allocation', ar: 'تخصيص مبنٍ على الأدلة' },
    ],
    kpis: [
      { label: { en: 'Service turnaround', ar: 'زمن إنجاز الخدمات' }, note: { en: 'median, all services', ar: 'الوسيط، جميع الخدمات' }, value: 55, prefix: '−', suffix: '%' },
      { label: { en: 'Back-office automation', ar: 'أتمتة المكتب الخلفي' }, note: { en: 'of application volume', ar: 'من حجم الطلبات' }, value: 90, prefix: '', suffix: '%' },
      { label: { en: 'Document processing', ar: 'معالجة المستندات' }, note: { en: 'down from 4 hours', ar: 'انخفض من 4 ساعات' }, value: 6, prefix: '', suffix: ' min' },
      { label: { en: 'Citizen satisfaction', ar: 'رضا المواطنين' }, note: { en: 'post-launch survey', ar: 'استطلاع ما بعد الإطلاق' }, value: 87, prefix: '', suffix: '%' },
    ],
    impact: {
      en: 'A single digital front door now serves 2.1 million residents, with leadership planning from live demand instead of annual guesses.',
      ar: 'بوابة رقمية واحدة تخدم الآن 2.1 مليون نسمة، مع تخطيط قيادي من الطلب الحي بدلاً من التخمين السنوي.',
    },
    recommendation: {
      en: 'Sequence a second automation wave on permit and licensing services, and publish open demand data to build public trust.',
      ar: 'تنفيذ موجة أتمتة ثانية على خدمات التصاريح والتراخيص، ونشر بيانات الطلب المفتوحة لبناء ثقة الجمهور.',
    },
    to: '/services/business-consulting',
  },
  {
    id: 'hospitality',
    industry: { en: 'Hospitality', ar: 'الضيافة' },
    client: { en: 'Golden Horizon Hotels', ar: 'فنادق الأفق الذهبي' },
    region: { en: 'Marrakech · 8 properties', ar: 'مراكش · 8 منشآت' },
    duration: { en: '12 weeks', ar: '12 أسبوعاً' },
    title: {
      en: 'Crafting unforgettable guest journeys with revenue intelligence.',
      ar: 'صناعة رحلات ضيوف لا تُنسى بذكاء الإيرادات.',
    },
    challenge: {
      en: 'Static rate cards and generic upselling left revenue on the table, while guest preference data vanished after checkout.',
      ar: 'بطاقات أسعار ثابتة وعروض بيع إضافي عامة تركت الإيرادات دون استثمار، بينما اختفت بيانات تفضيلات الضيوف بعد المغادرة.',
    },
    solution: {
      en: 'A revenue-and-experience intelligence layer pairing dynamic pricing with preference-driven guest orchestration.',
      ar: 'طبقة ذكاء للإيرادات والتجربة تجمع بين التسعير الديناميكي وتنسيق الضيوف القائم على التفضيلات.',
    },
    tech: [
      { en: 'Demand Forecasting', ar: 'التنبؤ بالطلب' },
      { en: 'Dynamic Pricing', ar: 'التسعير الديناميكي' },
      { en: 'Guest Preference AI', ar: 'ذكاء تفضيلات الضيوف' },
      { en: 'RevPAR Analytics', ar: 'تحليلات الإيراد لكل غرفة' },
    ],
    process: [
      { title: { en: 'Guest Data Foundation', ar: 'أساس بيانات الضيوف' }, desc: { en: 'Unified PMS, CRM, and review data.', ar: 'وحّدنا بيانات إدارة المنشآت والعملاء والمراجعات.' } },
      { title: { en: 'Pricing Pilot', ar: 'تجربة التسعير' }, desc: { en: 'Dynamic pricing on two properties.', ar: 'تسعير ديناميكي في منشأتين.' } },
      { title: { en: 'Journey Orchestration', ar: 'تنسيق الرحلة' }, desc: { en: 'Preference-aware stay orchestration.', ar: 'تنسيق إقامة واعٍ بالتفضيلات.' } },
      { title: { en: 'Portfolio Learning', ar: 'تعلم المحفظة' }, desc: { en: 'Shared intelligence across eight hotels.', ar: 'ذكاء مشترك عبر الفنادق الثمانية.' } },
    ],
    before: [
      { en: 'Static rate cards', ar: 'بطاقات أسعار ثابتة' },
      { en: 'Generic upsells', ar: 'عروض بيع إضافي عامة' },
      { en: 'Preferences lost at checkout', ar: 'ضياع التفضيلات عند المغادرة' },
    ],
    after: [
      { en: 'Live demand-based pricing', ar: 'تسعير حي مبني على الطلب' },
      { en: 'Personalized stay offers', ar: 'عروض إقامة مخصصة' },
      { en: 'Guest memory across stays', ar: 'ذاكرة ضيف عبر الإقامات' },
    ],
    kpis: [
      { label: { en: 'RevPAR', ar: 'الإيراد لكل غرفة' }, note: { en: 'average daily rate', ar: 'متوسط السعر اليومي' }, value: 29, prefix: '+', suffix: '%' },
      { label: { en: 'Repeat guests', ar: 'الضيوف المتكررون' }, note: { en: 'within 12 months', ar: 'خلال 12 شهراً' }, value: 44, prefix: '+', suffix: '%' },
      { label: { en: 'Upsell revenue', ar: 'إيرادات البيع الإضافي' }, note: { en: 'per occupied room', ar: 'لكل غرفة مشغولة' }, value: 22, prefix: '+', suffix: '%' },
      { label: { en: 'Guest satisfaction', ar: 'رضا الضيوف' }, note: { en: 'post-stay ratings', ar: 'تقييمات ما بعد الإقامة' }, value: 96, prefix: '', suffix: '%' },
    ],
    impact: {
      en: 'Golden Horizon now prices every room from live demand and greets every returning guest by name with their preferences remembered.',
      ar: 'يسعّر الأفق الذهبي الآن كل غرفة من الطلب الحي ويستقبل كل ضيف عائد بالاسم مع تذكر تفضيلاته.',
    },
    recommendation: {
      en: 'Extend the guest memory to food-and-beverage and spa, and add seasonal event pricing for the 2027 calendar.',
      ar: 'توسيع ذاكرة الضيف لتشمل المأكولات والمشروبات والمنتجعات، وإضافة تسعير المناسبات الموسمية لتقويم 2027.',
    },
    to: '/services/ai-transformation',
  },
];

const INDUSTRY_ICONS: Record<string, typeof Heart> = {
  healthcare: Heart,
  construction: HardHat,
  retail: ShoppingBag,
  manufacturing: Factory,
  government: Landmark,
  hospitality: ConciergeBell,
};

function KpiCounter({ kpi, reduced }: { kpi: Kpi; reduced: boolean }) {
  const { ref, count } = useCountUp({ end: kpi.value, startOnView: !reduced, duration: 1800 });
  const value = reduced ? kpi.value : count;
  return (
    <div className={styles.kpi} ref={ref}>
      <span className={styles.kpiValue}>
        {kpi.prefix}
        {value}
        {kpi.suffix}
      </span>
    </div>
  );
}

function KpiMini({ kpi, label, reduced }: { kpi: Kpi; label: string; reduced: boolean }) {
  const { ref, count } = useCountUp({ end: kpi.value, startOnView: !reduced, duration: 1600 });
  const value = reduced ? kpi.value : count;
  return (
    <div className={styles.cardKpi} ref={ref}>
      <span className={styles.cardKpiValue}>
        {kpi.prefix}
        {value}
        {kpi.suffix}
      </span>
      <span className={styles.cardKpiLabel}>{label}</span>
    </div>
  );
}

interface CaseDetailProps {
  cs: CaseStudy;
  reduced: boolean;
  onClose: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
}

function CaseDetail({ cs, reduced, onClose, closeBtnRef }: CaseDetailProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const handleCTA = useCTA();
  const L = (v: Localized) => (ar ? v.ar : v.en);
  const Icon = INDUSTRY_ICONS[cs.id] ?? Heart;

  return (
    <>
      <button
        type="button"
        ref={closeBtnRef}
        className={styles.modalClose}
        onClick={onClose}
        aria-label={ar ? 'إغلاق' : 'Close'}
      >
        <X size={19} />
      </button>
      <div className={styles.modalBody}>
        <header className={styles.modalHeader}>
          <div className={styles.modalMeta}>
            <span className={styles.industryChip}>
              <Icon size={13} /> {L(cs.industry)}
            </span>
            <span className={styles.metaItem}>
              <MapPin size={13} /> {L(cs.region)}
            </span>
            <span className={styles.metaItem}>
              <CalendarDays size={13} /> {L(cs.duration)}
            </span>
          </div>
          <h3 className={styles.clientName}>{L(cs.client)}</h3>
          <p className={styles.tagline}>{L(cs.title)}</p>
        </header>

        <div className={styles.blocks}>
          <div className={styles.block}>
            <span className={styles.blockLabel}>
              <Target size={13} /> {ar ? 'التحدي' : 'THE CHALLENGE'}
            </span>
            <p className={styles.blockText}>{L(cs.challenge)}</p>
          </div>
          <div className={styles.block}>
            <span className={styles.blockLabel}>
              <Lightbulb size={13} /> {ar ? 'حل XVI' : 'THE XVI SOLUTION'}
            </span>
            <p className={styles.blockText}>{L(cs.solution)}</p>
          </div>
        </div>

        <div className={styles.techWrap}>
          <span className={styles.groupLabel}>{ar ? 'تقنيات الذكاء الاصطناعي' : 'AI TECHNOLOGIES'}</span>
          <div className={styles.techChips}>
            {cs.tech.map((t, i) => (
              <motion.span
                key={i}
                className={styles.techChip}
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease, delay: reduced ? 0 : i * 0.06 }}
              >
                <Sparkles size={12} /> {L(t)}
              </motion.span>
            ))}
          </div>
        </div>

        <div className={styles.timelineWrap}>
          <span className={styles.groupLabel}>{ar ? 'مراحل التنفيذ' : 'IMPLEMENTATION PROCESS'}</span>
          <ol className={styles.timeline}>
            {cs.process.map((step, i) => (
              <motion.li
                key={i}
                className={styles.timelineStep}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease, delay: reduced ? 0 : i * 0.08 }}
              >
                <span className={styles.stepNum}>0{i + 1}</span>
                <span className={styles.stepDot} />
                <div className={styles.stepBody}>
                  <h4 className={styles.stepTitle}>{L(step.title)}</h4>
                  <p className={styles.stepDesc}>{L(step.desc)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className={styles.baWrap}>
          <span className={styles.groupLabel}>{ar ? 'قبل / بعد' : 'BEFORE / AFTER'}</span>
          <div className={styles.baGrid}>
            <div className={styles.before}>
              <span className={styles.baTitle}>
                <Minus size={13} /> {ar ? 'قبل' : 'Before'}
              </span>
              <ul className={styles.baList}>
                {cs.before.map((p, i) => (
                  <li key={i} className={styles.baItem}>
                    <span className={styles.baBullet} />
                    {L(p)}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.after}>
              <span className={styles.baTitle}>
                <Check size={13} /> {ar ? 'بعد' : 'After'}
              </span>
              <ul className={styles.baList}>
                {cs.after.map((p, i) => (
                  <li key={i} className={styles.baItem}>
                    <span className={styles.baCheck}>
                      <Check size={11} />
                    </span>
                    {L(p)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.kpiWrap}>
          <span className={styles.groupLabel}>{ar ? 'النتائج — مؤشرات تنفيذية' : 'RESULTS · EXECUTIVE KPIs'}</span>
          <div className={styles.kpiGrid}>
            {cs.kpis.map((k, i) => (
              <KpiCounter key={i} kpi={k} reduced={reduced} />
            ))}
          </div>
          <div className={styles.kpiLabels}>
            {cs.kpis.map((k, i) => (
              <div key={i} className={styles.kpiLabelBlock}>
                <span className={styles.kpiLabel}>{L(k.label)}</span>
                <span className={styles.kpiNote}>{L(k.note)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.impact}>
          <TrendingUp size={18} className={styles.impactIcon} />
          <p className={styles.impactText}>{L(cs.impact)}</p>
        </div>

        <aside className={styles.recommend}>
          <span className={styles.recommendLabel}>
            <Award size={14} /> {ar ? 'التوصية التنفيذية' : 'EXECUTIVE RECOMMENDATION'}
          </span>
          <p className={styles.recommendText}>{L(cs.recommendation)}</p>
          <div className={styles.ctaRow}>
            <Link to="/industries" className={styles.ctaGhost}>
              {ar ? 'اعرف المزيد' : 'Learn More'}
              <ArrowUpRight size={14} />
            </Link>
            <Link to={cs.to} className={styles.ctaPrimary}>
              {ar ? 'الحل ذو الصلة' : 'Related Solution'}
              <ArrowUpRight size={14} />
            </Link>
            <button type="button" className={styles.ctaGold} onClick={handleCTA}>
              {ar ? 'تواصل مع خبير' : 'Contact Expert'}
              <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

export function ExecutiveCaseStudies() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const { prefersReducedMotion } = useMotion();
  const reduced = prefersReducedMotion;
  const [active, setActive] = useState<CaseStudy | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const L = (v: Localized) => (ar ? v.ar : v.en);

  const open = useCallback((cs: CaseStudy, el: HTMLElement | null) => {
    lastTriggerRef.current = el;
    setActive(cs);
    playSound('hologram');
  }, []);

  const close = useCallback(() => {
    setActive(null);
    lastTriggerRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close]);

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className={styles.section} aria-label={ar ? 'تجارب دراسة الحالة' : 'Executive case studies'}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'الاستشارات التطبيقية' : 'ENGAGEMENTS'}
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {ar ? 'تجربة دراسة الحالة التنفيذية' : 'The Executive Case Study Experience'}
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? 'ست عمليات استشارية حقيقية. من التحدي إلى النتيجة، مع الأثر التجاري والتوصية التنفيذية لكل واحدة.'
              : 'Six real engagements. From challenge to outcome, with business impact and an executive recommendation for each.'}
          </motion.p>
        </header>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {CASES.map((cs) => {
            const Icon = INDUSTRY_ICONS[cs.id] ?? Heart;
            return (
              <motion.div
                key={cs.id}
                className={styles.card}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-expanded={active?.id === cs.id}
                aria-label={`${L(cs.client)} — ${L(cs.title)}`}
                variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease }}
                onClick={(e) => open(cs, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open(cs, e.currentTarget);
                  }
                }}
                onMouseMove={onCardMove}
                onMouseEnter={() => playSound('ctaHover')}
              >
                <span className={styles.cardGlow} aria-hidden="true" />
                <div className={styles.cardTop}>
                  <span className={styles.industryChip}>
                    <Icon size={13} /> {L(cs.industry)}
                  </span>
                  <span className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <MapPin size={12} /> {L(cs.region)}
                    </span>
                    <span className={styles.metaItem}>
                      <CalendarDays size={12} /> {L(cs.duration)}
                    </span>
                  </span>
                </div>

                <h3 className={styles.cardClient}>{L(cs.client)}</h3>
                <p className={styles.cardTagline}>{L(cs.title)}</p>

                <div className={styles.cardBlocks}>
                  <div>
                    <span className={styles.blockLabel}>
                      <Target size={12} /> {ar ? 'التحدي' : 'CHALLENGE'}
                    </span>
                    <p className={styles.cardText}>{L(cs.challenge)}</p>
                  </div>
                  <div>
                    <span className={styles.blockLabel}>
                      <Lightbulb size={12} /> {ar ? 'حل الذكاء الاصطناعي' : 'AI SOLUTION'}
                    </span>
                    <p className={styles.cardText}>{L(cs.solution)}</p>
                  </div>
                </div>

                <div className={styles.cardKpis}>
                  {cs.kpis.slice(0, 2).map((k, i) => (
                    <KpiMini key={i} kpi={k} label={L(k.label)} reduced={reduced} />
                  ))}
                </div>

                <div className={styles.cardFoot}>
                  <span className={styles.cardImpact}>
                    <TrendingUp size={14} /> {L(cs.impact)}
                  </span>
                  <span className={styles.cardCta}>
                    {ar ? 'اقرأ قصة الحالة' : 'View case story'} <ArrowUpRight size={15} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.overlay}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            onClick={close}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={L(active.client)}
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? undefined : { scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.97, y: 16, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.32, ease }}
            >
              <CaseDetail cs={active} reduced={reduced} onClose={close} closeBtnRef={closeBtnRef} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
