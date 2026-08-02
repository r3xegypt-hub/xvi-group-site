export type Lang = 'en' | 'ar';

export type Intent =
  | 'greeting'
  | 'project'
  | 'estimation'
  | 'factual'
  | 'smalltalk'
  | 'unknown';

export type ProjectType =
  | 'website'
  | 'ecommerce'
  | 'mobile'
  | 'ai'
  | 'chatbot'
  | 'erp'
  | 'automation'
  | 'dashboard'
  | 'data'
  | 'software'
  | 'unknown';

export type Stage =
  | 'idle'
  | 'intake-industry'
  | 'intake-goal'
  | 'intake-timeline'
  | 'intake-size'
  | 'consult'
  | 'offer';

export interface ConversationState {
  stage: Stage;
  projectType: ProjectType | null;
  industry: string | null;
  goal: string | null;
  timeline: string | null;
  size: string | null;
  exchanges: number;
  contactOffered: boolean;
}

export interface Recommendation {
  service: string;
  why: string;
}

export interface Estimation {
  understanding: string;
  phases: string[];
  services: string[];
  team: string[];
  duration: string;
  technologies: string[];
}

export interface ClassifiedInput {
  intent: Intent;
  projectType: ProjectType | null;
  projectLabel: { en: string; ar: string } | null;
}

export function createState(): ConversationState {
  return {
    stage: 'idle',
    projectType: null,
    industry: null,
    goal: null,
    timeline: null,
    size: null,
    exchanges: 0,
    contactOffered: false,
  };
}

const normalize = (t: string) => t.toLowerCase().trim();

const has = (t: string, patterns: RegExp[]) => patterns.some((re) => re.test(t));

// ---------------------------------------------------------------------------
// INTENT CLASSIFICATION
// ---------------------------------------------------------------------------

const GREETING_EN: RegExp[] = [
  /^(hi|hii+|hiii+|hello|hey|hiya|yo|good\s*morning|good\s*evening|good\s*afternoon)\b/i,
  /^(morning|evening)\b/i,
];
const GREETING_AR: RegExp[] = [
  /^(هاي|هاي|اهلا|أهلا|أهلاً|اهلاً|السلام عليكم|السلام|الو|ألو|هلا|هيلو|مرحبا|مرحباً|صباح الخير|مساء الخير|مساء النور|ازيك|إزيك|كيفك|كيف حالك|شلونك)\b/,
  /^\s*(وعليكم السلام|مع السلامة)\b/,
];

const PROJECT_EN: RegExp[] = [
  /\b(i|we) (need|want|would like|are looking to|want to|am looking to)\b/i,
  /\b(i|we) (need|want|would like|are looking to|want to)\s+(to\s+)?(build|develop|create|make|design|launch|start|get|have)\b/i,
  /\b(i|we) have a (project|idea|product|system)\b/i,
  /\bhelp (me|us) (build|develop|create|launch|make)\b/i,
  /\b(i|we|need|wanted) (an? )?(app|website|ecommerce|erp|system|automation|dashboard|chatbot|bot|ai)\b/i,
];
const PROJECT_AR: RegExp[] = [
  /(نحتاج|أحتاج|احتاج|أريد|اريد|نريد|أرغب|ارغب|عندي|عندنا|لدينا|نبي|نبغى|بغيت)\s/,
  /(عندي|عندنا|لدينا)\s+(مشروع|فكرة|منتج|نظام)\b/,
  /(ساعدني|ساعدوني|ساعدنا)\s+(في|على)?\s*(بناء|تطوير|إنشاء|انشاء|تصميم|إطلاق)/,
];

const ESTIMATION_EN: RegExp[] = [
  /\b(how much|cost|price|pricing|quote|estimate|budget|fee|rates|what would .{0,20}(cost|run))\b/i,
  /\b(estimation|estimates|proposal|quote)\b/i,
];
const ESTIMATION_AR: RegExp[] = [
  /(كم التكلفة|كم تكلفة|كم يكلف|كم سعر|السعر|التسعير|عرض سعر|تقدير التكلفة|التقدير المبدئي|الميزانية|ما تكلفة)\b/,
];

const THANKS_EN: RegExp[] = [/^(thanks|thank you|thx|ty|appreciated|merci)\b/i, /\bthanks a lot\b/i, /\b(ok|okay|great|perfect|nice) thanks\b/i];
const THANKS_AR: RegExp[] = [/^(شكراً|شكرا|مشكور|يعطيك العافية|تسلم|الله يعطيك العافية)\b/, /^(تمام|حسناً|اوكي|ممتاز) (شكراً|شكرا)/];
const BYE_EN: RegExp[] = [/^(bye|goodbye|see you|cya|talk later)\b/i];
const BYE_AR: RegExp[] = [/^(مع السلامة|وداعاً|بااي|باي|إلى اللقاء)\b/];

