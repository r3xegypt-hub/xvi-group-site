import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';
import { X, ArrowUpRight, Sparkles, Bot, BarChart3, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './AIExecutive.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, delay: 0.1 },
  },
  exit: {
    y: '10%',
    opacity: 0,
    transition: { duration: 0.3, ease },
  },
};

const triggerVariants: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.08,
    rotate: 45,
    transition: { duration: 0.3, ease },
  },
};

const metrics = [
  { icon: Bot, label: 'AI Models', value: '24', labelAr: 'نموذج ذكاء', valueAr: '٢٤' },
  { icon: BarChart3, label: 'Data Points', value: '12.4K', labelAr: 'نقطة بيانات', valueAr: '١٢٫٤ك' },
  { icon: Globe, label: 'Regions', value: '7', labelAr: 'مناطق', valueAr: '٧' },
  { icon: Shield, label: 'Security', value: '99.9%', labelAr: 'أمان', valueAr: '٩٩٫٩٪' },
];

function CrystalTrigger({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <motion.button
      className={styles.crystal}
      onClick={onClick}
      aria-label="Toggle AI Executive Consultant"
      variants={triggerVariants}
      initial="idle"
      whileHover="hover"
      animate={open ? { rotate: 45, scale: 1.1 } : 'idle'}
    >
      <motion.div className={styles.crystalInner} animate={open ? { opacity: 0 } : { opacity: 1 }}>
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className={styles.crystalInner}
        animate={open ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
        initial={{ opacity: 0, rotate: -90 }}
        style={{ position: 'absolute' }}
      >
        <X size={24} />
      </motion.div>
      <div className={styles.crystalGlow} />
      <div className={styles.crystalRing1} />
      <div className={styles.crystalRing2} />
    </motion.button>
  );
}

function ScanLine() {
  return (
    <motion.div
      className={styles.scanLine}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function AIExecutiveConsultant() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const ar = language === 'ar';

  const suggestionChips = useMemo(() => {
    if (ar) return ['استراتيجية AI', 'تحليل السوق', 'التحول الرقمي', 'حوكمة البيانات'];
    return ['AI Strategy', 'Market Analysis', 'Digital Transformation', 'Data Governance'];
  }, [ar]);

  const quickActions = useMemo(() => {
    if (ar) {
      return [
        { label: 'عرض المؤشرات', icon: BarChart3 },
        { label: 'تحليل السوق', icon: Globe },
        { label: 'تقرير أداء', icon: Shield },
        { label: 'استشارة سريعة', icon: Bot },
      ];
    }
    return [
      { label: 'View Metrics', icon: BarChart3 },
      { label: 'Market Scan', icon: Globe },
      { label: 'Performance', icon: Shield },
      { label: 'Quick Consult', icon: Bot },
    ];
  }, [ar]);

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

              <div className={styles.panelHeader}>
                <div className={styles.panelBrand}>
                  <motion.div
                    className={styles.brandDot}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <span className={styles.brandName}>
                      {ar ? 'المستشار التنفيذي XVI' : 'XVI Executive Consultant'}
                    </span>
                    <span className={styles.brandStatus}>
                      {ar ? 'نظام ذكاء تحليلي · متصل' : 'Analytical AI System · Online'}
                    </span>
                  </div>
                </div>
                <div className={styles.metricsRow}>
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      className={styles.metric}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, ease }}
                    >
                      <m. icon size={14} />
                      <span className={styles.metricValue}>{ar ? m.valueAr : m.value}</span>
                      <span className={styles.metricLabel}>{ar ? m.labelAr : m.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={styles.panelBody}>
                <motion.div
                  className={styles.avatarArea}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease }}
                >
                  <div className={styles.avatarRing}>
                    <div className={styles.avatarRingInner}>
                      <div className={styles.avatarIcon}>
                        <Sparkles size={32} />
                      </div>
                    </div>
                  </div>
                  <p className={styles.avatarText}>
                    {ar
                      ? 'مساء الخير. أنا المستشار التنفيذي XVI. كيف يمكنني توجيه استراتيجية مؤسستك اليوم؟'
                      : 'Good evening. I am the XVI Executive Consultant. How may I direct your enterprise strategy today?'}
                  </p>
                </motion.div>

                <motion.div
                  className={styles.actionGrid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={i}
                      className={styles.actionCard}
                      whileHover={{ y: -2, backgroundColor: 'rgba(200, 166, 90, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon size={18} />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div
                  className={styles.chipRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {suggestionChips.map((chip, i) => (
                    <motion.button
                      key={i}
                      className={styles.chip}
                      whileHover={{ backgroundColor: 'rgba(200, 166, 90, 0.15)', borderColor: '#C8A65A' }}
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

        <CrystalTrigger onClick={() => setOpen(!open)} open={open} />
      </div>
    </>
  );
}
