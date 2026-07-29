// XVI GROUP — CTA Section

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import styles from './CTA.module.scss';

export function CTA() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="default" id="cta" className={styles.cta}>
      <Container>
        <div className={styles.content}>
          <p className={styles.overline}>{ar ? 'مستعد للبدء؟' : 'Ready to Begin'}</p>
          <h2 className={styles.title}>
            {ar ? "لنبني مستقبل مؤسستك" : "Let's Build Your Enterprise's Future"}
          </h2>
          <p className={styles.description}>
            {ar
              ? 'احجز استشارة سرية مع فريقنا الاستشاري.'
              : 'Schedule a confidential consultation with our advisory team.'}
          </p>
          <div className={styles.actions}>
            <a href="/contact" className={styles.primaryBtn}>
              {ar ? 'نبدأ الحوار' : 'Start a Conversation'}
              <ArrowUpRight size={16} />
            </a>
            <a href="/services" className={styles.secondaryBtn}>
              {ar ? 'استكشف القدرات' : 'Explore Capabilities'}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
