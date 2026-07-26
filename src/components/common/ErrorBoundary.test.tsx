import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from './ErrorBoundary'

function ThrowingComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Child content</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders fallback when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('حدث خطأ')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('renders custom fallbackRender when error occurs', () => {
    const fallbackRender = vi.fn(({ error, reset }) => (
      <div>
        <span>Custom fallback: {error.message}</span>
        <button onClick={reset}>Custom Reset</button>
      </div>
    ))

    render(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    expect(fallbackRender).toHaveBeenCalled()
    expect(screen.getByText('Custom fallback: Test error')).toBeInTheDocument()
  })

  it('resets error state when Try Again is clicked', async () => {
    const user = userEvent.setup()

    let shouldThrow = true
    function DynamicThrowing() {
      if (shouldThrow) {
        throw new Error('Dynamic error')
      }
      return <div>Recovered content</div>
    }

    const { rerender } = render(
      <ErrorBoundary>
        <DynamicThrowing />
      </ErrorBoundary>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Dynamic error')).toBeInTheDocument()

    shouldThrow = false
    rerender(
      <ErrorBoundary>
        <DynamicThrowing />
      </ErrorBoundary>
    )

    await user.click(screen.getByText('إعادة المحاولة'))

    expect(screen.getByText('Recovered content')).toBeInTheDocument()
  })

  it('calls onError when error occurs', () => {
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()
    const [error, errorInfo] = onError.mock.calls[0]
    expect(error.message).toBe('Test error')
    expect(errorInfo).toHaveProperty('componentStack')
  })

  it('renders default fallback with reset button when no fallback or fallbackRender', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('إعادة المحاولة')).toBeInTheDocument()
  })

  it('prefers fallbackRender over fallback when both provided', () => {
    render(
      <ErrorBoundary
        fallback={<div>Static fallback</div>}
        fallbackRender={({ error }) => <div>Render fallback: {error.message}</div>}
      >
        <ThrowingComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Render fallback: Test error')).toBeInTheDocument()
    expect(screen.queryByText('Static fallback')).not.toBeInTheDocument()
  })
})
