import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Wifi, BookOpen, Crown, UserPlus, Minimize2 } from 'lucide-react'

interface ActivityMessage {
  id: string
  type: 'online' | 'viewers' | 'ebookPurchase' | 'vipSubscription' | 'newFan' | 'vipSubscriptionMonths'
  message: string
  icon: React.ReactNode
  color: string
  priority: 'low' | 'medium' | 'high'
  probability: number
  userName?: string
}

const TopBar: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isBurstMode, setIsBurstMode] = useState(false)
  const [burstCount, setBurstCount] = useState(0)
  const [nextInterval, setNextInterval] = useState(45000)
  const [isSilentPeriod, setIsSilentPeriod] = useState(false)
  const [isMajaOnline] = useState(true)

  // Polish names for realistic notifications
  const allPolishNames = useMemo(() => [
    'Michał', 'Paweł', 'Jakub', 'Tomasz', 'Łukasz', 'Adam', 'Mateusz', 'Kamil',
    'Krzysztof', 'Marcin', 'Piotr', 'Bartosz', 'Maciej', 'Dawid', 'Rafał',
    'Sebastian', 'Artur', 'Patryk', 'Damian', 'Grzegorz', 'Wojciech', 'Robert',
    'Anna', 'Kasia', 'Magda', 'Ola', 'Ania', 'Monika', 'Agnieszka', 'Beata',
    'Dorota', 'Ewa', 'Gosia', 'Iwona', 'Joanna', 'Karolina', 'Lidia', 'Marta'
  ], [])

  const polishCities = useMemo(() => [
    'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Łódź', 'Katowice',
    'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Toruń', 'Rzeszów'
  ], [])

  const getRandomName = useCallback(() => allPolishNames[Math.floor(Math.random() * allPolishNames.length)], [allPolishNames])
  const getRandomCity = useCallback(() => polishCities[Math.floor(Math.random() * polishCities.length)], [polishCities])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getAvatarColor = useCallback((name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }, [])

  const generateRandomViewers = useCallback(() => {
    const hour = new Date().getHours()
    let baseViewers = 25
    let maxViewers = 150

    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
      baseViewers = 45
      maxViewers = 180
    } else if (hour >= 6 && hour <= 12) {
      baseViewers = 15
      maxViewers = 80
    }

    return Math.floor(Math.random() * (maxViewers - baseViewers + 1)) + baseViewers
  }, [])

  const getTimeBasedActivityMultiplier = useCallback(() => {
    const hour = new Date().getHours()
    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
      return 1.5
    }
    if (hour >= 6 && hour <= 12) {
      return 0.7
    }
    return 1.0
  }, [])

  const getRandomInterval = useCallback(() => {
    const baseInterval = 30000 + Math.random() * 90000
    const timeMultiplier = getTimeBasedActivityMultiplier()
    return Math.floor(baseInterval / timeMultiplier)
  }, [getTimeBasedActivityMultiplier])

  const shouldTriggerBurst = useCallback(() => Math.random() < 0.05, [])
  const shouldTriggerSilentPeriod = useCallback(() => {
    const hour = new Date().getHours()
    if ((hour >= 2 && hour <= 6) || (hour >= 6 && hour <= 10)) {
      return Math.random() < 0.25
    }
    return Math.random() < 0.1
  }, [])

  const getSilentPeriodDuration = useCallback(() => {
    const hour = new Date().getHours()
    if ((hour >= 2 && hour <= 6) || (hour >= 6 && hour <= 10)) {
      return 30000 + Math.random() * 60000
    }
    return 15000 + Math.random() * 30000
  }, [])

  const shouldShowMessage = useCallback((probability: number) => {
    const timeMultiplier = getTimeBasedActivityMultiplier()
    return Math.random() < (probability * timeMultiplier)
  }, [getTimeBasedActivityMultiplier])

  const getEbookPurchaseMessage = useCallback(() => {
    const name = getRandomName()
    const city = getRandomCity()
    const messages = [
      `${name} z ${city} właśnie kupił e-book o krypto!`,
      `${name} (${city}) zainwestował w wiedzę - brawo!`,
      `${name} kupił przewodnik po kryptowalutach!`,
      `${name} z ${city} rozpoczyna przygodę z krypto!`
    ]
    return { message: messages[Math.floor(Math.random() * messages.length)], name }
  }, [getRandomName, getRandomCity])

  const getVipSubscriptionMessage = useCallback(() => {
    const name = getRandomName()
    const messages = [
      `${name} dołączył do VIP - witaj w rodzince!`,
      `${name} właśnie zasubskrybował VIP!`,
      `${name} został moim subskrybentem - dzięki!`,
      `${name} teraz ma pełen dostęp do ekskluzywnych treści!`
    ]
    return { message: messages[Math.floor(Math.random() * messages.length)], name }
  }, [getRandomName])

  const getVipSubscriptionMonthsMessage = useCallback(() => {
    const name = getRandomName()
    const months = [1, 3, 6]
    const randomMonths = months[Math.floor(Math.random() * months.length)]
    const messages = [
      `${name} wykupił subskrypcję na ${randomMonths} ${randomMonths === 1 ? 'miesiąc' : 'miesiące'}!`,
      `${name} wybrał plan ${randomMonths}-miesięczny VIP!`,
      `${name} zasubskrybował na ${randomMonths} ${randomMonths === 1 ? 'miesiąc' : 'miesiące'}!`
    ]
    return { message: messages[Math.floor(Math.random() * messages.length)], name }
  }, [getRandomName])

  const getNewFanMessage = useCallback(() => {
    const name = getRandomName()
    const messages = [
      `${name} właśnie dołączył do grona fanów!`,
      `${name} został moim nowym fanem - cześć!`,
      `${name} też już jest moim fanem!`,
      `${name} obserwuje profil - witaj!`
    ]
    return { message: messages[Math.floor(Math.random() * messages.length)], name }
  }, [getRandomName])

  const getViewersMessage = useCallback(() => {
    const count = generateRandomViewers()
    const messages = [
      `W tej chwili profil ogląda ${count} osób!`,
      `Aktualnie online: ${count} fanów.`,
      `Teraz ogląda nas ${count} widzów.`,
      `Profil ma teraz ${count} aktywnych użytkowników!`
    ]
    return { message: messages[Math.floor(Math.random() * messages.length)], name: '' }
  }, [generateRandomViewers])

  const [messages, setMessages] = useState<ActivityMessage[]>([
    {
      id: 'online',
      type: 'online',
      message: 'Maja jest właśnie online',
      icon: <Wifi className="w-4 h-4" />,
      color: 'text-green-400',
      priority: 'high',
      probability: 0.8
    },
    {
      id: 'viewers',
      type: 'viewers',
      message: getViewersMessage().message,
      icon: <Users className="w-4 h-4" />,
      color: 'text-neon-pink',
      priority: 'medium',
      probability: 0.9
    },
    {
      id: 'ebookPurchase',
      type: 'ebookPurchase',
      message: getEbookPurchaseMessage().message,
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-yellow-400',
      priority: 'high',
      probability: 0.4,
      userName: getRandomName()
    },
    {
      id: 'vipSubscription',
      type: 'vipSubscription',
      message: getVipSubscriptionMessage().message,
      icon: <UserPlus className="w-4 h-4" />,
      color: 'text-green-400',
      priority: 'high',
      probability: 0.7,
      userName: getRandomName()
    },
    {
      id: 'vipSubscriptionMonths',
      type: 'vipSubscriptionMonths',
      message: getVipSubscriptionMonthsMessage().message,
      icon: <Crown className="w-4 h-4" />,
      color: 'text-purple-400',
      priority: 'high',
      probability: 0.3,
      userName: getRandomName()
    },
    {
      id: 'newFan',
      type: 'newFan',
      message: getNewFanMessage().message,
      icon: <UserPlus className="w-4 h-4" />,
      color: 'text-pink-400',
      priority: 'medium',
      probability: 0.6,
      userName: getRandomName()
    }
  ])

  useEffect(() => {
    const scheduleNextMessage = () => {
      const timeout = setTimeout(() => {
        if (!isSilentPeriod && !isBurstMode && shouldTriggerSilentPeriod()) {
          setIsSilentPeriod(true)
          const duration = getSilentPeriodDuration()
          setNextInterval(duration)

          setTimeout(() => {
            setIsSilentPeriod(false)
          }, duration)

          scheduleNextMessage()
          return
        }

        if (isSilentPeriod) {
          scheduleNextMessage()
          return
        }

        if (!isBurstMode && shouldTriggerBurst()) {
          setIsBurstMode(true)
          setBurstCount(2 + Math.floor(Math.random() * 2))
          setNextInterval(8000)
        } else if (isBurstMode && burstCount > 0) {
          setBurstCount(prev => prev - 1)
          setNextInterval(5000 + Math.random() * 5000)
        } else if (isBurstMode && burstCount <= 0) {
          setIsBurstMode(false)
          setNextInterval(getRandomInterval())
        } else {
          setNextInterval(getRandomInterval())
        }

        let nextIndex = currentMessageIndex
        let attempts = 0
        let isLogicallyValid = true

        do {
          nextIndex = Math.floor(Math.random() * messages.length)
          attempts++

          const message = messages[nextIndex]
          isLogicallyValid = true

          if (isMajaOnline && (message.type === 'online' && message.message.includes('offline'))) {
            isLogicallyValid = false
          }

        } while (
          attempts < 15 &&
          (!shouldShowMessage(messages[nextIndex].probability) || !isLogicallyValid) &&
          nextIndex !== currentMessageIndex
        )

        setCurrentMessageIndex(nextIndex)

        if (Math.random() > 0.85) {
          setMessages(prev => prev.map(msg => {
            if (msg.type === 'viewers') {
              const viewerData = getViewersMessage()
              return { ...msg, message: viewerData.message }
            }
            if (msg.type === 'ebookPurchase') {
              const data = getEbookPurchaseMessage()
              return { ...msg, message: data.message, userName: data.name }
            }
            if (msg.type === 'vipSubscription') {
              const data = getVipSubscriptionMessage()
              return { ...msg, message: data.message, userName: data.name }
            }
            if (msg.type === 'vipSubscriptionMonths') {
              const data = getVipSubscriptionMonthsMessage()
              return { ...msg, message: data.message, userName: data.name }
            }
            if (msg.type === 'newFan') {
              const data = getNewFanMessage()
              return { ...msg, message: data.message, userName: data.name }
            }
            if (msg.type === 'online') {
              return {
                ...msg,
                message: isMajaOnline ? 'Maja jest właśnie online' : 'Maja jest teraz offline',
                color: isMajaOnline ? 'text-green-400' : 'text-red-400'
              }
            }
            return msg
          }))
        }

        scheduleNextMessage()
      }, nextInterval)

      return timeout
    }

    const timeout = scheduleNextMessage()
    return () => clearTimeout(timeout)
  }, [currentMessageIndex, nextInterval, isBurstMode, burstCount, isSilentPeriod, isMajaOnline, messages, getRandomInterval, getSilentPeriodDuration, shouldTriggerBurst, shouldTriggerSilentPeriod, shouldShowMessage, getViewersMessage, getEbookPurchaseMessage, getVipSubscriptionMessage, getVipSubscriptionMonthsMessage, getNewFanMessage])

  const currentMessage = messages[currentMessageIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 sm:py-3 md:px-6 lg:px-8"
    >
      {/* Enhanced Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-purple-500/10 to-neon-pink/10 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-dark-900/60 sm:bg-dark-900/40 backdrop-blur-xl"></div>

      {/* Subtle glow effect at the bottom */}
      <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-sm"></div>

      {/* Animated flowing border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-400/40 via-neon-pink/60 to-cyan-400/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          {/* Live Activity Display - Direct on top bar */}
          <div className="flex items-center gap-2 sm:gap-3 max-w-[95vw]">
            {/* Current Activity Message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 min-w-0 flex-1"
              >
                {/* Avatar or Icon */}
                <div className="flex-shrink-0">
                  {(currentMessage.type === 'ebookPurchase' ||
                    currentMessage.type === 'vipSubscription' ||
                    currentMessage.type === 'vipSubscriptionMonths' ||
                    currentMessage.type === 'newFan') && currentMessage.userName ? (
                    <motion.div
                      animate={currentMessage.priority === 'high' ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white ${getAvatarColor(currentMessage.userName)} shadow-lg`}
                    >
                      {getInitials(currentMessage.userName)}
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={currentMessage.priority === 'high' ? {
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`${currentMessage.color} ${currentMessage.priority === 'high' ? 'bg-white/10 p-1 rounded-full' : ''}`}
                    >
                      {currentMessage.icon}
                    </motion.div>
                  )}
                </div>

                {/* Message Text */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <p className="text-[11px] sm:text-sm text-white/90 font-medium truncate">
                    {currentMessage.message}
                  </p>

                  {/* HOT Badge for high priority */}
                  {currentMessage.priority === 'high' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }}
                      className="flex-shrink-0 relative"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-red-500 blur-md opacity-60 rounded-full"></div>

                      {/* Badge */}
                      <div className="relative inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-neon-pink via-red-500 to-orange-500 border border-white/30 shadow-lg">
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.6, 1]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        ></motion.div>
                        <span className="text-[10px] sm:text-xs text-white font-black uppercase tracking-wide drop-shadow-md">HOT</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Control Buttons */}
            <div className="hidden sm:flex items-center gap-1 ml-1 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-gray-700/30 hover:bg-gray-600/60 transition-all duration-200 hover:scale-110"
                title="Minimize"
                aria-label="Minimize widget"
              >
                <Minimize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle glow effect behind the activity bar */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-neon-pink/10 to-purple-400/10 blur-2xl opacity-50 -z-10 pointer-events-none"></div>
      </div>

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none"></div>
    </motion.div>
  )
}

export default TopBar