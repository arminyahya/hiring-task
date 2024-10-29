'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from '../ui/Button'

export default function MetaMaskConnector() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setIsConnected(true)
          setAccount(accounts[0])
          const balance = await provider.getBalance(accounts[0])
          setBalance(ethers.utils.formatEther(balance))
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
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts()
        setIsConnected(true)
        setAccount(accounts[0])
        const balance = await provider.getBalance(accounts[0])
        setBalance(ethers.utils.formatEther(balance))
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error)
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.')
    }
  }

  return (
    <div className="w-[350px]">
      <div>
        <div>MetaMask Connection</div>
        <div>Connect your MetaMask wallet</div>
      </div>
      <div>
        {isConnected ? (
          <div className="space-y-2">
            <p className="text-sm">Connected Account: {account}</p>
            <p className="text-sm">Balance: {balance} ETH</p>
          </div>
        ) : (
          <Button onClick={connectWallet}>Connect MetaMask</Button>
        )}
      </div>
    </div>
  )
}