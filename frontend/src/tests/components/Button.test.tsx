import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../../components/ui/Button'

describe('Button', () => {
    it('renders with correct text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        await userEvent.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
    })
})