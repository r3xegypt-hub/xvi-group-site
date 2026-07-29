export function XMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="4" y1="4" x2="24" y2="24" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="4" x2="4" y2="24" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
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
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: '#111111',
          lineHeight: 1,
        }}
      >
        XVI
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: size === 'lg' ? '0.625rem' : '0.5rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#666666',
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
