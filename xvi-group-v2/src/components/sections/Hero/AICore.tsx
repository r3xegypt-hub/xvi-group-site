import { motion } from 'framer-motion';
import styles from './AICore.module.scss';

// Precision 3D Neural Constellation Nodes
const NODES = [
  { x: 50, y: 14, r: 2.2 },
  { x: 20, y: 28, r: 1.8 },
  { x: 80, y: 30, r: 1.8 },
  { x: 34, y: 40, r: 2.5 },
  { x: 66, y: 44, r: 2.5 },
  { x: 50, y: 50, r: 3.2 },
  { x: 12, y: 58, r: 1.8 },
  { x: 88, y: 60, r: 1.8 },
  { x: 28, y: 70, r: 2.2 },
  { x: 72, y: 72, r: 2.2 },
  { x: 50, y: 84, r: 2.4 },
];

const LINKS: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5],
  [1, 6], [2, 7], [5, 6], [5, 7], [6, 8], [7, 9],
  [5, 8], [5, 9], [8, 10], [9, 10], [3, 8], [4, 9],
];

export function AICore() {
  return (
    <div className={styles.core} data-testid="executive-ai-core" aria-hidden="true">
      {/* Outer Holographic Ambient Glow */}
      <span className={styles.ambientGlow} data-part="glow" />

      {/* Dynamic Rotating 3D Orbital Rings */}
      <motion.span
        className={styles.orbitRing}
        animate={{ rotateZ: 360, rotateX: [60, 45, 60] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className={styles.orbitRingAlt}
        animate={{ rotateZ: -360, rotateY: [40, 55, 40] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating Glass Neural Sphere Core */}
      <div className={styles.sphere} data-part="sphere">
        <span className={styles.sphereSheen} />
        <span className={styles.sphereReflect} />
        <span className={styles.scanBeam} />

        {/* Central Energy Nucleus */}
        <span className={styles.nucleus} data-part="nucleus" />

        {/* SVG Neural Mesh Network */}
        <svg className={styles.neural} viewBox="0 0 100 100" data-part="neural" fill="none">
          <defs>
            <linearGradient id="neuralLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#EED9A1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8C6E2E" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <g className={styles.neuralLinks}>
            {LINKS.map(([a, b], i) => (
              <line
                key={`l${i}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="url(#neuralLineGrad)"
                strokeWidth="0.8"
              />
            ))}
          </g>

          <g className={styles.neuralNodes}>
            {NODES.map((n, i) => (
              <circle
                key={`n${i}`}
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={i === 5 ? '#FFF' : '#C8A65A'}
                style={{
                  filter: i === 5 ? 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' : 'drop-shadow(0 0 4px rgba(200,166,90,0.6))',
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Floating Sparkle Particles */}
      <span className={styles.particles} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>

      <span className={styles.coreShadow} />
    </div>
  );
}

