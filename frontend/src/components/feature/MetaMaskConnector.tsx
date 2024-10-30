import { useState, useEffect } from 'react'
import { ethers, formatEther } from 'ethers'
import { Button } from '../ui/Button'
import { Drawer, } from "../ui/Drawer"
import { Power, Wallet } from 'lucide-react'

export default function MetaMaskConnector() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setIsConnected(true)
          setAccount(accounts[0].address)
          const balance = await provider.getBalance("ethers.eth")
          setBalance(formatEther(balance))
        }
      } catch (error) {
        console.error("An error occurred while checking the connection:", error)
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await _provider.listAccounts()
        setIsConnected(true)
        setAccount(accounts[0].address)
        const balance = await _provider.getBalance("ethers.eth")
        setBalance(formatEther(balance))
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error)
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.')
    }
  }

  function disconnectWallet() {
    setIsConnected(false);
    setModalOpen(false);
  }

  return (
    <Drawer
        isOpen={isModalOpen}
        onClose={() => { setModalOpen(false); }}
        content={<>
          <div className='flex mb-5'>
            <div className='truncate w-16'>{account}</div>
            <Power className='ml-auto' color='#DC3545' onClick={disconnectWallet} />
          </div>
          <div >{balance}</div>
        </>
        }
      >
        {!isConnected ? (
          <Button variant='wallet' onClick={connectWallet}>Connect Wallet</Button>
        ) : <div className='flex items-center' onClick={() => setModalOpen(true)}>
          <Wallet color='#28A745' className='inline-block mr-2'/>
          <span className='truncate w-16'>{account}</span></div>}

      </Drawer>
  )
}