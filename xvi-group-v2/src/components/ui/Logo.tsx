// Concept A — "Meridian Mark" (chosen)
// A geometric, architectural X with gold precision — luxury, intelligence, permanence.
interface LogoProps {
  size?: number;
  variant?: 'dark' | 'light' | 'gold';
  className?: string;
}

export function LogoIcon({ size = 32, variant = 'dark', className }: LogoProps) {
  const colors = { dark: '#111111', light: '#FFFFFF', gold: '#C8A65A' };
  const fill = colors[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="2" stroke={fill} strokeWidth="1.5" fill="none" />
      <path d="M9 9L23 23" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 9L9 23" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill={fill} />
    </svg>
  );
}

type LogoType = 'horizontal' | 'vertical' | 'square' | 'main';

interface FullLogoProps {
  type?: LogoType;
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function LogoText({ variant, size }: { variant: string; size: string }) {
  const textColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#C8A65A' : '#111111';
  const accentColor = variant === 'gold' ? '#C8A65A' : '#999999';
  const textSize = size === 'lg' ? '1.5rem' : size === 'md' ? '1.25rem' : '1rem';
  const groupSize = size === 'lg' ? '0.75rem' : '0.625rem';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        fontFamily: '"Manrope", sans-serif',
        fontSize: textSize,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: textColor,
        lineHeight: 1,
      }}>
        XVI
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: groupSize,
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: accentColor,
          marginLeft: '6px',
          textTransform: 'uppercase',
          verticalAlign: 'middle',
        }}>
          GROUP
        </span>
      </span>
    </span>
  );
}

export function LogoHorizontal({ variant = 'dark', size = 'md', className }: FullLogoProps) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <LogoIcon size={size === 'lg' ? 36 : size === 'md' ? 28 : 22} variant={variant} />
      <LogoText variant={variant} size={size} />
    </span>
  );
}

export function LogoVertical({ variant = 'dark', className }: FullLogoProps) {
  const fill = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#C8A65A' : '#111111';
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <LogoIcon size={40} variant={variant} />
      <LogoText variant={variant} size="md" />
    </div>
  );
}

export function LogoSquare({ variant = 'dark', size = 80, className }: { variant?: 'dark' | 'light' | 'gold'; size?: number; className?: string }) {
  return (
    <div className={className} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(200,166,90,0.3)', borderRadius: '4px' }}>
      <LogoIcon size={size * 0.55} variant={variant} />
    </div>
  );
}

export function LogoMain({ type = 'horizontal', variant = 'dark', className }: FullLogoProps) {
  if (type === 'vertical') return <LogoVertical variant={variant} className={className} />;
  if (type === 'square') return <LogoSquare variant={variant} className={className} />;
  return <LogoHorizontal variant={variant} className={className} />;
}

export function LogoWordmark({ variant = 'dark', className }: { variant?: 'dark' | 'light' | 'gold'; className?: string }) {
  const textColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#C8A65A' : '#111111';
  const accentColor = variant === 'gold' ? '#C8A65A' : '#999999';
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="2" stroke={textColor} strokeWidth="1.2" fill="none" />
        <path d="M9 9L23 23" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M23 9L9 23" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.5" fill={textColor} />
      </svg>
      <span style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: '1.125rem',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: textColor,
        lineHeight: 1,
      }}>
        XVI
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.5625rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: accentColor,
          marginLeft: '5px',
          textTransform: 'uppercase',
        }}>
          GROUP
        </span>
      </span>
    </span>
  );
}

export function XMark({ size = 28 }: { size?: number }) {
  return <LogoIcon size={size} />;
}

export function LoaderLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="2" stroke="#C8A65A" strokeWidth="1.5" fill="none" />
      <path d="M9 9L23 23" stroke="#C8A65A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 9L9 23" stroke="#C8A65A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="#C8A65A" />
    </svg>
  );
}
