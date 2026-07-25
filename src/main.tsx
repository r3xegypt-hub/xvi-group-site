import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import AppRoutes from './app/AppRoutes'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { CriticalErrorFallback } from './components/common/CriticalErrorFallback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, reset }) => (
        <CriticalErrorFallback error={error} reset={reset} />
      )}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
