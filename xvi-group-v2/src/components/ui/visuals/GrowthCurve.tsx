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
        <linearGradient id="gcArea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gcLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#D4B76E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="gcHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="206" r="150" fill="url(#gcHalo)" />

      {/* Grid */}
      <g stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7">
        <line x1="64" y1="120" x2="452" y2="120" />
        <line x1="64" y1="180" x2="452" y2="180" />
        <line x1="64" y1="240" x2="452" y2="240" />
        <line x1="64" y1="300" x2="452" y2="300" />
        <line x1="64" y1="74" x2="64" y2="348" />
        <line x1="452" y1="74" x2="452" y2="348" />
      </g>

      {/* Area under curve */}
      <path
        d="M 64 332 C 132 332, 150 306, 208 304 C 266 302, 278 262, 336 256 C 394 250, 420 214, 452 196 L 452 332 Z"
        fill="url(#gcArea)"
      />

      {/* S-curve */}
      <path
        d="M 64 332 C 132 332, 150 306, 208 304 C 266 302, 278 262, 336 256 C 394 250, 420 214, 452 196"
        stroke="url(#gcLine)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Endpoint node */}
      <g transform="translate(452, 196)">
        <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.6" />
        <circle cx="0" cy="0" r="3.5" fill="#A98533" />
        <circle cx="0" cy="0" r="18" stroke="#C8A65A" strokeOpacity="0.25" strokeWidth="0.8" />
      </g>

      {/* Baseline */}
      <line x1="64" y1="332" x2="452" y2="332" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="1" />
      <rect x="64" y="326" width="6" height="6" fill="#C8A65A" fillOpacity="0.6" />

      {/* Rising chevrons */}
      <g stroke="#C8A65A" strokeOpacity="0.45" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 120 352 l 8 -10 l 8 10" />
        <path d="M 168 352 l 8 -10 l 8 10" />
        <path d="M 216 352 l 8 -10 l 8 10" />
        <path d="M 264 352 l 8 -10 l 8 10" />
        <path d="M 312 352 l 8 -10 l 8 10" />
        <path d="M 360 352 l 8 -10 l 8 10" />
        <path d="M 408 352 l 8 -10 l 8 10" />
      </g>
    </svg>
  );
}
