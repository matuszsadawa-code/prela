import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useThrottle } from '../../hooks/useThrottle'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Particle {
    id: number
    x: number
    y: number
    size: number
    color: string
    delay: number
    duration: number
}

/**
 * OPTIMIZED: Interactive particles layer with GPU acceleration and throttled mouse events.
 * Performance improvements:
 * - Reduced particle count from 30 to 15
 * - Throttled mouse events to 60fps
 * - GPU acceleration with will-change
 * - Memoized particle generation
 * - Respects prefers-reduced-motion
 */
const ParallaxParticles: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const prefersReducedMotion = useReducedMotion()

    // Memoize particles - only generate once
    const particles = useMemo<Particle[]>(() => {
        const colors = [
            'rgba(236, 72, 153, 0.5)',  // pink
            'rgba(139, 92, 246, 0.5)',  // purple
            'rgba(59, 130, 246, 0.4)',  // blue
            'rgba(6, 182, 212, 0.4)',   // cyan
            'rgba(251, 146, 60, 0.4)',  // orange
        ]

        // Reduced from 30 to 15 for better performance
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1.5, // Slightly smaller
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 5,
        }))
    }, [])

    // Throttled mouse move handler - limits to ~60fps
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        setMousePosition({ x, y })
    }, [])

    const throttledMouseMove = useThrottle(handleMouseMove, 16) // ~60fps

    useEffect(() => {
        if (prefersReducedMotion) return // Respect accessibility

        window.addEventListener('mousemove', throttledMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', throttledMouseMove)
    }, [throttledMouseMove, prefersReducedMotion])

    // Don't render if user prefers reduced motion
    if (prefersReducedMotion) return null

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            {particles.map((particle) => {
                const parallaxX = mousePosition.x * (particle.size * 6) // Reduced multiplier
                const parallaxY = mousePosition.y * (particle.size * 6)

                return (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.size * 1.5}px ${particle.color}`,
                            // GPU ACCELERATION
                            willChange: 'transform, opacity',
                            transform: 'translate3d(0, 0, 0)', // Force GPU layer
                        }}
                        animate={{
                            x: parallaxX,
                            y: [parallaxY, parallaxY - 15, parallaxY],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            x: { duration: 0.2, ease: 'easeOut' },
                            y: {
                                duration: particle.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: particle.delay,
                            },
                            opacity: {
                                duration: particle.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: particle.delay,
                            },
                        }}
                    />
                )
            })}
        </div>
    )
}

export default React.memo(ParallaxParticles)
