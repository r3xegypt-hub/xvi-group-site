// XVI GROUP — Ambient Motion (Sprint 03)
// Subtle floating background orbs

import { useParallax } from '../../../motion/hooks/useParallax';
import styles from './AmbientMotion.module.scss';

export function AmbientMotion() {
  const orb1 = useParallax({ speed: 0.06, offset: 0 });
  const orb2 = useParallax({ speed: -0.04, offset: 0 });
  const orb3 = useParallax({ speed: 0.03, offset: 0 });

  return (
    <div className={styles.ambient} aria-hidden="true">
      <div ref={orb1} className={`${styles.orb} ${styles.orb1}`} />
      <div ref={orb2} className={`${styles.orb} ${styles.orb2}`} />
      <div ref={orb3} className={`${styles.orb} ${styles.orb3}`} />
      <div className={styles.grid} />
    </div>
  );
}
