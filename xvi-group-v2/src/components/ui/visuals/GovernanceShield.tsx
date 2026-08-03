interface GovernanceShieldProps {
  className?: string;
}

export function GovernanceShield({ className }: GovernanceShieldProps) {
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
        <linearGradient id="gsShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F3EEE2" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="gsHalo" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="196" r="156" fill="url(#gsHalo)" />
      <circle cx="260" cy="196" r="150" stroke="#C8A65A" strokeOpacity="0.1" strokeWidth="0.7" strokeDasharray="2 8" />

      {/* Pedestal */}
      <path d="M 172 344 h 96 v 14 c 0 4 -3 7 -7 7 h -82 c -4 0 -7 -3 -7 -7 z" fill="#C8A65A" fillOpacity="0.16" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.9" />
      <rect x="170" y="352" width="180" height="4" rx="2" fill="#C8A65A" fillOpacity="0.28" />
      <rect x="196" y="360" width="128" height="3.5" rx="1.75" fill="#C8A65A" fillOpacity="0.16" />

      {/* Shield */}
      <g transform="translate(260, 200)">
        <path
          d="M 0 -96 L 72 -66 v 58 c 0 52 -30 88 -72 104 C -42 180 -72 144 -72 92 v -58 z"
          fill="url(#gsShield)"
          stroke="#C8A65A"
          strokeWidth="1.5"
        />
        <path
          d="M 0 -78 L 58 -53 v 47 c 0 42 -24 71 -58 85 C -34 122 -58 93 -58 51 v -47 z"
          fill="none"
          stroke="#C8A65A"
          strokeOpacity="0.32"
          strokeWidth="0.7"
          strokeDasharray="3 5"
        />

        <circle cx="0" cy="-18" r="24" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="0" cy="-18" r="16" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="0.7" strokeDasharray="3 4" />
        <polygon points="0,-30 9,0 0,6 -9,0" fill="#C8A65A" fillOpacity="0.75" />
        <path d="M -44 -54 q 22 10 44 0 M -44 -30 q 22 10 44 0" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
        <path d="M -44 16 q 22 10 44 0 M -44 42 q 22 10 44 0" stroke="#C8A65A" strokeOpacity="0.28" strokeWidth="0.8" fill="none" />
      </g>

      {/* Check badge */}
      <g transform="translate(260, 210)">
        <circle cx="0" cy="64" r="15" fill="#C8A65A" fillOpacity="0.18" stroke="#C8A65A" strokeOpacity="0.6" strokeWidth="1" />
        <path d="M -6 64 l 4 5 l 9 -10" stroke="#C8A65A" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Side ticks */}
      <g stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.9">
        <path d="M 128 140 h 14 M 128 152 h 22 M 128 164 h 18" strokeLinecap="round" />
        <path d="M 392 140 h -14 M 392 152 h -22 M 392 164 h -18" strokeLinecap="round" />
        <path d="M 128 236 h 14 M 128 248 h 22 M 128 260 h 18" strokeLinecap="round" />
        <path d="M 392 236 h -14 M 392 248 h -22 M 392 260 h -18" strokeLinecap="round" />
      </g>
    </svg>
  );
}
