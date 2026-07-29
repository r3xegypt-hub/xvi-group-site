import { motion } from 'framer-motion';

export function EditorialHeroVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Deep glow backdrop */}
      <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(200,166,90,0.06), transparent 70%)', pointerEvents: 'none' }} />

      {/* Main Meridian Mark — large geometric X */}
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" style={{ position: 'relative', zIndex: 2 }}>
        <motion.line
          x1="50" y1="50" x2="350" y2="350"
          stroke="#C8A65A" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        <motion.line
          x1="350" y1="50" x2="50" y2="350"
          stroke="#C8A65A" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />
        <motion.circle cx="200" cy="200" r="6" fill="#C8A65A" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.8 }} />
        <motion.circle cx="200" cy="200" r="20" fill="none" stroke="#C8A65A" strokeWidth="0.3" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.5, opacity: [0, 0.2, 0] }} transition={{ duration: 2, ease: 'easeInOut', delay: 0.8, repeat: Infinity }} />

        {/* Architectural frame */}
        <motion.rect x="60" y="60" width="280" height="280" rx="2" stroke="#C8A65A" strokeWidth="0.3" strokeOpacity={0.2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
        <motion.rect x="80" y="80" width="240" height="240" rx="2" stroke="#C8A65A" strokeWidth="0.2" strokeOpacity={0.15} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />

        {/* Grid lines */}
        {[120, 160, 200, 240, 280].map((y, i) => (
          <motion.line key={`h${i}`} x1="60" y1={y} x2="340" y2={y} stroke="#C8A65A" strokeWidth="0.2" strokeOpacity={0.1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }} />
        ))}
        {[120, 160, 200, 240, 280].map((x, i) => (
          <motion.line key={`v${i}`} x1={x} y1="60" x2={x} y2="340" stroke="#C8A65A" strokeWidth="0.2" strokeOpacity={0.1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }} />
        ))}

        {/* Floating geometric accents */}
        <motion.circle cx="100" cy="100" r="3" fill="#C8A65A" fillOpacity={0.4} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="300" cy="120" r="2" fill="#C8A65A" fillOpacity={0.3} animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
        <motion.circle cx="140" cy="300" r="4" fill="#C8A65A" fillOpacity={0.2} animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} />
        <motion.circle cx="280" cy="280" r="2.5" fill="#C8A65A" fillOpacity={0.35} animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }} />

        {/* Diamond accents */}
        <motion.polygon points="200,70 215,100 200,130 185,100" fill="none" stroke="#C8A65A" strokeWidth="0.5" strokeOpacity={0.3} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 1 }} />
        <motion.polygon points="310,200 325,215 310,230 295,215" fill="none" stroke="#C8A65A" strokeWidth="0.4" strokeOpacity={0.2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 1.2 }} />
      </svg>

      {/* Outer ring glow */}
      <motion.div
        style={{
          position: 'absolute', width: 320, height: 320, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.06)',
          pointerEvents: 'none', zIndex: 1,
        }}
        animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.03)',
          pointerEvents: 'none', zIndex: 1,
        }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
