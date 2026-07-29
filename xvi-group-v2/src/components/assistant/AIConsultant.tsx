import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing, Variants } from 'framer-motion';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { LogoIcon } from '../ui/Logo';
import styles from './AIConsultant.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const messageVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2, duration: 0.4, ease },
  },
};

const PARTICLE_COUNT = 16;

function OrbitingParticles({ open }: { open: boolean }) {
  return (
    <div className={styles.orbParticles} aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const radius = 28 + Math.random() * 8;
        const size = Math.random() * 2 + 1;
        const speed = 8 + Math.random() * 6;
        return (
          <motion.span
            key={i}
            className={styles.orbParticle}
            style={{
              width: size,
              height: size,
            }}
            animate={open ? {
              x: [Math.cos(angle) * (radius - 4), Math.cos(angle + Math.PI) * radius, Math.cos(angle) * (radius - 4)],
              y: [Math.sin(angle) * (radius - 4), Math.sin(angle + Math.PI) * radius, Math.sin(angle) * (radius - 4)],
              opacity: [0.3, 0.6, 0.3],
            } : {
              x: 0,
              y: 0,
              opacity: 0,
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}

export function AIConsultant() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const ar = language === 'ar';

  const suggestions = ar
    ? ['ما هي خدماتكم؟', 'احجز استشارة', 'منهجيتنا', 'دراسات الحالة']
    : ['What services do you offer?', 'Book a consultation', 'Our approach', 'Case studies'];

  return (
    <aside className={`${styles.assistant} ${open ? styles.open : ''}`} aria-label="XVI AI Assistant">
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelStatus}>
                <motion.span
                  className={styles.statusDot}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className={styles.statusLabel}>{ar ? 'متصل' : 'Online'}</span>
                <span className={styles.statusBadge}>EXECUTIVE CONSULTANT</span>
              </div>
              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                className={styles.closeBtn}
                aria-label="Close"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <div className={styles.panelBody}>
              <motion.div
                className={styles.message}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
              >
                <div className={styles.messageAvatar}>
                  <LogoIcon size={18} variant="light" />
                </div>
                <div className={styles.messageContent}>
                  <strong className={styles.messageTitle}>
                    {ar ? 'مساعد XVI التنفيذي' : 'XVI Executive Consultant'}
                  </strong>
                  <p className={styles.messageText}>
                    {ar
                      ? 'أهلاً. أنا مستشاركم الرقمي. كيف يمكنني توجيه طموحكم القادم؟'
                      : 'Welcome. I am your digital consultant. How may I direct your next ambition?'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className={styles.quickActions}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className={styles.quickLabel}>
                  {ar ? 'إجراءات سريعة' : 'Quick Actions'}
                </p>
                <div className={styles.quickGrid}>
                  <a href="/contact" className={styles.quickAction}>
                    <ArrowUpRight size={14} />
                    <span>{ar ? 'احجز استشارة' : 'Book Consultation'}</span>
                  </a>
                  <a href="/services" className={styles.quickAction}>
                    <ArrowUpRight size={14} />
                    <span>{ar ? 'استكشف الخدمات' : 'Explore Services'}</span>
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              className={styles.suggestions}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  className={styles.chip}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>

            <div className={styles.panelInput}>
              <input
                type="text"
                className={styles.input}
                placeholder={ar ? 'اكتب رسالتك...' : 'Type your message...'}
              />
              <motion.button
                className={styles.sendBtn}
                aria-label="Send"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.orbContainer}>
        <OrbitingParticles open={open} />
        <motion.button
          className={styles.orb}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: open
              ? [
                  '0 4px 24px rgba(200, 166, 90, 0.3)',
                  '0 8px 40px rgba(200, 166, 90, 0.5)',
                  '0 4px 24px rgba(200, 166, 90, 0.3)',
                ]
              : [
                  '0 4px 24px rgba(17, 17, 17, 0.15)',
                  '0 8px 32px rgba(200, 166, 90, 0.3)',
                  '0 4px 24px rgba(17, 17, 17, 0.15)',
                ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sparkles size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </aside>
  );
}
