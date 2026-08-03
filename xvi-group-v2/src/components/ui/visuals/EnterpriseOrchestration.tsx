interface EnterpriseOrchestrationProps {
  className?: string;
}

export function EnterpriseOrchestration({ className }: EnterpriseOrchestrationProps) {
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
        <linearGradient id="eoFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#D4B76E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="eoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="210" r="170" fill="url(#eoGlow)" />
      <circle cx="260" cy="210" r="168" stroke="#C8A65A" strokeOpacity="0.1" strokeWidth="0.7" strokeDasharray="2 8" />
      <circle cx="260" cy="210" r="120" stroke="#C8A65A" strokeOpacity="0.08" strokeWidth="0.6" />

      {/* Input nodes */}
      <g>
        <rect x="56" y="60" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="80" cy="86" r="5" fill="none" stroke="#C8A65A" strokeWidth="1" />
        <rect x="94" y="80" width="30" height="3.5" rx="1.75" fill="#C8A65A" fillOpacity="0.4" />
        <rect x="94" y="89" width="20" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />

        <rect x="56" y="184" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="80" cy="210" r="5" fill="none" stroke="#C8A65A" strokeWidth="1" />
        <rect x="94" y="204" width="34" height="3.5" rx="1.75" fill="#C8A65A" fillOpacity="0.4" />
        <rect x="94" y="213" width="22" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />

        <rect x="56" y="308" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="80" cy="334" r="5" fill="none" stroke="#C8A65A" strokeWidth="1" />
        <rect x="94" y="328" width="26" height="3.5" rx="1.75" fill="#C8A65A" fillOpacity="0.4" />
        <rect x="94" y="337" width="18" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />
      </g>

      {/* Outcome nodes */}
      <g>
        <rect x="376" y="60" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="400" cy="86" r="5" fill="#C8A65A" fillOpacity="0.8" />
        <rect x="414" y="80" width="30" height="3.5" rx="1.75" fill="#3F4348" fillOpacity="0.35" />
        <rect x="414" y="89" width="20" height="3" rx="1.5" fill="#3F4348" fillOpacity="0.2" />

        <rect x="376" y="184" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="400" cy="210" r="5" fill="#C8A65A" fillOpacity="0.8" />
        <rect x="414" y="204" width="34" height="3.5" rx="1.75" fill="#3F4348" fillOpacity="0.35" />
        <rect x="414" y="213" width="22" height="3" rx="1.5" fill="#3F4348" fillOpacity="0.2" />

        <rect x="376" y="308" width="88" height="52" rx="8" fill="#FFFFFF" fillOpacity="0.8" stroke="#C8A65A" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="400" cy="334" r="5" fill="#C8A65A" fillOpacity="0.8" />
        <rect x="414" y="328" width="26" height="3.5" rx="1.75" fill="#3F4348" fillOpacity="0.35" />
        <rect x="414" y="337" width="18" height="3" rx="1.5" fill="#3F4348" fillOpacity="0.2" />
      </g>

      {/* Flow connectors */}
      <g stroke="url(#eoFlow)" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M 144 86 C 186 86, 190 210, 200 210" />
        <path d="M 144 210 C 184 210, 188 210, 200 210" />
        <path d="M 144 334 C 186 334, 190 210, 200 210" />
        <path d="M 320 210 C 332 210, 336 210, 376 210" />
        <path d="M 320 210 C 330 86, 336 86, 376 86" />
        <path d="M 320 210 C 330 334, 336 334, 376 334" />
      </g>

      <g fill="#C8A65A">
        <path d="M 200 206 l 0 8 l 8 0 z" />
        <path d="M 320 206 l 0 8 l 8 0 z" transform="rotate(180 320 210)" />
      </g>

      {/* Orchestration core */}
      <g transform="translate(260, 210)">
        <rect x="-70" y="-48" width="140" height="96" rx="14" fill="#FFFFFF" fillOpacity="0.92" stroke="#C8A65A" strokeWidth="1.4" />
        <rect x="-62" y="-40" width="124" height="80" rx="9" stroke="#C8A65A" strokeOpacity="0.32" strokeWidth="0.7" strokeDasharray="3 5" />
        <circle cx="-26" cy="-16" r="5" fill="none" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="4" cy="-16" r="5" fill="none" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="-26" cy="14" r="5" fill="none" stroke="#C8A65A" strokeWidth="1.1" />
        <circle cx="4" cy="14" r="5" fill="#C8A65A" fillOpacity="0.85" />
        <rect x="28" y="-20" width="26" height="3.5" rx="1.75" fill="#C8A65A" fillOpacity="0.4" />
        <rect x="28" y="-12" width="18" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />
        <rect x="28" y="12" width="24" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.3" />
      </g>
    </svg>
  );
}
