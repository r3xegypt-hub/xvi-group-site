// XVI GROUP — Grid Component
// Responsive grid system with 12-column layout

import type { ReactNode } from 'react';
import styles from './Grid.module.scss';

interface GridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  as?: 'div' | 'ul';
}

export function Grid({
  children,
  columns = 3,
  gap = 'md',
  className = '',
  as: Component = 'div',
}: GridProps) {
  const classes = [
    styles.grid,
    styles[`columns-${columns}`],
    styles[`gap-${gap}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
}

// ============================================
// GRID ITEM
// ============================================

interface GridItemProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4;
  className?: string;
}

export function GridItem({ children, span, className = '' }: GridItemProps) {
  const classes = [
    styles.item,
    span && styles[`span-${span}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
