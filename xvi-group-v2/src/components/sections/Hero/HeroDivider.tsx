// XVI GROUP — Hero Divider
// Premium animated SVG divider with gold diamond motif

import { useRef, useState, useEffect } from 'react';
import styles from './HeroDivider.module.scss';

export function HeroDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.divider} ${visible ? styles.visible : ''}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 1200 48" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Left line */}
        <line
          x1="0" y1="24" x2="560" y2="24"
          stroke="#C9A96E" strokeWidth="0.8" opacity="0.3"
          className={styles.lineLeft}
        />

        {/* Center diamond */}
        <path
          d="M600 12 L612 24 L600 36 L588 24 Z"
          stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"
          className={styles.diamond}
        />
        <path
          d="M600 17 L607 24 L600 31 L593 24 Z"
          fill="#C9A96E" opacity="0.15"
          className={styles.diamondFill}
        />

        {/* Right line */}
        <line
          x1="640" y1="24" x2="1200" y2="24"
          stroke="#C9A96E" strokeWidth="0.8" opacity="0.3"
          className={styles.lineRight}
        />
      </svg>
    </div>
  );
}
