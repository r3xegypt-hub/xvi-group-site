import { useEffect } from 'react';
import { startAmbient, stopAmbient } from '../audio/soundEngine';

const GESTURES: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];

export function SoundProvider() {
  useEffect(() => {
    let started = false;
    const onGesture = () => {
      if (started) return;
      started = true;
      startAmbient();
    };
    GESTURES.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
    return () => {
      GESTURES.forEach((ev) => window.removeEventListener(ev, onGesture));
      stopAmbient();
    };
  }, []);
  return null;
}
