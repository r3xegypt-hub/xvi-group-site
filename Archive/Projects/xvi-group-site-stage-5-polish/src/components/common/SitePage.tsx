import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from './Container'

type SitePageProps = {
  crumb: string
  eyebrow: string
  title: ReactNode
  description: ReactNode
  children: ReactNode
  ctaLabel?: string
  ctaPath?: string
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="مسار التنقل" className="mb-10 flex items-center gap-2 text-xs tracking-[0.14em] text-[color:var(--color-xvi-ink-soft)]">
      <Link className="transition hover:text-[color:var(--color-xvi-bronze)]" to="/">XVI GROUP</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

export function SitePage({ crumb, eyebrow, title, description, children, ctaLabel = 'ابدأ الحوار', ctaPath = '/contact' }: SitePageProps) {
  const reducedMotion = useReducedMotion()
  const reveal = reducedMotion ? {} : { initial: { opacity: 0, filter: 'blur(10px)', y: 18 }, whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.65 } }

  return (
    <div className="xvi-site-page pb-24">
      <section className="xvi-page-arrival relative isolate overflow-hidden border-b border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-paper)] py-16 sm:py-24 lg:py-32">
        <div className="xvi-page-arrival-light" aria-hidden="true" />
        <div aria-hidden="true" className="xvi-page-arrival-mark">XVI</div>
        <Container className="xvi-page-arrival-shell relative">
          <Breadcrumb current={crumb} />
          <motion.div {...reveal} className="xvi-page-arrival-copy max-w-4xl border-r border-[color:var(--color-xvi-bronze)] pr-0 sm:pr-10">
            <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)]">{eyebrow}</div>
            <h1 className="mt-5 max-w-4xl text-[clamp(45px,7vw,90px)] font-[600] leading-[.93] tracking-[-0.065em] text-[color:var(--color-xvi-ink)]">{title}</h1>
            <p className="mt-7 max-w-[59ch] text-[17px] leading-[1.9] text-[color:var(--color-xvi-ink-soft)] sm:text-[19px]">{description}</p>
            <Link to={ctaPath} className="xvi-page-arrival-cta mt-9 inline-flex rounded-full bg-[color:var(--color-xvi-navy)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(11,27,51,.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(11,27,51,.24)]">{ctaLabel} <span className="mr-2" aria-hidden="true">←</span></Link>
          </motion.div>
          <div className="xvi-page-arrival-index" aria-hidden="true"><span>XV / {crumb}</span><i /><small>EXECUTIVE<br />PERSPECTIVE</small></div>
          <div className="xvi-page-arrival-ledger" aria-hidden="true"><span>PRIVATE BRIEF</span><i /><span>AL AIN / UAE</span></div>
        </Container>
      </section>
      {children}
    </div>
  )
}

export function PageSection({ eyebrow, title, children, tone = 'warm' }: { eyebrow?: string; title: ReactNode; children: ReactNode; tone?: 'warm' | 'paper' | 'navy' }) {
  const reducedMotion = useReducedMotion()
  const surface = tone === 'navy' ? 'bg-[color:var(--color-xvi-navy)] text-white' : tone === 'paper' ? 'bg-[color:var(--color-xvi-paper)]' : 'bg-[color:var(--color-xvi-warm)]'
  return (
    <motion.section initial={reducedMotion ? false : { opacity: 0, y: 22, clipPath: 'inset(0 0 8% 0 round 20px)' }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 0px)' }} viewport={{ once: true, amount: .12 }} transition={{ duration: .72, ease: [0.16, 1, .3, 1] }} className={`xvi-page-section relative overflow-hidden border-b border-[color:var(--color-xvi-line)] py-[4.5rem] sm:py-24 ${surface}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(176,141,87,.13),transparent_67%)] blur-xl" />
      <div className="xvi-section-chapter" aria-hidden="true"><span>CHAPTER</span><b /></div>
      <div className="xvi-section-orbit" aria-hidden="true"><i /><i /></div>
      <Container className="xvi-page-section-content relative">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)]">{eyebrow}</div> : null}
          <h2 className={`mt-4 text-[clamp(32px,4.4vw,58px)] font-semibold leading-[1.01] tracking-[-.05em] ${tone === 'navy' ? 'text-white' : 'text-[color:var(--color-xvi-ink)]'}`}>{title}</h2>
        </div>
        {children}
      </Container>
    </motion.section>
  )
}

export function PageCta({ title = 'لنصمم ما يأتي بثقة.', text = 'ابدأ مع فريق XVI Group حوارًا تنفيذيًا يضع الأولوية للنتيجة والجاهزية.' }: { title?: string; text?: string }) {
  return (
    <section className="px-4 pt-16 sm:px-6 sm:pt-24">
      <Container className="xvi-page-cta relative overflow-hidden rounded-[32px] bg-[color:var(--color-xvi-navy)] px-7 py-12 shadow-[0_30px_80px_rgba(11,27,51,.2)] sm:px-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">XVI / NEXT STEP</div>
          <h2 className="mt-5 text-[clamp(35px,5vw,64px)] font-semibold leading-none tracking-[-.06em] text-white">{title}</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">{text}</p>
          <Link to="/contact" className="xvi-premium-button mt-8 inline-flex overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-xvi-navy)] transition duration-500 hover:-translate-y-px hover:bg-[color:var(--color-xvi-bronze-soft)]">رتّب اجتماعًا استكشافيًا</Link>
        </div>
      </Container>
    </section>
  )
}
