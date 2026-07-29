import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease,
      delay: i * 0.04,
    },
  }),
};

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'span';
}

export function TextReveal({ text, className, as: Tag = 'p' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const words = text.split(' ');

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <Tag style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}
