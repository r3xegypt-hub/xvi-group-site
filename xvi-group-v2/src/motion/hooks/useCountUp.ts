// XVI GROUP — useCountUp Hook
// Animated counter for stat numbers

import { useEffect, useRef, useState, useCallback } from 'react';

interface CountUpConfig {
  end: number;
  duration?: number;
  startOnView?: boolean;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  startOnView = true,
  suffix = '',
}: CountUpConfig) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const animate = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setHasStarted(true);

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, startOnView]);

  return { ref, count, display: `${count}${suffix}` };
}
