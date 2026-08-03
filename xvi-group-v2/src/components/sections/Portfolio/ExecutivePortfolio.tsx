import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Easing, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useMotion } from '../../../motion/providers/MotionProvider';
import { playSound } from '../../../motion/audio/soundEngine';
import styles from './ExecutivePortfolio.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface SectorMeta {
  id: string;
  color: string;
  label: { en: string; ar: string };
}

const SECTORS: SectorMeta[] = [
  { id: 'all', color: '#c8a65a', label: { en: 'All Work', ar: 'كل الأعمال' } },
  { id: 'finance', color: '#c8a65a', label: { en: 'Finance', ar: 'التمويل' } },
  { id: 'government', color: '#8a9bb5', label: { en: 'Government', ar: 'الحكومة' } },
  { id: 'healthcare', color: '#7fb5a0', label: { en: 'Healthcare', ar: 'الرعاية الصحية' } },
  { id: 'construction', color: '#c88a5a', label: { en: 'Construction', ar: 'الإنشاءات' } },
  { id: 'retail', color: '#b57fa0', label: { en: 'Retail', ar: 'التجزئة' } },
  { id: 'manufacturing', color: '#9b8ac8', label: { en: 'Manufacturing', ar: 'التصنيع' } },
  { id: 'hospitality', color: '#c89a6a', label: { en: 'Hospitality', ar: 'الضيافة' } },
  { id: 'education', color: '#7fa0c8', label: { en: 'Education', ar: 'التعليم' } },
  { id: 'energy', color: '#7fc8c0', label: { en: 'Energy', ar: 'الطاقة' } },
];

const SECTOR_META = SECTORS.reduce<Record<string, SectorMeta>>((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});

interface PortfolioItem {
  id: string;
  sector: string;
  phase: { en: string; ar: string };
  title: { en: string; ar: string };
  client: { en: string; ar: string };
  desc: { en: string; ar: string };
  outcome: { en: string; ar: string };
  related: { en: string; ar: string };
  to: string;
  art: number;
}

