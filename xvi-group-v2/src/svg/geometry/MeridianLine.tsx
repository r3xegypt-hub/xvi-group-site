// XVI GROUP — Meridian Line SVG Component
// The line between aspiration and execution

import type { SVGProps } from '../../types';

interface MeridianLineProps extends Omit<SVGProps, 'size'> {
  width?: number | string;
  height?: number;
  strokeWidth?: number;
}

export function MeridianLine({
  variant = 'gold',
  width = '100%',
  height = 2,
  strokeWidth = 1.5,
  className = '',
  ariaLabel = 'XVI Meridian Line',
}: MeridianLineProps) {
  const colorMap = {
    navy: '#0A1628',
    gold: '#C9A96E',
    white: '#FFFFFF',
    current: 'currentColor',
  };

  const color = colorMap[variant];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 1200 ${height}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      role="presentation"
    >
      <line x1="0" y1={height / 2} x2="1200" y2={height / 2} />
    </svg>
  );
}
