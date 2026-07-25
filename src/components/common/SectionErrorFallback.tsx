import { motion, useReducedMotion } from 'framer-motion'

type SectionErrorFallbackProps = {
  sectionName?: string
  error?: Error
  reset?: () => void
}

export function SectionErrorFallback({ sectionName = 'المحتوى', error, reset }: SectionErrorFallbackProps) {
  const reducedMotion = useReducedMotion()

  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <motion.div
      role="alert"
      aria-live="polite"
      {...reveal}
      className="relative overflow-hidden rounded-[20px] border border-[color:var(--color-xvi-line)] bg-white/50 px-6 py-10 text-center backdrop-blur-sm sm:px-10 sm:py-14"
    >
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--color-xvi-bronze)] to-transparent opacity-30" aria-hidden="true" />

      <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)]">XVI / SECTION ERROR</div>

      <h3 className="mt-4 text-[22px] font-[600] leading-tight tracking-[-0.03em] text-[color:var(--color-xvi-ink)]">
        تعذّر تحميل {sectionName}
      </h3>

      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[color:var(--color-xvi-ink-soft)]">
        حدث خطأ أثناء تحميل هذا القسم. يمكنك المحاولة مرة أخرى أو المتابعة إلى القسم التالي.
      </p>

      {error && (
        <p className="mt-2 text-xs text-[color:var(--color-xvi-muted)]">
          {error.message}
        </p>
      )}

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset?.()}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-xvi-navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(11,27,51,.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(11,27,51,.2)]"
        >
          إعادة المحاولة
          <span aria-hidden="true">↻</span>
        </button>
      </div>
    </motion.div>
  )
}

export default SectionErrorFallback
