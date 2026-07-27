// XVI GROUP — useScrollSectionProgress Hook
// Returns 0-1 progress of a section through the viewport

import { useEffect, useRef, useState } from 'react';

export function useScrollSectionProgress() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // 0 = section just entered bottom, 1 = section about to leave top
      const rawProgress = (vh - sectionTop) / (vh + sectionHeight);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}
