import { useEffect, useRef } from 'react'
import { useMotion } from '../../context/MotionContext'

type BeamsProps = {
  className?: string
  count?: number
  color?: string
}

export function LightBeams({ className = '', count = 6, color = '#C9A96E' }: BeamsProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const { mouse, reducedMotion } = useMotion()
  useMotion()
  useRef(0)

  useEffect(() => {
    if (reducedMotion) return
    const wrap = wrapRef.current
    if (!wrap) return
    const beams = Array.from(wrap.querySelectorAll<HTMLDivElement>('[data-beam]'))
    if (!beams.length) return
    let raf = 0
    let t = 0
    const animate = () => {
      t += 0.0025
      beams.forEach((b, i) => {
        const offset = (i / beams.length) * Math.PI * 2
        const base = (Math.sin(t * 0.8 + offset) + 1) * 0.5
        const x = -20 + mouse.nx * 28 + Math.sin(t + offset * 0.4) * 14
        const tilt = -18 + mouse.ny * 22 + Math.cos(t * 0.6 + offset) * 12
        const opacity = 0.06 + base * 0.08
        const width = 1.2 + Math.sin(t * 1.3 + offset) * 0.6
        const height = 55 + base * 28
        b.style.transform = `translate3d(${x}%, 0, 0) rotate(${tilt}deg)`
        b.style.opacity = String(opacity)
        b.style.height = `${height}%`
        b.style.width = `${width}px`
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [mouse, reducedMotion, count])

  if (reducedMotion) return null
  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          data-beam={i}
          style={{
            position: 'absolute',
            top: '-15%',
            left: `${(i / count) * 100}%`,
            height: '115%',
            width: '1px',
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${color} 45%, ${color} 55%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(1px) drop-shadow(0 0 6px rgba(184,142,47,0.45))',
            mixBlendMode: 'multiply',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
