import styles from './HeroRobot.module.scss';

export function HeroRobot() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.orbit}>
        <span className={styles.orbitArc} />
      </div>
      <div className={styles.drone}>
        <div className={styles.body} />
        <svg className={styles.head} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="heroFace" x1="32" y1="10" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#f8f6f1" />
              <stop offset="1" stopColor="#efede6" />
            </linearGradient>
          </defs>
          <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(17,17,17,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="5" r="2.5" fill="#c8a65a" stroke="rgba(17,17,17,0.3)" strokeWidth="0.75" />
          <rect x="8" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
          <rect x="50" y="24" width="6" height="12" rx="3" fill="#ffffff" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
          <path
            d="M20 12 H44 A10 10 0 0 1 54 22 V36 A14 14 0 0 1 40 50 H24 A14 14 0 0 1 10 36 V22 A10 10 0 0 1 20 12 Z"
            stroke="rgba(17,17,17,0.4)"
            strokeWidth="1.5"
            fill="url(#heroFace)"
          />
          <g className={styles.eyes}>
            <rect x="20" y="24" width="8" height="9" rx="3.5" fill="#a8812f" />
            <rect x="36" y="24" width="8" height="9" rx="3.5" fill="#a8812f" />
          </g>
          <path d="M26 40 H38" stroke="rgba(17,17,17,0.35)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.holoBase}>
        <span className={styles.holoRing} />
        <span className={styles.holoRing2} />
        <span className={styles.holoCore} />
      </div>
    </div>
  );
}