const TYPE_PATTERNS: { type: ProjectType; en: RegExp[]; ar: RegExp[] }[] = [
  {
    type: 'ecommerce',
    en: [/\be-?commerce\b/i, /\bonline store\b/i, /\bshop(ping)?\s+(site|store|website)?\b/i, /\bsell(ing)? online\b/i, /\bmall\b/i],
    ar: [/(تجارة إلكترونية|متجر إلكتروني|متجر|متاجر|بيع أونلاين|بيعه أونلاين|تسوق أونلاين)/],
  },
  {
    type: 'mobile',
    en: [/\bmobile app\b/i, /\bios app\b/i, /\bandroid app\b/i, /\bapps?\b/i, /\bapp for (ios|android)\b/i],
    ar: [/(تطبيق جوال|تطبيق موبايل|تطبيق ايفون|تطبيق اندرويد|تطبيق|تطبيقات|موبايل أبل|أبلكيشن)/],
  },
  {
    type: 'chatbot',
    en: [/\bchat ?bot\b/i, /\bbot\b/i, /\bai assistant\b/i, /\bconversational ai\b/i, /\bvirtual assistant\b/i, /\blive chat (ai|assistant)\b/i],
    ar: [/(شات بوت|شاتبوت|بوت محادثة|مساعد ذكي|مساعد دردشة|بوت)/],
  },
  {
    type: 'erp',
    en: [/\berp\b/i, /\bcrm\b/i, /\binventory (system|management)\b/i, /\baccounting (system|software)\b/i, /\bbusiness (system|software|platform)\b/i, /\bmanagement (system|platform)\b/i, /\bsupply chain system\b/i],
    ar: [/(نظام إدارة|إدارة الموارد|محاسبة|مخزون|مستودعات|إدارة أعمال|ساب|ERP|سي آر ام)/],
  },
  {
    type: 'automation',
    en: [/\bautomation\b/i, /\brpa\b/i, /\bworkflow (automation|system)\b/i, /\bautomate\b/i, /\bprocess automation\b/i],
    ar: [/(أتمتة|الأتمتة|روبوتات العمليات|تدفق العمل|عملية تلقائية|تلقيم)/],
  },
  {
    type: 'dashboard',
    en: [/\bdashboard\b/i, /\bbusiness intelligence\b/i, /\banalytics (dashboard|panel)\b/i, /\breporting (system|tool|platform)\b/i],
    ar: [/(لوحة تحكم|لوحات تحكم|لوحة معلومات|تقارير|ذكاء أعمال|تحليلات)/],
  },
  {
    type: 'data',
    en: [/\bdata (platform|warehouse|pipeline|engineering|analytics)\b/i, /\bdata analysis\b/i, /\banalytics\b/i, /\bbig data\b/i],
    ar: [/(تحليل بيانات|منصة بيانات|مستودع بيانات|البيانات|ذكاء تحليلي)/],
  },
  {
    type: 'ai',
    en: [/\bai\b/i, /\bartificial intelligence\b/i, /\bmachine learning\b/i, /\bml model\b/i, /\bllm\b/i, /\bgen ?ai\b/i, /\bgenerative ai\b/i, /\bintelligence system\b/i],
    ar: [/(ذكاء اصطناعي|ذكاء إصطناعي|تعلم آلة|تعلم الآلة|نماذج لغوية|توليدية)/],
  },
  {
    type: 'website',
    en: [/\bwebsite\b/i, /\bweb ?site\b/i, /\blanding page\b/i, /\bcorporate site\b/i, /\bweb page\b/i, /\bsite\b/i, /\bweb\b/i],
    ar: [/(موقع إلكتروني|موقع ويب|موقع|صفحة هبوط|صفحة رئيسية|ويب)/],
  },
  {
    type: 'software',
    en: [/\bsoftware\b/i, /\bcustom (software|system|platform)\b/i, /\bplatform\b/i, /\bsystem\b/i, /\bsaas\b/i],
    ar: [/(برمجية|برنامج|نظام برمجي|منصة|تطبيق ويب|سوق)/],
  },
];

export function classifyInput(raw: string): ClassifiedInput {
  const t = normalize(raw);
  if (!t) return { intent: 'unknown', projectType: null, projectLabel: null };

  if (has(t, GREETING_EN) || has(t, GREETING_AR)) {
    return { intent: 'greeting', projectType: null, projectLabel: null };
  }
  if (has(t, THANKS_EN) || has(t, THANKS_AR) || has(t, BYE_EN) || has(t, BYE_AR)) {
    return { intent: 'smalltalk', projectType: null, projectLabel: null };
  }

  const type = detectProjectType(t);

  const isProject = has(t, PROJECT_EN) || has(t, PROJECT_AR);
  const isEstimation = has(t, ESTIMATION_EN) || has(t, ESTIMATION_AR);

  if (isProject) {
    return { intent: 'project', projectType: type, projectLabel: projectLabel(type) };
  }
  if (isEstimation && type !== null) {
    return { intent: 'estimation', projectType: type, projectLabel: projectLabel(type) };
  }
  if (isEstimation) {
    return { intent: 'estimation', projectType: null, projectLabel: null };
  }
  if (type !== null) {
    return { intent: 'project', projectType: type, projectLabel: projectLabel(type) };
  }

  return { intent: 'factual', projectType: null, projectLabel: null };
}

export function detectProjectType(t: string): ProjectType | null {
  const n = normalize(t);
  for (const group of TYPE_PATTERNS) {
    if (has(n, group.en) || has(n, group.ar)) return group.type;
  }
  return null;
}

export function projectLabel(type: ProjectType | null): { en: string; ar: string } | null {
  if (!type) return null;
  const labels: Record<ProjectType, { en: string; ar: string }> = {
    website: { en: 'website', ar: 'موقع إلكتروني' },
    ecommerce: { en: 'e-commerce store', ar: 'متجر إلكتروني' },
    mobile: { en: 'mobile app', ar: 'تطبيق جوال' },
    ai: { en: 'AI system', ar: 'نظام ذكاء اصطناعي' },
    chatbot: { en: 'AI chatbot', ar: 'بوت محادثة ذكي' },
    erp: { en: 'ERP / business system', ar: 'نظام إدارة المؤسسات' },
    automation: { en: 'automation system', ar: 'نظام أتمتة' },
    dashboard: { en: 'analytics dashboard', ar: 'لوحة تحكم تحليلية' },
    data: { en: 'data platform', ar: 'منصة بيانات' },
    software: { en: 'software platform', ar: 'منصة برمجية' },
    unknown: { en: 'digital project', ar: 'مشروع رقمي' },
  };
  return labels[type];
}

