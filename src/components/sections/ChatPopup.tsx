import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause } from 'lucide-react'
import voiceMessage from '../../assets/weryfikacja.mp3'

interface ChatPopupProps {
    isNaughty: boolean
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isNaughty }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Show popup after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => setIsPlaying(false)
        }
    }, [isVisible])

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsVisible(false)
        if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        // If clicking the play button element or its container, don't redirect
        if ((e.target as HTMLElement).closest('.audio-control')) {
            return;
        }

        // Scroll to the Secret Message section or VIP
        const secretMessageSection = document.getElementById('secret-message-root') || document.querySelector('.secret-message-container')
        if (secretMessageSection) {
            secretMessageSection.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.location.href = '/vip-access'
        }
    }

    const toggleAudio = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    className="fixed top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col items-end gap-2 max-w-[320px]"
                >
                    {/* Message Bubble */}
                    <motion.div
                        onClick={handleClick}
                        className={`relative p-4 rounded-2xl rounded-br-none shadow-2xl cursor-pointer backdrop-blur-md border border-white/10 group ${isNaughty
                            ? "bg-red-900/90 hover:bg-red-800/90"
                            : "bg-purple-900/90 hover:bg-purple-800/90"
                            }`}
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute -top-2 -left-2 p-1 bg-gray-800 rounded-full text-white/70 hover:text-white hover:bg-gray-700 transition-colors z-20"
                        >
                            <X className="w-3 h-3" />
                        </button>

                        <div className="flex items-start gap-3">
                            {/* Live Indicator */}
                            <div className="absolute top-3 right-3 flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isNaughty ? "bg-red-400" : "bg-green-400"}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isNaughty ? "bg-red-500" : "bg-green-500"}`}></span>
                                </span>
                            </div>

                            <div className="flex-1 pr-4">
                                <h4 className={`text-sm font-bold mb-1 ${isNaughty ? "text-red-200" : "text-purple-200"}`}>
                                    Maja Lubicz
                                </h4>

                                {/* Audio Player UI */}
                                <div className="flex flex-col gap-2">
                                    <p className="text-white/90 text-xs">
                                        {isNaughty ? "Mam dla Ciebie nagranie... 😈" : "Odsłuchaj wiadomość głosową 🎤"}
                                    </p>

                                    <div className={`flex items-center gap-2 p-2 rounded-xl audio-control ${isNaughty ? "bg-red-950/50" : "bg-purple-950/50"}`}>
                                        <button
                                            onClick={toggleAudio}
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isNaughty
                                                ? "bg-red-500 text-white hover:bg-red-400"
                                                : "bg-purple-500 text-white hover:bg-purple-400"
                                                }`}
                                        >
                                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                                        </button>

                                        {/* Waveform Visualization (Fake) */}
                                        <div className="flex items-center gap-0.5 h-6 flex-1">
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`w-1 rounded-full ${isNaughty ? "bg-red-400" : "bg-purple-400"}`}
                                                    animate={{
                                                        height: isPlaying ? [8, 16, 8] : 8,
                                                        opacity: isPlaying ? 1 : 0.6
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        repeat: Infinity,
                                                        delay: i * 0.1,
                                                        repeatType: "reverse"
                                                    }}
                                                    style={{ height: 8 + Math.random() * 8 }}
                                                />
                                            ))}
                                        </div>

                                        <span className="text-[10px] text-white/70 font-mono">0:15</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <audio ref={audioRef} src={voiceMessage} preload="none" />
                    </motion.div>


                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ChatPopup
