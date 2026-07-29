import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import styles from './Contact.module.scss';

export function Contact() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <Section variant="warm" id="contact">
      <Container>
        <SectionHeader
          overline={ar ? 'تواصل' : 'CONTACT'}
          title={ar ? 'ابدأ الحوار' : 'Start the Conversation'}
          description={ar ? 'هل لديك مشروع طموح؟ دعنا نتحدث.' : 'Have an ambitious project? Let\'s talk.'}
        />
        <div className={styles.split}>
          <form className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>{ar ? 'الاسم' : 'Name'}</label>
                <input type="text" className={styles.input} placeholder={ar ? 'اسمك الكامل' : 'Your full name'} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{ar ? 'البريد الإلكتروني' : 'Email'}</label>
                <input type="email" className={styles.input} placeholder={ar ? 'بريدك الإلكتروني' : 'Your email'} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>{ar ? 'الهاتف' : 'Phone'}</label>
                <input type="tel" className={styles.input} placeholder="+971" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{ar ? 'المؤسسة' : 'Company'}</label>
                <input type="text" className={styles.input} placeholder={ar ? 'اسم المؤسسة' : 'Company name'} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{ar ? 'الرسالة' : 'Message'}</label>
              <textarea className={styles.textarea} rows={4} placeholder={ar ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} />
            </div>
            <button type="submit" className={styles.submit}>
              {ar ? 'إرسال الرسالة' : 'Send Message'}
              <ArrowUpRight size={16} />
            </button>
          </form>
          <div className={styles.info}>
            <span className={styles.infoAccent} aria-hidden="true" />
            <h3 className={styles.infoCity}>{ar ? 'دبي، الإمارات' : 'Dubai, UAE'}</h3>
            <p className={styles.infoAddress}>{ar ? 'مركز دبي المالي العالمي' : 'Dubai International Financial Centre'}</p>
            <a href="mailto:xvi@xvi-group.net" className={styles.infoEmail}>xvi@xvi-group.net</a>
            <p className={styles.infoPhone}>+971 56 922 0064</p>
            <div className={styles.social}>
              <span className={styles.socialLabel}>{ar ? 'تواصل اجتماعي' : 'Social'}</span>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
                <a href="#" className={styles.socialLink}>Twitter</a>
                <a href="#" className={styles.socialLink}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
