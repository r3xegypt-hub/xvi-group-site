import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useMotion } from '../../../motion/providers/MotionProvider';
import styles from './ExecutiveGlobe.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface IndustryNode {
  id: string;
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  solution: { en: string; ar: string };
  to: string;
}

const NODES: IndustryNode[] = [
  {
    id: 'healthcare',
    name: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    desc: {
      en: 'Improve patient outcomes with clinical intelligence and regulatory-ready AI.',
      ar: 'تحسين نتائج المرضى بذكاء سريري وذكاء اصطناعي متوافق مع اللوائح.',
    },
    solution: { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
  },
  {
    id: 'construction',
    name: { en: 'Construction', ar: 'الإنشاءات' },
    desc: {
      en: 'Deliver projects on time and budget with AI-driven schedule and risk intelligence.',
      ar: 'تنفيذ المشاريع في موعدها وميزانيتها بذكاء جدولة ومخاطر مدعوم بالذكاء الاصطناعي.',
    },
    solution: { en: 'Business Consulting', ar: 'الاستشارات الاستراتيجية' },
    to: '/services/business-consulting',
  },
  {
    id: 'retail',
    name: { en: 'Retail', ar: 'التجزئة' },
    desc: {
      en: 'Elevate every touchpoint with hyper-personalized, commerce-ready AI.',
      ar: 'الارتقاء بكل نقطة تواصل مع تجزئة مفرطة التخصيص جاهزة للتجارة.',
    },
    solution: { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
  },
  {
    id: 'manufacturing',
    name: { en: 'Manufacturing', ar: 'التصنيع' },
    desc: {
      en: 'Turn machine data into operational advantage with industrial AI.',
      ar: 'تحويل بيانات الآلات إلى ميزة تشغيلية بالذكاء الاصطناعي الصناعي.',
    },
    solution: { en: 'Technology Consulting', ar: 'الاستشارات التقنية' },
    to: '/services/technology-consulting',
  },
  {
    id: 'government',
    name: { en: 'Government', ar: 'الحكومة' },
    desc: {
      en: 'Modernize citizen services with secure, data-driven governance.',
      ar: 'تحديث الخدمات الحكومية بحوكمة آمنة مبنية على البيانات.',
    },
    solution: { en: 'Business Consulting', ar: 'الاستشارات الاستراتيجية' },
    to: '/services/business-consulting',
  },
  {
    id: 'education',
    name: { en: 'Education', ar: 'التعليم' },
    desc: {
      en: 'Scale personalized learning and institutional intelligence.',
      ar: 'توسيع نطاق التعلم الشخصي والذكاء المؤسسي.',
    },
    solution: { en: 'Technology Consulting', ar: 'الاستشارات التقنية' },
    to: '/services/technology-consulting',
  },
  {
    id: 'hospitality',
    name: { en: 'Hospitality', ar: 'الضيافة' },
    desc: {
      en: 'Craft memorable guest journeys with revenue and experience intelligence.',
      ar: 'صناعة تجارب ضيوف لا تُنسى بذكاء الإيرادات والتجربة.',
    },
    solution: { en: 'AI Transformation', ar: 'التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
  },
];

const VIEW = 600;
const CENTER = VIEW / 2;
const RADIUS = 218;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const BASE_VEC = NODES.map((_, i) => {
  const y = 1 - ((i + 0.5) * 2) / NODES.length;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = i * GOLDEN_ANGLE;
  return { x: r * Math.cos(phi), y, z: r * Math.sin(phi) };
});

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [0, 2], [1, 4], [3, 6], [0, 5],
];

export function ExecutiveGlobe() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const { prefersReducedMotion } = useMotion();
  const reduced = prefersReducedMotion;
  const navigate = useNavigate();

  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const yawRef = useRef(0.55);
  const parXRef = useRef(0);
  const parYRef = useRef(0);
  const tgtXRef = useRef(0);
  const tgtYRef = useRef(0);

  const [hovered, setHovered] = useState<string>(NODES[0].id);
  const hoveredRef = useRef<string>(NODES[0].id);
  const pointerOverRef = useRef(false);

  const current = NODES.find((n) => n.id === hovered) ?? NODES[0];

  const draw = useCallback((yawA: number, pitch: number, hoveredId: string) => {
    const c = Math.cos(yawA);
    const s = Math.sin(yawA);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);

    const proj = BASE_VEC.map((v) => {
      const x1 = v.x * c + v.z * s;
      const z1 = -v.x * s + v.z * c;
      const y1 = v.y;
      const y2 = y1 * cp - z1 * sp;
      const z2 = y1 * sp + z1 * cp;
      return { x: x1, y: y2, z: z2 };
    });

    NODES.forEach((n, i) => {
      const g = nodeRefs.current[i];
      if (!g) return;
      const p = proj[i];
      const depth = (p.z + 1) / 2;
      const isHover = hoveredId === n.id;
      const scale = (0.6 + depth * 0.74) * (isHover ? 1.24 : 1);
      g.setAttribute(
        'transform',
        `translate(${(CENTER + p.x * RADIUS).toFixed(2)} ${(CENTER + p.y * RADIUS).toFixed(2)}) scale(${scale.toFixed(3)})`,
      );
      g.style.opacity = String((isHover ? Math.max(0.9, 0.35 + depth * 0.65) : 0.35 + depth * 0.65).toFixed(3));
    });

    EDGES.forEach(([a, b], ei) => {
      const path = pathRefs.current[ei];
      if (!path) return;
      const pa = proj[a];
      const pb = proj[b];
      if (pa.z < -0.05 && pb.z < -0.05) {
        path.style.opacity = '0';
        return;
      }
      const x1 = CENTER + pa.x * RADIUS;
      const y1 = CENTER + pa.y * RADIUS;
      const x2 = CENTER + pb.x * RADIUS;
      const y2 = CENTER + pb.y * RADIUS;
      path.setAttribute('d', `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}`);
      const avgZ = (pa.z + pb.z) / 2;
      path.style.opacity = String((0.1 + ((avgZ + 1) / 2) * 0.42).toFixed(3));
    });
  }, []);

  useEffect(() => {
    if (reduced) {
      draw(0.55, 0, hoveredRef.current);
      return;
    }

    let raf = 0;
    let alive = true;

    const onPointerMove = (e: PointerEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tgtXRef.current = Math.max(-1, Math.min(1, nx)) * 0.34;
      tgtYRef.current = Math.max(-1, Math.min(1, ny)) * 0.26;
    };

    const tick = () => {
      if (!alive) return;
      if (!pointerOverRef.current) yawRef.current += 0.0016;
      parXRef.current += (tgtXRef.current - parXRef.current) * 0.055;
      parYRef.current += (tgtYRef.current - parYRef.current) * 0.055;
      draw(yawRef.current + parXRef.current, parYRef.current, hoveredRef.current);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            if (!raf && alive) raf = requestAnimationFrame(tick);
          } else if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        });
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reduced, draw]);

  const selectNode = useCallback((id: string) => {
    hoveredRef.current = id;
    setHovered(id);
  }, []);

  const goTo = useCallback(
    (to: string) => {
      navigate(to);
    },
    [navigate],
  );

  const onNodeKeyDown = (e: React.KeyboardEvent, to: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goTo(to);
    }
  };

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      aria-label={ar ? 'شبكة القطاعات' : 'Industry network'}
      onMouseEnter={() => { pointerOverRef.current = true; }}
      onMouseLeave={() => { pointerOverRef.current = false; }}
      onPointerDown={() => { pointerOverRef.current = true; }}
      onPointerUp={() => { pointerOverRef.current = false; }}
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {ar ? 'شبكة القطاعات' : 'THE EXECUTIVE NETWORK'}
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {ar ? 'تجربة القطاعات التنفيذية' : 'The Executive Industry Experience'}
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {ar
              ? 'سبعة قطاعات، شبكة ذكاء واحدة. مرّر فوق أي عقدة لاكتشاف حل XVI الموصى به.'
              : 'Seven sectors. One intelligent network. Hover any node to reveal its recommended XVI solution.'}
          </motion.p>
        </div>

        <div className={styles.layout}>
          <motion.div
            className={styles.globeWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <svg
              className={styles.globeSvg}
              viewBox={`0 0 ${VIEW} ${VIEW}`}
              role="group"
              aria-label={ar ? 'مجسم قطاعات تفاعلي' : 'Interactive industry sphere'}
            >
              <defs>
                <radialGradient id="xviSphereGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="55%" stopColor="rgba(200,166,90,0.22)" />
                  <stop offset="82%" stopColor="rgba(200,166,90,0.07)" />
                  <stop offset="100%" stopColor="rgba(200,166,90,0)" />
                </radialGradient>
                <radialGradient id="xviSphereGrad" cx="34%" cy="28%" r="82%">
                  <stop offset="0%" stopColor="#33496b" />
                  <stop offset="46%" stopColor="#16293f" />
                  <stop offset="100%" stopColor="#0a1526" />
                </radialGradient>
                <radialGradient id="xviNodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,217,140,0.95)" />
                  <stop offset="55%" stopColor="rgba(200,166,90,0.35)" />
                  <stop offset="100%" stopColor="rgba(200,166,90,0)" />
                </radialGradient>
              </defs>

              <circle cx={CENTER} cy={CENTER} r={RADIUS + 26} fill="url(#xviSphereGlow)" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#xviSphereGrad)" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(200,166,90,0.55)" strokeWidth="1.4" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(200,166,90,0.14)" strokeWidth="6" />

              <g className={styles.wireframe} fill="none" stroke="rgba(200,166,90,0.32)" strokeWidth="0.8">
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS} ry={RADIUS} stroke="rgba(200,166,90,0.4)" />
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS} ry={RADIUS * 0.55} />
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS} ry={RADIUS * 0.24} />
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS * 0.55} ry={RADIUS} transform={`rotate(60 ${CENTER} ${CENTER})`} />
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS * 0.55} ry={RADIUS} transform={`rotate(-60 ${CENTER} ${CENTER})`} />
                <ellipse cx={CENTER} cy={CENTER} rx={RADIUS * 0.24} ry={RADIUS} />
              </g>

              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 10" />

              {EDGES.map(([a, b], ei) => (
                <path
                  key={ei}
                  ref={(el) => { pathRefs.current[ei] = el; }}
                  className={styles.conn}
                  fill="none"
                  stroke="rgba(200,166,90,0.9)"
                  strokeWidth="1"
                />
              ))}

              {NODES.map((n, i) => (
                <g
                  key={n.id}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className={`${styles.node} ${hovered === n.id ? styles.nodeHovered : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.name.en} — ${n.solution.en}`}
                  onMouseEnter={() => selectNode(n.id)}
                  onMouseLeave={() => selectNode(NODES[0].id)}
                  onFocus={() => selectNode(n.id)}
                  onBlur={() => selectNode(NODES[0].id)}
                  onClick={() => goTo(n.to)}
                  onKeyDown={(e) => onNodeKeyDown(e, n.to)}
                >
                  <title>{`${n.name.en} · ${n.solution.en}`}</title>
                  <circle className={styles.glow} r={16} />
                  <circle className={styles.halo} r={9} />
                  <circle className={styles.core} r={4.6} />
                  {hovered === n.id && (
                    <text className={styles.nodeLabel} x={0} y={-20}>
                      {ar ? n.name.ar : n.name.en}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            <div className={styles.chips} aria-hidden="true">
              {NODES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`${styles.chip} ${hovered === n.id ? styles.chipActive : ''}`}
                  onMouseEnter={() => selectNode(n.id)}
                  onFocus={() => selectNode(n.id)}
                  onClick={() => selectNode(n.id)}
                >
                  {ar ? n.name.ar : n.name.en}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className={styles.panel}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            <span className={styles.panelLabel}>
              {ar ? 'الحل الموصى به' : 'RECOMMENDED XVI SOLUTION'}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className={styles.panelBody}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className={styles.industryName}>{ar ? current.name.ar : current.name.en}</h3>
                <p className={styles.industryDesc}>{ar ? current.desc.ar : current.desc.en}</p>
                <div className={styles.solutionRow}>
                  <span className={styles.solutionIcon}>
                    <Sparkles size={16} />
                  </span>
                  <div className={styles.solutionMeta}>
                    <span className={styles.solutionLabel}>{ar ? 'الحل' : 'Solution'}</span>
                    <span className={styles.solutionName}>{ar ? current.solution.ar : current.solution.en}</span>
                  </div>
                </div>
                <Link to={current.to} className={styles.learnMore}>
                  {ar ? 'اعرف المزيد' : 'Learn More'}
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </AnimatePresence>
            <span className={styles.hint}>
              {ar ? 'مرّر فوق عقدة أو انقر عليها للانتقال إلى الحل' : 'Hover a node, or tap to visit its solution.'}
            </span>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
