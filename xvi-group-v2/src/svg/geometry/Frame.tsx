// XVI GROUP — Frame SVG Component
// The structural container for all content

import type { SVGProps } from '../../types';

interface FrameProps extends SVGProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  strokeWidth?: number;
}

export function Frame({
  variant = 'current',
  width = '100%',
  height = '100%',
  borderRadius = 12,
  strokeWidth = 1.5,
  className = '',
  ariaLabel = 'XVI Frame',
}: FrameProps) {
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
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      role="presentation"
      preserveAspectRatio="none"
    >
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx={borderRadius}
        ry={borderRadius}
      />
    </svg>
  );
}
