import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface ScrollStoryProps {
  children: ReactNode;
  className?: string;
}

export function ScrollStory({ children, className }: ScrollStoryProps) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}

interface SceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Scene({ children, className, id }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity,
        scale,
        y,
        transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
        minHeight: '100vh',
        position: 'relative',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.section>
  );
}

interface PinnedSceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function PinnedScene({ children, className, id }: PinnedSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: _scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={ref}
      id={id}
      style={{
        position: 'relative',
        height: '300vh',
      }}
    >
      <div
        className={className}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
