// XVI GROUP — useParallax Hook (Sprint 03)

import { useEffect, useRef } from 'react';
import { parallaxEngine, type ParallaxConfig } from '../engines/ParallaxEngine';

export function useParallax(config: Partial<ParallaxConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    parallaxEngine.observe(element, config);
    return () => parallaxEngine.unobserve(element);
  }, [config.speed, config.direction, config.offset]);

  return ref;
}