// ---------------------------------------------------------------------------
// GREETINGS
// ---------------------------------------------------------------------------

export function greetingResponse(lang: Lang, raw: string): { en: string; ar: string } {
  const t = normalize(raw);
  if (t.includes('صباح الخير')) {
    return {
      en: 'Good morning. I hope your day is off to a strong start — how can I help you make a clearer decision today?',
      ar: 'صباح الخير. أسعد الله صباحك — كيف أساعدك اليوم في اتخاذ قرار أوضح؟',
    };
  }
  if (t.includes('مساء الخير')) {
    return {
      en: 'Good evening. How can I support your thinking tonight?',
      ar: 'مساء الخير. كيف أساعدك هذا المساء؟',
    };
  }
  if (t.includes('السلام عليكم')) {
    return {
      en: 'And peace be upon you. I am your Executive AI Consultant at XVI GROUP — how may I help you?',
      ar: 'وعليكم السلام ورحمة الله وبركاته. أنا مستشارك التنفيذي الذكي في XVI GROUP — كيف أستطيع مساعدتك؟',
    };
  }
  if (t.includes('ازيك') || t.includes('إزيك')) {
    return {
      en: "I'm well, thank you — and I'm ready to help you. What are you trying to achieve?",
      ar: 'أنا بخير والحمد لله، وجاهز لمساعدتك. ما الذي تسعى لتحقيقه؟',
    };
  }
  if (t.includes('الو') || t.includes('ألو')) {
    return {
      en: 'Hello — this is the XVI Executive AI. What would you like to explore?',
      ar: 'أهلاً بك — معك المستشار التنفيذي لـ XVI. بماذا تود أن نبدأ؟',
    };
  }
  if (lang === 'ar') {
    return {
      en: 'Welcome. I am your Executive AI Consultant — what are you trying to achieve?',
      ar: 'أهلاً بك. أنا مستشارك التنفيذي الذكي — ما الذي تريد تحقيقه؟',
    };
  }
  return {
    en: "Hello — I'm your Executive AI Consultant at XVI GROUP. What are you trying to achieve today?",
    ar: 'مرحباً — أنا مستشارك التنفيذي الذكي في XVI GROUP. ما الذي تريد تحقيقه اليوم؟',
  };
}

// ---------------------------------------------------------------------------
// WELCOME / CAPABILITIES (shown when the AI opens)
// ---------------------------------------------------------------------------

export const WELCOME: Record<Lang, { title: string; body: string; capabilities: string[] }> = {
  en: {
    title: 'Welcome to XVI GROUP.',
    body: "I'm your Executive AI Consultant. I listen first, then guide — I help you shape strategy, technology, AI transformation, and executive projects from idea to plan.",
    capabilities: [
      'Strategy & Roadmaps',
      'Technology & Automation',
      'AI Transformation',
      'Executive Training',
      'Project Estimation',
    ],
  },
  ar: {
    title: 'أهلاً بك في XVI GROUP.',
    body: 'أنا مستشارك التنفيذي الذكي. أستمع أولاً ثم أرشدك — أساعدك في صياغة الاستراتيجية والتكنولوجيا والتحول بالذكاء الاصطناعي والمشاريع التنفيذية من الفكرة إلى الخطة.',
    capabilities: [
      'الاستراتيجية وخارطة الطريق',
      'التكنولوجيا والأتمتة',
      'التحول بالذكاء الاصطناعي',
      'التدريب التنفيذي',
      'تقدير المشاريع',
    ],
  },
};

// ---------------------------------------------------------------------------
// INTAKE FLOW (Understand -> Ask)
// ---------------------------------------------------------------------------

export function intakeQuestion(state: ConversationState, lang: Lang): { question: string; stage: Stage } {
  switch (state.stage) {
    case 'intake-industry':
      return {
        question:
          lang === 'en'
            ? 'To tailor my recommendation — which industry do you operate in?'
            : 'لأخصص لك التوصية — في أي قطاع تعمل؟',
        stage: 'intake-industry',
      };
    case 'intake-goal':
      return {
        question:
          lang === 'en'
            ? 'And what is the primary goal for this project?'
            : 'وما الهدف الأساسي من هذا المشروع؟',
        stage: 'intake-goal',
      };
    case 'intake-timeline':
      return {
        question:
          lang === 'en'
            ? 'What timeline are you working toward?'
            : 'ما هو الإطار الزمني الذي تستهدفه؟',
        stage: 'intake-timeline',
      };
    case 'intake-size':
      return {
        question:
          lang === 'en'
            ? 'Finally — roughly how large is your company or team?'
            : 'وأخيراً — ما هو حجم شركتك أو فريقك تقريباً؟',
        stage: 'intake-size',
      };
    default:
      return {
        question:
          lang === 'en'
            ? 'Before I recommend anything — could you tell me about your project and what you are trying to achieve?'
            : 'قبل أن أوصيك بأي شيء — هل تخبرني عن مشروعك وما الذي تحاول تحقيقه؟',
        stage: 'idle',
      };
  }
}

