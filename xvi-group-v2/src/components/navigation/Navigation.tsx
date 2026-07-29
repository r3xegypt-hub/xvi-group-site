import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { NAVIGATION } from '../../config';
import { LanguageToggle } from './LanguageToggle';
import { LogoWordmark } from '../ui/Logo';
import styles from './Navigation.module.scss';

export function Navigation() {
  const { language } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const items = language === 'ar' ? NAVIGATION.ar : NAVIGATION.en;

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      if (y > 100 && y > lastY + 8) setIsHidden(true);
      else if (y < lastY - 8 || y < 80) setIsHidden(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname, language]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={[
          styles.header,
          isScrolled && styles.scrolled,
          isHidden && !isMobileOpen && styles.hidden,
        ].filter(Boolean).join(' ')}
      >
        <nav className={styles.nav} role="navigation">
          <Link to="/" className={styles.logo} aria-label="XVI GROUP Home">
            <LogoWordmark />
          </Link>

          <div className={styles.links}>
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={[styles.link, location.pathname === item.href && styles.linkActive].filter(Boolean).join(' ')}
              >
                {item.label}
                {location.pathname === item.href && <span className={styles.activeDot} aria-hidden="true" />}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <LanguageToggle className={styles.langToggle} />
            <Link to="/contact" className={styles.cta}>
              <span>{language === 'ar' ? 'تواصل' : "Let's Talk"}</span>
              <ArrowUpRight size={14} />
            </Link>
            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={[styles.mobileMenu, isMobileOpen && styles.mobileMenuOpen].filter(Boolean).join(' ')}
        aria-hidden={!isMobileOpen}
      >
        <div className={styles.mobileMenuInner}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className={styles.mobileCta} onClick={() => setIsMobileOpen(false)}>
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
