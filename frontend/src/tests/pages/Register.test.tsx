import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Register from '../../pages/register'

const mockRegister = vi.fn()
vi.mock('../../utils/services', () => ({
    register: async (
        username: string,
        password: string,
        email: string
    ) => mockRegister(username, password, email)
}))

describe('Register', () => {
    beforeEach(() => {
        vi.resetAllMocks()
      })

    it('renders register form', () => {
        render(<MemoryRouter><Register /></MemoryRouter>)
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()
    })

    it('submits form with user credentials', async () => {
        mockRegister.mockReturnValue({
            status: 201,
            data: {
            }
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        await userEvent.type(screen.getByLabelText(/username/i), 'armin')
        await userEvent.type(screen.getByLabelText(/password/i), 'password123')
        await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
        await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        expect(mockRegister).toHaveBeenCalledWith('armin', 'password123', 'test@example.com')
    })

    it.only('displays error message on register failure', async () => {
        mockRegister.mockReturnValue({
            status: 401,
            data: {
                message: "An error occurred during registration"
            }
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        await userEvent.type(screen.getByLabelText(/username/i), 'armin')
        await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword')
        await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        
        expect(await screen.findByText('An error occurred during registration')).toBeInTheDocument()
    })
})