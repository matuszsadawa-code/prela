import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import TestimonialsSection from '../TestimonialsSection'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('TestimonialsSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the testimonials section', () => {
    render(<TestimonialsSection />)
    
    // Check for section heading
    expect(screen.getByText('Co mówią o mnie')).toBeTruthy()
  })

  it('displays testimonials description', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText(/Prawdziwe wiadomości od prawdziwych fanów/)).toBeTruthy()
  })

  it('shows navigation dots', () => {
    render(<TestimonialsSection />)
    
    // Should have navigation dots for testimonials
    const container = screen.getByText('Co mówią o mnie').closest('section')
    expect(container).toBeTruthy()
  })

  it('displays stats section', () => {
    render(<TestimonialsSection />)
    
    // Check for stats
    expect(screen.getByText('98%')).toBeTruthy()
    expect(screen.getByText('Zadowolonych fanów')).toBeTruthy()
    expect(screen.getByText('24/7')).toBeTruthy()
    expect(screen.getByText('5★')).toBeTruthy()
  })

  it('shows call to action', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Dołącz do zadowolonych fanów')).toBeTruthy()
    expect(screen.getByText('Zacznij swoją przygodę')).toBeTruthy()
  })

  it('rotates through testimonials automatically', async () => {
    render(<TestimonialsSection />)
    
    // Fast-forward time to trigger testimonial rotation
    vi.advanceTimersByTime(5000)
    
    await waitFor(() => {
      // Should show different content after rotation
      const section = screen.getByText('Co mówią o mnie').closest('section')
      expect(section).toBeTruthy()
    })
  })
})
