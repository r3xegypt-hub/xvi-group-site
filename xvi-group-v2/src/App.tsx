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
import { AIConsultant } from './components/assistant/AIConsultant';
import { Home } from './pages/home';
import { Preview } from './pages/preview';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ThemeProvider>
        <LanguageProvider>
          <MotionProvider>
            <div className="xvi-app">
              <ScrollProgress />
              <PageTransition>
                <Routes>
                  <Route path="/preview" element={<Preview />} />
                  <Route
                    path="*"
                    element={
                      <>
                        <Navigation />
                        <main id="main-content">
                          <Home />
                        </main>
                        <Footer />
                        <AIConsultant />
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
