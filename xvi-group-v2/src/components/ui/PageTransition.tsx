// XVI GROUP — Page Transition Component
// Crossfade transition for route changes (150ms out, 300ms in)

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'entering' | 'visible' | 'exiting'>('visible');

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);

    // If this is the first render, just show children
    if (transitionStage === 'visible' && displayChildren === children) {
      return;
    }

    // Start exit transition
    setTransitionStage('exiting');

    const exitTimer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('entering');

      // Start enter transition
      const enterTimer = setTimeout(() => {
        setTransitionStage('visible');
      }, 300);

      return () => clearTimeout(enterTimer);
    }, 150);

    return () => clearTimeout(exitTimer);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: transitionStage === 'visible' ? 1 : 0,
        transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
      }}
    >
      {displayChildren}
    </div>
  );
}
