import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

type AnimateCounterProps = {
  to: number
  from?: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'div' | 'span' | 'p'
  formatter?: (n: number) => string
  amount?: number
  delay?: number
}

function defaultFormat(n: number, decimals: number) {
  const rounded = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)
  if (rounded >= 1_000_000) return (rounded / 1_000_000).toFixed(decimals) + 'M'
  if (rounded >= 1_000) return (rounded / 1_000).toFixed(decimals) + 'K'
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals })
}

export function AnimateCounter({
  to,
  from = 0,
  duration = 2200,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  as = 'div',
  formatter,
  amount = 0.35,
  delay = 0,
}: AnimateCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px', amount })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(from)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    if (reducedMotion) {
      setValue(to)
      return
    }

    const start = performance.now() + delay
    const run = (now: number) => {
      const elapsed = now - start
      if (elapsed < 0) { requestAnimationFrame(run); return }
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      setValue(current)
      if (progress < 1) requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }, [inView, to, from, duration, reducedMotion, delay])

  const Tag = as as any
  const display = formatter ? formatter(value) : defaultFormat(value, decimals)
  return (
    <Tag className={clsx('xvi-animate-counter', className)} aria-live="polite">
      <span className="inline-block" ref={ref}>
        {prefix}
        <span className="tabular-nums">{display}</span>
        {suffix}
      </span>
    </Tag>
  )
}
