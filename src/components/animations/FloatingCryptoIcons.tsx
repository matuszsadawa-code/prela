import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CryptoIcon {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: 'bitcoin' | 'ethereum' | 'blockchain' | 'dollar' | 'chart' | 'diamond'
  color: string
  glowIntensity: number
}

const FloatingCryptoIcons: React.FC = () => {
  const [icons, setIcons] = useState<CryptoIcon[]>([])

  useEffect(() => {
    // Generuj ikony crypto
    const generateIcons = () => {
      const newIcons: CryptoIcon[] = []
      const iconCount = 15 // Mniej ikon niż serduszek, żeby nie przytłoczyć

      const iconTypes: Array<'bitcoin' | 'ethereum' | 'blockchain' | 'dollar' | 'chart' | 'diamond'> = 
        ['bitcoin', 'ethereum', 'blockchain', 'dollar', 'chart', 'diamond']
      
      // Kolory nawiązujące do crypto i motywu gold/dark
      const colors = ['#f7931a', '#627eea', '#ffd700', '#ffb300', '#ff8f00', '#e65100']

      for (let i = 0; i < iconCount; i++) {
        newIcons.push({
          id: i,
          x: Math.random() * 100, // Pozycja X w procentach
          y: Math.random() * 100, // Pozycja Y w procentach
          size: Math.random() * 20 + 16, // Rozmiar od 16px do 36px
          duration: Math.random() * 15 + 8, // Czas animacji od 8s do 23s
          delay: Math.random() * 10, // Opóźnienie od 0s do 10s
          opacity: Math.random() * 0.25 + 0.1, // Przezroczystość od 0.1 do 0.35
          type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          glowIntensity: Math.random() * 0.8 + 0.3, // Intensywność świecenia
        })
      }
      setIcons(newIcons)
    }

    generateIcons()

    // Regeneruj ikony co 35 sekund
    const interval = setInterval(generateIcons, 35000)
    return () => clearInterval(interval)
  }, [])

  const renderIcon = (icon: CryptoIcon) => {
    const baseProps = {
      viewBox: "0 0 24 24",
      fill: "none",
      className: "w-full h-full relative z-10",
      style: { width: icon.size, height: icon.size }
    }

    switch (icon.type) {
      case 'bitcoin':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`bitcoinGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7931a" />
                <stop offset="50%" stopColor="#ffb300" />
                <stop offset="100%" stopColor="#ff8f00" />
              </linearGradient>
              <filter id={`cryptoGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="12" cy="12" r="10" fill={`url(#bitcoinGradient${icon.id})`} filter={`url(#cryptoGlow${icon.id})`} />
            <path d="M8 10h2V8h1v2h1V8h1v2.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5V17h-1v-1.5h-1V17H9v-1.5H8V14h2v-2H8v-2z" fill="white" />
            <path d="M10 11h3c.5 0 1 .5 1 1s-.5 1-1 1h-3v-2z" fill="#f7931a" />
            <path d="M10 9h2.5c.5 0 1-.5 1-1s-.5-1-1-1H10v2z" fill="#f7931a" />
          </svg>
        )

      case 'ethereum':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`ethGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#627eea" />
                <stop offset="50%" stopColor="#8a92b2" />
                <stop offset="100%" stopColor="#454a75" />
              </linearGradient>
              <filter id={`ethGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path d="M12 2L5 12.5L12 16L19 12.5L12 2Z" fill={`url(#ethGradient${icon.id})`} filter={`url(#ethGlow${icon.id})`} />
            <path d="M12 17L5 13.5L12 22L19 13.5L12 17Z" fill={`url(#ethGradient${icon.id})`} opacity="0.8" />
          </svg>
        )

      case 'blockchain':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`blockchainGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#ffb300" />
                <stop offset="100%" stopColor="#ff8f00" />
              </linearGradient>
              <filter id={`blockchainGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect x="2" y="2" width="6" height="6" rx="1" fill={`url(#blockchainGradient${icon.id})`} filter={`url(#blockchainGlow${icon.id})`} />
            <rect x="9" y="2" width="6" height="6" rx="1" fill={`url(#blockchainGradient${icon.id})`} filter={`url(#blockchainGlow${icon.id})`} />
            <rect x="16" y="2" width="6" height="6" rx="1" fill={`url(#blockchainGradient${icon.id})`} filter={`url(#blockchainGlow${icon.id})`} />
            <rect x="2" y="16" width="6" height="6" rx="1" fill={`url(#blockchainGradient${icon.id})`} filter={`url(#blockchainGlow${icon.id})`} />
            <rect x="16" y="16" width="6" height="6" rx="1" fill={`url(#blockchainGradient${icon.id})`} filter={`url(#blockchainGlow${icon.id})`} />
            <line x1="8" y1="5" x2="9" y2="5" stroke={icon.color} strokeWidth="2" />
            <line x1="15" y1="5" x2="16" y2="5" stroke={icon.color} strokeWidth="2" />
            <line x1="5" y1="8" x2="5" y2="16" stroke={icon.color} strokeWidth="2" />
            <line x1="19" y1="8" x2="19" y2="16" stroke={icon.color} strokeWidth="2" />
          </svg>
        )

      case 'dollar':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`dollarGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#ffb300" />
                <stop offset="100%" stopColor="#ff8f00" />
              </linearGradient>
              <filter id={`dollarGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="12" cy="12" r="10" fill={`url(#dollarGradient${icon.id})`} filter={`url(#dollarGlow${icon.id})`} />
            <path d="M12 6v12M9 8h6a2 2 0 0 1 0 4h-4a2 2 0 0 1 0 4h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )

      case 'chart':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`chartGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="50%" stopColor="#00cc6a" />
                <stop offset="100%" stopColor="#009951" />
              </linearGradient>
              <filter id={`chartGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path d="M3 20L9 14L13 18L21 6" stroke={`url(#chartGradient${icon.id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter={`url(#chartGlow${icon.id})`} />
            <circle cx="9" cy="14" r="2" fill={`url(#chartGradient${icon.id})`} />
            <circle cx="13" cy="18" r="2" fill={`url(#chartGradient${icon.id})`} />
            <circle cx="21" cy="6" r="2" fill={`url(#chartGradient${icon.id})`} />
          </svg>
        )

      case 'diamond':
        return (
          <svg {...baseProps}>
            <defs>
              <linearGradient id={`diamondGradient${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e1f5fe" />
                <stop offset="30%" stopColor="#81d4fa" />
                <stop offset="60%" stopColor="#29b6f6" />
                <stop offset="100%" stopColor="#0277bd" />
              </linearGradient>
              <filter id={`diamondGlow${icon.id}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path d="M6 9L12 3L18 9L12 21L6 9Z" fill={`url(#diamondGradient${icon.id})`} filter={`url(#diamondGlow${icon.id})`} />
            <path d="M6 9L12 15L18 9H6Z" fill="rgba(255,255,255,0.3)" />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              fontSize: `${icon.size}px`,
              opacity: icon.opacity,
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [-40, -80, -40, 0],
              x: [-20, 20, -20, 0],
              rotate: [-15, 15, -15, 0],
              scale: [0.5, 1.2, 0.9, 1.0],
              opacity: [0, icon.opacity, icon.opacity, 0],
            }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          >
            {/* Ikona crypto z efektami świetlnymi */}
            <div
              className="relative"
              style={{
                filter: `drop-shadow(0 0 ${icon.size * 0.4}px ${icon.color}80) drop-shadow(0 0 ${icon.size * 0.8}px ${icon.color}40)`,
              }}
            >
              {/* Dodatkowy efekt świecenia w tle */}
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  background: `radial-gradient(circle, ${icon.color}${Math.floor(icon.glowIntensity * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                  transform: 'scale(2)',
                }}
              />
              
              {renderIcon(icon)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FloatingCryptoIcons