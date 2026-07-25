import clsx from 'clsx'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { memo, useCallback, useRef, useState, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { aboutPillars, industries, magazineColumns, networkNodes, processSteps, services, storyPanels, technologies, testimonials } from '../data/siteContent'
import { Container, SectionHeader } from '../components/common'
import { Button } from '../components/ui/Button'
import { PremiumServiceCard } from '../components/executive/PremiumServiceCard'

/* SVG icons for each service */
const serviceIcons: ReactNode[] = [
  <svg key="ai" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xvi-service-icon-svg" aria-hidden="true"><circle cx="24" cy="24" r="6" /><path d="M24 4v6M24 38v6M4 24h6M38 24h6" /><path d="M9.86 9.86l4.24 4.24M33.9 33.9l4.24 4.24M9.86 38.14l4.24-4.24M33.9 14.1l4.24-4.24" /><circle cx="24" cy="24" r="14" strokeDasharray="4 4" opacity=".4" /></svg>,
  <svg key="proj" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xvi-service-icon-svg" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="4" /><path d="M6 18h36" /><path d="M16 26h8M16 32h12" /><circle cx="36" cy="32" r="3" /></svg>,
  <svg key="it" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xvi-service-icon-svg" aria-hidden="true"><rect x="8" y="6" width="32" height="22" rx="3" /><path d="M18 34h12" /><path d="M24 28v6" /><path d="M14 38h20" /><path d="M16 14h4M28 14h4" opacity=".5" /></svg>,
  <svg key="mgt" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xvi-service-icon-svg" aria-hidden="true"><path d="M8 38V14a2 2 0 012-2h28a2 2 0 012 2v24" /><path d="M8 38h32" /><path d="M14 20h20M14 26h14M14 32h8" /><circle cx="36" cy="18" r="4" /></svg>,
]

const serviceAccents = ['rgba(201,169,110,0.18)', 'rgba(11,27,51,0.15)', 'rgba(94,74,194,0.15)', 'rgba(201,169,110,0.12)']

/* Industry icons */
const industryIcons: ReactNode[] = [
  <svg key="gov" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><path d="M20 4L4 14v4h32v-4L20 4z" /><path d="M8 18v14M14 18v14M20 18v14M26 18v14M32 18v14" /><path d="M4 36h32" /></svg>,
  <svg key="fin" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><circle cx="20" cy="20" r="14" /><path d="M20 10v20M14 16h12M14 24h12" /><path d="M12 20h16" /></svg>,
  <svg key="health" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><path d="M20 8v24M8 20h24" /><circle cx="20" cy="20" r="14" /></svg>,
  <svg key="edu" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><path d="M6 16l14-8 14 8-14 8-14-8z" /><path d="M6 24l14 8 14-8" /><path d="M34 16v10" /></svg>,
  <svg key="mfg" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><rect x="6" y="14" width="28" height="18" rx="2" /><path d="M14 14V8h12v6" /><path d="M14 20h4v4h-4zM22 20h4v4h-4z" /></svg>,
  <svg key="real" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="xvi-industry-icon" aria-hidden="true"><path d="M6 36V18l14-10 14 10v18" /><path d="M16 36V26h8v10" /><path d="M6 36h28" /></svg>,
]

type RoomProps = { onNavigate?: (roomId: string) => void }
type RoomShellProps = RoomProps & { id: string; index: string; eyebrow: string; title: ReactNode; description: string; children: ReactNode; nextRoom?: string; nextLabel?: string; tone?: 'warm' | 'paper' | 'ink' }
const ease = [0.16, 1, 0.3, 1] as const

function RoomShell({ id, index, eyebrow, title, description, children, nextRoom, nextLabel, onNavigate, tone = 'warm' }: RoomShellProps) {
  const reduced = useReducedMotion()
  const roomRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: roomRef, offset: ['start end', 'end start'] })
  const lightY = useTransform(scrollYProgress, [0, 1], [-55, 62])
  const titleId = `${id}-title`
  return <motion.section id={id} data-room ref={roomRef} className={`room-section room-section--${id}`} aria-labelledby={titleId} initial={reduced ? false : { opacity: 0, y: 34, clipPath: 'inset(0 0 8% 0)' }} whileInView={reduced ? undefined : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .12 }} transition={{ duration: 1, ease }}><Container className="room-shell"><div className={clsx('room-surface room-surface--atelier xvi-room-rebuild rounded-[40px] p-6 sm:p-9 lg:p-12', tone === 'paper' && 'room-surface--paper', tone === 'ink' && 'room-surface--ink')}><motion.div className="xvi-room-light" aria-hidden="true" style={reduced ? undefined : { y: lightY }} /><div className="xvi-room-number" aria-hidden="true">{index}</div><div className="relative"><div className="xvi-room-heading"><SectionHeader eyebrow={eyebrow} title={title} description={description} titleId={titleId} />{nextRoom && nextLabel ? <button type="button" onClick={() => onNavigate?.(nextRoom)} className="xvi-next-room"><span>CONTINUE</span> إلى {nextLabel} <b>←</b></button> : null}</div><div className="mt-10 lg:mt-14">{children}</div>{nextRoom && nextLabel ? <div className="mt-8 lg:hidden"><Button onClick={() => onNavigate?.(nextRoom)}>إلى {nextLabel} <span>←</span></Button></div> : null}</div></div></Container></motion.section>
}

