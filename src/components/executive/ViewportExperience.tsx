import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Premium viewport experience.
 * - Ambient cursor light (radial glow that follows the pointer)
 * - Magnetic micro-pull on interactive elements near the cursor
 * - Scroll-driven progress bar
 * - Page-wide film-grain noise overlay
 */
export function ViewportExperience() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 })
  const frame = useRef<number | null>(null)

  // Ambient light + magnetic pull on buttons / cards
  useEffect(() => {
    if (reducedMotion) return

    const MAGNETIC_SELECTOR = 'a[class*="xvi-nav-cta"], button[class*="xvi-cta"], .xvi-service-card, .xvi-feature-card'
    const PULL_STRENGTH = 0.14 // fraction of distance to pull toward cursor

    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX
      lastY = e.clientY

      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(() => {
        // Update ambient light CSS variables
        document.documentElement.style.setProperty('--xvi-pointer-x', `${(lastX / window.innerWidth) * 100}%`)
        document.documentElement.style.setProperty('--xvi-pointer-y', `${(lastY / window.innerHeight) * 100}%`)

        // Magnetic pull on nearest interactive elements
        document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR).forEach((el) => {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = lastX - cx
          const dy = lastY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const threshold = Math.max(rect.width, rect.height) * 1.4

          if (dist < threshold) {
            const pull = (1 - dist / threshold) * PULL_STRENGTH
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
          } else {
            el.style.transform = ''
          }
        })

        frame.current = null
      })
    }

    const onLeave = () => {
      document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR).forEach((el) => {
        el.style.transform = ''
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [reducedMotion])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div aria-hidden="true" className="xvi-scroll-progress" style={{ scaleX: progress }} />

      {/* Ambient cursor light */}
      <div aria-hidden="true" className="xvi-viewport-light" />

      {/* AI ambient intelligence layer */}
      <div aria-hidden="true" className="xvi-ai-ambient" />

      {/* Global film grain overlay */}
      <div aria-hidden="true" className="xvi-grain-overlay" />
    </>
  )
}

export default ViewportExperience