export function advanceIntake(state: ConversationState): ConversationState {
  const next: ConversationState = { ...state };
  switch (state.stage) {
    case 'intake-industry':
      next.stage = 'intake-goal';
      break;
    case 'intake-goal':
      next.stage = 'intake-timeline';
      break;
    case 'intake-timeline':
      next.stage = 'intake-size';
      break;
    case 'intake-size':
      next.stage = 'consult';
      break;
    default:
      next.stage = 'intake-industry';
  }
  return next;
}

export function beginIntake(state: ConversationState, type: ProjectType | null): ConversationState {
  return {
    ...state,
    stage: 'intake-industry',
    projectType: type,
    industry: null,
    goal: null,
    timeline: null,
    size: null,
  };
}

// ---------------------------------------------------------------------------
// RECOMMENDATIONS (with WHY)
// ---------------------------------------------------------------------------

const REC_BUNDLES: Record<ProjectType, { en: Recommendation[]; ar: Recommendation[] }> = {
  ecommerce: {
    en: [
      { service: 'Website / E-commerce Development', why: 'a fast, conversion-first store is your storefront' },
      { service: 'UI/UX Design', why: 'clear product pages and checkout directly lift sales' },
      { service: 'AI Integration', why: 'personalized recommendations and smart search increase average order value' },
      { service: 'Analytics', why: 'you need to see where customers drop off before spending more' },
      { service: 'Automation', why: 'order, inventory and customer-service workflows scale without adding headcount' },
    ],
    ar: [
      { service: 'تطوير المتجر الإلكتروني', why: 'لأن متجراً سريعاً وموجهاً للتحويل هو واجهتك الأساسية' },
      { service: 'تصميم تجربة المستخدم UI/UX', why: 'لأن صفحات المنتج وسلة الشراء الواضحة ترفع المبيعات مباشرة' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'لأن التوصيات المخصصة والبحث الذكي يرفعان متوسط قيمة الطلب' },
      { service: 'التحليلات', why: 'لتعرف أين يتوقف العملاء قبل أن تنفق المزيد' },
      { service: 'الأتمتة', why: 'لأن أتمتة الطلبات والمخزون وخدمة العملاء تتوسع دون زيادة الموظفين' },
    ],
  },
  website: {
    en: [
      { service: 'Website Development', why: 'a clean, fast site is the foundation of your presence' },
      { service: 'UI/UX Design', why: 'visitors decide in seconds — structure and clarity win trust' },
      { service: 'Analytics', why: 'measure what works so every improvement is evidence-based' },
      { service: 'AI Integration', why: 'intelligent search and personalization turn visitors into leads' },
    ],
    ar: [
      { service: 'تطوير الموقع الإلكتروني', why: 'لأن موقعاً نظيفاً وسريعاً هو أساس حضورك الرقمي' },
      { service: 'تصميم UI/UX', why: 'لأن الزائر يحسم قراره في ثوانٍ — الوضوح والبنية يكسبان الثقة' },
      { service: 'التحليلات', why: 'لتقيس ما ينجح فيكون كل تحسين مبنياً على دليل' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'لأن البحث الذكي والتخصيص يحوّلان الزوار إلى عملاء محتملين' },
    ],
  },
  mobile: {
    en: [
      { service: 'Mobile App Development', why: 'your product goes where your customers already are' },
      { service: 'UI/UX Design', why: 'mobile users abandon confusing apps in one session' },
      { service: 'Backend & API Architecture', why: 'the experience is only as good as the data behind it' },
      { service: 'Analytics', why: 'crash, engagement and funnel data guide each release' },
      { service: 'AI Integration', why: 'smart notifications and personalization retain users' },
    ],
    ar: [
      { service: 'تطوير تطبيقات الجوال', why: 'لأن منتجك يصل إلى عملائك أينما كانوا' },
      { service: 'تصميم UI/UX', why: 'لأن مستخدمي الجوال يهجرون التطبيق المشوش من الجلسة الأولى' },
      { service: 'هندسة الخوادم والواجهات البرمجية', why: 'لأن التجربة لا تكون جيدة إلا ببيانات خلفها جيدة' },
      { service: 'التحليلات', why: 'لأن بيانات الأعطال والتفاعل توجه كل إصدار جديد' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'لأن الإشعارات الذكية والتخصيص يحافظان على المستخدمين' },
    ],
  },
  ai: {
    en: [
      { service: 'AI Strategy & Consulting', why: 'you need a roadmap before you need models' },
      { service: 'AI Engineering', why: 'we build and integrate models that fit your data and use cases' },
      { service: 'Data Engineering', why: 'clean, connected data is what makes AI accurate' },
      { service: 'AI Governance', why: 'responsible use protects your reputation and compliance' },
    ],
    ar: [
      { service: 'استشارات واستراتيجية الذكاء الاصطناعي', why: 'لأنك تحتاج خارطة طريق قبل أن تحتاج النماذج' },
      { service: 'هندسة الذكاء الاصطناعي', why: 'نبني ونكامل النماذج التي تناسب بياناتك وحالات استخدامك' },
      { service: 'هندسة البيانات', why: 'لأن البيانات النظيفة والمترابطة هي ما يجعل الذكاء الاصطناعي دقيقاً' },
      { service: 'حوكمة الذكاء الاصطناعي', why: 'لأن الاستخدام المسؤول يحمي سمعتك وامتثالك' },
    ],
  },
  chatbot: {
    en: [
      { service: 'Conversational AI / Chatbot Development', why: 'it is your always-on first response line' },
      { service: 'AI Integration', why: 'LLM answers grounded in your data beat scripted bots' },
      { service: 'UI/UX Design', why: 'the conversation flow determines whether users stay or leave' },
      { service: 'Analytics', why: 'intent logs show you exactly what customers keep asking' },
    ],
    ar: [
      { service: 'تطوير المحادثات الذكية / البوتات', why: 'لأنه خط الاستجابة الأول الدائم لعملائك' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'الإجابات المدعومة بالنماذج اللغوية وببياناتك تتفوق على البوتات الجامدة' },
      { service: 'تصميم UI/UX', why: 'لأن تدفق المحادثة يحدد ما إذا بقى المستخدم أو غادر' },
      { service: 'التحليلات', why: 'سجلات النوايا تُظهر لك بالضبط ما يطلبه عملاؤك باستمرار' },
    ],
  },
  erp: {
    en: [
      { service: 'ERP / Business Systems Consulting', why: 'you need one source of truth across departments' },
      { service: 'Technology Consulting', why: 'the right architecture prevents lock-in and data silos' },
      { service: 'Automation', why: 'finance, inventory and reporting become continuous instead of manual' },
      { service: 'Analytics', why: 'executives need one live view of the business' },
    ],
    ar: [
      { service: 'استشارات أنظمة إدارة المؤسسات ERP', why: 'لأنك تحتاج مصدر حقيقة واحداً عبر الأقسام' },
      { service: 'استشارات التكنولوجيا', why: 'البنية الصحيحة تمنع الاحتجاز التقني وجزر البيانات' },
      { service: 'الأتمتة', why: 'لتصبح المالية والمخزون والتقارير مستمرة بدلاً من يدوية' },
      { service: 'التحليلات', why: 'لأن الإدارة تحتاج رؤية حية واحدة للأعمال' },
    ],
  },
  automation: {
    en: [
      { service: 'Automation Architecture', why: 'you automate the highest-impact, lowest-risk processes first' },
      { service: 'Technology Consulting', why: 'the right stack connects your existing systems cleanly' },
      { service: 'AI Integration', why: 'AI handles the unstructured work RPA alone cannot' },
      { service: 'Analytics', why: 'you need to measure time saved and errors eliminated' },
    ],
    ar: [
      { service: 'هندسة الأتمتة', why: 'لأتمتة العمليات الأعلى أثراً والأقل خطراً أولاً' },
      { service: 'استشارات التكنولوجيا', why: 'البنية الصحيحة تربط أنظمتك الحالية بسلاسة' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'الذكاء الاصطناعي يتعامل مع العمل غير المنظم الذي لا تستطيعه الأتمتة وحدها' },
      { service: 'التحليلات', why: 'لقياس الوقت الموفر والأخطاء التي تم استبعادها' },
    ],
  },
  dashboard: {
    en: [
      { service: 'Analytics Dashboard Development', why: 'it turns raw data into a decision surface' },
      { service: 'Data Engineering', why: 'live dashboards need clean, connected pipelines' },
      { service: 'UI/UX Design', why: 'executives must grasp the signal in one glance' },
      { service: 'AI Integration', why: 'forecasts and anomaly alerts surface problems before they grow' },
    ],
    ar: [
      { service: 'تطوير لوحات التحكم التحليلية', why: 'لتحويل البيانات الخام إلى سطح قرار واضح' },
      { service: 'هندسة البيانات', why: 'اللوحات الحية تحتاج خطوط بيانات نظيفة ومترابطة' },
      { service: 'تصميم UI/UX', why: 'يجب أن يلتقط الإدراكُ الإشارةَ في نظرة واحدة' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'التوقعات وتنبيهات الشذوذ تُظهر المشاكل قبل أن تكبر' },
    ],
  },
  data: {
    en: [
      { service: 'Data Engineering', why: 'a reliable data foundation makes everything else possible' },
      { service: 'Analytics', why: 'you turn data into decisions, not reports' },
      { service: 'AI Integration', why: 'models and forecasts extract value your queries cannot' },
      { service: 'Technology Consulting', why: 'you choose the right cloud and governance for your data' },
    ],
    ar: [
      { service: 'هندسة البيانات', why: 'الأساس الموثوق للبيانات يجعل كل شيء آخر ممكناً' },
      { service: 'التحليلات', why: 'لتحويل البيانات إلى قرارات وليست تقارير فقط' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'النماذج والتوقعات تستخرج قيمة لا تستطيع استعلاماتك الوصول إليها' },
      { service: 'استشارات التكنولوجيا', why: 'لتختار السحابة والحوكمة المناسبة لبياناتك' },
    ],
  },
  software: {
    en: [
      { service: 'Custom Software Development', why: 'off-the-shelf rarely matches your operating model' },
      { service: 'UI/UX Design', why: 'adoption depends on how the system feels to use' },
      { service: 'Technology Consulting', why: 'the right architecture keeps it fast to change' },
      { service: 'AI Integration', why: 'intelligence embedded in the product becomes your differentiator' },
    ],
    ar: [
      { service: 'تطوير البرمجيات المخصصة', why: 'لأن الحلول الجاهزة نادراً ما تناسب نموذج تشغيلك' },
      { service: 'تصميم UI/UX', why: 'لأن التبني يعتمد على مدى سلاسة استخدام النظام' },
      { service: 'استشارات التكنولوجيا', why: 'البنية الصحيحة تحافظ على سرعة التغيير' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'الذكاء المدمج في المنتج يصبح ميزتك التنافسية' },
    ],
  },
  unknown: {
    en: [
      { service: 'Business Consulting', why: 'we first clarify the outcome you are really after' },
      { service: 'Technology Consulting', why: 'the right architecture keeps your options open' },
      { service: 'AI Integration', why: 'most executive projects gain an intelligence layer' },
    ],
    ar: [
      { service: 'استشارات الأعمال', why: 'لنوضح أولاً النتيجة التي تسعى إليها فعلاً' },
      { service: 'استشارات التكنولوجيا', why: 'البنية الصحيحة تبقي خياراتك مفتوحة' },
      { service: 'تكامل الذكاء الاصطناعي', why: 'معظم المشاريع التنفيذية تكتسب طبقة ذكاء' },
    ],
  },
};

