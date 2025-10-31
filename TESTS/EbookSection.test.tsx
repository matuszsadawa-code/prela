import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EbookSection from '../src/components/sections/EbookSection'

describe('EbookSection', () => {
  it('renders heading and subheading', () => {
    render(<EbookSection />)

    expect(
      screen.getByText(/E-book: Zarabiaj na Kryptowalutach by Maja Lubicz/i)
    ).toBeTruthy()

    expect(
      screen.getByText(/Krok po kroku jak zacząć i zarabiać na rynku krypto/i)
    ).toBeTruthy()
  })

  it('displays promotional pricing', () => {
    render(<EbookSection />)

    // Original price crossed out
    const originalPrices = screen.getAllByText(/299,00\s?zł/i)
    expect(originalPrices.length).toBeGreaterThan(0)
    // Promo price highlighted
    const promoPrices = screen.getAllByText(/149,99\s?zł/i)
    expect(promoPrices.length).toBeGreaterThan(0)
  })

  it('shows buy CTA', () => {
    render(<EbookSection />)

    const cta = screen.getByRole('button', { name: /Kup teraz e-book/i })
    expect(cta).toBeTruthy()
  })

  it('renders social proof stats and testimonials', () => {
    render(<EbookSection />)

    const stats = screen.getByTestId('social-proof-stats')
    expect(stats).toBeTruthy()

    const testimonials = screen.getByTestId('social-proof-testimonials')
    expect(testimonials).toBeTruthy()
  })

  it('renders "Dlaczego ten e-book działa" with 3 arguments', () => {
    render(<EbookSection />)

    const why = screen.getByTestId('why-it-works')
    expect(why).toBeTruthy()

    expect(screen.getByText(/Dlaczego ten e-book działa/i)).toBeTruthy()
    expect(screen.getByText(/Frameworki i checklisty/i)).toBeTruthy()
    expect(screen.getByText(/Ryzyko pod kontrolą/i)).toBeTruthy()
    expect(screen.getByText(/Przykłady i reguły decyzyjne/i)).toBeTruthy()
  })

  it('includes mobile sticky CTA container', () => {
    render(<EbookSection />)

    const sticky = screen.getByTestId('mobile-sticky-cta')
    expect(sticky).toBeTruthy()
  })
})