import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, UserPlus, MessageCircle, Zap } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'
import { trackCTAClick } from '../../utils/analytics'

const NOTIFICATIONS = [
  {
    id: 1,
    icon: Sparkles,
    text: "Nowe treści premium dostępne!",
    highlight: "✨",
    subtext: "Dołącz do ekskluzywnej społeczności VIP",
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    icon: UserPlus,
    text: "12 osób dołączyło",
    highlight: "w ostatniej godzinie 🔥",
    subtext: "Nie przegap okazji, dołącz teraz!",
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: 3,
    icon: MessageCircle,
    text: "Maja jest teraz",
    highlight: "online 🟢",
    subtext: "To idealny moment na wiadomość",
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    id: 4,
    icon: Zap,
    text: "Promocja kończy się",
    highlight: "za 2h ⏳",
    subtext: "Odbierz dostęp z rabatem -50%",
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-500"
  }
]

const StickyCTA: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleClick = () => {
    trackCTAClick('sticky_bottom_cta', 'bottom')
  }

  const notification = NOTIFICATIONS[currentIndex]
  const Icon = notification.icon

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Animated gradient background - Darker, more premium */}
      <div className="absolute inset-0 bg-slate-950/80" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/40 via-purple-900/40 to-blue-900/40"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      />

      {/* Pulsing glow overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10"
        animate={{
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Left - Rotating Message */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={notification.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-4"
              style={{ position: 'relative' }}
            >
              <div className={`
                flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                bg-gradient-to-br ${notification.gradient} 
                flex items-center justify-center
                shadow-lg ring-2 ring-white/10
              `}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <div className="flex flex-col">
                <p className="text-white font-bold text-xs sm:text-base leading-tight truncate pr-2">
                  {notification.text} <span className={notification.color}>{notification.highlight}</span>
                </p>
                <p className="text-white/60 text-[10px] sm:text-xs truncate hidden sm:block">
                  {notification.subtext}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right - Premium CTA Button */}
        <motion.a
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex-shrink-0 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-white via-pink-50 to-white font-bold text-sm sm:text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center gap-2 overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
          </motion.div>

          <span className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline">
            Dołącz Teraz
          </span>
          <span className="relative bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
            Dołącz
          </span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default StickyCTA
