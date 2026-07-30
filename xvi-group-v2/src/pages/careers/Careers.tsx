import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Globe, ArrowUpRight, Heart, Zap, Shield, Target } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionReveal } from '../../motion/SectionReveal';
import { GeometricShapes } from '../../components/ui/GeometricShapes';
import { CTA } from '../../components/sections/CTA';
import styles from './Careers.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const values = [
  {
    icon: Target,
    title: { en: 'Meaningful Work', ar: 'عمل ذو معنى' },
    desc: {
      en: 'Work on real AI transformations across sectors. Every project creates measurable impact for enterprises navigating the future.',
      ar: 'اعمل على تحويلات حقيقية بالذكاء الاصطناعي عبر القطاعات. كل مشروع يخلق تأثيراً قابلاً للقياس للمؤسسات التي ت navigate المستقبل.',
    },
  },
  {
    icon: Users,
    title: { en: 'Distinction Team', ar: 'فريق متميز' },
    desc: {
      en: 'Join a team committed to excellence and innovation. We value precision, clarity, and partnership in everything we do.',
      ar: 'انضم إلى فريق يلتزم بالتميز والابتكار. ن高度重视 الدقة والوضوح والشراكة في كل ما نفعله.',
    },
  },
  {
    icon: Globe,
    title: { en: 'Limitless Growth', ar: 'نمو بلا حدود' },
    desc: {
      en: 'Opportunities for professional development and continuous learning. We invest in our people because they are our greatest asset.',
      ar: 'فرص للتطور المهني والتعلم المستمر. نستثمر في أفرادنا لأنهم أثمن أصولنا.',
    },
  },
  {
    icon: Zap,
    title: { en: 'Innovation Culture', ar: 'ثقافة الابتكار' },
    desc: {
      en: 'We encourage creative thinking and bold ideas. Our environment rewards initiative and intellectual curiosity.',
      ar: 'نشجع التفكير الإبداعي والأفكار الجريئة. بيئتناكافئ المبادرة والفضول الفكري.',
    },
  },
];

const roles = [
  {
    icon: Brain,
    title: { en: 'AI Strategy Consultant', ar: 'مستشار استراتيجية الذكاء الاصطناعي' },
    dept: { en: 'Advisory', ar: 'استشارات' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
    location: { en: 'Al Ain / Remote', ar: 'العين / عن بعد' },
    desc: {
      en: 'Design AI strategies for enterprise clients. Map decision architectures and create transformation roadmaps.',
      ar: 'صمم استراتيجيات الذكاء الاصطناعي لعملاء المؤسسات. ارسم هندسة القرارات وأنشئ خرائط طريق للتحول.',
    },
  },
  {
    icon: Workflow,
    title: { en: 'Automation Architect', ar: 'مهندس الأتمتة' },
    dept: { en: 'Technology', ar: 'التكنولوجيا' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
    location: { en: 'Al Ain / Remote', ar: 'العين / عن بعد' },
    desc: {
      en: 'Design and implement intelligent automation systems. Orchestrate workflows that learn and adapt.',
      ar: 'صمم ونفظ أنظمة الأتمتة الذكية. نسق تدفقات العمل التي تتعلم وتتكيف.',
    },
  },
  {
    icon: Shield,
    title: { en: 'Governance Specialist', ar: 'متخصص الحوكمة' },
    dept: { en: 'Advisory', ar: 'استشارات' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
    location: { en: 'Al Ain / Remote', ar: 'العين / عن بعد' },
    desc: {
      en: 'Build governance frameworks for AI adoption. Ensure compliance and ethical AI deployment.',
      ar: 'ابنِ أطر الحوكمة لتبني الذكاء الاصطناعي. ضمان الامتثال والنشر الأخلاقي للذكاء الاصطناعي.',
    },
  },
];

export function CareersPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Section variant="warm" className={styles.pageHero}>
        <GeometricShapes count={12} color="#C8A65A" />
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
              {ar ? 'الوظائف' : 'CAREERS'}
            </motion.span>
            <motion.h1
              className={styles.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
            >
              {ar ? 'ابنِ المستقبل معنا' : 'Build the Future With Us'}
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } } }}
            >
              {ar
                ? 'نبحث عن أفراد استثنائيين يريدون تشكيل مستقبل الذكاء الاصطناعي في الأعمال. فريق يلتزم بالتميز والابتكار.'
                : 'We seek extraordinary individuals who want to shape the future of AI in business. A team committed to excellence and innovation.'}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <SectionReveal variant="fadeUp">
        <Section variant="white" className={styles.valuesSection}>
          <Container>
            <h2 className={styles.sectionTitle}>{ar ? 'لماذا XVI؟' : 'Why XVI?'}</h2>
            <div className={styles.valuesGrid}>
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                >
                  <value.icon size={24} strokeWidth={1.5} className={styles.valueIcon} />
                  <h3 className={styles.valueTitle}>{ar ? value.title.ar : value.title.en}</h3>
                  <p className={styles.valueDesc}>{ar ? value.desc.ar : value.desc.en}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <SectionReveal variant="scaleIn">
        <Section variant="warm" className={styles.openingsSection}>
          <Container>
            <h2 className={styles.sectionTitle}>{ar ? 'الفرص المتاحة' : 'Open Positions'}</h2>
            <div className={styles.rolesGrid}>
              {roles.map((role, i) => (
                <Link
                  to="/contact"
                  key={i}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <motion.div
                    className={styles.roleCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  >
                    <div className={styles.roleHeader}>
                      <div className={styles.roleIconWrap}>
                        <role.icon size={20} strokeWidth={1.5} className={styles.roleIcon} />
                      </div>
                      <div className={styles.roleMeta}>
                        <span className={styles.roleDept}>{ar ? role.dept.ar : role.dept.en}</span>
                        <span className={styles.roleDot}>·</span>
                        <span className={styles.roleType}>{ar ? role.type.ar : role.type.en}</span>
                      </div>
                    </div>
                    <h3 className={styles.roleTitle}>{ar ? role.title.ar : role.title.en}</h3>
                    <p className={styles.roleDesc}>{ar ? role.desc.ar : role.desc.en}</p>
                    <div className={styles.roleFooter}>
                      <span className={styles.roleLocation}>{ar ? role.location.ar : role.location.en}</span>
                      <ArrowUpRight size={14} className={styles.roleArrow} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className={styles.comingSoonCard}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className={styles.comingSoonInner}
              >
                <h3 className={styles.comingSoonTitle}>
                  {ar ? 'المزيد من الوظائف قادم قريباً' : 'More positions opening soon'}
                </h3>
                <p className={styles.comingSoonDesc}>
                  {ar
                    ? 'نحن في مرحلة بناء الفريق والتوسع. ستظهر فرص جديدة هنا بشكل منتظم.'
                    : 'We are in the team-building and expansion phase. New opportunities will appear here regularly.'}
                </p>
                <a href="/contact" className={styles.contactLink}>
                  {ar ? 'تواصل معنا' : 'Get in touch'}
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </div>
          </Container>
        </Section>
      </SectionReveal>

      <CTA />
    </>
  );
}

function Brain(props: React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function Workflow(props: React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}
