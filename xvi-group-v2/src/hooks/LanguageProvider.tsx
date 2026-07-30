// XVI GROUP — Language Provider
// React context for language and i18n management

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Language, Direction } from '../types';
import { typographyEngine } from '../branding/typography';

// ============================================
// CONTEXT
// ============================================

interface LanguageContextValue {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  isLTR: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  direction: 'ltr',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isRTL: false,
  isLTR: true,
  t: (key: string) => key,
});

// ============================================
// PROVIDER
// ============================================

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [direction, setDirection] = useState<Direction>(defaultLanguage === 'ar' ? 'rtl' : 'ltr');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    typographyEngine.setLanguage(lang);

    // Update document attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update CSS variables
    const vars = typographyEngine.getCSSVariables();
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Load translations
    try {
      const common = await import(`../i18n/${lang}/common.json`);
      setTranslations({ common: common.default });
    } catch {
      console.warn(`Could not load translations for ${lang}`);
    }

    // Save preference
    localStorage.setItem('xvi-language', lang);
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleLanguage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    document.documentElement.classList.add('lang-switching');
    setTimeout(() => {
      setLanguage(language === 'en' ? 'ar' : 'en');
      setTimeout(() => {
        document.documentElement.classList.remove('lang-switching');
        setIsTransitioning(false);
      }, 400);
    }, 150);
  }, [language, setLanguage, isTransitioning]);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations.common;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') return key;

    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(`{{${paramKey}}}`, String(paramValue)),
        value
      );
    }

    return value;
  }, [translations]);

  useEffect(() => {
    const saved = localStorage.getItem('xvi-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved);
    } else {
      setLanguage(defaultLanguage);
    }
  }, [defaultLanguage, setLanguage]);

  const value: LanguageContextValue = {
    language,
    direction,
    setLanguage,
    toggleLanguage,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
