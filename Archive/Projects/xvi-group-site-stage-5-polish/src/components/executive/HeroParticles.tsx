import { memo } from 'react'

/**
 * Cinematic floating light particles — pure CSS animation.
 * 18 particles at varying sizes, speeds, and opacities.
 * Uses CSS custom properties for each particle's position and timing.
 * Respects prefers-reduced-motion via CSS.
 */

type Particle = {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
  blur: number
  drift: number
}

const particles: Particle[] = [
  // Layer 1 — foreground, larger, slower (depth of field feel)
  { x: 12, y: 22, size: 4, delay: 0, duration: 22, opacity: .35, blur: 0, drift: 18 },
  { x: 78, y: 35, size: 3.5, delay: 3, duration: 26, opacity: .28, blur: 0, drift: -14 },
  { x: 45, y: 68, size: 3, delay: 7, duration: 24, opacity: .32, blur: 0, drift: 12 },
  { x: 88, y: 55, size: 4.5, delay: 1, duration: 28, opacity: .22, blur: 1, drift: -20 },

  // Layer 2 — mid-ground
  { x: 32, y: 40, size: 2.5, delay: 5, duration: 18, opacity: .25, blur: 0, drift: 10 },
  { x: 65, y: 18, size: 2, delay: 2, duration: 20, opacity: .3, blur: 0, drift: -8 },
  { x: 22, y: 72, size: 2.5, delay: 8, duration: 22, opacity: .2, blur: 0, drift: 15 },
  { x: 55, y: 82, size: 3, delay: 4, duration: 25, opacity: .18, blur: 0, drift: -12 },
  { x: 85, y: 15, size: 2, delay: 6, duration: 19, opacity: .28, blur: 0, drift: 10 },

  // Layer 3 — background, smaller, fainter, with slight blur
  { x: 18, y: 55, size: 1.5, delay: 10, duration: 30, opacity: .15, blur: 1, drift: 8 },
  { x: 72, y: 48, size: 1.5, delay: 12, duration: 28, opacity: .12, blur: 1, drift: -6 },
  { x: 40, y: 12, size: 1, delay: 9, duration: 32, opacity: .1, blur: 1.5, drift: 10 },
  { x: 60, y: 60, size: 1.5, delay: 14, duration: 26, opacity: .14, blur: 1, drift: -10 },
  { x: 8, y: 85, size: 1, delay: 11, duration: 34, opacity: .08, blur: 1.5, drift: 6 },
  { x: 92, y: 78, size: 1, delay: 15, duration: 30, opacity: .1, blur: 1.5, drift: -8 },

  // Layer 4 — very faint ambient specks
  { x: 50, y: 30, size: 0.8, delay: 16, duration: 36, opacity: .06, blur: 2, drift: 5 },
  { x: 35, y: 90, size: 0.8, delay: 18, duration: 38, opacity: .05, blur: 2, drift: -4 },
  { x: 70, y: 10, size: 0.6, delay: 13, duration: 40, opacity: .04, blur: 2.5, drift: 3 },
]

export const HeroParticles = memo(function HeroParticles() {
  return (
    <div className="xvi-hero-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="xvi-hero-particle"
          style={{
            '--px': `${p.x}%`,
            '--py': `${p.y}%`,
            '--psize': `${p.size}px`,
            '--pdelay': `${p.delay}s`,
            '--pdur': `${p.duration}s`,
            '--popacity': p.opacity,
            '--pblur': `${p.blur}px`,
            '--pdrift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
})
