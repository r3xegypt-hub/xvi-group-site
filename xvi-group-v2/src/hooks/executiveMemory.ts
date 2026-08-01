export interface ExecutiveMemory {
  name?: string;
  company?: string;
  industry?: string;
  goal?: string;
  journey?: string;
  questions: string[];
  recommendations: string[];
}

export type LearnedFields = Pick<ExecutiveMemory, 'name' | 'company' | 'industry' | 'goal'>;

const STORAGE_KEY = 'xvi-executive-memory';
const MAX_QUESTIONS = 20;
const MAX_RECOMMENDATIONS = 10;

export function loadMemory(): ExecutiveMemory {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ExecutiveMemory>;
      return {
        name: typeof parsed.name === 'string' && parsed.name ? parsed.name : undefined,
        company: typeof parsed.company === 'string' && parsed.company ? parsed.company : undefined,
        industry: typeof parsed.industry === 'string' && parsed.industry ? parsed.industry : undefined,
        goal: typeof parsed.goal === 'string' && parsed.goal ? parsed.goal : undefined,
        journey: typeof parsed.journey === 'string' && parsed.journey ? parsed.journey : undefined,
        questions: Array.isArray(parsed.questions)
          ? parsed.questions.filter((q): q is string => typeof q === 'string').slice(-MAX_QUESTIONS)
          : [],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations.filter((r): r is string => typeof r === 'string').slice(-MAX_RECOMMENDATIONS)
          : [],
      };
    }
  } catch {
    // corrupt or unavailable storage — fall back to empty memory
  }
  return { questions: [], recommendations: [] };
}

export function persistMemory(memory: ExecutiveMemory) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    // quota / privacy errors are non-fatal
  }
}

export function persistMemoryJourney(journey: string | null | undefined) {
  const memory = loadMemory();
  memory.journey = journey ?? undefined;
  persistMemory(memory);
}

const cleanValue = (v: string) =>
  v
    .trim()
    .replace(/\s{2,}/g, ' ')
    .replace(/[.!؟?؛]+$/g, '')
    .slice(0, 60);

const cutAt = (v: string) => {
  const cut = v.split(/\s+(and|or|in|و|أو|في|عند|where|also|i|we|أنتم)\s+/i)[0];
  return cut && cut.length >= 2 ? cut : v;
};

const INDUSTRY_HINTS = [
  'banking', 'finance', 'financial services', 'insurance', 'healthcare', 'medical', 'pharma',
  'education', 'government', 'public sector', 'retail', 'manufacturing', 'telecom',
  'technology', 'energy', 'real estate', 'hospitality', 'logistics', 'construction',
];