export function recommendationsFor(type: ProjectType | null, lang: Lang): Recommendation[] {
  const bundle = REC_BUNDLES[type ?? 'unknown'];
  return lang === 'ar' ? bundle.ar : bundle.en;
}

// ---------------------------------------------------------------------------
// PROJECT ESTIMATION
// ---------------------------------------------------------------------------

const ESTIMATION_CATALOG: Record<ProjectType, { en: Estimation; ar: Estimation }> = {
  website: {
    en: {
      understanding: 'A professional corporate website that establishes your presence and converts visitors into enquiries.',
      phases: ['Discovery & content architecture', 'Design (UI/UX)', 'Development', 'SEO & analytics setup', 'Launch & training'],
      services: ['Website Development', 'UI/UX Design', 'Analytics', 'AI Integration'],
      team: ['Business Consultant', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
      duration: '4–6 weeks',
      technologies: ['React', 'Next.js', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'موقع إلكتروني احترافي يرسّخ حضورك ويحوّل الزوار إلى استفسارات.',
      phases: ['الاكتشاف وهيكلة المحتوى', 'التصميم UI/UX', 'التطوير', 'التحسين لمحركات البحث والتحليلات', 'الإطلاق والتدريب'],
      services: ['تطوير المواقع', 'تصميم UI/UX', 'التحليلات', 'تكامل الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مصمم UI/UX', 'مطور واجهات أمامية', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '4–6 أسابيع',
      technologies: ['React', 'Next.js', 'Node.js', 'البنية السحابية'],
    },
  },
  ecommerce: {
    en: {
      understanding: 'A complete e-commerce operation — storefront, payments, inventory, and conversion analytics working as one system.',
      phases: ['Discovery & catalogue model', 'UX & storefront design', 'Development & integrations', 'Payments, tax & shipping', 'Testing, launch & optimization'],
      services: ['Website / E-commerce Development', 'UI/UX Design', 'AI Integration', 'Analytics', 'Automation'],
      team: ['Business Consultant', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['React', 'Next.js', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'تشغيل تجارة إلكترونية متكامل — واجهة المتجر والمدفوعات والمخزون وتحليلات التحويل كنظام واحد.',
      phases: ['الاكتشاف ونموذج الكتالوج', 'تصميم UX والواجهة', 'التطوير والتكاملات', 'المدفوعات والضرائب والشحن', 'الاختبار والإطلاق والتحسين'],
      services: ['تطوير المتاجر الإلكترونية', 'تصميم UI/UX', 'تكامل الذكاء الاصطناعي', 'التحليلات', 'الأتمتة'],
      team: ['مستشار أعمال', 'مصمم UI/UX', 'مطور واجهات أمامية', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['React', 'Next.js', 'Node.js', 'البنية السحابية'],
    },
  },
  mobile: {
    en: {
      understanding: 'A native or cross-platform mobile app that puts your product in your customers’ hands with a polished experience.',
      phases: ['Discovery & product scoping', 'UX & app design', 'App development', 'Backend & API integration', 'Store submission & launch'],
      services: ['Mobile App Development', 'UI/UX Design', 'Backend & API Architecture', 'Analytics', 'AI Integration'],
      team: ['Business Consultant', 'UI/UX Designer', 'Mobile Developer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['React Native', 'Flutter', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'تطبيق جوال أصلي أو متعدد المنصات يضع منتجك في يد عميلك بتجربة مصقولة.',
      phases: ['الاكتشاف وتحديد نطاق المنتج', 'تصميم UX والتطبيق', 'تطوير التطبيق', 'تكامل الخوادم والواجهات البرمجية', 'الرفع للمتاجر والإطلاق'],
      services: ['تطوير تطبيقات الجوال', 'تصميم UI/UX', 'هندسة الخوادم والواجهات', 'التحليلات', 'تكامل الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مصمم UI/UX', 'مطور تطبيقات جوال', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['React Native', 'Flutter', 'Node.js', 'البنية السحابية'],
    },
  },
  ai: {
    en: {
      understanding: 'An AI capability — from a single model to a full intelligence layer — designed around your data and decision points.',
      phases: ['AI strategy & use-case validation', 'Data readiness & engineering', 'Model development', 'Integration & pilot', 'Governance, deployment & scale'],
      services: ['AI Strategy & Consulting', 'AI Engineering', 'Data Engineering', 'AI Governance'],
      team: ['Business Consultant', 'AI Engineer', 'Data Engineer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['Python', 'LLM / GenAI', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'قدرة ذكاء اصطناعي — من نموذج واحد إلى طبقة ذكاء كاملة — مصممة حول بياناتك ونقاط قرارك.',
      phases: ['استراتيجية الذكاء الاصطناعي والتحقق من حالات الاستخدام', 'جاهزية البيانات وهندستها', 'تطوير النماذج', 'التكامل والنموذج التجريبي', 'الحوكمة والنشر والتوسع'],
      services: ['استشارات الذكاء الاصطناعي', 'هندسة الذكاء الاصطناعي', 'هندسة البيانات', 'حوكمة الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مهندس ذكاء اصطناعي', 'مهندس بيانات', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['Python', 'LLM / GenAI', 'Node.js', 'البنية السحابية'],
    },
  },
  chatbot: {
    en: {
      understanding: 'A conversational assistant that answers from your knowledge base and hands over to your team when needed.',
      phases: ['Discovery & conversation design', 'Knowledge-base grounding', 'Bot development', 'Integration & handover flows', 'Testing, launch & learning'],
      services: ['Conversational AI / Chatbot Development', 'AI Integration', 'UI/UX Design', 'Analytics'],
      team: ['Business Consultant', 'AI Engineer', 'UI/UX Designer', 'Backend Developer', 'QA Engineer'],
      duration: '6–8 weeks',
      technologies: ['Python', 'LLM / GenAI', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'مساعد محادثة يجيب من قاعدة معرفتك ويحوّل الأمر لفريقك عند الحاجة.',
      phases: ['الاكتشاف وتصميم المحادثة', 'ربط قاعدة المعرفة', 'تطوير البوت', 'التكامل وتدفقات التحويل', 'الاختبار والإطلاق والتعلّم'],
      services: ['تطوير المحادثات الذكية', 'تكامل الذكاء الاصطناعي', 'تصميم UI/UX', 'التحليلات'],
      team: ['مستشار أعمال', 'مهندس ذكاء اصطناعي', 'مصمم UI/UX', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '6–8 أسابيع',
      technologies: ['Python', 'LLM / GenAI', 'Node.js', 'البنية السحابية'],
    },
  },
  erp: {
    en: {
      understanding: 'A unified business system connecting finance, operations, and reporting into one source of truth.',
      phases: ['Process discovery & gap analysis', 'Solution architecture', 'System build & data migration', 'Integration & automation', 'Training & rollout'],
      services: ['ERP / Business Systems Consulting', 'Technology Consulting', 'Automation', 'Analytics'],
      team: ['Business Consultant', 'ERP Consultant', 'Backend Developer', 'Frontend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['Node.js', 'PostgreSQL', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'نظام أعمال موحد يربط المالية والعمليات والتقارير في مصدر حقيقة واحد.',
      phases: ['اكتشاف العمليات وتحليل الفجوات', 'هندسة الحل', 'بناء النظام وترحيل البيانات', 'التكامل والأتمتة', 'التدريب والتشغيل'],
      services: ['استشارات أنظمة المؤسسات', 'استشارات التكنولوجيا', 'الأتمتة', 'التحليلات'],
      team: ['مستشار أعمال', 'مستشار ERP', 'مطور خوادم', 'مطور واجهات أمامية', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['Node.js', 'PostgreSQL', 'البنية السحابية'],
    },
  },
  automation: {
    en: {
      understanding: 'An automation layer that takes your repetitive, rule-based processes off the team and keeps them accurate.',
      phases: ['Process discovery & prioritization', 'Architecture design', 'Build of automation workflows', 'AI assist for unstructured work', 'Testing, rollout & monitoring'],
      services: ['Automation Architecture', 'Technology Consulting', 'AI Integration', 'Analytics'],
      team: ['Business Consultant', 'Automation Engineer', 'AI Engineer', 'Backend Developer', 'QA Engineer'],
      duration: '6–10 weeks',
      technologies: ['Python', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'طبقة أتمتة ترفع عملياتك المتكررة والقائمة على قواعد عن الفريق وتحافظ على دقتها.',
      phases: ['اكتشاف العمليات وتحديد الأولويات', 'تصميم البنية', 'بناء تدفقات الأتمتة', 'مساعدة الذكاء الاصطناعي للعمل غير المنظم', 'الاختبار والتشغيل والمراقبة'],
      services: ['هندسة الأتمتة', 'استشارات التكنولوجيا', 'تكامل الذكاء الاصطناعي', 'التحليلات'],
      team: ['مستشار أعمال', 'مهندس أتمتة', 'مهندس ذكاء اصطناعي', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '6–10 أسابيع',
      technologies: ['Python', 'Node.js', 'البنية السحابية'],
    },
  },
  dashboard: {
    en: {
      understanding: 'A live executive dashboard that turns your operational data into one clear decision surface.',
      phases: ['Discovery & KPI definition', 'Data engineering & pipelines', 'Dashboard design', 'Development & integrations', 'Launch & adoption'],
      services: ['Analytics Dashboard Development', 'Data Engineering', 'UI/UX Design', 'AI Integration'],
      team: ['Business Consultant', 'Data Engineer', 'UI/UX Designer', 'Frontend Developer', 'QA Engineer'],
      duration: '6–8 weeks',
      technologies: ['React', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'لوحة تحكم تنفيذية حية تحوّل بيانات تشغيلك إلى سطح قرار واحد واضح.',
      phases: ['الاكتشاف وتحديد مؤشرات الأداء', 'هندسة البيانات وخطوطها', 'تصميم اللوحة', 'التطوير والتكاملات', 'الإطلاق والتبني'],
      services: ['تطوير لوحات التحكم', 'هندسة البيانات', 'تصميم UI/UX', 'تكامل الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مهندس بيانات', 'مصمم UI/UX', 'مطور واجهات أمامية', 'مهندس ضمان الجودة'],
      duration: '6–8 أسابيع',
      technologies: ['React', 'Node.js', 'البنية السحابية'],
    },
  },
  data: {
    en: {
      understanding: 'A data foundation — pipeline, warehouse, and analytics — that makes your decisions evidence-based.',
      phases: ['Data audit & architecture', 'Pipeline & warehouse build', 'Governance & security', 'Analytics & reporting', 'AI readiness'],
      services: ['Data Engineering', 'Analytics', 'AI Integration', 'Technology Consulting'],
      team: ['Business Consultant', 'Data Engineer', 'AI Engineer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['Python', 'PostgreSQL', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'أساس بيانات — خطوط ومستودع وتحليلات — يجعل قراراتك مبنية على الأدلة.',
      phases: ['تدقيق البيانات والهندسة', 'بناء الخطوط والمستودع', 'الحوكمة والأمان', 'التحليلات والتقارير', 'الجاهزية للذكاء الاصطناعي'],
      services: ['هندسة البيانات', 'التحليلات', 'تكامل الذكاء الاصطناعي', 'استشارات التكنولوجيا'],
      team: ['مستشار أعمال', 'مهندس بيانات', 'مهندس ذكاء اصطناعي', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['Python', 'PostgreSQL', 'البنية السحابية'],
    },
  },
  software: {
    en: {
      understanding: 'Custom software that matches your operating model exactly — built to change as you grow.',
      phases: ['Discovery & scoping', 'Architecture & UX', 'Development sprints', 'Integrations & testing', 'Deployment & support'],
      services: ['Custom Software Development', 'UI/UX Design', 'Technology Consulting', 'AI Integration'],
      team: ['Business Consultant', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      technologies: ['React', 'Next.js', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'برمجيات مخصصة تطابق نموذج تشغيلك تماماً — مبنية لتتغير مع نموك.',
      phases: ['الاكتشاف وتحديد النطاق', 'الهندسة وتصميم UX', 'سباقات التطوير', 'التكاملات والاختبار', 'النشر والدعم'],
      services: ['تطوير البرمجيات المخصصة', 'تصميم UI/UX', 'استشارات التكنولوجيا', 'تكامل الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مصمم UI/UX', 'مطور واجهات أمامية', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '8–12 أسابيع',
      technologies: ['React', 'Next.js', 'Node.js', 'البنية السحابية'],
    },
  },
  unknown: {
    en: {
      understanding: 'An executive digital project that deserves a discovery conversation before any estimate.',
      phases: ['Discovery & understanding', 'Solution design', 'Build', 'Integration', 'Launch'],
      services: ['Business Consulting', 'Technology Consulting', 'AI Integration'],
      team: ['Business Consultant', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
      duration: '4–12 weeks',
      technologies: ['React', 'Node.js', 'Cloud Infrastructure'],
    },
    ar: {
      understanding: 'مشروع رقمي تنفيذي يستحق محادثة اكتشاف قبل أي تقدير.',
      phases: ['الاكتشاف والفهم', 'تصميم الحل', 'البناء', 'التكامل', 'الإطلاق'],
      services: ['استشارات الأعمال', 'استشارات التكنولوجيا', 'تكامل الذكاء الاصطناعي'],
      team: ['مستشار أعمال', 'مصمم UI/UX', 'مطور واجهات أمامية', 'مطور خوادم', 'مهندس ضمان الجودة'],
      duration: '4–12 أسابيع',
      technologies: ['React', 'Node.js', 'البنية السحابية'],
    },
  },
};

export function buildEstimation(type: ProjectType | null, lang: Lang): Estimation {
  const entry = ESTIMATION_CATALOG[type ?? 'unknown'];
  return lang === 'ar' ? entry.ar : entry.en;
}

export const OFFER_LINE: Record<Lang, string> = {
  en: "If you'd like, I can convert this preliminary estimation into a formal consultation request and connect you with our executive team.",
  ar: 'إذا رغبت، أستطيع تحويل هذا التقدير المبدئي إلى طلب استشارة رسمي وربطك مباشرة بفريق XVI GROUP.',
};

// ---------------------------------------------------------------------------
// UNKNOWN HANDLING
// ---------------------------------------------------------------------------

export function unknownResponse(state: ConversationState, lang: Lang): {
  en: string;
  ar: string;
  showContact: boolean;
} {
  const showContact = state.exchanges >= 3 || state.contactOffered;
  if (showContact) {
    return {
      en: "I haven't found an exact match yet, but I'd like to help. Could we set up a short consultation so I can understand the full picture and bring you the right recommendation?",
      ar: 'لم أجد تطابقاً دقيقاً بعد، لكني أرغب في مساعدتك. هل نرتب استشارة قصيرة لأفهم الصورة كاملة وأقدم لك التوصية الصحيحة؟',
      showContact: true,
    };
  }
  return {
    en: 'Let me think about this differently. Tell me a little more — what outcome are you trying to achieve, and who is it for?',
    ar: 'دعني أنظر إلى الأمر من زاوية أخرى. أخبرني المزيد — ما النتيجة التي تحاول تحقيقها، ولمن هي؟',
    showContact: false,
  };
}

export function closestServices(state: ConversationState, lang: Lang): Recommendation[] {
  return recommendationsFor(state.projectType ?? 'unknown', lang);
}
