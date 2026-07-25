import React from 'react'
import clsx from 'clsx'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  const base = 'xvi-premium-button relative inline-flex items-center gap-3 overflow-hidden rounded-full font-[600] transition-[transform,box-shadow,background-color,border-color,color] duration-500 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none select-none'

  const sizeClass =
    size === 'sm'
      ? 'px-5 py-3 text-[0.9rem]'
      : size === 'lg'
      ? 'px-9 py-4.5 text-[1.05rem]'
      : 'px-7 py-3.5 text-[0.95rem]'

  const variantClass =
    variant === 'primary'
      ? 'bg-[color:var(--color-xvi-navy)] text-white shadow-[0_20px_55px_rgba(11,27,51,0.18)] hover:-translate-y-px hover:shadow-[0_26px_70px_rgba(11,27,51,0.24)]'
      : variant === 'secondary'
      ? 'border border-[color:var(--color-xvi-line)] bg-white/72 text-[color:var(--color-xvi-ink)] backdrop-blur-xl hover:-translate-y-px hover:bg-white hover:shadow-[0_16px_40px_rgba(11,15,20,0.06)]'
      : 'bg-transparent text-[color:var(--color-xvi-ink-soft)] hover:text-[color:var(--color-xvi-ink)]'

  return (
    <button type="button" className={clsx(base, sizeClass, variantClass, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button