const NAME_EN = [
  /my name is\s+([a-z\u0600-\u06FF]+(?:[\s'-][a-z\u0600-\u06FF]+){0,3})/i,
  /\bcall me\s+([a-z]{2,}(?:\s+[a-z]{2,}){0,2})/i,
];

const NAME_AR = [
  /اسمي\s+([^\s،.؟!]+(?:[\s-][^\s،.؟!]+){0,2})/,
  /أنا اسمي\s+([^\s،.؟!]+(?:[\s-][^\s،.؟!]+){0,2})/,
];

const COMPANY_EN = [
  /\b(?:i|we) work (?:at|for)\s+([a-z0-9&.'][a-z0-9&.' ]{1,40})/i,
  /\bmy company is (?:called |named )?([a-z0-9&.'][a-z0-9&.' ]{1,40})/i,
  /\bour company is (?:called |named )?([a-z0-9&.'][a-z0-9&.' ]{1,40})/i,
];

const COMPANY_AR = [
  /أعمل (?:في|لدى|عند)\s+([^\s،.؟!]+(?:[\s-][^\s،.؟!]+){0,3})/,
  /شركتي\s+([^\s،.؟!]+(?:[\s-][^\s،.؟!]+){0,2})/,
  /شركتنا\s+([^\s،.؟!]+(?:[\s-][^\s،.؟!]+){0,2})/,
];

const INDUSTRY_EN = [
  /\b(?:i|we) work in (?:the )?([a-z]+(?: [a-z]+)?)(?:\s+(?:sector|industry))?/i,
  /\b(?:i|we) work (?:at|for) [^,.]+? in (?:the )?([a-z]+(?: [a-z]+)?)(?:[.,\s]|$)/i,
  /\bindustry is\s+([a-z]+(?: [a-z]+)?)/i,
  /\bin the ([a-z]+(?: [a-z]+)?) sector\b/i,
  /\bsector is\s+([a-z]+(?: [a-z]+)?)/i,
];

const INDUSTRY_AR = [
  /(?:في )?قطاع\s+([^\s،.؟!]+)/,
  /مجالنا\s+([^\s،.؟!]+)/,
];

const GOAL_EN = [
  /\bmy goal is\s+([^.!?]{3,80})/i,
  /\bour goal is\s+([^.!?]{3,80})/i,
  /\b(?:i|we) (?:want|would like|are looking) to\s+([^.!?]{3,60})/i,
  /\baim(?:ing)? to\s+([^.!?]{3,60})/i,
];

const GOAL_AR = [
  /هدفي\s+([^،.؟!]{3,60})/,
  /هدفنا\s+([^،.؟!]{3,60})/,
  /نريد\s+([^،.؟!]{3,60})/,
  /أريد\s+([^،.؟!]{3,60})/,
  /نسعى إلى\s+([^،.؟!]{3,60})/,
];

const NAME_STOPWORDS = new Set([
  'looking', 'trying', 'hoping', 'here', 'interested', 'ready', 'planning', 'starting', 'thinking',
  'احاول', 'أحاول', 'ابحث', 'أبحث', 'مهتم', 'هنا',
]);

export function extractMemory(query: string): LearnedFields {
  const q = query.trim();
  if (!q) return {};
  const out: LearnedFields = {};

  for (const re of NAME_EN) {
    const m = q.match(re);
    if (m && m[1]) {
      const value = cleanValue(m[1]);
      const first = value.split(' ')[0].toLowerCase();
      if (!NAME_STOPWORDS.has(first) && !value.toLowerCase().startsWith('i ')) {
        out.name = cutAt(value);
        break;
      }
    }
  }
  if (!out.name) {
    for (const re of NAME_AR) {
      const m = q.match(re);
      if (m && m[1]) {
        const value = cleanValue(m[1]);
        if (!NAME_STOPWORDS.has(value.split(' ')[0])) {
          out.name = value;
          break;
        }
      }
    }
  }

  for (const re of COMPANY_EN) {
    const m = q.match(re);
    if (m && m[1]) {
      const value = cleanValue(cutAt(m[1]));
      if (value.length >= 2) {
        out.company = value;
        break;
      }
    }
  }
  if (!out.company) {
    for (const re of COMPANY_AR) {
      const m = q.match(re);
      if (m && m[1]) {
        const value = cleanValue(m[1]);
        if (value.length >= 2) {
          out.company = value;
          break;
        }
      }
    }
  }

  for (const re of INDUSTRY_EN) {
    const m = q.match(re);
    if (m && m[1]) {
      const value = cleanValue(m[1]).toLowerCase();
      if (value.length >= 3) {
        out.industry = INDUSTRY_HINTS.includes(value) ? value : value;
        break;
      }
    }
  }
  if (!out.industry) {
    for (const re of INDUSTRY_AR) {
      const m = q.match(re);
      if (m && m[1]) {
        const value = cleanValue(m[1]);
        if (value.length >= 2) {
          out.industry = value;
          break;
        }
      }
    }
  }

  for (const re of GOAL_EN) {
    const m = q.match(re);
    if (m && m[1]) {
      const value = cleanValue(m[1]).replace(/^to\s+/i, '');
      if (value.length >= 3) {
        out.goal = value;
        break;
      }
    }
  }
  if (!out.goal) {
    for (const re of GOAL_AR) {
      const m = q.match(re);
      if (m && m[1]) {
        const value = cleanValue(m[1]);
        if (value.length >= 2) {
          out.goal = value;
          break;
        }
      }
    }
  }

  return out;
}

const MEMORY_ASK_EN = [
  /\b(?:what )?do you (?:remember|know)(?: about me)?\b/i,
  /\bwhat (?:do )?you (?:remember|know) about me\b/i,
  /\bdo you remember me\b/i,
  /\bwhat's? my name\b/i,
  /\bwho am i\b/i,
  /\bwhat (?:have|did) you (?:remembered|learned|saved)\b/i,
];

const MEMORY_ASK_AR = [
  /ماذا (تتذكر|تعرف)/,
  /هل تذكرت/,
  /تذكرتني/,
  /ما اسمي\b/,
  /من أنا\b/,
  /ماذا حفظت/,
];

export function isMemoryAsk(query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return MEMORY_ASK_EN.some((re) => re.test(q)) || MEMORY_ASK_AR.some((re) => re.test(q));
}

export function hasLearnedFields(learned: LearnedFields): boolean {
  return Boolean(learned.name || learned.company || learned.industry || learned.goal);
}
