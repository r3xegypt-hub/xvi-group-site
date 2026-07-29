// XVI GROUP — Design Tokens
// Centralized token definitions as TypeScript constants

import type { ThemeTokens } from '../types';

// ============================================
// LIGHT LUXURY THEME (Default)
// ============================================

export const LIGHT_LUXURY_THEME: ThemeTokens = {
   colors: {
     gold: '#D4943A',
     goldLight: '#E8B86D',
     goldDark: '#A8732A',
     goldMuted: 'rgba(212, 148, 58, 0.08)',
     navy: '#0A1628',
     navyLight: '#1A2A44',
     white: '#FFFFFF',
     background: '#08090D',
     backgroundSecondary: '#0E1017',
     surface: '#151820',
     warm: '#11141B',
     graphite: '#8A909C',
     grey: '#3A3F4A',
     border: 'rgba(212, 148, 58, 0.12)',
     borderHover: 'rgba(212, 148, 58, 0.25)',
     success: '#34D058',
     error: '#F85149',
     warning: '#D29922',
     info: '#58A6FF',
   },
  typography: {
    headingFont: "'Fraunces', Georgia, serif",
    bodyFont: "'IBM Plex Sans', Arial, sans-serif",
    arabicHeadingFont: "'Alexandria', 'IBM Plex Sans Arabic', sans-serif",
    arabicBodyFont: "'IBM Plex Sans Arabic', 'Alexandria', Arial, sans-serif",
  },
  spacing: {
    '2xs': '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
    '4xl': '128px',
  },
  shadows: {
    level0: 'none',
    level1: '0 1px 3px rgba(10, 22, 40, 0.06)',
    level2: '0 4px 12px rgba(10, 22, 40, 0.08)',
    level3: '0 8px 24px rgba(10, 22, 40, 0.1)',
    level4: '0 16px 48px rgba(10, 22, 40, 0.12)',
    gold: '0 4px 24px rgba(201, 169, 110, 0.25)',
  },
  radii: {
    none: '0',
    sm: '2px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  breakpoints: {
    mobile: '0px',
    tablet: '640px',
    desktop: '1024px',
    wide: '1440px',
  },
  zIndex: {
    base: 0,
    elevated: 10,
    dropdown: 100,
    sticky: 500,
    overlay: 1000,
    modal: 2000,
    toast: 3000,
    loader: 9999,
  },
  transitions: {
    instant: '100ms',
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    slower: '800ms',
    slowest: '1200ms',
  },
};

// ============================================
// DARK PREMIUM THEME
// ============================================

export const DARK_PREMIUM_THEME: ThemeTokens = {
  ...LIGHT_LUXURY_THEME,
  colors: {
    ...LIGHT_LUXURY_THEME.colors,
    background: '#030405',
    backgroundSecondary: '#080A0E',
    surface: '#0E1015',
    warm: '#06080C',
    graphite: '#9CA3AF',
    grey: '#4B5563',
    border: 'rgba(212, 148, 58, 0.12)',
    borderHover: 'rgba(212, 148, 58, 0.25)',
  },
};

// ============================================
// PRESENTATION THEME
// ============================================

export const PRESENTATION_THEME: ThemeTokens = {
  ...LIGHT_LUXURY_THEME,
  colors: {
    ...LIGHT_LUXURY_THEME.colors,
    background: '#FFFFFF',
    backgroundSecondary: '#F8F6F2',
  },
};

// ============================================
// THEME MAP
// ============================================

export const THEMES = {
  'light-luxury': LIGHT_LUXURY_THEME,
  'dark-premium': DARK_PREMIUM_THEME,
  'presentation': PRESENTATION_THEME,
} as const;
