import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
  glassIntensity?: 'light' | 'medium' | 'heavy';
}

export function PremiumCard({
  children,
  className,
  delay = 0,
  hoverScale = true,
  glassIntensity = 'medium',
}: PremiumCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const glassBg = glassIntensity === 'light'
    ? 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))'
    : glassIntensity === 'heavy'
      ? 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.65))';

  const handleEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease, delay }}
      whileHover={hoverScale ? { y: -6 } : undefined}
      style={{
        position: 'relative',
        background: glassBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(200,166,90,0.08)',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.4s ease',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? '0 20px 60px rgba(200,166,90,0.08), 0 8px 24px rgba(17,17,17,0.04), inset 0 1px 0 rgba(200,166,90,0.06)'
          : '0 0 0 rgba(200,166,90,0), inset 0 1px 0 rgba(200,166,90,0.03)',
        borderColor: hovered ? 'rgba(200,166,90,0.2)' : 'rgba(200,166,90,0.06)',
      }}
    >
      {/* Top gold accent line */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,166,90,0.15) 20%, rgba(200,166,90,0.3) 50%, rgba(200,166,90,0.15) 80%, transparent 100%)',
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Hover gold glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(200,166,90,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Inner glass reflection */}
      <motion.div
        style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '50%',
          background: 'radial-gradient(ellipse at top right, rgba(200,166,90,0.03), transparent)',
          opacity: hovered ? 1 : 0.2,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom subtle reflection */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, rgba(200,166,90,0.02), transparent)',
        pointerEvents: 'none',
      }} />

      {children}
    </motion.div>
  );
}

export function PremiumCardIcon({ icon: Icon, className }: { icon: React.ComponentType<{ size?: number }>; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? { scale: 1.08, color: '#C8A65A' } : { scale: 1, color: '#C8A65A' }}
      transition={{ duration: 0.3, ease }}
      style={{
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(200,166,90,0.06)',
        border: '1px solid rgba(200,166,90,0.1)',
        flexShrink: 0,
        position: 'relative',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Icon size={20} />
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: -1,
            border: '1px solid rgba(200,166,90,0.25)',
            background: 'radial-gradient(circle at center, rgba(200,166,90,0.04), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}