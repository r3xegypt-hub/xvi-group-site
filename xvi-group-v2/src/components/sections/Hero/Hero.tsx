// XVI GROUP — Hero Section (v4 — Premium Hero Experience)
// Cinematic composition: architectural grid, premium AI network, editorial typography, parallax

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Button } from '../../buttons/Button';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import styles from './Hero.module.scss';

// ============================================
// STATS
// ============================================

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

// ============================================
// AI NETWORK ILLUSTRATION
// ============================================

function AINetworkIllustration({ loaded }: { loaded: boolean }) {
  const nodes = [
    { x: 300, y: 150, r: 5, gold: false },
    { x: 420, y: 120, r: 4, gold: false },
    { x: 540, y: 170, r: 6, gold: false },
    { x: 240, y: 250, r: 4, gold: false },
    { x: 360, y: 240, r: 7, gold: true },  // center — gold
    { x: 480, y: 220, r: 5, gold: false },
    { x: 600, y: 260, r: 4, gold: false },
    { x: 200, y: 350, r: 3, gold: false },
    { x: 320, y: 340, r: 5, gold: false },
    { x: 440, y: 330, r: 6, gold: false },
    { x: 560, y: 350, r: 4, gold: false },
    { x: 660, y: 310, r: 3, gold: false },
    { x: 180, y: 180, r: 3, gold: false },
    { x: 640, y: 190, r: 3, gold: false },
    { x: 380, y: 420, r: 4, gold: false },
    { x: 520, y: 400, r: 3, gold: false },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [2, 6],
    [3, 4], [4, 5], [5, 6], [3, 7], [4, 8], [5, 9],
    [6, 10], [6, 11], [0, 12], [12, 3], [2, 13], [13, 6],
    [8, 9], [9, 10], [7, 8], [4, 14], [9, 14], [9, 15],
    [14, 15], [8, 14], [10, 15],
    [3, 0], [4, 1], [5, 2], [8, 4], [14, 4],
  ];

  const dataStreams = [
    { x1: 100, y1: 160, x2: 200, y2: 180, dur: '3.5s' },
    { x1: 100, y1: 260, x2: 200, y2: 250, dur: '4s' },
    { x1: 100, y1: 360, x2: 180, y2: 350, dur: '3s' },
    { x1: 700, y1: 200, x2: 640, y2: 190, dur: '4.5s' },
    { x1: 700, y1: 300, x2: 660, y2: 310, dur: '3.8s' },
  ];

  return (
    <svg className={styles.aiSvg} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      {/* Subtle radial gradient background */}
      <defs>
        <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Ambient glow behind center */}
      <circle cx="360" cy="240" r="180" fill="url(#aiGlow)" />

      {/* Data streams — animated dashed lines */}
      {dataStreams.map((s, i) => (
        <line
          key={`stream-${i}`}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="#C9A96E" strokeWidth="0.8" opacity="0.15"
          strokeDasharray="8 12"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="80;0"
            dur={s.dur}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <line
          key={`conn-${i}`}
          x1={nodes[from].x} y1={nodes[from].y}
          x2={nodes[to].x} y2={nodes[to].y}
          stroke="#0A1628"
          strokeWidth="0.6"
          opacity="0.06"
        >
          <animate
            attributeName="opacity"
            values="0.03;0.10;0.03"
            dur={`${3 + (i % 4) * 0.5}s`}
            repeatCount="indefinite"
            begin={`${i * 0.12}s`}
          />
        </line>
      ))}

      {/* Glowing connection lines from/to center gold node */}
      {connections
        .filter(([f, t]) => f === 4 || t === 4)
        .map(([from, to], i) => (
          <line
            key={`gold-conn-${i}`}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke="#C9A96E"
            strokeWidth="0.8"
            opacity="0.12"
          >
            <animate
              attributeName="opacity"
              values="0.06;0.20;0.06"
              dur={`${2.5 + i * 0.3}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </line>
        ))}

      {/* Nodes — diamond shapes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          {node.gold ? (
            <>
              {/* Gold node — larger, with glow */}
              <circle
                cx={node.x} cy={node.y} r={node.r * 3}
                fill="#C9A96E" opacity="0.06"
                filter="url(#softGlow)"
              />
              <path
                d={`M${node.x} ${node.y - node.r} L${node.x + node.r} ${node.y} L${node.x} ${node.y + node.r} L${node.x - node.r} ${node.y} Z`}
                fill="#C9A96E" opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.35;0.6;0.35"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </>
          ) : (
            <path
              d={`M${node.x} ${node.y - node.r} L${node.x + node.r} ${node.y} L${node.x} ${node.y + node.r} L${node.x - node.r} ${node.y} Z`}
              fill="#0A1628"
              opacity="0.12"
            >
              <animate
                attributeName="opacity"
                values="0.06;0.16;0.06"
                dur={`${2.5 + (i % 5) * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.15}s`}
              />
            </path>
          )}
        </g>
      ))}

      {/* Floating geometric frames */}
      <rect
        x="220" y="100" width="60" height="60" rx="1"
        fill="none" stroke="#0A1628" strokeWidth="0.5" opacity="0.04"
        transform="rotate(45 250 130)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-8; 0,0"
          dur="10s"
          repeatCount="indefinite"
          additive="sum"
        />
      </rect>
      <rect
        x="520" y="300" width="45" height="45" rx="1"
        fill="none" stroke="#C9A96E" strokeWidth="0.4" opacity="0.05"
        transform="rotate(-30 542 322)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,6; 0,0"
          dur="9s"
          repeatCount="indefinite"
          additive="sum"
        />
      </rect>

      {/* Pulsing rings around center */}
      <circle cx="360" cy="240" r="40" fill="none" stroke="#C9A96E" strokeWidth="0.4" opacity="0.08">
        <animate attributeName="r" values="40;80;40" dur="6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.02;0.08" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="360" cy="240" r="60" fill="none" stroke="#C9A96E" strokeWidth="0.3" opacity="0.05">
        <animate attributeName="r" values="60;110;60" dur="8s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0.05;0.01;0.05" dur="8s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  );
}

// ============================================
// HERO COMPONENT
// ============================================

export function Hero() {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const isRTL = language === 'ar';

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax — 60fps with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const scrolled = -rect.top;
    // Only apply parallax when hero is in view
    if (scrolled > -window.innerHeight && scrolled < rect.height) {
      setParallaxY(scrolled * 0.3); // 30% speed
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${loaded ? styles.heroLoaded : ''} ${isRTL ? styles.heroRTL : ''}`}
      aria-label="Hero"
    >
      {/* Layer 1: Architectural Grid — parallax */}
      <div
        className={styles.layerGrid}
        aria-hidden="true"
        style={{ transform: `translateY(${parallaxY * 0.15}px)` }}
      >
        <svg className={styles.gridSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={120 * i} y1="0" x2={120 * i} y2="900"
              stroke="#0A1628" strokeWidth="0.5" opacity="0.03" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={150 * i} x2="1440" y2={150 * i}
              stroke="#0A1628" strokeWidth="0.5" opacity="0.02" />
          ))}
        </svg>
      </div>

      {/* Layer 2: Ambient Atmosphere — parallax */}
      <div
        className={styles.layerAmbient}
        aria-hidden="true"
        style={{ transform: `translateY(${parallaxY * 0.08}px)` }}
      >
        {/* Gold ambient orb */}
        <div className={styles.goldOrb} />
        <div className={styles.goldOrbSecondary} />

        {/* Floating diamonds */}
        <div className={`${styles.floatingDiamond} ${styles.diamond1}`}>
          <svg viewBox="0 0 80 80" fill="none">
            <path d="M40 4L76 40L40 76L4 40Z" stroke="#0A1628" strokeWidth="0.8" opacity="0.06" />
          </svg>
        </div>
        <div className={`${styles.floatingDiamond} ${styles.diamond2}`}>
          <svg viewBox="0 0 60 60" fill="none">
            <path d="M30 3L57 30L30 57L3 30Z" stroke="#C9A96E" strokeWidth="0.6" opacity="0.06" />
          </svg>
        </div>
        <div className={`${styles.floatingDiamond} ${styles.diamond3}`}>
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M20 2L38 20L20 38L2 20Z" stroke="#0A1628" strokeWidth="0.5" opacity="0.04" />
          </svg>
        </div>

        {/* Particle field */}
        <svg className={styles.particleField} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={(28.8 * (i % 50) + 14)}
              cy={Math.floor(i / 50) * 900 + 450}
              r="1"
              fill="#0A1628"
              opacity="0.04"
            >
              <animate
                attributeName="opacity"
                values="0.02;0.08;0.02"
                dur={`${4 + (i % 6)}s`}
                repeatCount="indefinite"
                begin={`${(i % 7) * 0.6}s`}
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Layer 3: AI Network — parallax */}
      <div
        className={styles.layerAI}
        aria-hidden="true"
        style={{ transform: `translateY(calc(-50% + ${parallaxY * 0.2}px))` }}
      >
        <AINetworkIllustration loaded={loaded} />
      </div>

      {/* Layer 4: Content */}
      <div className={`${styles.layerContent} ${loaded ? styles.contentVisible : ''}`}>
        {/* Eyebrow */}
        <p className={styles.eyebrow}>
          {language === 'ar' ? 'استشارات استراتيجية وتكنولوجية' : 'ENTERPRISE STRATEGY & TECHNOLOGY'}
        </p>

        {/* Headline — massive editorial */}
        <h1 className={styles.headline}>
          {language === 'ar' ? (
            <>
              نصنع المؤسسات<br />
              التي <span className={styles.headlineHighlight}>تُعيد تشكيل</span><br />
              الأسواق
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
            ? 'استشارات استراتيجية وتكنولوجية للمؤسسات التي تتطلب الدقة والسرعة والتميّز التشغيلي.'
            : 'Strategy and technology advisory for enterprises that demand precision, velocity, and operational mastery.'}
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <Button variant="primary" size="lg" href="/contact">
            {language === 'ar' ? 'نبدأ الحوار' : 'Start a Conversation'}
          </Button>
          <Button variant="ghost" size="lg" href="/services">
            {language === 'ar' ? 'منهجيتنا' : 'Our Approach'}
            <span className={styles.ctaArrow}>→</span>
          </Button>
        </div>

        {/* Meridian Line */}
        <div className={styles.meridianContainer}>
          <svg className={styles.meridianLine} viewBox="0 0 480 2" fill="none" preserveAspectRatio="none">
            <line x1="0" y1="1" x2="480" y2="1" stroke="#C9A96E" strokeWidth="1.5" />
          </svg>
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
              delay={900 + i * 120}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>{language === 'ar' ? 'اكتشف' : 'Scroll'}</span>
        </div>
      </div>
    </section>
  );
}
