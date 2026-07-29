// XVI GROUP — CTA Section (Sprint 02)
// Unforgettable luxury call-to-action

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Button } from '../../buttons/Button';
import { SignalRule } from '../../../svg/geometry/SignalRule';
import { useScrollReveal } from '../../../motion/hooks/useScrollReveal';
import styles from './CTA.module.scss';

export function CTA() {
  const { language } = useLanguage();
  const ref = useScrollReveal({ direction: 'blur', duration: 1000 });
  const ar = language === 'ar';

  return (
    <section className={styles.cta} aria-labelledby="cta-heading">
      <div className={styles.ambientLight} aria-hidden="true" />
      <div className={styles.ambientLightSecondary} aria-hidden="true" />
      <Container>
        <div ref={ref} className={styles.content}>
          <p className={styles.overline}>{ar ? 'مستعد للبدء؟' : 'Ready to Begin'}</p>
          <h2 id="cta-heading" className={styles.title}>
            {ar ? 'معاً نحو مستقبل مؤسستك' : "Let's Build Your Enterprise's Future"}
          </h2>
          <p className={styles.description}>
            {ar
              ? 'احجز استشارة سرية مع فريقنا الاستشاري.'
              : 'Schedule a confidential consultation with our advisory team.'}
          </p>
          <SignalRule width="100px" height={6} className={styles.meridian} />
          <div className={styles.ctas}>
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className={styles.primaryBtn}
              icon={<ArrowUpRight size={18} aria-hidden="true" />}
            >
              {ar ? 'نبدأ الحوار' : 'Start a Conversation'}
            </Button>
            <Button variant="secondary" size="lg" href="/services" className={styles.secondaryBtn}>
              {ar ? 'استكشف القدرات' : 'Explore Our Capabilities'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
