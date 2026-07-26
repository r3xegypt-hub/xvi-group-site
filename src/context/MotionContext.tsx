import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type MotionContextValue = {
  mouse: { x: number; y: number; nx: number; ny: number }
  pointer: { down: boolean }
  reducedMotion: boolean
  scrollY: number
  scrollProgress: number
  smoothScrollTo: (target: number, opts?: { duration?: number; lerp?: number }) => void
  registerMagnetic: (el: HTMLElement | null, strength?: number) => () => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export function MotionProvider({ children }: { children: ReactNode }) {
  const mouseRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 })
  const pointerRef = useRef({ down: false })
  const scrollRef = useRef({ y: 0, progress: 0 })
  const [, forceTick] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const magneticElements = useRef(new Map<HTMLElement, { strength: number; clean?: () => void }>())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const W = window.innerWidth
      const H = window.innerHeight
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.nx = W ? (e.clientX / W) * 2 - 1 : 0
      mouseRef.current.ny = H ? (e.clientY / H) * 2 - 1 : 0

      if (!reducedMotion && magneticElements.current.size) {
        for (const [el, cfg] of magneticElements.current) {
          const r = el.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          const d = Math.hypot(dx, dy)
          const radius = Math.max(r.width, r.height) * 1.4
          if (d < radius) {
            const f = 1 - d / radius
            const tx = dx * cfg.strength * f * 0.35
            const ty = dy * cfg.strength * f * 0.35
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
          } else {
            el.style.transform = 'translate3d(0,0,0)'
          }
        }
      }
    }
    const onDown = () => { pointerRef.current.down = true }
    const onUp = () => { pointerRef.current.down = false }
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollRef.current.y = y
      scrollRef.current.progress = docH ? y / docH : 0
    }
    onScroll()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId = 0
    let last = performance.now()
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      void dt
      forceTick((x) => (x + 1) % 1000000)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  const registerMagnetic = useCallback((el: HTMLElement | null, strength = 1): (() => void) => {
    if (!el) return () => {}
    magneticElements.current.set(el, { strength })
    return () => {
      el.style.transform = ''
      magneticElements.current.delete(el)
    }
  }, [])

  const smoothScrollTo = useCallback((target: number, opts?: { duration?: number; lerp?: number }) => {
    if (reducedMotion) {
      window.scrollTo({ top: target, behavior: 'auto' })
      return
    }
    const lerpF = opts?.lerp ?? 0.12
    const duration = opts?.duration ?? 1200
    const startY = window.scrollY
    const startTime = performance.now()
    let rafId = 0
    const step = (t: number) => {
      const elapsed = t - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startY + (target - startY) * eased
      const w = lerpF
      window.scrollTo(0, window.scrollY * (1 - w) + current * w)
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    void rafId
  }, [reducedMotion])

  const value = useMemo<MotionContextValue>(() => ({
    mouse: { ...mouseRef.current },
    pointer: { ...pointerRef.current },
    reducedMotion,
    scrollY: scrollRef.current.y,
    scrollProgress: scrollRef.current.progress,
    smoothScrollTo,
    registerMagnetic,
  }), [reducedMotion, smoothScrollTo, registerMagnetic])

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used within MotionProvider')
  return ctx
}
