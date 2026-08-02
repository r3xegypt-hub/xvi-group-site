import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { LogoHorizontal } from '../ui/Logo';
import { MagneticButton } from '../../motion/MagneticButton';
import styles from './Navigation.module.scss';

export function Navigation() {
  const location = useLocation();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const navLinks = ar ? [
    { to: '/', label: 'الرئيسية' },
    { to: '/services', label: 'الحلول' },
    { to: '/industries', label: 'القطاعات' },
    { to: '/insights', label: 'رؤى' },
    { to: '/about', label: 'الشركة' },
  ] : [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Solutions' },
    { to: '/industries', label: 'Industries' },
    { to: '/insights', label: 'Insights' },
    { to: '/about', label: 'Company' },
  ];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo} aria-label="XVI GROUP Home">
            <LogoHorizontal variant="gold" size="sm" />
          </Link>

          <div className={styles.links}>
            {navLinks.map((link) => (
              <MagneticButton key={link.to} strength={0.2}>
                <Link
                  to={link.to}
                  className={`${styles.link}${isActive(link.to) ? ` ${styles.activeLink}` : ''}`}
                >
                  {link.label}
                </Link>
              </MagneticButton>
            ))}
            <span className={styles.langNavItem}>
              <LanguageToggle />
            </span>
          </div>

          <MagneticButton strength={0.35}>
            <Link to="/contact" className={styles.ctaButton}>
              {ar ? 'تواصل' : 'Contact'}
            </Link>
          </MagneticButton>

          <button
            className={`${styles.mobileToggle} ${isMobileOpen ? styles.mobileToggleOpen : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </nav>
      </header>

      <div
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div className={styles.mobileMenuInner} onClick={(e) => e.stopPropagation()}>
          <span className={styles.mobileEyebrow}>{ar ? 'التنقل' : 'Navigate'}</span>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`${styles.mobileLink}${isActive(link.to) ? ` ${styles.activeLink}` : ''}`} onClick={() => setIsMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>
            {ar ? 'تواصل' : 'Contact'}
          </Link>
          <div className={styles.mobileLangWrap}>
            <LanguageToggle fullWidth />
          </div>
        </div>
      </div>
    </>
  );
}

