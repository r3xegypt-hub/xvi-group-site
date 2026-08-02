// XVI GROUP — Premium Enterprise Geometric Logo System
// A multi-faceted, architectural XVI mark with gold metallic precision & glass lighting.

interface LogoProps {
  size?: number;
  variant?: 'dark' | 'light' | 'gold';
  className?: string;
}

export function LogoIcon({ size = 32, variant = 'gold', className }: LogoProps) {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';
  
  const mainGradientId = `xvi-logo-grad-${variant}-${size}`;
  const accentGradientId = `xvi-logo-accent-${variant}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <linearGradient id={mainGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#4A4E54" />
              <stop offset="100%" stopColor="#1E2226" />
            </>
          ) : isLight ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D4D4D8" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#EED9A1" />
              <stop offset="50%" stopColor="#C8A65A" />
              <stop offset="100%" stopColor="#8C6E2E" />
            </>
          )}
        </linearGradient>
        <linearGradient id={accentGradientId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F7E7C4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9B783E" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer Glass Ring Frame */}
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        rx="6"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="1.75"
        fill="none"
        opacity="0.9"
      />

      {/* Inner Precision Grid Guidelines */}
      <line x1="20" y1="5" x2="20" y2="35" stroke={`url(#${mainGradientId})`} strokeWidth="0.5" strokeOpacity="0.25" />
      <line x1="5" y1="20" x2="35" y2="20" stroke={`url(#${mainGradientId})`} strokeWidth="0.5" strokeOpacity="0.25" />

      {/* Primary Architectural X-Diagonals */}
      <path
        d="M10 10L30 30"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 10L10 30"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Center Meridian Diamond Core */}
      <polygon
        points="20,14 26,20 20,26 14,20"
        fill={isLight ? '#FFFFFF' : isDark ? '#2C3035' : '#1A1813'}
        stroke={`url(#${accentGradientId})`}
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="2" fill={`url(#${mainGradientId})`} />
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
  const textColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#F0E6D2' : '#2A2E33';
  const groupColor = variant === 'gold' ? '#C8A65A' : variant === 'light' ? 'rgba(255,255,255,0.7)' : '#71757A';
  const textSize = size === 'lg' ? '1.5rem' : size === 'md' ? '1.25rem' : '1rem';
  const groupSize = size === 'lg' ? '0.75rem' : '0.625rem';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          fontFamily: '"Cinzel", "Manrope", sans-serif',
          fontSize: textSize,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: textColor,
          lineHeight: 1,
          textShadow: variant === 'gold' ? '0 0 12px rgba(200, 166, 90, 0.25)' : 'none',
        }}
      >
        XVI
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: groupSize,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: groupColor,
            marginLeft: '8px',
            textTransform: 'uppercase',
            verticalAlign: 'middle',
          }}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}

export function LogoHorizontal({ variant = 'gold', size = 'md', className }: FullLogoProps) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <LogoIcon size={size === 'lg' ? 40 : size === 'md' ? 32 : 24} variant={variant} />
      <LogoText variant={variant} size={size} />
    </span>
  );
}

export function LogoVertical({ variant = 'gold', className }: FullLogoProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <LogoIcon size={48} variant={variant} />
      <LogoText variant={variant} size="md" />
    </div>
  );
}

export function LogoSquare({
  variant = 'gold',
  size = 80,
  className,
}: {
  variant?: 'dark' | 'light' | 'gold';
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(200, 166, 90, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 12px rgba(200, 166, 90, 0.08)',
        borderRadius: '8px',
      }}
    >
      <LogoIcon size={size * 0.55} variant={variant} />
    </div>
  );
}

export function LogoMain({ type = 'horizontal', variant = 'gold', className }: FullLogoProps) {
  if (type === 'vertical') return <LogoVertical variant={variant} className={className} />;
  if (type === 'square') return <LogoSquare variant={variant} className={className} />;
  return <LogoHorizontal variant={variant} className={className} />;
}

export function LogoWordmark({ variant = 'gold', className }: { variant?: 'dark' | 'light' | 'gold'; className?: string }) {
  return <LogoHorizontal variant={variant} size="sm" className={className} />;
}

export function XMark({ size = 28 }: { size?: number }) {
  return <LogoIcon size={size} variant="gold" />;
}

export function LoaderLogo({ size = 64 }: { size?: number }) {
  return <LogoIcon size={size} variant="gold" />;
}

