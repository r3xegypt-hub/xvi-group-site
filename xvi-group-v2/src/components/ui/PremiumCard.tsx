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
    ? 'rgba(255,255,255,0.5)'
    : glassIntensity === 'heavy'
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(255,255,255,0.72)';

  const handleEnter = useCallback(() => {
    setHovered(true);
    const el = ref.current as HTMLDivElement | null;
    if (el) {
      el.style.borderColor = 'rgba(200,166,90,0.25)';
      el.style.boxShadow = '0 8px 40px rgba(200,166,90,0.06), 0 2px 10px rgba(17,17,17,0.03)';
    }
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    const el = ref.current as HTMLDivElement | null;
    if (el) {
      el.style.borderColor = 'rgba(200,166,90,0.08)';
      el.style.boxShadow = 'none';
    }
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
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(200,166,90,0.08)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(200,166,90,0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.2), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
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
      }}
    >
      <Icon size={20} />
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: -1,
            border: '1px solid rgba(200,166,90,0.2)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
