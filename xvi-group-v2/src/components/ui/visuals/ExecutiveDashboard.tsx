interface ExecutiveDashboardProps {
  className?: string;
}

export function ExecutiveDashboard({ className }: ExecutiveDashboardProps) {
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
        <linearGradient id="edTrend" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="edHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="210" r="165" fill="url(#edHalo)" />

      {/* Frame */}
      <rect x="52" y="56" width="416" height="300" rx="14" fill="#FFFFFF" fillOpacity="0.9" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.2" />
      <rect x="60" y="64" width="400" height="284" rx="10" stroke="#C8A65A" strokeOpacity="0.2" strokeWidth="0.7" strokeDasharray="3 6" />

      {/* Header bar */}
      <rect x="72" y="82" width="120" height="5" rx="2.5" fill="#C8A65A" fillOpacity="0.55" />
      <rect x="72" y="94" width="76" height="3.5" rx="1.75" fill="#3F4348" fillOpacity="0.18" />
      <circle cx="412" cy="88" r="3.5" fill="#C8A65A" fillOpacity="0.4" />
      <circle cx="424" cy="88" r="3.5" fill="#C8A65A" fillOpacity="0.25" />

      {/* Trend chart */}
      <polyline points="72,296 148,278 212,286 276,246 340,252 404,212" fill="none" stroke="#C8A65A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="72,296 148,278 212,286 276,246 340,252 404,212" fill="none" stroke="#C8A65A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.14" />
      <path d="M 72 296 L 148 278 L 212 286 L 276 246 L 340 252 L 404 212 L 404 320 L 72 320 Z" fill="url(#edTrend)" />
      <rect x="72" y="320" width="332" height="0.6" fill="#C8A65A" fillOpacity="0.3" />
      <circle cx="404" cy="212" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.5" />
      <circle cx="404" cy="212" r="9" stroke="#C8A65A" strokeOpacity="0.28" strokeWidth="0.8" />

      {/* Bars */}
      <g fill="#C8A65A" fillOpacity="0.34">
        <rect x="404" y="236" width="12" height="54" rx="2" />
        <rect x="424" y="258" width="12" height="32" rx="2" fillOpacity="0.22" />
      </g>

      {/* Metric chips */}
      <g>
        <rect x="72" y="128" width="96" height="54" rx="8" fill="#F7F3E8" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.8" />
        <rect x="82" y="138" width="52" height="4" rx="2" fill="#3F4348" fillOpacity="0.2" />
        <rect x="82" y="150" width="68" height="7" rx="3.5" fill="#C8A65A" fillOpacity="0.7" />
        <path d="M 154 140 l 6 -6 l 6 6" stroke="#C8A65A" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="176" y="128" width="96" height="54" rx="8" fill="#F7F3E8" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.8" />
        <rect x="186" y="138" width="52" height="4" rx="2" fill="#3F4348" fillOpacity="0.2" />
        <rect x="186" y="150" width="44" height="7" rx="3.5" fill="#C8A65A" fillOpacity="0.7" />
        <path d="M 258 146 l 6 6 l 6 -6" stroke="#C8A65A" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Right legend */}
      <g>
        <rect x="300" y="128" width="88" height="54" rx="8" fill="#F7F3E8" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.8" />
        <rect x="310" y="138" width="44" height="4" rx="2" fill="#3F4348" fillOpacity="0.2" />
        <rect x="310" y="150" width="60" height="7" rx="3.5" fill="#C8A65A" fillOpacity="0.7" />
        <circle cx="316" cy="170" r="2.5" fill="#C8A65A" />
        <rect x="324" y="168.5" width="34" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.3" />
      </g>
    </svg>
  );
}
