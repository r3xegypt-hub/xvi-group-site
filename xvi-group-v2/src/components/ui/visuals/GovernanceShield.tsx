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
        <radialGradient id="gsGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="200" r="165" fill="url(#gsGlow)" />
      <circle cx="260" cy="200" r="163" stroke="#C8A65A" strokeOpacity="0.09" strokeWidth="0.7" strokeDasharray="2 7" />
      <circle cx="260" cy="200" r="122" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.7" strokeDasharray="4 6" />

      {/* Compliance ticks on the ring */}
      <g stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M 260 24 l -4 4 l 7 7" />
        <path d="M 402 98 l -4 4 l 7 7" />
        <path d="M 430 200 l -4 4 l 7 7" />
        <path d="M 402 302 l -4 4 l 7 7" />
        <path d="M 260 376 l -4 4 l 7 7" />
        <path d="M 118 302 l -4 4 l 7 7" />
        <path d="M 90 200 l -4 4 l 7 7" />
        <path d="M 118 98 l -4 4 l 7 7" />
      </g>

      {/* Corner diamonds */}
      <g fill="none" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="0.9">
        <polygon points="52,52 62,62 52,72 42,62" />
        <polygon points="468,52 478,62 468,72 458,62" />
        <polygon points="52,348 62,358 52,368 42,358" />
        <polygon points="468,348 478,358 468,368 458,358" />
      </g>

      {/* Outer decorative arcs */}
      <path d="M 120 200 A 140 140 0 0 1 400 200" stroke="#C8A65A" strokeOpacity="0.16" strokeWidth="0.8" fill="none" />
      <path d="M 400 200 A 140 140 0 0 1 120 200" stroke="#C8A65A" strokeOpacity="0.06" strokeWidth="0.8" fill="none" />

      {/* Shield */}
      <g transform="translate(260, 205)">
        <path
          d="M 0 -86 L 62 -62 L 62 -8 C 62 40, 36 78, 0 96 C -36 78, -62 40, -62 -8 L -62 -62 Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#C8A65A"
          strokeWidth="1.5"
        />
        <path
          d="M 0 -72 L 50 -52 L 50 -8 C 50 32, 28 66, 0 82 C -28 66, -50 32, -50 -8 L -50 -52 Z"
          stroke="#C8A65A"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          fill="none"
        />
        <path
          d="M -30 2 L -10 24 L 34 -24"
          stroke="#C8A65A"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="30" r="4" fill="#A98533" fillOpacity="0.7" />
      </g>
    </svg>
  );
}
