import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Login from '../../pages/login'

// Mock authentication function
const mockLogin = vi.fn()
vi.mock('../../utils/services', () => ({
  login: (email: string, password: string) => mockLogin(email, password) 
}))

describe('Login', () => {
  it('renders login form', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument()
  })

  it('submits form with user credentials', async () => {
    mockLogin.mockReturnValue({
      status: 200,
      data: {
       
      }
    });
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('displays error message on login failure', async () => {
    mockLogin.mockReturnValue({
      status: 401,
      data: {
        message: "Invalid username or password"
      }
    });
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText(/Invalid username or password/i)).toBeInTheDocument()
  })
})