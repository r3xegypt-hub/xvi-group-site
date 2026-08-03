interface SectorNetworkProps {
  className?: string;
}

const NODES: Array<{ x: number; y: number }> = [
  { x: 420, y: 196 },
  { x: 340, y: 66 },
  { x: 180, y: 66 },
  { x: 100, y: 196 },
  { x: 180, y: 326 },
  { x: 340, y: 326 },
];

export function SectorNetwork({ className }: SectorNetworkProps) {
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
        <linearGradient id="snLink" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#D4B76E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="snHalo" cx="50%" cy="47%" r="55%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
        <pattern id="snDots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#3F4348" fillOpacity="0.05" />
        </pattern>
      </defs>

      <circle cx="260" cy="196" r="160" fill="url(#snHalo)" />
      <rect x="30" y="22" width="460" height="376" fill="url(#snDots)" />
      <rect x="38" y="30" width="444" height="360" rx="4" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.8" />

      <circle cx="260" cy="196" r="150" stroke="#C8A65A" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 7" />
      <circle cx="260" cy="196" r="96" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.7" />

      {/* Sector links */}
      <g stroke="url(#snLink)" strokeWidth="1">
        {NODES.map((n, i) => (
          <line key={i} x1="260" y1="196" x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* Outer nodes */}
      {NODES.map((n, i) => (
        <g key={i} transform={`translate(${n.x}, ${n.y})`}>
          <circle cx="0" cy="0" r="17" fill="#FFFFFF" fillOpacity="0.92" stroke="#C8A65A" strokeOpacity="0.65" strokeWidth="1.1" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="#C8A65A" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="0" cy="0" r="3" fill="#A98533" />
        </g>
      ))}

      {/* Orbit accents */}
      <g fill="#C8A65A" fillOpacity="0.4">
        <circle cx="358" cy="130" r="2.2" />
        <circle cx="162" cy="130" r="2.2" />
        <circle cx="358" cy="262" r="2.2" />
        <circle cx="162" cy="262" r="2.2" />
      </g>

      {/* Core */}
      <g transform="translate(260, 196)">
        <circle cx="0" cy="0" r="44" stroke="#C8A65A" strokeWidth="1.4" fill="#FFFFFF" fillOpacity="0.92" />
        <circle cx="0" cy="0" r="36" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="3 5" />
        <polygon points="0,-18 11,0 0,18 -11,0" fill="none" stroke="#C8A65A" strokeWidth="1.2" />
        <path d="M -20 4 h 40 M -20 12 h 26" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" strokeLinecap="round" />
        <circle cx="0" cy="0" r="3" fill="#A98533" />
      </g>

      {/* Corner ticks */}
      <g stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" strokeLinecap="round">
        <path d="M 96 60 h 12 M 96 72 h 8 M 424 60 h -12 M 424 72 h -8 M 96 332 h 12 M 96 320 h 8 M 424 332 h -12 M 424 320 h -8" />
      </g>
    </svg>
  );
}
