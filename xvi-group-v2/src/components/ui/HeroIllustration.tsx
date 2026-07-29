export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: 480 }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#C8A65A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.1" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="240" cy="240" r="200" fill="url(#glow)" />

      <circle cx="240" cy="240" r="140" fill="none" stroke="#C8A65A" strokeOpacity="0.06" strokeWidth="1" />

      <g style={{ transformOrigin: '240px 240px', animation: 'orbit 30s linear infinite' }}>
        <ellipse cx="240" cy="240" rx="180" ry="60" fill="none" stroke="#C8A65A" strokeOpacity="0.08" strokeWidth="0.5" />
      </g>

      <g style={{ transformOrigin: '240px 240px', animation: 'orbit 25s linear infinite reverse' }}>
        <ellipse cx="240" cy="240" rx="60" ry="160" fill="none" stroke="#C8A65A" strokeOpacity="0.06" strokeWidth="0.5" />
      </g>

      <g style={{ transformOrigin: '240px 240px', animation: 'orbit 20s linear infinite' }}>
        <ellipse cx="240" cy="240" rx="160" ry="40" fill="none" stroke="#C8A65A" strokeOpacity="0.05" strokeWidth="0.5" />
      </g>

      <circle cx="240" cy="240" r="100" fill="url(#coreGlow)" />

      <line x1="100" y1="160" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="380" y1="160" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="100" y1="320" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="380" y1="320" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="160" y1="100" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="320" y1="100" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="160" y1="380" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />
      <line x1="320" y1="380" x2="240" y2="240" stroke="url(#lineGrad)" strokeWidth="0.75" />

      <g filter="url(#softGlow)">
        <circle cx="240" cy="240" r="6" fill="#C8A65A" opacity="0.6">
          <animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      <circle cx="100" cy="160" r="3" fill="#C8A65A" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="380" cy="160" r="3" fill="#C8A65A" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="320" r="3" fill="#C8A65A" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="380" cy="320" r="3" fill="#C8A65A" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="100" r="2.5" fill="#C8A65A" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="100" r="2.5" fill="#C8A65A" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="380" r="2.5" fill="#C8A65A" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="380" r="2.5" fill="#C8A65A" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.2s" repeatCount="indefinite" />
      </circle>

      <g style={{ animation: 'float 6s ease-in-out infinite' }}>
        <rect x="200" y="200" width="80" height="80" rx="4" fill="none" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.5" />
      </g>

      <g style={{ animation: 'orbit 15s linear infinite', transformOrigin: '240px 240px' }}>
        <circle cx="320" cy="140" r="2" fill="#C8A65A" opacity="0.5">
          <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      <g style={{ transformOrigin: '240px 240px', animation: 'orbit 18s linear infinite reverse' }}>
        <circle cx="160" cy="340" r="2" fill="#C8A65A" opacity="0.4">
          <animate attributeName="r" values="2;3.5;2" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
