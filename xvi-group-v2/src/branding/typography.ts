// XVI GROUP — Typography Engine (v2)
// Per TYPOGRAPHY_SYSTEM.md — Independent EN/AR systems

import type { Language, Direction } from '../types';

// ============================================
// FONT FAMILY MAP
// ============================================

export const FONT_FAMILIES = {
  en: {
    heading: "'Manrope', Arial, sans-serif",
    body: "'Manrope', Arial, sans-serif",
  },
  ar: {
    heading: "'Noto Kufi Arabic', 'Noto Sans Arabic', 'Tajawal', sans-serif",
    body: "'Noto Naskh Arabic', 'Tajawal', 'Noto Sans Arabic', Arial, sans-serif",
  },
} as const;

// ============================================
// ENGLISH TYPE SCALE — Per TYPOGRAPHY_SYSTEM.md
// ============================================

export const EN_TYPE_SCALE = {
  display: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    lineHeight: '1.0',
    letterSpacing: '-0.04em',
    fontWeight: 700 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  h1: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    lineHeight: '1.05',
    letterSpacing: '-0.03em',
    fontWeight: 700 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  h2: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    fontWeight: 700 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  h3: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    fontWeight: 600 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  h4: {
    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
    lineHeight: '1.3',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  bodyLarge: {
    fontSize: 'clamp(1.125rem, 1.75vw, 1.25rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  body: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  small: {
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    letterSpacing: '0.01em',
    fontWeight: 400 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  caption: {
    fontSize: '0.8125rem',
    lineHeight: '1.4',
    letterSpacing: '0.02em',
    fontWeight: 400 as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: '1',
    letterSpacing: '0.14em',
    fontWeight: 500 as const,
    textTransform: 'uppercase' as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: '1',
    letterSpacing: '0.06em',
    fontWeight: 600 as const,
    textTransform: 'uppercase' as const,
    fontFamily: "'Manrope', Arial, sans-serif",
  },
  nav: {
    fontSize: '0.875rem',
    lineHeight: '1',
    letterSpacing: '0.04em',
    fontWeight: 500 as const,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
} as const;

// ============================================
// ARABIC TYPE SCALE — Per TYPOGRAPHY_SYSTEM.md
// ============================================

export const AR_TYPE_SCALE = {
  display: {
    fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
    lineHeight: '1.2',
    letterSpacing: '0',
    fontWeight: 700 as const,
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif",
  },
  h1: {
    fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
    lineHeight: '1.25',
    letterSpacing: '0',
    fontWeight: 700 as const,
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif",
  },
  h2: {
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    lineHeight: '1.3',
    letterSpacing: '0',
    fontWeight: 700 as const,
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif",
  },
  h3: {
    fontSize: 'clamp(1.375rem, 2.75vw, 1.875rem)',
    lineHeight: '1.35',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif",
  },
  h4: {
    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
    lineHeight: '1.4',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  bodyLarge: {
    fontSize: 'clamp(1.125rem, 1.75vw, 1.25rem)',
    lineHeight: '1.8',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  body: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    lineHeight: '1.8',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  small: {
    fontSize: '0.9375rem',
    lineHeight: '1.7',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  caption: {
    fontSize: '0.8125rem',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: '1.2',
    letterSpacing: '0.06em',
    fontWeight: 500 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: '1.2',
    letterSpacing: '0.04em',
    fontWeight: 600 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
  nav: {
    fontSize: '0.875rem',
    lineHeight: '1.2',
    letterSpacing: '0.02em',
    fontWeight: 500 as const,
    fontFamily: "'Noto Naskh Arabic', 'Tajawal', Arial, sans-serif",
  },
} as const;

// ============================================
// TYPOGRAPHY ENGINE CLASS
// ============================================

class TypographyEngine {
  private currentLanguage: Language = 'en';

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
  }

  getFontFamily(role: 'heading' | 'body'): string {
    return FONT_FAMILIES[this.currentLanguage][role];
  }

  getDirection(): Direction {
    return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  getAlignment(): 'left' | 'right' {
    return this.currentLanguage === 'ar' ? 'right' : 'left';
  }

  getScale() {
    return this.currentLanguage === 'ar' ? AR_TYPE_SCALE : EN_TYPE_SCALE;
  }

  getLineHeight(role: 'heading' | 'body'): string {
    if (this.currentLanguage === 'ar') {
      return role === 'body' ? '1.8' : '1.25';
    }
    return role === 'body' ? '1.618' : '1.05';
  }

  getMaxLineWidth(): string {
    return this.currentLanguage === 'ar' ? '55ch' : '65ch';
  }

  getCSSVariables(): Record<string, string> {
    const scale = this.getScale();
    return {
      '--font-heading': this.getFontFamily('heading'),
      '--font-body': this.getFontFamily('body'),
      '--text-display-size': scale.display.fontSize,
      '--text-display-height': scale.display.lineHeight,
      '--text-display-spacing': scale.display.letterSpacing,
      '--text-display-weight': String(scale.display.fontWeight),
      '--text-h1-size': scale.h1.fontSize,
      '--text-h1-height': scale.h1.lineHeight,
      '--text-h1-spacing': scale.h1.letterSpacing,
      '--text-h1-weight': String(scale.h1.fontWeight),
      '--text-h2-size': scale.h2.fontSize,
      '--text-h2-height': scale.h2.lineHeight,
      '--text-h2-spacing': scale.h2.letterSpacing,
      '--text-h2-weight': String(scale.h2.fontWeight),
      '--text-h3-size': scale.h3.fontSize,
      '--text-h3-height': scale.h3.lineHeight,
      '--text-h3-spacing': scale.h3.letterSpacing,
      '--text-h3-weight': String(scale.h3.fontWeight),
      '--text-h4-size': scale.h4.fontSize,
      '--text-h4-height': scale.h4.lineHeight,
      '--text-h4-spacing': scale.h4.letterSpacing,
      '--text-h4-weight': String(scale.h4.fontWeight),
      '--text-body-size': scale.body.fontSize,
      '--text-body-height': scale.body.lineHeight,
      '--text-body-weight': String(scale.body.fontWeight),
      '--text-small-size': scale.small.fontSize,
      '--text-small-height': scale.small.lineHeight,
      '--text-caption-size': scale.caption.fontSize,
      '--text-caption-height': scale.caption.lineHeight,
      '--text-overline-size': scale.overline.fontSize,
      '--text-overline-spacing': scale.overline.letterSpacing,
      '--text-button-size': scale.button.fontSize,
      '--text-button-spacing': scale.button.letterSpacing,
      '--text-max-width': this.getMaxLineWidth(),
      '--text-alignment': this.getAlignment(),
    };
  }
}

export const typographyEngine = new TypographyEngine();
