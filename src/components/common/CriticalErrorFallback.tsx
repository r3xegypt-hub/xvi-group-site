import { motion, useReducedMotion } from 'framer-motion'

type CriticalErrorFallbackProps = {
  error?: Error
  reset?: () => void
}

function generateRefId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `XVI-${timestamp}-${random}`
}

export function CriticalErrorFallback({ reset }: CriticalErrorFallbackProps) {
  const reducedMotion = useReducedMotion()
  const refId = generateRefId()

  const ease = [0.16, 1, 0.3, 1] as const

  const container = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease },
      }

  const monogram = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.2, ease },
      }

  const content = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.4, ease },
      }

  return (
    <div className="xvi-critical-error fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--color-xvi-paper)]">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,105,20,0.06),transparent_67%)] blur-3xl" />
        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08),transparent_67%)] blur-xl" />
        <div className="absolute -right-32 bottom-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.06),transparent_67%)] blur-xl" />
      </div>

      <motion.div {...container} className="relative flex flex-col items-center px-6 text-center">
        {/* XVI Monogram */}
        <motion.div {...monogram} className="mb-12">
          <div className="relative flex items-center justify-center">
            <span className="text-[clamp(80px,15vw,140px)] font-[600] leading-none tracking-[-0.08em] text-[color:var(--color-xvi-ink)] opacity-[0.07]" aria-hidden="true">
              XVI
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[clamp(48px,9vw,84px)] font-[600] leading-none tracking-[-0.06em] text-[color:var(--color-xvi-ink)]">
                XVI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Error content */}
        <motion.div {...content} className="max-w-lg">
          <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)]">XVI / CRITICAL ERROR</div>

          <h1 className="mt-5 text-[clamp(28px,4vw,42px)] font-[600] leading-[1.05] tracking-[-0.04em] text-[color:var(--color-xvi-ink)]">
            حدث خطأ غير متوقع
          </h1>

          <p className="mt-5 text-[17px] leading-[1.9] text-[color:var(--color-xvi-ink-soft)]">
            واجهنا مشكلة تقنية تمنع تحميل الموقع بالكامل. فريقنا يعمل على حلها في أقرب وقت.
          </p>

          {/* Error reference */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[color:var(--color-xvi-line)] bg-white/60 px-5 py-2.5 backdrop-blur-sm">
            <span className="text-[11px] tracking-[0.18em] text-[color:var(--color-xvi-muted)]">رقم المرجع</span>
            <span className="font-[var(--font-family-mono)] text-xs tracking-wider text-[color:var(--color-xvi-ink)]">{refId}</span>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset?.()}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-xvi-navy)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(11,27,51,.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(11,27,51,.24)]"
            >
              إعادة المحاولة
              <span aria-hidden="true">↻</span>
            </button>
            <a
              href="mailto:info@xvigroup.com"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-xvi-line)] bg-white/72 px-7 py-3 text-sm font-semibold text-[color:var(--color-xvi-ink)] backdrop-blur-xl transition duration-300 hover:-translate-y-px hover:bg-white hover:shadow-[0_16px_40px_rgba(11,15,20,.06)]"
            >
              تواصل معنا
              <span className="text-xs" aria-hidden="true">←</span>
            </a>
          </div>

          {/* Contact info */}
          <div className="mt-10 border-t border-[color:var(--color-xvi-line)] pt-8">
            <p className="text-sm text-[color:var(--color-xvi-muted)]">
              إذا استمرت المشكلة، يرجى التواصل عبر البريد الإلكتروني
            </p>
            <a
              href="mailto:info@xvigroup.com"
              className="mt-2 inline-block text-sm font-medium text-[color:var(--color-xvi-bronze)] transition hover:text-[color:var(--color-xvi-bronze-light)]"
            >
              info@xvigroup.com
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CriticalErrorFallback
