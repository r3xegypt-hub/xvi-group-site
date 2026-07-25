import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import usePageMeta from '../../hooks/usePageMeta'
import { Breadcrumb, PageCta, PageSection } from '../common'
import { Container } from '../common/Container'
import { ArchitectureGrid, CaseStudyDossier, ExecutiveQuote, ExecutiveTimeline, GlassStatistics, InsightPanel, MetricCards, PremiumTable, ProcessFlow, StrategicFramework, TransformationDiagram } from './ExecutiveSystems'

type Detail = { label: string; detail: string; value?: string }

export type CapabilityPageConfig = {
  slug: string
  crumb: string
  eyebrow: string
  title: string
  description: string
  heroNote: string
  heroSystem: [string, string, string]
  challenge: string
  perspective: string
  capabilities: Detail[]
  process: Detail[]
  industries: Detail[]
  technology: Detail[]
  metrics: Detail[]
  framework: Detail[]
  table: Array<[string, string, string]>
  quote: string
  caseStudy: { title: string; caption: string; chapters: Detail[] }
  cta: string
}

function CapabilityHero({ config }: { config: CapabilityPageConfig }) {
  const reduced = useReducedMotion()
  return <section className="relative isolate overflow-hidden border-b border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-paper)]"><div aria-hidden className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_78%_18%,rgba(201,169,110,.22),transparent_20%),radial-gradient(circle_at_12%_86%,rgba(11,27,51,.08),transparent_28%),linear-gradient(135deg,transparent,rgba(255,255,255,.66))]" /><div aria-hidden className="absolute -left-8 top-0 text-[clamp(200px,31vw,500px)] font-semibold leading-none tracking-[-.15em] text-[color:var(--color-xvi-ink)]/[.035]">XVI</div><Container className="xvi-capability-hero relative grid min-h-[min(760px,calc(100svh-75px))] gap-12 py-14 sm:py-20 lg:grid-cols-[1.07fr_.93fr] lg:items-center lg:py-24"><div className="xvi-capability-hero-copy min-w-0"><Breadcrumb current={config.crumb} /><motion.div initial={reduced ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .7, ease: [.16, 1, .3, 1] }}><div className="text-[10px] tracking-[.22em] text-[color:var(--color-xvi-bronze)] sm:text-[11px] sm:tracking-[.29em]">{config.eyebrow}</div><h1 className="mt-5 max-w-full break-words text-[clamp(39px,11vw,94px)] font-semibold leading-[.92] tracking-[-.07em] sm:max-w-4xl sm:text-[clamp(48px,7vw,94px)]">{config.title}</h1><p className="mt-8 max-w-[60ch] text-[16px] leading-8 text-[color:var(--color-xvi-ink-soft)] sm:text-[19px] sm:leading-9">{config.description}</p><div className="mt-10 flex min-w-0 flex-wrap items-center gap-4"><Link to="/contact" className="xvi-premium-button shrink-0 overflow-hidden rounded-full bg-[color:var(--color-xvi-navy)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_48px_rgba(11,27,51,.18)] transition hover:-translate-y-0.5 sm:px-6">ابدأ حوارًا تنفيذيًا <span className="mr-2">←</span></Link><span className="min-w-0 text-[10px] tracking-[.12em] text-[color:var(--color-xvi-ink-soft)] sm:text-xs sm:tracking-[.16em]">{config.heroNote}</span></div></motion.div></div><motion.div initial={reduced ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15, duration: .8, ease: [.16, 1, .3, 1] }} className="xvi-capability-visual relative mx-auto w-full min-w-0 max-w-xl"><div className="relative aspect-square overflow-hidden rounded-[34px] border border-[color:var(--color-xvi-line)] bg-white/50 p-5 shadow-[0_30px_90px_rgba(11,15,20,.08)] backdrop-blur-xl sm:p-9"><div className="absolute inset-5 rounded-[24px] border border-[color:var(--color-xvi-bronze)]/25" /><div className="absolute left-[19%] top-[19%] h-[62%] w-[62%] rounded-full border border-[color:var(--color-xvi-navy)]/14" /><div className="absolute left-[29%] top-[29%] h-[42%] w-[42%] rounded-full border border-[color:var(--color-xvi-bronze)]/45" /><motion.div animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="absolute left-[18%] top-[18%] h-[64%] w-[64%] rounded-full border border-dashed border-[color:var(--color-xvi-bronze)]/45" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-[9px] tracking-[.14em] text-[color:var(--color-xvi-ink-soft)] sm:text-[10px] sm:tracking-[.2em]"><span>EXECUTIVE SYSTEM</span><span>01—03</span></div><div className="grid gap-3">{config.heroSystem.map((item, index) => <div key={item} className="flex min-w-0 items-center gap-2 rounded-2xl border border-[color:var(--color-xvi-line)] bg-white/72 px-3 py-3 backdrop-blur-xl sm:gap-3 sm:px-4" style={{ marginRight: `${index * 8}%` }}><span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-xvi-bronze)] shadow-[0_0_0_5px_rgba(201,169,110,.1)]" /><span className="truncate text-[10px] tracking-[.11em] text-[color:var(--color-xvi-ink)] sm:text-xs sm:tracking-[.15em]">{item}</span></div>)}</div><div className="flex justify-between text-[9px] tracking-[.12em] text-[color:var(--color-xvi-bronze)] sm:text-[10px] sm:tracking-[.18em]"><span>PRECISION</span><span>IMPACT</span></div></div></div></motion.div></Container></section>
}

