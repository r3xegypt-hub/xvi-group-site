import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

export function LuxuryLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="luxury-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#F7F6F3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 32 }}>
            <motion.line
              x1="40" y1="5" x2="40" y2="75"
              stroke="#C8A65A"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease }}
            />
            <motion.line
              x1="5" y1="40" x2="75" y2="40"
              stroke="#C8A65A"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            />
            <motion.circle
              cx="40" cy="40" r="4"
              fill="#C8A65A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease, delay: 0.5 }}
            />
            <motion.circle
              cx="40" cy="40" r="16"
              fill="none"
              stroke="#C8A65A"
              strokeWidth="0.3"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
              transition={{ duration: 1.5, ease, delay: 0.6, repeat: Infinity }}
            />
            <motion.circle
              cx="40" cy="40" r="28"
              fill="none"
              stroke="#C8A65A"
              strokeWidth="0.2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.3, opacity: [0, 0.1, 0] }}
              transition={{ duration: 2, ease, delay: 0.8, repeat: Infinity }}
            />
          </svg>

          <motion.p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.5rem',
              color: '#111111',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
          >
            XVI GROUP
          </motion.p>

          <div
            style={{
              marginTop: 24,
              width: 120,
              height: 1,
              background: 'rgba(17, 17, 17, 0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: '#C8A65A',
                transformOrigin: 'left',
              }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
