import React from 'react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-16 py-8 px-4 md:px-6 lg:px-8"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand name with gradient text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold via-neon-pink to-purple-400 bg-clip-text text-transparent">
              social.club
            </h3>
            
            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-neon-pink/20 to-purple-400/20 blur-xl opacity-50 -z-10"></div>
          </motion.div>

          {/* Copyright text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center"
          >
            <p className="text-sm md:text-base text-gray-300/80 font-medium">
              Wszystkie prawa zastrzeżone 2025
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        
        {/* Floating particles effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: '50%',
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none"></div>
    </motion.footer>
  )
}

export default Footer