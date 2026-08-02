// XVI GROUP — Per-page SEO metadata configuration.
// Single source of truth for titles, descriptions and social strings.

import { SITE_CONFIG } from '../config';

export const PRODUCTION_URL = SITE_CONFIG.url;

export interface LocalizedMeta {
  title: string;
  description: string;
}

export interface PageMeta {
  en: LocalizedMeta;
  ar: LocalizedMeta;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    en: {
      title: 'XVI GROUP — Intelligent Transformation | Strategy & Technology Advisory',
      description:
        'Enterprise strategy and technology advisory. Business consulting, AI transformation, and executive training for enterprises across the Middle East.',
    },
    ar: {
      title: 'مجموعة XVI — التحول الذكي | استشارات الاستراتيجية والتكنولوجيا',
      description:
        'استشارات استراتيجية وتكنولوجية للمؤسسات. استشارات الأعمال، والتحول بالذكاء الاصطناعي، والتدريب التنفيذي لمؤسسات منطقة الشرق الأوسط.',
    },
  },
  '/services': {
    en: {
      title: 'Services — XVI GROUP Advisory',
      description:
        'Explore XVI GROUP advisory services: business consulting, technology consulting, AI transformation, and executive training.',
    },
    ar: {
      title: 'الخدمات — مجموعة XVI الاستشارية',
      description:
        'اكتشف خدمات مجموعة XVI الاستشارية: استشارات الأعمال، واستشارات التكنولوجيا، والتحول بالذكاء الاصطناعي، والتدريب التنفيذي.',
    },
  },
  '/services/business-consulting': {
    en: {
      title: 'Business Consulting — XVI GROUP',
      description:
        'Strategic business consulting to shape vision, drive operational mastery, and deliver measurable enterprise performance.',
    },
    ar: {
      title: 'استشارات الأعمال — مجموعة XVI',
      description:
        'استشارات أعمال استراتيجية لصياغة الرؤية وتحقيق التميز التشغيلي وأداء مؤسسي قابل للقياس.',
    },
  },
  '/services/technology-consulting': {
    en: {
      title: 'Technology Consulting — XVI GROUP',
      description:
        'Technology consulting and enterprise architecture to modernize systems and accelerate digital capability.',
    },
    ar: {
      title: 'استشارات التكنولوجيا — مجموعة XVI',
      description:
        'استشارات تكنولوجية ومعمارية مؤسسية لتحديث الأنظمة وتسريع القدرات الرقمية.',
    },
  },
  '/services/ai-transformation': {
    en: {
      title: 'AI Transformation — XVI GROUP',
      description:
        'End-to-end artificial intelligence transformation: strategy, deployment, and operational AI for the enterprise.',
    },
    ar: {
      title: 'التحول بالذكاء الاصطناعي — مجموعة XVI',
      description:
        'تحول متكامل بالذكاء الاصطناعي: استراتيجية ونشر وتشغيل الذكاء الاصطناعي داخل المؤسسة.',
    },
  },
  '/services/executive-training': {
    en: {
      title: 'Executive Training — XVI GROUP',
      description:
        'Executive leadership programs that sharpen strategic decision-making and operational excellence.',
    },
    ar: {
      title: 'التدريب التنفيذي — مجموعة XVI',
      description:
        'برامج تدريب تنفيذية تصقل القيادة وصناعة القرار الاستراتيجي والتميز التشغيلي.',
    },
  },
  '/about': {
    en: {
      title: 'About XVI GROUP — Enterprise Strategy & Technology',
      description:
        'Learn about XVI GROUP, a world-class advisory enterprise transforming vision into measurable sovereign performance.',
    },
    ar: {
      title: 'عن مجموعة XVI — استراتيجية وتكنولوجيا المؤسسات',
      description:
        'تعرّف على مجموعة XVI، مشروع استشاري عالمي المستوى يحول الرؤية إلى أداء سيادي قابل للقياس.',
    },
  },
  '/technology': {
    en: {
      title: 'Technology — XVI GROUP',
      description:
        'The technology capabilities behind XVI GROUP: modern architecture, AI systems, and intelligent automation.',
    },
    ar: {
      title: 'التكنولوجيا — مجموعة XVI',
      description:
        'قدرات التكنولوجيا وراء مجموعة XVI: معمارية حديثة وأنظمة ذكاء اصطناعي وأتمتة ذكية.',
    },
  },
  '/industries': {
    en: {
      title: 'Industries — XVI GROUP',
      description:
        'Sector expertise across technology, finance, healthcare, and energy. Transformation built for your industry.',
    },
    ar: {
      title: 'القطاعات — مجموعة XVI',
      description:
        'خبرة قطاعية في التكنولوجيا والمالية والصحة والطاقة. تحول مبني خصيصاً لقطاعك.',
    },
  },
  '/insights': {
    en: {
      title: 'Insights — XVI GROUP',
      description:
        'Thought leadership on strategy, intelligence, and operational mastery from the XVI GROUP team.',
    },
    ar: {
      title: 'الرؤى — مجموعة XVI',
      description:
        'رؤى فكرية حول الاستراتيجية والذكاء والتميز التشغيلي من فريق مجموعة XVI.',
    },
  },
  '/portfolio': {
    en: {
      title: 'Portfolio — XVI GROUP',
      description:
        'Selected engagements and measurable outcomes delivered by XVI GROUP across the region.',
    },
    ar: {
      title: 'أعمالنا — مجموعة XVI',
      description:
        'مشاريع مختارة ونتائج قابلة للقياس أنجزتها مجموعة XVI عبر المنطقة.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact XVI GROUP — Start a Conversation',
      description:
        'Talk to XVI GROUP about strategy, technology, and AI transformation for your enterprise.',
    },
    ar: {
      title: 'تواصل معنا — مجموعة XVI',
      description:
        'تحدث مع مجموعة XVI حول الاستراتيجية والتكنولوجيا والتحول بالذكاء الاصطناعي لمؤسستك.',
    },
  },
  '/careers': {
    en: {
      title: 'Careers — XVI GROUP',
      description:
        'Join XVI GROUP and help build enterprises that move markets and transform industries.',
    },
    ar: {
      title: 'الوظائف — مجموعة XVI',
      description:
        'انضم إلى مجموعة XVI وساعد في بناء مؤسسات تحرك الأسواق وتغير الصناعات.',
    },
  },
  '/privacy': {
    en: {
      title: 'Privacy Policy — XVI GROUP',
      description:
        'How XVI GROUP collects, uses, and protects personal information.',
    },
    ar: {
      title: 'سياسة الخصوصية — مجموعة XVI',
      description: 'كيف تجمع مجموعة XVI المعلومات الشخصية وتستخدمها وتحميها.',
    },
  },
  '/terms': {
    en: {
      title: 'Terms of Service — XVI GROUP',
      description:
        'The terms and conditions governing the use of the XVI GROUP website and services.',
    },
    ar: {
      title: 'شروط الخدمة — مجموعة XVI',
      description: 'الشروط والأحكام التي تحكم استخدام موقع مجموعة XVI وخدماتها.',
    },
  },
};

export const FALLBACK_META = PAGE_META['/'];

export function getPageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] ?? FALLBACK_META;
}
