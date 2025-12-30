import React, { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import SecretMessage from './SecretMessage'
import ChatPopup from './ChatPopup'
import { Sparkles, Heart, Instagram, MessageCircle, Flame, MapPin, User, ShieldCheck } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'
import heroVideo from '../../assets/kling_20251210_Image_to_Video_The_subjec_1306_0.mp4'
import VerificationModal from '../modals/VerificationModal'
import SoundToggle from '../ui/SoundToggle'
import useSoundEffects from '../../hooks/useSoundEffects'
import { LottieHeart } from '../ui/LottieIcons'

const PersonalIntro: React.FC = () => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const [isNaughtyMode, setIsNaughtyMode] = useState(false)
  const [viewerCount, setViewerCount] = useState(47)
  const { isSoundEnabled, toggleSound, playClickSound } = useSoundEffects()

  // Animate viewer count realistically
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        const newCount = prev + change
        return Math.max(35, Math.min(65, newCount)) // Keep between 35-65
      })
    }, 3000 + Math.random() * 2000) // Every 3-5 seconds

    return () => clearInterval(interval)
  }, [])



  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const stats = [
    {
      value: "56kg",
      label: "Waga",
      gradient: "from-blue-400 to-cyan-400",
      link: SOCIAL_LINKS.telegram,
      icon: MessageCircle,
      platform: "Telegram"
    },
    {
      value: "25",
      label: "Lat",
      gradient: "from-pink-400 to-purple-400",
      link: SOCIAL_LINKS.instagram,
      icon: Instagram,
      platform: "Instagram"
    },
    {
      value: "170cm",
      label: "Wzrost",
      gradient: "from-purple-400 to-blue-400",
      link: SOCIAL_LINKS.tiktok,
      icon: null, // TikTok custom
      platform: "TikTok"
    },
    {
      value: "WWA",
      label: "Lokalizacja",
      gradient: "from-cyan-400 to-green-400",
      link: SOCIAL_LINKS.twitter,
      icon: null, // X custom SVG
      platform: "X"
    }
  ]

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 overflow-hidden transition-colors duration-1000">
        {/* Background gradient effects - Dynamic */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent pointer-events-none transition-colors duration-1000 ${isNaughtyMode ? 'via-red-900/20' : 'via-purple-500/5'
          }`} />

        {/* Switch Toggle & Sound Toggle - Floating Top Right */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 flex items-center gap-2">
          <SoundToggle isSoundEnabled={isSoundEnabled} onToggle={toggleSound} />
          <button
            onClick={() => setIsNaughtyMode(!isNaughtyMode)}
            className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${isNaughtyMode
              ? "bg-red-950/40 border-red-500/50 hover:bg-red-900/50"
              : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
          >
            <span className={`text-xl sm:text-2xl transition-transform duration-500 ${isNaughtyMode ? 'rotate-180' : 'rotate-0'}`}>
              {isNaughtyMode ? "😈" : "😇"}
            </span>
            <span className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${isNaughtyMode ? "text-red-200" : "text-white"
              }`}>
              {isNaughtyMode ? "Tryb Niegrzeczny" : "Tryb Grzeczny"}
            </span>

            {/* Glow effect for toggle */}
            {isNaughtyMode && (
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md -z-10 animate-pulse" />
            )}
          </button>
        </div>

        <div className="max-w-5xl w-full mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center space-y-6 sm:space-y-8 relative"
          >
            {/* Avatar */}
            <motion.div
              variants={scaleIn}
              className="relative group"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Pulsing LIVE ring indicator */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-pink-500/50"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -inset-4 rounded-full border border-purple-500/30"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />

                {/* LIVE Badge */}
                <motion.div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center gap-1.5 shadow-lg z-20"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
                </motion.div>

                {/* Avatar container */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white/10 backdrop-blur-sm shadow-2xl">
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-110"
                  />
                </div>

                {/* Viewer count overlay */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-base">👀</span>
                  <motion.span
                    key={viewerCount}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold text-white"
                  >
                    {viewerCount} osób ogląda
                  </motion.span>
                </motion.div>



                {/* Floating particles */}
                <motion.div
                  className="absolute -top-4 -left-4 text-pink-400"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 text-purple-400"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              variants={fadeInUp}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                <span className={`bg-clip-text text-transparent animate-shimmer-text transition-all duration-700 bg-gradient-to-r ${isNaughtyMode
                  ? "from-red-500 via-rose-400 via-pink-300 via-rose-400 to-red-500"
                  : "from-pink-400 via-purple-300 via-blue-300 via-purple-300 to-pink-400"
                  }`}>
                  Maja Lubicz
                </span>
              </h1>

              <div className="flex flex-col items-center gap-2">
                {/* Age & Location */}
                <div className="flex items-center justify-center gap-2 text-gray-300 text-base sm:text-lg md:text-xl">
                  <User className={`w-4 h-4 sm:w-5 sm:h-5 ${isNaughtyMode ? "text-red-500" : "text-pink-400"}`} />
                  <p>25</p>
                  <span className="text-gray-600">|</span>
                  <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${isNaughtyMode ? "text-rose-500" : "text-purple-400"}`} />
                  <p>Warszawa</p>
                </div>

                {/* Verification Badge - Vibrating */}
                <motion.button
                  onClick={() => setIsVerificationModalOpen(true)}
                  className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 cursor-pointer border ${isNaughtyMode
                    ? "bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 border-red-400/40 hover:border-red-300/60"
                    : "bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 border-green-400/40 hover:border-green-300/60"
                    }`}
                  animate={{
                    x: [-1, 1, -1, 1, 0],
                    rotate: [-1, 1, -1, 1, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 ${isNaughtyMode ? "from-red-400 to-rose-400" : "from-green-400 to-emerald-400"
                    }`}></div>

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isNaughtyMode ? "text-red-400" : "text-green-400"}`} />
                  </motion.div>
                  <span className={`text-xs sm:text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent ${isNaughtyMode ? "from-red-300 to-rose-300" : "from-green-300 to-emerald-300"
                    }`}>
                    SPRAWDŹ WERYFIKACJĘ
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed px-2 transition-all duration-500"
            >
              {isNaughtyMode ? (
                <>
                  Kiedy zachodzi słońce, grzeczna studentka idzie spać...<br />
                  a budzi się <span className="text-red-500 font-semibold font-serif italic">Twoja najskrytsza fantazja</span> 😈
                </>
              ) : (
                <>
                  Dzień spędzam nad książkami i studiami,<br />
                  wieczory... to już <span className="text-pink-400 font-semibold">inna historia</span> 💋
                </>
              )}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 w-full max-w-3xl pt-4 sm:pt-6"
            >
              {stats.map((stat, index) => (
                <motion.a
                  key={index}
                  href={stat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                >
                  {/* HOT Badge for Telegram */}
                  {stat.platform === "Telegram" && (
                    <motion.div
                      className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center gap-1 shadow-lg z-20"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Flame className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">HOT</span>
                    </motion.div>
                  )}

                  {/* Glassmorphism card with elegant background */}
                  <div className={`relative p-3.5 sm:p-4 md:p-5 rounded-2xl backdrop-blur-xl transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden ${stat.platform === "Telegram"
                    ? "bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-cyan-900/30 border-2 border-blue-400/40 hover:border-blue-300/60 shadow-blue-500/20"
                    : "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-pink-900/20 border border-white/10 hover:border-white/25"
                    }`}>
                    {/* Subtle animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Glow effect behind card */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />

                    <div className="relative flex flex-col items-center text-center gap-1.5 sm:gap-2 md:gap-2.5">
                      {/* Icon Container with platform-specific styling */}
                      <div className="relative">
                        {stat.platform === "Telegram" && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-400/40 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#2AABEE] to-[#229ED9] rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                              {/* Inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                              {/* Telegram Plane Icon */}
                              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {stat.platform === "Instagram" && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-pink-500/40 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                              {/* Instagram gradient background */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"></div>
                              <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]"></div>
                              {/* Inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                              {/* Instagram Camera Icon */}
                              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {stat.platform === "TikTok" && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-pink-400/40 to-purple-400/40 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                              {/* Premium gradient background */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#00F2EA] via-[#00D9E8] to-[#EE1D52]"></div>
                              {/* Inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                              {/* Simplified Musical Note Icon */}
                              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3v15.5c0 1.38-1.12 2.5-2.5 2.5S14 19.88 14 18.5s1.12-2.5 2.5-2.5c.54 0 1.04.18 1.5.48V7h-10v11.5c0 1.38-1.12 2.5-2.5 2.5S3 19.88 3 18.5 4.12 16 5.5 16c.54 0 1.04.18 1.5.48V5h12v-2z" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {stat.platform === "X" && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/30 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black rounded-xl flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
                              {/* Inner shine */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                              {/* X Logo */}
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Platform name with gradient */}
                      <div className={`text-xs sm:text-sm md:text-base font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                        {stat.platform}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons - Premium Enhanced Design */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl pt-6 sm:pt-8"
            >
              {/* E-book Button */}
              <motion.a
                href="https://example.com/ebook-maja-lubicz"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={playClickSound}
                className="group relative"
              >
                {/* HANDEL KRYPTOWALUT Badge */}
                <motion.div
                  className={`absolute -top-3 -right-3 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 ${isNaughtyMode
                    ? "bg-gradient-to-r from-red-600 to-rose-600"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white uppercase">
                    {isNaughtyMode ? "Tylko dla dorosłych" : "Handel Kryptowalut"}
                  </span>
                </motion.div>
                {/* Outer glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500 -z-10 ${isNaughtyMode ? "from-red-500 via-rose-500 to-pink-500" : "from-fuchsia-500 via-pink-500 to-purple-500"
                  }`}></div>

                {/* Rotating border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: isNaughtyMode
                      ? 'linear-gradient(45deg, #ef4444, #f43f5e, #be123c, #ef4444)'
                      : 'linear-gradient(45deg, #ec4899, #d946ef, #a855f7, #ec4899)',
                    backgroundSize: '300% 300%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                ></motion.div>

                <div className={`relative px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-gradient-to-br transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden m-[2px] ${isNaughtyMode
                  ? "from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500"
                  : "from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:via-pink-500 hover:to-purple-500"
                  }`}>
                  {/* Animated particles overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '50px 50px']
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-2.5 text-center">
                    {/* Icon */}
                    {isNaughtyMode ? (
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    )}

                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {isNaughtyMode ? "KUP DOSTĘP +18" : "KUP E-BOOK"}
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* VIP Access Button - MAIN CTA - Enhanced */}
              <motion.a
                href="https://t.me/+VT55zfE0n4o1MWY0"
                initial={{ opacity: 0, y: 20, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={playClickSound}
                className="group relative sm:col-span-2 lg:col-span-1"
              >
                {/* CONTENT 18+ Badge */}
                <motion.div
                  className={`absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-gradient-to-r flex items-center gap-1 shadow-lg z-20 ${isNaughtyMode ? "from-red-600 to-red-800" : "from-red-500 to-pink-600"
                    }`}
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white uppercase">Content 18+</span>
                </motion.div>

                {/* Super strong outer glow - pulsing */}
                <motion.div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-r blur-xl -z-10 ${isNaughtyMode ? "from-red-600 via-rose-600 to-purple-600" : "from-purple-500 via-violet-500 to-indigo-500"}`}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Animated shimmer border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: isNaughtyMode
                      ? ['linear-gradient(0deg, #dc2626, #be123c)', 'linear-gradient(360deg, #dc2626, #be123c)']
                      : ['linear-gradient(0deg, #8b5cf6, #6366f1)', 'linear-gradient(360deg, #8b5cf6, #6366f1)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                ></motion.div>

                <div className={`relative px-6 py-5 sm:px-8 sm:py-6 rounded-2xl bg-gradient-to-br transition-all duration-500 shadow-2xl hover:shadow-3xl overflow-hidden m-[2px] ${isNaughtyMode
                  ? "from-red-700 via-rose-700 to-purple-800 hover:from-red-600 hover:via-rose-600 hover:to-purple-700"
                  : "from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500"
                  }`}>
                  {/* Diamond pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
                                     repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                    }}></div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-3 text-center">
                    {/* Lottie Heart Icon */}
                    <LottieHeart className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                      {isNaughtyMode ? "ZOSTAŃ MOIM VIP-EM" : "DOSTĘP VIP"}
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* Buy Me Coffee Button */}
              <motion.a
                href="https://buymeacoffee.com/mayalubicz"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={playClickSound}
                className="group relative sm:col-span-2 lg:col-span-1"
              >
                {/* OKAŻ WSPARCIE Badge */}
                <motion.div
                  className={`absolute -top-3 -right-3 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 ${isNaughtyMode
                    ? "bg-gradient-to-r from-rose-500 to-pink-500"
                    : "bg-gradient-to-r from-orange-500 to-amber-500"
                    }`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white uppercase">
                    {isNaughtyMode ? "Spełnij Marzenie" : "Okaż Wsparcie"}
                  </span>
                </motion.div>
                {/* Outer glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500 -z-10 ${isNaughtyMode ? "from-rose-500 via-pink-500 to-purple-500" : "from-orange-500 via-amber-500 to-yellow-500"
                  }`}></div>

                {/* Pulsing warm border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: isNaughtyMode
                      ? 'linear-gradient(to right, #ec4899, #f43f5e)'
                      : 'linear-gradient(to right, #f97316, #d97706)'
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>

                <div className={`relative px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-gradient-to-br transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden m-[2px] ${isNaughtyMode
                  ? "from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500"
                  : "from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500"
                  }`}>
                  {/* Coffee steam/bubbles animation effect */}
                  {isNaughtyMode ? (
                    <div className="absolute top-0 right-1/4 w-full h-full opacity-20 overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 w-2 h-2 bg-white rounded-full"
                        animate={{ y: [-10, -50], opacity: [0, 0.5, 0], x: [0, 5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-2 w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [-10, -60], opacity: [0, 0.5, 0], x: [0, -5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      />
                    </div>
                  ) : (
                    <div className="absolute top-0 left-1/4 w-1 h-full opacity-20">
                      <motion.div
                        className="w-1 h-8 bg-white rounded-full"
                        animate={{
                          y: [0, -20, -40],
                          opacity: [0, 0.5, 0],
                          x: [-2, 2, -2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  )}


                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-2.5 text-center">
                    {/* Coffee Cup Icon / Drink Icon */}
                    {isNaughtyMode ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 21h8m-4-13v13M12 3a7 7 0 0 1 7 7c0 2.22-1.2 4.15-3 5.19V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.81A6.995 6.995 0 0 1 5 10a7 7 0 0 1 7-7Z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                        <motion.path
                          d="M6 2v2M10 2v2M14 2v2"
                          strokeLinecap="round"
                          animate={{
                            y: [0, -2, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </svg>
                    )}

                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {isNaughtyMode ? "POSTAW MI DRINKA" : "POSTAW MI KAWĘ"}
                    </span>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/* Secret Message Simulator */}
            <motion.div
              id="secret-message-root"
              variants={fadeInUp}
              className="w-full secret-message-container"
            >
              <SecretMessage isNaughty={isNaughtyMode} />
            </motion.div>

            {/* Social Media Cards - HIDDEN */}
            {/* ... */}

            <ChatPopup isNaughty={isNaughtyMode} />
            {/* <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-10 w-full max-w-5xl"
          >
            Instagram
            <motion.a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 backdrop-blur-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                <div className="mb-5">
                  <Instagram className="w-12 h-12 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instagram</h3>
                <p className="text-sm text-gray-400 italic">"Mój profil na Instagram"</p>
                <div className="absolute top-3 right-3 p-2 rounded-full bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-pink-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10" />
              </div>
            </motion.a>

            TikTok
            <motion.a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                <div className="mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    TT
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">TikTok</h3>
                <p className="text-sm text-gray-400 italic">"Mój profil na TikTok"</p>
                <div className="absolute top-3 right-3 p-2 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10" />
              </div>
            </motion.a>

            Telegram - WITH HOT BADGE
            <motion.a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 backdrop-blur-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center gap-1 shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="w-3 h-3 text-white" />
                  <span className="text-xs font-bold text-white">HOT</span>
                </motion.div>
                <div className="mb-5">
                  <MessageCircle className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Telegram</h3>
                <p className="text-sm text-gray-400 italic">"Mój profil na Telegram"</p>
                <div className="absolute top-3 right-3 p-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-blue-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10" />
              </div>
            </motion.a>

            X/Twitter
            <motion.a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-500/10 to-gray-700/10 border border-gray-500/20 hover:border-gray-400/40 transition-all duration-300 backdrop-blur-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                <div className="mb-5">
                  <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">X (Twitter)</h3>
                <p className="text-sm text-gray-400 italic">"Obserwuj mnie na X"</p>
                <div className="absolute top-3 right-3 p-2 rounded-full bg-gray-500/20 group-hover:bg-gray-500/30 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-gray-300" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10" />
              </div>
            </motion.a>
          </motion.div> */}
          </motion.div>
        </div>


      </section>

      {/* Verification Modal */}
      <ChatPopup isNaughty={isNaughtyMode} />

      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </>
  )
}

export default PersonalIntro
