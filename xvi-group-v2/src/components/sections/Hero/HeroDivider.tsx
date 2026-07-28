// XVI GROUP — Hero Divider
// Animated signal divider

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

        <path d="M560 24H588C594 24 596 17 602 17H612C618 17 620 24 626 24H640" stroke="#C89B5A" strokeWidth="1" fill="none" opacity=".7" className={styles.signal} />
        <circle cx="602" cy="17" r="3" fill="#C89B5A" opacity=".8" className={styles.signalNode} />

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
