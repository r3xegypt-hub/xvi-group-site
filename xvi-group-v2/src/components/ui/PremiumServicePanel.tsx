import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];

interface PremiumServicePanelProps {
  index: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
  color?: string;
  tag?: string;
  visual?: React.ReactNode;
  delay?: number;
}

export function PremiumServicePanel({
  index, title, desc, icon: Icon, color = '#C8A65A',
  tag, visual, delay = 0,
}: PremiumServicePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 25 });
  const springY = useSpring(y, { stiffness: 250, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease, delay }}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${hovered ? 'rgba(200,166,90,0.2)' : 'rgba(200,166,90,0.06)'}`,
        borderRadius: 0,
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: 800,
        rotateX,
        rotateY,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        boxShadow: hovered
          ? '0 12px 48px rgba(200,166,90,0.06), 0 2px 8px rgba(17,17,17,0.03)'
          : '0 0 0 rgba(200,166,90,0)',
        cursor: 'default',
      }}
    >
      {/* Light sweep */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(200,166,90,0.04) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Top border glow */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.3), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Glass reflection */}
      <motion.div
        style={{
          position: 'absolute', top: 0, right: 0, width: '30%', height: '40%',
          background: 'radial-gradient(ellipse at top right, rgba(200,166,90,0.03), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16,
        transform: 'translateZ(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif", fontSize: '2.5rem',
            fontWeight: 400, lineHeight: 1, opacity: 0.08, color,
          }}>
            {index}
          </span>
          {tag && (
            <span style={{
              fontFamily: "'Manrope', sans-serif", fontSize: '0.5rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '4px 10px', background: `${color}08`, color,
              border: `1px solid ${color}10`,
            }}>
              {tag}
            </span>
          )}
        </div>

        {visual && <div style={{ margin: '4px 0' }}>{visual}</div>}

        <div style={{
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${color}06`, border: `1px solid ${color}0c`,
          color,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          ...(hovered ? { background: `${color}0c`, borderColor: `${color}18` } : {}),
        } as React.CSSProperties}>
          <motion.div
            animate={hovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, ease }}
          >
            <Icon size={20} />
          </motion.div>
        </div>

        <h3 style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '1.375rem',
          fontWeight: 400, color: '#3F4348', margin: 0,
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem',
          lineHeight: 1.7, color: '#676B70', margin: 0, maxWidth: 480,
        }}>
          {desc}
        </p>

        <motion.span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Manrope', sans-serif", fontSize: '0.8125rem',
            fontWeight: 500, color, textDecoration: 'none', marginTop: 4,
            transition: 'gap 0.3s ease',
          }}
          animate={hovered ? { gap: 12 } : { gap: 8 }}
        >
          Explore Service
          <ArrowUpRight size={14} />
        </motion.span>
      </div>
    </motion.div>
  );
}
