import { useEffect } from 'react'
import PersonalIntro from './components/sections/PersonalIntro'
import SocialHub from './components/sections/SocialHub'
import PreviewGallery from './components/sections/PreviewGallery'
import SubscriptionComparisonSection from './components/sections/SubscriptionComparisonSection'
import PaywallSection from './components/sections/PaywallSection'
import FAQSection from './components/sections/FAQSection'
import StickyCTA from './components/sections/StickyCTA'
import VerificationSection from './components/sections/VerificationSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FloatingHearts from './components/animations/FloatingHearts'
import InteractiveHearts from './components/animations/InteractiveHearts'
import RealTimeActivityWidget from './components/ui/RealTimeActivityWidget'

import { trackPageView } from './utils/analytics'

function App() {
  useEffect(() => {
    // Track initial page view
    trackPageView('home')
  }, [])

  return (
    <div className="min-h-screen bg-neon-gradient relative">
      {/* Latające serduszka w tle */}
      <FloatingHearts />

      {/* Interaktywne serduszka reagujące na scroll */}
      <InteractiveHearts />

      {/* Główna zawartość */}
      <div className="relative z-10">
        <PersonalIntro />
        <VerificationSection />
        <PreviewGallery />
        <SocialHub />
        <SubscriptionComparisonSection />
        <PaywallSection />
        <TestimonialsSection />
        <FAQSection />
        <StickyCTA />
      </div>

      {/* Widget powiadomień o aktywności w czasie rzeczywistym */}
      <RealTimeActivityWidget />
    </div>
  )
}

export default App





