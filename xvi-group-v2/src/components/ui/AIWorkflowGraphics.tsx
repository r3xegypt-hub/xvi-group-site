import { motion } from 'framer-motion';
import styles from './AIWorkflowGraphics.module.scss';

export function AIWorkflowGraphics() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 800 320" fill="none">
        <defs>
          <linearGradient id="wfGradLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4B76E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="wfNodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8A65A" stopOpacity="0.2" />
          </linearGradient>
          <filter id="wfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connecting Data Pipelines */}
        <motion.path
          d="M 120 160 C 220 80, 300 80, 400 160 C 500 240, 580 240, 680 160"
          stroke="url(#wfGradLine)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M 120 160 C 220 240, 300 240, 400 160 C 500 80, 580 80, 680 160"
          stroke="rgba(200, 166, 90, 0.3)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, 32] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Node 1: Ingestion & Telemetry */}
        <g transform="translate(120, 160)">
          <circle r="44" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(200, 166, 90, 0.4)" strokeWidth="1.5" filter="url(#wfGlow)" />
          <circle r="36" fill="rgba(42, 46, 51, 0.04)" />
          <text y="-6" textAnchor="middle" fill="#2A2E33" fontSize="11" fontWeight="600" fontFamily="sans-serif">DATA</text>
          <text y="10" textAnchor="middle" fill="#A98533" fontSize="9" fontWeight="500" fontFamily="sans-serif">INGESTION</text>
          <motion.circle r="48" fill="none" stroke="#C8A65A" strokeWidth="1" strokeDasharray="3 9" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
        </g>

        {/* Node 2: Neural Core & Analytics */}
        <g transform="translate(400, 160)">
          <circle r="56" fill="rgba(255, 255, 255, 0.95)" stroke="#C8A65A" strokeWidth="2" filter="url(#wfGlow)" />
          <circle r="46" fill="rgba(200, 166, 90, 0.08)" />
          <text y="-8" textAnchor="middle" fill="#2A2E33" fontSize="12" fontWeight="700" fontFamily="sans-serif">AI NEURAL</text>
          <text y="10" textAnchor="middle" fill="#C8A65A" fontSize="10" fontWeight="600" fontFamily="sans-serif">ENGINE</text>
          <motion.circle r="62" fill="none" stroke="#D4B76E" strokeWidth="1.5" strokeDasharray="4 8" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
        </g>

        {/* Node 3: Executive Action */}
        <g transform="translate(680, 160)">
          <circle r="44" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(200, 166, 90, 0.4)" strokeWidth="1.5" filter="url(#wfGlow)" />
          <circle r="36" fill="rgba(42, 46, 51, 0.04)" />
          <text y="-6" textAnchor="middle" fill="#2A2E33" fontSize="11" fontWeight="600" fontFamily="sans-serif">REAL-TIME</text>
          <text y="10" textAnchor="middle" fill="#A98533" fontSize="9" fontWeight="500" fontFamily="sans-serif">DECISION</text>
          <motion.circle r="48" fill="none" stroke="#C8A65A" strokeWidth="1" strokeDasharray="3 9" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} />
        </g>
      </svg>
    </div>
  );
}
