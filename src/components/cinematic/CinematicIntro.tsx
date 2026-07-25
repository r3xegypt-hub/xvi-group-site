import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

type CinematicIntroProps = {
  onFinish: () => void
}

type IntroPhase = 'draw' | 'highlight' | 'settle' | 'exit'

/**
 * Premium tubular wordmark reveal — 2 seconds.
 * Bronze tubes draw themselves. Highlight travels. Perfect stillness.
 */
export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<IntroPhase>('draw')
  const [progress, setProgress] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const timings = useMemo(() => {
    if (reducedMotion) return { draw: 60, highlight: 60, settle: 60, exit: 60 }
    return { draw: 900, highlight: 600, settle: 300, exit: 300 }
  }, [reducedMotion])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    previouslyFocused.current = document.activeElement as HTMLElement
    const total = Object.values(timings).reduce((a, b) => a + b, 0)
    const phases: IntroPhase[] = ['draw', 'highlight', 'settle', 'exit']
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

    // Focus first focusable element on mount
    requestAnimationFrame(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length) focusable[0].focus()
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onFinish()
        return
      }

      // Trap Tab within dialog
      if (e.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      timeouts.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      // Return focus to previously focused element
      previouslyFocused.current?.focus()
    }
  }, [onFinish, timings])

  const pathLength = 600

  return (
    <motion.div
      ref={dialogRef}
      className="xvi-intro"
      exit={{ opacity: 0 }}
      transition={{ duration: .4, ease: [.16, 1, .3, 1] }}
      role="dialog"
      aria-label="XVI Brand Reveal"
      aria-modal="true"
    >
      <div className="xvi-intro-bg" />

      <motion.div
        className="xvi-intro-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: .15 }}
        transition={{ duration: 1 }}
      />

      <div className="xvi-intro-center">
        <motion.div
          className="xvi-intro-logo-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .3 }}
        >
          <svg viewBox="0 0 200 200" className="xvi-intro-logo">
            <defs>
              <linearGradient id="tube-highlight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c9a96e" stopOpacity="0"/>
                <stop offset="40%" stopColor="#e8d5a8" stopOpacity="0.6"/>
                <stop offset="50%" stopColor="#f0e6cc" stopOpacity="0.8"/>
                <stop offset="60%" stopColor="#e8d5a8" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#c9a96e" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* XVI Monogram — architectural stroke animation */}
            <g fill="none" stroke="#c9a96e" strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter">
              {/* V — left arm */}
              <motion.path
                d="M 46,16 L 100,162"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: .8, delay: .1, ease: [.16, 1, .3, 1] }}
              />
              {/* V — right arm */}
              <motion.path
                d="M 154,16 L 100,162"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: .8, delay: .2, ease: [.16, 1, .3, 1] }}
              />
              {/* X — upper left arm */}
              <motion.path
                d="M 8,16 L 58,88"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: .6, delay: .35, ease: [.16, 1, .3, 1] }}
              />
              {/* X — lower left arm */}
              <motion.path
                d="M 58,88 L 8,162"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: .6, delay: .45, ease: [.16, 1, .3, 1] }}
              />
              {/* I — vertical bar */}
              <motion.path
                d="M 178,16 L 178,184"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: .6, delay: .55, ease: [.16, 1, .3, 1] }}
              />
            </g>

            {/* Traveling highlight — appears after draw */}
            {phase === 'highlight' && (
              <motion.rect
                x="0" y="0" width="40" height="200"
                fill="url(#tube-highlight)"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 200, opacity: [.7, 0] }}
                transition={{ duration: .6, ease: [.16, 1, .3, 1] }}
              />
            )}
          </svg>

          {/* Brand name */}
          <motion.div
            className="xvi-intro-brand"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .7, ease: [.16, 1, .3, 1] }}
          >
            XVI GROUP
          </motion.div>

          {/* Slogan */}
          <AnimatePresence>
            {phase === 'settle' && (
              <motion.div
                className="xvi-intro-slogan"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .4, ease: [.16, 1, .3, 1] }}
              >
                Intelligence in Motion
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="xvi-intro-skip">
        <button type="button" onClick={onFinish} className="xvi-intro-skip-btn">Skip</button>
        <span className="xvi-intro-progress">{progress}%</span>
      </div>

      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="xvi-intro-sweep"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: .4, ease: [.16, 1, .3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
