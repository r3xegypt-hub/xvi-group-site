// XVI GROUP — useLanguage Hook
// React hook for language and direction management

import { useState, useEffect, useCallback } from 'react';
import type { Language, Direction } from '../types';
import { typographyEngine } from '../branding/typography';

// ============================================
// HOOK
// ============================================

export function useLanguage(defaultLanguage: Language = 'en') {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [direction, setDirection] = useState<Direction>(defaultLanguage === 'ar' ? 'rtl' : 'ltr');

  const setLanguage = useCallback((lang: Language) => {
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

    // Save preference
    localStorage.setItem('xvi-language', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('xvi-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved);
    } else {
      setLanguage(defaultLanguage);
    }
  }, [defaultLanguage, setLanguage]);

  return {
    language,
    direction,
    setLanguage,
    toggleLanguage,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
  };
}
