// XVI GROUP — useParallax Hook
// React hook for parallax effects

import { useEffect, useRef } from 'react';
import { parallaxEngine, type ParallaxConfig } from '../engines/ParallaxEngine';

export function useParallax(config: Partial<ParallaxConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    parallaxEngine.observe(element, config);

    return () => {
      parallaxEngine.disconnect();
    };
  }, [config.speed, config.direction, config.offset]);

  return ref;
}
