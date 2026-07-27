// XVI GROUP — Scroll Progress Indicator
// Thin gold line at top of viewport showing scroll progress

import { useScrollProgress } from '../../../motion/hooks/useScrollProgress';
import styles from './ScrollProgress.module.scss';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className={styles.bar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
