import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestRouter } from './mocks/router'

function App() {
  return <div>Hello Testing</div>
}

describe('Testing infrastructure', () => {
  it('renders a component', () => {
    render(
      <TestRouter>
        <App />
      </TestRouter>
    )
    expect(screen.getByText('Hello Testing')).toBeInTheDocument()
  })
})
