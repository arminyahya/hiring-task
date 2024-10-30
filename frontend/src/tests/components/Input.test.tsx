import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../../components/ui/Input';

describe('Input', () => {
    it('renders with correct placeholder', () => {
        render(<Input placeholder="Enter your name" />)
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })

    it('updates value on change', async () => {
        render(<Input placeholder="Enter your name" />)
        const input = screen.getByPlaceholderText('Enter your name')
        await userEvent.type(input, 'John Doe')
        expect(input).toHaveValue('John Doe')
    })

    it.skip('applies error styles when error prop is true', () => {
        render(<Input error errorMessage="This field is required" />)
        const input = screen.getByRole('textbox')
        expect(input).toHaveClass('border-red-500') // Assuming you use this class for error state
        expect(screen.getByText('This field is required')).toBeInTheDocument()
    })
})