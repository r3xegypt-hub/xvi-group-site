interface GrowthCurveProps {
  className?: string;
}

export function GrowthCurve({ className }: GrowthCurveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="gcFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="gcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="210" r="170" fill="url(#gcGlow)" />

      <rect x="40" y="40" width="440" height="340" rx="4" stroke="#C8A65A" strokeOpacity="0.1" strokeWidth="0.7" />
      <line x1="40" y1="340" x2="480" y2="340" stroke="#C8A65A" strokeOpacity="0.18" strokeWidth="0.8" />

      <g stroke="#3F4348" strokeOpacity="0.06" strokeWidth="0.7">
        <line x1="40" y1="300" x2="480" y2="300" />
        <line x1="40" y1="260" x2="480" y2="260" />
        <line x1="40" y1="220" x2="480" y2="220" />
        <line x1="40" y1="180" x2="480" y2="180" />
        <line x1="40" y1="140" x2="480" y2="140" />
        <line x1="40" y1="100" x2="480" y2="100" />
      </g>

      {/* Baseline grid ticks */}
      <g stroke="#C8A65A" strokeOpacity="0.25" strokeWidth="0.7">
        <line x1="120" y1="340" x2="120" y2="100" strokeDasharray="2 6" />
        <line x1="200" y1="340" x2="200" y2="100" strokeDasharray="2 6" />
        <line x1="280" y1="340" x2="280" y2="100" strokeDasharray="2 6" />
        <line x1="360" y1="340" x2="360" y2="100" strokeDasharray="2 6" />
        <line x1="440" y1="340" x2="440" y2="100" strokeDasharray="2 6" />
      </g>

      {/* Secondary neutral curve */}
      <path
        d="M 70 330 C 150 300, 210 290, 280 250 C 350 212, 400 210, 460 180"
        stroke="#3F4348"
        strokeOpacity="0.16"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />

      {/* Primary growth curve */}
      <path
        d="M 70 340 C 140 320, 190 280, 240 250 C 300 214, 350 200, 420 130 L 420 340 Z"
        fill="url(#gcFill)"
        stroke="none"
      />
      <path
        d="M 70 340 C 140 318, 190 278, 240 248 C 300 212, 350 198, 420 128"
        stroke="#C8A65A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Milestone markers */}
      <g>
        <circle cx="130" cy="326" r="4" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="195" cy="272" r="4" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="262" cy="234" r="4.5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="350" cy="192" r="4.5" fill="#C8A65A" fillOpacity="0.85" />
        <circle cx="350" cy="192" r="10" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="1" fill="none" />
        <circle cx="420" cy="128" r="6" fill="#C8A65A" />
        <circle cx="420" cy="128" r="12" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      </g>

      {/* Upright arrowhead */}
      <g stroke="#C8A65A" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 424 124 l 12 6" />
        <path d="M 424 124 l -4 12" />
      </g>

      {/* Rising staircase accents */}
      <g fill="#C8A65A" fillOpacity="0.4">
        <rect x="140" y="330" width="8" height="10" rx="1" />
        <rect x="196" y="288" width="8" height="52" rx="1" />
        <rect x="268" y="240" width="8" height="100" rx="1" />
        <rect x="356" y="204" width="8" height="136" rx="1" />
      </g>
    </svg>
  );
}
