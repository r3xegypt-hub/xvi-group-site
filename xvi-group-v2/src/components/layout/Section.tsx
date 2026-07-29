import type { ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'slate' | 'ink' | 'amber';
  id?: string;
  className?: string;
  as?: 'section' | 'div' | 'main';
}

export function Section({
  children,
  variant = 'default',
  id,
  className = '',
  as: Component = 'section',
}: SectionProps) {
  const classes = [styles.section, styles[variant], className].filter(Boolean).join(' ');

  return (
    <Component id={id} className={classes}>
      {children}
    </Component>
  );
}

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const classes = [styles.header, styles[`align-${align}`], className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {overline && (
        <div className={styles.overlineWrap}>
          <span className={styles.overlineAccent} aria-hidden="true" />
          <p className={styles.overline}>{overline}</p>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
