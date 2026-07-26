import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMotion } from '../../context/MotionContext'

type GlobeProps = {
  className?: string
}

export function InteractiveGlobe({ className = '' }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { mouse, reducedMotion } = useMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 3.6

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'default',
    })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setClearColor(0x000000, 0)

    const GOLD = new THREE.Color('#B88E2F')
    const INK = new THREE.Color('#0B1B33')

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const atmosphereGeo = new THREE.SphereGeometry(1.32, 64, 64)
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    })
    globeGroup.add(new THREE.Mesh(atmosphereGeo, atmosphereMat))

    const globeGeo = new THREE.SphereGeometry(1, 64, 64)
    const globeMat = new THREE.MeshStandardMaterial({
      color: INK,
      roughness: 0.65,
      metalness: 0.25,
      transparent: true,
      opacity: 0.85,
    })
    globeGroup.add(new THREE.Mesh(globeGeo, globeMat))

    const wireGeo = new THREE.SphereGeometry(1.005, 48, 48)
    const wireMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    globeGroup.add(new THREE.Mesh(wireGeo, wireMat))

    const gridMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.35,
    })
    for (let lat = -75; lat <= 75; lat += 30) {
      const pts: THREE.Vector3[] = []
      const rad = (lat * Math.PI) / 180
      const R = 1.01 * Math.cos(rad)
      const y = 1.01 * Math.sin(rad)
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * R, y, Math.sin(a) * R))
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      globeGroup.add(new THREE.Line(g, gridMat))
    }
    for (let lon = 0; lon < 180; lon += 30) {
      const pts: THREE.Vector3[] = []
      const a = (lon * Math.PI) / 180
      for (let i = 0; i <= 48; i++) {
        const t = (i / 48) * Math.PI - Math.PI / 2
        const x = Math.cos(t) * Math.cos(a)
        const z = Math.cos(t) * Math.sin(a)
        const y = Math.sin(t)
        pts.push(new THREE.Vector3(x * 1.01, y * 1.01, z * 1.01))
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      globeGroup.add(new THREE.Line(g, gridMat))
    }

    const cities = [
      { n: 'London', p: [0.1276, 51.5072] },
      { n: 'New York', p: [-74.006, 40.7128] },
      { n: 'Dubai', p: [55.2708, 25.2048] },
      { n: 'Singapore', p: [103.8198, 1.3521] },
      { n: 'Tokyo', p: [139.6917, 35.6895] },
      { n: 'Riyadh', p: [46.6753, 24.7136] },
      { n: 'Berlin', p: [13.405, 52.52] },
      { n: 'São Paulo', p: [-46.6333, -23.5505] },
      { n: 'Sydney', p: [151.2093, -33.8688] },
      { n: 'Cairo', p: [31.2357, 30.0444] },
      { n: 'Mumbai', p: [72.8777, 19.076] },
      { n: 'Paris', p: [2.3522, 48.8566] },
    ]
    const cityGroup = new THREE.Group()
    const dotMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.9,
    })
    const glowMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.28,
    })
    cities.forEach((c) => {
      const [lon, lat] = c.p
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      const R = 1.02
      const x = -R * Math.sin(phi) * Math.cos(theta)
      const z = R * Math.sin(phi) * Math.sin(theta)
      const y = R * Math.cos(phi)
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 12), dotMat)
      dot.position.set(x, y, z)
      cityGroup.add(dot)
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), glowMat)
      glow.position.set(x, y, z)
      cityGroup.add(glow)
    })
    globeGroup.add(cityGroup)

    const linePairs: [number, number][] = [
      [0, 1], [0, 6], [0, 9], [0, 11],
      [2, 5], [2, 9], [2, 10],
      [3, 4], [3, 10],
      [1, 7], [1, 6],
      [4, 8], [11, 6], [7, 8],
    ]
    const arcMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.55,
    })
    const arcs: THREE.Line[] = []
    linePairs.forEach(([a, b]) => {
      const [lonA, latA] = cities[a].p
      const [lonB, latB] = cities[b].p
      const pts: THREE.Vector3[] = []
      const steps = 60
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const lon = lonA + (lonB - lonA) * t
        const lat = latA + (latB - latA) * t
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lon + 180) * (Math.PI / 180)
        const R = 1.03 + Math.sin(t * Math.PI) * 0.22
        const x = -R * Math.sin(phi) * Math.cos(theta)
        const z = R * Math.sin(phi) * Math.sin(theta)
        const y = R * Math.cos(phi)
        pts.push(new THREE.Vector3(x, y, z))
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      const line = new THREE.Line(g, arcMat)
      globeGroup.add(line)
      arcs.push(line)
    })

    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.9)
    dir1.position.set(4, 3, 5)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(GOLD, 0.7)
    dir2.position.set(-4, -3, 2)
    scene.add(dir2)

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
    const animate = () => {
      t += reducedMotion ? 0.0005 : 0.0025

      const targetRX = reducedMotion ? 0.05 : mouse.ny * 0.35
      const targetRY = reducedMotion ? t * 0.35 : t * 0.45 + mouse.nx * 0.5

      globeGroup.rotation.x += (targetRX - globeGroup.rotation.x) * 0.05
      globeGroup.rotation.y += (targetRY - globeGroup.rotation.y) * 0.05

      dotMat.opacity = 0.72 + Math.sin(t * 3.2) * 0.18
      glowMat.opacity = 0.18 + Math.sin(t * 2.5) * 0.12
      arcs.forEach((ln, idx) => {
        const mat = ln.material as THREE.LineBasicMaterial
        mat.opacity = (0.35 + Math.sin(t * 2 + idx * 0.6) * 0.2) * 0.55
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
    }
  }, [mouse, reducedMotion])

  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(184,142,47,0.12) 0%, rgba(11,27,51,0.0) 60%)',
        filter: 'blur(22px)',
      }} />
      <canvas ref={canvasRef} className="relative z-10 max-w-full max-h-full" />
    </div>
  )
}
