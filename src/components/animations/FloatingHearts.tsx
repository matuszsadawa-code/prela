import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: 'gradient' | 'solid' | 'outline'
  color: string
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Generuj serduszka
    const generateHearts = () => {
      const newHearts: Heart[] = []
      const heartCount = 20 // Zwiększona liczba serduszek

      const heartTypes: Array<'gradient' | 'solid' | 'outline'> = ['gradient', 'solid', 'outline']
      const colors = ['#ff0080', '#ec4899', '#8b5cf6', '#06b6d4', '#f472b6']

      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100, // Pozycja X w procentach
          y: Math.random() * 100, // Pozycja Y w procentach
          size: Math.random() * 25 + 12, // Rozmiar od 12px do 37px
          duration: Math.random() * 12 + 6, // Czas animacji od 6s do 18s
          delay: Math.random() * 8, // Opóźnienie od 0s do 8s
          opacity: Math.random() * 0.3 + 0.05, // Przezroczystość od 0.05 do 0.35
          type: heartTypes[Math.floor(Math.random() * heartTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setHearts(newHearts)
    }

    generateHearts()

    // Regeneruj serduszka co 30 sekund dla większej dynamiki
    const interval = setInterval(generateHearts, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [-30, -60, -30, 0],
              x: [-15, 15, -15, 0],
              rotate: [-10, 10, -10, 0],
              scale: [0.6, 1.4, 0.8, 1.0],
              opacity: [0, heart.opacity, heart.opacity, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          >
            {/* Serduszko z gradientem neonowym i efektami */}
            <div
              className="relative"
              style={{
                filter: `drop-shadow(0 0 ${heart.size * 0.3}px rgba(255, 0, 128, 0.8)) drop-shadow(0 0 ${heart.size * 0.6}px rgba(139, 92, 246, 0.4))`,
              }}
            >
              {/* Dodatkowy efekt świecenia w tle */}
              <div
                className="absolute inset-0 rounded-full blur-sm"
                style={{
                  background: `radial-gradient(circle, rgba(255, 0, 128, ${heart.opacity * 0.5}) 0%, transparent 70%)`,
                  transform: 'scale(1.5)',
                }}
              />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full relative z-10"
                style={{ width: heart.size, height: heart.size }}
              >
                <defs>
                  <linearGradient id={`heartGradient${heart.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff0080" />
                    <stop offset="30%" stopColor="#ec4899" />
                    <stop offset="60%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id={`glow${heart.id}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill={
                    heart.type === 'gradient'
                      ? `url(#heartGradient${heart.id})`
                      : heart.type === 'solid'
                        ? heart.color
                        : 'none'
                  }
                  stroke={heart.type === 'outline' ? heart.color : 'rgba(255, 0, 128, 0.9)'}
                  strokeWidth={heart.type === 'outline' ? '1.5' : '0.3'}
                  filter={`url(#glow${heart.id})`}
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FloatingHearts
