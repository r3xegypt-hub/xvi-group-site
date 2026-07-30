import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowUpRight, Bot, Shield, Activity, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { AINetwork } from '../../ui/AINetwork';
import { LightBeam } from '../../../motion/LightBeam';
import { FloatingParticles } from '../../../motion/FloatingParticles';
import { DataStream } from '../../../motion/DataStream';
import { MouseReactive } from '../../../motion/MouseReactive';
import { HeroGlassPanel } from '../../ui/HeroGlassPanel';
import { ScrollIndicator } from '../../ui/ScrollIndicator';
import { StaggerLines, StaggerText } from '../../../motion/StaggerText';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const executiveBadges = [
  { icon: Bot, label: 'Executive Advisory', color: '#C8A65A' },
  { icon: Shield, label: 'Sovereign AI', color: '#132238' },
  { icon: Activity, label: 'Measurable Impact', color: '#C8A65A' },
];

function MagneticCTA({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const py = (e.clientY - rect.top - rect.height / 2) * 0.25;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.a>
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
          <div className={styles.badges}>
            {executiveBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={i}
                  className={styles.badge}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.5 + i * 0.15 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  style={{
                    background: `${badge.color}06`,
                    borderColor: `${badge.color}12`,
                    color: badge.color,
                  }}
                >
                  <Icon size={10} />
                  <span>{badge.label}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div className={styles.split}>
            <div className={styles.contentCol}>
              <motion.p
                className={styles.eyebrow}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, ease, delay: 0.15 }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#C8A65A', marginRight: 8 }}
                />
                {ar ? 'استشارات تنفيذية · ذكاء · تحول' : 'Executive Advisory · Intelligence · Transformation'}
              </motion.p>

              <h1 className={styles.headline}>
                {ar ? (
                  <StaggerLines
                    lines={['الاستخبارات', 'وراء', 'الطموح']}
                    as="div"
                    delay={0.2}
                    lineStagger={0.2}
                  />
                ) : (
                  <StaggerLines
                    lines={['The Intelligence', 'Behind The', 'Ambitious']}
                    as="div"
                    delay={0.2}
                    lineStagger={0.2}
                  />
                )}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.9 }}
              >
                <p className={styles.subhead}>
                  {ar ? 'استراتيجية. ذكاء اصطناعي. عمليات. — من الرؤية إلى التنفيذ.' : 'Strategy. AI. Operations. — From vision to execution.'}
                </p>
              </motion.div>

              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 1.1 }}
              >
                <MagneticCTA href="/contact" className={styles.ctaPrimary}>
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
                </MagneticCTA>
                <a href="/services" className={styles.ctaSecondary}>
                  {ar ? 'منهجيتنا' : 'Our Approach'}
                </a>
              </motion.div>
            </div>

            <motion.div
              className={styles.visualCol}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
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

                <motion.div
                  className={styles.floatingData}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.8 }}
                >
                  <span className={styles.dataDot} />
                  <span className={styles.dataValue}>99.9%</span>
                  <span className={styles.dataLabel}>UPTIME</span>
                </motion.div>
                <motion.div
                  className={styles.floatingData}
                  style={{ top: '60%', right: '-8%' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 1.0 }}
                >
                  <span className={styles.dataDot} />
                  <span className={styles.dataValue}>2.4s</span>
                  <span className={styles.dataLabel}>RESPONSE</span>
                </motion.div>
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
            { number: 'AI', label: ar ? 'نهج أصيل' : 'AI-Native' },
            { number: '100%', label: ar ? 'تركيز العميل' : 'Client-First' },
            { number: '24/7', label: ar ? 'التزام كامل' : 'Always-On' },
          ].map((stat, i) => (
            <motion.div
              key={stat.number}
              className={styles.stat}
              custom={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.9 + i * 0.15 } }) }}
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