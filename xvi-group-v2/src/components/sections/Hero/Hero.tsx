// XVI GROUP — Hero
// Editorial · Cinematic · Executive

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { useCountUp } from '../../../motion/hooks/useCountUp';
import styles from './Hero.module.scss';

const STATS = [
  { n: 200, s: '+', label: 'Projects Delivered', labelAr: 'مشروع تم تسليمه' },
  { n: 4, s: '', label: 'Advisory Suites', labelAr: 'مجموعات استشارية' },
  { n: 98, s: '%', label: 'Client Retention', labelAr: 'الاحتفاظ بالعملاء' },
  { n: 24, s: '/7', label: 'Support', labelAr: 'دعم متاح' },
];

function StatItem({ n, s, label, labelAr }: { n: number; s: string; label: string; labelAr: string }) {
  const { language } = useLanguage();
  const { ref, display } = useCountUp({ end: n, duration: 2200, suffix: s, startOnView: true });

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNumber}>{display}</span>
      <span className={styles.statLabel}>{language === 'ar' ? labelAr : label}</span>
    </div>
  );
}

export function Hero() {
  const { language } = useLanguage();

  const ar = language === 'ar';

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.ambientGrid} aria-hidden="true">
        <svg className={styles.gridLines} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={'v' + i} x1={90 * i} y1="0" x2={90 * i} y2="900" stroke="#fff" strokeWidth="0.5" opacity="0.04" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={100 * i} x2="1440" y2={100 * i} stroke="#fff" strokeWidth="0.5" opacity="0.03" />
          ))}
        </svg>
        <div className={styles.ambientOrb + ' ' + styles.orbAccent} />
        <div className={styles.ambientOrb + ' ' + styles.orbSubtle} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
          </p>

          <h1 className={styles.headline}>
            {ar ? (
              <>
                نصنع المؤسسات
                <br />
                <span className={styles.accentWord}>التي تُحرّك الأسواق</span>
              </>
            ) : (
              <>
                Building
                <br />
                <span className={styles.accentWord}>Enterprises That</span>
                <br />
                Move Markets
              </>
            )}
          </h1>

          <p className={styles.subheadline}>
            {ar
              ? 'شريك استراتيجي للمؤسسات التي تتطلب الدقة والسرعة والتميّز التشغيلي في عصر الذكاء الاصطناعي.'
              : 'Strategic partner to organizations that demand precision, velocity, and operational mastery in the age of intelligence.'}
          </p>

          <div className={styles.actions}>
            <a href="/contact" className={styles.ctaPrimary}>
              {ar ? 'نبدأ الحوار' : 'Start a Conversation'}
              <ArrowUpRight size={16} />
            </a>
            <a href="/services" className={styles.ctaGhost}>
              {ar ? 'منهجيتنا' : 'Our Approach'}
            </a>
          </div>

          <div className={styles.stats}>
            {STATS.map((stat, i) => (
              <StatItem key={i} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
