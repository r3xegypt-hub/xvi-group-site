import React from 'react'
import clsx from 'clsx'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  const base = 'xvi-premium-button xvi-axis-button relative inline-flex items-center gap-3 overflow-hidden rounded-[20px] border border-transparent font-[700] tracking-[0.12em] uppercase transition-[transform,box-shadow,background-color,border-color,color] duration-[420ms] active:scale-[0.985] active:duration-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none select-none'

  const sizeClass =
    size === 'sm'
      ? 'px-5 py-2.5 text-[0.78rem]'
      : size === 'lg'
      ? 'px-10 py-5 text-[0.94rem]'
      : 'px-7 py-3.5 text-[0.84rem]'

  const variantClass =
    variant === 'primary'
      ? 'bg-[color:var(--color-xvi-navy)] text-white shadow-[0_22px_60px_rgba(6,10,16,0.18),0_6px_18px_rgba(6,10,16,0.08)] hover:-translate-y-[2px] hover:shadow-[0_34px_84px_rgba(6,10,16,0.24),0_0_0_1px_rgba(201,169,110,0.28)]'
      : variant === 'secondary'
      ? 'border border-[color:var(--color-xvi-line)] bg-white/75 text-[color:var(--color-xvi-ink)] backdrop-blur-xl shadow-[0_10px_28px_rgba(6,10,16,0.05)] hover:-translate-y-[2px] hover:bg-white hover:border-[rgba(201,169,110,0.28)] hover:shadow-[0_20px_48px_rgba(6,10,16,0.08)]'
      : 'bg-transparent text-[color:var(--color-xvi-ink-soft)] hover:text-[color:var(--color-xvi-ink)] hover:border-[rgba(201,169,110,0.24)]'

  return (
    <button type="button" className={clsx(base, sizeClass, variantClass, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button
