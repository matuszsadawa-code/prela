import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    button: 'button',
    img: 'img',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock window.scrollTo
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  })
}

// Mock IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
