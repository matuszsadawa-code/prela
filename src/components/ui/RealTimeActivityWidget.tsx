import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, UserPlus, Wifi, BookOpen, Crown } from 'lucide-react'

interface ActivityMessage {
  id: string
  type: 'online' | 'viewers' | 'ebookPurchase' | 'fanvueSubscription' | 'newFan' | 'fanvueSubscriptionMonths'
  message: string
  icon: React.ReactNode
  color: string
  priority: 'low' | 'medium' | 'high'
  probability: number
}

const RealTimeActivityWidget: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isBurstMode, setIsBurstMode] = useState(false)
  const [burstCount, setBurstCount] = useState(0)
  const [nextInterval, setNextInterval] = useState(45000) // Następny interwał w ms (45s)
  const [isSilentPeriod, setIsSilentPeriod] = useState(false)
  const [silentDuration, setSilentDuration] = useState(0)
  const [isMajaOnline, setIsMajaOnline] = useState(true)
  const [lastActivityTime, setLastActivityTime] = useState(new Date())

  // Generowanie realistycznych danych
  const generateRandomViewers = () => {
    const hour = new Date().getHours()
    let baseViewers = 25
    let maxViewers = 150

    // Więcej oglądających wieczorem i w nocy
    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
      baseViewers = 45
      maxViewers = 180
    }
    // Mniej oglądających rano
    else if (hour >= 6 && hour <= 12) {
      baseViewers = 15
      maxViewers = 80
    }

    return Math.floor(Math.random() * (maxViewers - baseViewers + 1)) + baseViewers
  }



  // Rozszerzona lista polskich imion (męskich i żeńskich)
  const polishMaleNames = [
    'Michał', 'Paweł', 'Jakub', 'Tomasz', 'Łukasz', 'Adam', 'Mateusz', 'Kamil',
    'Krzysztof', 'Marcin', 'Piotr', 'Bartosz', 'Maciej', 'Dawid', 'Rafał',
    'Sebastian', 'Artur', 'Patryk', 'Damian', 'Grzegorz', 'Wojciech', 'Robert',
    'Daniel', 'Filip', 'Hubert', 'Igor', 'Jan', 'Kacper', 'Konrad', 'Marek',
    'Norbert', 'Oskar', 'Przemysław', 'Radosław', 'Szymon', 'Wiktor', 'Zbigniew'
  ]

  const polishFemaleNames = [
    'Anna', 'Kasia', 'Magda', 'Ola', 'Ania', 'Monika', 'Agnieszka', 'Beata',
    'Dorota', 'Ewa', 'Gosia', 'Iwona', 'Joanna', 'Karolina', 'Lidia', 'Marta',
    'Natalia', 'Patrycja', 'Renata', 'Sylwia', 'Teresa', 'Urszula', 'Weronika',
    'Zuzanna', 'Aleksandra', 'Barbara', 'Claudia', 'Dominika', 'Elżbieta', 'Justyna'
  ]

  const allPolishNames = [...polishMaleNames, ...polishFemaleNames]

  // Rozszerzona lista polskich miast (duże i średnie miasta)
  const polishCities = [
    'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Łódź', 'Katowice',
    'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Toruń', 'Rzeszów',
    'Kielce', 'Gliwice', 'Zabrze', 'Olsztyn', 'Częstochowa', 'Radom', 'Sosnowiec',
    'Tychy', 'Opole', 'Elbląg', 'Płock', 'Dąbrowa Górnicza', 'Ruda Śląska',
    'Rybnik', 'Legnica', 'Koszalin', 'Grudziądz', 'Słupsk', 'Tarnów', 'Jastrzębie-Zdrój'
  ]

  const getRandomName = () => allPolishNames[Math.floor(Math.random() * allPolishNames.length)]
  const getRandomCity = () => polishCities[Math.floor(Math.random() * polishCities.length)]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getTimeBasedActivityMultiplier = () => {
    const hour = new Date().getHours()
    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
      return 1.5
    }
    if (hour >= 6 && hour <= 12) {
      return 0.7
    }
    return 1.0
  }

  const getRandomInterval = () => {
    const baseInterval = 30000 + Math.random() * 90000
    const timeMultiplier = getTimeBasedActivityMultiplier()
    return Math.floor(baseInterval / timeMultiplier)
  }

  const shouldTriggerBurst = () => {
    return Math.random() < 0.05
  }

  const shouldTriggerSilentPeriod = () => {
    const hour = new Date().getHours()
    if ((hour >= 2 && hour <= 6) || (hour >= 6 && hour <= 10)) {
      return Math.random() < 0.25
    }
    return Math.random() < 0.1
  }

  const getSilentPeriodDuration = () => {
    const hour = new Date().getHours()
    if ((hour >= 2 && hour <= 6) || (hour >= 6 && hour <= 10)) {
      return 30000 + Math.random() * 60000
    }
    return 15000 + Math.random() * 30000
  }

  const shouldShowMessage = (probability: number) => {
    const timeMultiplier = getTimeBasedActivityMultiplier()
    return Math.random() < (probability * timeMultiplier)
  }

  const updateOnlineStatus = () => {
    const hour = new Date().getHours()

    let onlineProbability = 0.8
    if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 2)) {
      onlineProbability = 0.95
    } else if (hour >= 6 && hour <= 12) {
      onlineProbability = 0.6
    }

    const shouldBeOnline = Math.random() < onlineProbability

    if (shouldBeOnline !== isMajaOnline) {
        setIsMajaOnline(shouldBeOnline)
      if (!shouldBeOnline) {
        setLastActivityTime(new Date())
      }
    }
  }

  const getEbookPurchaseMessage = () => {
    const name = getRandomName();
    const city = getRandomCity();
    const messages = [
      `🔥 ${name} z ${city} zakupił e-book! Gratulacje!`, `🚀 ${name} (${city}) zainwestował w wiedzę!`, `📚 ${name} kupił przewodnik o krypto!`, `✨ Nowy czytelnik: ${name} z ${city}!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getFanvueSubscriptionMessage = () => {
    const name = getRandomName();
    const messages = [
      `💖 ${name} zasubskrybował do Fanvue! Witamy!`, `🎉 ${name} dołączył do Fanvue!`, `🌟 Nowy subskrybent: ${name}!`, `💕 ${name} został fanem!`, `🔥 ${name} wykupił dostęp Fanvue!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getFanvueSubscriptionMonthsMessage = () => {
    const name = getRandomName();
    const months = [1, 3, 6, 12];
    const randomMonths = months[Math.floor(Math.random() * months.length)];
    const messages = [
      `👑 ${name} wykupił subskrypcję Fanvue na ${randomMonths} miesiące!`, `💎 ${name} subskrybuje Fanvue przez ${randomMonths} miesiące!`, `✨ ${name} wybrał plan ${randomMonths}-miesięczny Fanvue!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getNewFanMessage = () => {
    const name = getRandomName();
    const messages = [
      `❤️ ${name} dołączył do grona fanów!`, `👋 ${name} został nowym fanem!`, `🌟 ${name} jest teraz moim fanem!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getViewersMessage = () => {
    const count = generateRandomViewers();
    const messages = [
      `👀 W tej chwili profil ogląda ${count} osób.`, `🔥 Obecnie online: ${count} fanów.`, `📱 Teraz ogląda nas ${count} widzów.`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const [messages, setMessages] = useState<ActivityMessage[]>([
    {
      id: 'online',
      type: 'online',
      message: isMajaOnline ? 'Maja jest teraz online 🟢' : 'Maja jest offline 🔴',
      icon: <Wifi className="w-4 h-4" />,
      color: isMajaOnline ? 'text-green-400' : 'text-red-400',
      priority: 'high',
      probability: 0.8
    },
    {
      id: 'viewers',
      type: 'viewers',
      message: getViewersMessage(),
      icon: <Users className="w-4 h-4" />,
      color: 'text-neon-pink',
      priority: 'medium',
      probability: 0.9
    },
    {
      id: 'ebookPurchase',
      type: 'ebookPurchase',
      message: getEbookPurchaseMessage(),
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-yellow-400',
      priority: 'high',
      probability: 0.4
    },
    {
      id: 'fanvueSubscription',
      type: 'fanvueSubscription',
      message: getFanvueSubscriptionMessage(),
      icon: <UserPlus className="w-4 h-4" />,
      color: 'text-green-400',
      priority: 'high',
      probability: 0.7
    },
    {
      id: 'fanvueSubscriptionMonths',
      type: 'fanvueSubscriptionMonths',
      message: getFanvueSubscriptionMonthsMessage(),
      icon: <Crown className="w-4 h-4" />,
      color: 'text-purple-400',
      priority: 'high',
      probability: 0.3
    },
    {
      id: 'newFan',
      type: 'newFan',
      message: getNewFanMessage(),
      icon: <UserPlus className="w-4 h-4" />,
      color: 'text-pink-400',
      priority: 'medium',
      probability: 0.6
    }
  ])

  // Realistyczna rotacja komunikatów z dynamicznymi interwałami
  useEffect(() => {
    if (!isVisible || isMinimized) return

    const scheduleNextMessage = () => {
      const timeout = setTimeout(() => {
        // Sprawdź czy rozpocząć okres ciszy
        if (!isSilentPeriod && !isBurstMode && shouldTriggerSilentPeriod()) {
          setIsSilentPeriod(true)
          const duration = getSilentPeriodDuration()
          setSilentDuration(duration)
          setNextInterval(duration)

          // Zakończ okres ciszy po określonym czasie
          setTimeout(() => {
            setIsSilentPeriod(false)
            setSilentDuration(0)
          }, duration)

          scheduleNextMessage()
          return
        }

        // Jeśli jesteśmy w okresie ciszy, pomiń tę iterację
        if (isSilentPeriod) {
          scheduleNextMessage()
          return
        }

        // Sprawdź czy rozpocząć burst aktywności
        if (!isBurstMode && shouldTriggerBurst()) {
          setIsBurstMode(true)
          setBurstCount(2 + Math.floor(Math.random() * 2)) // 2-3 wiadomości w burst
          setNextInterval(8000) // Szybsze interwały podczas burst (8s)
        } else if (isBurstMode && burstCount > 0) {
          setBurstCount(prev => prev - 1)
          setNextInterval(5000 + Math.random() * 5000) // 5-10s podczas burst
        } else if (isBurstMode && burstCount <= 0) {
          setIsBurstMode(false)
          setNextInterval(getRandomInterval())
        } else {
          // Normalna rotacja
          setNextInterval(getRandomInterval())
        }

        // Wybierz następną wiadomość na podstawie prawdopodobieństwa i spójności
        let nextIndex = currentMessageIndex
        let attempts = 0
        let isLogicallyValid = true

        do {
          nextIndex = Math.floor(Math.random() * messages.length)
          attempts++

          // Sprawdź spójność logiczną
          const message = messages[nextIndex]
          isLogicallyValid = true

          // Jeśli Laura jest online, nie pokazuj "ostatnia aktywność" z dużym opóźnieniem
          if (isMajaOnline && (message.type === 'online' && message.message.includes('offline'))) {
            isLogicallyValid = false
          }

        } while (
          attempts < 15 &&
          (!shouldShowMessage(messages[nextIndex].probability) || !isLogicallyValid) &&
          nextIndex !== currentMessageIndex
        )

        setCurrentMessageIndex(nextIndex)

        // Aktualizuj status online/offline co jakiś czas
        if (Math.random() > 0.9) {
          updateOnlineStatus()
        }

        // Aktualizacja losowych wartości z nowymi funkcjami (rzadziej)
        if (Math.random() > 0.85) {
          setMessages(prev => prev.map(msg => {
            if (msg.type === 'viewers') {
              return { ...msg, message: getViewersMessage() }
            }
            if (msg.type === 'ebookPurchase') {
              return { ...msg, message: getEbookPurchaseMessage() }
            }
            if (msg.type === 'fanvueSubscription') {
              return { ...msg, message: getFanvueSubscriptionMessage() }
            }
            if (msg.type === 'fanvueSubscriptionMonths') {
              return { ...msg, message: getFanvueSubscriptionMonthsMessage() }
            }
            if (msg.type === 'newFan') {
              return { ...msg, message: getNewFanMessage() }
            }
            if (msg.type === 'online') {
              return {
                ...msg,
                message: isMajaOnline ? 'Maja jest teraz online 🟢' : 'Maja jest offline 🔴',
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
  }, [isVisible, isMinimized, currentMessageIndex, nextInterval, isBurstMode, burstCount, isSilentPeriod, silentDuration, isMajaOnline, lastActivityTime, messages])

  // Animacje dla komponentu
  const widgetVariants = {
    hidden: {
      opacity: 0,
      x: -100,
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
      x: -100,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  }

  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3
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

  const currentMessage = messages[currentMessageIndex]

  return (
    <AnimatePresence>
      <motion.div
        variants={widgetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed bottom-16 sm:bottom-4 left-4 md:bottom-6 md:left-6 z-40 max-w-[calc(100vw-2rem)] md:max-w-none"
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
              <Wifi className="w-6 h-6" />
            </motion.div>
          ) : (
            // Expanded state - pełny widget
            <div className="p-3 md:p-4">
              {/* Header z przyciskami */}
              <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className={`
                        w-2 h-2 rounded-full
                        ${isSilentPeriod
                          ? 'bg-gray-400'
                          : isBurstMode
                            ? 'bg-red-400'
                            : 'bg-green-400'
                        }
                      `}
                      animate={
                        isSilentPeriod
                          ? { opacity: [0.5, 1, 0.5] }
                          : isBurstMode
                            ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                            : { opacity: [0.7, 1, 0.7] }
                      }
                      transition={{
                        duration: isBurstMode ? 0.6 : 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="text-xs font-semibold activity-header-text uppercase tracking-wide">
                      {isSilentPeriod ? 'Quiet Time' : isBurstMode ? 'High Activity' : 'Live Activity'}
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

              {/* Komunikat z animacją i avatarem */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-start gap-3"
                >
                  {/* Avatar lub ikona */}
                  <div className="flex-shrink-0">
                    {(currentMessage.type === 'ebookPurchase' ||
                      currentMessage.type === 'fanvueSubscription' ||
                      currentMessage.type === 'fanvueSubscriptionMonths' ||
                      currentMessage.type === 'newFan') ? (
                      // Avatar dla powiadomień z użytkownikami
                      <motion.div
                        animate={currentMessage.priority === 'high' ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(255, 0, 128, 0)',
                            '0 0 0 4px rgba(255, 0, 128, 0.3)',
                            '0 0 0 0 rgba(255, 0, 128, 0)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
                          ${getAvatarColor(currentMessage.message.split(' ')[0] || 'User')}
                          shadow-lg
                        `}
                      >
                        {getInitials(currentMessage.message.split(' ')[0] || 'U')}
                      </motion.div>
                    ) : (
                      // Ikona dla innych typów powiadomień
                      <motion.div
                        animate={currentMessage.priority === 'high' ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`
                          ${currentMessage.color} flex-shrink-0 p-1 rounded-full
                          ${currentMessage.priority === 'high' ? 'bg-white/10' : ''}
                        `}
                      >
                        {currentMessage.icon}
                      </motion.div>
                    )}
                  </div>

                  {/* Treść wiadomości */}
                  <motion.div 
                    className="flex-1 min-w-0 activity-content-bg"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.p
                      className="text-sm activity-text-enhanced font-medium leading-tight"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                    >
                      {currentMessage.message}
                    </motion.p>
                    <motion.p 
                      className="text-xs activity-text-secondary mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Teraz
                    </motion.p>

                    {/* Znacznik priorytetu */}
                    {currentMessage.priority === 'high' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full bg-neon-pink/20 border border-neon-pink/30"
                      >
                        <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mr-1 animate-pulse"></div>
                        <span className="text-xs text-neon-pink font-medium">HOT</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicator */}
              <div className="mt-3 flex gap-1">
                {messages.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      h-1 rounded-full transition-all duration-300
                      ${index === currentMessageIndex 
                        ? 'bg-neon-pink flex-1' 
                        : 'bg-gray-600 w-1'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Animated Rainbow Glow Effect - More Subtle */}
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

        {/* Inner Glow Effect - More Subtle */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-2xl opacity-60"></div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RealTimeActivityWidget
