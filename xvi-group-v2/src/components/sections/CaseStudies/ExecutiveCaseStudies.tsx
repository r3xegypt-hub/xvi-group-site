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
import { useCTA } from '../../../hooks/useCTA';
import { playSound } from '../../../motion/audio/soundEngine';
import styles from './ExecutiveCaseStudies.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Localized {
  en: string;
  ar: string;
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
  outcome: Localized;
  impact: Localized;
  recommendation: Localized;
  to: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'healthcare',
    industry: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    client: { en: 'Prototype Solution — Clinical Intelligence', ar: 'حل نموذجي — الذكاء السريري' },
    region: { en: 'MENA Health Sector', ar: 'قطاع الصحة — الشرق الأوسط' },
    duration: { en: 'Prototype horizon', ar: 'أفق النموذج الأولي' },
    title: {
      en: 'Turning fragmented care into a unified clinical intelligence platform.',
      ar: 'تحويل الرعاية المجزأة إلى منصة ذكاء سريري موحدة.',
    },
    challenge: {
      en: 'In many regional health groups, patient records sit siloed across facilities, discharge planning is reactive, and clinicians lose hours every day to documentation.',
      ar: 'في كثير من المجموعات الصحية بالمنطقة، تبقى سجلات المرضى معزولة بين المنشآت، ويكون تخطيط الخروج تفاعلياً، ويفقد الأطباء ساعاتٍ كل يوم في التوثيق.',
    },
    solution: {
      en: 'A prototype would pair predictive readmission scoring with NLP-driven documentation automation, governed end-to-end.',
      ar: 'يجمع النموذج الأولي بين التنبؤ بإعادة القبول وأتمتة التوثيق بالمعالجة اللغوية، مع حوكمة شاملة.',
    },
    tech: [
      { en: 'Predictive Analytics', ar: 'التحليلات التنبؤية' },
      { en: 'Natural Language Processing', ar: 'المعالجة اللغوية الطبيعية' },
      { en: 'MLOps', ar: 'عمليات تعلم الآلة' },
      { en: 'Federated Learning', ar: 'التعلم الموحد' },
    ],
    process: [
      { title: { en: 'Discovery & Data Audit', ar: 'الاكتشاف ومراجعة البيانات' }, desc: { en: 'The blueprint maps facility datasets and regulatory constraints.', ar: 'يرسم المخطط خريطة بيانات المنشآت والقيود التنظيمية.' } },
      { title: { en: 'Architecture & Governance', ar: 'البنية والحوكمة' }, desc: { en: 'Designs a privacy-first clinical data fabric.', ar: 'يصمم نسيج بيانات سريرية يضع الخصوصية أولاً.' } },
      { title: { en: 'Clinical AI Pilot', ar: 'تجربة الذكاء السريري' }, desc: { en: 'Trials readmission scoring at two pilot sites.', ar: 'يجرب تقييم إعادة القبول في موقعين تجريبيين.' } },
      { title: { en: 'Scale & Adoption', ar: 'التوسع والتبني' }, desc: { en: 'Expands network-wide with clinician enablement.', ar: 'يتوسع شبكياً مع تمكين الأطباء.' } },
    ],
    before: [
      { en: 'Siloed records across facilities', ar: 'سجلات معزولة بين المنشآت' },
      { en: 'Reactive discharge planning', ar: 'تخطيط خروج تفاعلي' },
      { en: 'Hours lost to documentation daily', ar: 'ساعات ضائعة في التوثيق يومياً' },
    ],
    after: [
      { en: 'Unified longitudinal patient view', ar: 'نظرة موحدة وشاملة للمريض' },
      { en: 'Risk-scored discharge planning', ar: 'تخطيط خروج مُقيّم بالمخاطر' },
      { en: 'Documentation reduced to minutes', ar: 'توثيق ينخفض إلى دقائق' },
    ],
    outcome: {
      en: 'If adopted, clinicians could regain hours of patient-facing time every day, and high-risk patients could be intercepted weeks earlier.',
      ar: 'إذا اعتُمد المخطط، قد يستعيد الأطباء ساعاتٍ من وقت مواجهة المرضى يومياً، وقد يُتدخَّل مع المرضى عاليي الخطورة قبل أسابيع.',
    },
    impact: {
      en: 'If adopted, patient-facing time rises and high-risk patients are intercepted earlier.',
      ar: 'عند الاعتماد، يرتفع وقت مواجهة المرضى ويُتدخَّل مع عاليي الخطورة مبكراً.',
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
    client: { en: 'Reference Implementation — Project Control', ar: 'تنفيذ مرجعي — التحكم بالمشاريع' },
    region: { en: 'Gulf Infrastructure Sector', ar: 'قطاع البنية التحتية — الخليج' },
    duration: { en: 'Reference blueprint', ar: 'مخطط مرجعي' },
    title: {
      en: 'Keeping megaprojects on schedule with AI-driven schedule intelligence.',
      ar: 'إبقاء المشاريع الكبرى على جدولها بذكاء جدولة مدعوم بالذكاء الاصطناعي.',
    },
    challenge: {
      en: 'Large infrastructure portfolios are often managed from fragmented spreadsheets, with schedule risk discovered weeks after it materializes and no single source of project truth.',
      ar: 'كثيراً ما تُدار محافظ البنية التحتية الكبرى عبر جداول بيانات مجزأة، مع اكتشاف مخاطر الجدولة بعد أسابيع من حدوثها وبدون مصدر واحد للحقيقة.',
    },
    solution: {
      en: 'A reference implementation would fuse schedule, cost, and procurement data into a project control intelligence layer that predicts slippage before it happens.',
      ar: 'يجمع التنفيذ المرجعي بيانات الجدولة والتكلفة والمشتريات في طبقة ذكاء للتحكم بالمشاريع تتنبأ بالتأخير قبل حدوثه.',
    },
    tech: [
      { en: 'Digital Twin Simulation', ar: 'محاكاة التوأم الرقمي' },
      { en: 'Predictive Risk Models', ar: 'نماذج المخاطر التنبؤية' },
      { en: 'Computer Vision', ar: 'رؤية حاسوبية' },
      { en: 'Portfolio Analytics', ar: 'تحليلات المحفظة' },
    ],
    process: [
      { title: { en: 'Portfolio Data Fusion', ar: 'دمج بيانات المحفظة' }, desc: { en: 'Fuses source systems into one truth model.', ar: 'يدمج أنظمة المصادر في نموذج حقيقة واحد.' } },
      { title: { en: 'Risk Baseline', ar: 'خط الأساس للمخاطر' }, desc: { en: 'Trains slippage predictors on historical delivery.', ar: 'يدرب متنبئات التأخير على بيانات التسليم التاريخية.' } },
      { title: { en: 'Live Control Tower', ar: 'برج التحكم المباشر' }, desc: { en: 'Builds real-time early-warning dashboards.', ar: 'يبني لوحات إنذار مبكر لحظية.' } },
      { title: { en: 'Governance Embedding', ar: 'دمج الحوكمة' }, desc: { en: 'Weaves intelligence into weekly executive reviews.', ar: 'ينسج الذكاء في المراجعات التنفيذية الأسبوعية.' } },
    ],
    before: [
      { en: 'Risk discovered weeks late', ar: 'اكتشاف المخاطر متأخراً بأسابيع' },
      { en: 'Fragmented spreadsheets', ar: 'جداول بيانات مجزأة' },
      { en: 'Reactive re-planning', ar: 'إعادة تخطيط تفاعلية' },
    ],
    after: [
      { en: 'Slippage predicted weeks ahead', ar: 'توقع التأخير قبل أسابيع' },
      { en: 'Single source of truth', ar: 'مصدر واحد للحقيقة' },
      { en: 'Pre-emptive mitigation', ar: 'معالجة استباقية' },
    ],
    outcome: {
      en: 'If adopted, slippage could be predicted weeks ahead and de-risked before it touches the critical path.',
      ar: 'إذا اعتُمد المخطط، قد يُتوقع التأخير قبل أسابيع وتُخفَّض مخاطره قبل أن يمس المسار الحرج.',
    },
    impact: {
      en: 'If adopted, every megaproject in the portfolio could be run from one live picture of risk.',
      ar: 'عند الاعتماد، قد يُدار كل مشروع كبير في المحفظة من صورة حية واحدة للمخاطر.',
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
    client: { en: 'Executive Scenario — Commerce AI', ar: 'سيناريو تنفيذي — ذكاء التجارة' },
    region: { en: 'Regional Retail Sector', ar: 'قطاع التجزئة — المنطقة' },
    duration: { en: 'Scenario build', ar: 'بناء السيناريو' },
    title: {
      en: 'Hyper-personalizing every touchpoint across a retail network.',
      ar: 'تخصيص مفرط لكل نقطة تواصل عبر شبكة تجزئة.',
    },
    challenge: {
      en: 'One-size-fits-all campaigns leave conversion flat, while basket data holds signals no human team can operationalize at scale.',
      ar: 'حملات موحدة تُبقي التحويل ثابتاً، بينما تحتوي بيانات السلة على إشارات لا يستطيع فريق بشري تشغيلها على نطاق واسع.',
    },
    solution: {
      en: 'The scenario pairs a commerce-grade personalization engine with real-time offers, recommendations, and inventory-aware merchandising.',
      ar: 'يجمع السيناريو بين محرك تخصيص تجاري وعروض وتوصيات لحظية وتسويق واعٍ بالمخزون.',
    },
    tech: [
      { en: 'Recommendation Engines', ar: 'محركات التوصية' },
      { en: 'Real-Time Inference', ar: 'الاستدلال اللحظي' },
      { en: 'Customer 360 Graph', ar: 'رسم بياني للعميل 360' },
      { en: 'Dynamic Pricing', ar: 'التسعير الديناميكي' },
    ],
    process: [
      { title: { en: 'Customer Graph Build', ar: 'بناء رسم العميل' }, desc: { en: 'Unifies online and in-store identities.', ar: 'يوحد الهويات عبر الإنترنت وداخل المتاجر.' } },
      { title: { en: 'Personalization Pilot', ar: 'تجربة التخصيص' }, desc: { en: 'A/B tests engines in flagship stores.', ar: 'يختبر المحركات تجريبياً في المتاجر الرئيسية.' } },
      { title: { en: 'Network Rollout', ar: 'نشر الشبكة' }, desc: { en: 'Scales to all locations.', ar: 'يوسع النطاق إلى كل المواقع.' } },
      { title: { en: 'Merchandising Loop', ar: 'حلقة التسويق' }, desc: { en: 'Closes the loop with inventory-aware offers.', ar: 'يغلق الحلقة بعروض واعية بالمخزون.' } },
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
    outcome: {
      en: 'If adopted, conversion could lift meaningfully as every offer becomes individualized in real time.',
      ar: 'إذا اعتُمد السيناريو، قد يرتفع التحويل بشكل ملموس مع تخصيص كل عرض لحظياً.',
    },
    impact: {
      en: 'If adopted, basket data could become margin — decided in real time across the network.',
      ar: 'عند الاعتماد، قد تتحول بيانات السلة إلى هامش ربح — يُقرَّر لحظياً عبر الشبكة.',
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
    client: { en: 'Concept Project — Industrial AI', ar: 'مشروع مفاهيمي — الذكاء الصناعي' },
    region: { en: 'Regional Manufacturing Sector', ar: 'قطاع التصنيع — المنطقة' },
    duration: { en: 'Concept blueprint', ar: 'مخطط مفاهيمي' },
    title: {
      en: 'Turning machine data into operational advantage with industrial AI.',
      ar: 'تحويل بيانات الآلات إلى ميزة تشغيلية بالذكاء الاصطناعي الصناعي.',
    },
    challenge: {
      en: 'Plant floors generate massive telemetry, yet unplanned downtime, climbing energy costs, and operator overload still go unmanaged without predictive intelligence.',
      ar: 'تولّد أرضيات المصانع كميات هائلة من القياسات، ومع ذلك يبقى التوقف غير المخطط وتكاليف الطاقة المرتفعة وإرهاق المشغلين بلا إدارة دون ذكاء تنبؤي.',
    },
    solution: {
      en: 'The concept fuses predictive maintenance, energy optimization, and anomaly detection into one industrial AI stack at the plant edge.',
      ar: 'يدمج المفهوم الصيانة التنبؤية وتحسين الطاقة واكتشاف الشذوذ في حزمة ذكاء صناعي واحدة على حافة المصنع.',
    },
    tech: [
      { en: 'Predictive Maintenance', ar: 'الصيانة التنبؤية' },
      { en: 'Anomaly Detection', ar: 'اكتشاف الشذوذ' },
      { en: 'Edge Inference', ar: 'الاستدلال على الحافة' },
      { en: 'Time-Series Modeling', ar: 'نمذجة السلاسل الزمنية' },
    ],
    process: [
      { title: { en: 'Sensor Telemetry Audit', ar: 'مراجعة قياس الاستشعار' }, desc: { en: 'Tags and normalizes asset classes.', ar: 'يضع علامات ويطبّع فئات الأصول.' } },
      { title: { en: 'Edge Pilot Line', ar: 'خط تجريبي على الحافة' }, desc: { en: 'Trials models on one production line.', ar: 'يجرب النماذج على خط إنتاج واحد.' } },
      { title: { en: 'Plant Rollout', ar: 'نشر المصانع' }, desc: { en: 'Scales intelligence across plants.', ar: 'يوسع الذكاء عبر المصانع.' } },
      { title: { en: 'Continuous Learning', ar: 'التعلم المستمر' }, desc: { en: 'Automates retraining from live failures.', ar: 'يؤتمت إعادة التدريب من الأعطال الحية.' } },
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
    outcome: {
      en: 'If adopted, unplanned downtime could fall as maintenance turns predictive rather than reactive.',
      ar: 'إذا اعتُمد المفهوم، قد ينخفض التوقف غير المخطط مع تحول الصيانة إلى تنبؤية بدلاً من تفاعلية.',
    },
    impact: {
      en: 'If adopted, plants could run on predicted — not reacted — maintenance, releasing capacity without new machines.',
      ar: 'عند الاعتماد، قد تعمل المصانع على صيانة متوقعة لا تفاعلية، محررة طاقة دون آلات جديدة.',
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
    client: { en: 'Executive Scenario — Citizen Services', ar: 'سيناريو تنفيذي — خدمات المواطن' },
    region: { en: 'Municipal Government Sector', ar: 'قطاع الحكومات المحلية' },
    duration: { en: 'Scenario build', ar: 'بناء السيناريو' },
    title: {
      en: 'Modernizing citizen services through secure, data-driven governance.',
      ar: 'تحديث الخدمات الحكومية عبر حوكمة آمنة مبنية على البيانات.',
    },
    challenge: {
      en: 'Many municipalities run separate service portals, slow back-office approvals, and plan from annual guesses rather than live citizen demand.',
      ar: 'تشغّل بلديات كثيرة بوابات خدمات منفصلة وموافقات داخلية بطيئة، وتخطط من تخمينات سنوية بدلاً من طلب المواطن الحي.',
    },
    solution: {
      en: 'The scenario wraps applications, back-office workflows, and decision dashboards into one sovereign service-intelligence layer.',
      ar: 'يلف السيناريو الطلبات وسير العمل الداخلي ولوحات القرار في طبقة ذكاء خدمات سيادية واحدة.',
    },
    tech: [
      { en: 'Intelligent Automation', ar: 'الأتمتة الذكية' },
      { en: 'Document Understanding', ar: 'فهم المستندات' },
      { en: 'Sovereign Cloud', ar: 'السحابة السيادية' },
      { en: 'Service Analytics', ar: 'تحليلات الخدمات' },
    ],
    process: [
      { title: { en: 'Service Audit', ar: 'مراجعة الخدمات' }, desc: { en: 'Maps municipal services and their queues.', ar: 'يرسم خريطة الخدمات البلدية وطوابيرها.' } },
      { title: { en: 'Unified Portal', ar: 'بوابة موحدة' }, desc: { en: 'Merges portals into one channel.', ar: 'يدمج البوابات في قناة واحدة.' } },
      { title: { en: 'Workflow Automation', ar: 'أتمتة سير العمل' }, desc: { en: 'Automates back-office approvals.', ar: 'يؤتمت الموافقات الداخلية.' } },
      { title: { en: 'Governance Dashboard', ar: 'لوحة الحوكمة' }, desc: { en: 'Gives leadership a live service picture.', ar: 'يمنح القيادة صورة حية للخدمات.' } },
    ],
    before: [
      { en: 'Siloed service portals', ar: 'بوابات خدمات معزولة' },
      { en: 'Slow back-office approvals', ar: 'موافقات داخلية بطيئة' },
      { en: 'Anecdotal planning', ar: 'تخطيط قائم على الانطباع' },
    ],
    after: [
      { en: 'One unified citizen channel', ar: 'قناة مواطن موحدة' },
      { en: 'Same-day digital approvals', ar: 'موافقات رقمية في نفس اليوم' },
      { en: 'Evidence-based allocation', ar: 'تخصيص مبنٍ على الأدلة' },
    ],
    outcome: {
      en: 'If adopted, service turnaround could collapse from days toward same-day approvals.',
      ar: 'إذا اعتُمد السيناريو، قد ينهار زمن إنجاز الخدمات من أيام نحو موافقات في نفس اليوم.',
    },
    impact: {
      en: 'If adopted, leadership could plan from live citizen demand instead of annual guesses.',
      ar: 'عند الاعتماد، قد تخطط القيادة من طلب المواطن الحي بدلاً من التخمين السنوي.',
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
    client: { en: 'Reference Implementation — Revenue Intelligence', ar: 'تنفيذ مرجعي — ذكاء الإيرادات' },
    region: { en: 'North Africa Hospitality Sector', ar: 'قطاع الضيافة — شمال أفريقيا' },
    duration: { en: 'Reference blueprint', ar: 'مخطط مرجعي' },
    title: {
      en: 'Crafting unforgettable guest journeys with revenue intelligence.',
      ar: 'صناعة رحلات ضيوف لا تُنسى بذكاء الإيرادات.',
    },
    challenge: {
      en: 'Static rate cards and generic upselling leave revenue on the table, while guest preferences vanish after checkout.',
      ar: 'بطاقات أسعار ثابتة وعروض بيع إضافي عامة تترك الإيرادات دون استثمار، بينما تختفي تفضيلات الضيوف بعد المغادرة.',
    },
    solution: {
      en: 'A reference implementation would pair dynamic pricing with preference-driven guest orchestration across the portfolio.',
      ar: 'يجمع التنفيذ المرجعي بين التسعير الديناميكي وتنسيق الضيوف القائم على التفضيلات عبر المحفظة.',
    },
    tech: [
      { en: 'Demand Forecasting', ar: 'التنبؤ بالطلب' },
      { en: 'Dynamic Pricing', ar: 'التسعير الديناميكي' },
      { en: 'Guest Preference AI', ar: 'ذكاء تفضيلات الضيوف' },
      { en: 'RevPAR Analytics', ar: 'تحليلات الإيراد لكل غرفة' },
    ],
    process: [
      { title: { en: 'Guest Data Foundation', ar: 'أساس بيانات الضيوف' }, desc: { en: 'Unifies PMS, CRM, and review data.', ar: 'يوحد بيانات إدارة المنشآت والعملاء والمراجعات.' } },
      { title: { en: 'Pricing Pilot', ar: 'تجربة التسعير' }, desc: { en: 'Trials dynamic pricing on select properties.', ar: 'يجرب التسعير الديناميكي في منشآت مختارة.' } },
      { title: { en: 'Journey Orchestration', ar: 'تنسيق الرحلة' }, desc: { en: 'Designs preference-aware stay orchestration.', ar: 'يصمم تنسيق إقامة واعٍ بالتفضيلات.' } },
      { title: { en: 'Portfolio Learning', ar: 'تعلم المحفظة' }, desc: { en: 'Shares intelligence across the portfolio.', ar: 'يشارك الذكاء عبر المحفظة.' } },
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
    outcome: {
      en: 'If adopted, every room could be priced from live demand and every returning guest recognized by preference.',
      ar: 'إذا اعتُمد المخطط، قد تُسعَّر كل غرفة من الطلب الحي ويُتعرَّف على كل ضيف عائد من تفضيلاته.',
    },
    impact: {
      en: 'If adopted, revenue is priced live and guests are remembered — across every stay.',
      ar: 'عند الاعتماد، تُسعَّر الإيرادات لحظياً ويُتذكَّر الضيوف — عبر كل إقامة.',
    },
    recommendation: {
      en: 'Extend the guest memory to food-and-beverage and spa, and add seasonal event pricing for the next calendar.',
      ar: 'توسيع ذاكرة الضيف لتشمل المأكولات والمشروبات والمنتجعات، وإضافة تسعير المناسبات الموسمية للتقويم القادم.',
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
              <Target size={13} /> {ar ? 'السيناريو' : 'THE SCENARIO'}
            </span>
            <p className={styles.blockText}>{L(cs.challenge)}</p>
          </div>
          <div className={styles.block}>
            <span className={styles.blockLabel}>
              <Lightbulb size={13} /> {ar ? 'مخطط XVI' : 'THE XVI BLUEPRINT'}
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
          <span className={styles.groupLabel}>{ar ? 'المخطط المقترح' : 'PROPOSED BLUEPRINT'}</span>
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
          <span className={styles.groupLabel}>{ar ? 'الواقع الحالي / الهدف المُصمَّم' : 'CURRENT REALITY / DESIGNED TARGET'}</span>
          <div className={styles.baGrid}>
            <div className={styles.before}>
              <span className={styles.baTitle}>
                <Minus size={13} /> {ar ? 'الواقع الحالي' : 'Current Reality'}
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
                <Check size={13} /> {ar ? 'الهدف المُصمَّم' : 'Designed Target'}
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
          <span className={styles.groupLabel}>{ar ? 'النتائج المحتملة' : 'POSSIBLE OUTCOMES'}</span>
          <p className={styles.outcome}>{L(cs.outcome)}</p>
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
    <section className={styles.section} aria-label={ar ? 'دراسات السيناريو التنفيذية' : 'Executive scenario studies'}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'دراسات السيناريو' : 'SCENARIO STUDIES'}
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {ar ? 'دراسات السيناريو التنفيذية' : 'Executive Scenario Studies'}
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? 'ستة مخططات — مشاريع مفاهيمية، وتنفيذات مرجعية، وسيناريوهات تنفيذية، وحلول نموذجية. حكايات لكسب الثقة، لا إحصاءات.'
              : 'Six blueprints — concept projects, reference implementations, executive scenarios, and prototype solutions. Narratives to earn trust, never statistics.'}
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
                      <Target size={12} /> {ar ? 'السيناريو' : 'SCENARIO'}
                    </span>
                    <p className={styles.cardText}>{L(cs.challenge)}</p>
                  </div>
                  <div>
                    <span className={styles.blockLabel}>
                      <Lightbulb size={12} /> {ar ? 'المخطط' : 'BLUEPRINT'}
                    </span>
                    <p className={styles.cardText}>{L(cs.solution)}</p>
                  </div>
                </div>

                <div className={styles.cardFoot}>
                  <span className={styles.cardImpact}>
                    <TrendingUp size={14} /> {L(cs.impact)}
                  </span>
                  <span className={styles.cardCta}>
                    {ar ? 'استعرض السيناريو' : 'View scenario'} <ArrowUpRight size={15} />
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
