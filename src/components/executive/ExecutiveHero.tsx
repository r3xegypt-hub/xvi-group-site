import { memo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroSignals } from '../../data/siteContent'
import { Container } from '../common/Container'
import { MagneticButton } from '../ux/MagneticButton'
import { HeroParticles } from './HeroParticles'
import { IntelligenceSphere } from '../three/IntelligenceSphere'
import { NeuralNetworkBackground } from '../three/NeuralNetworkBackground'
import { LightBeams } from '../ux/LightBeams'
import { NoiseGrainLayer, VignetteLayer } from '../ux/AmbientLayers'

type ExecutiveHeroProps = { onNavigate: (roomId: string) => void }

const ease = [0.16, 1, 0.3, 1] as const

function IntensitySphereWrapper() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[92%] h-[92%]">
        <IntelligenceSphere intensity={1.15} />
      </div>
    </div>
  )
}

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
          {/* Executive corner brackets — ornamental frame */}
          <span className="hero-corner hero-corner--tl" aria-hidden="true" />
          <span className="hero-corner hero-corner--tr" aria-hidden="true" />
          <span className="hero-corner hero-corner--bl" aria-hidden="true" />
          <span className="hero-corner hero-corner--br" aria-hidden="true" />

          {/* Soft ambient glow orb */}
          <div className="xvi-hero-orb xvi-hero-orb--glow" aria-hidden="true" />

          {/* Neural network premium background + light beams + grain */}
          <NeuralNetworkBackground className="xvi-hero-neural" color="#B88E2F" secondaryColor="#0B1B33" nodeCount={110} />
          <LightBeams count={7} color="#C9A96E" className="xvi-hero-beams" />
          <NoiseGrainLayer opacity={0.075} className="xvi-hero-grain" />
          <VignetteLayer intensity={0.55} className="xvi-hero-vignette" />

          {/* Animated grid overlay */}
          <div className="xvi-hero-grid-overlay" aria-hidden="true" />

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
                    hidden: { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
                    visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
                  }}
                  transition={{ duration: 1.2, ease }}
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
                <div className="xvi-hero-ctas flex flex-wrap gap-3">
                  <MagneticButton variant="primary" size="lg" onClick={() => onNavigate('advisory-suite')} className="xvi-premium-cta" iconRight={<span aria-hidden="true">←</span>}>
                    استكشف الممارسات
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" onClick={() => onNavigate('premium-cta')} className="xvi-premium-cta">
                    ابدأ حوارًا
                  </MagneticButton>
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
                <div className="relative w-full h-full flex items-center justify-center px-5 py-6">
                  <div className="absolute inset-[10%] rounded-[24px] bg-gradient-to-br from-[rgba(11,27,51,0.55)] via-[rgba(11,27,51,0.82)] to-[rgba(184,142,47,0.22)] border border-[rgba(184,142,47,0.18)] backdrop-blur-md overflow-hidden shadow-[inset_0_0_60px_rgba(11,27,51,0.6)]">
                    <IntensitySphereWrapper />
                  </div>
                  <div className="relative z-[2] flex flex-col items-center gap-1 pointer-events-none select-none">
                    <span className="font-[700] tracking-[-0.02em] text-[1.1rem] text-[color:var(--color-xvi-warm)] drop-shadow-[0_0_12px_rgba(201,169,110,0.45)]">XVI</span>
                    <small className="text-[9px] tracking-[0.32em] text-[color:var(--color-xvi-bright-gold)] font-[700] leading-[1.6] text-center opacity-90">CLARITY<br />IN MOTION</small>
                  </div>
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
