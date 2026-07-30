import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            <span className={styles.seal}>XVI</span>
            <span className={styles.wordmark}>
              <span>XVI</span>
              <span className={styles.divider}> / </span>
              <span>GROUP</span>
            </span>
          </Link>

          <div className={styles.links}>
            <Link to="/services" className={styles.link}>Services</Link>
            <Link to="/industries" className={styles.link}>Industries</Link>
            <Link to="/technology" className={styles.link}>Technology</Link>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/insights" className={styles.link}>Perspective</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
          </div>

          <button
            className={`${styles.mobileToggle} ${isMobileOpen ? styles.mobileToggleOpen : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </nav>
      </header>

      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <Link to="/" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Home</Link>
          <Link to="/services" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Services</Link>
          <Link to="/industries" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Industries</Link>
          <Link to="/technology" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Technology</Link>
          <Link to="/about" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>About</Link>
          <Link to="/insights" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Perspective</Link>
          <Link to="/contact" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Contact</Link>
          <Link to="/careers" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Careers</Link>
        </div>
      </div>
    </>
  );
}
