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
  maxWidthClass = 'max-w-[1160px]',
  ...rest
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={`${maxWidthClass} mx-auto px-5 sm:px-8 lg:px-10 ${className}`} {...rest}>
      {children}
    </Component>
  )
}

export default Container
