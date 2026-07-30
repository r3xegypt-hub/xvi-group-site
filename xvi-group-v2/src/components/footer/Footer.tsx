import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { Container } from '../layout/Container';
import { LogoWordmark } from '../ui/Logo';
import styles from './Footer.module.scss';

export function Footer() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topAccent} />
      <Container>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <LogoWordmark variant="light" />
            <p className={styles.tagline}>
              {ar
                ? 'نصنع مؤسسات تُحرّك الأسواق، تُحوّل الصناعات، وتقود ثورات التكنولوجيا.'
                : 'Building enterprises that move markets, transform industries, and lead technological revolutions.'}
            </p>
            <div className={styles.location}>
              <span className={styles.locationDot} />
              <span>{ar ? 'العين، الإمارات العربية المتحدة' : 'Al Ain, United Arab Emirates'}</span>
            </div>
          </div>
          <div className={styles.linksGrid}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{ar ? 'الخدمات' : 'Services'}</h3>
              <ul className={styles.links}>
                <li><Link to="/services/business-consulting" className={styles.link}>{ar ? 'استشارات الأعمال' : 'Business Consulting'}</Link></li>
                <li><Link to="/services/ai-transformation" className={styles.link}>{ar ? 'التحول بالذكاء' : 'AI Transformation'}</Link></li>
                <li><Link to="/services/technology-consulting" className={styles.link}>{ar ? 'استشارات تقنية' : 'Technology Consulting'}</Link></li>
                <li><Link to="/services/executive-training" className={styles.link}>{ar ? 'التدريب التنفيذي' : 'Executive Training'}</Link></li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{ar ? 'الشركة' : 'Company'}</h3>
              <ul className={styles.links}>
                <li><Link to="/" className={styles.link}>{ar ? 'الرئيسية' : 'Home'}</Link></li>
                <li><Link to="/about" className={styles.link}>{ar ? 'عن XVI' : 'About'}</Link></li>
                <li><Link to="/insights" className={styles.link}>{ar ? 'الرؤى' : 'Insights'}</Link></li>
                <li><Link to="/contact" className={styles.link}>{ar ? 'تواصل' : 'Contact'}</Link></li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{ar ? 'تواصل' : 'Connect'}</h3>
              <ul className={styles.links}>
                <li><a href="mailto:contact@xvigroup.com" className={styles.link}>contact@xvigroup.com</a></li>
                <li><span className={styles.link}>+971 56 922 0064</span></li>
                <li><a href="#" className={styles.link}>LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>&copy; 2026 XVI GROUP. {ar ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className={styles.legal}>
            <Link to="#" className={styles.legalLink}>{ar ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
            <Link to="#" className={styles.legalLink}>{ar ? 'شروط الخدمة' : 'Terms of Service'}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}