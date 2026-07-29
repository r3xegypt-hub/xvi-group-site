// XVI GROUP — useScrollProgress Hook (Sprint 03)
// Smooth scroll progress with requestAnimationFrame

import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;

    const updateTarget = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      target = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) > 0.05) {
        setProgress(current);
      } else {
        setProgress(target);
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();

    updateTarget();
    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return progress;
}
