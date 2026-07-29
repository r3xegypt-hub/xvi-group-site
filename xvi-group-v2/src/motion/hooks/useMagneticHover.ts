// XVI GROUP — useMagneticHover Hook (Sprint 03)
// Subtle magnetic pull for buttons and interactive elements

import { useEffect, useRef } from 'react';

interface MagneticConfig {
  strength?: number;
  maxOffset?: number;
}

export function useMagneticHover<T extends HTMLElement>({
  strength = 0.25,
  maxOffset = 12,
}: MagneticConfig = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v));
      element.style.transform = `translate3d(${clamp(dx)}px, ${clamp(dy)}px, 0)`;
    };

    const onLeave = () => {
      element.style.transform = '';
    };

    element.addEventListener('mousemove', onMove);
    element.addEventListener('mouseleave', onLeave);

    return () => {
      element.removeEventListener('mousemove', onMove);
      element.removeEventListener('mouseleave', onLeave);
      element.style.transform = '';
    };
  }, [strength, maxOffset]);

  return ref;
}
