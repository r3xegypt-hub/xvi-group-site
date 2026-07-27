// XVI GROUP — useScrollReveal Hook
// React hook for scroll reveal animations

import { useEffect, useRef, useCallback } from 'react';
import { scrollRevealEngine, type RevealConfig } from '../engines/ScrollRevealEngine';

// ============================================
// HOOK
// ============================================

export function useScrollReveal(config: Partial<RevealConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    scrollRevealEngine.observe(element, config);

    return () => {
      scrollRevealEngine.disconnect();
    };
  }, [config.direction, config.duration, config.delay, config.threshold, config.stagger, config.once]);

  return ref;
}

// ============================================
// HOOK WITH STAGGER
// ============================================

export function useScrollRevealStagger(config: Partial<RevealConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    scrollRevealEngine.observe(element, {
      ...config,
      stagger: config.stagger ?? 100,
    });

    return () => {
      scrollRevealEngine.disconnect();
    };
  }, []);

  return ref;
}

// ============================================
// HOOK FOR MULTIPLE ELEMENTS
// ============================================

export function useScrollRevealGroup(config: Partial<RevealConfig> = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, index) => {
      scrollRevealEngine.observe(child, {
        ...config,
        delay: (config.delay ?? 0) + index * (config.stagger ?? 100),
      });
    });

    return () => {
      scrollRevealEngine.disconnect();
    };
  }, []);

  return containerRef;
}
