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
  resultIndex?: number;
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

interface StartOptions {
  onInterim?: (text: string) => void;
  onResult?: (text: string) => void;
  onEnd?: (hadResult: boolean) => void;
}

export function useSpeechRecognition(lang: string) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognition | null>(null);
  const hadResultRef = useRef(false);
  const onInterimRef = useRef<((text: string) => void) | null>(null);
  const onResultRef = useRef<((text: string) => void) | null>(null);
  const onEndRef = useRef<((hadResult: boolean) => void) | null>(null);

  useEffect(() => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(Boolean(Ctor));
  }, []);

  const ensureRecognition = useCallback(() => {
    if (recRef.current) return recRef.current;
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return null;
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => { setListening(true); setError(null); };
    rec.onend = () => {
      setListening(false);
      const had = hadResultRef.current;
      hadResultRef.current = false;
      onEndRef.current?.(had);
    };
    rec.onerror = (e) => {
      if (e.error === 'aborted' || e.error === 'no-speech') {
        setListening(false);
        return;
      }
      setListening(false);
      setError(e.error || 'error');
    };
    recRef.current = rec;
    return rec;
  }, []);

  const start = useCallback((opts: StartOptions = {}) => {
    const rec = ensureRecognition();
    if (!rec) return false;
    onInterimRef.current = opts.onInterim ?? null;
    onResultRef.current = opts.onResult ?? null;
    onEndRef.current = opts.onEnd ?? null;
    hadResultRef.current = false;
    rec.lang = lang;
    rec.onresult = (e) => {
      let interim = '';
      let final = '';
      const startIdx = e.resultIndex ?? 0;
      for (let i = startIdx; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r?.[0]?.transcript ?? '';
        if (r.isFinal) final += t;
        else interim += t;
      }
      if (interim && onInterimRef.current) onInterimRef.current(interim.trim());
      if (final && onResultRef.current) {
        hadResultRef.current = true;
        onResultRef.current(final.trim());
        try { rec.stop(); } catch { /* noop */ }
      }
    };
    try {
      rec.start();
      return true;
    } catch {
      setError('start-error');
      return false;
    }
  }, [lang, ensureRecognition]);

  const stop = useCallback(() => {
    setListening(false);
    setError(null);
    try { recRef.current?.stop(); } catch { /* noop */ }
  }, []);

  return { supported, listening, error, start, stop };
}
