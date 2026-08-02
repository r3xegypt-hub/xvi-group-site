import styles from './AICore.module.scss';

// Fixed neural constellation rendered inside the glass sphere.
// Deterministic positions keep the visual stable across renders and devices.
const NODES = [
  { x: 50, y: 16 },
  { x: 22, y: 26 },
  { x: 78, y: 28 },
  { x: 36, y: 38 },
  { x: 64, y: 42 },
  { x: 50, y: 50 },
  { x: 14, y: 56 },
  { x: 86, y: 58 },
  { x: 30, y: 68 },
  { x: 70, y: 70 },
  { x: 50, y: 82 },
  { x: 22, y: 84 },
  { x: 78, y: 88 },
];

const LINKS: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5],
  [1, 6], [2, 7], [5, 6], [5, 7], [6, 8], [7, 9], [5, 8],
  [5, 9], [8, 9], [8, 10], [9, 10], [6, 11], [7, 12], [10, 11],
  [10, 12], [11, 12],
];

export function AICore() {
  return (
    <div className={styles.core} data-testid="executive-ai-core" aria-hidden="true">
      <span className={styles.ambientGlow} data-part="glow" />
      <span className={styles.halo} />
      <span className={styles.orbitRing} />
      <span className={styles.orbitRingAlt} />
      <div className={styles.sphere} data-part="sphere">
        <span className={styles.sphereSheen} />
        <span className={styles.sphereReflect} />
        <span className={styles.scanBeam} />
        <span className={styles.nucleus} data-part="nucleus" />
        <svg className={styles.neural} viewBox="0 0 100 100" data-part="neural" fill="none">
          <g className={styles.neuralLinks}>
            {LINKS.map(([a, b], i) => (
              <line
                key={`l${i}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
              />
            ))}
          </g>
          <g className={styles.neuralNodes}>
            {NODES.map((n, i) => (
              <circle key={`n${i}`} cx={n.x} cy={n.y} r={i % 3 === 0 ? 1.7 : 1.2} />
            ))}
          </g>
        </svg>
      </div>
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
