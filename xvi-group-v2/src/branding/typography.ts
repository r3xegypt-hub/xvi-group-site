import type { Language, Direction } from '../types';

// ============================================
// LUXURY TYPOGRAPHY SYSTEM — EXECUTIVE CLASS
// ============================================

// Premium font families with Arabic support
export const FONT_FAMILIES = {
  en: {
    heading: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
  ar: {
    heading: '"Noto Kufi Arabic", "Alexandria", sans-serif',
    body: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
};

// ============================================
// EDITORIAL TYPE SCALE — Luxury Zenith
// ============================================

export const EN_TYPE_SCALE = {
  display: {
    fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
    lineHeight: '1.02',
    letterSpacing: '-0.025em',
    fontWeight: 700 as const,
    fontFamily: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h1: {
    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
    lineHeight: '1.08',
    letterSpacing: '-0.02em',
    fontWeight: 500 as const,
    fontFamily: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h2: {
    fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
    lineHeight: '1.1',
    letterSpacing: '-0.018em',
    fontWeight: 600 as const,
    fontFamily: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h3: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
    lineHeight: '1.15',
    letterSpacing: '-0.015em',
    fontWeight: 600 as const,
    fontFamily: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h4: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.012em',
    fontWeight: 600 as const,
    fontFamily: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  bodyLarge: {
    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
    lineHeight: '1.7',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  body: {
    fontSize: 'clamp(0.9375rem, 1.2vw, 1rem)',
    lineHeight: '1.75',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.65',
    letterSpacing: '0.005em',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.5',
    letterSpacing: '0.008em',
    fontWeight: 400 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  overline: {
    fontSize: '0.6875rem',
    lineHeight: '1',
    letterSpacing: '0.12em',
    fontWeight: 500 as const,
    textTransform: 'uppercase' as const,
    fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  button: {
    fontSize: '0.8125rem',
    lineHeight: '1',
    letterSpacing: '0.04em',
    fontWeight: 600 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  nav: {
    fontSize: '0.9375rem',
    lineHeight: '1',
    letterSpacing: '0.04em',
    fontWeight: 500 as const,
    fontFamily: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
};

export const AR_TYPE_SCALE = {
  display: {
    fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
    lineHeight: '1.15',
    letterSpacing: '0',
    fontWeight: 700 as const,
    fontFamily: '"Noto Kufi Arabic", "Alexandria", sans-serif',
  },
  h1: {
    fontSize: 'clamp(2rem, 4.5vw, 3rem)',
    lineHeight: '1.15',
    letterSpacing: '0',
    fontWeight: 500 as const,
    fontFamily: '"Noto Kufi Arabic", "Alexandria", sans-serif',
  },
  h2: {
    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
    lineHeight: '1.2',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: '"Noto Kufi Arabic", "Alexandria", sans-serif',
  },
  h3: {
    fontSize: 'clamp(1.375rem, 3vw, 2rem)',
    lineHeight: '1.25',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: '"Noto Kufi Arabic", "Alexandria", sans-serif',
  },
  h4: {
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    lineHeight: '1.3',
    letterSpacing: '0',
    fontWeight: 600 as const,
    fontFamily: '"Noto Kufi Arabic", "Alexandria", sans-serif',
  },
  bodyLarge: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    lineHeight: '1.8',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
  },
  body: {
    fontSize: 'clamp(0.9375rem, 1.2vw, 1rem)',
    lineHeight: '1.8',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.75',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: 400 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
  },
  overline: {
    fontSize: '0.6875rem',
    lineHeight: '1.3',
    letterSpacing: '0.05em',
    fontWeight: 500 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", sans-serif',
  },
  button: {
    fontSize: '0.8125rem',
    lineHeight: '1.2',
    letterSpacing: '0.02em',
    fontWeight: 600 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
  },
  nav: {
    fontSize: '0.9375rem',
    lineHeight: '1.2',
    letterSpacing: '0.015em',
    fontWeight: 500 as const,
    fontFamily: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
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
        heading: '"Space Grotesk", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
        body: '"Manrope", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        monospace: '"JetBrains Mono", "Fira Code", monospace',
      },
      ar: {
        heading: '"Noto Kufi Arabic", "Alexandria", sans-serif',
        body: '"Alexandria", "IBM Plex Sans Arabic", "Noto Naskh Arabic", sans-serif',
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
      '--font-heading': this.getFontFamily('heading'),
      '--font-monospace': this.getFontFamily('monospace'),
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