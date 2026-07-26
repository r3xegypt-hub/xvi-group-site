import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollEngineCtx = {
  lenis: Lenis | null
  smoothScrollTo: (target: number | HTMLElement, opts?: { offset?: number; duration?: number; immediate?: boolean }) => void
  registerSection: (id: string, el: HTMLElement | null) => () => void
  activeSection: string
  progress: number
}

const Ctx = createContext<ScrollEngineCtx | null>(null)

export function ScrollEngine({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const lenisRef = useRef<Lenis | null>(null)
  const sections = useRef(new Map<string, HTMLElement>())
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: prefers ? 0.2 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefers,
      wheelMultiplier: prefers ? 1 : 0.92,
      touchMultiplier: 1.05,
      lerp: prefers ? 0.1 : 0.08,
    } as any)
    lenisRef.current = lenis

    let rafId = 0
    const loop = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const onScroll = ({ scroll, progress: p }: { scroll: number; progress: number }) => {
      setProgress(p)
      let bestId = ''
      let bestRatio = -1
      for (const [id, el] of sections.current) {
        const top = el.offsetTop
        const height = el.offsetHeight || 1
        const end = top + height
        const vh = window.innerHeight
        const viewTop = scroll + vh * 0.22
        const viewBottom = scroll + vh * 0.78
        const overlapTop = Math.max(top, viewTop)
        const overlapBottom = Math.min(end, viewBottom)
        const overlap = Math.max(0, overlapBottom - overlapTop)
        const ratio = overlap / Math.min(height, vh)
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id }
      }
      if (bestId) setActiveSection((s) => s === bestId ? s : bestId)
      void scroll
    }
    lenis.on('scroll', onScroll as any)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  const smoothScrollTo = (target: number | HTMLElement, opts?: { offset?: number; duration?: number; immediate?: boolean }) => {
    const lenis = lenisRef.current
    if (opts?.immediate) {
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y + (opts?.offset ?? 0), behavior: 'auto' })
      return
    }
    if (!lenis) {
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y + (opts?.offset ?? 0), behavior: 'smooth' })
      return
    }
    if (typeof target === 'number') {
      lenis.scrollTo(target + (opts?.offset ?? 0), { duration: opts?.duration, force: true } as any)
    } else {
      lenis.scrollTo(target, { offset: opts?.offset, duration: opts?.duration, force: true } as any)
    }
  }

  const registerSection = (id: string, el: HTMLElement | null) => {
    if (!el) return () => { }
    sections.current.set(id, el)
    return () => { sections.current.delete(id) }
  }

  const value = useMemo(() => ({
    lenis: lenisRef.current,
    smoothScrollTo,
    registerSection,
    activeSection,
    progress,
  }), [activeSection, progress])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useScrollEngine() {
  const ctx = useContext(Ctx)
  return ctx
}
