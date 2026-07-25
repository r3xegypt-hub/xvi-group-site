import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Hello World</Container>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Container className="my-custom">Content</Container>)
    const el = screen.getByText('Content')
    expect(el.className).toContain('my-custom')
  })

  it('applies default maxWidthClass', () => {
    render(<Container>Content</Container>)
    const el = screen.getByText('Content')
    expect(el.className).toContain('max-w-[1160px]')
  })

  it('renders with custom as element', () => {
    render(<Container as="section">Section Content</Container>)
    const el = screen.getByText('Section Content')
    expect(el.tagName.toLowerCase()).toBe('section')
  })

  it('forwards additional props to the rendered element', () => {
    render(<Container data-testid="custom">Content</Container>)
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })
})
