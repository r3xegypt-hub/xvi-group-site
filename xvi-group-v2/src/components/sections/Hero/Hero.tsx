import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { AINetwork } from '../../ui/AINetwork';
import { LightBeam } from '../../../motion/LightBeam';
import { FloatingParticles } from '../../../motion/FloatingParticles';
import { DataStream } from '../../../motion/DataStream';
import { MouseReactive } from '../../../motion/MouseReactive';
import { HeroGlassPanel } from '../../ui/HeroGlassPanel';
import { ScrollIndicator } from '../../ui/ScrollIndicator';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const headlineWords = [
  { text: 'The', className: styles.headlineLight },
  { text: 'Intelligence', className: styles.headlineGold },
  { text: 'Behind', className: styles.headlineLight },
  { text: 'The', className: styles.headlineLight },
  { text: 'Ambitious', className: styles.headlineGold + ' ' + styles.headlineItalic },
];

const headlineWordsAr = [
  { text: 'الاستخبارات', className: styles.headlineGold },
  { text: 'وراء', className: styles.headlineLight },
  { text: 'الطموح', className: styles.headlineGold },
];

function WordReveal({ words, delay = 0 }: { words: { text: string; className: string }[]; delay?: number }) {
  return (
    <span className={styles.wordLine}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={word.className}
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease, delay: delay + i * 0.08 }}
          style={{ display: 'inline-block', marginRight: '0.15em' }}
        >
          {word.text}
          <span style={{ display: 'inline-block', width: '0.05em' }} />
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.95, 0.6]);
  const depthScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <motion.section className={styles.hero} ref={ref} aria-label="Hero" style={{ opacity: contentOpacity }}>
      <motion.div className={styles.parallaxBg} style={{ y: yOffset, scale: depthScale }}>
        <div className={styles.meshOverlay} />
        <AINetwork nodeCount={55} color="#C8A65A" pulseSpeed={3} className={styles.network} />
      </motion.div>

      <DataStream count={40} color="#C8A65A" speed={0.4} />

      <LightBeam position="top-right" intensity={0.12} />
      <LightBeam position="bottom-left" intensity={0.08} />
      <LightBeam position="center" intensity={0.04} />

      <div className={styles.volumetricBg} />
      <FloatingParticles count={25} color="#C8A65A" speed={0.35} className={styles.particles} />

      <div className={styles.panelLayer}>
        <HeroGlassPanel width={220} height={320} top="10%" right="8%" rotate={6} delay={0.2} opacity={0.5} />
        <HeroGlassPanel width={160} height={240} top="55%" left="5%" rotate={-4} delay={0.6} opacity={0.35} blur={16} />
        <HeroGlassPanel width={180} height={200} bottom="15%" right="18%" rotate={8} delay={1.0} opacity={0.3} blur={20} borderOpacity={0.04} />
        <HeroGlassPanel width={140} height={300} top="25%" left="60%" rotate={-6} delay={1.4} opacity={0.25} blur={24} borderOpacity={0.03} />
      </div>

      <Container className={styles.inner}>
        <MouseReactive intensity={6} perspective={1200}>
          <motion.div
            className={styles.split}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className={styles.contentCol}>
              <motion.p
                className={styles.eyebrow}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 } } }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#C8A65A', marginRight: 8 }}
                />
                {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
              </motion.p>

              <motion.h1
                className={styles.headline}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.25, duration: 0.8 } } }}
              >
                {ar ? (
                  <WordReveal words={headlineWordsAr} delay={0.3} />
                ) : (
                  <WordReveal words={headlineWords} delay={0.3} />
                )}
              </motion.h1>

              <motion.p
                className={styles.subhead}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.6 } } }}
              >
                {ar ? 'استراتيجية. ذكاء اصطناعي. عمليات. — من الرؤية إلى التنفيذ.' : 'Strategy. AI. Operations. — From vision to execution.'}
              </motion.p>

              <motion.div
                className={styles.actions}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.7 } } }}
              >
                <motion.a
                  href="/contact"
                  className={styles.ctaPrimary}
                  whileHover={{ scale: 1.02, backgroundColor: '#B8963E' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 45, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    style={{ display: 'inline-flex' }}
                  >
                    <ArrowUpRight size={14} />
                  </motion.span>
                  {ar ? 'ابدأ الحوار' : 'Start a Conversation'}
                  <motion.span
                    className={styles.ctaGlow}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.a>
                <a href="/services" className={styles.ctaSecondary}>
                  {ar ? 'منهجيتنا' : 'Our Approach'}
                </a>
              </motion.div>
            </div>

            <motion.div
              className={styles.visualCol}
              variants={{ hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease, delay: 0.3 } } }}
            >
              <div className={styles.visualFrame}>
                <div className={styles.visualGlow} />
                <svg className={styles.visualSvg} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#C8A65A" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C8A65A" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C8A65A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="20" y="30" width="360" height="440" rx="2" stroke="url(#heroGold)" strokeWidth="0.5" />
                  <motion.line
                    x1="40" y1="60" x2="360" y2="60"
                    stroke="url(#heroLine)" strokeWidth="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1="40" y1="440" x2="360" y2="440"
                    stroke="url(#heroLine)" strokeWidth="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.circle cx="200" cy="250" r="80" fill="none" stroke="#C8A65A" strokeWidth="0.3" strokeDasharray="4 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 250px' }}
                  />
                  <motion.circle cx="200" cy="250" r="55" fill="none" stroke="#C8A65A" strokeWidth="0.2" strokeDasharray="2 6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 250px' }}
                  />
                  <motion.circle cx="200" cy="250" r="35" fill="rgba(200,166,90,0.04)" stroke="rgba(200,166,90,0.1)" strokeWidth="0.3"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle cx="200" cy="250" r="3" fill="#C8A65A"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.line x1="200" y1="170" x2="200" y2="120" stroke="#C8A65A" strokeWidth="0.3" strokeDasharray="2 2"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.line x1="200" y1="330" x2="200" y2="380" stroke="#C8A65A" strokeWidth="0.3" strokeDasharray="2 2"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.line x1="120" y1="250" x2="70" y2="250" stroke="#C8A65A" strokeWidth="0.3" strokeDasharray="2 2"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.line x1="280" y1="250" x2="330" y2="250" stroke="#C8A65A" strokeWidth="0.3" strokeDasharray="2 2"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  />
                  {[45, 90, 135, 180, 225, 270, 315, 360].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = 85;
                    const cx = 200 + r * Math.cos(rad);
                    const cy = 250 + r * Math.sin(rad);
                    return (
                      <motion.circle key={i} cx={cx} cy={cy} r={1.5} fill="#C8A65A"
                        animate={{ opacity: [0.1, 0.6, 0.1] }}
                        transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }}
                      />
                    );
                  })}
                  <text x="40" y="88" fill="#999999" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="0.2em">
                    XVI EXECUTIVE AI
                  </text>
                  <text x="40" y="420" fill="#C8A65A" fontSize="6" fontFamily="Inter, sans-serif" letterSpacing="0.15em" opacity={0.4}>
                    {ar ? 'نظام استخبارات تحليلي' : 'ANALYTICAL INTELLIGENCE SYSTEM'}
                  </text>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </MouseReactive>

        <motion.div
          className={styles.stats}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[
            { number: '12+', label: ar ? 'سنوات من الخبرة' : 'Years of Experience' },
            { number: '200+', label: ar ? 'مشروع مكتمل' : 'Projects Delivered' },
            { number: '100%', label: ar ? 'التزام بالنتائج' : 'Commitment to Results' },
          ].map((stat, i) => (
            <motion.div
              key={stat.number}
              className={styles.stat}
              custom={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.9 + i * 0.15 } }) }}
              whileHover={{ y: -4 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statAccent} />
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <ScrollIndicator />
    </motion.section>
  );
}
