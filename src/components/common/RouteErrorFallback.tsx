import { useReducedMotion, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Container } from './Container'
import { Breadcrumb } from './SitePage'

type RouteErrorFallbackProps = {
  error?: Error
  reset?: () => void
}

export function RouteErrorFallback({ error, reset }: RouteErrorFallbackProps) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div className="xvi-site-page pb-24">
      <section className="xvi-page-arrival relative isolate overflow-hidden border-b border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-paper)] py-16 sm:py-24 lg:py-32">
        <div className="xvi-page-arrival-light" aria-hidden="true" />
        <div aria-hidden="true" className="xvi-page-arrival-mark">XVI</div>
        <Container className="xvi-page-arrival-shell relative">
          <Breadcrumb current="خطأ" />
          <motion.div {...reveal} className="xvi-page-arrival-copy max-w-4xl border-r border-[color:var(--color-xvi-bronze)] pr-0 sm:pr-10">
            <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)]">XVI / ERROR</div>
            <h1 className="mt-5 max-w-4xl text-[clamp(45px,7vw,90px)] font-[600] leading-[.93] tracking-[-0.065em] text-[color:var(--color-xvi-ink)]">حدث خطأ في تحميل الصفحة</h1>

            {/* Breadcrumb-style path display */}
            {pathSegments.length > 0 && (
              <nav aria-label="المسار الذي فشل" className="mt-6 flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--color-xvi-line)] bg-white/60 px-5 py-3 text-xs tracking-[0.14em] text-[color:var(--color-xvi-ink-soft)] backdrop-blur-sm">
                <Link className="transition hover:text-[color:var(--color-xvi-bronze)]" to="/">XVI</Link>
                {pathSegments.map((segment, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    <span className={index === pathSegments.length - 1 ? 'text-[color:var(--color-xvi-ink)] font-semibold' : ''}>{segment}</span>
                  </span>
                ))}
              </nav>
            )}

            <p className="mt-7 max-w-[59ch] text-[17px] leading-[1.9] text-[color:var(--color-xvi-ink-soft)] sm:text-[19px]">
              لم نتمكن من الوصول إلى هذا المحتوى. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
            </p>

            {error && (
              <p className="mt-3 max-w-[59ch] text-sm text-[color:var(--color-xvi-muted)]">
                {error.message}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => reset?.()}
                className="xvi-page-arrival-cta inline-flex rounded-full bg-[color:var(--color-xvi-navy)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(11,27,51,.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(11,27,51,.24)]"
              >
                إعادة المحاولة <span className="mr-2" aria-hidden="true">↻</span>
              </button>
              <Link
                to="/"
                className="inline-flex rounded-full border border-[color:var(--color-xvi-line)] bg-white/72 px-6 py-3 text-sm font-semibold text-[color:var(--color-xvi-ink)] backdrop-blur-xl transition duration-300 hover:-translate-y-px hover:bg-white hover:shadow-[0_16px_40px_rgba(11,15,20,.06)]"
              >
                الصفحة الرئيسية <span className="mr-2" aria-hidden="true">←</span>
              </Link>
            </div>
          </motion.div>
          <div className="xvi-page-arrival-index" aria-hidden="true"><span>XV / ERROR</span><i /><small>EXECUTIVE<br />PERSPECTIVE</small></div>
          <div className="xvi-page-arrival-ledger" aria-hidden="true"><span>PRIVATE BRIEF</span><i /><span>AL AIN / UAE</span></div>
        </Container>
      </section>
    </div>
  )
}

export default RouteErrorFallback
