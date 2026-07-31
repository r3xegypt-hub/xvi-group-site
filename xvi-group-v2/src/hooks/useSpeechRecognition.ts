import { useEffect, useRef, useState, useCallback } from 'react';

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionCtor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

export function useSpeechRecognition(lang: string) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return;
    setSupported(true);
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => { setListening(true); setError(null); };
    rec.onend = () => setListening(false);
    rec.onerror = (e) => { setListening(false); setError(e.error || 'error'); };
    recRef.current = rec;
    return () => {
      try { rec.abort(); } catch { /* noop */ }
      recRef.current = null;
    };
  }, []);

  const start = useCallback((onResult: (text: string) => void) => {
    const rec = recRef.current;
    if (!rec) return;
    rec.lang = lang;
    rec.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript ?? '';
      if (text.trim()) onResult(text.trim());
      try { rec.stop(); } catch { /* noop */ }
    };
    try { rec.start(); } catch { /* noop */ }
  }, [lang]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch { /* noop */ }
    setListening(false);
  }, []);

  return { supported, listening, error, start, stop };
}
