import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { TestRouter } from '../test/mocks/router'
import ContactPage from './Contact'

function renderContact() {
  return render(
    <TestRouter>
      <ContactPage />
    </TestRouter>,
  )
}

describe('Contact page', () => {
  it('renders the contact form', () => {
    renderContact()
    expect(screen.getByRole('form', { name: /نموذج التواصل/ })).toBeInTheDocument()
  })

  it('renders the name input', () => {
    renderContact()
    expect(screen.getByRole('textbox', { name: /الاسم/ })).toBeInTheDocument()
  })

  it('renders the email input', () => {
    renderContact()
    expect(screen.getByRole('textbox', { name: /البريد المهني/ })).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /أرسل الطلب/ })).toBeInTheDocument()
  })

  it('shows success message after submission', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.type(screen.getByRole('textbox', { name: /الاسم/ }), 'أحمد')
    await user.type(screen.getByRole('textbox', { name: /البريد المهني/ }), 'ahmed@example.com')
    await user.type(screen.getByRole('textbox', { name: /المؤسسة/ }), 'XVI')
    await user.type(screen.getByRole('textbox', { name: /كيف يمكننا المساعدة؟/ }), 'رسالة تجريبية')
    await user.click(screen.getByRole('button', { name: /أرسل الطلب/ }))

    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
