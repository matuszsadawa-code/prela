import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Heart, Star } from 'lucide-react'
import AudioPlayer from '../ui/AudioPlayer'

interface Testimonial {
  id: string
  platform: 'whatsapp' | 'telegram' | 'onlyfans'
  message: string
  time: string
  rating?: number
  type: 'text' | 'audio'
  audioData?: {
    title: string
    description: string
    duration: string
    name: string
  }
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      platform: 'whatsapp',
      message: "Nie wierzyłem, że odpisujesz, aż dostałem to wideo o 3 w nocy... 🔥",
      time: "3:24 AM",
      rating: 5,
      type: 'text'
    },
    {
      id: '2',
      platform: 'telegram',
      message: "",
      time: "11:45 PM",
      rating: 5,
      type: 'audio',
      audioData: {
        title: "Wiadomość głosowa od Michała",
        description: "Opinia o prywatnych treściach",
        duration: "0:42",
        name: "Michał z Warszawy"
      }
    },
    {
      id: '3',
      platform: 'onlyfans',
      message: "Najlepsza inwestycja tego roku. Laura, jesteś wyjątkowa ❤️",
      time: "2:15 PM",
      rating: 5,
      type: 'text'
    },
    {
      id: '4',
      platform: 'whatsapp',
      message: "",
      time: "9:30 PM",
      rating: 5,
      type: 'audio',
      audioData: {
        title: "Wiadomość głosowa od Pawła",
        description: "Reakcja na nocne wideo",
        duration: "0:38",
        name: "Paweł z Krakowa"
      }
    },
    {
      id: '5',
      platform: 'telegram',
      message: "VIP kanał to najlepsze co mi się przytrafiło. Worth every penny!",
      time: "7:22 AM",
      rating: 5,
      type: 'text'
    },
    {
      id: '6',
      platform: 'onlyfans',
      message: "",
      time: "10:18 PM",
      rating: 5,
      type: 'audio',
      audioData: {
        title: "Wiadomość głosowa od Jakuba",
        description: "Opinia o codziennych rozmowach",
        duration: "0:51",
        name: "Jakub z Gdańska"
      }
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5 text-green-500" />
      case 'telegram':
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'onlyfans':
        return <Heart className="w-5 h-5 text-neon-pink" />
      default:
        return <MessageCircle className="w-5 h-5" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return 'from-green-500/20 to-green-600/20 border-green-500/30'
      case 'telegram':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
      case 'onlyfans':
        return 'from-neon-pink/20 to-neon-purple/20 border-neon-pink/30'
      default:
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
    }
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-neon-pink/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Heart 1 */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: -50 }}
            animate={{
              opacity: [0, 0.6, 0.8, 0.4, 0],
              y: [-100, -200, -300, -400, -500],
              x: [-50, 20, -30, 50, -20],
              rotate: [0, 15, -10, 25, -15]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: 0,
              ease: "easeInOut"
            }}
            className="absolute top-full left-1/4"
          >
            <Heart className="w-6 h-6 text-neon-pink/60 fill-current animate-heart-glow" />
          </motion.div>

          {/* Heart 2 */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: 50 }}
            animate={{
              opacity: [0, 0.7, 0.9, 0.5, 0],
              y: [-100, -250, -350, -450, -550],
              x: [50, -20, 40, -30, 60],
              rotate: [0, -20, 10, -25, 20]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: 3,
              ease: "easeInOut"
            }}
            className="absolute top-full right-1/3"
          >
            <Heart className="w-8 h-8 text-neon-purple/50 fill-current animate-heart-pulse" />
          </motion.div>

          {/* Heart 3 */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: 0 }}
            animate={{
              opacity: [0, 0.5, 0.7, 0.3, 0],
              y: [-100, -180, -280, -380, -480],
              x: [0, 30, -40, 20, -10],
              rotate: [0, 10, -15, 20, -5]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 6,
              ease: "easeInOut"
            }}
            className="absolute top-full left-1/2"
          >
            <Heart className="w-5 h-5 text-pink-400/70 fill-current animate-heart-float" />
          </motion.div>

          {/* Heart 4 */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: -30 }}
            animate={{
              opacity: [0, 0.8, 0.6, 0.4, 0],
              y: [-100, -220, -320, -420, -520],
              x: [-30, 40, -20, 50, -40],
              rotate: [0, 25, -20, 15, -30]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: 9,
              ease: "easeInOut"
            }}
            className="absolute top-full right-1/4"
          >
            <Heart className="w-7 h-7 text-neon-pink/40 fill-current animate-heart-glow" />
          </motion.div>

          {/* Small floating hearts */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0, 0.3, 0.5, 0.2, 0],
              y: [-50, -150, -250, -350, -450],
              x: [10, -15, 25, -20, 30]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: 2,
              ease: "linear"
            }}
            className="absolute top-full left-1/6"
          >
            <Heart className="w-4 h-4 text-purple-300/60 fill-current" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0, 0.4, 0.6, 0.3, 0],
              y: [-50, -180, -280, -380, -480],
              x: [-10, 20, -25, 15, -30]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              delay: 5,
              ease: "linear"
            }}
            className="absolute top-full right-1/6"
          >
            <Heart className="w-4 h-4 text-pink-300/50 fill-current" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 glow-text">
            Co mówią o mnie
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Prawdziwe wiadomości od prawdziwych fanów. Zobacz, dlaczego nie mogą się bez mnie obejść.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Decorative elements around testimonials */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Sparkle effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -left-8 w-4 h-4 bg-neon-pink/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.7, 0.2],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-12 w-3 h-3 bg-neon-purple/40 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.9, 0.4],
                rotate: [0, 90, 180]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 2,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -left-10 w-5 h-5 bg-pink-400/25 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [180, 270, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeInOut"
              }}
              className="absolute -bottom-8 -right-6 w-6 h-6 bg-purple-300/20 rounded-full blur-sm"
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {testimonials[currentIndex].type === 'audio' ? (
                /* Audio Testimonial */
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {getPlatformIcon(testimonials[currentIndex].platform)}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {testimonials[currentIndex].audioData?.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].time} • {testimonials[currentIndex].platform}
                    </p>
                  </div>

                  <AudioPlayer
                    title={testimonials[currentIndex].audioData?.title || ""}
                    description={testimonials[currentIndex].audioData?.description || ""}
                    duration={testimonials[currentIndex].audioData?.duration || "0:45"}
                    className="relative"
                  />

                  {/* Rating for audio */}
                  {testimonials[currentIndex].rating && (
                    <div className="flex justify-center mt-6">
                      <div className="flex items-center gap-1 bg-dark-700/50 px-4 py-2 rounded-full">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Text Testimonial - Phone Mockup */
                <div className="bg-dark-800 rounded-3xl p-6 max-w-md mx-auto shadow-2xl border border-gray-700">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-600">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(testimonials[currentIndex].platform)}
                      <div>
                        <h3 className="text-white font-semibold">Laura</h3>
                        <p className="text-green-400 text-sm">● Online</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonials[currentIndex].time}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-4">
                    {/* Laura's message (placeholder) */}
                    <div className="flex justify-end">
                      <div className="bg-neon-pink/20 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                        <p className="text-sm">Hey babe 😘</p>
                      </div>
                    </div>

                    {/* Fan's response */}
                    <div className="flex justify-start">
                      <div className={`
                        bg-gradient-to-r ${getPlatformColor(testimonials[currentIndex].platform)}
                        text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-xs
                      `}>
                        <p className="text-sm">{testimonials[currentIndex].message}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    {testimonials[currentIndex].rating && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1 bg-dark-700 px-3 py-2 rounded-full">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-neon-pink scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-pink mb-2">98%</div>
            <div className="text-gray-400">Zadowolonych fanów</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-purple mb-2">24/7</div>
            <div className="text-gray-400">Odpowiadam na wiadomości</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-pink mb-2">5★</div>
            <div className="text-gray-400">Średnia ocena</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 backdrop-blur-sm rounded-2xl p-8 border border-neon-pink/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold mb-4 text-white">
              Dołącz do zadowolonych fanów
            </h3>
            <p className="text-gray-300 mb-6">
              Nie czekaj - każda chwila to stracona okazja na niezapomniane doświadczenia.
            </p>
            <button className="neon-button px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
              Zacznij swoją przygodę
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
