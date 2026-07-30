import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

interface StaggerTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  splitBy?: 'word' | 'char' | 'line';
  spring?: boolean;
}

const linearEase: Easing = [0.16, 1, 0.3, 1];

export function StaggerText({
  text,
  className,
  as: Tag = 'p',
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
  spring = false,
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const items = splitBy === 'char' ? text.split('') : text.split(' ');

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <Tag style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'char' ? '0' : '0.25em' }}>
        {items.map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 15 }}
            transition={spring ? {
              type: 'spring', stiffness: 120, damping: 14,
              delay: delay + i * stagger,
            } : {
              duration: 0.5, ease: linearEase,
              delay: delay + i * stagger,
            }}
            style={{
              display: 'inline-block',
              whiteSpace: splitBy === 'char' ? 'inline' : 'nowrap',
            }}
          >
            {item}{splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}

interface StaggerLinesProps {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  lineStagger?: number;
}

export function StaggerLines({
  lines,
  className,
  as: Tag = 'div',
  delay = 0,
  lineStagger = 0.15,
}: StaggerLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div ref={ref} className={className}>
      <Tag style={{ display: 'flex', flexDirection: 'column' }}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60, rotateX: 20, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
            transition={{
              duration: 0.7, ease: linearEase,
              delay: delay + i * lineStagger,
            }}
            style={{ display: 'block', transformStyle: 'preserve-3d' }}
          >
            {line}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}