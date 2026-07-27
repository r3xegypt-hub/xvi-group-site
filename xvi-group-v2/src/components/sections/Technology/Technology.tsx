// XVI GROUP — Technology Section
// Futuristic personality with animated AI node network

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import { useSvgDraw } from '../../../motion/hooks/useSvgDraw';
import styles from './Technology.module.scss';

export function Technology() {
  const { language } = useLanguage();
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const featuresRef = useScrollRevealGroup({ direction: 'left', duration: 700, stagger: 150 });
  const { ref: svgRef } = useSvgDraw({ duration: 1500, delay: 400 });

  return (
    <Section variant="warm" id="technology">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'التكنولوجيا' : 'TECHNOLOGY'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar'
              ? 'بنية تكنولوجية سيادية'
              : 'Sovereign Technology Architecture'}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'أنظمة مُصمَّمة للمؤسسات التي تتطلب أماناً مُحكَماً وأداءً استثنائياً.'
              : 'Systems engineered for enterprises that demand impenetrable security and exceptional performance.'}
          </p>
        </div>

        <div className={styles.content}>
          <div ref={featuresRef} className={styles.textContent}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L30 16L16 30L2 16Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
              <div>
                <h3 className={styles.featureTitle}>
                  {language === 'ar' ? 'ذكاء اصطناعي سيادي' : 'Sovereign AI'}
                </h3>
                <p className={styles.featureText}>
                  {language === 'ar'
                    ? 'أنظمة ذكاء اصطناعي تعمل في بيئة مؤسسية آمنة بالكامل.'
                    : 'AI systems that operate within fully secured enterprise environments.'}
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              <div>
                <h3 className={styles.featureTitle}>
                  {language === 'ar' ? 'بنية تحتية معمارية' : 'Architectural Infrastructure'}
                </h3>
                <p className={styles.featureText}>
                  {language === 'ar'
                    ? 'أنظمة مبنية مثل المباني — متينة ودائمة وقابلة للتوسع.'
                    : 'Systems built like buildings — durable, enduring, and scalable.'}
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L30 16L16 30L2 16Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 8L24 16L16 24L8 16Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <path d="M16 12L20 16L16 20L12 16Z" fill="currentColor" opacity="0.15" />
                </svg>
              </div>
              <div>
                <h3 className={styles.featureTitle}>
                  {language === 'ar' ? 'طبقات أمان متعددة' : 'Multi-Layer Security'}
                </h3>
                <p className={styles.featureText}>
                  {language === 'ar'
                    ? 'أمان على مستوى المؤسسة مع حماية في كل طبقة.'
                    : 'Enterprise-grade security with protection at every layer.'}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.visualization}>
            <svg ref={svgRef as React.Ref<SVGSVGElement>} viewBox="0 0 400 400" className={styles.techSvg}>
              {/* Central diamond */}
              <path d="M200 80L320 200L200 320L80 200Z" stroke="#0A1628" strokeWidth="1.5" fill="none" />
              <path d="M200 120L280 200L200 280L120 200Z" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M200 160L240 200L200 240L160 200Z" stroke="#0A1628" strokeWidth="0.8" fill="none" opacity="0.3" />

              {/* Radiating lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = 200 + Math.cos(rad) * 180;
                const y2 = 200 + Math.sin(rad) * 180;
                return (
                  <line
                    key={i}
                    x1="200" y1="200" x2={x2} y2={y2}
                    stroke="#0A1628" strokeWidth="0.5" opacity="0.15"
                  />
                );
              })}

              {/* Node dots */}
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const cx = 200 + Math.cos(rad) * 140;
                const cy = 200 + Math.sin(rad) * 140;
                return (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#C9A96E" opacity="0.4" />
                );
              })}

              {/* Center node */}
              <circle cx="200" cy="200" r="6" fill="#C9A96E" opacity="0.5" />
            </svg>
          </div>
        </div>
      </Container>
    </Section>
  );
}
