export function XMark({ size = 28 }: { size?: number }) {
  const s = size;
  const half = size / 2;
  const pad = size * 0.15;
  const armW = size * 0.08;
  const inner = half - pad;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x={pad} y={pad} width={armW} height={inner} rx={armW / 2} fill="#111111" />
      <rect x={pad + armW} y={pad} width={inner - armW} height={armW} rx={armW / 2} fill="#111111" />
      <rect x={size - pad - armW} y={pad} width={armW} height={inner} rx={armW / 2} fill="#111111" />
      <rect x={pad} y={size / 2} width={inner - armW} height={armW} rx={armW / 2} fill="#111111" />
      <rect x={pad} y={size - pad - armW} width={armW} height={inner} rx={armW / 2} fill="#111111" />
      <rect x={pad + armW} y={size - pad - armW} width={inner - armW} height={armW} rx={armW / 2} fill="#111111" />
      <rect x={size - pad - armW} y={size - pad - armW} width={armW} height={inner} rx={armW / 2} fill="#111111" />
      <rect x={size / 2} y={size - pad - armW} width={inner - armW} height={armW} rx={armW / 2} fill="#111111" />
      <rect x={size - pad - armW} y={half} width={inner - armW} height={armW} rx={armW / 2} fill="#111111" />
    </svg>
  );
}

export function LogoWordmark({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const markSize = size === 'lg' ? 28 : 22;
  const textSize = size === 'lg' ? '1.25rem' : '1rem';
  const groupSize = size === 'lg' ? '0.625rem' : '0.5rem';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <XMark size={markSize} />
      <span
        style={{
          fontFamily: "'Fraunces', 'Georgia', serif",
          fontSize: textSize,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: '#111111',
          lineHeight: 1,
        }}
      >
        XVI
        <span
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: groupSize,
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#999999',
            marginLeft: '6px',
            textTransform: 'uppercase',
          }}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}
