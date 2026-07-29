import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './CTA.module.scss';

export function CTA() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="navy" id="cta" className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {ar ? 'مستعد لتحويل مؤسستك؟' : 'Ready to Transform Your Enterprise?'}
          </h2>
          <span className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>
            {ar ? 'احجز استشارة سرية مع فريقنا الاستراتيجي.' : 'Book a confidential consultation with our strategy team.'}
          </p>
          <div className={styles.actions}>
            <a href="/contact" className={styles.ctaPrimary}>
              {ar ? 'احجز استشارة' : 'Book a Consultation'}
              <ArrowUpRight size={16} />
            </a>
            <a href="/services" className={styles.ctaSecondary}>
              {ar ? 'استكشف منهجيتنا' : 'Explore Our Approach'}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
