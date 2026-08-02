// XVI GROUP — Site Configuration

export const SITE_CONFIG = {
  name: {
    en: 'XVI GROUP',
    ar: 'مجموعة XVI',
  },
  tagline: {
    en: 'Strategy. Intelligence. Operational Mastery.',
    ar: 'الاستراتيجية. الذكاء. التميز التشغيلي.',
  },
  description: {
    en: 'A world-class advisory enterprise empowering organizations to transform vision into measurable sovereign performance.',
    ar: 'مشروع استشاري عالمي المستوى يمكّن المؤسسات من تحويل الرؤية إلى أداء سيادي قابل للقياس.',
  },
  url: 'https://r3xegypt-hub.github.io/xvi-group-site',
  locale: 'en',
  ogImage: '/social-preview.png',
  favicon: '/identity/favicon.svg',
} as const;

export const NAVIGATION = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Business Consulting', href: '/services/business-consulting' },
        { label: 'Technology Consulting', href: '/services/technology-consulting' },
        { label: 'AI Transformation', href: '/services/ai-transformation' },
        { label: 'Executive Training', href: '/services/executive-training' },
      ],
    },
    { label: 'Industries', href: '/industries' },
    { label: 'Technology', href: '/technology' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/' },
    {
      label: 'الخدمات',
      href: '/services',
      children: [
        { label: 'استشارات الأعمال', href: '/services/business-consulting' },
        { label: 'استشارات التكنولوجيا', href: '/services/technology-consulting' },
        { label: 'التحول بالذكاء الاصطناعي', href: '/services/ai-transformation' },
        { label: 'التدريب التنفيذي', href: '/services/executive-training' },
      ],
    },
    { label: 'القطاعات', href: '/industries' },
    { label: 'التكنولوجيا', href: '/technology' },
    { label: 'عن الشركة', href: '/about' },
    { label: 'الرؤى', href: '/insights' },
    { label: 'تواصل معنا', href: '/contact' },
  ],
} as const;

export const FOOTER_COLUMNS = {
  en: [
    {
      title: 'Services',
      links: [
        { label: 'Business Consulting', href: '/services/business-consulting' },
        { label: 'Technology Consulting', href: '/services/technology-consulting' },
        { label: 'AI Transformation', href: '/services/ai-transformation' },
        { label: 'Executive Training', href: '/services/executive-training' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { label: 'Technology', href: '/industries/technology' },
        { label: 'Finance', href: '/industries/finance' },
        { label: 'Healthcare', href: '/industries/healthcare' },
        { label: 'Energy', href: '/industries/energy' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Leadership', href: '/leadership' },
        { label: 'Careers', href: '/careers' },
        { label: 'Insights', href: '/insights' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  ],
  ar: [
    {
      title: 'الخدمات',
      links: [
        { label: 'استشارات الأعمال', href: '/services/business-consulting' },
        { label: 'استشارات التكنولوجيا', href: '/services/technology-consulting' },
        { label: 'التحول بالذكاء الاصطناعي', href: '/services/ai-transformation' },
        { label: 'التدريب التنفيذي', href: '/services/executive-training' },
      ],
    },
    {
      title: 'القطاعات',
      links: [
        { label: 'التكنولوجيا', href: '/industries/technology' },
        { label: 'المالية', href: '/industries/finance' },
        { label: 'الصحة', href: '/industries/healthcare' },
        { label: 'الطاقة', href: '/industries/energy' },
      ],
    },
    {
      title: 'الشركة',
      links: [
        { label: 'عن الشركة', href: '/about' },
        { label: 'القيادة', href: '/leadership' },
        { label: 'الوظائف', href: '/careers' },
        { label: 'الرؤى', href: '/insights' },
      ],
    },
    {
      title: 'قانوني',
      links: [
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'شروط الخدمة', href: '/terms' },
        { label: 'إمكانية الوصول', href: '/accessibility' },
      ],
    },
  ],
} as const;

export const CONTACT_INFO = {
  email: 'contact@xvigroup.com',
  phone: '+971 2 XXX XXXX',
  locations: [
    { city: { en: 'Al Ain', ar: 'العين' }, isHeadquarters: true },
    { city: { en: 'Abu Dhabi', ar: 'أبو ظبي' }, isHeadquarters: false },
  ],
  social: {
    linkedin: 'https://linkedin.com/company/xvi-group',
    twitter: 'https://twitter.com/xvigroup',
  },
} as const;

export const STATISTICS = {
  en: [
    { number: 200, suffix: '+', label: 'Projects Delivered' },
    { number: 4, suffix: '', label: 'Advisory Suites' },
    { number: 98, suffix: '%', label: 'Client Retention' },
    { number: 24, suffix: '/7', label: 'Support Available' },
  ],
  ar: [
    { number: 200, suffix: '+', label: 'مشروع تم تسليمه' },
    { number: 4, suffix: '', label: 'مجموعات الاستشارات' },
    { number: 98, suffix: '%', label: 'الاحتفاظ بالعملاء' },
    { number: 24, suffix: '/7', label: 'دعم متاح' },
  ],
} as const;
