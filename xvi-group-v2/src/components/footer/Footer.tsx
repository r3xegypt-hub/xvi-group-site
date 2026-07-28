// XVI GROUP — Footer Component
// Editorial, executive, luxury footer per DESIGN_BIBLE.md

import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { LOGO } from '../../branding/assets';

// Brand icons removed from lucide-react — inline SVGs
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
import { useLanguage } from '../../hooks/LanguageProvider';
import { FOOTER_COLUMNS, CONTACT_INFO } from '../../config';
import { Container } from '../layout/Container';
import { SignalRule } from '../../svg/geometry/SignalRule';
import styles from './Footer.module.scss';

// ============================================
// COMPONENT
// ============================================

export function Footer() {
  const { language, isRTL } = useLanguage();

  const columns = language === 'ar' ? FOOTER_COLUMNS.ar : FOOTER_COLUMNS.en;
  const contact = CONTACT_INFO;

  return (
    <footer
      className={[styles.footer, isRTL && styles.rtl].filter(Boolean).join(' ')}
      role="contentinfo"
    >
      <Container>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={LOGO.horizontal.light}
              alt="XVI GROUP"
              className={styles.logo}
              height={32}
            />
          </Link>
          <p className={styles.tagline}>
            {language === 'ar'
              ? 'نصنع مؤسسات تُحرّك الأسواق، تُحوّل الصناعات، وتقود ثورات التكنولوجيا.'
              : 'Building enterprises that move markets, transform industries, and lead technological revolutions.'}
          </p>
        </div>

        {/* Columns */}
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <SignalRule accent="light" />
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© 2025 XVI GROUP. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={styles.legalLink}>
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
              <Link to="/terms" className={styles.legalLink}>
                {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </Link>
              <Link to="/accessibility" className={styles.legalLink}>
                {language === 'ar' ? 'إمكانية الوصول' : 'Accessibility'}
              </Link>
            </div>
          </div>

          <div className={styles.locations}>
            {contact.locations.map((loc) => (
              <span key={loc.city.en} className={styles.location}>
                {language === 'ar' ? loc.city.ar : loc.city.en}
                {loc !== contact.locations[contact.locations.length - 1] && (
                  <span className={styles.separator}>•</span>
                )}
              </span>
            ))}
          </div>

          <div className={styles.social}>
            <a
              href={contact.social.linkedin}
              className={styles.socialLink}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={contact.social.twitter}
              className={styles.socialLink}
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon size={18} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
