// XVI GROUP — Main Application
// Enterprise foundation and design engine

import { useState, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './branding/ThemeProvider';
import { LanguageProvider } from './hooks/LanguageProvider';
import { MotionProvider } from './motion/providers/MotionProvider';
import { Navigation } from './components/navigation/Navigation';
import { Footer } from './components/footer/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { PageTransition } from './components/ui/PageTransition';
import { CustomCursor } from './motion/CustomCursor';
import { LuxuryLoader } from './components/ui/LuxuryLoader';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { AIDock } from './components/assistant/AIDock';
import { Home } from './pages/home';
import { ServicesPage } from './pages/services';
import { AboutPage } from './pages/about';
import { TechnologyPage } from './pages/technology';
import { IndustriesPage } from './pages/industries';
import { InsightsPage } from './pages/insights';
import { ContactPage } from './pages/contact';
import { BusinessConsultingPage } from './pages/services/business-consulting/BusinessConsultingPage';
import { TechnologyConsultingPage } from './pages/services/technology-consulting/TechnologyConsultingPage';
import { AITransformationPage } from './pages/services/ai-transformation/AITransformationPage';
import { ExecutiveTrainingPage } from './pages/services/executive-training/ExecutiveTrainingPage';

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [pending, setPending] = useState(true);
  const introSeenRef = useRef(sessionStorage.getItem('xviIntroDone') === 'true');

  const handleFinish = useCallback(() => {
    sessionStorage.setItem('xviIntroDone', 'true');
    setPending(false);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ThemeProvider>
        <LanguageProvider>
          <MotionProvider>
            <div className="xvi-app">
              {pending && (introSeenRef.current
                ? <LuxuryLoader onFinish={handleFinish} />
                : <CinematicIntro onFinish={handleFinish} />
              )}
              <CustomCursor />
              <ScrollProgress />
              <PageTransition>
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
                  <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />
                  <Route path="*" element={<PageShell><Home /></PageShell>} />
                </Routes>
              </PageTransition>
              <AIDock />
            </div>
          </MotionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
