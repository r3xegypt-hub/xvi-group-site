import { useCallback, useEffect, useRef, useState } from 'react';

export interface VoiceSettings {
  enabled: boolean;
  replies: boolean;
  autoSpeak: boolean;
  mute: boolean;
  langAuto: boolean;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  replies: true,
  autoSpeak: true,
  mute: false,
  langAuto: true,
};

const SETTINGS_KEY = 'xvi-voice-settings';

export function loadVoiceSettings(): VoiceSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_VOICE_SETTINGS };
}

export function useTTS(lang: string) {
  const [settings, setSettings] = useState<VoiceSettings>(loadVoiceSettings);
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const ttsAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

  useEffect(() => {
    if (!ttsAvailable()) return;
    setSupported(true);
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoicesReady(v.length > 0);
    };
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);

  const stop = useCallback(() => {
    if (!ttsAvailable()) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string, opts?: { lang?: string }) => {
    if (!ttsAvailable() || !text) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts?.lang || lang;
    u.rate = 1;
    u.pitch = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    return true;
  }, [lang]);

  const update = useCallback((patch: Partial<VoiceSettings>) => {
    setSettings((s) => {
      const next = { ...s, ...patch };
      if (patch.mute) stop();
      return next;
    });
  }, [stop]);

  const shouldSpeakReplies = () => settings.enabled && settings.replies && !settings.mute && supported;

  return { supported, speaking, voicesReady, settings, speak, stop, update, shouldSpeakReplies };
}
