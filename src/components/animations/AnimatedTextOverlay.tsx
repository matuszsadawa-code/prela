import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedTextOverlayProps {
  className?: string
}

const AnimatedTextOverlay: React.FC<AnimatedTextOverlayProps> = ({ className = '' }) => {
  const textItems = [
    {
      text: 'NAUKA',
      position: 'top-[15%] left-[8%]',
      delay: 1.0,
      color: 'from-purple-400 via-pink-400 to-purple-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]',
      glowColor: 'rgba(168,85,247,0.8)'
    },
    {
      text: 'TRADING',
      position: 'top-[25%] right-[8%]',
      delay: 1.5,
      color: 'from-yellow-400 via-orange-400 to-yellow-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]',
      glowColor: 'rgba(251,191,36,0.8)'
    },
    {
      text: 'ZABAWA',
      position: 'bottom-[15%] left-[15%]',
      delay: 2.0,
      color: 'from-purple-500 via-violet-500 to-purple-700',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(139,69,193,0.8)]',
      glowColor: 'rgba(139,69,193,0.8)'
    },
    {
      text: 'CRYPTO',
      position: 'top-[45%] left-[5%]',
      delay: 2.5,
      color: 'from-cyan-400 via-blue-400 to-cyan-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]',
      glowColor: 'rgba(34,211,238,0.8)'
    },
    {
      text: 'SYGNAŁY',
      position: 'bottom-[35%] right-[5%]',
      delay: 3.0,
      color: 'from-green-400 via-emerald-400 to-green-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]',
      glowColor: 'rgba(34,197,94,0.8)'
    },
    {
      text: 'E-BOOKI',
      position: 'bottom-[25%] right-[15%]',
      delay: 3.5,
      color: 'from-indigo-400 via-purple-400 to-indigo-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]',
      glowColor: 'rgba(99,102,241,0.8)'
    },
    {
      text: 'PORADNIKI',
      position: 'top-[8%] right-[25%]',
      delay: 4.0,
      color: 'from-rose-400 via-pink-400 to-rose-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(251,113,133,0.8)]',
      glowColor: 'rgba(251,113,133,0.8)'
    },
    {
      text: 'EKSKLUZYWNY CONTENT',
      position: 'bottom-[8%] left-[25%]',
      delay: 4.5,
      color: 'from-amber-400 via-yellow-400 to-amber-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]',
      glowColor: 'rgba(245,158,11,0.8)'
    },
    {
      text: 'VIDEO ROZMOWY',
      position: 'top-[35%] right-[15%]',
      delay: 5.0,
      color: 'from-violet-400 via-purple-400 to-violet-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]',
      glowColor: 'rgba(139,92,246,0.8)'
    },
    {
      text: 'PRYWATNE SESJE',
      position: 'bottom-[45%] left-[25%]',
      delay: 5.5,
      color: 'from-fuchsia-400 via-pink-400 to-fuchsia-600',
      shadowColor: 'drop-shadow-[0_0_15px_rgba(232,121,249,0.8)]',
      glowColor: 'rgba(232,121,249,0.8)'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    scale: [1, 1.05, 1]
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {textItems.map((item, index) => (
        <motion.div
          key={item.text}
          variants={itemVariants}
          className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2`}
          style={{
            perspective: '1000px'
          }}
        >
          {/* Glow effect background */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            style={{
              background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`
            }}
          />

          {/* Elegant glassmorphism background with subtle styling */}
          <motion.div
            animate={floatingAnimation}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay + 1
            }}
            className="relative"
          >
            {/* Subtle glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-yellow-400/5 backdrop-blur-sm rounded-xl border border-yellow-400/25 shadow-lg" />
            
            {/* Text content with enhanced visibility */}
            <motion.span
              className={`
                relative z-20 block px-3 py-1.5 text-sm md:text-base lg:text-lg font-bold
                bg-gradient-to-r ${item.color} bg-clip-text text-transparent
                tracking-wider uppercase whitespace-nowrap
              `}
              style={{
                textShadow: `
                  0 0 15px ${item.glowColor},
                  0 0 30px ${item.glowColor},
                  0 1px 3px rgba(0,0,0,0.5),
                  0 2px 6px rgba(0,0,0,0.3)
                `,
                filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.4))'
              }}
              animate={{
                textShadow: [
                  `0 0 15px ${item.glowColor}, 0 0 30px ${item.glowColor}, 0 1px 3px rgba(0,0,0,0.5)`,
                  `0 0 25px ${item.glowColor}, 0 0 50px ${item.glowColor}, 0 1px 3px rgba(0,0,0,0.5)`,
                  `0 0 15px ${item.glowColor}, 0 0 30px ${item.glowColor}, 0 1px 3px rgba(0,0,0,0.5)`
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay + 0.5
              }}
            >
              {item.text}
            </motion.span>

            {/* Elegant corner accent */}
            <motion.div
              className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay + 1.5
              }}
            />

            {/* Sparkle effects */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full opacity-80"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay + 2
              }}
            />
            
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full opacity-60"
              animate={{
                scale: [0, 1, 0],
                rotate: [360, 180, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay + 2.5
              }}
            />
          </motion.div>

          {/* Particle effects */}
          <motion.div
            className={`absolute top-0 left-1/2 w-1 h-1 bg-gradient-to-r ${item.color} rounded-full`}
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay + 1.5
            }}
          />
        </motion.div>
      ))}

      {/* Additional floating particles for ambiance */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}
    </motion.div>
  )
}

export default AnimatedTextOverlay