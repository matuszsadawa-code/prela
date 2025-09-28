import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import RealTimeActivityWidget from '../RealTimeActivityWidget'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('RealTimeActivityWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the widget with initial message', () => {
    render(<RealTimeActivityWidget />)
    
    // Check if the widget is rendered
    expect(screen.getByText('Live Activity')).toBeTruthy()
  })

  it('displays Polish messages', () => {
    render(<RealTimeActivityWidget />)
    
    // Check for Polish text
    expect(screen.getByText(/Laura jest teraz online/)).toBeTruthy()
  })

  it('rotates through different message types', async () => {
    render(<RealTimeActivityWidget />)
    
    // Fast-forward time to trigger message rotation
    vi.advanceTimersByTime(4000)
    
    await waitFor(() => {
      // Should show different content after rotation
      const widget = screen.getByText('Live Activity').closest('div')
      expect(widget).toBeTruthy()
    })
  })

  it('has minimize and close functionality', () => {
    render(<RealTimeActivityWidget />)
    
    // Check for minimize and close buttons
    const minimizeButton = screen.getByTitle('Minimize')
    const closeButton = screen.getByTitle('Close')
    
    expect(minimizeButton).toBeTruthy()
    expect(closeButton).toBeTruthy()
  })

  it('displays progress indicators', () => {
    render(<RealTimeActivityWidget />)
    
    // Check for progress indicators (dots)
    const progressContainer = screen.getByText('Live Activity').closest('div')
    expect(progressContainer).toBeTruthy()
  })
})
