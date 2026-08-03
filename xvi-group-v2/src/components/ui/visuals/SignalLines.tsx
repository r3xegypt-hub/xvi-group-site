interface SignalLinesProps {
  className?: string;
}

export function SignalLines({ className }: SignalLinesProps) {
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
        <linearGradient id="slBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#D4B76E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="slHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="250" cy="210" r="160" fill="url(#slHalo)" />
      <circle cx="250" cy="210" r="150" stroke="#C8A65A" strokeOpacity="0.1" strokeWidth="0.7" strokeDasharray="2 8" />

      {/* Concentric signal arcs */}
      <g stroke="#C8A65A" strokeOpacity="0.28" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M 300 210 a 62 62 0 0 1 62 -62 a 62 62 0 0 1 62 62" />
        <path d="M 300 210 a 104 104 0 0 1 104 -104 a 104 104 0 0 1 104 104" />
        <path d="M 300 210 a 146 146 0 0 1 146 -146 a 146 146 0 0 1 146 146" />
      </g>

      {/* Beams */}
      <g stroke="url(#slBeam)" strokeWidth="1.1" fill="none">
        <line x1="250" y1="210" x2="404" y2="210" />
        <line x1="250" y1="210" x2="354" y2="82" />
        <line x1="250" y1="210" x2="354" y2="338" />
      </g>

      <g fill="#C8A65A">
        <path d="M 398 206 l 0 8 l 8 0 z" />
        <path d="M 348 78 l 0 8 l 8 0 z" transform="rotate(-45 348 82)" />
        <path d="M 348 334 l 0 8 l 8 0 z" transform="rotate(45 348 338)" />
      </g>

      {/* Endpoint nodes */}
      <g>
        <circle cx="404" cy="210" r="8" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="404" cy="210" r="2.8" fill="#A98533" />

        <circle cx="354" cy="82" r="8" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="354" cy="82" r="2.8" fill="#A98533" />

        <circle cx="354" cy="338" r="8" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.3" />
        <circle cx="354" cy="338" r="2.8" fill="#A98533" />
      </g>

      {/* Wave trace */}
      <g stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="0.9" fill="none" strokeLinecap="round">
        <path d="M 88 300 q 10 -9 20 0 t 20 0 t 20 0 t 20 0 t 20 0" />
        <path d="M 88 330 q 10 -9 20 0 t 20 0 t 20 0 t 20 0 t 20 0" />
      </g>

      {/* Source node */}
      <g transform="translate(250, 210)">
        <circle cx="0" cy="0" r="34" stroke="#C8A65A" strokeWidth="1.4" fill="#FFFFFF" fillOpacity="0.92" />
        <circle cx="0" cy="0" r="26" stroke="#C8A65A" strokeOpacity="0.42" strokeWidth="0.8" strokeDasharray="3 5" />
        <path d="M -11 0 h 22 M 0 -11 v 22" stroke="#C8A65A" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="0" cy="0" r="2.6" fill="#A98533" />
      </g>

      {/* Corner ticks */}
      <g stroke="#C8A65A" strokeOpacity="0.35" strokeWidth="0.9" strokeLinecap="round">
        <path d="M 84 56 h 12 M 84 68 h 8 M 414 56 h -12 M 414 68 h -8 M 84 356 h 12 M 84 344 h 8 M 414 356 h -12 M 414 344 h -8" />
      </g>
    </svg>
  );
}
