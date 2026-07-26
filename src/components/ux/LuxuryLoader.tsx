import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LuxuryLogo } from '../common/LuxuryLogo'

type Props = { onFinish: () => void }

export function LuxuryLoader({ onFinish }: Props) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onFinish()
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1650
    const loop = (now: number) => {
      const elapsed = now - start
      const p = Math.min(1, elapsed / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased)
      if (p < 1) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [onFinish])

  useEffect(() => {
    if (progress >= 1) {
      const t1 = setTimeout(() => setLeaving(true), 150)
      const t2 = setTimeout(() => onFinish(), 900)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [progress, onFinish])

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="xvi-lux-loader"
          className="fixed inset-0 z-[10000] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scaleY: 1.02, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: 'radial-gradient(120% 80% at 50% 30%, #FFFFFF 0%, rgba(201,169,110,0.14) 58%, rgba(6,10,16,0.06) 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply" style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(201,169,110,0.28), transparent 42%), radial-gradient(circle at 70% 80%, rgba(6,10,16,0.16), transparent 52%)`,
          }} />
          <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.05  0 0 0 0 0.12  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
            backgroundSize: '220px 220px',
          }} />
          <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-[clamp(120px,22vw,220px)]">
                <LuxuryLogo variant="dark" stacked />
              </div>
              <div className="relative w-[min(420px,70vw)]">
                <div className="h-[2px] w-full rounded-full overflow-hidden bg-[color:var(--color-xvi-line)]">
                  <motion.div
                    className="h-full"
                    style={{
                      width: `${progress * 100}%`,
                      background: 'linear-gradient(90deg, rgba(201,169,110,0.12) 0%, #C9A96E 36%, #C9A96E 64%, rgba(6,10,16,0.8) 100%)',
                      boxShadow: '0 0 18px rgba(201,169,110,0.45)',
                    }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.32em] uppercase text-[color:var(--color-xvi-ink-soft)] font-[600]">
                  <span>Calibrating Identity</span>
                  <span className="tabular-nums">{Math.round(progress * 100)}%</span>
                </div>
              </div>
              <div className="pt-3 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-xvi-bronze)] font-[700]">
                The Axis Is Forming
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
