export function HeroIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ maxWidth: 600, maxHeight: 520 }}>
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A65A" stopOpacity="1" />
          <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="40" y="20" width="520" height="480" rx="4" stroke="#C8A65A" strokeWidth="1" fill="url(#goldGrad)" />
      <line x1="40" y1="80" x2="560" y2="80" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="140" x2="560" y2="140" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="200" x2="560" y2="200" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="260" x2="560" y2="260" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="320" x2="560" y2="320" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="380" x2="560" y2="380" stroke="url(#goldLine)" strokeWidth="0.5" />
      <line x1="40" y1="440" x2="560" y2="440" stroke="url(#goldLine)" strokeWidth="0.5" />
      <circle cx="120" cy="110" r="12" fill="#C8A65A" fillOpacity="0.8" />
      <circle cx="200" cy="170" r="8" fill="#C8A65A" fillOpacity="0.4" />
      <circle cx="480" cy="110" r="10" fill="#C8A65A" fillOpacity="0.6" />
      <circle cx="320" cy="50" r="6" fill="#C8A65A" fillOpacity="0.3" />
      <rect x="100" y="220" width="160" height="1" fill="#C8A65A" fillOpacity="0.5" />
      <rect x="340" y="220" width="80" height="1" fill="#C8A65A" fillOpacity="0.5" />
      <rect x="100" y="340" width="120" height="1" fill="#C8A65A" fillOpacity="0.5" />
      <rect x="380" y="340" width="100" height="1" fill="#C8A65A" fillOpacity="0.5" />
    </svg>
  );
}
