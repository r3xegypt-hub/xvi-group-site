export type SiteNavigationItem = {
  label: string
  path: string
  prefetch?: () => Promise<unknown>
}

export const siteNavigation: SiteNavigationItem[] = [
  // Home is already in the initial application chunk, so it needs no prefetch.
  { label: 'الرئيسية', path: '/' },
  { label: 'من نحن', path: '/about', prefetch: () => import('../pages/About') },
  { label: 'الخدمات', path: '/services', prefetch: () => import('../pages/Services') },
  { label: 'استشارات الأعمال', path: '/business-consulting', prefetch: () => import('../pages/BusinessConsulting') },
  { label: 'استشارات التقنية', path: '/technology-consulting', prefetch: () => import('../pages/TechnologyConsulting') },
  { label: 'القطاعات', path: '/industries', prefetch: () => import('../pages/Industries') },
  { label: 'التقنية', path: '/technology', prefetch: () => import('../pages/Technology') },
  { label: 'تحول AI', path: '/ai-transformation', prefetch: () => import('../pages/AiTransformation') },
  { label: 'التطوير التنفيذي', path: '/executive-training', prefetch: () => import('../pages/ExecutiveTraining') },
  { label: 'القيادة', path: '/leadership', prefetch: () => import('../pages/Leadership') },
  { label: 'الرؤى', path: '/insights', prefetch: () => import('../pages/Insights') },
  { label: 'تواصل', path: '/contact', prefetch: () => import('../pages/Contact') },
]

export const footerNavigation = [
  ...siteNavigation,
  { label: 'الخصوصية', path: '/privacy', prefetch: () => import('../pages/Privacy') },
  { label: 'الشروط', path: '/terms', prefetch: () => import('../pages/Terms') },
]
