// XVI GROUP — Section Component
// Consistent section wrapper with padding and background variants

import type { ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'warm' | 'dark' | 'gold';
  narrow?: boolean;
  id?: string;
  className?: string;
  as?: 'section' | 'div' | 'main';
}

export function Section({
  children,
  variant = 'default',
  narrow = false,
  id,
  className = '',
  as: Component = 'section',
}: SectionProps) {
  const classes = [
    styles.section,
    styles[variant],
    narrow && styles.narrow,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component id={id} className={classes}>
      {children}
    </Component>
  );
}

// ============================================
// SECTION HEADER
// ============================================

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const classes = [
    styles.header,
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
