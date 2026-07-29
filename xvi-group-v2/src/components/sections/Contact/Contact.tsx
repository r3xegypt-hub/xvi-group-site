// XVI GROUP — Contact Section (Sprint 02)
// Premium executive contact with luxury form

import { useState } from 'react';
import { MapPin, Mail, Building2 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { Button } from '../../buttons/Button';
import { Input } from '../../forms/Input';
import { Textarea } from '../../forms/Textarea';
import { useScrollReveal } from '../../../motion/hooks/useScrollReveal';
import styles from './Contact.module.scss';

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const headerRef = useScrollReveal({ direction: 'up', duration: 800 });
  const formRef = useScrollReveal({ direction: 'up', duration: 800, delay: 200 });
  const infoRef = useScrollReveal({ direction: 'left', duration: 800, delay: 300 });
  const ar = language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <Section variant="warm" id="contact" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <p className={styles.overline}>{ar ? 'تواصل معنا' : 'Contact'}</p>
            <h2 className={styles.title}>
              {ar ? 'لنصنع معاً شيئاً استثنائياً' : "Let's Build Something Extraordinary"}
            </h2>
            <p className={styles.description}>
              {ar
                ? 'هل تسعى لنقلة نوعية في مؤسستك؟ فريقنا جاهز لمساعدتك.'
                : "Ready to transform your enterprise? We're here to help."}
            </p>
          </div>

          <div className={styles.content}>
            <div ref={formRef} className={styles.formWrapper}>
            <form className={styles.formCard} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <Input
                  label={ar ? 'الاسم الكامل' : 'Your Name'}
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label={ar ? 'البريد الإلكتروني' : 'Email Address'}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <Input
                  label={ar ? 'اسم المؤسسة' : 'Company'}
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <Input
                  label={ar ? 'الموضوع' : 'Subject'}
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <Textarea
                label={ar ? 'رسالتك' : 'Your Message'}
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={status === 'sending'}
                fullWidth
              >
                {status === 'success'
                  ? (ar ? 'تم الإرسال بنجاح!' : 'Message Sent!')
                  : (ar ? 'إرسال الرسالة' : 'Send Message')}
              </Button>
            </form>
            </div>

            <aside ref={infoRef} className={styles.sidebar}>
              <div className={styles.mapComposition} aria-hidden="true">
                <div className={styles.mapGrid}>
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className={styles.mapCell} />
                  ))}
                </div>
                <div className={styles.mapPin}>
                  <MapPin size={20} />
                </div>
                <span className={styles.mapLabel}>{ar ? 'أبو ظبي' : 'Abu Dhabi'}</span>
              </div>

              <div className={styles.infoBlocks}>
                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}><Building2 size={18} aria-hidden="true" /></div>
                  <div>
                    <h3 className={styles.infoTitle}>{ar ? 'المقر الرئيسي' : 'Headquarters'}</h3>
                    <p className={styles.infoText}>
                      {ar ? 'أبو ظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
                    </p>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}><Mail size={18} aria-hidden="true" /></div>
                  <div>
                    <h3 className={styles.infoTitle}>{ar ? 'البريد الإلكتروني' : 'Email'}</h3>
                    <p className={styles.infoText}>contact@xvigroup.com</p>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}><MapPin size={18} aria-hidden="true" /></div>
                  <div>
                    <h3 className={styles.infoTitle}>{ar ? 'الفروع' : 'Locations'}</h3>
                    <p className={styles.infoText}>
                      {ar ? 'أبو ظبي · دبي · الرياض' : 'Abu Dhabi · Dubai · Riyadh'}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}
