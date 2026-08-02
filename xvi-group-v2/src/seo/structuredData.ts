// XVI GROUP — Structured data builders (JSON-LD).
// Generates BreadcrumbList and FAQPage schemas against the production URL.

import { PRODUCTION_URL } from './seoConfig';

export type Language = 'en' | 'ar';

const SEGMENT_LABELS: Record<string, Record<Language, string>> = {
  services: { en: 'Services', ar: 'الخدمات' },
  'business-consulting': { en: 'Business Consulting', ar: 'استشارات الأعمال' },
  'technology-consulting': { en: 'Technology Consulting', ar: 'استشارات التكنولوجيا' },
  'ai-transformation': { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' },
  'executive-training': { en: 'Executive Training', ar: 'التدريب التنفيذي' },
  about: { en: 'About', ar: 'عن الشركة' },
  technology: { en: 'Technology', ar: 'التكنولوجيا' },
  industries: { en: 'Industries', ar: 'القطاعات' },
  insights: { en: 'Insights', ar: 'الرؤى' },
  portfolio: { en: 'Portfolio', ar: 'أعمالنا' },
  contact: { en: 'Contact', ar: 'تواصل معنا' },
  careers: { en: 'Careers', ar: 'الوظائف' },
  privacy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  terms: { en: 'Terms of Service', ar: 'شروط الخدمة' },
};

export function resolveUrl(path: string): string {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return `${PRODUCTION_URL}${normalized}`;
}

export function buildBreadcrumbJsonLd(pathname: string, language: Language): Record<string, unknown> {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ position: 1, name: language === 'ar' ? 'الرئيسية' : 'Home', path: '/' }];

  let cumulative = '';
  segments.forEach((segment, index) => {
    cumulative += `/${segment}`;
    const labels = SEGMENT_LABELS[segment] ?? { en: segment, ar: segment };
    items.push({ position: index + 2, name: labels[language], path: cumulative });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: resolveUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(
  entries: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}
