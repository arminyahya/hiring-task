import { renderHook, act, render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useVerticalScrollbarMeasure from '../../hooks/useVerticalScrollbarMeasure'

const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', mockResizeObserver)

const mockGetVerticalScrollbarWidth = vi.fn();
vi.mock('../../../utils/getVerticalScrollbarWidth', () => ({
  default: () => mockGetVerticalScrollbarWidth
}))

describe('useVerticalScrollbarMeasure', () => {
  let mockRef: React.RefObject<HTMLDivElement>
  beforeEach(() => {
    mockRef = {
      current: document.createElement('div')
    }
    // Create a parent element and append the ref's current element to it
    const parentElement = document.createElement('div')
    parentElement.appendChild(mockRef.current as HTMLDivElement)

    // Mock the client width and height of the parent element
    Object.defineProperty(parentElement, 'clientWidth', { value: 100, configurable: true })
    Object.defineProperty(parentElement, 'clientHeight', { value: 100, configurable: true })
  })

  it('should initialize with scrollbarWidth of given value', () => {
    mockGetVerticalScrollbarWidth.mockReturnValue(20);

    const div = document.createElement('div');
    document.body.appendChild(div);
    const { result } = renderHook(() => useVerticalScrollbarMeasure({ listRef: { current: div } }))
    expect(result.current[0]).toBe(20)
  })

  it('should mockGetVerticalScrollbarWidth be called when ResizeObserver fires', async () => {
    // Object.defineProperty(parentElement, 'clientWidth', { value: 100, configurable: true })
    mockGetVerticalScrollbarWidth.mockReturnValue(20);
    const div = document.createElement('div');
    document.body.appendChild(div)
    const [[callback]] = mockResizeObserver.mock.calls
    act(() => {
      Object.defineProperty((mockRef.current as HTMLDivElement).parentElement, 'clientWidth', { value: 200 })
      Object.defineProperty((mockRef.current as HTMLDivElement).parentElement, 'clientHeight', { value: 150 })
      callback([{ target: (mockRef.current as HTMLDivElement).parentElement }])
    })
    const { result } = renderHook(() => useVerticalScrollbarMeasure({ listRef: { current: div } }))
    expect(mockGetVerticalScrollbarWidth).toHaveBeenCalledTimes(2);
  })
})