import { type ReactNode } from 'react';

interface BrokenGridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
}

export function BrokenGrid({ children, className, columns = 3 }: BrokenGridProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '24px',
      }}
    >
      {children}
    </div>
  );
}

interface BrokenGridItemProps {
  children: ReactNode;
  className?: string;
  span?: number;
  offset?: number;
}

export function BrokenGridItem({ children, className, span = 1, offset = 0 }: BrokenGridItemProps) {
  return (
    <div
      className={className}
      style={{
        gridColumn: `span ${span}`,
        marginTop: `${offset}px`,
      }}
    >
      {children}
    </div>
  );
}
