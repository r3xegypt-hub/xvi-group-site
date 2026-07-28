// XVI GROUP — Design Tokens
// Centralized token definitions as TypeScript constants

import type { ThemeTokens } from '../types';

// ============================================
// LIGHT LUXURY THEME (Default)
// ============================================

export const LIGHT_LUXURY_THEME: ThemeTokens = {
  colors: {
    gold: '#C9A96E',
    goldLight: '#D4B87A',
    goldDark: '#B89A60',
    goldMuted: 'rgba(201, 169, 110, 0.08)',
    navy: '#0A1628',
    navyLight: '#1A2A44',
    white: '#FFFFFF',
    background: '#F4F5F7',
    backgroundSecondary: '#ECEEF2',
    surface: '#FFFFFF',
    warm: '#FAFAF8',
    graphite: '#5A6472',
    grey: '#C8CDD5',
    border: 'rgba(201, 169, 110, 0.12)',
    borderHover: 'rgba(201, 169, 110, 0.25)',
    success: '#2D8A56',
    error: '#C4392D',
    warning: '#F39C12',
    info: '#3498DB',
  },
  typography: {
    headingFont: "'Manrope', Arial, sans-serif",
    bodyFont: "'Manrope', Arial, sans-serif",
    arabicHeadingFont: "'Amiri', 'Traditional Arabic', serif",
    arabicBodyFont: "'Tajawal', Arial, sans-serif",
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
    background: '#0A1628',
    backgroundSecondary: '#132240',
    surface: '#1A2A44',
    warm: '#0D1B30',
    graphite: '#C8CDD5',
    grey: '#5A6472',
    border: 'rgba(201, 169, 110, 0.15)',
    borderHover: 'rgba(201, 169, 110, 0.3)',
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
