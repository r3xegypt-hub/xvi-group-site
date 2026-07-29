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
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <LogoWordmark />
            <p className={styles.tagline}>
              {ar
                ? 'نصنع مؤسسات تُحرّك الأسواق، تُحوّل الصناعات، وتقود ثورات التكنولوجيا.'
                : 'Building enterprises that move markets, transform industries, and lead technological revolutions.'}
            </p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{ar ? 'الخدمات' : 'Services'}</h3>
            <ul className={styles.links}>
              <li><Link to="#" className={styles.link}>{ar ? 'الاستراتيجية' : 'Strategy & Advisory'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'هندسة الذكاء' : 'AI Engineering'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'التصميم التشغيلي' : 'Operational Design'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'منتجات الذكاء' : 'Intelligence Products'}</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{ar ? 'الشركة' : 'Company'}</h3>
            <ul className={styles.links}>
              <li><Link to="#" className={styles.link}>{ar ? 'عن XVI' : 'About'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'الرؤى' : 'Insights'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'الوظائف' : 'Careers'}</Link></li>
              <li><Link to="#" className={styles.link}>{ar ? 'تواصل' : 'Contact'}</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{ar ? 'تواصل' : 'Connect'}</h3>
            <ul className={styles.links}>
              <li><a href="mailto:xvi@xvi-group.net" className={styles.link}>xvi@xvi-group.net</a></li>
              <li><span className={styles.link}>+971 56 922 0064</span></li>
              <li><a href="#" className={styles.link}>LinkedIn</a></li>
              <li><a href="#" className={styles.link}>Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottom}>
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
