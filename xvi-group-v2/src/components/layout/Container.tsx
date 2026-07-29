import type { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export function Container({ children, className = '', as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={[styles.container, className].filter(Boolean).join(' ')}>
      {children}
    </Component>
  );
}
