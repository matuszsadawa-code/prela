import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

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

/**
 * OPTIMIZED: Floating hearts with GPU acceleration and simplified effects.
 * Performance improvements:
 * - Reduced from 20 to 12 hearts
 * - Removed expensive SVG filters (feGaussianBlur)
 * - Added GPU acceleration
 * - Simplified animations (no scale)
 * - React.memo for less re-renders
 */
const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Generuj serduszka
    const generateHearts = () => {
      const newHearts: Heart[] = []
      const heartCount = 12 // Reduced from 20 for performance

      const heartTypes: Array<'gradient' | 'solid' | 'outline'> = ['gradient', 'solid', 'outline']
      const colors = ['#ff0080', '#ec4899', '#8b5cf6', '#06b6d4', '#f472b6']

      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 12, // Slightly smaller max
          duration: Math.random() * 10 + 8, // Longer, slower animations
          delay: Math.random() * 8,
          opacity: Math.random() * 0.25 + 0.05, // Reduced opacity
          type: heartTypes[Math.floor(Math.random() * heartTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setHearts(newHearts)
    }

    generateHearts()

    // Regeneruj serduszka co 30 sekund
    const interval = setInterval(generateHearts, 30000)
    return () => clearInterval(interval)
  }, [])

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) return null

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
              // GPU ACCELERATION
              willChange: 'transform, opacity',
              transform: 'translate3d(0, 0, 0)',
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: [-20, -40, -20, 0],
              x: [-10, 10, -10, 0],
              rotate: [-8, 8, -8, 0],
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
            {/* Simplified heart - NO expensive SVG filters */}
            <div
              className="relative"
              style={{
                filter: `drop-shadow(0 0 ${heart.size * 0.25}px rgba(255, 0, 128, 0.6))`,
              }}
            >
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
                  stroke={heart.type === 'outline' ? heart.color : 'rgba(255, 0, 128, 0.8)'}
                  strokeWidth={heart.type === 'outline' ? '1.5' : '0.2'}
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(FloatingHearts)

