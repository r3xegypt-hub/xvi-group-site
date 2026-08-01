import { useMotion } from '../../motion/providers/MotionProvider';
import { ExecutiveScene } from './ExecutiveScene';
import styles from './ExecutiveBackground.module.scss';

export function ExecutiveBackground() {
  const { prefersReducedMotion } = useMotion();

  return (
    <div className={styles.background} aria-hidden="true">
      <ExecutiveScene
        density={26}
        connectDistance={112}
        maxParticles={110}
        interactive={!prefersReducedMotion}
        className={styles.scene}
      />
      <div className={styles.holoLines} />
      <div className={styles.glowBlob} />
      <div className={styles.glowBlob2} />
      <div className={styles.glowBlob3} />
    </div>
  );
}
