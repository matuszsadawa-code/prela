import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import PersonalIntro from './components/sections/PersonalIntro'
import StickyCTA from './components/sections/StickyCTA'
import Footer from './components/sections/Footer'

// Lazy load heavy animation components for better initial load
const FloatingHearts = lazy(() => import('./components/animations/FloatingHearts'))
const FloatingCryptoIcons = lazy(() => import('./components/animations/FloatingCryptoIcons'))
const InteractiveHearts = lazy(() => import('./components/animations/InteractiveHearts'))
const ParallaxParticles = lazy(() => import('./components/animations/ParallaxParticles'))


import TopBar from './components/ui/TopBar'
import ExitIntentPopup from './components/ui/ExitIntentPopup'
import AnalyticsDashboard from './components/pages/AnalyticsDashboard'
import VerifyPage from './components/pages/VerifyPage'
import VIPAccessPage from './components/pages/VIPAccessPage'
import PaymentSuccessPage from './components/pages/PaymentSuccessPage'

import { trackPageView, storeDeviceData, trackScrollDepth, trackTimeOnPage } from './utils/analytics'

function HomePage() {
  useEffect(() => {
    // Track initial page view
    trackPageView('home')

    // Store device data on first load
    storeDeviceData()

    // Track scroll depth
    const handleScroll = () => {
      trackScrollDepth()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Track time on page every 10 seconds
    const timeInterval = setInterval(() => {
      trackTimeOnPage('home')
    }, 10000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-neon-gradient relative">
        {/* Exit Intent Popup */}
        <ExitIntentPopup />

        {/* Pasek górny z logo i informacjami */}
        <TopBar />

        {/* Lazy-loaded animations with Suspense fallback */}
        <Suspense fallback={null}>
          <FloatingHearts />
          <FloatingCryptoIcons />
          <InteractiveHearts />
          <ParallaxParticles />
        </Suspense>

        {/* Główna zawartość z marginesem na górze dla paska i na dole dla sticky CTA */}
        <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24">
          <PersonalIntro />
          <StickyCTA />
          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/vip-access" element={<VIPAccessPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
