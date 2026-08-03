interface DecisionArchitectureProps {
  className?: string;
}

export function DecisionArchitecture({ className }: DecisionArchitectureProps) {
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
        <linearGradient id="daLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#D4B76E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="daCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
        <pattern id="daDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#3F4348" fillOpacity="0.06" />
        </pattern>
      </defs>

      <rect x="24" y="24" width="472" height="372" fill="url(#daDots)" />

      <rect x="30" y="30" width="460" height="360" rx="4" stroke="#C8A65A" strokeOpacity="0.14" strokeWidth="0.8" />
      <rect x="40" y="40" width="440" height="340" rx="4" stroke="#C8A65A" strokeOpacity="0.09" strokeWidth="0.6" />

      <circle cx="260" cy="210" r="150" fill="url(#daCore)" />
      <circle cx="260" cy="210" r="150" stroke="#C8A65A" strokeOpacity="0.16" strokeWidth="0.7" strokeDasharray="2 6" />
      <circle cx="260" cy="210" r="112" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.6" />

      <g stroke="url(#daLine)" strokeWidth="0.9">
        <line x1="260" y1="210" x2="260" y2="66" />
        <line x1="260" y1="210" x2="388" y2="112" />
        <line x1="260" y1="210" x2="450" y2="210" />
        <line x1="260" y1="210" x2="388" y2="308" />
        <line x1="260" y1="210" x2="260" y2="354" />
        <line x1="260" y1="210" x2="132" y2="308" />
        <line x1="260" y1="210" x2="70" y2="210" />
        <line x1="260" y1="210" x2="132" y2="112" />
      </g>

      <g>
        <circle cx="260" cy="66" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="388" cy="112" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="450" cy="210" r="6" fill="#C8A65A" fillOpacity="0.9" />
        <circle cx="388" cy="308" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="260" cy="354" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="132" cy="308" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="70" cy="210" r="6" fill="#C8A65A" fillOpacity="0.9" />
        <circle cx="132" cy="112" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
      </g>

      <g fill="#C8A65A" fillOpacity="0.4">
        <circle cx="110" cy="160" r="2.2" />
        <circle cx="410" cy="160" r="2.2" />
        <circle cx="410" cy="260" r="2.2" />
        <circle cx="110" cy="260" r="2.2" />
      </g>

      <g transform="translate(260, 210)">
        <circle cx="0" cy="0" r="46" stroke="#C8A65A" strokeWidth="1.4" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="0" cy="0" r="38" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="3 5" />
        <polygon points="0,-14 12,0 0,14 -12,0" fill="none" stroke="#C8A65A" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="#A98533" />
      </g>

      <g stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="0.9" fill="none">
        <polygon points="60,160 70,172 60,184 50,172" />
        <polygon points="460,236 450,248 460,260 470,248" />
      </g>
    </svg>
  );
}
