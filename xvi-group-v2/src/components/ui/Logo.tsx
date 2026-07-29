export function XMark({ size = 28, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'xmark-pulse' : ''}
    >
      <line x1="4" y1="4" x2="24" y2="24" stroke="#EEF0F4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="4" x2="4" y2="24" stroke="#EEF0F4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.5" fill="#D4943A" opacity="0" className="xmark-gap-dot" />
    </svg>
  );
}

export function LogoWordmark({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const fontSize = size === 'lg' ? '1.25rem' : '1rem';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <XMark size={size === 'lg' ? 28 : 22} />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize,
          fontWeight: 300,
          letterSpacing: '0.02em',
          color: '#EEF0F4',
          lineHeight: 1,
        }}
      >
        XVI
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: size === 'lg' ? '0.625rem' : '0.5rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: '#838A96',
            marginLeft: '4px',
            textTransform: 'uppercase',
          }}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}
