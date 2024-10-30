import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect, describe, it, beforeEach } from 'vitest'
import { BrowserProvider, formatEther } from 'ethers'
import MetaMaskConnector from '../../components/feature/MetaMaskConnector'
import { AppContext, AppProvider } from '../../context/appContext'

// Mock ethers library
vi.mock('ethers', () => {
  const mockBrowserProvider = vi.fn()
  mockBrowserProvider.prototype.listAccounts = vi.fn()
  mockBrowserProvider.prototype.getBalance = vi.fn()

  return {
    BrowserProvider: mockBrowserProvider,
    formatEther: vi.fn((value) => `${value} ETH`),
  }
})

// Import mocked ethers after mocking

// Mock window.ethereum
const mockEthereum = {
  request: vi.fn(),
  on: vi.fn(),
  removeListener: vi.fn(),
}

describe('MetaMaskConnector', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.window.ethereum = mockEthereum
  })

  it.only('connects to MetaMask when button is clicked', async () => {
    // Mock the ethereum.request method
    mockEthereum.request.mockResolvedValueOnce([])

    // Mock BrowserProvider methods
    vi.mocked(BrowserProvider.prototype.listAccounts).mockResolvedValue([{ address: '0x123' }])
    vi.mocked(BrowserProvider.prototype.getBalance).mockResolvedValue(BigInt(1000000000000000000)) // 1 ETH

    // Mock formatEther function
    vi.mocked(formatEther).mockReturnValue('1.0')

    render(<AppProvider><MetaMaskConnector /></AppProvider>)
    await userEvent.click(screen.getByRole('button', { name: /Connect Wallet/i }))

    await waitFor(() => {
      expect(mockEthereum.request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' })
      expect(BrowserProvider).toHaveBeenCalledWith(mockEthereum)
      expect(BrowserProvider.prototype.listAccounts).toHaveBeenCalled()
      expect(BrowserProvider.prototype.getBalance).toHaveBeenCalledWith('ethers.eth')
      expect(formatEther).toHaveBeenCalled()
      expect(screen.getByText(/0x123/i)).toBeInTheDocument()
    })
  })

  it('shows error message when MetaMask is not installed', async () => {
    delete global.window.ethereum

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<MetaMaskConnector />)
    await userEvent.click(screen.getByRole('button', { name: /connect wallet/i }))

    expect(alertMock).toHaveBeenCalledWith('MetaMask is not installed. Please install it to use this feature.')
  })

  it('handles error when connecting fails', async () => {
    mockEthereum.request.mockRejectedValueOnce(new Error('User rejected the request'))

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<MetaMaskConnector />)
    await userEvent.click(screen.getByRole('button', { name: /connect wallet/i }))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'An error occurred while connecting the wallet:',
        expect.any(Error)
      )
    })
  })
})