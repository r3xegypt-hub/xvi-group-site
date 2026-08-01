import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type JourneyId = 'executive' | 'healthcare' | 'government' | 'explore';

export interface JourneyMeta {
  id: JourneyId;
  label: { en: string; ar: string };
  color: string;
  prompt: { en: string; ar: string };
  service: { label: { en: string; ar: string }; to: string };
  caseTitle: { en: string; ar: string };
  caseHref: string;
  cta: { en: string; ar: string };
}

const STORAGE_KEY = 'xvi-journey';

export const JOURNEYS: JourneyMeta[] = [
  {
    id: 'executive',
    label: { en: 'Executive Strategy', ar: 'الاستراتيجية التنفيذية' },
    color: '#132238',
    prompt: { en: 'A high-level view of XVI — strategy, capability, and partnership.', ar: 'نظرة شاملة عن XVI — الاستراتيجية والقدرات والشراكة.' },
    service: { label: { en: 'Strategic AI', ar: 'الذكاء الاستراتيجي' }, to: '/services/ai-transformation' },
    caseTitle: { en: 'Sovereign Banking Core', ar: 'نواة مصرفية سيادية' },
    caseHref: '/portfolio',
    cta: { en: 'Book an executive consultation', ar: 'احجز استشارة تنفيذية' },
  },
  {
    id: 'healthcare',
    label: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    color: '#7fb5a0',
    prompt: { en: 'Clinical intelligence, patient outcomes, and regulatory-ready AI.', ar: 'ذكاء سريري، نتائج مرضى أفضل، وذكاء اصطناعي متوافق مع اللوائح.' },
    service: { label: { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' }, to: '/services/ai-transformation' },
    caseTitle: { en: 'Clinical Command Center', ar: 'مركز القيادة السريرية' },
    caseHref: '/portfolio',
    cta: { en: 'Talk to a healthcare consultant', ar: 'تحدث مع مستشار رعاية صحية' },
  },
  {
    id: 'government',
    label: { en: 'Government', ar: 'الحكومة' },
    color: '#8a9bb5',
    prompt: { en: 'Secure, data-driven governance and citizen services at national scale.', ar: 'حوكمة آمنة مبنية على البيانات وخدمات حكومية على المستوى الوطني.' },
    service: { label: { en: 'Business Consulting', ar: 'الاستشارات الاستراتيجية' }, to: '/services/business-consulting' },
    caseTitle: { en: 'National Logistics Control Tower', ar: 'برج التحكم اللوجستي الوطني' },
    caseHref: '/portfolio',
    cta: { en: 'Talk to a government consultant', ar: 'تحدث مع مستشار حكومي' },
  },
  {
    id: 'explore',
    label: { en: 'Explore Everything', ar: 'استكشف كل شيء' },
    color: '#c8a65a',
    prompt: { en: 'The complete XVI experience — every sector, every capability.', ar: 'تجربة XVI الكاملة — كل قطاع وكل قدرة.' },
    service: { label: { en: 'All Services', ar: 'جميع الخدمات' }, to: '/services' },
    caseTitle: { en: 'Selected Work', ar: 'أعمال مختارة' },
    caseHref: '/portfolio',
    cta: { en: 'Start exploring', ar: 'ابدأ الاستكشاف' },
  },
];

export function journeyMeta(id: JourneyId | null): JourneyMeta | null {
  if (!id) return null;
  return JOURNEYS.find((j) => j.id === id) ?? null;
}

interface JourneyContextValue {
  journey: JourneyId | null;
  meta: JourneyMeta | null;
  select: (id: JourneyId) => void;
  clear: () => void;
}

const JourneyContext = createContext<JourneyContextValue>({
  journey: null,
  meta: null,
  select: () => {},
  clear: () => {},
});

function readStored(): JourneyId | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw && (raw === 'executive' || raw === 'healthcare' || raw === 'government' || raw === 'explore')) {
      return raw;
    }
  } catch {
    // ignore storage failures
  }
  return null;
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState<JourneyId | null>(() => readStored());

  const select = useCallback((id: JourneyId) => {
    setJourney(id);
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('xvi:journey-change', { detail: { journey: id } }));
  }, []);

  const clear = useCallback(() => {
    setJourney(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('xvi:journey-change', { detail: { journey: null } }));
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({ journey, meta: journeyMeta(journey), select, clear }),
    [journey, select, clear],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  return useContext(JourneyContext);
}
