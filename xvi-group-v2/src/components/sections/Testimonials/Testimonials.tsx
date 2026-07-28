import { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { useScrollReveal, useScrollRevealGroup } from '../../../motion/hooks/useScrollReveal';
import styles from './Testimonials.module.scss';

const STORIES = [
  { number: '01', title: 'Intelligence, made sovereign', titleAr: 'ذكاء سيادي، بملكية كاملة', copy: 'A secure intelligence layer for decisions that cannot be outsourced.', copyAr: 'طبقة ذكاء آمنة للقرارات التي لا يمكن تفويضها.' },
  { number: '02', title: 'Operations, made adaptive', titleAr: 'عمليات تتكيف باستمرار', copy: 'A blueprint for turning complex operations into compounding advantage.', copyAr: 'مخطط يحوّل العمليات المعقدة إلى ميزة تراكمية.' },
  { number: '03', title: 'Leadership, made ready', titleAr: 'قيادة مستعدة لما بعد اليوم', copy: 'A focused program for leaders navigating the next operating model.', copyAr: 'برنامج مركّز للقادة الذين يصممون نموذج العمل القادم.' },
];

export function Testimonials() {
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const gridRef = useScrollRevealGroup({ direction: 'up', duration: 800, stagger: 150 });
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="success-stories">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>{ar ? 'قصص النجاح القادمة' : 'FUTURE SUCCESS STORIES'}</p>
          <h2 className={styles.title}>{ar ? 'العمل الذي سيُعرّف المرحلة القادمة' : 'Work that will define what comes next.'}</h2>
          <p className={styles.intro}>{ar ? 'نصمم الشراكات بعناية قبل أن تصبح قصص نجاح.' : 'We design consequential partnerships before they become case studies.'}</p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {STORIES.map((story) => (
            <article className={styles.story} key={story.number}>
              <div className={styles.topline}><span>{story.number}</span><span className={styles.diamond}>◇</span></div>
              <h3>{ar ? story.titleAr : story.title}</h3>
              <p>{ar ? story.copyAr : story.copy}</p>
              <span className={styles.status}>{ar ? 'المقعد التالي مفتوح' : 'The next mandate is open'}</span>
            </article>
          ))}
        </div>

        <div className={styles.rating}>
          <div>
            <span className={styles.ratingLabel}>{ar ? 'بعد اكتمال الشراكة' : 'AFTER A PARTNERSHIP IS COMPLETE'}</span>
            <p>{ar ? 'كيف تقيّم تجربة العمل معنا؟' : 'How would you rate the experience of working with us?'}</p>
          </div>
          <div className={styles.stars} role="radiogroup" aria-label="Rate your experience">
            {[1, 2, 3, 4, 5].map((value) => (
              <button key={value} type="button" aria-label={`${value} stars`} aria-pressed={rating === value} onClick={() => setRating(value)}>
                <Star size={20} fill={value <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
