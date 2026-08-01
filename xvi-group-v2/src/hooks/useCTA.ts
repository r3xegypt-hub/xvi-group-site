import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { playSound } from '../motion/audio/soundEngine';

let aiDockAvailable = true;

export function signalAIDockAvailable(v: boolean) {
  aiDockAvailable = v;
}

// DEV-only hook so e2e tests can simulate "dock unavailable" (Vite appends an
// HMR query to module URLs, so dynamic imports from tests are separate instances).
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__xviSetAIDockAvailable = (v: boolean) => {
    aiDockAvailable = v;
  };
}

export function useCTA() {
  const navigate = useNavigate();

  const handleCTA = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    playSound('ctaClick');

    if (aiDockAvailable) {
      window.dispatchEvent(new CustomEvent('xvi:open-ai-dock'));
    } else {
      navigate('/contact');
    }
  }, [navigate]);

  return handleCTA;
}
