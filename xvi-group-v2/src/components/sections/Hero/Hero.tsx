// XVI GROUP — Hero Section (Sprint 01)
// Editorial executive hero — animated illustration, particles, ambient light

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Button } from '../../buttons/Button';
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
  const { ref, display } = useCountUp({ end: number, duration: 2200, suffix, startOnView: true });

  return (
    <div ref={ref} className={styles.stat} style={{ transitionDelay: `${delay}ms` }}>
      <span className={styles.statNumber}>{display}</span>
      <span className={styles.statLabel}>{language === 'ar' ? labelAr : label}</span>
    </div>
  );
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const count = 48;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      speed: 0.00015 + Math.random() * 0.00025,
      phase: i * 0.4,
      gold: i % 7 === 0,
    }));

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      frame++;

      particles.forEach((p) => {
        const y = (p.y + frame * p.speed + Math.sin(frame * 0.008 + p.phase) * 0.02) % 1;
        const x = p.x + Math.cos(frame * 0.006 + p.phase) * 0.008;
        ctx.beginPath();
        ctx.arc(x * w, y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? 'rgba(201, 169, 110, 0.35)' : 'rgba(10, 22, 40, 0.08)';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reduced.matches) draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
}

function ExecutiveIllustration({ active }: { active: boolean }) {
  const nodes = useMemo(() => [
    { cx: 180, cy: 120, r: 4 }, { cx: 280, cy: 90, r: 5 }, { cx: 380, cy: 130, r: 4 },
    { cx: 480, cy: 100, r: 6 }, { cx: 560, cy: 160, r: 4 }, { cx: 140, cy: 220, r: 3 },
    { cx: 240, cy: 240, r: 7, gold: true }, { cx: 340, cy: 210, r: 5 }, { cx: 440, cy: 250, r: 4 },
    { cx: 540, cy: 280, r: 5 }, { cx: 620, cy: 220, r: 3 }, { cx: 200, cy: 340, r: 4 },
    { cx: 300, cy: 360, r: 6 }, { cx: 420, cy: 340, r: 4 }, { cx: 520, cy: 380, r: 3 },
  ], []);

  const edges = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 4],
    [5, 11], [11, 12], [12, 13], [13, 14], [8, 13], [6, 12], [1, 7], [3, 9], [10, 9], [10, 4],
  ], []);

  return (
    <svg
      className={`${styles.illustrationSvg} ${active ? styles.illustrationActive : ''}`}
      viewBox="0 0 720 480"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlow" cx="45%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0" />
          <stop offset="50%" stopColor="#C9A96E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="340" cy="240" rx="280" ry="200" fill="url(#heroGlow)" />

      {/* Architectural frame */}
      <rect x="60" y="40" width="600" height="400" rx="2" stroke="#0A1628" strokeWidth="0.75" opacity="0.06" className={styles.drawPath} />
      <line x1="60" y1="240" x2="660" y2="240" stroke="#C9A96E" strokeWidth="0.5" opacity="0.15" />
      <line x1="360" y1="40" x2="360" y2="440" stroke="#C9A96E" strokeWidth="0.5" opacity="0.1" />

      {/* Orbital rings */}
      <circle cx="340" cy="240" r="120" stroke="#C9A96E" strokeWidth="0.6" opacity="0.12" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from="0 340 240" to="360 340 240" dur="48s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="240" r="170" stroke="#0A1628" strokeWidth="0.5" opacity="0.06" strokeDasharray="2 12">
        <animateTransform attributeName="transform" type="rotate" from="360 340 240" to="0 340 240" dur="64s" repeatCount="indefinite" />
      </circle>

      {/* Data beams */}
      {[0, 1, 2].map((i) => (
        <line key={`beam-${i}`} x1="80" y1={140 + i * 80} x2="620" y2={140 + i * 80} stroke="url(#beamGrad)" strokeWidth="0.8" opacity="0.2">
          <animate attributeName="opacity" values="0.05;0.25;0.05" dur={`${4 + i}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
        </line>
      ))}

      {/* Network edges */}
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={a === 6 || b === 6 ? '#C9A96E' : '#0A1628'}
          strokeWidth={a === 6 || b === 6 ? 0.8 : 0.5}
          opacity={a === 6 || b === 6 ? 0.2 : 0.07}
          className={styles.networkLine}
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          {'gold' in n && n.gold ? (
            <>
              <circle cx={n.cx} cy={n.cy} r={n.r * 4} fill="#C9A96E" opacity="0.06" filter="url(#glow)" />
              <circle cx={n.cx} cy={n.cy} r={n.r} fill="#C9A96E" opacity="0.7">
                <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </>
          ) : (
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="#0A1628" opacity="0.14">
              <animate attributeName="opacity" values="0.08;0.2;0.08" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" begin={`${i * 0.1}s`} />
            </circle>
          )}
        </g>
      ))}

      {/* Meridian mark accent */}
      <g transform="translate(580, 60)" opacity="0.5">
        <rect x="0" y="0" width="48" height="48" rx="4" stroke="#0A1628" strokeWidth="1" />
        <line x1="0" y1="24" x2="48" y2="24" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M12 36 L24 12 L36 36" stroke="#0A1628" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const isRTL = language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const scrolled = -rect.top;
    if (scrolled > -window.innerHeight && scrolled < rect.height) {
      setParallaxY(scrolled * 0.28);
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
      className={`${styles.hero} ${loaded ? styles.heroLoaded : ''} ${isRTL ? styles.heroRTL : styles.heroLTR}`}
      aria-label="Hero"
    >
      <div className={styles.ambientLayer} aria-hidden="true">
        <div className={styles.lightOrb1} style={{ transform: `translateY(${parallaxY * 0.12}px)` }} />
        <div className={styles.lightOrb2} style={{ transform: `translateY(${parallaxY * 0.08}px)` }} />
        <div className={styles.lightBeam} />
        <HeroParticles />
      </div>

      <div className={styles.gridLayer} aria-hidden="true" style={{ transform: `translateY(${parallaxY * 0.06}px)` }}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={styles.gridSvg}>
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`v${i}`} x1={96 * i} y1="0" x2={96 * i} y2="900" stroke="#0A1628" strokeWidth="0.5" opacity="0.035" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={112.5 * i} x2="1440" y2={112.5 * i} stroke="#0A1628" strokeWidth="0.5" opacity="0.025" />
          ))}
        </svg>
      </div>

      <div className={styles.heroGrid}>
        <div
          className={`${styles.illustrationCol} ${loaded ? styles.illustrationVisible : ''}`}
          style={{ transform: `translateY(${parallaxY * 0.18}px)` }}
          aria-hidden="true"
        >
          <ExecutiveIllustration active={loaded} />
        </div>

        <div className={`${styles.contentCol} ${loaded ? styles.contentVisible : ''}`}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {language === 'ar' ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
          </p>

          <h1 className={styles.headline}>
            {language === 'ar' ? (
              <>
                نصنع المؤسسات
                <br />
                التي <em className={styles.headlineEm}>تُعيد</em>
                <br />
                <span className={styles.headlineAccent}>تشكيل الأسواق</span>
              </>
            ) : (
              <>
                Building
                <br />
                <em className={styles.headlineEm}>Enterprises</em>
                <br />
                <span className={styles.headlineAccent}>That Move Markets</span>
              </>
            )}
          </h1>

          <p className={styles.subheadline}>
            {language === 'ar'
              ? 'شريك استراتيجي للمؤسسات التي تتطلب الدقة والسرعة والتميّز التشغيلي في عصر الذكاء الاصطناعي.'
              : 'Strategic partner to organizations that demand precision, velocity, and operational mastery in the age of intelligence.'}
          </p>

          <div className={styles.ctas}>
            <Button variant="primary" size="lg" href="/contact" className={styles.ctaPrimary}>
              {language === 'ar' ? 'نبدأ الحوار' : 'Start a Conversation'}
            </Button>
            <Button variant="ghost" size="lg" href="/services" className={styles.ctaGhost}>
              {language === 'ar' ? 'منهجيتنا' : 'Our Approach'}
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Button>
          </div>

          <div className={styles.divider}>
            <svg viewBox="0 0 520 6" preserveAspectRatio="none" className={styles.dividerSvg}>
              <path d="M0 3 H180 C195 3 205 1 220 1 H520" stroke="#C9A96E" strokeWidth="1.5" fill="none" className={styles.dividerPath} />
              <circle cx="220" cy="1" r="3" fill="#C9A96E" />
            </svg>
          </div>

          <div className={styles.stats}>
            {STATS_DATA.map((stat, i) => (
              <StatItem key={i} {...stat} delay={1000 + i * 100} />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.scrollIndicator} ${loaded ? styles.scrollVisible : ''}`}>
        <span className={styles.scrollText}>{language === 'ar' ? 'اكتشف' : 'Scroll'}</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
