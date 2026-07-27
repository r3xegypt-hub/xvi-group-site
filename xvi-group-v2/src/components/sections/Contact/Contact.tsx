// XVI GROUP — Contact Section
// Action-oriented personality with clean form and trust indicators

import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <Section variant="warm" id="contact">
      <Container>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.overline}>
            {language === 'ar' ? 'تواصل معنا' : 'CONTACT US'}
          </p>
          <h2 className={styles.title}>
            {language === 'ar'
              ? 'لنصنع معاً شيئاً استثنائياً'
              : "Let's Build Something Extraordinary"}
          </h2>
          <p className={styles.description}>
            {language === 'ar'
              ? 'هل تسعى لنقلة نوعية في مؤسستك؟ فريقنا جاهز لمساعدتك.'
              : "Ready to transform your enterprise? We're here to help."}
          </p>
        </div>

        <div className={styles.content}>
          <form ref={formRef as any} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <Input
                label={language === 'ar' ? 'الاسم الكامل' : 'Your Name'}
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.formRow}>
              <Input
                label={language === 'ar' ? 'اسم المؤسسة' : 'Company'}
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <Input
                label={language === 'ar' ? 'الموضوع' : 'Subject'}
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <Textarea
              label={language === 'ar' ? 'رسالتك' : 'Your Message'}
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
                ? (language === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent!')
                : (language === 'ar' ? 'إرسال الرسالة' : 'Send Message')}
            </Button>
          </form>

          <div ref={infoRef} className={styles.info}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>
                {language === 'ar' ? 'العنوان' : 'Headquarters'}
              </h3>
              <p className={styles.infoText}>
                {language === 'ar' ? 'أبو ظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </h3>
              <p className={styles.infoText}>contact@xvigroup.com</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>
                {language === 'ar' ? 'الفروع' : 'Locations'}
              </h3>
              <p className={styles.infoText}>
                {language === 'ar'
                  ? 'أبو ظبي · دبي · الرياض'
                  : 'Abu Dhabi · Dubai · Riyadh'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
