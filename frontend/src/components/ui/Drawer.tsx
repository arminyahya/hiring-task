import React, { useState, useEffect } from 'react'
import { ChevronRight, Power, X } from 'lucide-react'

interface DrawerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  content: React.ReactNode;
}

export function Drawer({ children, isOpen, onClose, content }: DrawerProps) {
  return isOpen ?
    <div className='fixed top-0 right-0 w-64 h-full z-50'>
      <div className='flex h-full '>
        <div className='p-4'>
          <ChevronRight onClick={onClose} color='#343A40' />
        </div>
        <div className='w-full h-full bg-white shadow-xl rounded-md p-4'>
          {content}
        </div>
      </div>
    </div> : children
}
