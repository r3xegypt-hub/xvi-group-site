import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  opacity: number;
  connections: number[];
}

interface AINetworkProps {
  className?: string;
  nodeCount?: number;
  color?: string;
  pulseSpeed?: number;
}

export function AINetwork({
  className,
  nodeCount = 40,
  color = '#C8A65A',
  pulseSpeed = 3,
}: AINetworkProps) {
  const nodes = useMemo<Node[]>(() => {
    const pts: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.4 + 0.1,
      connections: [],
    }));

    pts.forEach((p) => {
      const distances = pts
        .map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
        .filter(({ j, d }) => j !== p.id && d < 25)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);

      p.connections = distances.map((d) => d.j);
    });

    return pts;
  }, [nodeCount]);

  const lines = useMemo(() => {
    const seen = new Set<string>();
    return nodes.flatMap((p) =>
      p.connections
        .filter((ci) => {
          const key = [p.id, ci].sort().join('-');
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((ci) => ({
          x1: p.x,
          y1: p.y,
          x2: nodes[ci].x,
          y2: nodes[ci].y,
          key: `${p.id}-${ci}`,
        }))
    );
  }, [nodes]);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {lines.map((line) => (
          <motion.line
            key={line.key}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={color}
            strokeWidth="0.3"
            strokeOpacity="0"
            initial={{ strokeOpacity: 0 }}
            animate={{
              strokeOpacity: [0, 0.06, 0.12, 0.06, 0],
            }}
            transition={{
              duration: pulseSpeed * 2,
              repeat: Infinity,
              delay: Math.random() * pulseSpeed,
              ease: 'easeInOut',
            }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.r}
            fill={color}
            opacity={node.opacity}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [node.opacity, node.opacity * 2.5, node.opacity],
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              delay: Math.random() * pulseSpeed,
              ease: 'easeInOut',
            }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={`glow-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.r * 4}
            fill="url(#node-glow)"
            opacity={0}
            animate={{
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              delay: Math.random() * pulseSpeed,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
