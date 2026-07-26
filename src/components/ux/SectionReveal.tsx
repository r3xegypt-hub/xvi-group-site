import { motion, useInView, useReducedMotion, type Variant } from 'framer-motion'
import { forwardRef, useEffect, useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import type { JSX } from 'react'

type RevealProps = {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  delay?: number
  y?: number
  blur?: number
  stagger?: number
  className?: string
  once?: boolean
  threshold?: number
  type?: 'fade-up' | 'fade' | 'blur-in' | 'stagger-kids' | 'scale-up' | 'letterwise'
}

export const SectionReveal = forwardRef<HTMLElement, RevealProps>(function SectionReveal(
  { children, as = 'div', delay = 0, y = 28, blur = 8, stagger = 0.08, className = '', once = true, threshold = 0.15, type = 'fade-up' },
  ref,
) {
  const innerRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(innerRef, { once, margin: '-5% 0px -12% 0px', amount: threshold as any })

  useEffect(() => {
    if (ref) {
      (ref as any).current = innerRef.current
    }
  }, [ref])

  const fadeUp: Record<string, Variant> = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y, filter: `blur(${reducedMotion ? 0 : blur}px)`, transition: { duration: 0 } },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? 0.01 : 0.9,
        delay,
        ease: 'var(--ease-premium)',
      },
    },
  }
  const fade: Record<string, Variant> = {
    hidden: { opacity: 0, transition: { duration: 0 } },
    show: { opacity: 1, transition: { duration: reducedMotion ? 0.01 : 0.75, delay, ease: 'var(--ease-premium)' } },
  }
  const scale: Record<string, Variant> = {
    hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.94, transition: { duration: 0 } },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: reducedMotion ? 0.01 : 0.85, delay, ease: 'var(--ease-executive)' },
    },
  }
  const staggerKids: Record<string, Variant> = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : stagger, delayChildren: delay },
    },
  }

  const variants = type === 'fade' ? fade : type === 'scale-up' ? scale : type === 'stagger-kids' ? staggerKids : fadeUp
  const MotionComp = (motion as any)[as] ?? motion.div

  return (
    <MotionComp
      ref={innerRef}
      className={clsx('xvi-section-reveal', className)}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </MotionComp>
  )
})

export function RevealChild({ children, className = '', y = 16, delay = 0 }: { children: ReactNode; className?: string; y?: number; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={clsx('xvi-reveal-child', className)}
      variants={{
        hidden: { opacity: 0, y: reducedMotion ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.01 : 0.75, delay, ease: 'var(--ease-premium)' } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function useSectionProgress() {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { amount: 'some' as any, margin: '-10% 0px -10% 0px' })
  return { ref, inView }
}
