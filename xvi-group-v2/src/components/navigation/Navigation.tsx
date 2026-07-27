// XVI GROUP — Navigation Component
// Sticky, executive, responsive navigation per DESIGN_BIBLE.md

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { NAVIGATION } from '../../config';
import { LOGO } from '../../branding/assets';
import { Container } from '../layout/Container';
import { Button } from '../buttons/Button';
import { LanguageToggle } from './LanguageToggle';
import { Burger } from './Burger';
import styles from './Navigation.module.scss';

// ============================================
// COMPONENT
// ============================================

export function Navigation() {
  const { language, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = language === 'ar' ? NAVIGATION.ar : NAVIGATION.en;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <nav
        className={[
          styles.nav,
          isScrolled && styles.scrolled,
          isRTL && styles.rtl,
        ]
          .filter(Boolean)
          .join(' ')}
        role="navigation"
        aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
      >
        <Container>
          <div className={styles.inner}>
            {/* Logo */}
            <Link to="/" className={styles.logo} aria-label="XVI GROUP Home">
              <img
                src={LOGO.horizontal.dark}
                alt="XVI GROUP"
                className={styles.logoImage}
                height={32}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.desktop}>
              <ul className={styles.links}>
                {navItems.map((item) => {
                  const navItem = item as any;
                  return (
                  <li
                    key={item.href}
                    className={styles.linkItem}
                    onMouseEnter={() => navItem.children && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.href}
                      className={styles.link}
                    >
                      {item.label}
                      {navItem.children && (
                        <ChevronDown size={14} className={styles.chevron} />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    {navItem.children && activeDropdown === item.label && (
                      <div className={styles.megaMenu}>
                        <Container>
                          <div className={styles.megaMenuContent}>
                            {navItem.children.map((child: any) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className={styles.megaMenuItem}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className={styles.megaMenuTitle}>{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </Container>
                      </div>
                    )}
                  </li>
                  );
                })}
              </ul>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <LanguageToggle />
              <Button
                as="a"
                href="/contact"
                variant="primary"
                size="sm"
                className={styles.cta}
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </div>

            {/* Mobile Toggle */}
            <Burger
              isOpen={isMobileOpen}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={styles.mobileToggle}
              ariaLabel={isMobileOpen ? 'Close menu' : 'Open menu'}
              ariaExpanded={isMobileOpen}
            />
          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <div
        className={[
          styles.mobileMenu,
          isMobileOpen && styles.mobileMenuOpen,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isMobileOpen}
      >
        <div className={styles.mobileMenuContent}>
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className={styles.mobileMenuItem}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                to={item.href}
                className={[
                  styles.mobileLink,
                  window.location.pathname === item.href && styles.mobileLinkActive,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
              {(item as any).children && (
                <div className={styles.mobileSubmenu}>
                  {(item as any).children.map((child: any) => (
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
          ))}

          <div className={styles.mobileCta}>
            <LanguageToggle fullWidth />
            <Button
              as="a"
              href="/contact"
              variant="primary"
              fullWidth
            >
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
