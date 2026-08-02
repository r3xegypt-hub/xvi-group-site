import { useState, useCallback, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './branding/ThemeProvider';
import { LanguageProvider } from './hooks/LanguageProvider';
import { JourneyProvider } from './hooks/journeyContext';
import { MotionProvider } from './motion/providers/MotionProvider';
import { SoundProvider } from './motion/providers/SoundProvider';
import { Navigation } from './components/navigation/Navigation';
import { Footer } from './components/footer/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { PageTransition } from './components/ui/PageTransition';
import { SeoHead } from './seo/SeoHead';
import { CustomCursor } from './motion/CustomCursor';
import { MouseGlow } from './motion/MouseGlow';
import { ExecutiveBackground } from './components/scene/ExecutiveBackground';
import { LuxuryLoader } from './components/ui/LuxuryLoader';
import { CinematicExecutiveLaunch } from './components/ui/CinematicExecutiveLaunch';
import { AIDock } from './components/assistant/AIDock';
import { ExecutiveConcierge } from './components/assistant/ExecutiveConcierge';

const Home = lazy(() => import('./pages/home').then((m) => ({ default: m.Home })));
const ServicesPage = lazy(() => import('./pages/services').then((m) => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./pages/about').then((m) => ({ default: m.AboutPage })));
const TechnologyPage = lazy(() => import('./pages/technology').then((m) => ({ default: m.TechnologyPage })));
const IndustriesPage = lazy(() => import('./pages/industries').then((m) => ({ default: m.IndustriesPage })));
const InsightsPage = lazy(() => import('./pages/insights').then((m) => ({ default: m.InsightsPage })));
const PortfolioPage = lazy(() => import('./pages/portfolio/Portfolio').then((m) => ({ default: m.PortfolioPage })));
const ContactPage = lazy(() => import('./pages/contact').then((m) => ({ default: m.ContactPage })));
const CareersPage = lazy(() => import('./pages/careers/Careers').then((m) => ({ default: m.CareersPage })));
const PrivacyPage = lazy(() => import('./pages/privacy/Privacy').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/terms/Terms').then((m) => ({ default: m.TermsPage })));
const BusinessConsultingPage = lazy(() => import('./pages/services/business-consulting/BusinessConsultingPage').then((m) => ({ default: m.BusinessConsultingPage })));
const TechnologyConsultingPage = lazy(() => import('./pages/services/technology-consulting/TechnologyConsultingPage').then((m) => ({ default: m.TechnologyConsultingPage })));
const AITransformationPage = lazy(() => import('./pages/services/ai-transformation/AITransformationPage').then((m) => ({ default: m.AITransformationPage })));
const ExecutiveTrainingPage = lazy(() => import('./pages/services/executive-training/ExecutiveTrainingPage').then((m) => ({ default: m.ExecutiveTrainingPage })));

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8a8a85',
        fontFamily: 'Manrope, sans-serif',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontSize: '12px',
      }}
    >
      Loading
    </div>
  );
}

function AppContent({ pending }: { pending: boolean }) {
  const location = useLocation();
  return (
    <>
      <SeoHead />
      <AIDock hideDock={location.pathname === '/'} />
      {!pending && <ExecutiveConcierge />}
    </>
  );
}

function App() {
  const [pending, setPending] = useState(true);
  const introSeenRef = useRef(localStorage.getItem('xviIntroDone') === 'true');

  const handleFinish = useCallback(() => {
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    setPending(false);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ThemeProvider>
        <LanguageProvider>
          <JourneyProvider>
          <MotionProvider>
            <MotionConfig reducedMotion="user">
            <div className="xvi-app">
              <ExecutiveBackground />
              <SoundProvider />
              {pending && (introSeenRef.current
                ? <LuxuryLoader onFinish={handleFinish} />
                : <CinematicExecutiveLaunch onFinish={handleFinish} />
              )}
              <CustomCursor />
              <MouseGlow color="#c8a65a" radius={250} />
              <ScrollProgress />
              <Navigation />
              <PageTransition>
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<PageShell><Home /></PageShell>} />
                    <Route path="/services" element={<PageShell><ServicesPage /></PageShell>} />
                    <Route path="/services/business-consulting" element={<PageShell><BusinessConsultingPage /></PageShell>} />
                    <Route path="/services/technology-consulting" element={<PageShell><TechnologyConsultingPage /></PageShell>} />
                    <Route path="/services/ai-transformation" element={<PageShell><AITransformationPage /></PageShell>} />
                    <Route path="/services/executive-training" element={<PageShell><ExecutiveTrainingPage /></PageShell>} />
                    <Route path="/about" element={<PageShell><AboutPage /></PageShell>} />
                    <Route path="/technology" element={<PageShell><TechnologyPage /></PageShell>} />
                    <Route path="/industries" element={<PageShell><IndustriesPage /></PageShell>} />
                    <Route path="/insights" element={<PageShell><InsightsPage /></PageShell>} />
                    <Route path="/portfolio" element={<PageShell><PortfolioPage /></PageShell>} />
                    <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />
                    <Route path="/careers" element={<PageShell><CareersPage /></PageShell>} />
                    <Route path="/privacy" element={<PageShell><PrivacyPage /></PageShell>} />
                    <Route path="/terms" element={<PageShell><TermsPage /></PageShell>} />
                    <Route path="*" element={<PageShell><Home /></PageShell>} />
                  </Routes>
                </Suspense>
              </PageTransition>
              <AppContent pending={pending} />
            </div>
            </MotionConfig>
          </MotionProvider>
          </JourneyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
