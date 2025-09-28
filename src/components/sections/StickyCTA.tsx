import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, X } from 'lucide-react'

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show sticky CTA after scrolling 50% of viewport height
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Only show on mobile/tablet
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  if (!isMobile) return null

  const handlePreview = () => {
    const previewSection = document.getElementById('preview-gallery')
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePurchase = () => {
    // Redirect to purchase/OnlyFans
    window.open('#', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-sm mx-auto">
            {isMinimized ? (
              // Minimized State
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-neon-pink to-neon-purple rounded-full p-4 shadow-2xl"
              >
                <button
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center justify-center w-full"
                >
                  <Heart className="w-6 h-6 text-white animate-pulse" />
                </button>
              </motion.div>
            ) : (
              // Expanded State
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-dark-900/95 backdrop-blur-lg rounded-2xl border border-neon-pink/30 shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 p-4">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple p-0.5">
                      <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                        <span className="text-lg">👩‍⚕️</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Laura</h3>
                      <p className="text-green-400 text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Online teraz
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-white text-center mb-4 font-medium">
                    Gotowy na więcej? Odblokuj dostęp do Laury 🔓
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePreview}
                      className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    
                    <button
                      onClick={handlePurchase}
                      className="flex-1 bg-gradient-to-r from-neon-pink to-neon-purple text-white py-3 px-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Kup dostęp
                    </button>
                  </div>

                  {/* Special Offer */}
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-400">
                      Specjalna oferta: <span className="text-neon-pink font-semibold">-30%</span> na pierwszy miesiąc
                    </p>
                  </div>
                </div>

                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-neon-pink/50 animate-pulse pointer-events-none"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyCTA
