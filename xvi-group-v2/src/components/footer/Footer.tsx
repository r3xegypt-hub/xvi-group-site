import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { XVILogo } from '../../branding/logo/XVILogo';
import { MagneticButton } from '../../motion/MagneticButton';
import styles from './Footer.module.scss';

export function Footer() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <XVILogo size={38} variant="full" animated={false} />
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
          <MagneticButton strength={0.35} onClick={scrollToTop}>
            <button
              type="button"
              style={{
                background: 'rgba(200, 166, 90, 0.08)',
                border: '1px solid rgba(200, 166, 90, 0.25)',
                color: '#C8A65A',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '0.75rem',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {ar ? 'أعلى الصفحة ↑' : 'Top ↑'}
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

