import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PersonalIntro from './components/sections/PersonalIntro'
import SocialHub from './components/sections/SocialHub'
import PreviewGallery from './components/sections/PreviewGallery'
import PremiumContentSection from './components/sections/PremiumContentSection'
import PaywallSection from './components/sections/PaywallSection'
import FAQSection from './components/sections/FAQSection'
import StickyCTA from './components/sections/StickyCTA'
import Footer from './components/sections/Footer'
import VerificationSection from './components/sections/VerificationSection'
import FloatingHearts from './components/animations/FloatingHearts'
import FloatingCryptoIcons from './components/animations/FloatingCryptoIcons'
import InteractiveHearts from './components/animations/InteractiveHearts'
import RealTimeActivityWidget from './components/ui/RealTimeActivityWidget'
import TopBar from './components/ui/TopBar'
import AnalyticsDashboard from './components/pages/AnalyticsDashboard'

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
    <div className="min-h-screen bg-neon-gradient relative">
      {/* Pasek górny z logo i informacjami */}
      <TopBar />

      {/* Latające serduszka w tle */}
      <FloatingHearts />

      {/* Latające ikony crypto i blockchain */}
      <FloatingCryptoIcons />

      {/* Interaktywne serduszka reagujące na scroll */}
      <InteractiveHearts />

      {/* Główna zawartość z marginesem na górze dla paska */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-20">
        <PersonalIntro />
        <SocialHub />
        <VerificationSection />
        <PreviewGallery />
        <PremiumContentSection />
        <PaywallSection />
        <FAQSection />
        <StickyCTA />
        <Footer />
      </div>

      {/* Widget powiadomień o aktywności w czasie rzeczywistym */}
      <RealTimeActivityWidget />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  )
}

export default App





