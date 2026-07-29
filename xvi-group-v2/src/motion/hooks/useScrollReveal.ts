// XVI GROUP — useScrollReveal Hook (Sprint 03)

import { useEffect, useRef } from 'react';
import { scrollRevealEngine, type RevealConfig } from '../engines/ScrollRevealEngine';

export function useScrollReveal(config: Partial<RevealConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    scrollRevealEngine.observe(element, config);
    return () => scrollRevealEngine.unobserve(element);
  }, [config.direction, config.duration, config.delay, config.threshold, config.stagger, config.once]);

  return ref;
}

export function useScrollRevealStagger(config: Partial<RevealConfig> = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    scrollRevealEngine.observe(element, {
      ...config,
      stagger: config.stagger ?? 100,
    });

    return () => scrollRevealEngine.unobserve(element);
  }, [config.direction, config.duration, config.delay, config.stagger, config.once]);

  return ref;
}

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
      children.forEach((child) => scrollRevealEngine.unobserve(child));
    };
  }, [config.direction, config.duration, config.delay, config.stagger, config.once]);

  return containerRef;
}
