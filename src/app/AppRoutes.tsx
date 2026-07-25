import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from '../components/layout/SiteLayout'
import ErrorBoundary from '../components/common/ErrorBoundary'
import RouteErrorFallback from '../components/common/RouteErrorFallback'
import App from './App'

function RouteLoading() {
  return <div role="status" aria-live="polite" className="fixed inset-0 z-50 grid place-items-center bg-[color:var(--color-xvi-paper)]"><motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 rounded-full border border-[color:var(--color-xvi-line)] bg-white/72 px-5 py-3 shadow-[0_18px_44px_rgba(11,15,20,.08)] backdrop-blur-xl"><span className="relative flex h-2.5 w-2.5"><motion.span className="absolute inset-0 rounded-full bg-[color:var(--color-xvi-bronze)]" animate={{ opacity: [1, .28, 1], scale: [1, 1.7, 1] }} transition={{ duration: 1.2, repeat: Infinity }} /><span className="relative h-2.5 w-2.5 rounded-full bg-[color:var(--color-xvi-bronze)]" /></span><span className="text-xs tracking-[.18em] text-[color:var(--color-xvi-ink-soft)]">XVI / LOADING</span></motion.div></div>
}

const LazyAbout = lazy(() => import('../pages/About'))
const LazyServices = lazy(() => import('../pages/Services'))
const LazyIndustries = lazy(() => import('../pages/Industries'))
const LazyTechnology = lazy(() => import('../pages/Technology'))
const LazyAiTransformation = lazy(() => import('../pages/AiTransformation'))
const LazyBusinessConsulting = lazy(() => import('../pages/BusinessConsulting'))
const LazyTechnologyConsulting = lazy(() => import('../pages/TechnologyConsulting'))
const LazyExecutiveTraining = lazy(() => import('../pages/ExecutiveTraining'))
const LazyInsights = lazy(() => import('../pages/Insights'))
const LazyLeadership = lazy(() => import('../pages/Leadership'))
const LazyContact = lazy(() => import('../pages/Contact'))
const LazyPrivacy = lazy(() => import('../pages/Privacy'))
const LazyTerms = lazy(() => import('../pages/Terms'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <ErrorBoundary fallbackRender={({ error, reset }) => <RouteErrorFallback error={error} reset={reset} />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<SiteLayout />}>
            <Route path="/about" element={<LazyAbout />} />
            <Route path="/services" element={<LazyServices />} />
            <Route path="/industries" element={<LazyIndustries />} />
            <Route path="/technology" element={<LazyTechnology />} />
            <Route path="/ai-transformation" element={<LazyAiTransformation />} />
            <Route path="/business-consulting" element={<LazyBusinessConsulting />} />
            <Route path="/technology-consulting" element={<LazyTechnologyConsulting />} />
            <Route path="/executive-training" element={<LazyExecutiveTraining />} />
            <Route path="/insights" element={<LazyInsights />} />
            <Route path="/leadership" element={<LazyLeadership />} />
            <Route path="/contact" element={<LazyContact />} />
            <Route path="/privacy" element={<LazyPrivacy />} />
            <Route path="/terms" element={<LazyTerms />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  )
}
