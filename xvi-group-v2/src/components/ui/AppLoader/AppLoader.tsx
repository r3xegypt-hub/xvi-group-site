import { useEffect, useState } from 'react';
import { LoaderLogo } from '../Logo';
import styles from './AppLoader.module.scss';

interface AppLoaderProps {
  onComplete: () => void;
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('visible'), 50);
    const minDisplay = 900;

    const finish = () => {
      setPhase('exit');
      setTimeout(onComplete, 600);
    };

    const start = performance.now();
    const onLoad = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minDisplay - elapsed);
      setTimeout(finish, remaining);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    const fallback = setTimeout(finish, 2800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fallback);
      window.removeEventListener('load', onLoad);
    };
  }, [onComplete]);

  return (
    <div
      className={`${styles.loader} ${styles[phase]}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <LoaderLogo size={56} />
          <div className={styles.logoRing} aria-hidden="true" />
        </div>
        <div className={styles.wordmark}>
          <span className={styles.primary}>XVI</span>
          <span className={styles.secondary}>GROUP</span>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}
