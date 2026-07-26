import clsx from 'clsx'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteNavigation } from '../../data/siteNavigation'
import { Container } from '../common/Container'
import { LuxuryLogo } from '../common/LuxuryLogo'

const practices = [
  { label: 'الاستشارات الإدارية', path: '/business-consulting', note: 'استراتيجية، تشغيل، وحوكمة.' },
  { label: 'الاستشارات التقنية', path: '/technology-consulting', note: 'معمارية، منصات، وتسليم.' },
  { label: 'تحول الذكاء الاصطناعي', path: '/ai-transformation', note: 'قيمة، بيانات، وثقة.' },
  { label: 'التطوير التنفيذي', path: '/executive-training', note: 'قيادة، تبنٍ، وقدرة.' },
]

const primary = siteNavigation.filter((item) => ['/', '/about', '/industries', '/technology', '/insights'].includes(item.path))

export const ExecutiveNavigation = memo(function ExecutiveNavigation() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const navRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pathIsPractice = practices.some((item) => item.path === location.pathname)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
    setAtTop(latest < 8)
  })

  const handleNavLeave = useCallback(() => setOpen(false), [])

  // Close practice directory on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close practice directory on Escape key
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header
      ref={navRef}
      onMouseLeave={handleNavLeave}
      className={clsx(
        'xvi-nav',
        scrolled && 'xvi-nav--scrolled',
        atTop && 'xvi-nav--top',
      )}
    >
      {/* Top glow when at page top */}
      <div className="xvi-nav-glow" aria-hidden="true" />

      <Container className="xvi-nav-inner">
        {/* Logo */}
        <Link to="/" className="xvi-nav-logo" aria-label="العودة إلى الرئيسية">
          <LuxuryLogo size="md" variant="dark" animated showWordmark />
        </Link>

        {/* Primary navigation */}
        <nav aria-label="التنقل الرئيسي" className="xvi-nav-links">
          {primary.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => void item.prefetch?.()}
                aria-current={isActive ? 'page' : undefined}
                className={clsx('xvi-nav-link', isActive && 'xvi-nav-link--active')}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="xvi-nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Practices dropdown trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((c) => !c)}
            onMouseEnter={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="practice-directory"
            className={clsx('xvi-nav-link xvi-nav-trigger', pathIsPractice && 'xvi-nav-trigger--active')}
          >
            <span>الممارسات</span>
            <span className={clsx('xvi-nav-trigger-icon', open && 'xvi-nav-trigger-icon--open')}>+</span>
          </button>
        </nav>

        {/* CTA button */}
        <Link
          to="/contact"
          onMouseEnter={() => void import('../../pages/Contact')}
          className="xvi-nav-cta"
        >
          <span className="xvi-nav-cta-shine" aria-hidden="true" />
          <span className="xvi-nav-cta-text">احجز اجتماعًا</span>
        </Link>

        {/* Mobile practices strip */}
        <div className="xvi-nav-mobile-practices">
          <div className="xvi-nav-mobile-scroll">
            {practices.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => {
                  const navItem = siteNavigation.find((nav) => nav.path === item.path)
                  void navItem?.prefetch?.()
                }}
                className={clsx(
                  'xvi-nav-mobile-pill',
                  location.pathname === item.path && 'xvi-nav-mobile-pill--active',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Practice directory mega-menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="practice-directory"
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -6, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: .3, ease: [.16, 1, .3, 1] }}
            className="xvi-nav-dropdown"
          >
            <Container className="xvi-nav-dropdown-inner">
              <div className="xvi-nav-dropdown-intro">
                <div className="xvi-nav-dropdown-label">XVI / PRACTICE DIRECTORY</div>
                <p className="xvi-nav-dropdown-title">أربع ممارسات تعمل كغرفة قيادة واحدة.</p>
                <Link to="/services" onClick={() => setOpen(false)} className="xvi-nav-dropdown-link">
                  استكشف الخدمات <span className="mr-2">←</span>
                </Link>
              </div>
              <div className="xvi-nav-dropdown-grid">
                {practices.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => {
                      const navItem = siteNavigation.find((nav) => nav.path === item.path)
                      void navItem?.prefetch?.()
                    }}
                    className="xvi-nav-dropdown-item"
                  >
                    <div className="xvi-nav-dropdown-item-head">
                      <div>
                        <span className="xvi-nav-dropdown-item-num">0{index + 1}</span>
                        <h2 className="xvi-nav-dropdown-item-title">{item.label}</h2>
                        <p className="xvi-nav-dropdown-item-note">{item.note}</p>
                      </div>
                      <span className="xvi-nav-dropdown-item-arrow">←</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
})
