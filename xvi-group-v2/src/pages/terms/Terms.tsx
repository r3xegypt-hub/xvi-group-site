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

export function TermsPage() {
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
              {ar ? 'الشروط' : 'TERMS'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'شروط الاستخدام' : 'Terms of Service'}
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
                  <h2>١. قبول الشروط</h2>
                  <p>باستخدام موقعنا وخدماتك، أنت توافق على شروط الاستخدام هذه. إذا كنت لا توافق، يرجى عدم استخدام موقعنا.</p>

                  <h2>٢. وصف الخدمات</h2>
                  <p>تقدم XVI GROUP خدمات استشارية متخصصة في الذكاء الاصطناعي وتحول الأعمال والتكنولوجيا. الخدمات تشمل على سبيل المثال لا الحصر:</p>
                  <ul>
                    <li>الاستشارات الاستراتيجية للذكاء الاصطناعي</li>
                    <li>أتمتة العمليات التجارية</li>
                    <li>تحول الأعمال الرقمي</li>
                    <li>التدريب التنفيذي</li>
                  </ul>

                  <h2>٣. أتعاب الخدمات</h2>
                  <p>تُحدد أتعاب الخدمات بناءً على نطاق العمل المتفق عليه. جميع التفاصيل المالية تُوثق في عقد الخدمة الخاص بكل مشروع.</p>

                  <h2>٤. السرية</h2>
                  <p>نلتزم بالسرية التامة تجاه جميع المعلومات التي ن 알아ها أثناء تقديم الخدمات. لن نكشف معلومات العميل لأطراف ثالثة بدون موافقة كتابية.</p>

                  <h2>٥. الملكية الفكرية</h2>
                  <p>تبقى جميع حقوق الملكية الفكرية الناتجة عن خدماتنا ملكاً للشركة أو العميل وفقاً لاتفاقيات الخدمة المبرمة.</p>

                  <h2>٦. حدود المسؤولية</h2>
                  <p>نسعى دائماً لتقديم أفضل الخدمات ممكنة. ومع ذلك، لا نضمن نتائج محددة ونكون مسؤولين فقط ضمن الحدود المنصوص عليها في عقد الخدمة.</p>

                  <h2>٧. تعديل الشروط</h2>
                  <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة.</p>

                  <h2>٨. التواصل</h2>
                  <p>لأي استفسارات حول شروط الاستخدام، يرجى التواصل معنا على contact@xvigroup.com.</p>
                </>
              ) : (
                <>
                  <h2>1. Acceptance of Terms</h2>
                  <p>By using our website and services, you agree to these Terms of Service. If you do not agree, please do not use our website.</p>

                  <h2>2. Service Description</h2>
                  <p>XVI GROUP provides consulting services specializing in AI transformation, business automation, and technology advisory. Services include but are not limited to:</p>
                  <ul>
                    <li>AI Strategy Consulting</li>
                    <li>Business Process Automation</li>
                    <li>Digital Transformation</li>
                    <li>Executive Training</li>
                  </ul>

                  <h2>3. Fees</h2>
                  <p>Service fees are determined based on the agreed scope of work. All financial details are documented in each project's service agreement.</p>

                  <h2>4. Confidentiality</h2>
                  <p>We maintain strict confidentiality regarding all information learned while providing services. We will not disclose client information to third parties without written consent.</p>

                  <h2>5. Intellectual Property</h2>
                  <p>All intellectual property rights resulting from our services remain with the Company or the Client as specified in the service agreements.</p>

                  <h2>6. Limitation of Liability</h2>
                  <p>We strive to provide the best possible services. However, we do not guarantee specific results and are only liable within the limits specified in the service agreement.</p>

                  <h2>7. Changes to Terms</h2>
                  <p>We reserve the right to modify these terms at any time. Any changes will be posted on this page.</p>

                  <h2>8. Contact</h2>
                  <p>For any questions about these Terms of Service, please contact us at contact@xvigroup.com.</p>
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
