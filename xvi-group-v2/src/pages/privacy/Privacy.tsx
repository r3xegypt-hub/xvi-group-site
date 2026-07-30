import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { CTA } from '../../components/sections/CTA';
import styles from './Legal.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function PrivacyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="warm" className={styles.pageHero}>
        <Container>
          <motion.div
            ref={ref}
            className={styles.heroInner}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              className={styles.overline}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } } }}
            >
              {ar ? 'الخصوصية' : 'PRIVACY'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar ? 'آخر تحديث: يوليو 2026' : 'Last updated: July 2026'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <SectionReveal variant="fadeUp">
        <Section variant="white" className={styles.contentSection}>
          <Container>
            <div className={styles.content}>
              {ar ? (
                <>
                  <h2>١. مقدمة</h2>
                  <p>مرحباً بك في XVI GROUP ("الشركة"). نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. تصف هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا وخدماتنا.</p>

                  <h2>٢. المعلومات التي نجمعها</h2>
                  <p>قد نجمع المعلومات التالية:</p>
                  <ul>
                    <li>معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف) عند التواصل معنا أو طلب استشارة.</li>
                    <li>معلومات الاستخدام مثل عنوان IP ونوع المتصفح وصفحات الزيارة.</li>
                    <li>معلومات مقدمة طوعاً عبر نماذج التواصل أو المراسلات الإلكترونية.</li>
                  </ul>

                  <h2>٣. كيف نستخدم معلوماتك</h2>
                  <p>نستخدم المعلومات المجمعة لـ:</p>
                  <ul>
                    <li>تقديم الخدمات الاستشارية المطلوبة.</li>
                    <li>التواصل معك بخصوص استفساراتك وطلباتك.</li>
                    <li>تحسين موقعنا وتجربة المستخدم.</li>
                    <li>الامتثال للالتزامات القانونية.</li>
                  </ul>

                  <h2>٤. حماية البيانات</h2>
                  <p>نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.</p>

                  <h2>٥. مشاركة المعلومات</h2>
                  <p>لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط إذا تطلب الأمر ذلك بموجب القانون أو لحماية حقوقنا.</p>

                  <h2>٦. حقوقك</h2>
                  <p>لك الحق في الوصول إلى بياناتك وتعديلها أو حذفها. للتماس ذلك، يرجى التواصل معنا على contact@xvigroup.com.</p>

                  <h2>٧. التواصل</h2>
                  <p>لأي استفسارات حول سياسة الخصوصية، يرجى التواصل معنا على contact@xvigroup.com.</p>
                </>
              ) : (
                <>
                  <h2>1. Introduction</h2>
                  <p>Welcome to XVI GROUP ("the Company"). We respect your privacy and are committed to protecting your personal data. This policy describes how we collect, use, and safeguard your information when you use our website and services.</p>

                  <h2>2. Information We Collect</h2>
                  <p>We may collect the following information:</p>
                  <ul>
                    <li>Contact information (name, email, phone number) when you reach out to us or request a consultation.</li>
                    <li>Usage data such as IP address, browser type, and pages visited.</li>
                    <li>Information voluntarily provided through contact forms or email correspondence.</li>
                  </ul>

                  <h2>3. How We Use Your Information</h2>
                  <p>We use collected information to:</p>
                  <ul>
                    <li>Provide the consulting services you request.</li>
                    <li>Communicate with you regarding your inquiries and requests.</li>
                    <li>Improve our website and user experience.</li>
                    <li>Comply with legal obligations.</li>
                  </ul>

                  <h2>4. Data Protection</h2>
                  <p>We implement appropriate security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.</p>

                  <h2>5. Information Sharing</h2>
                  <p>We do not sell or rent your personal information to third parties. We may share your information only when required by law or to protect our rights.</p>

                  <h2>6. Your Rights</h2>
                  <p>You have the right to access, modify, or delete your data. To request this, please contact us at contact@xvigroup.com.</p>

                  <h2>7. Contact</h2>
                  <p>For any questions about this privacy policy, please contact us at contact@xvigroup.com.</p>
                </>
              )}
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <CTA />
    </>
  );
}
