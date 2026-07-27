// XVI GROUP — CTA Section
// Full-width call-to-action with gold accent

import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Button } from '../../buttons/Button';
import { MeridianLine } from '../../../svg/geometry/MeridianLine';
import { useScrollReveal } from '../../../motion/hooks/useScrollReveal';
import styles from './CTA.module.scss';

export function CTA() {
  const { language } = useLanguage();
  const ref = useScrollReveal({ direction: 'blur', duration: 1000 });

  return (
    <section className={styles.cta}>
      <Container>
        <div ref={ref} className={styles.content}>
          <p className={styles.overline}>
            {language === 'ar' ? 'مستعد للبدء؟' : 'READY TO BEGIN?'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar'
              ? 'معاً نحو مستقبل مؤسستك'
              : "Let's Build Your Enterprise's Future"}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'احجز استشارة سرية مع فريقنا الاستشاري.'
              : 'Schedule a confidential consultation with our team.'}
          </p>
          <MeridianLine variant="gold" width="120px" height={2} className={styles.meridian} />
          <div className={styles.ctas}>
            <Button variant="primary" size="lg" href="/contact">
              {language === 'ar' ? 'نبدأ الحوار' : 'Start a Conversation'}
            </Button>
            <Button variant="secondary" size="lg" href="/services">
              {language === 'ar' ? 'تحميل القدرات' : 'Download Our Capabilities'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
