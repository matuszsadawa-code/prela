import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HeroSection from '../HeroSection'

// Mock image import
vi.mock('../../../assets/laura-verification.jpg', () => ({
  default: 'mocked-image-url'
}))

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: vi.fn(),
}

// Setup geolocation mock
beforeEach(() => {
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
    configurable: true,
  })
})

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('renders main heading with correct text', () => {
    render(<HeroSection />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Laura Czereśnia')
    expect(heading).toHaveAttribute('id', 'hero-title')
  })

  it('renders verification image with proper alt text', () => {
    render(<HeroSection />)
    
    const image = screen.getByAltText(/Laura Czereńia - Zdjęcie weryfikacyjne z kartką potwierdzającą tożsamość/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('displays all trust boosters with proper accessibility', () => {
    render(<HeroSection />)
    
    // Check if all trust boosters are present
    expect(screen.getByLabelText('Profil zweryfikowany przez platformę')).toBeInTheDocument()
    expect(screen.getByLabelText('Wiek potwierdzony dokumentem tożsamości')).toBeInTheDocument()
    expect(screen.getByLabelText('Pełna dyskrecja i prywatność gwarantowana')).toBeInTheDocument()
    expect(screen.getByLabelText('Szyfrowane i bezpieczne metody płatności')).toBeInTheDocument()
  })

  it('renders user info with proper ARIA labels', () => {
    render(<HeroSection />)
    
    expect(screen.getByLabelText('Wiek: 22 lata')).toBeInTheDocument()
    expect(screen.getByLabelText('Lokalizacja: Polska')).toBeInTheDocument()
    expect(screen.getByLabelText('Status: Online')).toBeInTheDocument()
  })

  it('renders CTA buttons with proper accessibility', () => {
    render(<HeroSection />)
    
    const primaryCTA = screen.getByLabelText('Zobacz galerię zdjęć i filmów')
    const secondaryCTA = screen.getByLabelText('Przejdź do sekcji kontaktu i social media')
    
    expect(primaryCTA).toBeInTheDocument()
    expect(secondaryCTA).toBeInTheDocument()
    
    // Check for focus management
    expect(primaryCTA).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-neon-pink')
    expect(secondaryCTA).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-neon-pink')
  })

  it('handles scroll indicator click and keyboard navigation', () => {
    // Mock getElementById
    const mockElement = { scrollIntoView: vi.fn() }
    document.getElementById = vi.fn().mockReturnValue(mockElement)
    
    render(<HeroSection />)
    
    const scrollIndicator = screen.getByLabelText('Przewiń w dół do galerii')
    
    // Test click
    fireEvent.click(scrollIndicator)
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    
    // Test keyboard navigation
    fireEvent.keyDown(scrollIndicator, { key: 'Enter' })
    expect(mockElement.scrollIntoView).toHaveBeenCalledTimes(2)
    
    fireEvent.keyDown(scrollIndicator, { key: ' ' })
    expect(mockElement.scrollIntoView).toHaveBeenCalledTimes(3)
  })

  it('handles CTA button clicks correctly', () => {
    const mockElement = { scrollIntoView: vi.fn() }
    document.getElementById = vi.fn().mockReturnValue(mockElement)
    
    render(<HeroSection />)
    
    const primaryCTA = screen.getByLabelText('Zobacz galerię zdjęć i filmów')
    const secondaryCTA = screen.getByLabelText('Przejdź do sekcji kontaktu i social media')
    
    fireEvent.click(primaryCTA)
    expect(document.getElementById).toHaveBeenCalledWith('preview-gallery')
    
    fireEvent.click(secondaryCTA)
    expect(document.getElementById).toHaveBeenCalledWith('social-hub')
  })

  it('displays typewriter text progressively', async () => {
    render(<HeroSection />)
    
    // Wait for typewriter effect to start
    await waitFor(() => {
      const typewriterElement = screen.getByLabelText(/Opis: W dzień studentka medycyny/i)
      expect(typewriterElement).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('handles geolocation correctly', () => {
    const mockSuccess = vi.fn()
    const mockError = vi.fn()
    
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      success({ coords: { latitude: 52.2297, longitude: 21.0122 } })
    })
    
    render(<HeroSection />)
    
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled()
  })

  it('has proper semantic structure', () => {
    render(<HeroSection />)

    // Check for proper semantic HTML
    const banner = screen.getByRole('banner')
    expect(banner).toBeInTheDocument()

    // Check for section with aria-labelledby
    const section = document.querySelector('[aria-labelledby="hero-title"]')
    expect(section).toBeInTheDocument()

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveAttribute('id', 'hero-title')
  })

  it('trust boosters support keyboard navigation', () => {
    render(<HeroSection />)
    
    const trustBoosters = screen.getAllByRole('button')
    const firstTrustBooster = trustBoosters.find(button => 
      button.getAttribute('aria-label')?.includes('Profil zweryfikowany')
    )
    
    expect(firstTrustBooster).toBeInTheDocument()
    expect(firstTrustBooster).toHaveAttribute('tabIndex', '0')
    
    // Test keyboard interaction
    fireEvent.keyDown(firstTrustBooster!, { key: 'Enter' })
    // Should not throw error
  })

  it('renders decorative elements with proper ARIA labels', () => {
    render(<HeroSection />)
    
    // Check for decorative elements
    const decorativeElements = screen.getAllByLabelText('Dekoracyjny element')
    expect(decorativeElements.length).toBeGreaterThan(0)
    
    const decorativeParticles = screen.getByLabelText('Dekoracyjne animowane elementy')
    expect(decorativeParticles).toBeInTheDocument()
    
    const decorativeHearts = screen.getByLabelText('Dekoracyjne animowane serca')
    expect(decorativeHearts).toBeInTheDocument()
  })
})
