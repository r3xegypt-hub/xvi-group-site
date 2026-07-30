import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface AIAvatarProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export function AIAvatar({ state }: AIAvatarProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set({ opacity: 1 });
  }, [controls]);

  const eyeOffset = state === 'thinking' ? -4 : state === 'listening' ? 0 : state === 'speaking' ? 0 : 0;
  const pupilX = state === 'thinking' ? 0 : state === 'listening' ? 2 : state === 'speaking' ? -1 : 0;

  return (
    <motion.div
      style={{
        position: 'relative', width: 80, height: 80, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      animate={
        state === 'idle' ? {
          y: [0, -3, 0],
          scale: [1, 1.01, 1],
        } : state === 'thinking' ? {
          y: 0,
          scale: [1, 1.02, 1],
        } : state === 'listening' ? {
          x: [0, 1, -1, 0],
        } : {
          y: [0, -1, 0],
        }
      }
      transition={{
        duration: state === 'idle' ? 4 : state === 'thinking' ? 2.5 : state === 'listening' ? 3 : 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Outer glow */}
      <motion.div
        style={{
          position: 'absolute', inset: -32, borderRadius: '50%',
          background: state === 'thinking'
            ? 'radial-gradient(circle, rgba(200,166,90,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(200,166,90,0.06) 0%, transparent 70%)',
        }}
        animate={{
          scale: state === 'thinking' ? [1, 1.18, 1] : [1, 1.08, 1],
          opacity: state === 'thinking' ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
        }}
        transition={{ duration: state === 'thinking' ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Holographic ring */}
      <motion.div
        style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.08)',
          boxShadow: 'inset 0 0 20px rgba(200,166,90,0.02)',
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: state === 'thinking' ? [0.3, 0.8, 0.3] : [0.15, 0.4, 0.15],
          rotate: state === 'listening' ? [0, 360] : [0, 0],
        }}
        transition={{
          scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: state === 'listening' ? { duration: 8, repeat: Infinity, ease: 'linear' } : undefined,
        }}
      />

      {/* Secondary ring */}
      <motion.div
        style={{
          position: 'absolute', inset: -16, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.04)',
        }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: state === 'listening' ? [360, 0] : [0, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          rotate: state === 'listening' ? { duration: 10, repeat: Infinity, ease: 'linear' } : undefined,
        }}
      />

      {/* Digital face */}
      <svg width={64} height={64} viewBox="0 0 64 64" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        {/* Face outline - abstract geometric */}
        <motion.rect
          x="12" y="8" width="40" height="48" rx="16"
          stroke="rgba(200,166,90,0.3)" strokeWidth="1"
          fill="rgba(200,166,90,0.02)"
          animate={{
            strokeOpacity: state === 'thinking' ? [0.3, 0.6, 0.3] : state === 'speaking' ? [0.3, 0.5, 0.3] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Eyes */}
        <motion.g
          animate={{ y: state === 'thinking' ? -2 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          {/* Left eye */}
          <motion.ellipse
            cx="24" cy="26" rx="5" ry="5.5"
            fill="rgba(200,166,90,0.12)"
            stroke="rgba(200,166,90,0.3)" strokeWidth="0.8"
            animate={{
              rx: state === 'thinking' ? 4.5 : state === 'speaking' ? 5 : 5,
              ry: state === 'thinking' ? 4 : state === 'speaking' ? 5 : 5.5,
            }}
            transition={{ duration: 0.3, ease }}
          />
          {/* Left pupil */}
          <motion.circle
            cx={23 + pupilX} cy={26 + eyeOffset} r="2"
            fill="#c8a65a"
            animate={{
              cx: [23, 24, 22, 23],
              cy: [26, 26.5, 25.5, 26],
              opacity: state === 'thinking' ? [1, 0.6, 1] : 1,
            }}
            transition={{
              duration: state === 'idle' ? 6 : state === 'thinking' ? 0.8 : 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Right eye */}
          <motion.ellipse
            cx="40" cy="26" rx="5" ry="5.5"
            fill="rgba(200,166,90,0.12)"
            stroke="rgba(200,166,90,0.3)" strokeWidth="0.8"
            animate={{
              rx: state === 'thinking' ? 4.5 : state === 'speaking' ? 5 : 5,
              ry: state === 'thinking' ? 4 : state === 'speaking' ? 5 : 5.5,
            }}
            transition={{ duration: 0.3, ease }}
          />
          {/* Right pupil */}
          <motion.circle
            cx={39 + pupilX} cy={26 + eyeOffset} r="2"
            fill="#c8a65a"
            animate={{
              cx: [39, 40, 38, 39],
              cy: [26, 26.5, 25.5, 26],
              opacity: state === 'thinking' ? [1, 0.6, 1] : 1,
            }}
            transition={{
              duration: state === 'idle' ? 5 : state === 'thinking' ? 0.7 : 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.g>

        {/* Mouth / speaking indicator */}
        {state === 'speaking' ? (
          <motion.g>
            <motion.path
              d="M24 44 Q32 48 40 44"
              stroke="rgba(200,166,90,0.5)" strokeWidth="1.2" strokeLinecap="round"
              fill="none"
              animate={{ d: ['M24 44 Q32 48 40 44', 'M24 42 Q32 46 40 42', 'M24 44 Q32 48 40 44'] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Voice particles */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={26 + i * 6} cy={48 + i * 2}
                r="1"
                fill="#c8a65a"
                animate={{
                  y: [0, -4 - i * 2, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 0.6 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.12,
                }}
              />
            ))}
          </motion.g>
        ) : state === 'thinking' ? (
          <motion.circle cx="32" cy="44" r="2" fill="rgba(200,166,90,0.3)" />
        ) : (
          <motion.path
            d="M26 44 Q32 46 38 44"
            stroke="rgba(200,166,90,0.2)" strokeWidth="0.8" strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Scanning line */}
        <motion.rect
          x="14" y="8" width="36" height="1"
          fill="rgba(200,166,90,0.15)"
          animate={{ y: state === 'thinking' ? [0, 46, 0] : [0, 46, 0] }}
          transition={{
            duration: state === 'thinking' ? 2 : 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Tech grid lines */}
        <line x1="32" y1="10" x2="32" y2="54" stroke="rgba(200,166,90,0.04)" strokeWidth="0.5" />
        <line x1="14" y1="32" x2="50" y2="32" stroke="rgba(200,166,90,0.04)" strokeWidth="0.5" />
      </svg>

      {/* Data particles */}
      {state === 'thinking' && [0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', width: 2, height: 2,
            background: '#c8a65a', borderRadius: '50%',
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)],
            y: [0, -(16 + i * 6)],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 1.2 + i * 0.2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
