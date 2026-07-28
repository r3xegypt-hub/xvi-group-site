import { useState } from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './AIConsultant.module.scss';

export function AIConsultant() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const ar = language === 'ar';
  return (
    <aside className={`${styles.assistant} ${open ? styles.open : ''}`} aria-label="XVI AI Consultant">
      {open && <div className={styles.panel}>
        <div className={styles.panelTop}><span className={styles.live}><i /> {ar ? 'متاح الآن' : 'ONLINE NOW'}</span><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={17} /></button></div>
        <div className={styles.intro}><span className={styles.spark}><Sparkles size={18} /></span><div><strong>{ar ? 'مستشار XVI الذكي' : 'XVI Intelligence'}</strong><p>{ar ? 'أهلاً. كيف يمكننا توجيه طموحكم القادم؟' : 'Welcome. Where can we focus your next ambition?'}</p></div></div>
        <div className={styles.actions}>
          <a href="#contact">{ar ? 'ابدأ استشارة ذكية' : 'Start AI Consultation'}<ArrowUpRight size={16} /></a>
          <a href="mailto:hello@xvigroup.com">{ar ? 'تحدث مع الفريق التنفيذي' : 'Talk to Executive Team'}<ArrowUpRight size={16} /></a>
          <a className={styles.whatsapp} href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        </div>
      </div>}
      <button className={styles.orb} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close AI Consultant' : 'Open AI Consultant'}>
        {open ? <X size={22} /> : <><span className={styles.orbMark}>XVI</span><span className={styles.pulse} /></>}
      </button>
    </aside>
  );
}
