import { useState } from 'react';
import { motion } from 'framer-motion';

interface XVILogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animated?: boolean;
  variant?: 'full' | 'icon';
}

export function XVILogo({
  className = '',
  size = 36,
  showText = true,
  animated = true,
  variant = 'full',
}: XVILogoProps) {
  const [hovered, setHovered] = useState(false);

  const showWordmark = showText && variant !== 'icon';

  return (
    <div
      className={`xvi-executive-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Executive Isometric Shield Emblem */}
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* Primary gold gradient */}
            <linearGradient id="xviGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#F5E4B5" />
              <stop offset="55%" stopColor="#C8A65A" />
              <stop offset="80%" stopColor="#9E7A35" />
              <stop offset="100%" stopColor="#6B4F1E" />
            </linearGradient>

            {/* Secondary bevel gradient */}
            <linearGradient id="xviGoldBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EED9A1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8C6E2E" stopOpacity="0.6" />
            </linearGradient>

            {/* Outer glow filter */}
            <filter id="xviShieldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Inner nucleus glow */}
            <filter id="xviNucleus" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Clip for path animation */}
            <clipPath id="shieldClip">
              <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" />
            </clipPath>
          </defs>

          {/* ── Outer hex shield — shadow base ── */}
          <polygon
            points="50,3 95,25 95,75 50,97 5,75 5,25"
            fill="rgba(8, 8, 10, 0.85)"
            stroke="rgba(200,166,90,0.12)"
            strokeWidth="1"
          />

          {/* ── Outer hex shield — gold border ── */}
          <motion.polygon
            points="50,3 95,25 95,75 50,97 5,75 5,25"
            stroke="url(#xviGoldMain)"
            strokeWidth="2"
            strokeOpacity={hovered ? 1 : 0.55}
            fill="none"
            filter="url(#xviShieldGlow)"
            animate={{ strokeOpacity: hovered ? 1 : 0.55 }}
            transition={{ duration: 0.4 }}
          />

          {/* ── Inner hex frame ── */}
          <polygon
            points="50,14 84,33 84,67 50,86 16,67 16,33"
            stroke="url(#xviGoldBevel)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* ── Background depth fill ── */}
          <polygon
            points="50,14 84,33 84,67 50,86 16,67 16,33"
            fill="rgba(15,16,20,0.7)"
          />

          {/* ══ ROMAN XVI LETTERFORM ══ */}
          {/* X left-arm top-to-center */}
          <motion.line
            x1="30" y1="32" x2="50" y2="50"
            stroke="url(#xviGoldMain)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#xviShieldGlow)"
            strokeDasharray={hovered ? "28 0" : "28 28"}
            animate={{ strokeDashoffset: hovered ? 0 : 28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* X right-arm top-to-center */}
          <motion.line
            x1="70" y1="32" x2="50" y2="50"
            stroke="url(#xviGoldMain)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#xviShieldGlow)"
            strokeDasharray={hovered ? "28 0" : "28 28"}
            animate={{ strokeDashoffset: hovered ? 0 : 28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          />
          {/* X left-arm center-to-bottom */}
          <motion.line
            x1="50" y1="50" x2="30" y2="68"
            stroke="url(#xviGoldMain)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#xviShieldGlow)"
            strokeDasharray={hovered ? "28 0" : "28 28"}
            animate={{ strokeDashoffset: hovered ? 0 : 28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
          {/* X right-arm center-to-bottom */}
          <motion.line
            x1="50" y1="50" x2="70" y2="68"
            stroke="url(#xviGoldMain)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#xviShieldGlow)"
            strokeDasharray={hovered ? "28 0" : "28 28"}
            animate={{ strokeDashoffset: hovered ? 0 : 28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />

          {/* V chevron — crown of the shield */}
          <motion.path
            d="M 30 28 L 50 20 L 70 28"
            stroke="url(#xviGoldMain)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#xviShieldGlow)"
            animate={{ opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.4 }}
          />

          {/* ── Central Intelligence Nucleus ── */}
          <circle
            cx="50"
            cy="50"
            r="5"
            fill="#FFFFFF"
            filter="url(#xviNucleus)"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.95))' }}
          />
          <circle
            cx="50"
            cy="50"
            r="3"
            fill="#F5E4B5"
          />

          {/* ── Animated pulse rings ── */}
          {animated && (
            <>
              <motion.circle
                cx="50"
                cy="50"
                r="13"
                stroke="#C8A65A"
                strokeWidth="0.6"
                fill="none"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="10"
                stroke="#EED9A1"
                strokeWidth="0.4"
                fill="none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
            </>
          )}

          {/* ── Hover: corner sparkle nodes ── */}
          {['50,3', '95,25', '95,75', '50,97', '5,75', '5,25'].map((pt, i) => {
            const [cx, cy] = pt.split(',').map(Number);
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="1.5"
                fill="#C8A65A"
                animate={{ opacity: hovered ? 1 : 0.3, scale: hovered ? 1.5 : 1 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Typography wordmark */}
      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <motion.span
            style={{
              fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
              fontSize: size * 0.42,
              fontWeight: 800,
              letterSpacing: '0.14em',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #EED9A1 45%, #C8A65A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
            }}
            animate={{ opacity: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            XVI Group
          </motion.span>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: size * 0.19,
              fontWeight: 600,
              letterSpacing: '0.36em',
              color: '#7A7A74',
              textTransform: 'uppercase',
            }}
          >
            Intelligent Enterprise
          </span>
        </div>
      )}
    </div>
  );
}
