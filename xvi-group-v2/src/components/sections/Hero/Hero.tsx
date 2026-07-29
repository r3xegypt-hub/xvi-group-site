import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import { Container } from '../../layout/Container';
import styles from './Hero.module.scss';

const STATS = [
  { n: 12, s: '+', label: 'Years Experience', labelAr: 'سنوات من الخبرة' },
  { n: 200, s: '+', label: 'Projects Delivered', labelAr: 'مشروع تم تسليمه' },
  { n: 100, s: '%', label: 'Delivery Rate', labelAr: 'معدل التسليم' },
];

function HUDMetric({ n, s, label, labelAr }: { n: number; s: string; label: string; labelAr: string }) {
  const { language } = useLanguage();
  const { ref, display } = useCountUp({ end: n, duration: 2200, suffix: s, startOnView: true });

  return (
    <div ref={ref} className={styles.metric}>
      <span className={styles.metricNumber}>{display}</span>
      <span className={styles.metricUnderline} aria-hidden="true" />
      <span className={styles.metricLabel}>{language === 'ar' ? labelAr : label}</span>
    </div>
  );
}

function Ticker() {
  const { language } = useLanguage();
  const items = language === 'ar'
    ? ['مؤشر الجاهزية للذكاء الاصطناعي ▸', 'كفاءة تشغيلية +٤٧٪ ▸', 'استخبارات السوق ▸']
    : ['AI Readiness Index ▸', 'Operational Efficiency +47% ▸', 'Market Intelligence ▸'];

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className={styles.tickerItem}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function DataGrid() {
  const [nodes, setNodes] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setNodes(generated);
  }, []);

  return (
    <div className={styles.dataGrid} aria-hidden="true">
      <svg className={styles.gridSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={5 * i} y1="0" x2={5 * i} y2="100" stroke="#fff" strokeWidth="0.3" opacity="0.03" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={5 * i} x2="100" y2={5 * i} stroke="#fff" strokeWidth="0.3" opacity="0.02" />
        ))}
      </svg>
      <div className={styles.gridGlow} />
      <div className={styles.gridGlowSecondary} />
      {nodes.map((node, i) => (
        <div
          key={i}
          className={styles.gridNode}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <section className={styles.hero} aria-label="Hero">
      <DataGrid />

      <Container className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowAccent} aria-hidden="true" />
            <p className={styles.eyebrow}>
              {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
            </p>
          </div>

          <h1 className={styles.headline}>
            {ar ? (
              <>
                الاستخبارات
                <br />
                <span className={styles.accentWord}>وراء</span>
                <br />
                الطموح
              </>
            ) : (
              <>
                The
                <br />
                <span className={styles.accentWord}>Intelligence</span>
                <br />
                Behind the
                <br />
                Ambitious.
              </>
            )}
          </h1>

          <p className={styles.subhead}>
            {ar
              ? 'استراتيجية · ذكاء اصطناعي · عمليات — من الرؤية إلى التنفيذ، عبر الشرق الأوسط وما بعده.'
              : 'Strategy. AI. Operations. — From vision to execution, across the Middle East and beyond.'}
          </p>

          <div className={styles.actions}>
            <a href="/contact" className={styles.ctaPrimary}>
              {ar ? 'ابدأ الحوار' : 'Start a Conversation'}
              <ArrowUpRight size={16} />
            </a>
            <a href="/services" className={styles.ctaSecondary}>
              {ar ? 'منهجيتنا' : 'Our Approach'}
            </a>
          </div>
        </div>

        <div className={styles.hud}>
          {STATS.map((stat, i) => (
            <HUDMetric key={i} {...stat} />
          ))}
        </div>
      </Container>

      <Ticker />
    </section>
  );
}
