import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { CinematicIntro } from './CinematicIntro'

describe('CinematicIntro', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the intro overlay', () => {
    render(<CinematicIntro onFinish={vi.fn()} />)
    const dialog = screen.getByRole('dialog', { name: /xvi brand reveal/i })
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('calls onFinish when skip button is clicked', () => {
    const onFinish = vi.fn()
    render(<CinematicIntro onFinish={onFinish} />)
    fireEvent.click(screen.getByRole('button', { name: /skip/i }))
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('calls onFinish when Escape is pressed', () => {
    const onFinish = vi.fn()
    render(<CinematicIntro onFinish={onFinish} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
