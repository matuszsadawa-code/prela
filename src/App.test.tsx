import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders main sections', () => {
    const { container } = render(<App />)

    // Check if main content is rendered
    expect(container.firstChild).toBeTruthy()
  })

  it('renders hero section with Laura name', () => {
    render(<App />)

    // Check if Laura's name appears somewhere
    const lauraElements = screen.getAllByText(/Laura/i)
    expect(lauraElements.length).toBeGreaterThan(0)
  })

  it('renders social hub section', () => {
    render(<App />)

    // Check if social platforms are mentioned
    expect(screen.getByText(/Instagram/i)).toBeTruthy()
    // Use getAllByText for multiple Telegram mentions
    const telegramElements = screen.getAllByText(/Telegram/i)
    expect(telegramElements.length).toBeGreaterThan(0)
  })

  it('renders pricing section', () => {
    render(<App />)

    // Check if pricing information is displayed - use getAllByText for multiple VIP mentions
    const vipElements = screen.getAllByText(/VIP/i)
    expect(vipElements.length).toBeGreaterThan(0)

    const premiumElements = screen.getAllByText(/Premium/i)
    expect(premiumElements.length).toBeGreaterThan(0)
  })

  it('renders FAQ section', () => {
    render(<App />)

    // Check if FAQ section exists - use getAllByText for multiple mentions
    const faqElements = screen.getAllByText(/pytania/i)
    expect(faqElements.length).toBeGreaterThan(0)
  })
})
