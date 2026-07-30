import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Sparkles, Bot, BarChart3, Globe, Brain, X, ArrowUpRight, Zap, MessageSquare } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];

function AIOrb({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={isOpen ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease }}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(200,166,90,0.15), rgba(200,166,90,0.05))',
        border: '1px solid rgba(200,166,90,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', cursor: 'pointer', color: '#C8A65A',
      }}
    >
      <Brain size={20} />
      <motion.div
        style={{
          position: 'absolute', inset: -4, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.08)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: -10, borderRadius: '50%',
          border: '1px solid rgba(200,166,90,0.04)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.div>
  );
}

const font = "'Noto Sans', sans-serif";

const arContent = {
  advisorLabel: 'المستشار الذكي',
  title: 'مستشار XVI التنفيذي',
  status: 'SYSTEM ONLINE · ANALYTICAL AI',
  greeting: 'مساء الخير. أنا المستشار التنفيذي لـ XVI. كيف يمكنني توجيه استراتيجية مؤسستك اليوم؟',
  inputPlaceholder: 'اكتب استفسارك الاستراتيجي...',
  shortcuts: [
    { icon: BarChart3, label: 'المؤشرات' },
    { icon: Globe, label: 'السوق' },
    { icon: Zap, label: 'الاستراتيجية' },
    { icon: MessageSquare, label: 'الاستشارة' },
  ],
  suggestions: ['استراتيجية الذكاء الاصطناعي', 'تحليل السوق', 'التحول الرقمي', 'حوكمة البيانات'],
};

const enContent = {
  advisorLabel: 'AI Advisor',
  title: 'XVI Executive Advisor',
  status: 'SYSTEM ONLINE · ANALYTICAL AI',
  greeting: 'Good afternoon. I am the XVI Executive Advisor. How may I direct your enterprise strategy today?',
  inputPlaceholder: 'Type your strategic inquiry...',
  shortcuts: [
    { icon: BarChart3, label: 'Metrics' },
    { icon: Globe, label: 'Market' },
    { icon: Zap, label: 'Strategy' },
    { icon: MessageSquare, label: 'Consult' },
  ],
  suggestions: ['AI Strategy', 'Market Analysis', 'Digital Transformation', 'Data Governance'],
};

export function AIDock() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const isAR = language === 'ar';
  const content = isAR ? arContent : enContent;

  const handleToggle = useCallback(() => setOpen((p) => !p), []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 598,
              background: 'rgba(17,17,17,0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Dock bar */}
      <motion.div
        layout
        style={{
          position: 'fixed', bottom: 24, left: '50%', zIndex: 601,
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(200,166,90,0.1)',
          borderRadius: 999,
          boxShadow: '0 8px 32px rgba(17,17,17,0.06), 0 1px 2px rgba(17,17,17,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px 6px 6px',
            border: 'none', cursor: 'pointer',
            borderRadius: 999,
            background: 'linear-gradient(135deg, rgba(200,166,90,0.08), rgba(200,166,90,0.02))',
            fontFamily: font, fontSize: '0.75rem',
            fontWeight: 600, color: '#111111', letterSpacing: '0.02em',
          }}
        >
          <AIOrb isOpen={open} />
          <span style={{ whiteSpace: 'nowrap' }}>{content.advisorLabel}</span>
          {open ? <X size={14} /> : <Sparkles size={14} />}
        </motion.button>

        <div style={{ width: 1, height: 28, background: 'rgba(17,17,17,0.04)' }} />

        {content.shortcuts.map((s, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08, color: '#C8A65A' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: 'none', cursor: 'pointer',
              background: 'transparent', color: '#999999',
              transition: 'color 0.2s ease',
              fontFamily: font, fontSize: '0.5rem',
              fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}
            title={s.label}
          >
            <s.icon size={16} />
          </motion.button>
        ))}
      </motion.div>

      {/* Floating panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', bottom: 100, left: '50%', zIndex: 601,
              transform: 'translateX(-50%)',
              width: 440, maxWidth: 'calc(100vw - 48px)',
              maxHeight: '60vh',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(200,166,90,0.12)',
              borderRadius: 20,
              boxShadow: '0 32px 100px rgba(17,17,17,0.1), 0 8px 24px rgba(17,17,17,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Scan line */}
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200,166,90,0.2), transparent)',
                pointerEvents: 'none',
              }}
              animate={{ top: ['-2%', '102%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 20px', borderBottom: '1px solid rgba(17,17,17,0.04)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(200,166,90,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#C8A65A',
              }}>
                <Brain size={18} />
              </div>
              <div>
                <div style={{ fontFamily: font, fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                  {content.title}
                </div>
                <div style={{ fontFamily: font, fontSize: '0.5625rem', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <motion.span
                    style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#2D6A4F', marginRight: 6 }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  SYSTEM ONLINE · ANALYTICAL AI
                </div>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1, color: '#111111' }}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#999999', padding: 4 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Body */}
            <div style={{ padding: 20, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Avatar area */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(200,166,90,0.1), rgba(200,166,90,0.02))',
                  border: '1px solid rgba(200,166,90,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C8A65A', position: 'relative',
                }}>
                  <Brain size={28} />
                  <motion.div
                    style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(200,166,90,0.08)' }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <p style={{
                  fontFamily: isAR ? "'Amiri', serif" : "'Noto Sans', sans-serif",
                  fontSize: '0.9375rem', lineHeight: 1.6, color: '#666666',
                  maxWidth: 340, margin: 0,
                }}>
                  {content.greeting}
                </p>
              </div>

              {/* Quick actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {content.shortcuts.map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -2, background: 'rgba(200,166,90,0.08)', borderColor: 'rgba(200,166,90,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px',
                      background: 'rgba(200,166,90,0.03)',
                      border: '1px solid rgba(200,166,90,0.06)',
                      borderRadius: 12,
                      cursor: 'pointer',
                      fontFamily: font, fontSize: '0.75rem',
                      fontWeight: 500, color: '#111111',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <s.icon size={14} style={{ color: '#C8A65A', flexShrink: 0 }} />
                    {s.label}
                  </motion.button>
                ))}
              </div>

              {/* Suggestions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {content.suggestions.map((chip, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ background: 'rgba(200,166,90,0.1)', borderColor: '#C8A65A', color: '#C8A65A' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '6px 14px',
                      background: 'transparent',
                      border: '1px solid rgba(17,17,17,0.06)',
                      borderRadius: 999,
                      cursor: 'pointer',
                      fontFamily: font, fontSize: '0.65625rem',
                      fontWeight: 500, color: '#666666',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {chip}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderTop: '1px solid rgba(17,17,17,0.04)',
            }}>
              <input
                type="text"
                placeholder={content.inputPlaceholder}
                style={{
                  flex: 1, border: 'none', background: 'rgba(17,17,17,0.02)',
                  padding: '10px 14px',
                  borderRadius: 12,
                  fontFamily: font, fontSize: '0.8125rem',
                  color: '#111111', outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#B8963E' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 40, height: 40,
                  background: '#C8A65A', color: '#FFFFFF',
                  border: 'none', cursor: 'pointer',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowUpRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
