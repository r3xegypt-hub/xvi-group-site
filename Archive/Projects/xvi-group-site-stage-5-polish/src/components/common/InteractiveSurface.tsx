import { useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion'
import { type HTMLAttributes, type PointerEventHandler, useRef } from 'react'

type InteractiveSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: 'subtle' | 'elevated'
}

/**
 * A low-cost pointer light for executive surfaces. It only writes CSS custom
 * properties, so consumers retain their own layout, animation, and semantics.
 */
export function InteractiveSurface({ className = '', intensity = 'subtle', onPointerMove, onPointerLeave, style, ...props }: InteractiveSurfaceProps) {
  const reducedMotion = useReducedMotion()
  const elementRef = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const smoothX = useSpring(pointerX, { stiffness: 210, damping: 28, mass: 0.18 })
  const smoothY = useSpring(pointerY, { stiffness: 210, damping: 28, mass: 0.18 })

  useMotionValueEvent(smoothX, 'change', (value) => elementRef.current?.style.setProperty('--xvi-surface-x', `${value}%`))
  useMotionValueEvent(smoothY, 'change', (value) => elementRef.current?.style.setProperty('--xvi-surface-y', `${value}%`))

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const bounds = elementRef.current?.getBoundingClientRect()
    if (!reducedMotion && bounds) {
      pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100)
      pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100)
    }
    onPointerMove?.(event)
  }

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    pointerX.set(50)
    pointerY.set(50)
    onPointerLeave?.(event)
  }

  return (
    <div
      ref={elementRef}
      className={`xvi-interactive-surface xvi-interactive-surface--${intensity} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      {...props}
    />
  )
}

export default InteractiveSurface
