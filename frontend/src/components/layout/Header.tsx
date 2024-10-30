import { useState } from 'react'
import MetaMaskConnector from '../feature/MetaMaskConnector'

export default function Header() {

  return (
    <header className="flex justify-between items-center p-4 bg-background border-b">
      <h1 className="text-2xl font-bold">Web3</h1>
      <MetaMaskConnector />
    </header>
  )
}