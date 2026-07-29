import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface SectionSeparatorProps {
  className?: string;
  variant?: 'line' | 'fade' | 'gold-bar' | 'arch';
}

export function SectionSeparator({ className, variant = 'line' }: SectionSeparatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  if (variant === 'gold-bar') {
    return (
      <div ref={ref} className={className} aria-hidden="true" style={{ position: 'relative', height: 80, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #C8A65A, transparent)',
            scaleX,
            opacity,
            transformOrigin: 'center',
          }}
        />
      </div>
    );
  }

  if (variant === 'arch') {
    return (
      <div ref={ref} className={className} aria-hidden="true" style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ opacity }}
        >
          <motion.path
            d="M0,120 Q360,0 720,60 Q1080,120 1440,40"
            fill="none"
            stroke="#C8A65A"
            strokeWidth="0.5"
            strokeOpacity={0.3}
            pathLength={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
          />
        </motion.svg>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true" style={{ position: 'relative', height: 60, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        style={{
          width: '30%',
          height: 1,
          background: 'rgba(17, 17, 17, 0.06)',
          scaleX,
          opacity,
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
