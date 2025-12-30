import React from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

interface SoundToggleProps {
    isSoundEnabled: boolean
    onToggle: () => void
}

/**
 * Sound toggle button component.
 * Displays a speaker icon that can be clicked to toggle sound effects.
 */
const SoundToggle: React.FC<SoundToggleProps> = ({ isSoundEnabled, onToggle }) => {
    return (
        <motion.button
            onClick={onToggle}
            className="group relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border backdrop-blur-md transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSoundEnabled ? "Wyłącz dźwięki" : "Włącz dźwięki"}
        >
            <motion.div
                key={isSoundEnabled ? 'on' : 'off'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                {isSoundEnabled ? (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                ) : (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
            </motion.div>
            <span className="hidden sm:inline text-xs font-medium text-gray-300">
                {isSoundEnabled ? "ON" : "OFF"}
            </span>
        </motion.button>
    )
}

export default SoundToggle
