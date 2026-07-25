import { render, screen } from '@testing-library/react'
import { SectionHeader } from './SectionHeader'

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="My Title" />)
    expect(screen.getByRole('heading', { name: /my title/i })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<SectionHeader title="Title" description="A description" />)
    expect(screen.getByText('A description')).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<SectionHeader eyebrow="Eyebrow" title="Title" />)
    expect(screen.getByText('Eyebrow')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeader title="Title" />)
    expect(container.querySelector('p')).not.toBeInTheDocument()
  })

  it('does not render eyebrow when not provided', () => {
    const { container } = render(<SectionHeader title="Title" />)
    expect(container.querySelector('.uppercase')).not.toBeInTheDocument()
  })
})
