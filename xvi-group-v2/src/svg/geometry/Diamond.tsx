// XVI GROUP — Diamond SVG Component
// The fundamental geometric primitive of the XVI brand

import type { SVGProps } from '../../types';

interface DiamondProps extends SVGProps {
  filled?: boolean;
  strokeWidth?: number;
}

export function Diamond({
  variant = 'current',
  size = 24,
  filled = false,
  strokeWidth = 1.5,
  className = '',
  ariaLabel = 'XVI Diamond',
}: DiamondProps) {
  const colorMap = {
    navy: '#0A1628',
    gold: '#C9A96E',
    white: '#FFFFFF',
    current: 'currentColor',
  };

  const color = colorMap[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      role="img"
    >
      <path d="M12 2L22 12L12 22L2 12Z" />
    </svg>
  );
}
