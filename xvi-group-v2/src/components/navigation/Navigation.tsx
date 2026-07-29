// XVI GROUP — Navigation (Sprint 01)
// Executive glass header — editorial luxury navigation

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { NAVIGATION } from '../../config';
import { LOGO } from '../../branding/assets';
import { LanguageToggle } from './LanguageToggle';
import { Burger } from './Burger';
import styles from './Navigation.module.scss';

export function Navigation() {
  const { language, isRTL } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  const navItems = language === 'ar' ? NAVIGATION.ar : NAVIGATION.en;

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
      if (y > 120 && y > lastScrollY.current + 8) {
        setIsHidden(true);
      } else if (y < lastScrollY.current - 8 || y < 80) {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, language]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <header
        className={[
          styles.header,
          mounted && styles.mounted,
          isScrolled && styles.scrolled,
          isHidden && !isMobileOpen && styles.hidden,
          isRTL && styles.rtl,
        ].filter(Boolean).join(' ')}
      >
        <div className={styles.glass} aria-hidden="true" />
        <div className={styles.accentLine} aria-hidden="true" />

        <nav
          className={styles.nav}
          role="navigation"
          aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
        >
          <div className={styles.inner}>
            <Link to="/" className={styles.logo} aria-label="XVI GROUP Home">
              <span className={styles.logoMark}>
                <img src={LOGO.icon.dark} alt="" width={36} height={36} />
              </span>
              <span className={styles.logoWordmark}>
                <span className={styles.logoPrimary}>XVI</span>
                <span className={styles.logoSecondary}>GROUP</span>
              </span>
            </Link>

            <div className={styles.desktop}>
              <ul className={styles.links}>
                {navItems.map((item, index) => {
                  const navItem = item as { label: string; href: string; children?: { label: string; href: string }[] };
                  const isActive = location.pathname === item.href;
                  return (
                    <li
                      key={item.href}
                      className={styles.linkItem}
                      style={{ '--nav-index': index } as React.CSSProperties}
                      onMouseEnter={() => navItem.children && handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        to={item.href}
                        className={[styles.link, isActive && styles.linkActive].filter(Boolean).join(' ')}
                      >
                        <span className={styles.linkText}>{item.label}</span>
                        {navItem.children && (
                          <ChevronDown size={13} className={styles.chevron} aria-hidden="true" />
                        )}
                        <span className={styles.linkHover} aria-hidden="true" />
                      </Link>

                      {navItem.children && activeDropdown === item.label && (
                        <div className={styles.megaMenu}>
                          <div className={styles.megaMenuInner}>
                            <p className={styles.megaMenuLabel}>
                              {language === 'ar' ? 'استكشف' : 'Explore'}
                            </p>
                            <div className={styles.megaMenuGrid}>
                              {navItem.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className={styles.megaMenuItem}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span className={styles.megaMenuTitle}>{child.label}</span>
                                  <ArrowUpRight size={14} className={styles.megaMenuArrow} />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.actions}>
              <LanguageToggle className={styles.langToggle} />
              <Link to="/contact" className={styles.cta}>
                <span>{language === 'ar' ? 'ابدأ محادثة' : 'Start a Conversation'}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>

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
        <div className={styles.mobileMenuContent}>
          {navItems.map((item, index) => {
            const navItem = item as { label: string; href: string; children?: { label: string; href: string }[] };
            return (
              <div
                key={item.href}
                className={styles.mobileMenuItem}
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <Link
                  to={item.href}
                  className={styles.mobileLink}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {navItem.children && (
                  <div className={styles.mobileSubmenu}>
                    {navItem.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={styles.mobileSubLink}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className={styles.mobileCta}>
            <LanguageToggle fullWidth />
            <Link to="/contact" className={styles.mobileCtaButton} onClick={() => setIsMobileOpen(false)}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
