// XVI GROUP — Theme Engine
// React context provider for theme management

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ThemeName, ThemeTokens } from '../types';
import { THEMES, LIGHT_LUXURY_THEME } from './tokens';

// ============================================
// CONTEXT
// ============================================

interface ThemeContextValue {
  theme: ThemeName;
  tokens: ThemeTokens;
  setTheme: (theme: ThemeName) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light-luxury',
  tokens: LIGHT_LUXURY_THEME,
  setTheme: () => {},
  isDark: false,
});

// ============================================
// PROVIDER
// ============================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = 'light-luxury' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const tokens = THEMES[theme];
  const isDark = theme === 'dark-premium';

  const value: ThemeContextValue = {
    theme,
    tokens,
    setTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
