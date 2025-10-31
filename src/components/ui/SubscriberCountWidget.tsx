import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, TrendingUp, Sparkles } from 'lucide-react'

const SubscriberCountWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(4)
  const [isAnimating, setIsAnimating] = useState(false)

  // Funkcja do generowania losowej liczby subskrybentów (4-16)
  const generateRandomCount = () => {
    return Math.floor(Math.random() * 13) + 4 // 4-16
  }

  // Animacja zmiany liczby subskrybentów
  useEffect(() => {
    if (!isVisible || isMinimized) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setSubscriberCount(generateRandomCount())
        setIsAnimating(false)
      }, 300)
    }, 8000 + Math.random() * 7000) // 8-15 sekund

    return () => clearInterval(interval)
  }, [isVisible, isMinimized])

  // Animacje dla komponentu
  const widgetVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  }

  const countVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  }

  const minimizedVariants = {
    minimized: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    expanded: {
      width: "auto",
      height: "auto",
      borderRadius: "1rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        variants={widgetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-24 right-4 md:top-28 md:right-6 z-50 max-w-[calc(100vw-2rem)] md:max-w-none"
      >
        <motion.div
          variants={minimizedVariants}
          animate={isMinimized ? "minimized" : "expanded"}
          className={`
            glass-activity activity-border-subtle backdrop-blur-xl overflow-hidden relative
            shadow-lg shadow-purple-500/15
            ${isMinimized
              ? 'cursor-pointer flex items-center justify-center'
              : 'min-w-[280px] max-w-[320px] md:min-w-[300px] md:max-w-[350px]'
            }
          `}
          onClick={() => isMinimized && setIsMinimized(false)}
          style={{
            borderRadius: isMinimized ? '50%' : '1rem',
          }}
        >
          {isMinimized ? (
            // Minimized state - tylko ikona
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, type: "tween", ease: "easeInOut" }}
              className="text-neon-pink"
            >
              <Users className="w-6 h-6" />
            </motion.div>
          ) : (
            // Expanded state - pełny widget
            <div className="p-3 md:p-4">
              {/* Header z przyciskami */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-xs font-semibold activity-header-text uppercase tracking-wide">
                    Subskrybenci
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsMinimized(true)
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
                    title="Minimize"
                  >
                    <div className="w-3 h-0.5 bg-gray-400"></div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsVisible(false)
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
                    title="Close"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Główna zawartość */}
              <div className="flex items-start gap-3">
                {/* Ikona */}
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 
                               border border-neon-pink/30 flex items-center justify-center"
                    animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-5 h-5 text-neon-pink" />
                  </motion.div>
                </div>

                {/* Treść */}
                <motion.div 
                  className="flex-1 min-w-0 activity-content-bg"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.p
                    className="text-sm activity-text-enhanced font-medium leading-tight mb-1"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                  >
                    Liczba subskrybentów dziś:
                  </motion.p>
                  
                  {/* Animowana liczba */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={subscriberCount}
                      variants={countVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex items-center gap-2"
                    >
                      <span className="text-2xl font-bold text-neon-pink">
                        {subscriberCount}
                      </span>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <motion.p 
                    className="text-xs activity-text-secondary mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Nowi dzisiaj
                  </motion.p>

                  {/* Przycisk Subskrybuj */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const premiumSection = document.getElementById('premium-content-section')
                      if (premiumSection) {
                        premiumSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="inline-flex items-center mt-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-neon-pink/20 to-purple-500/20 border border-neon-pink/40 hover:border-neon-pink/60 transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-neon-pink rounded-full mr-2"
                    />
                    <span className="text-xs text-neon-pink font-medium group-hover:text-white transition-colors">
                      SUBSKRYBUJ
                    </span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Dodatkowe efekty wizualne */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-neon-pink rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-400 opacity-60" />
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Animated Rainbow Glow Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-30 blur-lg -z-10"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15), rgba(251, 191, 36, 0.1))',
              'linear-gradient(45deg, rgba(236, 72, 153, 0.15), rgba(251, 191, 36, 0.1), rgba(52, 211, 153, 0.15))',
              'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(52, 211, 153, 0.15), rgba(139, 92, 246, 0.2))',
              'linear-gradient(45deg, rgba(52, 211, 153, 0.15), rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15))',
              'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15), rgba(251, 191, 36, 0.1))',
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-2xl opacity-60"></div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SubscriberCountWidget