// XVI GROUP — Asset Pipeline
// Centralized asset management system

import type { Language } from '../types';

const BASE = import.meta.env.BASE_URL;

// ============================================
// LOGO SYSTEM
// ============================================

export const LOGO = {
  horizontal: {
    dark: `${BASE}logo/logo-horizontal.svg`,
    light: `${BASE}logo/logo-horizontal-dark.svg`,
    gold: `${BASE}logo/logo-horizontal.svg`,
  },
  vertical: {
    dark: `${BASE}logo/logo-square.svg`,
    light: `${BASE}logo/logo-square-dark.svg`,
  },
  icon: {
    dark: `${BASE}logo/logo-mark.svg`,
    light: `${BASE}logo/logo-mark-dark.svg`,
    gold: `${BASE}logo/logo-mark.svg`,
  },
  favicon: {
    dark: `${BASE}logo/favicon.svg`,
    light: `${BASE}logo/favicon-light.svg`,
  },
  appIcon: `${BASE}logo/logo-square.svg`,
  loader: `${BASE}logo/logo-mark.svg`,
} as const;

// ============================================
// LOGO CONCEPTS
// ============================================

export const LOGO_CONCEPTS = {
  architectural: {
    dark: `${BASE}logo/concept-01-architectural-dark.svg`,
    light: `${BASE}logo/concept-01-architectural-light.svg`,
  },
  sovereign: {
    dark: `${BASE}logo/concept-02-sovereign-dark.svg`,
    light: `${BASE}logo/concept-01-architectural-light.svg`,
  },
  monogram: `${BASE}logo/concept-03-precision-monogram.svg`,
  meridian: {
    dark: `${BASE}logo/concept-04-meridian-dark.svg`,
    gold: `${BASE}logo/concept-04-meridian-gold.svg`,
  },
  nexus: `${BASE}logo/concept-05-kinetic-nexus.svg`,
} as const;

// ============================================
// BRAND PATTERNS
// ============================================

export const PATTERNS = {
  diamond: `${BASE}brand/pattern-diamond.svg`,
  meridian: `${BASE}brand/pattern-meridian.svg`,
  nexus: `${BASE}brand/pattern-nexus.svg`,
  dot: `${BASE}brand/pattern-dot.svg`,
  base: `${BASE}brand/pattern.svg`,
  divider: `${BASE}brand/divider.svg`,
} as const;

// ============================================
// ICON SYSTEM
// ============================================

export const ICONS = {
  // Navigation
  menu: 'menu',
  close: 'x',
  search: 'search',
  arrowRight: 'arrow-right',
  arrowLeft: 'arrow-left',
  arrowUp: 'arrow-up',
  arrowDown: 'chevron-down',

  // Social
  linkedin: 'linkedin',
  twitter: 'twitter',
  email: 'mail',
  phone: 'phone',
  location: 'map-pin',

  // Services
  strategy: 'lightbulb',
  technology: 'cpu',
  ai: 'brain',
  training: 'graduation-cap',

  // UI
  check: 'check',
  plus: 'plus',
  minus: 'minus',
  externalLink: 'external-link',
  download: 'download',
  calendar: 'calendar',
  clock: 'clock',
  users: 'users',
  globe: 'globe',
  shield: 'shield',
  zap: 'zap',
  target: 'target',
  award: 'award',
  trendingUp: 'trending-up',
} as const;

// ============================================
// ILLUSTRATION SYSTEM
// ============================================

export const ILLUSTRATIONS = {
  // Service illustrations (SVG, geometric)
  network: `${BASE}brand/pattern-nexus.svg`,
  nodes: `${BASE}brand/pattern-dot.svg`,
  connections: `${BASE}brand/pattern-meridian.svg`,
  intelligence: `${BASE}brand/pattern-diamond.svg`,

  // Empty states
  empty: `${BASE}brand/pattern.svg`,
  error404: `${BASE}brand/pattern.svg`,

  // Background geometry
  heroGeometry: `${BASE}brand/pattern-diamond.svg`,
  sectionGeometry: `${BASE}brand/pattern-nexus.svg`,
} as const;

// ============================================
// IMAGE OPTIMIZATION
// ============================================

export interface ImageConfig {
  src: string;
  alt: string;
  altAr?: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function getOptimizedImageSrc(
  src: string,
  _width: number,
  _format: 'webp' | 'avif' | 'jpg' = 'webp'
): string {
  // In production, this would integrate with an image CDN
  // For now, return the original src
  return src;
}

export function getImageSrcSet(
  src: string,
  widths: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return widths.map((w) => `${getOptimizedImageSrc(src, w)} ${w}w`).join(', ');
}

// ============================================
// ASSET PIPELINE CLASS
// ============================================

class AssetPipeline {
  getLogo(variant: 'horizontal' | 'vertical' | 'icon', theme: 'dark' | 'light' | 'gold' = 'dark') {
    const logoSet = LOGO[variant];
    if (typeof logoSet === 'string') return logoSet;
    return (logoSet as Record<string, string>)[theme] || logoSet.dark;
  }

  getPattern(name: keyof typeof PATTERNS) {
    return PATTERNS[name];
  }

  getIcon(name: keyof typeof ICONS) {
    return ICONS[name];
  }

  getIllustration(name: keyof typeof ILLUSTRATIONS) {
    return ILLUSTRATIONS[name];
  }

  getImageAlt(imageConfig: { alt: string; altAr?: string }, lang: Language): string {
    return lang === 'ar' && imageConfig.altAr ? imageConfig.altAr : imageConfig.alt;
  }
}

export const assetPipeline = new AssetPipeline();
