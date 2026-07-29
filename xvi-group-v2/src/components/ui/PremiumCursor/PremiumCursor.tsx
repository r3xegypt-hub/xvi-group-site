// XVI GROUP — Premium Cursor (Sprint 03)

import { useEffect, useRef } from 'react';
import { cursorEngine } from '../../../motion/engines/CursorEngine';
import styles from './PremiumCursor.module.scss';

export function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;
    cursorEngine.init(dotRef.current, ringRef.current);
    return () => cursorEngine.destroy();
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
