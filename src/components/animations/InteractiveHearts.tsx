import React, { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface InteractiveHeart {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  isActive: boolean
}

const InteractiveHearts: React.FC = () => {
  const [hearts, setHearts] = useState<InteractiveHeart[]>([])
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    // Generuj serduszka interaktywne
    const generateHearts = () => {
      const newHearts: InteractiveHeart[] = []
      const heartCount = 8 // Mniej serduszek, ale bardziej interaktywnych

      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 90 + 5, // Pozycja X od 5% do 95%
          y: Math.random() * 80 + 10, // Pozycja Y od 10% do 90%
          size: Math.random() * 30 + 20, // Rozmiar od 20px do 50px
          opacity: Math.random() * 0.4 + 0.2, // Przezroczystość od 0.2 do 0.6
          color: ['#ff0080', '#ec4899', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 4)],
          isActive: false,
        })
      }
      setHearts(newHearts)
    }

    generateHearts()

    // Dodaj listener scroll
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Aktywuj serduszka na podstawie scroll
  useEffect(() => {
    setHearts(prevHearts => 
      prevHearts.map(heart => ({
        ...heart,
        isActive: scrollY > heart.y * 10, // Aktywuj gdy scroll przekroczy pozycję
      }))
    )
  }, [scrollY])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          initial={{
            scale: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            scale: heart.isActive ? [1, 1.3, 1] : 0.5,
            rotate: heart.isActive ? [0, 360] : 0,
            opacity: heart.isActive ? heart.opacity : heart.opacity * 0.3,
            y: heart.isActive ? [-10, -20, -10] : 0,
          }}
          transition={{
            duration: 2,
            repeat: heart.isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              filter: `drop-shadow(0 0 ${heart.size * 0.4}px ${heart.color}80)`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: heart.size, height: heart.size }}
            >
              <defs>
                <radialGradient id={`interactiveGradient${heart.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={heart.color} />
                  <stop offset="100%" stopColor={heart.color + '40'} />
                </radialGradient>
              </defs>
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={`url(#interactiveGradient${heart.id})`}
                stroke={heart.color}
                strokeWidth="1"
              />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default InteractiveHearts