const ITEMS: PortfolioItem[] = [
  {
    id: 'sovereign-banking-core',
    sector: 'finance',
    phase: { en: 'Prototype', ar: 'نموذجي' },
    title: { en: 'Sovereign Banking Core', ar: 'نواة مصرفية سيادية' },
    client: { en: 'Prototype Solution — Banking Core', ar: 'حل نموذجي — النواة المصرفية' },
    desc: {
      en: 'A prototype core that would unify legacy banking systems into a single regulatory-ready AI decision layer, bringing fraud detection from minutes toward milliseconds.',
      ar: 'نواة نموذجية توحّد الأنظمة المصرفية القديمة في طبقة قرار ذكية واحدة جاهزة للامتثال، تقرّب كشف الاحتيال من الدقائق إلى الميلي ثانية.',
    },
    outcome: {
      en: 'If pursued, fraud detection could move from minutes toward milliseconds — without replacing the core.',
      ar: 'إذا نُفذ، قد ينتقل كشف الاحتيال من الدقائق إلى الميلي ثانية — دون استبدال النواة.',
    },
    related: { en: 'Explore AI Transformation', ar: 'استكشف التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
    art: 0,
  },
  {
    id: 'national-control-tower',
    sector: 'government',
    phase: { en: 'Scenario', ar: 'سيناريو' },
    title: { en: 'National Logistics Control Tower', ar: 'برج التحكم اللوجستي الوطني' },
    client: { en: 'Executive Scenario — Logistics Control', ar: 'سيناريو تنفيذي — التحكم اللوجستي' },
    desc: {
      en: 'An executive scenario for a country-scale supply-chain command layer that federates operator feeds into one predictive view.',
      ar: 'سيناريو تنفيذي لطبقة قيادة لوجستية على مستوى الدولة تدمج مصادر المشغلين في رؤية تنبؤية واحدة.',
    },
    outcome: {
      en: 'If pursued, shipment ETD accuracy could climb while response time falls.',
      ar: 'إذا نُفذ، قد ترتفع دقة مواعيد الوصول بينما ينخفض زمن الاستجابة.',
    },
    related: { en: 'Explore Business Consulting', ar: 'استكشف الاستشارات الاستراتيجية' },
    to: '/services/business-consulting',
    art: 1,
  },
  {
    id: 'clinical-command',
    sector: 'healthcare',
    phase: { en: 'Reference', ar: 'مرجعي' },
    title: { en: 'Clinical Command Center', ar: 'مركز القيادة السريرية' },
    client: { en: 'Reference Implementation — Clinical Command', ar: 'تنفيذ مرجعي — القيادة السريرية' },
    desc: {
      en: 'A reference implementation for bed, staffing, and sepsis-risk intelligence across a hospital network, designed to raise early-intervention rates.',
      ar: 'تنفيذ مرجعي لذكاء الأسرة والطواقم ومخاطر تعفن الدم عبر شبكة مستشفيات، مصمم لرفع معدلات التدخل المبكر.',
    },
    outcome: {
      en: 'If pursued, early intervention could rise while readmissions fall across the network.',
      ar: 'إذا نُفذ، قد يرتفع التدخل المبكر بينما تنخفض العودة للرعاية عبر الشبكة.',
    },
    related: { en: 'Explore AI Transformation', ar: 'استكشف التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
    art: 2,
  },
  {
    id: 'metro-risk',
    sector: 'construction',
    phase: { en: 'Concept', ar: 'مفهوم' },
    title: { en: 'Metro Risk Intelligence', ar: 'ذكاء مخاطر المترو' },
    client: { en: 'Concept Project — Metro Risk', ar: 'مشروع مفاهيمي — مخاطر المترو' },
    desc: {
      en: 'A concept project for AI-driven schedule and risk modeling on a large metro build, designed to recover slippage before it reaches the critical path.',
      ar: 'مشروع مفاهيمي لنمذجة جدولة ومخاطر ذكية في مشروع مترو كبير، مصمم لاستعادة التأخير قبل أن يمس المسار الحرج.',
    },
    outcome: {
      en: 'If pursued, slippage could be recovered before it reaches the critical path.',
      ar: 'إذا نُفذ، قد يُستعاد التأخير قبل أن يصل إلى المسار الحرج.',
    },
    related: { en: 'Explore Business Consulting', ar: 'استكشف الاستشارات الاستراتيجية' },
    to: '/services/business-consulting',
    art: 3,
  },
  {
    id: 'retail-mesh',
    sector: 'retail',
    phase: { en: 'Scenario', ar: 'سيناريو' },
    title: { en: 'Retail Personalization Mesh', ar: 'شبكة التخصيص في التجزئة' },
    client: { en: 'Executive Scenario — Retail Personalization', ar: 'سيناريو تنفيذي — تخصيص التجزئة' },
    desc: {
      en: 'An executive scenario for hyper-personalized commerce across stores and web, designed to lift conversion while shrinking abandoned carts.',
      ar: 'سيناريو تنفيذي لتجارة مفرطة التخصيص عبر المتاجر والمنصات الرقمية، مصمم لرفع التحويل وتقليص العربات المهجورة.',
    },
    outcome: {
      en: 'If pursued, conversion could lift and abandoned-cart volume could halve.',
      ar: 'إذا نُفذ، قد يرتفع التحويل وقد تنخفض العربات المهجورة إلى النصف.',
    },
    related: { en: 'Explore AI Transformation', ar: 'استكشف التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
    art: 4,
  },
  {
    id: 'industrial-grid',
    sector: 'manufacturing',
    phase: { en: 'Reference', ar: 'مرجعي' },
    title: { en: 'Industrial Intelligence Grid', ar: 'شبكة الذكاء الصناعي' },
    client: { en: 'Reference Implementation — Industrial Grid', ar: 'تنفيذ مرجعي — الشبكة الصناعية' },
    desc: {
      en: 'A reference implementation for fusing machine-floor telemetry into a predictive maintenance grid across a plant network.',
      ar: 'تنفيذ مرجعي لدمج تيليمتري أرضية المصانع في شبكة صيانة تنبؤية عبر شبكة المصانع.',
    },
    outcome: {
      en: 'If pursued, downtime hours could be eliminated across the plant network.',
      ar: 'إذا نُفذ، قد تُلغى ساعات التوقف عبر شبكة المصانع.',
    },
    related: { en: 'Explore Technology Consulting', ar: 'استكشف الاستشارات التقنية' },
    to: '/services/technology-consulting',
    art: 5,
  },
  {
    id: 'guest-intelligence',
    sector: 'hospitality',
    phase: { en: 'Prototype', ar: 'نموذجي' },
    title: { en: 'Guest Revenue Intelligence', ar: 'ذكاء إيرادات الضيافة' },
    client: { en: 'Prototype Solution — Guest Intelligence', ar: 'حل نموذجي — ذكاء الضيوف' },
    desc: {
      en: 'A prototype solution pairing revenue and experience intelligence — dynamic pricing with preference-driven guest orchestration.',
      ar: 'حل نموذجي يجمع ذكاء الإيرادات والتجربة — تسعير ديناميكي مع تنسيق ضيوف قائم على التفضيلات.',
    },
    outcome: {
      en: 'If pursued, RevPAR could rise without raising rates — and guests remembered by preference.',
      ar: 'إذا نُفذ، قد يرتفع العائد على الغرفة دون رفع الأسعار — ويتذكر الضيوف من تفضيلاتهم.',
    },
    related: { en: 'Explore AI Transformation', ar: 'استكشف التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
    art: 6,
  },
  {
    id: 'adapt-engine',
    sector: 'education',
    phase: { en: 'Concept', ar: 'مفهوم' },
    title: { en: 'National Adaptation Engine', ar: 'محرك التعلم التكيفي الوطني' },
    client: { en: 'Concept Project — Adaptive Learning', ar: 'مشروع مفاهيمي — التعلم التكيفي' },
    desc: {
      en: 'A concept project for personalized learning at national scale — adaptive pathways tuned across the full curriculum.',
      ar: 'مشروع مفاهيمي لتعلّم مخصص على مستوى الدولة — مسارات تكيفية تُضبط عبر المنهج كاملاً.',
    },
    outcome: {
      en: 'If pursued, engagement could multiply and attainment gaps could narrow.',
      ar: 'إذا نُفذ، قد تتضاعف المشاركة وتضيق فجوات التحصيل.',
    },
    related: { en: 'Explore Technology Consulting', ar: 'استكشف الاستشارات التقنية' },
    to: '/services/technology-consulting',
    art: 7,
  },
  {
    id: 'sovereign-stack',
    sector: 'energy',
    phase: { en: 'Reference', ar: 'مرجعي' },
    title: { en: 'Sovereign AI Energy Stack', ar: 'منصة الطاقة الذكية السيادية' },
    client: { en: 'Reference Implementation — Sovereign Stack', ar: 'تنفيذ مرجعي — المنصة السيادية' },
    desc: {
      en: 'A reference implementation for fully owned AI infrastructure across a national grid — forecasting, trading, and asset health with zero external data flow.',
      ar: 'تنفيذ مرجعي لبنية ذكية مملوكة بالكامل عبر الشبكة الوطنية — تنبؤ وتداول وصحة أصول مع صفر تدفق بيانات خارجي.',
    },
    outcome: {
      en: 'If pursued, grid efficiency could rise with zero external data flow.',
      ar: 'إذا نُفذ، قد ترتفع كفاءة الشبكة مع صفر تدفق بيانات خارجي.',
    },
    related: { en: 'Explore AI Transformation', ar: 'استكشف التحول بالذكاء الاصطناعي' },
    to: '/services/ai-transformation',
    art: 8,
  },
];

interface PortfolioArtProps {
  variant: number;
  color: string;
  reduced: boolean;
}

function PortfolioArt({ variant, color, reduced }: PortfolioArtProps) {
  const stroke = color;
  const gold = '#c8a65a';
  const ink = 'rgba(16,16,16,0.4)';
  const common = {
    fill: 'none',
    strokeWidth: 1.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths = useMemo(() => {
    const g = (x: number) => 320 * (x / 320);
    switch (variant) {
      case 0: {
        const c = { cx: g(160), cy: g(96), r: 56 };
        return (
          <>
            <circle {...common} cx={c.cx} cy={c.cy} r={26} stroke={gold} strokeWidth={1.1} />
            <circle {...common} cx={c.cx} cy={c.cy} r={42} stroke={stroke} strokeDasharray="3 6" />
            <circle {...common} cx={c.cx} cy={c.cy} r={58} stroke={ink} strokeDasharray="1 5" />
            <circle cx={c.cx - 42} cy={c.cy - 42} r={3} fill={stroke} />
            <circle cx={c.cx + 42} cy={c.cy - 42} r={3} fill={gold} />
            <circle cx={c.cx} cy={c.cy + 48} r={3} fill={ink} />
            <circle cx={c.cx + 50} cy={c.cy + 20} r={2.2} fill={stroke} />
            <path {...common} d={`M${c.cx - 58} ${c.cy} H${c.cx - 118}`} stroke={ink} />
            <path {...common} d={`M${c.cx + 58} ${c.cy} H${c.cx + 118}`} stroke={ink} />
          </>
        );
      }
      case 1: {
        return (
          <>
            <path {...common} d="M40 160 H280" stroke={ink} strokeDasharray="2 4" />
            <path {...common} d="M40 128 L92 84 L144 120 L200 58 L280 96" stroke={stroke} />
            <path {...common} d="M40 128 L92 84 L144 120 L200 58 L280 96" stroke={gold} strokeWidth={0.7} transform="translate(0 3)" strokeDasharray="4 8" />
            <circle cx={92} cy={84} r={4} fill={stroke} />
            <circle cx={144} cy={120} r={4} fill={ink} />
            <circle cx={200} cy={58} r={4} fill={gold} />
            <path {...common} d="M40 160 V128 M92 160 V84 M144 160 V120 M200 160 V58 M280 160 V96" stroke={ink} strokeDasharray="1 4" />
          </>
        );
      }
      case 2: {
        const c = { cx: g(160), cy: g(96), r: 52 };
        return (
          <>
            <circle {...common} cx={c.cx} cy={c.cy} r={c.r} stroke={stroke} />
            <circle {...common} cx={c.cx} cy={c.cy} r={c.r - 14} stroke={ink} strokeDasharray="2 5" />
            <path {...common} d={`M${c.cx} ${c.cy - c.r} V${c.cy - c.r + 26}`} stroke={gold} strokeWidth={2} />
            <path {...common} d={`M${c.cx - c.r} ${c.cy} H${c.cx - c.r + 26}`} stroke={gold} strokeWidth={2} />
            <path {...common} d={`M${c.cx} ${c.cy + c.r} V${c.cy + c.r - 26}`} stroke={ink} />
            <path {...common} d={`M${c.cx + c.r} ${c.cy} H${c.cx + c.r - 26}`} stroke={ink} />
            <circle cx={c.cx + 6} cy={c.cy - 6} r={3} fill={gold} />
            <path {...common} d="M40 160 H280" stroke={ink} strokeDasharray="2 6" />
          </>
        );
      }
      case 3: {
        return (
          <>
            <path {...common} d="M80 160 V70 M160 160 V40 M240 160 V96" stroke={ink} strokeWidth={1} />
            <rect x={64} y={76} width={32} height={84} rx={2} fill="none" stroke={stroke} />
            <rect x={144} y={46} width={32} height={114} rx={2} fill="none" stroke={gold} />
            <rect x={224} y={102} width={32} height={58} rx={2} fill="none" stroke={ink} />
            <path {...common} d="M48 60 L80 42 L112 58 L144 30 L176 44 L208 28 L240 60 L272 46" stroke={stroke} strokeDasharray="3 5" />
            <circle cx={144} cy={30} r={4} fill={gold} />
          </>
        );
      }
      case 4: {
        const c = { cx: g(160), cy: g(96), r: 52 };
        const pts = Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return { x: c.cx + Math.cos(a) * c.r, y: c.cy + Math.sin(a) * c.r };
        });
        return (
          <>
            <circle {...common} cx={c.cx} cy={c.cy} r={c.r} stroke={ink} strokeDasharray="1 6" />
            {pts.map((p, i) => (
              <path key={i} {...common} d={`M${c.cx} ${c.cy} L${p.x} ${p.y}`} stroke={i % 2 ? gold : stroke} strokeWidth={0.9} />
            ))}
            <circle cx={c.cx} cy={c.cy} r={8} fill={gold} />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={3.4} fill={i % 2 ? ink : stroke} />
            ))}
          </>
        );
      }
      case 5: {
        return (
          <>
            <path {...common} d="M40 40 H280 V160 H40 Z" stroke={ink} strokeDasharray="2 5" />
            <path {...common} d="M40 96 H280" stroke={ink} strokeDasharray="2 5" />
            <path {...common} d="M40 128 H280" stroke={ink} strokeDasharray="2 5" />
            <path {...common} d="M96 40 V160 M152 40 V160 M208 40 V160" stroke={ink} strokeDasharray="2 5" />
            <circle cx={96} cy={96} r={5} fill={gold} />
            <circle cx={152} cy={128} r={5} fill={stroke} />
            <circle cx={208} cy={96} r={5} fill={stroke} />
            <circle cx={152} cy={68} r={4} fill={ink} />
            <path {...common} d="M96 96 L152 68 M96 96 L152 128 M152 128 L208 96 M152 68 L208 96" stroke={gold} strokeWidth={0.8} />
          </>
        );
      }
      case 6: {
        const c = { cx: g(160), cy: g(110), rx: 110, ry: 34 };
        return (
          <>
            <ellipse {...common} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} stroke={ink} strokeDasharray="2 5" />
            <ellipse {...common} cx={c.cx} cy={c.cy} rx={c.rx - 28} ry={c.ry - 8} stroke={stroke} />
            <ellipse {...common} cx={c.cx} cy={c.cy} rx={c.rx - 56} ry={c.ry - 16} stroke={gold} strokeDasharray="3 5" />
            <path {...common} d={`M${c.cx - c.rx + 8} ${c.cy - 18} C${c.cx - c.rx / 2} ${c.cy - 46} ${c.cx + c.rx / 2} ${c.cy - 46} ${c.cx + c.rx - 8} ${c.cy - 18}`} stroke={stroke} />
            <circle cx={c.cx} cy={c.cy} r={3.4} fill={gold} />
            <circle cx={c.cx - 60} cy={c.cy - 10} r={3} fill={ink} />
            <circle cx={c.cx + 60} cy={c.cy - 10} r={3} fill={stroke} />
          </>
        );
      }
      case 7: {
        return (
          <>
            <path {...common} d="M160 20 L280 150 H40 Z" stroke={stroke} />
            <path {...common} d="M160 54 L246 150 H74 Z" stroke={ink} strokeDasharray="2 5" />
            <path {...common} d="M160 88 L214 150 H106 Z" stroke={gold} strokeDasharray="3 5" />
            <circle cx={160} cy={20} r={4} fill={gold} />
            <circle cx={40} cy={150} r={4} fill={ink} />
            <circle cx={280} cy={150} r={4} fill={stroke} />
            <path {...common} d="M40 178 H280" stroke={ink} strokeDasharray="1 6" />
          </>
        );
      }
      default: {
        const c = { cx: g(160), cy: g(96), r: 54 };
        return (
          <>
            <circle {...common} cx={c.cx} cy={c.cy} r={c.r} stroke={ink} strokeDasharray="2 6" />
            <circle {...common} cx={c.cx} cy={c.cy} r={c.r - 16} stroke={stroke} />
            <path {...common} d={`M${c.cx - c.r} ${c.cy} A${c.r} ${c.r} 0 0 1 ${c.cx} ${c.cy - c.r}`} stroke={gold} strokeWidth={2} />
            <circle cx={c.cx + 26} cy={c.cy - 26} r={3.4} fill={gold} />
            <circle cx={c.cx - 30} cy={c.cy + 18} r={3} fill={stroke} />
            <circle cx={c.cx + 20} cy={c.cy + 34} r={3} fill={ink} />
          </>
        );
      }
    }
  }, [variant, stroke, gold, ink]);

  return (
    <svg
      className={styles.art}
      viewBox="0 0 320 200"
      role="presentation"
      aria-hidden="true"
      data-variant={variant}
    >
      <rect x="1" y="1" width="318" height="198" rx="10" fill="none" stroke={ink} strokeDasharray="3 7" strokeWidth="0.8" />
      {paths}
      <g className={reduced ? styles.artStatic : styles.artDrift}>
        <path {...common} d="M40 160 H280" stroke={gold} strokeWidth={0.6} strokeDasharray="1 5" />
      </g>
    </svg>
  );
}

