import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, MapPin, Clock, Shield, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './Contact.module.scss';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Contact() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="warm" id="contact" className={styles.section}>
      <Container>
        <div className={styles.layout} ref={ref}>
          <motion.div
            className={styles.editorialCol}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className={styles.editorialFrame}>
              <div className={styles.editorialImage} />
              <div className={styles.editorialGlow} />
              <div className={styles.editorialContent}>
                <div className={styles.editorialBadge}>
                  <MapPin size={14} />
                  <span>{ar ? 'العين، الإمارات' : 'Al Ain, UAE'}</span>
                </div>
                <h3 className={styles.editorialTitle}>{ar ? 'ابدأ المحادثة' : 'Start the Conversation'}</h3>
                <p className={styles.editorialDesc}>
                  {ar ? 'كل تحول عظيم يبدأ بمحادثة. دعنا نناقش كيف يمكن لـ XVI تحويل مؤسستك.' : 'Every great transformation starts with a conversation. Let\'s discuss how XVI can transform your enterprise.'}
                </p>
                <div className={styles.editorialDetails}>
                  <div className={styles.detailRow}>
                    <Mail size={14} />
                    <div>
                      <span className={styles.detailLabel}>{ar ? 'البريد' : 'Email'}</span>
                      <a href="mailto:contact@xvigroup.com" className={styles.detailValue}>contact@xvigroup.com</a>
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <Phone size={14} />
                    <div>
                      <span className={styles.detailLabel}>{ar ? 'الهاتف' : 'Phone'}</span>
                      <span className={styles.detailValue}>+971 56 922 0064</span>
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <Clock size={14} />
                    <span className={styles.detailValue}>{ar ? 'الرد خلال 24 ساعة' : 'Response within 24 hours'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <Shield size={14} />
                    <span className={styles.detailValue}>{ar ? 'استشارة سرية' : 'Confidential consultation'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <SectionReveal variant="slideRight" className={styles.formCol}>
            <div className={styles.formCard}>
              <div className={styles.formAccent} />
              <div className={styles.formHeader}>
                <p className={styles.formEyebrow}>
                  {ar ? 'احجز استشارتك' : 'Book Your Consultation'}
                </p>
              </div>

              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <input type="text" className={styles.input} placeholder={ar ? 'الاسم الكامل' : 'Full name'} />
                    <span className={styles.fieldLine} />
                  </div>
                  <div className={styles.field}>
                    <input type="email" className={styles.input} placeholder={ar ? 'البريد الإلكتروني' : 'Email address'} />
                    <span className={styles.fieldLine} />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <input type="tel" className={styles.input} placeholder="+971" />
                    <span className={styles.fieldLine} />
                  </div>
                  <div className={styles.field}>
                    <input type="text" className={styles.input} placeholder={ar ? 'المؤسسة' : 'Company'} />
                    <span className={styles.fieldLine} />
                  </div>
                </div>
                <div className={styles.field}>
                  <textarea className={styles.textarea} rows={3} placeholder={ar ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} />
                  <span className={styles.fieldLine} />
                </div>
                <motion.button
                  type="submit"
                  className={styles.submit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ar ? 'إرسال طلب الاستشارة' : 'Submit Consultation Request'}
                  <ArrowUpRight size={14} />
                </motion.button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </Container>
    </Section>
  );
}