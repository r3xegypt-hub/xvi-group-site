import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

type CinematicIntroProps = {
  onFinish: () => void
}

type IntroPhase = 'boot' | 'matrix' | 'draw' | 'ignite' | 'manifest' | 'settle' | 'exit'

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 1.67) % 100}%`,
  top: `${8 + ((i * 3.1) % 84)}%`,
  size: 1 + (i % 5) * 0.8,
  delay: (i * 0.07) % 3,
  dur: 3 + (i % 6) * 0.6,
  opacity: 0.15 + (i % 6) * 0.08,
}))

const CONSTELLATION_LINES = Array.from({ length: 14 }, (_, i) => {
  const x1 = 10 + ((i * 37) % 80)
  const y1 = 15 + ((i * 53) % 70)
  const x2 = 10 + ((i * 71 + 13) % 80)
  const y2 = 15 + ((i * 29 + 31) % 70)
  return { id: i, x1, y1, x2, y2, delay: i * 0.06, dur: 1.2 + (i % 5) * 0.2 }
})

const BOOT_MESSAGES = [
  { text: 'INITIALIZING XVI SYSTEM', code: 'SYS-001' },
  { text: 'LOADING EXECUTIVE CORE', code: 'COR-002' },
  { text: 'QUANTUM AI ENGINE ONLINE', code: 'AIE-003' },
  { text: 'STRATEGY MATRIX CALIBRATED', code: 'STR-004' },
  { text: 'NETWORK NODES SYNCHRONIZED', code: 'NET-005' },
]

export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<IntroPhase>('boot')
  const [progress, setProgress] = useState(0)
  const [bootIndex, setBootIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const timings = useMemo(() => {
    if (reducedMotion) return { boot: 80, matrix: 80, draw: 80, ignite: 80, manifest: 80, settle: 80, exit: 80 }
    return {
      boot: 700,
      matrix: 500,
      draw: 1400,
      ignite: 500,
      manifest: 900,
      settle: 800,
      exit: 500,
    }
  }, [reducedMotion])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    previouslyFocused.current = document.activeElement as HTMLElement
    const total = Object.values(timings).reduce((a, b) => a + b, 0)
    const phases: IntroPhase[] = ['boot', 'matrix', 'draw', 'ignite', 'manifest', 'settle', 'exit']
    const timeouts: number[] = []

    phases.forEach((p, i) => {
      const delay = phases.slice(0, i).reduce((sum, ph) => sum + timings[ph], 0)
      timeouts.push(window.setTimeout(() => setPhase(p), delay))
    })

    timeouts.push(window.setTimeout(() => onFinish(), total))

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      setProgress(Math.min(100, Math.round(((now - start) / total) * 100)))
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)

    requestAnimationFrame(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length) focusable[0].focus()
    })

    if (!reducedMotion) {
      const msgInterval = window.setInterval(() => {
        setBootIndex((i) => Math.min(i + 1, BOOT_MESSAGES.length - 1))
      }, Math.floor((timings.boot + timings.matrix + timings.draw * 0.4) / BOOT_MESSAGES.length))
      timeouts.push(msgInterval)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onFinish(); return }
      if (e.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        if (!focusable.length) return
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      timeouts.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus()
    }
  }, [onFinish, timings, reducedMotion])

  const isBooting = phase === 'boot' || phase === 'matrix'
  const isDrawing = phase === 'boot' || phase === 'matrix' || phase === 'draw'
  const showManifest = phase === 'manifest' || phase === 'settle' || phase === 'exit'

  return (
    <motion.div
      ref={dialogRef}
      className="xvi-intro-v2"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-label="XVI Brand Reveal"
      aria-modal="true"
    >
      {/* Deep cinematic background */}
      <div className="xvi-intro-v2-bg" />

      {/* Cinematic letterbox bars */}
      <div className="xvi-intro-v2-letterbox xvi-intro-v2-letterbox--top" aria-hidden="true" />
      <div className="xvi-intro-v2-letterbox xvi-intro-v2-letterbox--bottom" aria-hidden="true" />

      {/* Animated nebula layers */}
      <motion.div
        className="xvi-intro-v2-nebula xvi-intro-v2-nebula--a"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="xvi-intro-v2-nebula xvi-intro-v2-nebula--b"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Grid with parallax */}
      <motion.div
        className="xvi-intro-v2-grid"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Constellation lines connecting nodes */}
      <svg
        className="xvi-intro-v2-constellation"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CONSTELLATION_LINES.map((line) => (
          <motion.line
            key={line.id}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="rgba(201,169,110,0.35)"
            strokeWidth="0.08"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isDrawing ? { pathLength: 1, opacity: [0, 0.8, 0.35] } : { opacity: 0.25 }}
            transition={{ delay: 0.4 + line.delay, duration: line.dur, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* Ambient floating particles */}
      <div className="xvi-intro-v2-particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="xvi-intro-v2-particle"
            style={{
              left: p.left, top: p.top, width: p.size, height: p.size,
            }}
            animate={{
              y: [0, -18, 0], x: [0, (p.id % 3 - 1) * 8, 0],
              opacity: [0, p.opacity, 0],
              scale: [0.8, 1.1, 0.9],
            }}
            transition={{
              duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Concentric energy rings */}
      <AnimatePresence>
        {phase !== 'boot' && (
          <>
            <motion.div
              className="xvi-intro-v2-ring xvi-intro-v2-ring--outer"
              initial={{ scale: 0.4, opacity: 0, borderWidth: 0 }}
              animate={{
                scale: [0.4, 1.05, 1],
                opacity: [0, 0.6, 0.35],
                borderWidth: [0, 1, 1],
              }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            <motion.div
              className="xvi-intro-v2-ring xvi-intro-v2-ring--mid"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: [0.3, 0.88, 0.84],
                opacity: [0, 0.5, 0.28],
              }}
              transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            <motion.div
              className="xvi-intro-v2-ring xvi-intro-v2-ring--inner"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: [0.2, 0.68, 0.64],
                opacity: [0, 0.55, 0.32],
              }}
              transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>

      {/* Radial energy burst on ignite */}
      <AnimatePresence>
        {phase === 'ignite' && (
          <motion.div
            className="xvi-intro-v2-burst"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Horizontal scan line sweep */}
      <motion.div
        className="xvi-intro-v2-scan"
        aria-hidden="true"
        initial={{ y: '-10%', opacity: 0 }}
        animate={{
          y: ['-10%', '110%', '-10%'],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2.8, delay: 0.2, repeat: Infinity, ease: 'linear',
        }}
      />

      {/* Corner brackets — cinematic frame */}
      <div className="xvi-intro-v2-brackets" aria-hidden="true">
        <span className="xvi-intro-v2-bracket xvi-intro-v2-bracket--tl" />
        <span className="xvi-intro-v2-bracket xvi-intro-v2-bracket--tr" />
        <span className="xvi-intro-v2-bracket xvi-intro-v2-bracket--bl" />
        <span className="xvi-intro-v2-bracket xvi-intro-v2-bracket--br" />
      </div>

      {/* Boot sequence messages — top left */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            className="xvi-intro-v2-bootlog"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4 }}
          >
            {BOOT_MESSAGES.slice(0, bootIndex + 1).map((msg) => (
              <motion.div
                key={msg.code}
                className="xvi-intro-v2-bootline"
                initial={{ opacity: 0, y: 4, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.35 }}
              >
                <span className="xvi-intro-v2-bootcode">{msg.code}</span>
                <span className="xvi-intro-v2-boottext">{msg.text}</span>
                <span className="xvi-intro-v2-bootok">✓</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top right status */}
      <motion.div
        className="xvi-intro-v2-status"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="xvi-intro-v2-live">
          <i />
          LIVE · AL AIN · UAE
        </span>
        <span className="xvi-intro-v2-session">SESSION #XVI-2026</span>
      </motion.div>

      {/* Center: XVI Logo reveal */}
      <div className="xvi-intro-v2-center">
        <motion.div
          className="xvi-intro-v2-logo-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Multi-layer pulse behind logo */}
          {phase !== 'boot' && (
            <>
              <motion.div
                className="xvi-intro-v2-pulse xvi-intro-v2-pulse--a"
                aria-hidden="true"
                animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.12, 0.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="xvi-intro-v2-pulse xvi-intro-v2-pulse--b"
                aria-hidden="true"
                animate={{ scale: [1, 1.4, 1], opacity: [0.22, 0.06, 0.22] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
              <motion.div
                className="xvi-intro-v2-pulse xvi-intro-v2-pulse--c"
                aria-hidden="true"
                animate={{ scale: [1, 1.6, 1], opacity: [0.14, 0.03, 0.14] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />
            </>
          )}

          {/* XVI SVG — architectural stroke reveal with layers */}
          <svg viewBox="0 0 220 220" className="xvi-intro-v2-logo" aria-hidden="true">
            <defs>
              <linearGradient id="v2-gold-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B6914" stopOpacity="0" />
                <stop offset="28%" stopColor="#F0E2B8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFBF0" stopOpacity="1" />
                <stop offset="72%" stopColor="#E6D196" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v2-stroke-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F2E4BD" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
              <linearGradient id="v2-stroke-soft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8B6914" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="v2-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.38" />
                <stop offset="55%" stopColor="#C9A96E" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
              </radialGradient>
              <filter id="v2-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3.5" result="b1" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="v2-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.8" />
              </filter>
            </defs>

            {/* Core radial glow behind strokes */}
            <motion.circle
              cx="110" cy="110" r="72"
              fill="url(#v2-core-glow)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={phase !== 'boot' ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Hexagonal outer seal */}
            <motion.polygon
              points="110,24 184,67 184,153 110,196 36,153 36,67"
              fill="none"
              stroke="url(#v2-stroke-soft)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              initial={{ pathLength: 0, opacity: 0, rotate: -30 }}
              animate={phase !== 'boot' ? { pathLength: 1, opacity: 0.6, rotate: 0 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Inner hexagon — solid */}
            <motion.polygon
              points="110,36 172,72 172,148 110,184 48,148 48,72"
              fill="none"
              stroke="url(#v2-stroke-gold)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase !== 'boot' ? { pathLength: 1, opacity: 0.8 } : {}}
              transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Main XVI monogram — stroke drawn */}
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="miter"
              filter="url(#v2-glow-strong)"
            >
              {/* X — left diagonal */}
              <motion.path
                d="M 50,60 L 86,110"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="6.5"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* X — right diagonal */}
              <motion.path
                d="M 86,60 L 50,110"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="6.5"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* V — left arm */}
              <motion.path
                d="M 92,60 L 110,142"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="6.5"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* V — right arm */}
              <motion.path
                d="M 128,60 L 110,142"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="6.5"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* I — top serif */}
              <motion.line
                x1="144" y1="60" x2="168" y2="60"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="5"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* I — vertical stem */}
              <motion.line
                x1="156" y1="60" x2="156" y2="142"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="6.5"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.85, delay: 1.06, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* I — bottom serif */}
              <motion.line
                x1="144" y1="142" x2="168" y2="142"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="5"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200, opacity: 0.25 }}
                animate={isDrawing ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.55, delay: 1.18, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>

            {/* Central junction diamond */}
            <motion.g
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={phase !== 'draw' && phase !== 'boot' && phase !== 'matrix'
                ? { scale: 1, opacity: 1, rotate: 0 }
                : {}}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              style={{ transformOrigin: '110px 110px' }}
            >
              <polygon points="110,100 120,110 110,120 100,110" fill="url(#v2-stroke-gold)" />
              <polygon points="110,104 116,110 110,116 104,110" fill="#FFFBF0" opacity="0.9" />
            </motion.g>

            {/* Traveling gold highlight sweep — on manifest */}
            <AnimatePresence>
              {showManifest && (
                <motion.rect
                  x="-40" y="0" width="60" height="220"
                  fill="url(#v2-gold-shimmer)"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{
                    x: [-40, 260, -40],
                    opacity: [0, 0.95, 0.95, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: 0.15,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Corner ticks */}
            <g opacity="0.55">
              <motion.line x1="30" y1="30" x2="42" y2="30" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.line x1="30" y1="30" x2="30" y2="42" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.line x1="190" y1="30" x2="178" y2="30" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.35 }} />
              <motion.line x1="190" y1="30" x2="190" y2="42" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.35 }} />
              <motion.line x1="30" y1="190" x2="42" y2="190" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 }} />
              <motion.line x1="30" y1="190" x2="30" y2="178" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 }} />
              <motion.line x1="190" y1="190" x2="178" y2="190" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.45 }} />
              <motion.line x1="190" y1="190" x2="190" y2="178" stroke="url(#v2-stroke-soft)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.45 }} />
            </g>
          </svg>

          {/* Brand wordmark — XVI GROUP */}
          <motion.div
            className="xvi-intro-v2-brand"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={showManifest ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="xvi-intro-v2-brand-main">XVI GROUP</span>
          </motion.div>

          {/* Animated gold divider */}
          <motion.div
            className="xvi-intro-v2-divider"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={showManifest ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="xvi-intro-v2-divider-dot" />
          </motion.div>

          {/* Arabic manifesto line */}
          <AnimatePresence>
            {showManifest && (
              <motion.div
                className="xvi-intro-v2-tagline-ar"
                initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(5px)' }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                حيث يلتقي <b>الذكاء</b> بالرؤية
              </motion.div>
            )}
          </AnimatePresence>

          {/* English tagline */}
          <AnimatePresence>
            {phase === 'settle' || phase === 'exit' ? (
              <motion.div
                className="xvi-intro-v2-tagline-en"
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                Clarity · Strategy · Execution · AI
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Skip button + progress — bottom */}
      <motion.div
        className="xvi-intro-v2-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="xvi-intro-v2-bottom-left">
          {/* Circular progress indicator */}
          <div className="xvi-intro-v2-ringprogress" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <motion.circle
                cx="24" cy="24" r="21"
                fill="none"
                stroke="url(#v2-stroke-gold)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="132"
                style={{
                  pathLength: progress / 100,
                  rotate: -90,
                  transformOrigin: 'center',
                  stroke: '#D4AF37',
                }}
              />
            </svg>
            <span>{progress}</span>
          </div>
          <div className="xvi-intro-v2-coords">
            <span>24°13′N</span><span className="sep">·</span><span>55°46′E</span>
            <span className="dot">•</span>
            <span>EXECUTIVE MODE</span>
          </div>
        </div>

        <div className="xvi-intro-v2-bottom-right">
          <button type="button" onClick={onFinish} className="xvi-intro-v2-skip">
            تخطي المقدمة
            <span className="xvi-intro-v2-skip-ic">›</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom linear progress bar */}
      <div className="xvi-intro-v2-progress" aria-hidden="true">
        <motion.div
          className="xvi-intro-v2-progress-fill"
          style={{ scaleX: progress / 100, transformOrigin: 'center' }}
        />
        <div className="xvi-intro-v2-progress-glow" />
      </div>

      {/* Exit sweep transition */}
      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="xvi-intro-v2-sweep"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Second sweep — warm reveal */}
      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="xvi-intro-v2-sweep xvi-intro-v2-sweep--warm"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CinematicIntro
