import { useEffect, useRef, type CSSProperties } from 'react'
import { useMotion } from '../../context/MotionContext'

type LayerProps = {
  className?: string
  opacity?: number
  style?: CSSProperties
}

export function NoiseGrainLayer({ className = '', opacity = 0.06, style }: LayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { reducedMotion } = useMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = reducedMotion ? 160 : 200
    canvas.width = size
    canvas.height = size
    const img = ctx.createImageData(size, size)
    const data = img.data
    for (let i = 0; i < data.length; i += 4) {
      const n = Math.random()
      data[i] = n < 0.5 ? 11 : 204
      data[i + 1] = n < 0.5 ? 8 : 169
      data[i + 2] = n < 0.5 ? 51 : 110
      data[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
    const url = canvas.toDataURL()
    canvas.style.display = 'none'
    void url
  }, [reducedMotion])

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.05  0 0 0 0 0.12  0 0 0 0.22 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        backgroundSize: '220px 220px',
        ...style,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export function ReflectionLayer({ className = '', height = 0.22 }: LayerProps & { height?: number }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: `${Math.round(height * 100)}%`,
        pointerEvents: 'none',
        background: 'linear-gradient(0deg, rgba(250,248,243,0.95) 0%, rgba(250,248,243,0.75) 45%, rgba(250,248,243,0) 100%)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        maskImage: 'linear-gradient(0deg, #000 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(0deg, #000 0%, transparent 100%)',
      }}
    />
  )
}

export function VignetteLayer({ className = '', intensity = 0.45 }: LayerProps & { intensity?: number }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, transparent 45%, rgba(11,27,51,${(intensity * 0.28).toFixed(3)}) 100%)`,
      }}
    />
  )
}

export function DynamicBlurLayer({ className = '' }: { className?: string }) {
  const { scrollProgress, reducedMotion } = useMotion()
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: reducedMotion ? 0 : `${18 + Math.min(68, scrollProgress * 92)}px`,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(250,248,243,0.92) 0%, rgba(250,248,243,0.45) 60%, rgba(250,248,243,0) 100%)',
        backdropFilter: `blur(${reducedMotion ? 0 : 6 + scrollProgress * 12}px) saturate(1.25)`,
        WebkitBackdropFilter: `blur(${reducedMotion ? 0 : 6 + scrollProgress * 12}px) saturate(1.25)`,
        maskImage: 'linear-gradient(180deg, #000 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 100%)',
        zIndex: 1,
      }}
    />
  )
}