/* ═══════════════════════════════════════════════════════════════
   EDITORIAL ROOM — Premium Services (Visual Hierarchy)
   ═══════════════════════════════════════════════════════════════ */
export function EditorialRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="advisory-suite" index="02" eyebrow="ADVISORY SUITES" title={<>أربعة أجنحة.<br />منظور واحد للقرار.</>} description="تتحرك ممارساتنا معًا كمسار واحد: من الإشارة الأولى إلى قدرة تعمل داخل المؤسسة." nextRoom="story-panels" nextLabel="المشهد التنفيذي" onNavigate={onNavigate}><div className="xvi-services-premium"><div className="xvi-services-premium-header"><div className="xvi-services-premium-label"><span>THE<br />SIXTEEN<br />METHOD</span></div><p className="xvi-services-premium-intro">لا نضيف طبقات. نعيد توزيع الضوء على ما يهم.</p></div><div className="xvi-services-editorial">{services.map((service, index) => <PremiumServiceCard key={service.number} number={service.number} title={service.title} description={service.description} tags={service.tags} icon={serviceIcons[index]} accent={serviceAccents[index]} index={index} variant={index === 0 ? 'featured' : 'standard'} />)}</div></div></RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT — Premium Editorial Storytelling
   ═══════════════════════════════════════════════════════════════ */

