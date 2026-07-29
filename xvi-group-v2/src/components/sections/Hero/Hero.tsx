import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { HeroIllustration } from '../../ui/HeroIllustration';
import styles from './Hero.module.scss';

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <section className={styles.hero} aria-label="Hero">
      <Container className={styles.inner}>
        <div className={styles.split}>
          <div className={styles.contentCol}>
            <p className={styles.eyebrow}>
              {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
            </p>
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
                  The Intelligence
                  <br />
                  <span className={styles.accentWord}>Behind the</span>
                  <br />
                  Ambitious.
                </>
              )}
            </h1>
            <p className={styles.subhead}>
              {ar
                ? 'استراتيجية · ذكاء اصطناعي · عمليات — من الرؤية إلى التنفيذ.'
                : 'Strategy. AI. Operations. — From vision to execution, across the Middle East and beyond.'}
            </p>
            <div className={styles.actions}>
              <a href="/contact" className={styles.ctaPrimary}>
                {ar ? 'ابدأ الحوار' : 'Start a Conversation'}
                <ArrowUpRight size={14} />
              </a>
              <a href="/services" className={styles.ctaSecondary}>
                {ar ? 'منهجيتنا' : 'Our Approach'}
              </a>
            </div>
          </div>

          <div className={styles.illustrationCol}>
            <HeroIllustration />
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12+</span>
            <span className={styles.statAccent} aria-hidden="true" />
            <span className={styles.statLabel}>{ar ? 'سنوات' : 'Years'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statAccent} aria-hidden="true" />
            <span className={styles.statLabel}>{ar ? 'مشروع' : 'Projects'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statAccent} aria-hidden="true" />
            <span className={styles.statLabel}>{ar ? 'التزام' : 'Delivery'}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
