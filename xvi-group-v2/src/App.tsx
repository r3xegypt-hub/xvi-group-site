import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/home/Home';

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

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="xvi-app">
        <Routes>
          <Route path="/" element={<PageShell><Home /></PageShell>} />
          <Route path="*" element={<PageShell><Home /></PageShell>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
