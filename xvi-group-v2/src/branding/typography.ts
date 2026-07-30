import type { Language, Direction } from '../types';

// ============================================
// LUXURY TYPOGRAPHY SYSTEM — EXECUTIVE CLASS
// ============================================

// Premium font families with Arabic support
export const FONT_FAMILIES = {
  en: {
    heading: '"Manrope", Georgia, "Times New Roman", serif',
    body: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
  ar: {
    heading: '"Alexandria", "Noto Naskh Arabic", serif',
    body: '"Alexandria", "Manrope", sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
};

// ============================================
// EDITORIAL TYPE SCALE — Luxury Zenith
// ============================================

export const EN_TYPE_SCALE = {
  // Executives readability scale
  display: {
    fontSize: 'clamp(3.5rem, 9vw, 6rem)',
    lineHeight: '1.0',
    letterSpacing: '-0.03em',
    fontWeight: 700 as const,
    fontFamily: '"Manrope", Georgia, serif',
    fontFeatureSettings: '"clashActivate" 0',
  },
  h1: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", Georgia, serif',
  },
  h2: {
    fontSize: 'clamp(2.5rem, 7vw, 4rem)',
    lineHeight: '1.1',
    letterSpacing: '-0.018em',
    fontWeight: 700 as const,
    fontFamily: '"Manrope", Georgia, serif',
  },
  h3: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    lineHeight: '1.15',
    letterSpacing: '-0.015em',
    fontWeight: 600 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  h4: {
    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.012em',
    fontWeight: 600 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  bodyLarge: {
    fontSize: 'clamp(1.25rem, 4vw, 2rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  body: {
    fontSize: 'clamp(1rem, 1.75vw, 1.25rem)',
    lineHeight: '1.618',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  small: {
    fontSize: '0.9375rem',
    lineHeight: '1.65',
    letterSpacing: '0.005em',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  caption: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    letterSpacing: '0.008em',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", sans-serif',
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: '1',
    letterSpacing: '0.12em',
    fontWeight: 500 as const,
    textTransform: 'uppercase' as const,
    fontFamily: '"Manrope", sans-serif',
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: '1',
    letterSpacing: '0.04em',
    fontWeight: 600 as const,
    textTransform: 'uppercase' as const,
    fontFamily: '"Manrope", sans-serif',
  },
  nav: {
    fontSize: '0.875rem',
    lineHeight: '1',
    letterSpacing: '0.035em',
    fontWeight: 500 as const,
    fontFamily: '"Manrope", sans-serif',
  },
};

export const AR_TYPE_SCALE = {
  // Editorial elegance for Arabic
  display: {
    fontSize: 'clamp(3.25rem, 8.5vw, 5.5rem)',
    lineHeight: '1.1',
    letterSpacing: '0',
    fontWeight: 700 as const,
    fontFamily: '"Alexandria", "Noto Naskh Arabic", serif',
  },
  h1: {
    fontSize: 'clamp(2.75rem, 7.5vw, 4rem)',
    lineHeight: '1.08',
    letterSpacing: '-0.01em',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "Noto Naskh Arabic", serif',
  },
  h2: {
    fontSize: 'clamp(2.25rem, 6.5vw, 3rem)',
    lineHeight: '1.15',
    letterSpacing: '-0.008em',
    fontWeight: 700 as const,
    fontFamily: '"Alexandria", "Noto Naskh Arabic", serif',
  },
  h3: {
    fontSize: 'clamp(1.75rem, 5.5vw, 2.5rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.005em',
    fontWeight: 600 as const,
    fontFamily: '"Alexandria", "Noto Naskh Arabic", serif',
  },
  h4: {
    fontSize: 'clamp(1.5rem, 4.5vw, 1.75rem)',
    lineHeight: '1.28',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: '"Alexandria", "Noto Naskh Arabic", serif',
  },
  bodyLarge: {
    fontSize: 'clamp(1.125rem, 3.5vw, 1.5rem)',
    lineHeight: '1.7',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  body: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    lineHeight: '1.75',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  small: {
    fontSize: '0.9375rem',
    lineHeight: '1.8',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  caption: {
    fontSize: '0.875rem',
    lineHeight: '1.65',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: '1.3',
    letterSpacing: '0.05em',
    fontWeight: 500 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: '1.2',
    letterSpacing: '0.035em',
    fontWeight: 600 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
  nav: {
    fontSize: '0.875rem',
    lineHeight: '1.2',
    letterSpacing: '0.025em',
    fontWeight: 500 as const,
    fontFamily: '"Alexandria", "Manrope", sans-serif',
  },
};

// ============================================
// TYPOGRAPHY ENGINE — Premium Experience
// ============================================

export class TypographyEngine {
  private currentLanguage: Language = 'en';

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
  }

  getDirection(): Direction {
    return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  getFontFamily(role: 'heading' | 'body' | 'monospace'): string {
    const direction = this.currentLanguage;
    const roleMap: Record<Language, Record<string, string>> = {
      en: {
        heading: '"Manrope", Georgia, serif',
        body: '"Manrope", sans-serif',
        monospace: '"JetBrains Mono", "Fira Code", monospace',
      },
      ar: {
        heading: '"Alexandria", "Noto Naskh Arabic", serif',
        body: '"Alexandria", "Manrope", sans-serif',
        monospace: '"JetBrains Mono", "Fira Code", monospace',
      },
    };
    return roleMap[direction][role];
  }

  getScale() {
    return this.currentLanguage === 'ar' ? AR_TYPE_SCALE : EN_TYPE_SCALE;
  }

  getLineHeight(role: 'heading' | 'body'): string {
    if (this.currentLanguage === 'ar') {
      return role === 'body' ? '1.75' : '1.2';
    }
    return role === 'body' ? '1.618' : '1.05';
  }

  getCSSVariables() {
    const scale = this.getScale();
    const fontFamily = this.getFontFamily('body');
    
    return {
      '--font-body': fontFamily,
      '--font-heading': '"Manrope", Georgia, serif',
      '--font-monospace': '"JetBrains Mono", "Fira Code", monospace',
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
      '--text-max-width': '75ch',
      '--text-alignment': this.getDirection() === 'rtl' ? 'right' : 'left',
      '--font-feature-settings': '"clashActivate" 0',
    };
  }
}

// Singleton instance
export const typographyEngine = new TypographyEngine();