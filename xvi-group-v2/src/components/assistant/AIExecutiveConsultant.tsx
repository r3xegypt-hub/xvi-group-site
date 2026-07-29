import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';
import { X, ArrowUpRight, Sparkles, Bot, BarChart3, Globe, Shield, Brain, Activity } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './AIExecutive.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelVariants: Variants = {
  hidden: { y: '100%', opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease, delay: 0.05 } },
  exit: { y: '10%', opacity: 0, scale: 0.98, transition: { duration: 0.25, ease } },
};

const metrics = [
  { icon: Bot, label: 'AI Models', value: '24', labelAr: 'نموذج ذكاء', valueAr: '٢٤' },
  { icon: BarChart3, label: 'Data Points', value: '12.4K', labelAr: 'نقطة بيانات', valueAr: '١٢٫٤ك' },
  { icon: Globe, label: 'Regions', value: '7', labelAr: 'مناطق', valueAr: '٧' },
  { icon: Shield, label: 'Security', value: '99.9%', labelAr: 'أمان', valueAr: '٩٩٫٩٪' },
];

function getTimeContext(ar: boolean) {
  const h = new Date().getHours();
  if (h < 12) return ar ? 'صباح الخير' : 'Good morning';
  if (h < 18) return ar ? 'مساء الخير' : 'Good afternoon';
  return ar ? 'مساء الخير' : 'Good evening';
}

function getContextualSuggestionSet(ar: boolean, lang: string) {
  const h = new Date().getHours();
  const isMorning = h < 12;
  const isAfternoon = h >= 12 && h < 18;
  if (ar) {
    if (isMorning) return ['استراتيجية AI', 'تحليل السوق', 'التحول الرقمي', 'حوكمة البيانات'];
    if (isAfternoon) return ['تحليل الأداء', 'تقييم المخاطر', 'الامتثال', 'تقارير ذكية'];
    return ['الاستعداد للمستقبل', 'تحليل تنافسي', 'ابتكار', 'توسع'];
  }
  if (isMorning) return ['AI Strategy', 'Market Analysis', 'Digital Transformation', 'Data Governance'];
  if (isAfternoon) return ['Performance Review', 'Risk Assessment', 'Compliance Audit', 'Intelligent Reports'];
  return ['Future Readiness', 'Competitive Analysis', 'Innovation Roadmap', 'Scale Planning'];
}

function useTypingAnimation(text: string, enabled: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return; }
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
    const chars = text.split('');
    const timer = setInterval(() => {
      if (indexRef.current < chars.length) {
        setDisplayed(chars.slice(0, indexRef.current + 1).join(''));
        indexRef.current++;
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [text, enabled]);

  return { displayed, done };
}

function CrystalTrigger({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <motion.button
      className={styles.crystal}
      onClick={onClick}
      aria-label="Toggle AI Executive Consultant"
      initial={false}
      animate={open ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3, ease }}
    >
      <motion.div
        className={styles.crystalInner}
        animate={open ? { opacity: 0, rotate: 90 } : { opacity: 1, rotate: 0 }}
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className={styles.crystalInner}
        animate={open ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
        style={{ position: 'absolute' }}
      >
        <X size={24} />
      </motion.div>
      <div className={styles.crystalGlow} />
      <div className={styles.crystalRing} />
      <div className={styles.crystalRingOuter} />
    </motion.button>
  );
}

function ScanLine() {
  return (
    <motion.div
      className={styles.scanLine}
      animate={{ top: ['-2%', '102%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <motion.span
        className={styles.statusDot}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className={styles.statusText}>SYSTEM ONLINE</span>
      <motion.span
        className={styles.statusPulse}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.span
        className={styles.statusActivity}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <Activity size={10} />
      </motion.span>
    </div>
  );
}

function TypingDots({ done }: { done: boolean }) {
  if (done) return null;
  return (
    <motion.span
      style={{ display: 'inline-flex', gap: 2, marginLeft: 4 }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    >
      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8A65A', display: 'inline-block' }} />
      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8A65A', display: 'inline-block' }} />
      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8A65A', display: 'inline-block' }} />
    </motion.span>
  );
}

export function AIExecutiveConsultant() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const { language } = useLanguage();
  const ar = language === 'ar';

  const greeting = getTimeContext(ar);

  const greetingText = useMemo(() => {
    if (ar) return `${greeting}، أنا المستشار التنفيذي XVI. كيف يمكنني توجيه استراتيجية مؤسستك اليوم؟`;
    return `${greeting}. I am the XVI Executive Consultant. How may I direct your enterprise strategy today?`;
  }, [greeting, ar]);

  const { displayed, done } = useTypingAnimation(greetingText, open && hasOpened);

  const suggestionChips = useMemo(() => {
    return getContextualSuggestionSet(ar, language);
  }, [ar, language]);

  const quickActions = useMemo(() => {
    if (ar) return [
      { label: 'المؤشرات', icon: BarChart3 },
      { label: 'تحليل السوق', icon: Globe },
      { label: 'تقرير أداء', icon: Shield },
      { label: 'استشارة', icon: Bot },
    ];
    return [
      { label: 'Metrics', icon: BarChart3 },
      { label: 'Market', icon: Globe },
      { label: 'Performance', icon: Shield },
      { label: 'Consult', icon: Bot },
    ];
  }, [ar]);

  const handleOpen = useCallback(() => {
    setOpen((prev) => {
      if (!prev) setHasOpened(true);
      return !prev;
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={styles.assistant}>
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.panel}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <ScanLine />
              <StatusBar />

              <div className={styles.panelHeader}>
                <div className={styles.panelBrand}>
                  <div className={styles.brandIcon}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className={styles.brandName}>
                      {ar ? 'المستشار التنفيذي XVI' : 'XVI Executive Consultant'}
                    </span>
                    <span className={styles.brandStatus}>
                      {ar ? 'نظام ذكاء تحليلي' : 'Analytical AI System'}
                    </span>
                  </div>
                </div>
                <div className={styles.metricsRow}>
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      className={styles.metric}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, ease }}
                    >
                      <m.icon size={13} />
                      <span className={styles.metricValue}>{ar ? m.valueAr : m.value}</span>
                      <span className={styles.metricLabel}>{ar ? m.labelAr : m.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={styles.panelBody}>
                <motion.div
                  className={styles.avatarArea}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease }}
                >
                  <div className={styles.avatarRing}>
                    <div className={styles.avatarGlow} />
                    <div className={styles.avatarIcon}>
                      <Brain size={28} />
                    </div>
                  </div>
                  <p className={styles.avatarText}>
                    {displayed}
                    <TypingDots done={done} />
                  </p>
                </motion.div>

                <motion.div
                  className={styles.actionGrid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={i}
                      className={styles.actionCard}
                      whileHover={{ y: -2, backgroundColor: 'rgba(200, 166, 90, 0.08)', borderColor: 'rgba(200, 166, 90, 0.25)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <action.icon size={16} />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div
                  className={styles.chipRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {suggestionChips.map((chip, i) => (
                    <motion.button
                      key={i}
                      className={styles.chip}
                      whileHover={{ backgroundColor: 'rgba(200, 166, 90, 0.12)', borderColor: '#C8A65A', color: '#C8A65A' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <div className={styles.panelFooter}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={ar ? 'اكتب استفسارك الاستراتيجي...' : 'Type your strategic inquiry...'}
                />
                <motion.button
                  className={styles.sendBtn}
                  whileHover={{ scale: 1.05, backgroundColor: '#B8963E' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CrystalTrigger onClick={handleOpen} open={open} />
      </div>
    </>
  );
}
