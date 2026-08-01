import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './Footer.module.scss';

export function Footer() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <span className={styles.logoIcon}>
              <span className={styles.logoX}>X</span>
            </span>
            <span className={styles.brandName}>XVI GROUP</span>
          </div>
          <span className={styles.brandTagline}>
            {ar ? 'ذكاء — أتمتة — تحول' : 'AI — Automation — Transformation'}
          </span>
        </div>

        <div className={styles.links}>
          <Link to="/services" className={styles.link}>{ar ? 'الحلول' : 'Solutions'}</Link>
          <Link to="/industries" className={styles.link}>{ar ? 'القطاعات' : 'Industries'}</Link>
          <Link to="/about" className={styles.link}>{ar ? 'الشركة' : 'Company'}</Link>
          <Link to="/portfolio" className={styles.link}>{ar ? 'الأعمال' : 'Work'}</Link>
          <Link to="/contact" className={styles.link}>{ar ? 'تواصل' : 'Contact'}</Link>
          <Link to="/careers" className={styles.link}>{ar ? 'الوظائف' : 'Careers'}</Link>
          <Link to="/privacy" className={styles.link}>{ar ? 'الخصوصية' : 'Privacy'}</Link>
          <Link to="/terms" className={styles.link}>{ar ? 'الشروط' : 'Terms'}</Link>
        </div>

        <div className={styles.divider} />

        <div className={styles.meta}>
          <span className={styles.copyright}>© 2026 XVI GROUP</span>
          <span className={styles.metaTagline}>
            {ar ? 'ذكاء — أتمتة — تحول' : 'Intelligence, made consequential.'}
          </span>
          <span className={styles.metaSub}>
            {ar ? 'ذكاء — أتمتة — تحول' : 'AI — Automation — Transformation'}
          </span>
        </div>
      </div>
    </footer>
  );
}
