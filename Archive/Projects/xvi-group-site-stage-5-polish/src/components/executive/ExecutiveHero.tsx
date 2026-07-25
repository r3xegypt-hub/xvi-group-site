import { memo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroSignals } from '../../data/siteContent'
import { Container } from '../common/Container'
import { Button } from '../ui/Button'
import { HeroParticles } from './HeroParticles'

type ExecutiveHeroProps = { onNavigate: (roomId: string) => void }

const ease = [0.16, 1, 0.3, 1] as const

export const ExecutiveHero = memo(function ExecutiveHero({ onNavigate }: ExecutiveHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const lensY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const markerY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.12])

  return (
    <section ref={heroRef} id="arrival" data-room className="xvi-flagship-hero room-section room-section--arrival">
      <Container className="relative">
        <div className="xvi-hero-stage">
          {/* Cinematic atmosphere — reduced, focused */}
          <div className="xvi-hero-noise" aria-hidden="true" />
          <div className="xvi-hero-mesh" aria-hidden="true" />
          <div className="xvi-hero-vignette" aria-hidden="true" />

          {/* Animated mesh gradient lighting */}
          <div className="xvi-hero-mesh-light" aria-hidden="true" />
          <div className="xvi-hero-mesh-light xvi-hero-mesh-light--warm" aria-hidden="true" />

          {/* Floating particles */}
          <HeroParticles />

          {/* Premium orbs — reduced to 2 + accent */}
          <motion.div className="xvi-hero-orb xvi-hero-orb--one" style={{ y: lensY, scale: orbScale }} aria-hidden="true" />
          <motion.div className="xvi-hero-orb xvi-hero-orb--two" style={{ y: markerY }} aria-hidden="true" />
          <div className="xvi-hero-orb xvi-hero-orb--accent" aria-hidden="true" />

          {/* Floating monogram — signature element */}
          <motion.div
            className="xvi-hero-monogram"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
          >
            XVI
          </motion.div>

          {/* Top status bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease }}
            className="xvi-hero-topline"
          >
            <span className="xvi-live-mark">
              <i />
              العين · الإمارات العربية المتحدة
            </span>
            <span>01 — EXECUTIVE ARRIVAL</span>
          </motion.div>

          <div className="xvi-hero-layout">
            {/* Left: Dominant headline + CTA */}
            <div className="relative z-10 flex min-h-[520px] flex-col justify-between py-7 lg:min-h-[calc(100dvh-13.5rem)] lg:py-12">
              <motion.div
                style={{ y: headlineY }}
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: .1, delayChildren: .12 } } }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: .75, ease }}
                  className="xvi-kicker"
                >
                  DECISION ARCHITECTURE / XVI GROUP
                </motion.div>
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 38, clipPath: 'inset(0 0 100% 0)' },
                    visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
                  }}
                  transition={{ duration: 1.15, ease }}
                  className="xvi-hero-title"
                >
                  نُعيد تعريف<br />
                  الاستشارات الذكية<br />
                  <em>في ضوء النهار.</em>
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8, delay: .38, ease }}
                className="xvi-hero-bottom"
              >
                <p>
                  نحوّل الاستراتيجية والتقنية والتنفيذ إلى مساحة قرار هادئة — مصممة للمؤسسات التي تتحرك بثقة.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => onNavigate('advisory-suite')} className="px-6 py-3.5">
                    استكشف الممارسات <span aria-hidden="true">←</span>
                  </Button>
                  <Button onClick={() => onNavigate('premium-cta')} variant="secondary" className="px-6 py-3.5">
                    ابدأ حوارًا
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right: Lens Panel — kept but simplified */}
            <motion.aside
              style={{ y: lensY }}
              initial={{ opacity: 0, scale: .94, rotate: -2 }}
              animate={{ opacity: 1, scale: .999, rotate: 0 }}
              transition={{ duration: 1.1, delay: .16, ease }}
              className="xvi-hero-lens"
            >
              <div className="xvi-lens-head">
                <span>THE XVI LENS</span>
                <span>2026 / AL AIN</span>
              </div>
              <div className="xvi-lens-core">
                <div className="xvi-lens-rings" />
                <div className="xvi-lens-rings xvi-lens-rings--inner" />
                <div className="xvi-lens-centre">
                  <span>XVI</span>
                  <small>CLARITY<br />IN MOTION</small>
                </div>
                <span className="xvi-lens-label xvi-lens-label--a">STRATEGY</span>
                <span className="xvi-lens-label xvi-lens-label--b">SYSTEMS</span>
                <span className="xvi-lens-label xvi-lens-label--c">DELIVERY</span>
              </div>
              <div className="xvi-lens-signals">
                {heroSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .55 + index * .09, duration: .5, ease }}
                  >
                    <strong>{signal.value}</strong>
                    <span>{signal.label}</span>
                  </motion.div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('technology-network')}
                className="xvi-lens-foot"
              >
                LIVE ENTERPRISE MAP <span>↙</span>
              </button>
            </motion.aside>
          </div>
        </div>
      </Container>
    </section>
  )
})
