// XVI GROUP — Container Component
// Content container with consistent max-width and padding

import type { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  narrow?: boolean;
  wide?: boolean;
  className?: string;
  as?: 'div' | 'main' | 'section' | 'article';
}

export function Container({
  children,
  narrow = false,
  wide = false,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  const classes = [
    styles.container,
    narrow && styles.narrow,
    wide && styles.wide,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
}
