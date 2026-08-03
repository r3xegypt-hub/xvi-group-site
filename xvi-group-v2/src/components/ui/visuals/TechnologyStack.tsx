interface TechnologyStackProps {
  className?: string;
}

export function TechnologyStack({ className }: TechnologyStackProps) {
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
        <linearGradient id="tsSpine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#D4B76E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="tsLayer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#C8A65A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="tsHalo" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
        </radialGradient>
        <pattern id="tsDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#3F4348" fillOpacity="0.05" />
        </pattern>
      </defs>

      <circle cx="260" cy="200" r="158" fill="url(#tsHalo)" />
      <rect x="34" y="34" width="452" height="352" fill="url(#tsDots)" />
      <rect x="42" y="42" width="436" height="336" rx="4" stroke="#C8A65A" strokeOpacity="0.12" strokeWidth="0.8" />

      {/* Layers (top to bottom) */}
      <g>
        <rect x="146" y="86" width="228" height="40" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.1" />
        <rect x="146" y="86" width="228" height="40" rx="10" fill="url(#tsLayer)" />
        <circle cx="176" cy="106" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <rect x="192" y="100" width="70" height="4" rx="2" fill="#C8A65A" fillOpacity="0.45" />
        <rect x="192" y="109" width="46" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />

        <rect x="120" y="154" width="280" height="40" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.1" />
        <circle cx="150" cy="174" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <rect x="166" y="168" width="96" height="4" rx="2" fill="#C8A65A" fillOpacity="0.45" />
        <rect x="166" y="177" width="60" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />
        <circle cx="378" cy="174" r="4" fill="#C8A65A" fillOpacity="0.55" />

        <rect x="94" y="222" width="332" height="40" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.1" />
        <circle cx="124" cy="242" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <rect x="140" y="236" width="120" height="4" rx="2" fill="#C8A65A" fillOpacity="0.45" />
        <rect x="140" y="245" width="72" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />
        <circle cx="404" cy="242" r="4" fill="#C8A65A" fillOpacity="0.55" />

        <rect x="68" y="290" width="384" height="40" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke="#C8A65A" strokeOpacity="0.5" strokeWidth="1.1" />
        <circle cx="98" cy="310" r="5" fill="#FFFFFF" stroke="#C8A65A" strokeWidth="1.1" />
        <rect x="114" y="304" width="150" height="4" rx="2" fill="#C8A65A" fillOpacity="0.45" />
        <rect x="114" y="313" width="92" height="3" rx="1.5" fill="#C8A65A" fillOpacity="0.22" />
        <circle cx="430" cy="310" r="4" fill="#C8A65A" fillOpacity="0.55" />
      </g>

      {/* Spine connector */}
      <line x1="176" y1="126" x2="150" y2="154" stroke="url(#tsSpine)" strokeWidth="1" />
      <line x1="150" y1="194" x2="124" y2="222" stroke="url(#tsSpine)" strokeWidth="1" />
      <line x1="124" y1="262" x2="98" y2="290" stroke="url(#tsSpine)" strokeWidth="1" />

      {/* Side rails */}
      <path d="M 48 106 h 20 M 48 174 h 14 M 48 242 h 20 M 48 310 h 14" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M 472 106 h -20 M 472 174 h -14 M 472 242 h -20 M 472 310 h -14" stroke="#C8A65A" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />

      {/* Top accent */}
      <circle cx="260" cy="62" r="4" fill="#C8A65A" fillOpacity="0.55" />
      <line x1="260" y1="66" x2="260" y2="86" stroke="url(#tsSpine)" strokeWidth="1" />
    </svg>
  );
}
