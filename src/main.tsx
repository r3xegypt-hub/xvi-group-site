import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import AppRoutes from './app/AppRoutes'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { CriticalErrorFallback } from './components/common/CriticalErrorFallback'
import { MotionProvider } from './context/MotionContext'
import { ScrollEngine } from './components/ux/ScrollEngine'
import { PremiumCursor } from './components/ux/PremiumCursor'
import { LuxuryLoader } from './components/ux/LuxuryLoader'

function Bootstrap() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaded(true)
    }
  }, [])

  return (
    <MotionProvider>
      <ScrollEngine enabled>
        <PremiumCursor />
        {!loaded ? <LuxuryLoader onFinish={() => setLoaded(true)} /> : null}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ScrollEngine>
    </MotionProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, reset }) => (
        <CriticalErrorFallback error={error} reset={reset} />
      )}
    >
      <Bootstrap />
    </ErrorBoundary>
  </StrictMode>,
)
