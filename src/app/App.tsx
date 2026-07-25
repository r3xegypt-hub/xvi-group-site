import '../styles/App.css'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react'
import { ExecutiveNavigation } from '../components/executive/ExecutiveNavigation'
import { ExecutiveHero } from '../components/executive/ExecutiveHero'
import { SiteFooter } from '../components/layout/SiteFooter'
import { ViewportExperience } from '../components/executive/ViewportExperience'
import { navigationRooms } from '../data/siteContent'

type IntroProps = { onFinish: () => void }
type SectionsModule = typeof import('../sections/SiteSections')

const loadIntro = () => import('../components/cinematic/CinematicIntro')
const loadSections = () => import('../sections/SiteSections')

function App() {
  const reducedMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.sessionStorage.getItem('xvi-intro-seen') !== '1'
  })
  const [activeRoom, setActiveRoom] = useState(navigationRooms[0].id)

  const [IntroComp, setIntroComp] = useState<ComponentType<IntroProps> | null>(null)
  const [sectionsModule, setSectionsModule] = useState<SectionsModule | null>(null)

  const finishIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('xvi-intro-seen', '1')
    }
    setShowIntro(false)
  }, [])

  useEffect(() => {
    if (!showIntro && typeof window !== 'undefined') {
      window.sessionStorage.setItem('xvi-intro-seen', '1')
    }
  }, [showIntro])

  useEffect(() => {
    if (reducedMotion && showIntro) {
      finishIntro()
    }
  }, [finishIntro, reducedMotion, showIntro])

  // Load the cinematic overlay only when it can be shown.
  useEffect(() => {
    if (!showIntro) return

    let mounted = true
    loadIntro().then((mod) => {
      if (mounted) setIntroComp(() => mod.CinematicIntro)
    })
    return () => {
      mounted = false
    }
  }, [showIntro])

  // Keep below-the-fold homepage rooms out of the initial application chunk.
  useEffect(() => {
    let mounted = true
    loadSections().then((mod) => {
      if (mounted) setSectionsModule(mod)
    })
    return () => {
      mounted = false
    }
  }, [])

  const scrollToRoom = useCallback(
    (roomId: string) => {
      const section = document.getElementById(roomId)
      if (!section) return

      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      setActiveRoom(roomId)
    },
    [reducedMotion],
  )

  useEffect(() => {
    if (!sectionsModule) return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-room]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveRoom((currentRoom) => (currentRoom === visible.target.id ? currentRoom : visible.target.id))
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-12% 0px -12% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [sectionsModule])

  const activeRoomMeta = useMemo(
    () => navigationRooms.find((room) => room.id === activeRoom) ?? navigationRooms[0],
    [activeRoom],
  )
  const roomProgress = navigationRooms.findIndex((room) => room.id === activeRoom) + 1

  return (
    <MotionConfig reducedMotion="user">
      <>
        <AnimatePresence>
          {showIntro && IntroComp ? <IntroComp onFinish={finishIntro} /> : null}
        </AnimatePresence>

        <a
          className="sr-only rounded-full bg-white px-4 py-2 shadow focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50"
          href="#main"
        >
          تخطي إلى المحتوى
        </a>

        <div className="sr-only" aria-live="polite">
          الغرفة الحالية: {activeRoomMeta.label}
        </div>

        <div className="min-h-dvh bg-[color:var(--color-xvi-warm)]">
          <ViewportExperience />
          <ExecutiveNavigation />

          <main id="main" className="xvi-room-flow" aria-label="التجربة المعمارية لموقع XVI Group">
            <ExecutiveHero onNavigate={scrollToRoom} />

            {sectionsModule ? (
              <sectionsModule.HomeSections onNavigate={scrollToRoom} />
            ) : (
              // lightweight placeholder while sections load
              <div role="status" aria-live="polite" className="mx-auto max-w-[1280px] px-6 py-10 text-center text-sm text-[color:var(--color-xvi-ink-soft)]">
                جارٍ التحميل...
              </div>
            )}
          </main>

          <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden lg:block" aria-hidden="true">
            <div className="rounded-[24px] border border-[color:var(--color-xvi-line)] bg-white/72 px-5 py-3 shadow-[0_20px_50px_rgba(11,15,20,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 text-[11px] tracking-[0.24em] text-[color:var(--color-xvi-ink-soft)]">
                <span>CURRENT ROOM</span>
                <span>
                  {roomProgress}/{navigationRooms.length}
                </span>
              </div>
              <div className="mt-2 text-sm font-[600] text-[color:var(--color-xvi-ink)]">{activeRoomMeta.label}</div>
              <div className="mt-3 h-1.5 w-32 overflow-hidden rounded-full bg-[color:var(--color-xvi-grey-2)]">
                <div
                  className="h-full rounded-full bg-[color:var(--color-xvi-bronze)] transition-[width] duration-500"
                  style={{ width: `${(roomProgress / navigationRooms.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <SiteFooter />
        </div>
      </>
    </MotionConfig>
  )
}

export default App
