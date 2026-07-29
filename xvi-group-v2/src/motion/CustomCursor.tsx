import { useEffect, useRef } from 'react';
import { cursorEngine } from './engines/CursorEngine';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current && ringRef.current) {
      cursorEngine.init(cursorRef.current, ringRef.current);
    }
    return () => cursorEngine.destroy();
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="premium-cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="premium-cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
