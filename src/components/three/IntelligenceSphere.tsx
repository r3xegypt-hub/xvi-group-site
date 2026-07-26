import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMotion } from '../../context/MotionContext'

type SphereProps = {
  className?: string
  intensity?: number
}

export function IntelligenceSphere({ className = '', intensity = 1 }: SphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { mouse, reducedMotion } = useMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setClearColor(0x000000, 0)

    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    const GOLD = new THREE.Color('#B88E2F')
    const NAVY = new THREE.Color('#0B1B33')
    const LIGHT = new THREE.Color('#C9A96E')

    const outerGeo = new THREE.SphereGeometry(1.15, 64, 64)
    const outerMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      wireframe: true,
      transparent: true,
      opacity: 0.15 * intensity,
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMat)
    sphereGroup.add(outerMesh)

    const midGeo = new THREE.SphereGeometry(0.95, 48, 48)
    const midMat = new THREE.MeshStandardMaterial({
      color: NAVY,
      roughness: 0.22,
      metalness: 0.92,
      emissive: NAVY,
      emissiveIntensity: 0.08,
    })
    const midMesh = new THREE.Mesh(midGeo, midMat)
    sphereGroup.add(midMesh)

    const innerGeo = new THREE.IcosahedronGeometry(0.55, 1)
    const innerMat = new THREE.MeshBasicMaterial({
      color: LIGHT,
      wireframe: true,
      transparent: true,
      opacity: 0.55 * intensity,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    sphereGroup.add(innerMesh)

    const coreGeo = new THREE.SphereGeometry(0.28, 32, 32)
    const coreMat = new THREE.MeshStandardMaterial({
      color: GOLD,
      roughness: 0.12,
      metalness: 1,
      emissive: GOLD,
      emissiveIntensity: 0.6 * intensity,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    sphereGroup.add(coreMesh)

    const ambient = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambient)
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.1)
    dir1.position.set(3, 4, 5)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(GOLD, 1.4 * intensity)
    dir2.position.set(-4, -2, 3)
    scene.add(dir2)

    const point = new THREE.PointLight(GOLD, 2.2 * intensity, 10)
    point.position.set(0, 0, 0)
    sphereGroup.add(point)

    const particleCount = 320
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 1.35 + Math.random() * 0.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: LIGHT,
      size: 0.016,
      transparent: true,
      opacity: 0.75 * intensity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    sphereGroup.add(particles)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const size = Math.min(parent.clientWidth, parent.clientHeight)
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    let raf = 0
    let t = 0
    let targetRX = 0
    let targetRY = 0

    const animate = () => {
      t += reducedMotion ? 0.001 : 0.008

      targetRY = reducedMotion ? 0 : mouse.nx * 0.45
      targetRX = reducedMotion ? 0 : mouse.ny * 0.32

      sphereGroup.rotation.y += (targetRY - sphereGroup.rotation.y) * 0.06
      sphereGroup.rotation.x += (targetRX - sphereGroup.rotation.x) * 0.06

      outerMesh.rotation.x += reducedMotion ? 0.0008 : 0.004
      outerMesh.rotation.y += reducedMotion ? 0.0005 : 0.0025
      innerMesh.rotation.x -= reducedMotion ? 0.001 : 0.006
      innerMesh.rotation.y -= reducedMotion ? 0.0008 : 0.004

      particles.rotation.y += reducedMotion ? 0.0003 : 0.0012
      coreMat.emissiveIntensity = (0.45 + Math.sin(t * 1.2) * 0.25) * intensity

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
      outerGeo.dispose(); outerMat.dispose()
      midGeo.dispose(); midMat.dispose()
      innerGeo.dispose(); innerMat.dispose()
      coreGeo.dispose(); coreMat.dispose()
      particleGeo.dispose(); particleMat.dispose()
      ambient.dispose(); dir1.dispose(); dir2.dispose(); point.dispose()
    }
  }, [mouse, reducedMotion, intensity])

  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(184,142,47,0.18) 0%, rgba(11,27,51,0.0) 55%)',
        filter: 'blur(18px)',
      }} />
      <canvas ref={canvasRef} className="relative z-10 max-w-full max-h-full" />
    </div>
  )
}
