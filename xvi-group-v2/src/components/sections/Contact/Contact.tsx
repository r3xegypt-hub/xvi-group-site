import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Clock, Shield, MapPin } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import { PremiumCard } from '../../ui/PremiumCard';
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
        duration={15}
        className={styles.bgGradient}
      />
      <Container>
        <div className={styles.split} ref={ref}>
          <motion.div
            className={styles.visualCol}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className={styles.visualFrame}>
              <div className={styles.visualGrid}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className={styles.visualCell}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.04 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + i * 0.02, duration: 0.4 }}
                  />
                ))}
              </div>
              <div className={styles.visualContent}>
                <motion.div
                  className={styles.visualIcon}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin size={28} />
                </motion.div>
                <h3 className={styles.visualCity}>{ar ? 'العين، الإمارات' : 'Al Ain, UAE'}</h3>
                <p className={styles.visualAddress}>
                  {ar ? 'مدينة العين' : 'Al Ain — Abu Dhabi'}
                </p>
                <div className={styles.visualDetails}>
                  <div className={styles.visualDetail}>
                    <Clock size={14} />
                    <span>{ar ? 'الرد خلال ٢٤ ساعة' : 'Response within 24 hours'}</span>
                  </div>
                  <div className={styles.visualDetail}>
                    <Shield size={14} />
                    <span>{ar ? 'استشارة سرية' : 'Confidential consultation'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <SectionReveal variant="slideRight" className={styles.formCol}>
            <PremiumCard glassIntensity="heavy" hoverScale={false}>
            <div className={styles.formHeader}>
              <span className={styles.formEyebrow}>
                {ar ? 'احجز استشارتك' : 'Book Your Consultation'}
              </span>
              <h2 className={styles.formTitle}>
                {ar ? 'ابدأ الحوار' : 'Start the Conversation'}
              </h2>
              <p className={styles.formDesc}>
                {ar ? 'دعنا نناقش كيف يمكن لـ XVI تحويل مؤسستك.' : "Let's discuss how XVI can transform your enterprise."}
              </p>
            </div>

            <form className={styles.form}>
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
                whileHover={{ scale: 1.02, backgroundColor: '#B8963E' }}
                whileTap={{ scale: 0.98 }}
              >
                {ar ? 'إرسال طلب الاستشارة' : 'Submit Consultation Request'}
                <ArrowUpRight size={14} />
              </motion.button>
            </form>
            </PremiumCard>
          </SectionReveal>
        </div>
      </Container>
    </Section>
  );
}