export function CapabilityPage({ config }: { config: CapabilityPageConfig }) {
  usePageMeta({ title: `${config.crumb} — XVI Group`, description: config.description, canonical: `https://xvi-group.net/${config.slug}`, schemaType: 'CollectionPage' })
  return <div className="xvi-capability-page pb-24"><CapabilityHero config={config} /><PageSection eyebrow="STRATEGIC CHALLENGE" title="السؤال الذي يسبق أي إجابة."><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><p className="max-w-2xl text-xl leading-10 text-[color:var(--color-xvi-ink-soft)]">{config.challenge}</p><InsightPanel label="XVI PERSPECTIVE" title="نحوّل التعقيد إلى قرار قابل للحركة."><p>{config.perspective}</p></InsightPanel></div></PageSection><PageSection tone="paper" eyebrow="CAPABILITIES" title="قدرات ترتبط بالقرار، لا بقائمة خدمات."><ArchitectureGrid items={config.capabilities} /></PageSection><PageSection eyebrow="PROCESS" title="إيقاع تنفيذي يحمي السرعة والدقة."><ProcessFlow items={config.process} /></PageSection><PageSection tone="navy" eyebrow="EXECUTIVE SIGNALS" title="الأثر مرئي في لغة الأرقام."><GlassStatistics items={config.metrics} /></PageSection><PageSection tone="paper" eyebrow="TRANSFORMATION ARCHITECTURE" title="نصمم النظام قبل أن نبدأ الحركة."><TransformationDiagram stages={config.framework} /></PageSection><PageSection eyebrow="INDUSTRY CONTEXT" title="كل قطاع له سياقه. المنهج يظل ثابتًا."><div className="grid gap-8 lg:grid-cols-[1fr_.9fr]"><ExecutiveTimeline items={config.industries} /><PremiumTable rows={config.table} /></div></PageSection><PageSection tone="paper" eyebrow="TECHNOLOGY / ENABLEMENT" title="طبقات تمكين تُبنى لتبقى."><StrategicFramework items={config.technology} /></PageSection><PageSection eyebrow="CONFIDENTIAL CASE FILE" title="عمل يبدو كتحول، لا كعرض تقديمي."><CaseStudyDossier {...config.caseStudy} /></PageSection><section className="px-4 pt-16 sm:px-6 sm:pt-24"><Container><ExecutiveQuote quote={config.quote} attribution="XVI GROUP / EXECUTIVE PRINCIPLE" /></Container></section><PageSection tone="paper" eyebrow="RESULTS" title="نتائج تخلق قدرة داخلية."><MetricCards items={config.metrics} /></PageSection><PageCta title={config.cta} text="نبدأ من القرار الذي يهم الآن، ثم نبني المسار الذي يجعل الأثر قابلًا للقياس والاستمرار." /></div>
}
