import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

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
}

/**
 * OPTIMIZED: Floating crypto icons - MASSIVELY simplified for performance.
 * Performance improvements:
 * - Reduced from 15 to 8 icons
 * - REMOVED ALL SVG filters (feGaussianBlur) - massive performance gain
 * - Simplified SVG shapes - no complex gradients
 * - Added GPU acceleration with will-change
 * - Removed scale animations
 * - React.memo for reduced re-renders
 */
const FloatingCryptoIcons: React.FC = () => {
  const [icons, setIcons] = useState<CryptoIcon[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: CryptoIcon[] = []
      const iconCount = 8 // Reduced from 15

      const iconTypes: Array<'bitcoin' | 'ethereum' | 'blockchain' | 'dollar' | 'chart' | 'diamond'> =
        ['bitcoin', 'ethereum', 'blockchain', 'dollar', 'chart', 'diamond']

      const colors = ['#f7931a', '#627eea', '#ffd700', '#ffb300', '#ff8f00', '#e65100']

      for (let i = 0; i < iconCount; i++) {
        newIcons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 14,
          duration: Math.random() * 12 + 10,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.2 + 0.1,
          type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setIcons(newIcons)
    }

    generateIcons()
    const interval = setInterval(generateIcons, 35000)
    return () => clearInterval(interval)
  }, [])

  // Simplified icon rendering - just Unicode symbols for max performance
  const renderIcon = (icon: CryptoIcon) => {
    const iconMap = {
      bitcoin: '₿',
      ethereum: 'Ξ',
      blockchain: '⛓',
      dollar: '$',
      chart: '📈',
      diamond: '💎',
    }

    return (
      <div
        className="font-bold"
        style={{
          color: icon.color,
          fontSize: `${icon.size}px`,
        }}
      >
        {iconMap[icon.type]}
      </div>
    )
  }

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) return null

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
              opacity: icon.opacity,
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
              y: [-30, -60, -30, 0],
              x: [-15, 15, -15, 0],
              rotate: [-12, 12, -12, 0],
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
            {/* Simplified rendering with CSS filter instead of SVG */}
            <div
              className="relative"
              style={{
                filter: `drop-shadow(0 0 ${icon.size * 0.3}px ${icon.color}80)`,
              }}
            >
              {renderIcon(icon)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(FloatingCryptoIcons)