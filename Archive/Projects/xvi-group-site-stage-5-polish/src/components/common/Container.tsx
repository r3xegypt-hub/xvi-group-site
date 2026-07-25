import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  maxWidthClass?: string
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  maxWidthClass = 'max-w-[1280px]',
  ...rest
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={`${maxWidthClass} mx-auto px-6 sm:px-6 ${className}`} {...rest}>
      {children}
    </Component>
  )
}

export default Container
