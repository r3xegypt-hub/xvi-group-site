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
        <linearGradient id="edChart" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="edGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="210" r="180" fill="url(#edGlow)" />

      {/* Dashboard card */}
      <g>
        <rect x="52" y="44" width="416" height="332" rx="12" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="1" />
        <rect x="52" y="44" width="416" height="332" rx="12" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="4" />

        {/* Header bar */}
        <rect x="52" y="44" width="416" height="44" rx="12" fill="#C8A65A" fillOpacity="0.07" />
        <circle cx="74" cy="66" r="3.5" fill="#C8A65A" fillOpacity="0.6" />
        <circle cx="88" cy="66" r="3.5" fill="#C8A65A" fillOpacity="0.35" />
        <circle cx="102" cy="66" r="3.5" fill="#C8A65A" fillOpacity="0.2" />
        <rect x="150" y="59" width="120" height="5" rx="2.5" fill="#3F4348" fillOpacity="0.16" />
        <rect x="412" y="60" width="34" height="12" rx="6" fill="#C8A65A" fillOpacity="0.4" />
      </g>

      {/* Line chart */}
      <g>
        <line x1="84" y1="120" x2="320" y2="120" stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="84" y1="158" x2="320" y2="158" stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="84" y1="196" x2="320" y2="196" stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="84" y1="234" x2="320" y2="234" stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="84" y1="272" x2="320" y2="272" stroke="#3F4348" strokeOpacity="0.07" strokeWidth="0.7" />

        <path
          d="M 84 256 L 121 230 L 158 238 L 195 196 L 232 208 L 269 160 L 306 168 L 320 128"
          fill="url(#edChart)"
          stroke="none"
        />
        <path
          d="M 84 256 C 100 244, 112 238, 121 230 C 138 214, 148 246, 158 238 C 172 226, 184 206, 195 196 C 210 184, 220 214, 232 208 C 246 200, 258 174, 269 160 C 286 142, 304 178, 320 128"
          stroke="#C8A65A"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="320" cy="128" r="5" fill="#C8A65A" />
        <circle cx="320" cy="128" r="10" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="1" fill="none" />
        <circle cx="269" cy="160" r="3" fill="#C8A65A" fillOpacity="0.7" />
        <circle cx="195" cy="196" r="3" fill="#C8A65A" fillOpacity="0.5" />
      </g>

      {/* KPI tiles */}
      <g>
        <rect x="342" y="120" width="94" height="46" rx="8" fill="#FFFFFF" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" />
        <rect x="354" y="132" width="22" height="4" rx="2" fill="#3F4348" fillOpacity="0.14" />
        <rect x="354" y="142" width="14" height="4" rx="2" fill="#3F4348" fillOpacity="0.08" />
        <rect x="418" y="130" width="8" height="26" rx="2" fill="#C8A65A" fillOpacity="0.35" />

        <rect x="342" y="178" width="94" height="46" rx="8" fill="#FFFFFF" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" />
        <rect x="354" y="190" width="22" height="4" rx="2" fill="#3F4348" fillOpacity="0.14" />
        <rect x="354" y="200" width="14" height="4" rx="2" fill="#3F4348" fillOpacity="0.08" />
        <rect x="410" y="188" width="16" height="26" rx="2" fill="#C8A65A" fillOpacity="0.5" />

        <rect x="342" y="236" width="94" height="46" rx="8" fill="#FFFFFF" stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" />
        <rect x="354" y="248" width="22" height="4" rx="2" fill="#3F4348" fillOpacity="0.14" />
        <rect x="354" y="258" width="14" height="4" rx="2" fill="#3F4348" fillOpacity="0.08" />
        <rect x="416" y="246" width="10" height="26" rx="2" fill="#C8A65A" fillOpacity="0.7" />
      </g>

      {/* Bottom mini bars */}
      <g>
        <rect x="84" y="308" width="26" height="34" rx="3" fill="#C8A65A" fillOpacity="0.28" />
        <rect x="120" y="318" width="26" height="24" rx="3" fill="#C8A65A" fillOpacity="0.4" />
        <rect x="156" y="300" width="26" height="42" rx="3" fill="#C8A65A" fillOpacity="0.5" />
        <rect x="192" y="312" width="26" height="30" rx="3" fill="#C8A65A" fillOpacity="0.38" />
        <rect x="228" y="296" width="26" height="46" rx="3" fill="#C8A65A" fillOpacity="0.62" />
        <rect x="264" y="320" width="26" height="22" rx="3" fill="#C8A65A" fillOpacity="0.32" />
        <rect x="300" y="304" width="26" height="38" rx="3" fill="#C8A65A" fillOpacity="0.55" />
      </g>
    </svg>
  );
}
