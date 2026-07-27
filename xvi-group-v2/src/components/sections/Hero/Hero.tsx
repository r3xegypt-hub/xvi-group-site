// XVI GROUP — Hero Section
// Cinematic 4-layer composition: Architectural grid, Gold sweep, AI data flow, Content

import { useEffect, useState } from 'react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Button } from '../../buttons/Button';
import { MeridianLine } from '../../../svg/geometry/MeridianLine';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import styles from './Hero.module.scss';

const STATS_DATA = [
  { number: 200, suffix: '+', label: 'Projects Delivered', labelAr: 'مشروع تم تسليمه' },
  { number: 4, suffix: '', label: 'Advisory Suites', labelAr: 'مجموعات الاستشارات' },
  { number: 98, suffix: '%', label: 'Client Retention', labelAr: 'الاحتفاظ بالعملاء' },
  { number: 24, suffix: '/7', label: 'Support Available', labelAr: 'دعم متاح' },
];

function StatItem({ number, suffix, label, labelAr, delay }: {
  number: number; suffix: string; label: string; labelAr: string; delay: number;
}) {
  const { language } = useLanguage();
  const { ref, display } = useCountUp({ end: number, duration: 2000, suffix, startOnView: true });

  return (
    <div ref={ref} className={styles.stat} style={{ transitionDelay: `${delay}ms` }}>
      <span className={styles.statNumber}>{display}</span>
      <span className={styles.statLabel}>{language === 'ar' ? labelAr : label}</span>
    </div>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.hero} ${loaded ? styles.heroLoaded : ''}`} aria-label="Hero">
      {/* Layer 1: Architectural Grid */}
      <div className={styles.layerGrid} aria-hidden="true">
        <svg className={styles.gridSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {/* Vertical grid lines */}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={120 * i}
              y1="0"
              x2={120 * i}
              y2="900"
              stroke="var(--color-navy)"
              strokeWidth="0.5"
              opacity="0.04"
            />
          ))}
          {/* Horizontal grid lines */}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={150 * i}
              x2="1440"
              y2={150 * i}
              stroke="var(--color-navy)"
              strokeWidth="0.5"
              opacity="0.03"
            />
          ))}
        </svg>
      </div>

      {/* Layer 2: Ambient Atmosphere */}
      <div className={styles.layerAmbient} aria-hidden="true">
        {/* Gold light sweep */}
        <div className={styles.goldSweep} />

        {/* Floating diamonds */}
        <div className={`${styles.floatingDiamond} ${styles.diamond1}`}>
          <svg viewBox="0 0 80 80" fill="none">
            <path d="M40 4L76 40L40 76L4 40Z" stroke="var(--color-navy)" strokeWidth="1" opacity="0.08" />
          </svg>
        </div>
        <div className={`${styles.floatingDiamond} ${styles.diamond2}`}>
          <svg viewBox="0 0 60 60" fill="none">
            <path d="M30 3L57 30L30 57L3 30Z" stroke="var(--color-navy)" strokeWidth="1" opacity="0.06" />
          </svg>
        </div>
        <div className={`${styles.floatingDiamond} ${styles.diamond3}`}>
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M20 2L38 20L20 38L2 20Z" stroke="var(--color-gold)" strokeWidth="1" opacity="0.08" />
          </svg>
        </div>

        {/* Particle field — subtle dots */}
        <svg className={styles.particleField} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={36 * (i % 40) + 18}
              cy={Math.floor(i / 40) * 900 + 450}
              r="1.5"
              fill="var(--color-navy)"
              opacity="0.05"
              className={styles.particle}
            >
              <animate
                attributeName="opacity"
                values="0.03;0.12;0.03"
                dur={`${3 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i % 5) * 0.8}s`}
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Layer 3: AI Data Flow */}
      <div className={styles.layerAI} aria-hidden="true">
        <svg className={styles.aiSvg} viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
          {/* Data flow streams from left */}
          <line x1="0" y1="150" x2="150" y2="200" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.12" className={styles.dataFlow}>
            <animate attributeName="stroke-dashoffset" values="200;0" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="250" x2="150" y2="260" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.08" className={styles.dataFlow}>
            <animate attributeName="stroke-dashoffset" values="200;0" dur="4s" repeatCount="indefinite" begin="0.5s" />
          </line>
          <line x1="0" y1="350" x2="150" y2="320" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.10" className={styles.dataFlow}>
            <animate attributeName="stroke-dashoffset" values="200;0" dur="3.5s" repeatCount="indefinite" begin="1s" />
          </line>

          {/* AI Node Network — 3x3 diamond grid */}
          {[
            { x: 200, y: 140 },
            { x: 300, y: 140 },
            { x: 400, y: 140 },
            { x: 200, y: 250 },
            { x: 300, y: 250 }, // center — gold
            { x: 400, y: 250 },
            { x: 200, y: 360 },
            { x: 300, y: 360 },
            { x: 400, y: 360 },
          ].map((node, i) => (
            <g key={i}>
              {/* Diamond node */}
              <path
                d={`M${node.x} ${node.y - 8} L${node.x + 8} ${node.y} L${node.x} ${node.y + 8} L${node.x - 8} ${node.y} Z`}
                fill={i === 4 ? 'var(--color-gold)' : 'var(--color-navy)'}
                opacity={i === 4 ? 0.35 : 0.15}
                className={styles.aiNode}
              >
                <animate
                  attributeName="opacity"
                  values={i === 4 ? '0.25;0.4;0.25' : '0.10;0.18;0.10'}
                  dur={`${2.5 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.15}s`}
                />
              </path>
            </g>
          ))}

          {/* Connection lines between nodes */}
          {[
            [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], // horizontal
            [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], // vertical
            [0, 4], [2, 4], [6, 4], [8, 4], // diagonal to center
          ].map(([from, to], i) => {
            const nodes = [
              { x: 200, y: 140 }, { x: 300, y: 140 }, { x: 400, y: 140 },
              { x: 200, y: 250 }, { x: 300, y: 250 }, { x: 400, y: 250 },
              { x: 200, y: 360 }, { x: 300, y: 360 }, { x: 400, y: 360 },
            ];
            return (
              <line
                key={i}
                x1={nodes[from].x}
                y1={nodes[from].y}
                x2={nodes[to].x}
                y2={nodes[to].y}
                stroke="var(--color-navy)"
                strokeWidth="0.8"
                opacity="0.08"
                className={styles.aiConnection}
              >
                <animate
                  attributeName="opacity"
                  values="0.04;0.12;0.04"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.2}s`}
                />
              </line>
            );
          })}

          {/* Floating geometric frames */}
          <rect
            x="160" y="100" width="80" height="80"
            rx="2"
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="0.8"
            opacity="0.06"
            transform="rotate(5 200 140)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-6; 0,0"
              dur="8s"
              repeatCount="indefinite"
              additive="sum"
            />
          </rect>
          <rect
            x="380" y="320" width="60" height="60"
            rx="2"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="0.6"
            opacity="0.06"
            transform="rotate(-3 410 350)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,5; 0,0"
              dur="7s"
              repeatCount="indefinite"
              additive="sum"
            />
          </rect>
        </svg>
      </div>

      {/* Layer 4: Content */}
      <div className={`${styles.layerContent} ${loaded ? styles.contentVisible : ''}`}>
        {/* Eyebrow */}
        <p className={styles.eyebrow}>
          {language === 'ar' ? 'استشارات استراتيجية وتكنولوجية' : 'ENTERPRISE STRATEGY & TECHNOLOGY'}
        </p>

        {/* Headline */}
        <h1 className={styles.headline}>
          {language === 'ar' ? (
            <>
              بناء مؤسسات<br />
              تحرّك الأسواق
            </>
          ) : (
            <>
              Building Enterprises<br />
              That <span className={styles.headlineHighlight}>Move Markets</span>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className={styles.subheadline}>
          {language === 'ar'
            ? 'استشارات استراتيجية وتكنولوجية للمؤسسات التي تطلب الدقة والسرعة والتميز التشغيلي.'
            : 'Strategy and technology advisory for enterprises that demand precision, velocity, and operational mastery.'}
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <Button variant="primary" size="lg" href="/contact">
            {language === 'ar' ? 'ابدأ محادثة' : 'Start a Conversation'}
          </Button>
          <Button variant="ghost" size="lg" href="/services">
            {language === 'ar' ? 'approachالمنهجية' : 'Our Approach'}
            <span className={styles.ctaArrow}>→</span>
          </Button>
        </div>

        {/* Meridian Line */}
        <div className={styles.meridianContainer}>
          <MeridianLine variant="gold" width="100%" height={2} className={styles.meridianLine} />
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {STATS_DATA.map((stat, i) => (
            <StatItem
              key={i}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              labelAr={stat.labelAr}
              delay={1100 + i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
