import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ErrorBoundary } from '../common/ErrorBoundary'
import { ExecutiveNavigation } from '../../components/executive/ExecutiveNavigation'
import { SiteFooter } from './SiteFooter'
import { ViewportExperience } from '../executive/ViewportExperience'

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(5px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, filter: 'blur(3px)', transition: { duration: 0.24 } },
}

export function SiteLayout() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const mainRef = useRef<HTMLDivElement>(null)

  // Restore the top position and move focus after every routed page transition.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus()
  }, [location.pathname])

  return (
    <>
      <a
        className="sr-only rounded-full bg-white px-4 py-2 shadow focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50"
        href="#main"
      >
        تخطي إلى المحتوى
      </a>
      {location.pathname !== '/privacy' && location.pathname !== '/terms' && <ViewportExperience />}
      <ErrorBoundary fallback={<div role="alert" className="p-4 text-center text-sm text-[color:var(--color-xvi-ink-soft)]">حدث خطأ في التنقل</div>}>
        <ExecutiveNavigation />
      </ErrorBoundary>

      <main id="main" tabIndex={-1} ref={mainRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reducedMotion ? false : 'initial'}
            animate="enter"
            exit={reducedMotion ? undefined : 'exit'}
            variants={pageVariants}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {!reducedMotion ? <motion.div key={location.pathname} aria-hidden="true" initial={{ scaleX: 1, transformOrigin: 'right' }} animate={{ scaleX: 0 }} exit={{ scaleX: 1, transformOrigin: 'left' }} transition={{ duration: .62, ease: [0.76, 0, 0.24, 1] }} className="pointer-events-none fixed inset-0 z-30 bg-[linear-gradient(90deg,rgba(11,27,51,.96),rgba(11,27,51,.8),rgba(201,169,110,.7))]" /> : null}
      </AnimatePresence>

      <ErrorBoundary fallback={<div role="alert" className="p-4 text-center text-sm text-[color:var(--color-xvi-ink-soft)]">حدث خطأ في التذييل</div>}>
        <SiteFooter />
      </ErrorBoundary>
    </>
  )
}

export default SiteLayout
