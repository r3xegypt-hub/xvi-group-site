// XVI GROUP — Technology Section (Sprint 02)
// Enterprise AI architecture with luxury diagrams

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import { useSvgDraw } from '../../../motion/hooks/useSvgDraw';
import styles from './Technology.module.scss';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.featureSvg}>
        <path d="M24 4L44 24L24 44L4 24Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.35" />
      </svg>
    ),
    title: 'Sovereign AI',
    titleAr: 'ذكاء اصطناعي سيادي',
    text: 'AI systems that operate within fully secured enterprise environments.',
    textAr: 'أنظمة ذكاء اصطناعي تعمل في بيئة مؤسسية آمنة بالكامل.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.featureSvg}>
        <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <rect x="16" y="16" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
    title: 'Architectural Infrastructure',
    titleAr: 'بنية تحتية معمارية',
    text: 'Systems built like buildings — durable, enduring, and scalable.',
    textAr: 'أنظمة مبنية مثل المباني — متينة ودائمة وقابلة للتوسع.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.featureSvg}>
        <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="16" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.12">
          <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <path d="M24 16V32M16 24H32" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      </svg>
    ),
    title: 'Multi-Layer Security',
    titleAr: 'طبقات أمان متعددة',
    text: 'Enterprise-grade security with protection at every layer.',
    textAr: 'أمان على مستوى المؤسسة مع حماية في كل طبقة.',
  },
];

export function Technology() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const featuresRef = useScrollRevealGroup({ direction: 'left', duration: 700, stagger: 120 });
  const visualRef = useScrollReveal({ direction: 'right', duration: 900, delay: 200 });
  const { ref: svgRef } = useSvgDraw({ duration: 1800, delay: 300 });
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="technology" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'التكنولوجيا' : 'Technology'}</p>
            <h2 className={styles.title}>
              {ar ? 'بنية تكنولوجية سيادية' : 'Sovereign Technology Architecture'}
            </h2>
            <p className={styles.description}>
              {ar
                ? 'أنظمة مُصمَّمة للمؤسسات التي تتطلب أماناً مُحكَماً وأداءً استثنائياً.'
                : 'Systems engineered for enterprises that demand impenetrable security and exceptional performance.'}
            </p>
          </div>

          <div className={styles.content}>
            <div ref={featuresRef} className={styles.features}>
              {FEATURES.map((feature, i) => (
                <article key={i} className={styles.feature}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{ar ? feature.titleAr : feature.title}</h3>
                    <p className={styles.featureText}>{ar ? feature.textAr : feature.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div ref={visualRef} className={styles.visualization}>
              <div className={styles.diagramFrame}>
                <svg ref={svgRef as React.Ref<SVGSVGElement>} viewBox="0 0 420 420" className={styles.techSvg} aria-hidden="true">
                  <defs>
                    <radialGradient id="techGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="210" cy="210" r="160" fill="url(#techGlow)" />
                  <circle cx="210" cy="210" r="130" stroke="#0A1628" strokeWidth="1" fill="none" opacity="0.15" />
                  <circle cx="210" cy="210" r="90" stroke="#C9A96E" strokeWidth="1.2" fill="none" opacity="0.5" />
                  <circle cx="210" cy="210" r="50" stroke="#0A1628" strokeWidth="1" fill="none" opacity="0.25" />

                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x2 = 210 + Math.cos(rad) * 155;
                    const y2 = 210 + Math.sin(rad) * 155;
                    return (
                      <line key={i} x1="210" y1="210" x2={x2} y2={y2} stroke="#0A1628" strokeWidth="0.5" opacity="0.1" />
                    );
                  })}

                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const cx = 210 + Math.cos(rad) * 115;
                    const cy = 210 + Math.sin(rad) * 115;
                    return (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r="8" stroke="#C9A96E" strokeWidth="1" fill="rgba(201,169,110,0.08)" />
                        <circle cx={cx} cy={cy} r="2.5" fill="#C9A96E" opacity="0.5" />
                        <line x1="210" y1="210" x2={cx} y2={cy} stroke="#C9A96E" strokeWidth="0.6" opacity="0.2" />
                      </g>
                    );
                  })}

                  <circle cx="210" cy="210" r="10" stroke="#C9A96E" strokeWidth="1.5" fill="rgba(201,169,110,0.12)" />
                  <circle cx="210" cy="210" r="3" fill="#C9A96E" opacity="0.6">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div className={styles.diagramLabel}>
                  <span className={styles.labelTag}>{ar ? 'نواة الذكاء' : 'AI Core'}</span>
                  <span className={styles.labelSub}>{ar ? 'طبقة سيادية' : 'Sovereign Layer'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
