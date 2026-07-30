import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../../hooks/LanguageProvider';
import styles from './Hero.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

function TypingCursor() {
  return (
    <motion.span
      className={styles.cursor}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function VoiceWaveform() {
  return (
    <span className={styles.voiceWave}>
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className={styles.waveBar}
          style={{
            animationDelay: `${i * 0.08}s`,
            height: `${4 + Math.random() * 12}px`,
          }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [lettersVisible, setLettersVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showVoice, setShowVoice] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLettersVisible(true), 300);
      const voiceTimer = setTimeout(() => setShowVoice(true), 2000);
      return () => {
        clearTimeout(timer);
        clearTimeout(voiceTimer);
      };
    }
  }, [isInView]);

  const headline = ar
    ? 'اجعل الذكاء ميزة استراتيجية'
    : 'Make intelligence a strategic advantage.';

  const subtitle = ar
    ? 'نتشارك مع فرق القيادة لتحويل الذكاء الاصطناعي والأتمتة والبيانات إلى قرارات أوضح ونماذج تشغيل أقوى.'
    : 'We partner with leadership teams to turn artificial intelligence, automation, and data into clearer decisions and stronger operating models.';

  const quickPrompts = ar
    ? ['استكشف الحلول', 'احجز استشارة', 'تقييم الذكاء الاصطناعي', 'تواصل مع خبير']
    : ['Explore Solutions', 'Book Consultation', 'AI Assessment', 'Contact Expert'];

  return (
    <section className={styles.hero}>
      <div className={styles.bgGradient} />
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.container} ref={ref}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {ar ? 'XVI GROUP / التحول الذكي' : 'XVI GROUP / INTELLIGENT TRANSFORMATION'}
        </motion.span>

        <h1 className={styles.headline}>
          {headline.split('').map((char, i) => (
            <span
              key={i}
              className={`${styles.letter} ${lettersVisible ? styles.letterVisible : ''}`}
              style={{ transitionDelay: `${i * 0.03}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.8 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 1.0 }}
        >
          <a href="#solutions" className={styles.ctaGold}>
            {ar ? 'استكشف نهجنا' : 'Explore our approach'}
          </a>
        </motion.div>

        {/* AI Executive Widget - matches prototype */}
        <motion.div
          className={styles.aiWidget}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
        >
          <div className={styles.orbContainer}>
            <div className={styles.orb}>
              <div className={styles.orbInner} />
              <div className={styles.orbRing} />
              <div className={styles.orbRing2} />
            </div>
            {[0, 1, 2, 4].map((i) => (
              <div
                key={i}
                className={styles.particleOrbit}
                style={{
                  animationDelay: `${i * 0.8}s`,
                  transform: `rotate(${i * 72}deg)`,
                }}
              />
            ))}
          </div>

          <div className={styles.widgetContent}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetBadge}>
                {ar ? 'جاهز' : 'Ready'}
              </span>
              <span className={styles.widgetTitle}>
                XVI EXECUTIVE AI
              </span>
              {showVoice && <VoiceWaveform />}
            </div>
            <p className={styles.widgetDesc}>
              {ar
                ? 'رفيق بصري للقرارات المعقدة، مصمم ليكون هادئاً ودقيقاً.'
                : 'A visual companion for complex decisions, designed to feel composed, informed, and quietly capable.'}
            </p>
            <div className={styles.widgetInput} style={{ borderColor: inputFocused ? 'rgba(200,166,90,0.4)' : 'rgba(255,255,255,0.1)' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={ar ? 'اسألني عن أي شيء...' : 'ask me anything...'}
                className={styles.widgetPrompt}
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  flex: 1, color: 'rgba(255,255,255,0.7)', fontSize: 13,
                  fontFamily: "'Manrope', sans-serif",
                }}
              />
              <TypingCursor />
            </div>
            <div className={styles.quickPrompts}>
              {quickPrompts.map((prompt, i) => (
                <motion.button
                  key={i}
                  className={styles.promptChip}
                  whileHover={{ background: 'rgba(200,166,90,0.12)', borderColor: 'rgba(200,166,90,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setInputValue(prompt)}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
