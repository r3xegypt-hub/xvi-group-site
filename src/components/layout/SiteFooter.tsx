import { memo } from 'react'
import { Link } from 'react-router-dom'
import { footerNavigation } from '../../data/siteNavigation'
import { Container } from '../common/Container'
import { LuxuryLogo } from '../common/LuxuryLogo'

export const SiteFooter = memo(function SiteFooter() {
  return (
    <footer className="xvi-footer">
      {/* Seamless gradient transition from CTA */}
      <div className="xvi-footer-transition" aria-hidden="true" />

      {/* AI-inspired decorative background */}
      <div className="xvi-footer-bg" aria-hidden="true">
        <div className="xvi-footer-grid" />
        <div className="xvi-footer-glow xvi-footer-glow--1" />
        <div className="xvi-footer-glow xvi-footer-glow--2" />
      </div>

      {/* Floating monogram */}
      <div className="xvi-footer-monogram" aria-hidden="true">XVI</div>

      <Container className="xvi-footer-inner">
        {/* Hero section */}
        <div className="xvi-footer-hero">
          <div className="xvi-footer-hero-content">
            <div className="xvi-footer-eyebrow">XVI GROUP / DECISION HEADQUARTERS</div>
            <h2 className="xvi-footer-title">ننهي كل حوار بمساحة<br />للقرار التالي.</h2>
          </div>
          <div className="xvi-footer-hero-aside">
            <p className="xvi-footer-desc">استشارة وقرار وتحول بمستوى تنفيذي. من العين إلى المؤسسات التي تريد أن تتحرك بوضوح.</p>
            <Link to="/contact" onMouseEnter={() => void import('../../pages/Contact')} className="xvi-footer-cta">
              <span className="xvi-footer-cta-shine" aria-hidden="true" />
              <span className="xvi-footer-cta-text">ابدأ الحوار</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="xvi-footer-divider" aria-hidden="true" />

        {/* Navigation grid */}
        <div className="xvi-footer-nav">
          <div className="xvi-footer-brand">
            <Link to="/" aria-label="العودة إلى الرئيسية" className="xvi-footer-logo-link">
              <LuxuryLogo size="md" variant="light" showWordmark stacked className="xvi-footer-logo" />
            </Link>
            <div className="xvi-footer-location">AL AIN · UNITED ARAB EMIRATES</div>
            {/* Social-style icons */}
            <div className="xvi-footer-social">
              <a href="#" className="xvi-footer-social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className="xvi-footer-social-link" aria-label="Twitter / X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4 L20 20 M20 4 L4 20" /><path d="M4 4l16 16M20 4l-16 16" style={{ display: 'none' }} /></svg>
              </a>
              <a href="mailto:xvi@xvi-group.net" className="xvi-footer-social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>
              </a>
            </div>
          </div>
          <nav aria-label="روابط الموقع" className="xvi-footer-links">
            {footerNavigation.map((item) => (
              <Link
                key={item.path}
                onMouseEnter={() => void item.prefetch?.()}
                to={item.path}
                className="xvi-footer-link"
              >
                <span>{item.label}</span>
                <span className="xvi-footer-link-arrow" aria-hidden="true">↙</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Elegant divider */}
        <div className="xvi-footer-divider xvi-footer-divider--thin" aria-hidden="true" />

        {/* Copyright */}
        <div className="xvi-footer-bottom">
          <div className="xvi-footer-copyright">
            <span>© {new Date().getFullYear()} XVI GROUP</span>
            <span className="xvi-footer-copyright-sep">·</span>
            <span>All rights reserved</span>
          </div>
          <div className="xvi-footer-tagline">
            STRATEGY · TECHNOLOGY · DELIVERY
          </div>
        </div>
      </Container>
    </footer>
  )
})
