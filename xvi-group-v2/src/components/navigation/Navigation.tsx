// XVI GROUP — Navigation
// Minimal · Glass · Executive

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { NAVIGATION } from '../../config';
import { LanguageToggle } from './LanguageToggle';
import { Burger } from './Burger';
import styles from './Navigation.module.scss';

export function Navigation() {
  const { language } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = language === 'ar' ? NAVIGATION.ar : NAVIGATION.en;

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
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
          mounted && isScrolled && styles.scrolled,
          isHidden && !isMobileOpen && styles.hidden,
        ].filter(Boolean).join(' ')}
      >
        <nav className={styles.nav} role="navigation">
          <Link to="/" className={styles.logo} aria-label="XVI GROUP Home">
            <span className={styles.logoText}>XVI GROUP</span>
          </Link>

          <div className={styles.links}>
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={[styles.link, location.pathname === item.href && styles.linkActive].filter(Boolean).join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <LanguageToggle className={styles.langToggle} />
            <Link to="/contact" className={styles.cta}>
              <span>{language === 'ar' ? 'تواصل' : 'Contact'}</span>
              <ArrowUpRight size={14} />
            </Link>
            <Burger
              isOpen={isMobileOpen}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={styles.mobileToggle}
              ariaLabel={isMobileOpen ? 'Close menu' : 'Open menu'}
              ariaExpanded={isMobileOpen}
            />
          </div>
        </nav>
      </header>

      <div
        className={[styles.mobileMenu, isMobileOpen && styles.mobileMenuOpen].filter(Boolean).join(' ')}
        aria-hidden={!isMobileOpen}
      >
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
        <Link to="/contact" className={styles.cta} onClick={() => setIsMobileOpen(false)}>
          {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </>
  );
}
