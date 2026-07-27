// XVI GROUP — Core Type Definitions

// ============================================
// LANGUAGE & DIRECTION
// ============================================

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  language: Language;
  direction: Direction;
  label: string;
  nativeLabel: string;
}

// ============================================
// THEME
// ============================================

export type ThemeName = 'light-luxury' | 'dark-premium' | 'presentation';

export interface ThemeTokens {
  colors: {
    gold: string;
    goldLight: string;
    goldDark: string;
    goldMuted: string;
    navy: string;
    navyLight: string;
    white: string;
    background: string;
    backgroundSecondary: string;
    surface: string;
    warm: string;
    graphite: string;
    grey: string;
    border: string;
    borderHover: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    arabicHeadingFont: string;
    arabicBodyFont: string;
  };
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  radii: Record<string, string>;
  breakpoints: Record<string, string>;
  zIndex: Record<string, number>;
  transitions: Record<string, string>;
}

// ============================================
// COMPONENTS
// ============================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export type CardVariant = 'service' | 'case-study' | 'insight' | 'stat' | 'testimonial' | 'industry' | 'team';

export interface CardProps {
  variant: CardVariant;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export type InputVariant = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';

export interface InputProps {
  variant?: InputVariant;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

// ============================================
// NAVIGATION
// ============================================

export interface NavItem {
  label: string;
  labelAr?: string;
  href: string;
  children?: NavItem[];
}

export interface MegaMenuSection {
  title: string;
  titleAr?: string;
  items: NavItem[];
}

// ============================================
// SECTIONS
// ============================================

export interface SectionHeader {
  eyebrow: string;
  eyebrowAr?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

export interface StatItem {
  number: number;
  suffix?: string;
  label: string;
  labelAr?: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  href: string;
}

export interface IndustryItem {
  icon: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  href: string;
}

export interface TeamMember {
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  image: string;
  bio?: string;
  bioAr?: string;
}

export interface Testimonial {
  quote: string;
  quoteAr?: string;
  author: string;
  authorAr?: string;
  title: string;
  titleAr?: string;
  company: string;
  companyAr?: string;
  avatar?: string;
}

export interface Insight {
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  category: string;
  categoryAr?: string;
  date: string;
  readTime: string;
  readTimeAr?: string;
  image: string;
  author: {
    name: string;
    nameAr?: string;
    avatar: string;
  };
  href: string;
}

export interface CaseStudy {
  title: string;
  titleAr?: string;
  industry: string;
  industryAr?: string;
  excerpt: string;
  excerptAr?: string;
  image: string;
  stats: StatItem[];
  href: string;
}

// ============================================
// FOOTER
// ============================================

export interface FooterColumn {
  title: string;
  titleAr?: string;
  links: { label: string; labelAr?: string; href: string }[];
}

// ============================================
// ANIMATION
// ============================================

export type EasingName = 'ease-out-expo' | 'ease-out-quint' | 'ease-in-out-sine' | 'ease-out-back' | 'ease-spring';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface RevealOptions {
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  threshold?: number;
  stagger?: number;
  once?: boolean;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  offset?: number;
}

// ============================================
// SVG
// ============================================

export type SVGVariant = 'navy' | 'gold' | 'white' | 'current';

export interface SVGProps {
  variant?: SVGVariant;
  size?: number | string;
  className?: string;
  ariaLabel?: string;
}

// ============================================
// RESPONSIVE — 7 Device Categories
// ============================================

export type Breakpoint = 'small-mobile' | 'medium-mobile' | 'large-mobile' | 'tablet-portrait' | 'tablet-landscape' | 'laptop' | 'desktop';

// Legacy compatibility
export type BreakpointLegacy = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface ResponsiveValue<T> {
  smallMobile: T;
  mediumMobile?: T;
  largeMobile?: T;
  tabletPortrait?: T;
  tabletLandscape?: T;
  laptop?: T;
  desktop?: T;
}

// Device category shortcuts
export interface DeviceFlags {
  isSmallMobile: boolean;
  isMediumMobile: boolean;
  isLargeMobile: boolean;
  isTabletPortrait: boolean;
  isTabletLandscape: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  // Group flags
  isAnyMobile: boolean;
  isAnyTablet: boolean;
  isSmallScreen: boolean;    // mobile + tablet portrait
  isMediumScreen: boolean;   // tablet landscape + laptop
  isLargeScreen: boolean;    // desktop+
}