export function StorytellingPanelsRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="story-panels" index="03" eyebrow="EXECUTIVE VIEW" title={<>حين تتضح الصورة،<br />يتحرك القرار.</>} description="من الإشارات المتفرقة إلى منظور قيادة يمكن العمل به — من دون ضجيج أو حلول جاهزة." nextRoom="executive-timeline" nextLabel="رحلة التحول" onNavigate={onNavigate} tone="paper">
    <div className="xvi-about-premium">
      {/* Editorial manifesto — large left column */}
      <div className="xvi-about-grid">
        <div className="xvi-about-left">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .9, ease }} className="xvi-about-manifesto">
            <span className="xvi-about-manifesto-label">EDITORIAL<br />NOTE / 03</span>
            <h3 className="xvi-about-manifesto-title">نحوّل التعقيد إلى<br /><em>سياق يتكلم.</em></h3>
            <div className="xvi-about-manifesto-rule" />
            <p className="xvi-about-manifesto-desc">لا نقدم تقارير. نقدّم قرارات. كل مشروع يبدأ من سؤال واحد: ما الذي سيتغير فعليًا بعد هذا العمل؟</p>
          </motion.div>
          {/* Floating decorative elements */}
          <div className="xvi-about-orb xvi-about-orb--1" aria-hidden="true" />
          <div className="xvi-about-orb xvi-about-orb--2" aria-hidden="true" />
        </div>

        {/* Story cards — right column */}
        <div className="xvi-about-stories">
          {storyPanels.map((panel, index) => (
            <motion.article key={panel.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: index * .1, ease }} className="xvi-about-story">
              <div className="xvi-about-story-glow" aria-hidden="true" />
              <div className="xvi-glass-card xvi-about-story-inner">
                <div className="xvi-about-story-header">
                  <span className="xvi-about-story-num">0{index + 1}</span>
                  <span className="xvi-about-story-eyebrow">{panel.eyebrow}</span>
                </div>
                <h3 className="xvi-about-story-title">{panel.title}</h3>
                <p className="xvi-about-story-body">{panel.body}</p>
                <div className="xvi-about-story-outcome">
                  <span className="xvi-about-story-outcome-label">النتيجة</span>
                  <strong>{panel.outcome.replace('النتيجة: ', '')}</strong>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Glass statistics — full width */}
      <div className="xvi-about-stats">
        {aboutPillars.map((pillar, index) => (
          <motion.div key={pillar.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: index * .1, ease }} className="xvi-glass-card xvi-about-stat">
            <div className="xvi-about-stat-glow" aria-hidden="true" />
            <div className="xvi-about-stat-num">0{index + 1}</div>
            <h4 className="xvi-about-stat-label">{pillar.label}</h4>
            <p className="xvi-about-stat-text">{pillar.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS — Premium Executive Timeline
   ═══════════════════════════════════════════════════════════════ */
export function ExecutiveTimelineRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="executive-timeline" index="04" eyebrow="TRANSFORMATION PIPELINE" title={<>التحول ليس قفزة.<br />إنه إيقاع مضبوط.</>} description="مسار تنفيذي واضح يربط ما نكتشفه بما نطلقه، ثم بما يستمر في العمل." nextRoom="magazine-layout" nextLabel="الملف التحريري" onNavigate={onNavigate}>
    <div className="xvi-timeline-premium">
      <div className="xvi-timeline-track" aria-hidden="true" />
      <div className="xvi-timeline-track-glow" aria-hidden="true" />
      <div className="xvi-timeline-steps">
        {processSteps.map((step, index) => (
          <motion.div key={step.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65, delay: index * .1, ease }} className="xvi-timeline-step">
            <div className="xvi-timeline-node">
              <div className="xvi-timeline-node-ring" />
              <span>{step.step}</span>
            </div>
            <div className="xvi-timeline-connector" aria-hidden="true" />
            <div className="xvi-timeline-content">
              <span className="xvi-timeline-phase">PHASE / 0{index + 1}</span>
              <h3 className="xvi-timeline-title">{step.title}</h3>
              <p className="xvi-timeline-desc">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   INDUSTRIES — Premium Editorial Showcase
   ═══════════════════════════════════════════════════════════════ */

/* Feature card with cursor-reactive lighting */
function FeatureCard({ industry, index, icon }: { industry: string; index: number; icon: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--fx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--fy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="xvi-feature-card"
    >
      <div className="xvi-feature-card-border" aria-hidden="true" />
      <div className="xvi-feature-card-glow" aria-hidden="true" />
      <div className="xvi-feature-card-sweep" aria-hidden="true" />
      <div className="xvi-feature-card-reflection" aria-hidden="true" />
      <div className="xvi-glass-card xvi-feature-card-inner">
        <div className="xvi-feature-card-header">
          <span className="xvi-feature-card-num">0{index + 1}</span>
          <div className="xvi-feature-card-icon">{icon}</div>
        </div>
        <h3 className="xvi-feature-card-title">{industry}</h3>
        <div className="xvi-feature-card-accent" aria-hidden="true" />
      </div>
    </motion.div>
  )
}

export function MagazineLayoutRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="magazine-layout" index="05" eyebrow="STRATEGIC SECTORS" title={<>عمق القطاع<br />داخل كل سؤال.</>} description="نبدأ من طبيعة المؤسسة والقطاع، لأن القرار الجيد لا يُبنى في فراغ." nextRoom="technology-network" nextLabel="المنظومة التقنية" onNavigate={onNavigate} tone="paper">
    <div className="xvi-features-premium">
      {/* AI-inspired background */}
      <div className="xvi-features-bg" aria-hidden="true">
        <div className="xvi-features-mesh" />
        <div className="xvi-features-glow xvi-features-glow--1" />
        <div className="xvi-features-glow xvi-features-glow--2" />
        <div className="xvi-features-particles">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="xvi-features-particle" style={{
              left: `${12 + (i * 11) % 76}%`,
              top: `${15 + ((i * 13) % 70)}%`,
              animationDelay: `${i * 1.5}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Editorial header */}
      <div className="xvi-features-header">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease }} className="xvi-features-header-left">
          <span className="xvi-features-label">FIELD<br />INTELLIGENCE</span>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .15, ease }} className="xvi-features-intro">
          القرار الجيد لا يبدأ من الحل.<br />يبدأ من <em>مكانه.</em>
        </motion.p>
      </div>

      {/* Feature cards grid — editorial layout */}
      <div className="xvi-features-grid">
        {industries.map((industry, index) => (
          <FeatureCard key={industry} industry={industry} index={index} icon={industryIcons[index]} />
        ))}
      </div>

      {/* Editorial columns — magazine quality */}
      <div className="xvi-features-columns">
        {magazineColumns.map((column, index) => (
          <motion.article
            key={column.eyebrow}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .65, delay: index * .1, ease }}
            className="xvi-features-column"
          >
            <div className="xvi-features-column-num">0{index + 1}</div>
            <span className="xvi-features-column-eyebrow">{column.eyebrow}</span>
            <h3 className="xvi-features-column-title">{column.title}</h3>
            <div className="xvi-features-column-rule" />
            <p className="xvi-features-column-text">{column.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   TECHNOLOGY — AI Experience
   ═══════════════════════════════════════════════════════════════ */
export function TechnologyNetworkRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="technology-network" index="06" eyebrow="TECHNOLOGY ORCHESTRATION" title={<>منظومة واحدة،<br />تعمل بهدوء.</>} description="ذكاء اصطناعي وبيانات وأمن وتشغيل؛ طبقات مترابطة تظهر للقيادة كصورة واحدة." nextRoom="luxury-testimonials" nextLabel="أصوات العملاء" onNavigate={onNavigate}>
    <div className="xvi-tech-premium">
      <div className="xvi-tech-premium-visual">
        {/* Animated network background */}
        <div className="xvi-tech-network-bg" aria-hidden="true">
          <div className="xvi-tech-network-line xvi-tech-network-line--1" />
          <div className="xvi-tech-network-line xvi-tech-network-line--2" />
          <div className="xvi-tech-network-line xvi-tech-network-line--3" />
          <div className="xvi-tech-network-line xvi-tech-network-line--4" />
        </div>
        <div className="xvi-tech-mesh-glow" aria-hidden="true" />
        <div className="xvi-tech-axis xvi-tech-axis--one" />
        <div className="xvi-tech-axis xvi-tech-axis--two" />
        <div className="xvi-tech-core">
          <span>XVI</span>
          <small>CONNECTED<br />SYSTEM</small>
        </div>
        {networkNodes.map((node, index) => (
          <motion.div key={node.label} initial={{ opacity: 0, scale: .6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .12, duration: .6, ease }} className={clsx('xvi-tech-node', node.accent === 'bronze' && 'is-bronze', node.accent === 'navy' && 'is-paper')} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
            <i /><span>{node.label}</span>
          </motion.div>
        ))}
        <div className="xvi-tech-status">SYSTEM / LIVE <b /></div>
      </div>
      <div className="xvi-tech-premium-info">
        <span className="xvi-tech-premium-label">ENTERPRISE ECOSYSTEM</span>
        <h3 className="xvi-tech-premium-title">كل طبقة<br />في موضعها الصحيح.</h3>
        <p className="xvi-tech-premium-desc">نختار البنية التي تخدم العمل، ثم نصلها بطريقة تجعل التشغيل أكثر وضوحًا وأمانًا.</p>
        <div className="xvi-tech-premium-stack">
          {technologies.map(tech => <b key={tech}>{tech}</b>)}
        </div>
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — Premium Trust Experience
   ═══════════════════════════════════════════════════════════════ */

const customerMeta = [
  { country: 'الإمارات', verified: true, company: 'شركة تقنية رائدة' },
  { country: 'السعودية', verified: true, company: 'مجموعة استشارية' },
  { country: 'الكويت', verified: true, company: 'جهة حكومية' },
]

export function LuxuryTestimonialsRoom({ onNavigate }: RoomProps) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setActive((c) => (c + 1) % testimonials.length), 7000)
    return () => clearInterval(timer)
  }, [reduced])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setActive((c) => (c + 1) % testimonials.length)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setActive((c) => (c - 1 + testimonials.length) % testimonials.length)
    }
  }, [testimonials.length])

  const handleDotKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let nextIndex = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (index + 1) % testimonials.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (index - 1 + testimonials.length) % testimonials.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = testimonials.length - 1
    }
    if (nextIndex !== index) {
      setActive(nextIndex)
      const dots = dotsRef.current?.querySelectorAll<HTMLElement>('.xvi-testimonials-dot')
      dots?.[nextIndex]?.focus()
    }
  }, [testimonials.length])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--tgx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--tgy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return <RoomShell id="luxury-testimonials" index="07" eyebrow="VOICE OF PARTNERSHIP" title={<>أصوات تقيس<br />الفرق في التفاصيل.</>} description="ما يبقى بعد العمل ليس العرض؛ بل الوضوح والثقة والقدرة على التحرك." nextRoom="premium-cta" nextLabel="غرفة القرار" onNavigate={onNavigate} tone="paper">
    <div className="xvi-testimonials-premium">
      {/* AI-inspired background */}
      <div className="xvi-testimonials-bg" aria-hidden="true">
        <div className="xvi-testimonials-mesh" />
        <div className="xvi-testimonials-glow xvi-testimonials-glow--1" />
        <div className="xvi-testimonials-glow xvi-testimonials-glow--2" />
        <div className="xvi-testimonials-particles">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="xvi-testimonials-particle" style={{
              left: `${15 + (i * 14) % 70}%`,
              top: `${20 + ((i * 11) % 60)}%`,
              animationDelay: `${i * 2}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Editorial header */}
      <div className="xvi-testimonials-header">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease }} className="xvi-testimonials-header-left">
          <span className="xvi-testimonials-label">SELECTED<br />WORDS</span>
          <p className="xvi-testimonials-intro">الثقة ليست وعدًا.<br /><em>إنها أثر.</em></p>
        </motion.div>
        <div className="xvi-testimonials-quote-mark" aria-hidden="true">"</div>
      </div>

      {/* Main testimonial card */}
      <div className="xvi-testimonials-stage">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onKeyDown={handleKeyDown}
          className="xvi-testimonials-main"
          role="tablist"
          aria-label="شهادات العملاء"
        >
          <div className="xvi-testimonials-main-border" aria-hidden="true" />
          <div className="xvi-testimonials-main-glow" aria-hidden="true" />
          <div className="xvi-testimonials-main-sweep" aria-hidden="true" />
          <div className="xvi-testimonials-main-reflection" aria-hidden="true" />

          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={false}
              animate={{
                opacity: active === index ? 1 : 0,
                y: active === index ? 0 : 16,
                scale: active === index ? 1 : .98,
                pointerEvents: active === index ? 'auto' : 'none',
              }}
              transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
              className="xvi-testimonial-slide"
              role="tabpanel"
              aria-label={`شهادة ${index + 1} من ${testimonials.length}`}
              id={`testimonial-panel-${index}`}
              hidden={active !== index}
            >
              <div className="xvi-glass-card xvi-testimonial-slide-inner">
                <div className="xvi-testimonial-big-quote" aria-hidden="true">"</div>
                <blockquote className="xvi-testimonial-quote">{t.quote}</blockquote>
                <div className="xvi-testimonial-identity">
                  <div className="xvi-testimonial-avatar">
                    <span>{t.name.charAt(0)}</span>
                    {customerMeta[index]?.verified && (
                      <div className="xvi-testimonial-verified" aria-label="Verified">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="var(--color-xvi-bronze)" /><path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="xvi-testimonial-info">
                    <b className="xvi-testimonial-name">{t.name}</b>
                    <small className="xvi-testimonial-role">{t.role}</small>
                    <div className="xvi-testimonial-meta">
                      <span className="xvi-testimonial-company">{customerMeta[index]?.company}</span>
                      <span className="xvi-testimonial-country">{customerMeta[index]?.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side stats */}
        <div className="xvi-testimonials-stats">
          <div className="xvi-testimonials-stat">
            <span className="xvi-testimonials-stat-num">100%</span>
            <span className="xvi-testimonials-stat-label">معدل رضا العملاء</span>
          </div>
          <div className="xvi-testimonials-stat">
            <span className="xvi-testimonials-stat-num">+40%</span>
            <span className="xvi-testimonials-stat-label">تحسن الأداء</span>
          </div>
          <div className="xvi-testimonials-stat">
            <span className="xvi-testimonials-stat-num">24/7</span>
            <span className="xvi-testimonials-stat-label">دعم مستمر</span>
          </div>
        </div>
      </div>

      {/* Navigation with progress */}
      <div className="xvi-testimonials-nav" role="group" aria-label="التنقل بين الشهادات">
        <div className="xvi-testimonials-dots" ref={dotsRef} role="tablist" aria-label="قائمة الشهادات">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              onKeyDown={(e) => handleDotKeyDown(e, index)}
              className={clsx('xvi-testimonials-dot', active === index && 'xvi-testimonials-dot--active')}
              role="tab"
              aria-selected={active === index}
              aria-controls={`testimonial-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
            >
              <span className="sr-only">شهادة {index + 1}</span>
              {active === index && <motion.div className="xvi-testimonials-dot-progress" layoutId="testimonial-progress" transition={{ duration: .7, ease: [.16, 1, .3, 1] }} />}
            </button>
          ))}
        </div>
        <div className="xvi-testimonials-counter">
          <span className="xvi-testimonials-counter-current">0{active + 1}</span>
          <span className="xvi-testimonials-counter-sep">/</span>
          <span className="xvi-testimonials-counter-total">0{testimonials.length}</span>
        </div>
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   CTA — Cinematic Emotional Climax
   ═══════════════════════════════════════════════════════════════ */
export function PremiumCTARoom({ onNavigate }: RoomProps) {
  return <RoomShell id="premium-cta" index="08" eyebrow="THE DECISION ROOM" title={<>القرار التالي<br />يستحق مساحة أفضل.</>} description="ابدأ حوارًا هادئًا مع الفريق الذي يجمع الاستراتيجية والتقنية والتنفيذ في غرفة واحدة." onNavigate={onNavigate} tone="ink">
    <div className="xvi-cta-cinematic">
      {/* Cinematic background layers */}
      <div className="xvi-cta-bg" aria-hidden="true">
        <div className="xvi-cta-mesh" />
        <div className="xvi-cta-grid" />
        <div className="xvi-cta-glow xvi-cta-glow--1" />
        <div className="xvi-cta-glow xvi-cta-glow--2" />
        <div className="xvi-cta-glow xvi-cta-glow--3" />
        <div className="xvi-cta-waves" />
        <div className="xvi-cta-particles">
          {[...Array(24)].map((_, i) => (
            <span key={i} className="xvi-cta-particle" style={{
              '--cp': `${6 + (i * 3.8) % 88}%`,
              '--cy': `${6 + ((i * 5.2) % 88)}%`,
              '--cd': `${14 + (i % 5) * 3}s`,
              '--csize': `${1 + (i % 4) * .7}px`,
              '--cdelay': `${(i * .4) % 8}s`,
            } as React.CSSProperties} />
          ))}
        </div>
      </div>

      {/* Floating monogram */}
      <div className="xvi-cta-monogram" aria-hidden="true">XVI</div>

      {/* Floating accent shapes */}
      <div className="xvi-cta-shape xvi-cta-shape--1" aria-hidden="true" />
      <div className="xvi-cta-shape xvi-cta-shape--2" aria-hidden="true" />
      <div className="xvi-cta-shape xvi-cta-shape--3" aria-hidden="true" />

      {/* Content */}
      <div className="xvi-cta-content">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
          className="xvi-cta-label"
        >
          THE NEXT CONVERSATION / AL AIN
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8, delay: .1, ease: [.16, 1, .3, 1] }}
          className="xvi-cta-headline"
        >
          حين تصبح الصورة واضحة،<br /><em>يصبح التحرك طبيعيًا.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .2, ease: [.16, 1, .3, 1] }}
          className="xvi-cta-sub"
        >
          ابدأ حوارًا هادئًا مع الفريق الذي يجمع الاستراتيجية والتقنية والتنفيذ في غرفة واحدة.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .3, ease: [.16, 1, .3, 1] }}
          className="xvi-cta-actions"
        >
          <Link to="/contact" className="xvi-cta-btn xvi-cta-btn--primary">
            <span className="xvi-cta-btn-shine" aria-hidden="true" />
            <span className="xvi-cta-btn-glow" aria-hidden="true" />
            <span>رتّب اجتماعًا استكشافيًا</span>
            <span aria-hidden="true">←</span>
          </Link>
          <button type="button" onClick={() => onNavigate?.('arrival')} className="xvi-cta-btn xvi-cta-btn--secondary">
            <span>العودة إلى البداية ↑</span>
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .5, ease: [.16, 1, .3, 1] }}
          className="xvi-cta-trust"
        >
          <span className="xvi-cta-trust-item">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" /><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            بدون التزام
          </span>
          <span className="xvi-cta-trust-sep">·</span>
          <span className="xvi-cta-trust-item">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" /><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            استشارة مجانية
          </span>
          <span className="xvi-cta-trust-sep">·</span>
          <span className="xvi-cta-trust-item">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" /><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            رد خلال 24 ساعة
          </span>
        </motion.div>
      </div>

      {/* Bottom stamp */}
      <div className="xvi-cta-stamp">
        <div className="xvi-cta-stamp-line" />
        <span>STRATEGY · TECHNOLOGY · DELIVERY</span>
      </div>
    </div>
  </RoomShell>
}

/* ═══════════════════════════════════════════════════════════════
   PRICING — Premium Enterprise Plans
   ═══════════════════════════════════════════════════════════════ */

const pricingPlans = [
  {
    name: 'الاستشارة الاستراتيجية',
    nameEn: 'STRATEGIC ADVISORY',
    price: 'متغيرة',
    priceNote: 'حسب نطاق المشروع',
    description: 'استشارة تنفيذية مخصصة للمؤسسات التي تبدأ رحلة التحول الرقمي والذكاء الاصطناعي.',
    features: [
      'تحليل الأداء الحالي',
      'خارطة طريق الاستراتيجية',
      'تحديد الفرص الرقمية',
      'تقرير تنفيذي مخصص',
      'جلسة مراجعة مع القيادة',
    ],
    cta: 'ابدأ الاستشارة',
    highlighted: false,
  },
  {
    name: 'التحول الرقمي',
    nameEn: 'DIGITAL TRANSFORMATION',
    price: 'مخصص',
    priceNote: 'مشروع كامل',
    description: 'تنفيذ متكامل يربط الاستراتيجية بالتقنية والتشغيل في مؤسستك.',
    features: [
      'تصميم المعمارية الرقمية',
      'تطوير الحلول التقنية',
      'إدارة المشاريع التنفيذية',
      'تدريب الفرق التشغيلية',
      'دعم تشغيلي مستمر',
      'قياس الأثر والتحسين',
    ],
    cta: 'احصل على عرض سعر',
    highlighted: true,
  },
  {
    name: 'شراكة طويلة الأمد',
    nameEn: 'LONG-TERM PARTNERSHIP',
    price: 'تفاوضي',
    priceNote: 'شراكة سنوية',
    description: 'شراكة استراتيجية مستمرة لـ XVI Group كامتداد لفريق القيادة لديك.',
    features: [
      'فريق استشاري مخصص',
      'دعم تقني على مدار الساعة',
      'تحسين مستمر للأداء',
      'تقارير أثر شهرية',
      '优先ية في الموارد',
    ],
    cta: 'ناقش الشراكة',
    highlighted: false,
  },
]

const checkIcon = (
  <svg viewBox="0 0 20 20" fill="none" className="xvi-pricing-check-icon" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" opacity=".15" />
    <path d="M6 10.5l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function PricingRoom({ onNavigate }: RoomProps) {
  return <RoomShell id="pricing" index="09" eyebrow="INVESTMENT" title={<>استثمار يتناسب<br />مع طموحك.</>} description="نقدم حلولًا استشارية بمستوى تنفيذي، مع بنية أسعار تعكس القيمة الفعلية التي نقدمها." onNavigate={onNavigate}>
    <div className="xvi-pricing-premium">
      {/* AI-inspired background */}
      <div className="xvi-pricing-bg" aria-hidden="true">
        <div className="xvi-pricing-glow xvi-pricing-glow--1" />
        <div className="xvi-pricing-glow xvi-pricing-glow--2" />
      </div>

      {/* Pricing cards */}
      <div className="xvi-pricing-grid">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={clsx('xvi-pricing-card', plan.highlighted && 'xvi-pricing-card--highlighted')}
          >
            <div className="xvi-pricing-card-border" aria-hidden="true" />
            <div className="xvi-pricing-card-glow" aria-hidden="true" />
            <div className="xvi-pricing-card-sweep" aria-hidden="true" />
            <div className="xvi-pricing-card-reflection" aria-hidden="true" />

            {plan.highlighted && <div className="xvi-pricing-card-badge">المسار الموصى به</div>}

            <div className="xvi-glass-card xvi-pricing-card-inner">
              <div className="xvi-pricing-card-header">
                <span className="xvi-pricing-card-eyebrow">{plan.nameEn}</span>
                <h3 className="xvi-pricing-card-name">{plan.name}</h3>
                <p className="xvi-pricing-card-desc">{plan.description}</p>
              </div>

              <div className="xvi-pricing-card-price">
                <span className="xvi-pricing-card-amount">{plan.price}</span>
                <span className="xvi-pricing-card-note">{plan.priceNote}</span>
              </div>

              <div className="xvi-pricing-card-features">
                {plan.features.map((feature) => (
                  <div key={feature} className="xvi-pricing-feature">
                    {checkIcon}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className={clsx('xvi-pricing-card-cta', plan.highlighted && 'xvi-pricing-card-cta--primary')}>
                <span className="xvi-pricing-cta-shine" aria-hidden="true" />
                <span>{plan.cta}</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </RoomShell>
}

export const HomeSections = memo(function HomeSections({ onNavigate }: RoomProps) { return <><EditorialRoom onNavigate={onNavigate} /><StorytellingPanelsRoom onNavigate={onNavigate} /><ExecutiveTimelineRoom onNavigate={onNavigate} /><MagazineLayoutRoom onNavigate={onNavigate} /><TechnologyNetworkRoom onNavigate={onNavigate} /><LuxuryTestimonialsRoom onNavigate={onNavigate} /><PremiumCTARoom onNavigate={onNavigate} /></> })
