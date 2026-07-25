import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * AI-powered viewport experience.
 * Tracks cursor position for ambient lighting.
 * Adds scroll-responsive atmospheric effects.
 * Creates a living, breathing digital environment.
 */
export function ViewportExperience() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: .25 })
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const updateLight = (event: PointerEvent) => {
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--xvi-pointer-x', `${(event.clientX / window.innerWidth) * 100}%`)
        document.documentElement.style.setProperty('--xvi-pointer-y', `${(event.clientY / window.innerHeight) * 100}%`)
        frame.current = null
      })
    }
    window.addEventListener('pointermove', updateLight, { passive: true })
    return () => {
      window.removeEventListener('pointermove', updateLight)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [reducedMotion])

  return (
    <>
      <motion.div aria-hidden="true" className="xvi-scroll-progress" style={{ scaleX: progress }} />
      <div aria-hidden="true" className="xvi-viewport-light" />
      {/* AI ambient intelligence layer */}
      <div aria-hidden="true" className="xvi-ai-ambient" />
    </>
  )
}

export default ViewportExperience
