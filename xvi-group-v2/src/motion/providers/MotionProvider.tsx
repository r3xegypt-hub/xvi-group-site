// XVI GROUP — Motion Provider
// Initializes all motion engines and provides reduced motion context

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { scrollRevealEngine } from '../engines/ScrollRevealEngine';
import { parallaxEngine } from '../engines/ParallaxEngine';

// ============================================
// CONTEXT
// ============================================

interface MotionContextValue {
  prefersReducedMotion: boolean;
  isMotionEnabled: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  isMotionEnabled: true,
});

// ============================================
// PROVIDER
// ============================================

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      scrollRevealEngine.init();
      parallaxEngine.init();
    }

    return () => {
      scrollRevealEngine.disconnect();
      parallaxEngine.disconnect();
    };
  }, [prefersReducedMotion]);

  const value: MotionContextValue = {
    prefersReducedMotion,
    isMotionEnabled: !prefersReducedMotion,
  };

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
}
