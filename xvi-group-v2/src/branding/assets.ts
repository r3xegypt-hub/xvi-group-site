// XVI GROUP — Asset Pipeline
// Centralized asset management system

import type { Language } from '../types';

// ============================================
// LOGO SYSTEM
// ============================================

export const LOGO = {
  horizontal: {
    dark: '/logo/logo-horizontal.svg',
    light: '/logo/logo-horizontal-dark.svg',
    gold: '/logo/logo-horizontal-gold.svg',
  },
  vertical: {
    dark: '/logo/logo-square.svg',
    light: '/logo/logo-square-dark.svg',
  },
  icon: {
    dark: '/logo/logo-mark.svg',
    light: '/logo/logo-mark-dark.svg',
    gold: '/logo/logo-mark-gold.svg',
  },
  favicon: {
    dark: '/logo/favicon.svg',
    light: '/logo/favicon-light.svg',
  },
  appIcon: '/logo/logo-square.svg',
  loader: '/logo/logo-mark.svg',
} as const;

// ============================================
// LOGO CONCEPTS
// ============================================

export const LOGO_CONCEPTS = {
  architectural: {
    dark: '/logo/concept-01-architectural-dark.svg',
    light: '/logo/concept-01-architectural-light.svg',
  },
  sovereign: {
    dark: '/logo/concept-02-sovereign-dark.svg',
    light: '/logo/concept-02-sovereign-light.svg',
  },
  monogram: '/logo/concept-03-precision-monogram.svg',
  meridian: {
    dark: '/logo/concept-04-meridian-dark.svg',
    gold: '/logo/concept-04-meridian-gold.svg',
  },
  nexus: '/logo/concept-05-kinetic-nexus.svg',
} as const;

// ============================================
// BRAND PATTERNS
// ============================================

export const PATTERNS = {
  diamond: '/brand/pattern-diamond.svg',
  meridian: '/brand/pattern-meridian.svg',
  nexus: '/brand/pattern-nexus.svg',
  dot: '/brand/pattern-dot.svg',
  base: '/brand/pattern.svg',
  divider: '/brand/divider.svg',
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
  network: '/illustrations/network.svg',
  nodes: '/illustrations/nodes.svg',
  connections: '/illustrations/connections.svg',
  intelligence: '/illustrations/intelligence.svg',

  // Empty states
  empty: '/illustrations/empty.svg',
  error404: '/illustrations/404.svg',

  // Background geometry
  heroGeometry: '/illustrations/hero-geometry.svg',
  sectionGeometry: '/illustrations/section-geometry.svg',
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
