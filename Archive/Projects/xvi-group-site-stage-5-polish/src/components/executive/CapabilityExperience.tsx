import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../common/Container'

export type CapabilityExperienceProps = {
  code: string
  eyebrow: string
  title: string
  description: string
  challenge: string
  perspective: string
  capabilities: readonly string[]
  process: readonly string[]
  industries: readonly string[]
  technologies: readonly string[]
  outcome: string
  quote: string
  variant: 'strategy' | 'technology' | 'ai' | 'training'
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
}

export function MetricCards({ items }: { items: readonly string[] }) {
  return <div className="grid gap-3 sm:grid-cols-3">{items.map((item, index) => <div key={item} className="xvi-metric-card rounded-[24px] border border-white/14 bg-white/8 p-5 backdrop-blur-xl"><div className="text-[11px] tracking-[.22em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</div><div className="mt-10 text-lg font-semibold leading-snug text-white">{item}</div></div>)}</div>
}

export function ProcessFlow({ steps }: { steps: readonly string[] }) {
  return <ol className="xvi-process-flow grid gap-4 md:grid-cols-2 xl:grid-cols-4">{steps.map((step, index) => <li key={step} className="relative rounded-[24px] border border-[color:var(--color-xvi-line)] bg-white/60 p-6"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-xvi-bronze)] text-xs tracking-[.16em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</span><h3 className="mt-10 text-2xl font-semibold tracking-[-.045em]">{step}</h3></li>)}</ol>
}

export function ArchitectureGrid({ items }: { items: readonly string[] }) {
  return <div className="grid overflow-hidden rounded-[30px] border border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-line)] sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <div key={item} className="min-h-44 bg-white/78 p-6"><div className="h-px w-10 bg-[color:var(--color-xvi-bronze)]" /><div className="mt-12 text-xl font-semibold tracking-[-.04em]">{item}</div><div className="mt-3 text-xs tracking-[.16em] text-[color:var(--color-xvi-ink-soft)]">LAYER 0{index + 1}</div></div>)}</div>
}

export function CapabilityExperience({ code, eyebrow, title, description, challenge, perspective, capabilities, process, industries, technologies, outcome, quote, variant }: CapabilityExperienceProps) {
  return <div className={`xvi-capability xvi-capability--${variant}`}>
    <section className="xvi-capability-hero relative isolate overflow-hidden bg-[color:var(--color-xvi-navy)] py-16 text-white sm:py-24 lg:py-32">
      <div className="xvi-capability-orbit" aria-hidden="true" /><div className="xvi-capability-grid" aria-hidden="true" />
      <Container className="relative"><Link to="/services" className="inline-flex text-[11px] tracking-[.24em] text-white/65 transition hover:text-[color:var(--color-xvi-bronze)]">XVI GROUP / SERVICES ←</Link><div className="mt-16 grid gap-12 lg:grid-cols-[1.22fr_.78fr] lg:items-end"><Reveal><div><div className="text-[11px] tracking-[.32em] text-[color:var(--color-xvi-bronze)]">{code} / {eyebrow}</div><h1 className="mt-6 max-w-4xl text-[clamp(50px,7vw,104px)] font-semibold leading-[.86] tracking-[-.075em]">{title}</h1><p className="mt-8 max-w-2xl text-[17px] leading-9 text-white/70 sm:text-[19px]">{description}</p><Link to="/contact" className="mt-10 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-xvi-navy)] transition hover:-translate-y-px hover:bg-[color:var(--color-xvi-bronze-soft)]">رتّب اجتماعًا تنفيذيًا <span className="mr-2">←</span></Link></div></Reveal><Reveal delay={0.12}><div className="xvi-capability-diagram rounded-[32px] border border-white/14 bg-white/8 p-6 backdrop-blur-xl sm:p-8"><div className="text-[10px] tracking-[.26em] text-white/55">EXECUTIVE SYSTEM MAP</div><div className="relative mt-10 min-h-64"><i /><i /><i /><span className="xvi-map-node xvi-map-node--one">قرار</span><span className="xvi-map-node xvi-map-node--two">قدرة</span><span className="xvi-map-node xvi-map-node--three">أثر</span><span className="xvi-map-core">XVI</span></div></div></Reveal></div></Container>
    </section>

    <section className="bg-[color:var(--color-xvi-warm)] py-18 sm:py-24"><Container><Reveal><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">STRATEGIC CHALLENGE</div><div><h2 className="max-w-3xl text-[clamp(36px,5vw,64px)] font-semibold leading-[.95] tracking-[-.06em]">{challenge}</h2><div className="mt-10 border-r-2 border-[color:var(--color-xvi-bronze)] pr-6 text-xl leading-9 text-[color:var(--color-xvi-ink-soft)]">{perspective}</div></div></div></Reveal></Container></section>

    <section className="bg-[color:var(--color-xvi-paper)] py-18 sm:py-24"><Container><Reveal><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">CAPABILITIES</div><h2 className="mt-4 text-[clamp(36px,5vw,64px)] font-semibold leading-none tracking-[-.06em]">بنية عمل تستحق الثقة.</h2></div><p className="max-w-md leading-8 text-[color:var(--color-xvi-ink-soft)]">نجمع التفكير التنفيذي والقدرة التقنية في مسار واحد قابل للقياس والتبني.</p></div><div className="mt-10"><ArchitectureGrid items={capabilities} /></div></Reveal></Container></section>

    <section className="bg-[color:var(--color-xvi-warm)] py-18 sm:py-24"><Container><Reveal><div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">EXECUTIVE PROCESS</div><h2 className="mt-4 text-[clamp(36px,5vw,64px)] font-semibold leading-none tracking-[-.06em]">من الاتجاه إلى التشغيل.</h2><div className="mt-10"><ProcessFlow steps={process} /></div></Reveal></Container></section>

    <section className="bg-[color:var(--color-xvi-navy)] py-18 text-white sm:py-24"><Container><Reveal><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">INDUSTRIES / TECHNOLOGY</div><h2 className="mt-5 text-[clamp(35px,5vw,62px)] font-semibold leading-[.94] tracking-[-.06em]">السياق هو أول طبقة في الحل.</h2></div><div><MetricCards items={industries.slice(0, 3)} /><div className="mt-8 flex flex-wrap gap-3 border-t border-white/12 pt-7">{technologies.map((technology) => <span key={technology} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">{technology}</span>)}</div></div></div></Reveal></Container></section>

    <section className="bg-[color:var(--color-xvi-paper)] py-18 sm:py-24"><Container><Reveal><div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]"><aside className="rounded-[30px] bg-[color:var(--color-xvi-navy)] p-8 text-white sm:p-10"><div className="text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">CONFIDENTIAL CASE NOTE</div><div className="mt-14 text-3xl font-semibold leading-tight tracking-[-.045em]">تقرير تحوّل تنفيذي، لا قصة تسويق.</div></aside><article className="rounded-[30px] border border-[color:var(--color-xvi-line)] bg-white/72 p-7 sm:p-10"><div className="grid gap-7 sm:grid-cols-2"><div><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">SITUATION</div><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">مؤسسة تحتاج إلى صورة تشغيلية أوضح قبل أن توسع استثمارها التالي.</p></div><div><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">STRATEGY</div><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">نموذج قرار موحد، وخارطة قدرة تربط القيادة بالفرق والبيانات.</p></div><div><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">TRANSFORMATION</div><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">انتقال من المبادرات المتوازية إلى مسار تنفيذي واحد منضبط.</p></div><div><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">OUTCOME</div><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">{outcome}</p></div></div></article></div></Reveal></Container></section>

    <section className="bg-[color:var(--color-xvi-warm)] py-18 sm:py-24"><Container><Reveal><blockquote className="mx-auto max-w-4xl text-center text-[clamp(30px,4vw,54px)] font-semibold leading-[1.15] tracking-[-.055em] text-[color:var(--color-xvi-ink)]">“{quote}”</blockquote><div className="mt-8 text-center text-[11px] tracking-[.28em] text-[color:var(--color-xvi-bronze)]">XVI EXECUTIVE PERSPECTIVE</div><div className="mt-12 text-center"><Link to="/contact" className="inline-flex rounded-full bg-[color:var(--color-xvi-navy)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(11,27,51,.18)] transition hover:-translate-y-px">ابدأ الحوار التنفيذي</Link></div></Reveal></Container></section>
  </div>
}
