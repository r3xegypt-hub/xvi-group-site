// XVI GROUP — Main Application
// Enterprise foundation and design engine

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
import { AIExecutiveConsultant } from './components/assistant/AIExecutiveConsultant';
import { Home } from './pages/home';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ThemeProvider>
        <LanguageProvider>
          <MotionProvider>
            <div className="xvi-app">
              <LuxuryLoader />
              <CustomCursor />
              <ScrollProgress />
              <PageTransition>
                <Routes>
                  <Route
                    path="*"
                    element={
                      <>
                        <Navigation />
                        <main id="main-content">
                          <Home />
                        </main>
                        <Footer />
                        <AIExecutiveConsultant />
                      </>
                    }
                  />
                </Routes>
              </PageTransition>
            </div>
          </MotionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
