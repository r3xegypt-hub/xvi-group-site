// XVI GROUP — Constants

// ============================================
// BREAKPOINTS (px) — 7 Device Categories
// ============================================

export const BREAKPOINTS = {
  smallMobile: 0,
  mediumMobile: 375,
  largeMobile: 429,
  tabletPortrait: 768,
  tabletLandscape: 1024,
  laptop: 1366,
  desktop: 1601,
  largeDesktop: 1920,
} as const;

// Legacy aliases for backward compatibility
export const BREAKPOINTS_LEGACY = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  wide: 1440,
} as const;

// ============================================
// SPACING (8px grid)
// ============================================

export const SPACING = {
  '2xs': '4px',
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  '2xl': '64px',
  '3xl': '96px',
  '4xl': '128px',
} as const;

// ============================================
// Z-INDEX
// ============================================

export const Z_INDEX = {
  base: 0,
  elevated: 10,
  dropdown: 100,
  sticky: 500,
  overlay: 1000,
  modal: 2000,
  toast: 3000,
  loader: 9999,
} as const;

// ============================================
// ANIMATION DURATIONS (ms)
// ============================================

export const DURATIONS = {
  instant: 100,
  fast: 150,
  base: 250,
  slow: 400,
  slower: 800,
  slowest: 1200,
} as const;

// ============================================
// EASING FUNCTIONS
// ============================================

export const EASING = {
  'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'ease-in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',
  'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// ============================================
// SHADOW LEVELS
// ============================================

export const SHADOWS = {
  level0: 'none',
  level1: '0 1px 3px rgba(10, 22, 40, 0.06)',
  level2: '0 4px 12px rgba(10, 22, 40, 0.08)',
  level3: '0 8px 24px rgba(10, 22, 40, 0.1)',
  level4: '0 16px 48px rgba(10, 22, 40, 0.12)',
  gold: '0 4px 24px rgba(201, 169, 110, 0.25)',
} as const;

// ============================================
// CONTENT WIDTHS
// ============================================

export const WIDTHS = {
  container: '1200px',
  narrow: '720px',
  wide: '1440px',
} as const;

// ============================================
// SECTION PADDING
// ============================================

export const SECTION_PADDING = {
  mobile: '64px',
  desktop: '96px',
} as const;

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  home: '/',
  services: '/services',
  businessConsulting: '/services/business-consulting',
  technologyConsulting: '/services/technology-consulting',
  aiTransformation: '/services/ai-transformation',
  executiveTraining: '/services/executive-training',
  industries: '/industries',
  technology: '/technology',
  about: '/about',
  leadership: '/leadership',
  insights: '/insights',
  contact: '/contact',
  careers: '/careers',
  privacy: '/privacy',
  terms: '/terms',
  notFound: '/404',
} as const;
