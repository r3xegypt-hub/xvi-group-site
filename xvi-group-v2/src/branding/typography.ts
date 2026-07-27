// XVI GROUP — Typography Engine
// Fluid typography, bilingual support, responsive type scaling

import type { Language, Direction } from '../types';

// ============================================
// FONT FAMILY MAP
// ============================================

export const FONT_FAMILIES = {
  en: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  ar: {
    heading: "'Amiri', 'Traditional Arabic', serif",
    body: "'Tajawal', 'Noto Sans Arabic', Arial, sans-serif",
  },
} as const;

// ============================================
// TYPE SCALE — Perfect Fourth (1.333)
// ============================================

export const TYPE_SCALE = {
  h1: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    fontWeight: 700,
  },
  h2: {
    fontSize: 'clamp(2rem, 4vw, 2.625rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    fontWeight: 600,
  },
  h3: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.25',
    letterSpacing: '0',
    fontWeight: 600,
  },
  h4: {
    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
    lineHeight: '1.33',
    letterSpacing: '0',
    fontWeight: 600,
  },
  bodyLarge: {
    fontSize: 'clamp(1.125rem, 1.75vw, 1.25rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400,
  },
  body: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400,
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.43',
    letterSpacing: '0.01em',
    fontWeight: 400,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.33',
    letterSpacing: '0.02em',
    fontWeight: 400,
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: '1',
    letterSpacing: '0.1em',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: '1',
    letterSpacing: '0.02em',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
  },
} as const;

// ============================================
// ARABIC TYPE SCALE (Adjusted for Arabic script)
// ============================================

export const ARABIC_TYPE_SCALE = {
  ...TYPE_SCALE,
  body: {
    ...TYPE_SCALE.body,
    lineHeight: '1.75', // Arabic needs more vertical space
  },
  bodyLarge: {
    ...TYPE_SCALE.bodyLarge,
    lineHeight: '1.75',
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
    return this.currentLanguage === 'ar' ? ARABIC_TYPE_SCALE : TYPE_SCALE;
  }

  getLineHeight(role: 'heading' | 'body'): string {
    if (this.currentLanguage === 'ar') {
      return role === 'body' ? '1.75' : '1.15';
    }
    return role === 'body' ? '1.618' : '1.15';
  }

  getMaxLineWidth(): string {
    return '65ch'; // 65-75 characters for optimal reading
  }

  // Generate CSS custom properties for typography
  getCSSVariables(): Record<string, string> {
    const scale = this.getScale();
    return {
      '--font-heading': this.getFontFamily('heading'),
      '--font-body': this.getFontFamily('body'),
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
