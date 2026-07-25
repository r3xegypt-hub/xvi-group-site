import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { InteractiveSurface } from '../common/InteractiveSurface'

type Item = { label: string; detail?: string; value?: string }

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }

export function MetricCards({ items }: { items: Item[] }) {
  const reduced = useReducedMotion()
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <motion.div key={item.label} variants={reveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .25 }} transition={{ duration: .5, delay: index * .05 }}><InteractiveSurface className="group min-h-full rounded-[24px] border border-[color:var(--color-xvi-line)] bg-white/62 p-6 shadow-[0_16px_38px_rgba(11,15,20,.035)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[color:var(--color-xvi-bronze)]/35 hover:shadow-[0_24px_54px_rgba(11,15,20,.075)]"><div className="absolute inset-x-6 top-0 h-px bg-[color:var(--color-xvi-bronze)] opacity-0 transition-opacity group-hover:opacity-100" /><div className="text-[11px] tracking-[.2em] text-[color:var(--color-xvi-ink-soft)]">{item.label}</div><div className="mt-7 text-4xl font-semibold tracking-[-.07em] text-[color:var(--color-xvi-ink)]">{item.value}</div>{item.detail ? <p className="mt-3 text-sm leading-6 text-[color:var(--color-xvi-ink-soft)]">{item.detail}</p> : null}</InteractiveSurface></motion.div>)}</div>
}

export function ArchitectureGrid({ items }: { items: Item[] }) {
  return <div className="grid overflow-hidden rounded-[30px] border border-[color:var(--color-xvi-line)] bg-white/45 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => <div key={item.label} className="group min-h-52 border-b border-[color:var(--color-xvi-line)] p-7 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 lg:border-s"><div className="flex items-center justify-between"><span className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</span><span className="h-2 w-2 rounded-full bg-[color:var(--color-xvi-bronze)] shadow-[0_0_0_6px_rgba(176,141,87,.1)] transition-transform group-hover:scale-125" /></div><h3 className="mt-12 text-2xl font-semibold tracking-[-.045em]">{item.label}</h3><p className="mt-3 max-w-xs text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">{item.detail}</p></div>)}</div>
}

export function GlassStatistics({ items }: { items: Item[] }) {
  return <div className="grid gap-3 md:grid-cols-3">{items.map((item) => <div key={item.label} className="rounded-[26px] border border-white/16 bg-white/9 p-7 backdrop-blur-xl"><div className="text-[11px] tracking-[.2em] text-white/55">{item.label}</div><div className="mt-8 text-5xl font-semibold tracking-[-.08em] text-white">{item.value}</div><p className="mt-3 text-sm leading-7 text-white/63">{item.detail}</p></div>)}</div>
}

