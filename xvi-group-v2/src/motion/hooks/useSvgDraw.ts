// XVI GROUP — useSvgDraw Hook
// SVG path draw-in animation on scroll reveal

import { useEffect, useRef, useState } from 'react';

interface SvgDrawConfig {
  duration?: number;
  delay?: number;
  startOnView?: boolean;
}

export function useSvgDraw({
  duration = 1200,
  delay = 0,
  startOnView = true,
}: SvgDrawConfig = {}) {
  const ref = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted || !ref.current) return;

    const paths = ref.current.querySelectorAll('line, path, circle, rect, polyline, polygon');
    const startTime = performance.now() + delay;
    let raf: number;

    // Calculate total path lengths
    const lengths = Array.from(paths).map((el) => {
      if (el instanceof SVGLineElement) {
        const x1 = el.getAttribute('x1') || '0';
        const y1 = el.getAttribute('y1') || '0';
        const x2 = el.getAttribute('x2') || '0';
        const y2 = el.getAttribute('y2') || '0';
        return Math.sqrt(
          Math.pow(parseFloat(x2) - parseFloat(x1), 2) +
          Math.pow(parseFloat(y2) - parseFloat(y1), 2)
        );
      }
      return (el as SVGPathElement).getTotalLength?.() || 0;
    });

    // Set initial stroke-dasharray/dashoffset
    paths.forEach((el, i) => {
      el.setAttribute('stroke-dasharray', `${lengths[i]}`);
      el.setAttribute('stroke-dashoffset', `${lengths[i]}`);
    });

    const step = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }

      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      paths.forEach((el, i) => {
        el.setAttribute('stroke-dashoffset', `${lengths[i] * (1 - eased)}`);
      });

      setProgress(eased * 100);

      if (t < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [hasStarted, duration, delay]);

  return { ref, progress };
}
