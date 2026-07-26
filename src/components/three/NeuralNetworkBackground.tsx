import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMotion } from '../../context/MotionContext'

type NetworkBGProps = {
  className?: string
  color?: string
  secondaryColor?: string
  nodeCount?: number
}

export function NeuralNetworkBackground({
  className = '',
  color = '#B88E2F',
  secondaryColor = '#0B1B33',
  nodeCount = 90,
}: NetworkBGProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { mouse, reducedMotion } = useMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'default',
    })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setClearColor(0x000000, 0)

    const cColor = new THREE.Color(color)
    const sColor = new THREE.Color(secondaryColor)

    const positions = new Float32Array(nodeCount * 3)
    const velocities = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = 0
      velocities[i * 3] = (Math.random() - 0.5) * (reducedMotion ? 0.0004 : 0.0022)
      velocities[i * 3 + 1] = (Math.random() - 0.5) * (reducedMotion ? 0.0004 : 0.0022)
      velocities[i * 3 + 2] = 0
    }

    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const nodeMat = new THREE.PointsMaterial({
      color: cColor,
      size: 0.012,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const nodePoints = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodePoints)

    const MAX_LINES = nodeCount * 4
    const linePositions = new Float32Array(MAX_LINES * 2 * 3)
    const lineColors = new Float32Array(MAX_LINES * 2 * 3)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    lineGeo.setDrawRange(0, 0)
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    const resize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      const aspect = w / h
      camera.left = -aspect
      camera.right = aspect
      camera.top = 1
      camera.bottom = -1
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      ;(camera as any)._aspect = aspect
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    let raf = 0
    const animate = () => {
      const aspect = (camera as any)._aspect || 1
      const pos = nodeGeo.attributes.position.array as Float32Array
      for (let i = 0; i < nodeCount; i++) {
        let x = pos[i * 3]
        let y = pos[i * 3 + 1]
        x += velocities[i * 3]
        y += velocities[i * 3 + 1]
        if (x < -aspect) { x = -aspect; velocities[i * 3] *= -1 }
        if (x > aspect) { x = aspect; velocities[i * 3] *= -1 }
        if (y < -1) { y = -1; velocities[i * 3 + 1] *= -1 }
        if (y > 1) { y = 1; velocities[i * 3 + 1] *= -1 }

        if (!reducedMotion) {
          const dx = mouse.nx * aspect - x
          const dy = mouse.ny - y
          const d = Math.hypot(dx, dy)
          if (d < 0.45) {
            const f = (1 - d / 0.45) * 0.003
            x += dx * f
            y += dy * f
          }
        }

        pos[i * 3] = x
        pos[i * 3 + 1] = y
      }
      nodeGeo.attributes.position.needsUpdate = true

      let lineIdx = 0
      const MAX_DIST = 0.38
      for (let i = 0; i < nodeCount && lineIdx < MAX_LINES; i++) {
        const x1 = pos[i * 3]
        const y1 = pos[i * 3 + 1]
        for (let j = i + 1; j < nodeCount && lineIdx < MAX_LINES; j++) {
          const x2 = pos[j * 3]
          const y2 = pos[j * 3 + 1]
          const dx = x2 - x1
          const dy = y2 - y1
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2)
            const a = 1 - d / MAX_DIST
            linePositions[lineIdx * 6] = x1
            linePositions[lineIdx * 6 + 1] = y1
            linePositions[lineIdx * 6 + 2] = 0
            linePositions[lineIdx * 6 + 3] = x2
            linePositions[lineIdx * 6 + 4] = y2
            linePositions[lineIdx * 6 + 5] = 0

            lineColors[lineIdx * 6] = cColor.r * a
            lineColors[lineIdx * 6 + 1] = cColor.g * a
            lineColors[lineIdx * 6 + 2] = cColor.b * a
            lineColors[lineIdx * 6 + 3] = sColor.r * a
            lineColors[lineIdx * 6 + 4] = sColor.g * a
            lineColors[lineIdx * 6 + 5] = sColor.b * a

            lineIdx++
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2)
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
      nodeGeo.dispose(); nodeMat.dispose()
      lineGeo.dispose(); lineMat.dispose()
    }
  }, [color, secondaryColor, nodeCount, mouse, reducedMotion])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} aria-hidden="true" />
}