export function ProcessFlow({ items }: { items: Item[] }) {
  return <ol className="grid gap-3 lg:grid-cols-4">{items.map((item, index) => <li key={item.label} className="relative rounded-[24px] border border-[color:var(--color-xvi-line)] bg-white/55 p-6"><div className="flex items-center justify-between"><span className="text-[11px] tracking-[.22em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</span>{index < items.length - 1 ? <span className="hidden text-[color:var(--color-xvi-bronze)] lg:block">←</span> : null}</div><h3 className="mt-10 text-2xl font-semibold tracking-[-.04em]">{item.label}</h3><p className="mt-3 text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">{item.detail}</p></li>)}</ol>
}

export function ExecutiveTimeline({ items }: { items: Item[] }) {
  return <ol className="relative mr-3 border-r border-[color:var(--color-xvi-line)] pr-8 sm:mr-8 sm:pr-12">{items.map((item, index) => <li key={item.label} className="relative pb-12 last:pb-0"><span className="absolute -right-[2.36rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--color-xvi-bronze)] bg-[color:var(--color-xvi-warm)] sm:-right-[3.36rem]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-xvi-bronze)]" /></span><div className="text-[11px] tracking-[.2em] text-[color:var(--color-xvi-bronze)]">PHASE 0{index + 1}</div><h3 className="mt-3 text-2xl font-semibold tracking-[-.04em]">{item.label}</h3><p className="mt-3 max-w-2xl leading-8 text-[color:var(--color-xvi-ink-soft)]">{item.detail}</p></li>)}</ol>
}

export function ExecutiveQuote({ quote, attribution }: { quote: ReactNode; attribution: string }) {
  return <figure className="relative overflow-hidden rounded-[32px] border border-white/14 bg-[color:var(--color-xvi-navy)] px-7 py-11 text-white shadow-[0_28px_70px_rgba(11,27,51,.18)] sm:px-12 sm:py-16"><span aria-hidden="true" className="absolute -left-2 -top-14 font-serif text-[180px] leading-none text-[color:var(--color-xvi-bronze)]/20">“</span><blockquote className="relative max-w-4xl text-[clamp(29px,4vw,52px)] font-semibold leading-[1.15] tracking-[-.05em]">{quote}</blockquote><figcaption className="relative mt-8 text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">{attribution}</figcaption></figure>
}

export function InsightPanel({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <InteractiveSurface intensity="elevated" className="rounded-[28px] border border-[color:var(--color-xvi-bronze)]/35 bg-[color:var(--color-xvi-bronze-soft)]/25 p-7 transition-[border-color,box-shadow] duration-500 hover:border-[color:var(--color-xvi-bronze)]/60 hover:shadow-[0_20px_48px_rgba(176,141,87,.1)] sm:p-9"><div className="text-[11px] tracking-[.24em] text-[color:var(--color-xvi-bronze)]">{label}</div><h3 className="mt-4 text-2xl font-semibold tracking-[-.045em]">{title}</h3><div className="mt-4 max-w-3xl leading-8 text-[color:var(--color-xvi-ink-soft)]">{children}</div></InteractiveSurface>
}

export function TransformationDiagram({ stages }: { stages: Item[] }) {
  return <div className="relative overflow-hidden rounded-[30px] border border-white/14 bg-[linear-gradient(145deg,#0b1b33,#132948)] p-6 sm:p-10"><div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" /><div className="relative grid gap-4 md:grid-cols-4">{stages.map((stage, index) => <div key={stage.label} className="relative min-h-40 rounded-[20px] border border-white/16 bg-white/8 p-5 backdrop-blur-xl"><span className="text-[11px] tracking-[.2em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</span><h3 className="mt-8 text-xl font-semibold text-white">{stage.label}</h3><p className="mt-3 text-sm leading-6 text-white/62">{stage.detail}</p>{index < stages.length - 1 ? <span className="absolute -left-4 top-1/2 hidden h-px w-4 bg-[color:var(--color-xvi-bronze)] md:block" /> : null}</div>)}</div></div>
}

export function PremiumTable({ rows }: { rows: Array<[string, string, string]> }) {
  return <div className="overflow-hidden rounded-[26px] border border-[color:var(--color-xvi-line)] bg-white/60"><div className="grid grid-cols-[.7fr_1fr_1.2fr] gap-4 border-b border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-paper)] px-5 py-4 text-[10px] tracking-[.2em] text-[color:var(--color-xvi-ink-soft)] sm:px-7"><span>DOMAIN</span><span>DECISION</span><span>EXECUTIVE SIGNAL</span></div>{rows.map(([domain, decision, signal]) => <div key={domain} className="grid grid-cols-[.7fr_1fr_1.2fr] gap-4 border-b border-[color:var(--color-xvi-line)] px-5 py-5 text-sm last:border-b-0 sm:px-7"><strong className="font-semibold">{domain}</strong><span className="text-[color:var(--color-xvi-ink-soft)]">{decision}</span><span className="text-[color:var(--color-xvi-ink-soft)]">{signal}</span></div>)}</div>
}

export function StrategicFramework({ items }: { items: Item[] }) {
  return <div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <InteractiveSurface key={item.label} className="rounded-[27px] border border-[color:var(--color-xvi-line)] bg-white/55 p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[color:var(--color-xvi-bronze)]/35 hover:shadow-[0_22px_52px_rgba(11,15,20,.07)]"><div className="absolute left-0 top-0 h-full w-1 bg-[color:var(--color-xvi-bronze)]" /><span className="text-[11px] tracking-[.2em] text-[color:var(--color-xvi-bronze)]">FRAME {index + 1}</span><h3 className="mt-8 text-2xl font-semibold tracking-[-.045em]">{item.label}</h3><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">{item.detail}</p></InteractiveSurface>)}</div>
}

export function CaseStudyDossier({ title, caption, chapters }: { title: string; caption: string; chapters: Item[] }) {
  return <article className="overflow-hidden rounded-[32px] border border-[color:var(--color-xvi-line)] bg-white/65 shadow-[0_24px_70px_rgba(11,15,20,.06)]"><header className="relative overflow-hidden border-b border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-paper)] p-7 sm:p-10"><div className="absolute left-8 top-0 h-full w-px bg-[color:var(--color-xvi-bronze)]/45" /><div className="text-[11px] tracking-[.25em] text-[color:var(--color-xvi-bronze)]">CONFIDENTIAL / XVI CASE FILE</div><h3 className="mt-5 max-w-3xl text-[clamp(30px,4vw,48px)] font-semibold leading-[1.03] tracking-[-.055em]">{title}</h3><p className="mt-4 max-w-2xl leading-8 text-[color:var(--color-xvi-ink-soft)]">{caption}</p></header><div className="grid divide-y divide-[color:var(--color-xvi-line)] md:grid-cols-5 md:divide-x md:divide-y-0">{chapters.map((chapter, index) => <section key={chapter.label} className="p-6 sm:p-7"><div className="text-[10px] tracking-[.2em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</div><h4 className="mt-5 text-lg font-semibold">{chapter.label}</h4><p className="mt-3 text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">{chapter.detail}</p></section>)}</div></article>
}
