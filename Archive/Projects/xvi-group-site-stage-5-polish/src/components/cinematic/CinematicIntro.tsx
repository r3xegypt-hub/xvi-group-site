import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type CinematicIntroProps = {
  onFinish: () => void
}

type IntroPhase = 'reveal' | 'logo' | 'slogan' | 'exit'

/**
 * Premium cinematic intro — 3 seconds max.
 * Logo is the hero. Emotional, memorable, fast.
 */
export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<IntroPhase>('reveal')
  const [progress, setProgress] = useState(0)

  const timings = useMemo(() => {
    if (reducedMotion) return { reveal: 80, logo: 80, slogan: 80, exit: 60 }
    return { reveal: 400, logo: 800, slogan: 700, exit: 500 }
  }, [reducedMotion])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const total = Object.values(timings).reduce((a, b) => a + b, 0)
    const phases: IntroPhase[] = ['reveal', 'logo', 'slogan', 'exit']
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

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onFinish() }
    window.addEventListener('keydown', onKey)

    return () => {
      timeouts.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onFinish, timings])

  return (
    <motion.div
      className="xvi-intro"
      exit={{ opacity: 0 }}
      transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
      role="dialog"
      aria-label="XVI Brand Reveal"
      aria-modal="true"
    >
      {/* Deep background */}
      <div className="xvi-intro-bg" />

      {/* Subtle grid */}
      <motion.div
        className="xvi-intro-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: .35 }}
        transition={{ duration: 1.5 }}
      />

      {/* Ambient particles — always visible */}
      <div className="xvi-intro-particles">
        {[...Array(16)].map((_, i) => (
          <motion.span
            key={i}
            className="xvi-intro-particle"
            style={{
              left: `${10 + ((i * 5.3) % 80)}%`,
              top: `${12 + ((i * 7.1) % 76)}%`,
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [.15, .45, .15] }}
            transition={{ duration: 2 + (i % 2), delay: i * .05, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Central logo — THE HERO */}
      <div className="xvi-intro-center">
        <motion.div
          className="xvi-intro-logo-wrap"
          initial={{ opacity: 0, scale: .8, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: .8, delay: .15, ease: [.16, 1, .3, 1] }}
        >
          {/* Logo with animated strokes */}
          <svg viewBox="0 0 256 256" className="xvi-intro-logo">
            <defs>
              <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4b87a"/>
                <stop offset="100%" stopColor="#8a6d3a"/>
              </linearGradient>
              <linearGradient id="ix" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5E4AC2"/>
                <stop offset="100%" stopColor="#7A6CFF"/>
              </linearGradient>
            </defs>
            <g transform="translate(36,36)" strokeLinecap="round" strokeLinejoin="round">
              <motion.line x1="16" y1="176" x2="100" y2="52" stroke="url(#ix)" strokeWidth="7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: .5, delay: .2, ease: [.16, 1, .3, 1] }} />
              <motion.line x1="100" y1="176" x2="16" y2="52" stroke="url(#ix)" strokeWidth="7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: .5, delay: .3, ease: [.16, 1, .3, 1] }} />
              <motion.path d="M38 32 L88 148 L138 32" fill="none" stroke="url(#ig)" strokeWidth="7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: .45, delay: .4, ease: [.16, 1, .3, 1] }} />
              <motion.line x1="152" y1="32" x2="152" y2="176" stroke="url(#ig)" strokeWidth="7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: .45, delay: .5, ease: [.16, 1, .3, 1] }} />
              <motion.circle cx="152" cy="22" r="4" fill="#d4b87a"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: .85, scale: 1 }}
                transition={{ duration: .35, delay: .65, ease: [.16, 1, .3, 1] }} />
            </g>
          </svg>

          {/* Pulse ring */}
          <motion.div
            className="xvi-intro-pulse"
            initial={{ opacity: 0, scale: .6 }}
            animate={{ opacity: [.5, 0], scale: [1, 2.2] }}
            transition={{ duration: 1, delay: .7, ease: 'easeOut' }}
          />

          {/* Brand name */}
          <motion.div
            className="xvi-intro-brand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .5, ease: [.16, 1, .3, 1] }}
          >
            XVI GROUP
          </motion.div>

          {/* Slogan — appears in slogan phase */}
          <AnimatePresence>
            {phase === 'slogan' && (
              <motion.div
                className="xvi-intro-slogan"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
              >
                Strategic AI · Enterprise Delivery
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Skip */}
      <div className="xvi-intro-skip">
        <button type="button" onClick={onFinish} className="xvi-intro-skip-btn">Skip</button>
        <span className="xvi-intro-progress">{progress}%</span>
      </div>

      {/* Exit sweep */}
      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="xvi-intro-sweep"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: .6, ease: [.16, 1, .3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
