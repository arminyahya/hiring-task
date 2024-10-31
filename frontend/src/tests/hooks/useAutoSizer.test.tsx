import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import useAutoSizer from '../../hooks/useAutoSizer'

// Mock ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', mockResizeObserver)

describe('useAutoSizer', () => {
  let mockRef: React.RefObject<HTMLDivElement>
  beforeEach(() => {
    mockRef = {
      current: document.createElement('div')
    }
    // Create a parent element and append the ref's current element to it
    const parentElement = document.createElement('div')
    parentElement.appendChild(mockRef.current)
    
    // Mock the client width and height of the parent element
    Object.defineProperty(parentElement, 'clientWidth', { value: 100, configurable: true })
    Object.defineProperty(parentElement, 'clientHeight', { value: 100, configurable: true })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial size of 100', () => {
    const { result } = renderHook(() => useAutoSizer({ listRef: mockRef }))
    expect(result.current).toEqual({ width: 100, height: 100 })
  })

  it('should update size when ResizeObserver callback is triggered', async () => {
    const { result } = renderHook(() => useAutoSizer({ listRef: mockRef }))

    // Get the ResizeObserver callback
    const [[callback]] = mockResizeObserver.mock.calls

    // Simulate a resize event
    act(() => {
      Object.defineProperty(mockRef.current.parentElement, 'clientWidth', { value: 200 })
      Object.defineProperty(mockRef.current.parentElement, 'clientHeight', { value: 150 })
      callback([{ target: mockRef.current.parentElement }])
    })

    expect(result.current).toEqual({ width: 200, height: 150 })
  })
 
})
