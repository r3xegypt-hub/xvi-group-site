import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { AnimatedGradient } from '../../../motion/FloatingParticles';
import styles from './Contact.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function Contact() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="warm" id="contact" className={styles.section}>
      <AnimatedGradient
        colors={['rgba(200, 166, 90, 0.03)', 'transparent', 'transparent']}
        duration={12}
        className={styles.bgGradient}
      />
      <Container>
        <SectionHeader
          overline={ar ? 'تواصل' : 'CONTACT'}
          title={ar ? 'ابدأ الحوار' : 'Start the Conversation'}
          description={ar ? 'هل لديك مشروع طموح؟ دعنا نتحدث.' : 'Have an ambitious project? Let\'s talk.'}
        />
        <div className={styles.split} ref={ref}>
          <motion.form
            className={styles.form}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
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
            <motion.button
              type="submit"
              className={styles.submit}
              whileHover={{ scale: 1.02, backgroundColor: '#B8963E' }}
              whileTap={{ scale: 0.98 }}
            >
              {ar ? 'إرسال الرسالة' : 'Send Message'}
              <ArrowUpRight size={14} />
            </motion.button>
          </motion.form>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
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
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
