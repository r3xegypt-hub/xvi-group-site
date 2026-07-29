// XVI GROUP — Asset Pipeline (Sprint 01 — Meridian Mark identity)

import type { Language } from '../types';

const BASE = import.meta.env.BASE_URL;

export const LOGO = {
  horizontal: {
    dark: `${BASE}identity/logo-horizontal-dark.svg`,
    light: `${BASE}identity/logo-horizontal-light.svg`,
    gold: `${BASE}identity/logo-horizontal-dark.svg`,
  },
  vertical: {
    dark: `${BASE}identity/logo-vertical-dark.svg`,
    light: `${BASE}identity/logo-vertical-light.svg`,
  },
  icon: {
    dark: `${BASE}identity/symbol-dark.svg`,
    light: `${BASE}identity/symbol-light.svg`,
    gold: `${BASE}identity/symbol-dark.svg`,
  },
  main: {
    dark: `${BASE}identity/logo-main-dark.svg`,
    light: `${BASE}identity/logo-main-light.svg`,
  },
  square: {
    dark: `${BASE}identity/logo-square-dark.svg`,
    light: `${BASE}identity/logo-square-light.svg`,
  },
  concepts: {
    orbit: `${BASE}identity/concepts/concept-a-orbit.svg`,
    meridian: `${BASE}identity/concepts/concept-b-meridian.svg`,
    pillar: `${BASE}identity/concepts/concept-c-pillar.svg`,
  },
  favicon: {
    dark: `${BASE}identity/favicon.svg`,
    light: `${BASE}identity/favicon.svg`,
  },
  appIcon: `${BASE}identity/app-icon.svg`,
  loader: `${BASE}identity/loader.svg`,
} as const;

// ============================================
// BRAND PATTERNS
// ============================================

export const PATTERNS = {
  base: `${BASE}identity/symbol-dark.svg`,
  network: `${BASE}identity/symbol-dark.svg`,
  signal: `${BASE}identity/symbol-light.svg`,
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
  network: `${BASE}identity/symbol-dark.svg`,
  nodes: `${BASE}identity/symbol-dark.svg`,
  connections: `${BASE}identity/symbol-light.svg`,
  intelligence: `${BASE}identity/symbol-dark.svg`,

  // Empty states
  empty: `${BASE}identity/symbol-dark.svg`,
  error404: `${BASE}identity/symbol-dark.svg`,

  // Background geometry
  heroGeometry: `${BASE}identity/symbol-dark.svg`,
  sectionGeometry: `${BASE}identity/symbol-light.svg`,
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