function LazyArt({ variant, color, reduced }: PortfolioArtProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '320px 0px' });
  return (
    <div className={styles.artSlot} ref={ref}>
      {inView ? (
        <PortfolioArt variant={variant} color={color} reduced={reduced} />
      ) : (
        <div className={styles.artSkeleton} aria-hidden="true" />
      )}
    </div>
  );
}

export function ExecutivePortfolio() {  const { language } = useLanguage();
  const ar = language === 'ar';
  const { prefersReducedMotion } = useMotion();
  const reduced = prefersReducedMotion;

  const [activeSector, setActiveSector] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (activeSector === 'all' ? ITEMS : ITEMS.filter((it) => it.sector === activeSector)),
    [activeSector],
  );

  const openLightbox = useCallback((idx: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setSelectedIndex(idx);
    playSound('hologram');
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    lastFocusedRef.current?.focus?.();
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setSelectedIndex((cur) => {
      if (cur === null) return cur;
      return (cur + dir + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIndex, closeLightbox, step]);

  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;
  const selColor = selected ? SECTOR_META[selected.sector].color : '#c8a65a';

  const onFilter = (id: string) => {
    setActiveSector(id);
    playSound('ctaClick');
  };

  return (
    <section className={styles.section} aria-label={ar ? 'مكتبة المخططات' : 'Blueprint portfolio'}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {ar ? 'مخططات' : 'BLUEPRINTS'}
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            {ar ? 'مخططات لتحولك القادم.' : 'Blueprints for your next transformation.'}
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            {ar
              ? 'مشاريع مفاهيمية، وتنفيذات مرجعية، وسيناريوهات تنفيذية، وحلول نموذجية — عبر القطاعات. كل تصوّر مُولَّد، لا مخزون.'
              : 'Concept projects, reference implementations, executive scenarios, and prototype solutions — across sectors. Every visual generated, never stock.'}
          </motion.p>
        </div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          role="tablist"
          aria-label={ar ? 'تصفية الأعمال حسب القطاع' : 'Filter work by sector'}
        >
          {SECTORS.map((s) => {
            const active = activeSector === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.filter}${active ? ` ${styles.filterActive}` : ''}`}
                style={{ '--sector': s.color } as React.CSSProperties}
                onClick={() => onFilter(s.id)}
                onMouseEnter={() => playSound('ctaHover')}
              >
                {ar ? s.label.ar : s.label.en}
              </button>
            );
          })}
        </motion.div>

        <div className={styles.filterMeta}>
          <span className={styles.resultCount} aria-live="polite">
            {ar ? `${filtered.length} مفهوم مختار` : `${String(filtered.length).padStart(2, '0')} concepts`}
          </span>
          {filtered.length === 0 && (
            <span className={styles.emptyHint}>
              {ar ? 'لا توجد مفاهيم لهذا القطاع حالياً.' : 'No concepts for this sector yet.'}
            </span>
          )}
        </div>

        <motion.div
          className={styles.grid}
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
        >
          {filtered.map((item, i) => {
            const color = SECTOR_META[item.sector].color;
            return (
              <motion.button
                key={item.id}
                type="button"
                className={styles.tile}
                aria-label={ar ? item.title.ar : item.title.en}
                onClick={() => openLightbox(i)}
                onMouseEnter={() => playSound('ctaHover')}
                layout
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
                whileHover={reduced ? undefined : { y: -6 }}
                whileTap={reduced ? undefined : { scale: 0.985 }}
                style={{ '--tile': color } as React.CSSProperties}
              >
                <div className={styles.artWrap}>
                  <LazyArt variant={item.art} color={color} reduced={reduced} />
                  <span className={styles.sectorBadge} style={{ color }}>
                    {ar ? SECTOR_META[item.sector].label.ar : SECTOR_META[item.sector].label.en}
                  </span>
                </div>
                <div className={styles.tileBody}>
                  <h3 className={styles.tileTitle}>{ar ? item.title.ar : item.title.en}</h3>
                  <span className={styles.tileClient}>{ar ? item.client.ar : item.client.en}</span>
                  <div className={styles.tileMeta}>
                    <span className={styles.tileStat}>{ar ? item.phase.ar : item.phase.en}</span>
                    <span className={styles.tileView}>
                      {ar ? 'عرض' : 'View'}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            className={styles.overlay}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={ar ? selected.title.ar : selected.title.en}
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? undefined : { scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.96, y: 16, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.32, ease }}
            >
              <div className={styles.lightboxTop}>
                <motion.div
                  className={styles.lightboxSwipe}
                  drag={reduced ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  dragMomentum={false}
                  onDragEnd={(_e: unknown, info: PanInfo) => {
                    if (Math.abs(info.offset.x) > 64 || Math.abs(info.velocity.x) > 500) {
                      playSound('ctaClick');
                      step(info.offset.x < 0 ? 1 : -1);
                    }
                  }}
                  style={{ touchAction: 'pan-y' }}
                >
                  <div className={styles.lightboxArtWrap} style={{ '--tile': selColor } as React.CSSProperties}>
                    <PortfolioArt variant={selected.art} color={selColor} reduced={reduced} />
                    <span className={styles.sectorBadge} style={{ color: selColor }}>
                      {ar ? SECTOR_META[selected.sector].label.ar : SECTOR_META[selected.sector].label.en}
                    </span>
                  </div>
                  <div className={styles.lightboxInfo}>
                    <span className={styles.lightboxClient}>
                      {ar ? selected.client.ar : selected.client.en}
                    </span>
                    <h2 className={styles.lightboxTitle}>{ar ? selected.title.ar : selected.title.en}</h2>
                    <p className={styles.lightboxDesc}>{ar ? selected.desc.ar : selected.desc.en}</p>
                    <p className={styles.lightboxOutcome}>{ar ? selected.outcome.ar : selected.outcome.en}</p>
                    <Link to={selected.to} className={styles.lightboxLink} onClick={() => playSound('ctaClick')}>
                      <span>{ar ? selected.related.ar : selected.related.en}</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className={styles.lightboxNav}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => step(-1)}
                  aria-label={ar ? 'العمل السابق' : 'Previous engagement'}
                >
                  <ArrowLeft size={18} />
                </button>
                <span className={styles.lightboxCounter}>
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => step(1)}
                  aria-label={ar ? 'العمل التالي' : 'Next engagement'}
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  ref={closeBtnRef}
                  className={styles.closeBtn}
                  onClick={closeLightbox}
                  aria-label={ar ? 'إغلاق' : 'Close'}
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
