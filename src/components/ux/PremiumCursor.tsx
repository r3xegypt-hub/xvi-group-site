import { useEffect, useRef } from 'react'
import { useMotion } from '../../context/MotionContext'

export function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const auraRef = useRef<HTMLDivElement | null>(null)
  const { mouse, pointer, reducedMotion } = useMotion()

  useEffect(() => {
    if (reducedMotion) return
    const d = dotRef.current
    const r = ringRef.current
    const a = auraRef.current
    if (!d || !r || !a) return

    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    document.documentElement.classList.add('xvi-has-fancy-cursor')
    let raf = 0
    let rx = 0, ry = 0, ax = 0, ay = 0
    let down = false

    const onDown = () => { down = true }
    const onUp = () => { down = false }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null
      if (!el) return
      const interactive = !!el.closest('button, a, [role="button"], [data-cursor-interactive], .xvi-premium-card')
      r.style.setProperty('--cursor-ring-s', interactive ? '1.55' : down ? '0.85' : '1')
      r.style.setProperty('--cursor-ring-o', interactive ? '0.92' : '0.55')
      a.style.setProperty('--cursor-aura-o', interactive ? '0.35' : '0.08')
    }
    document.addEventListener('pointerover', onOver, true)

    const animate = () => {
      const { x, y } = { x: mouse.x, y: mouse.y }
      d.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(var(--cursor-ring-s, 1))`
      ax += (x - ax) * 0.08
      ay += (y - ay) * 0.08
      a.style.transform = `translate3d(${ax}px, ${ay}px, 0) translate(-50%, -50%) scale(1)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerover', onOver, true)
      document.documentElement.classList.remove('xvi-has-fancy-cursor')
    }
  }, [mouse, pointer, reducedMotion])

  if (reducedMotion) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div
        ref={auraRef}
        style={{
          width: 420, height: 420,
          position: 'absolute', top: 0, left: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,142,47,0.10) 0%, rgba(11,27,51,0.04) 45%, rgba(0,0,0,0) 72%)',
          mixBlendMode: 'multiply',
          opacity: 'var(--cursor-aura-o, 0.08)',
          transition: 'opacity 240ms cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 38, height: 38,
          position: 'absolute', top: 0, left: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(184,142,47,0.9)',
          boxShadow: '0 0 0 1px rgba(11,27,51,0.18), 0 0 22px rgba(184,142,47,0.18)',
          opacity: 'var(--cursor-ring-o, 0.55)',
          transition: 'border-color 180ms, opacity 180ms',
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={dotRef}
        style={{
          width: 5, height: 5,
          position: 'absolute', top: 0, left: 0,
          borderRadius: '50%',
          background: '#0B1B33',
          boxShadow: '0 0 0 1px rgba(184,142,47,0.6), 0 0 10px rgba(184,142,47,0.35)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
