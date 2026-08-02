import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useMotion } from '../../../motion/providers/MotionProvider';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import { TiltCard } from '../../../motion/TiltCard';
import styles from './MetricsStrip.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface MetricDef {
  id: string;
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: { en: string; ar: string };
}

const METRICS: MetricDef[] = [
  {
    id: 'years',
    end: 14,
    suffix: '+',
    label: { en: 'Years of executive transformation', ar: 'عاماً من التحول التنفيذي' },
  },
  {
    id: 'value',
    end: 24,
    decimals: 1,
    prefix: '$',
    suffix: 'B',
    label: { en: 'Client value created', ar: 'قيمة عملاء مولّدة' },
  },
  {
    id: 'programs',
    end: 40,
    suffix: '+',
    label: { en: 'National programs delivered', ar: 'برنامجاً وطنياً منفّذاً' },
  },
  {
    id: 'repeat',
    end: 92,
    suffix: '%',
    label: { en: 'Repeat client rate', ar: 'معدل العملاء المتكررين' },
  },
];

function Metric({ def, reduced, index }: { def: MetricDef; reduced: boolean; index: number }) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const { ref, count } = useCountUp({ end: def.end, startOnView: !reduced, duration: 2200 });
  const value = reduced ? def.end : count;

  const display = useMemo(() => {
    if (def.decimals) return (value / Math.pow(10, def.decimals)).toFixed(def.decimals);
    return String(value);
  }, [value, def.decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: reduced ? 0 : 0.65, ease, delay: index * 0.1 }}
    >
      <TiltCard tiltDegree={8} glare={true} depthOffset={18}>
        <div className={styles.metric}>
          <span className={styles.value}>
            {def.prefix && <span className={styles.prefix}>{def.prefix}</span>}
            {display}
            {def.suffix && <span className={styles.suffix}>{def.suffix}</span>}
          </span>
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.label}>{ar ? def.label.ar : def.label.en}</span>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function MetricsStrip() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const { prefersReducedMotion } = useMotion();
  const reduced = prefersReducedMotion;

  return (
    <section className={styles.section} aria-label={ar ? 'مؤشرات الأداء' : 'Performance metrics'}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className={styles.eyebrow}>{ar ? 'الأثر بالأرقام' : 'IMPACT IN NUMBERS'}</span>
          <span className={styles.tagline}>
            {ar ? 'نتائج قابلة للقياس عبر كل تكليف.' : 'Measured results across every mandate.'}
          </span>
        </motion.div>
        <div className={styles.grid}>
          {METRICS.map((m, idx) => (
            <Metric key={m.id} def={m} reduced={reduced} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

