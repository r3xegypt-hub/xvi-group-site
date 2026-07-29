import { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { XMark } from '../ui/Logo';
import styles from './AIConsultant.module.scss';

export function AIConsultant() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const ar = language === 'ar';

  const suggestions = ar
    ? ['ما هي خدماتكم؟', 'احجز استشارة', 'منهجيتنا']
    : ['What services do you offer?', 'Book a consultation', 'Our approach'];

  return (
    <aside className={`${styles.assistant} ${open ? styles.open : ''}`} aria-label="XVI AI Assistant">
      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelStatus}>
              <span className={styles.statusDot} />
              <span className={styles.statusLabel}>{ar ? 'متصل' : 'Online'}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} className={styles.closeBtn} aria-label="Close">
              <X size={18} />
            </button>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.message}>
              <div className={styles.messageAvatar}>
                <XMark size={16} />
              </div>
              <div className={styles.messageContent}>
                <strong className={styles.messageTitle}>{ar ? 'مساعد XVI' : 'XVI Assistant'}</strong>
                <p className={styles.messageText}>
                  {ar ? 'أهلاً. كيف يمكننا توجيه طموحكم القادم؟' : 'Welcome. Where can we focus your next ambition?'}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.suggestions}>
            {suggestions.map((s, i) => (
              <button key={i} className={styles.chip}>{s}</button>
            ))}
          </div>
          <div className={styles.panelInput}>
            <input type="text" className={styles.input} placeholder={ar ? 'اكتب رسالتك...' : 'Type your message...'} />
            <button className={styles.sendBtn} aria-label="Send">
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.orb}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {open ? <X size={22} /> : <XMark size={22} />}
      </button>
    </aside>
  );
}
