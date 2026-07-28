import type { SVGProps } from 'react';

interface SignalRuleProps extends SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  accent?: 'dark' | 'light';
}

export function SignalRule({ width = '100%', height = 8, accent = 'dark', ...props }: SignalRuleProps) {
  const stroke = accent === 'light' ? '#E2B978' : '#C89B5A';
  return (
    <svg width={width} height={height} viewBox="0 0 160 8" fill="none" preserveAspectRatio="none" {...props}>
      <path d="M0 4H66C73 4 77 1 84 1H160" stroke={stroke} strokeWidth="1" opacity=".65" />
      <circle cx="84" cy="1" r="2" fill={stroke} />
    </svg>
  );
}
