// XVI GROUP — Page Transition (Sprint 03)
// Cinematic crossfade with subtle scale and blur

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMotion } from '../../motion/providers/MotionProvider';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { prefersReducedMotion } = useMotion();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStage('exiting');

    const exitDuration = prefersReducedMotion ? 0 : 280;
    const enterDuration = prefersReducedMotion ? 0 : 520;

    const exitTimer = setTimeout(() => {
      setDisplayChildren(children);
      setStage('entering');

      requestAnimationFrame(() => {
        const enterTimer = setTimeout(() => setStage('visible'), enterDuration);
        return () => clearTimeout(enterTimer);
      });
    }, exitDuration);

    return () => clearTimeout(exitTimer);
  }, [location.pathname, children, prefersReducedMotion]);

  return (
    <div
      className={[styles.wrapper, styles[stage]].filter(Boolean).join(' ')}
      data-motion-stage={stage}
    >
      {displayChildren}
    </div>
  );
}
