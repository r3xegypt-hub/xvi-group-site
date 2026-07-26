import { forwardRef, useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import { useMotion } from '../../context/MotionContext'

export type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strength?: number
  icon?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(function MagneticButton(
  { variant = 'primary', size = 'md', strength = 1.2, icon, iconRight, className = '', children, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLButtonElement | null>(null)
  const { registerMagnetic, reducedMotion } = useMotion()

  useEffect(() => {
    if (reducedMotion) return
    const el = innerRef.current
    if (!el) return
    return registerMagnetic(el, strength)
  }, [reducedMotion, strength, registerMagnetic])

  const finalRef = (el: HTMLButtonElement | null) => {
    innerRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) (ref as { current: HTMLButtonElement | null }).current = el
  }

  const base = 'xvi-premium-button xvi-magnetic-button group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-[700] tracking-[-0.005em] transition-[transform,box-shadow,background-color,border-color,color] duration-[420ms] ease-[var(--ease-premium)] active:scale-[0.97] active:duration-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none select-none focus-visible:outline-none focus-visible:ring-[2.5px] focus-visible:ring-[color:var(--color-xvi-bronze)] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[color:var(--color-xvi-warm)]'

  const sizeClass =
    size === 'sm' ? 'px-5 py-2.5 text-[0.82rem]' :
    size === 'lg' ? 'px-10 py-5 text-[1rem]' :
    size === 'xl' ? 'px-[3rem] py-[1.45rem] text-[1.08rem] tracking-[-0.012em]' :
    'px-7 py-3.5 text-[0.9rem]'

  const variantClass =
    variant === 'primary' ?
      'bg-[color:var(--color-xvi-navy)] text-white shadow-[0_20px_55px_rgba(6,10,16,0.25),0_4px_12px_rgba(6,10,16,0.12)] hover:-translate-y-[2px] hover:scale-[1.01] hover:shadow-[0_30px_72px_rgba(6,10,16,0.32),0_0_0_1px_rgba(201,169,110,0.28)]' :
    variant === 'secondary' ?
      'border border-[color:var(--border-premium)] bg-white/80 text-[color:var(--color-xvi-ink)] backdrop-blur-xl shadow-[0_8px_24px_rgba(6,10,16,0.06)] hover:-translate-y-[2px] hover:bg-white hover:border-[rgba(201,169,110,0.32)] hover:shadow-[0_20px_48px_rgba(6,10,16,0.10),0_0_0_1px_rgba(201,169,110,0.15)]' :
    variant === 'dark' ?
      'bg-[color:var(--color-xvi-ink)] text-[color:var(--color-xvi-warm)] shadow-[0_20px_52px_rgba(6,10,16,0.35)] hover:-translate-y-[2px] hover:bg-black hover:shadow-[0_32px_72px_rgba(6,10,16,0.42),0_0_0_1px_rgba(201,169,110,0.22)]' :
      'bg-transparent text-[color:var(--color-xvi-ink-soft)] hover:text-[color:var(--color-xvi-ink)]'

  return (
    <button
      ref={finalRef}
      type={rest.type ?? 'button'}
      className={clsx(base, sizeClass, variantClass, className)}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full rounded-full opacity-0 transition-all duration-[800ms] ease-[var(--ease-premium)] group-hover:translate-x-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.12) 45%, rgba(201,169,110,0.18) 55%, transparent 100%)',
        }}
      />
      {icon ? <span className="relative z-[1] inline-flex items-center">{icon}</span> : null}
      <span className="relative z-[1]">{children}</span>
      {iconRight ? <span className="relative z-[1] inline-flex items-center">{iconRight}</span> : null}
    </button>
  )
})
