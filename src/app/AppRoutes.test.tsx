import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Outlet } from 'react-router-dom'

vi.mock('./App', () => ({
  default: () => <div data-testid="homepage">Homepage</div>,
}))

vi.mock('../components/layout/SiteLayout', () => ({
  default: () => (
    <div data-testid="site-layout">
      <Outlet />
    </div>
  ),
}))

vi.mock('../pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}))

import AppRoutes from './AppRoutes'

function renderAt(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('AppRoutes', () => {
  it('renders homepage at /', () => {
    renderAt(['/'])
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
  })

  it('renders about page at /about with lazy loading', async () => {
    renderAt(['/about'])
    await vi.dynamicImportSettled()
    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument()
    })
    expect(screen.getByTestId('site-layout')).toBeInTheDocument()
  })

  it('redirects unknown routes to /', async () => {
    renderAt(['/nonexistent-page'])
    await vi.dynamicImportSettled()
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
  })
})
