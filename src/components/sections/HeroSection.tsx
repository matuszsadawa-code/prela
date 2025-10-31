import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Shield, CheckCircle, Lock, CreditCard, Calendar, MapPin, Circle, Bitcoin, Coins, TrendingUp, Zap, DollarSign } from 'lucide-react'
import heroVideo from '../../assets/video.mp4'

const HeroSection: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const fullText = "W dzień studentka blockchain... w nocy spełniam Twoje najdziksze wyobrażenia."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Próba pobrania lokalizacji użytkownika - obecnie nie używana
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // W rzeczywistej aplikacji użyłbyś reverse geocoding API
          // Na razie używamy statycznej wartości "Polska"
        },
        () => {
          // Obsługa błędu - obecnie nie wymagana
        }
      )
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Trust boosters data for better maintainability and responsive design
  const trustBoosters = [
    {
      icon: CheckCircle,
      text: "Zweryfikowany Twórca",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      ariaLabel: "Profil zweryfikowany przez platformę"
    },
    {
      icon: Shield,
      text: "Wiek zweryfikowany",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      ariaLabel: "Wiek potwierdzony dokumentem tożsamości"
    },
    {
      icon: Lock,
      text: "Gwarancja dyskrecji",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      ariaLabel: "Pełna dyskrecja i prywatność gwarantowana"
    },
    {
      icon: CreditCard,
      text: "Bezpieczne Płatności",
      color: "text-neon-pink",
      bgColor: "bg-neon-pink/10",
      ariaLabel: "Szyfrowane i bezpieczne metody płatności"
    }
  ]

  return (
    <header
      role="banner"
      className="relative min-h-[90vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12"
    >

        {/* Reduced floating particles for better performance */}
        <div className="absolute inset-0 opacity-30" role="img" aria-label="Dekoracyjne animowane elementy">
          <div className="absolute top-[20%] left-[8%] w-2 h-2 sm:w-3 sm:h-3 bg-neon-pink rounded-full animate-float shadow-lg shadow-neon-pink/40"></div>
          <div className="absolute top-[65%] right-[12%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-purple rounded-full animate-float delay-1000 shadow-lg shadow-neon-purple/40"></div>
          <div className="absolute bottom-[25%] left-[15%] w-2 h-2 sm:w-2.5 sm:h-2.5 bg-neon-pink rounded-full animate-float delay-2000 shadow-lg shadow-neon-pink/40"></div>
        </div>

      {/* Optimized main glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-radial from-neon-pink/12 via-neon-purple/6 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Main Content with improved spacing */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-7xl mx-auto w-full">
        {/* Hero Section - Enhanced responsive layout */}
        <section
          aria-labelledby="hero-title"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        >
          {/* Photo Column - Improved responsive behavior */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-end relative"
          >
            {/* Enhanced Photo Container with better touch targets */}
            <div className="relative group cursor-pointer">
              {/* Optimized glow effect with reduced intensity */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse-slow transition-opacity duration-500"></div>

              {/* Responsive photo frame with improved sizing */}
              <div className="relative w-44 h-56 sm:w-52 sm:h-66 md:w-60 md:h-76 lg:w-64 lg:h-80 xl:w-72 xl:h-88 rounded-3xl bg-gradient-to-br from-neon-pink via-purple-500 to-neon-purple p-1.5 group-hover:scale-105 transition-all duration-500 shadow-2xl shadow-neon-pink/25">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center overflow-hidden relative border border-gray-700/25">
                  <video
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent rounded-3xl"></div>

                  {/* Enhanced shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                </div>
              </div>

              {/* Enhanced Verification Badge with better positioning */}
              <div
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-2.5 sm:p-3 rounded-full shadow-xl shadow-green-500/40 animate-bounce-slow border-2 border-green-400/30"
                aria-label="Profil zweryfikowany"
                role="img"
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                <div className="absolute inset-0 bg-green-400/15 rounded-full blur-md animate-pulse"></div>
              </div>

              {/* Optimized floating particles with crypto theme */}
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-float opacity-70 shadow-lg shadow-amber-400/50 flex items-center justify-center" role="img" aria-label="Bitcoin symbol">
                <Bitcoin className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
              </div>
              <div className="absolute bottom-1/4 -right-2 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float delay-1500 opacity-70 shadow-lg shadow-blue-400/50 flex items-center justify-center" role="img" aria-label="Ethereum symbol">
                <Coins className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
              </div>
              
              {/* Additional crypto floating elements */}
              <div className="absolute top-1/3 -left-3 sm:-left-4 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-float delay-500 opacity-60 shadow-lg shadow-green-400/40 flex items-center justify-center" role="img" aria-label="DeFi symbol">
                <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
              </div>
              <div className="absolute top-2/3 -right-1 sm:-right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-float delay-2500 opacity-60 shadow-lg shadow-yellow-400/40 flex items-center justify-center" role="img" aria-label="Lightning Network">
                <Zap className="w-1 h-1 sm:w-1.5 sm:h-1.5 text-white" />
              </div>
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-float delay-3000 opacity-50 shadow-lg shadow-purple-400/40 flex items-center justify-center" role="img" aria-label="Dollar symbol">
                <DollarSign className="w-1 h-1 sm:w-1.5 sm:h-1.5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Text Column - Enhanced responsive typography and spacing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Header Section - Improved responsive typography hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-14"
            >
              <h1
                id="hero-title"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold glow-text relative z-10 bg-gradient-to-r from-white via-neon-pink to-white bg-clip-text text-transparent leading-tight mb-3 sm:mb-4"
              >
                Maja Czereśnia
              </h1>
              {/* Optimized text shadow effect */}
              <h1 className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-neon-pink/12 blur-sm leading-tight" aria-hidden="true">
                Maja Czereśnia
              </h1>

              {/* Enhanced subtitle with better responsive sizing */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium mt-3 sm:mt-4"
              >
                Zweryfikowany profil • Pełnoletnia • Dyskretna
              </motion.p>
            </motion.div>

            {/* Info Cards Section - Enhanced responsive design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-14"
            >
              {/* Section title with improved typography */}
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-5 md:mb-6 text-center lg:text-left">
                Podstawowe informacje
              </h2>

              {/* Optimized background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/4 via-neon-purple/4 to-green-400/4 rounded-2xl blur-xl"></div>

              {/* Enhanced container with better responsive spacing */}
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 bg-gradient-to-r from-dark-800/60 via-dark-700/60 to-dark-800/60 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-xl shadow-neon-pink/8 rainbow-border-animated">
                {/* Age Card - Enhanced responsive design */}
                <div
                  className="flex flex-col items-center text-center p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-neon-pink/10 to-neon-pink/20 hover:bg-neon-pink/30 focus:bg-neon-pink/30 focus:ring-2 focus:ring-neon-pink/30 focus:outline-none transition-all duration-300 group cursor-pointer rainbow-border"
                  role="button"
                  tabIndex={0}
                  aria-label="Wiek: 22 lata"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="relative p-2 sm:p-3 md:p-3.5 rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-pink/50 group-hover:from-neon-pink/40 group-hover:to-neon-pink/60 group-focus:from-neon-pink/40 group-focus:to-neon-pink/60 transition-all duration-300 shadow-lg shadow-neon-pink/25 mb-2 sm:mb-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 group-focus:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-neon-pink via-pink-400 to-neon-pink bg-clip-text text-transparent mb-1">22</span>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">lat</span>
                </div>

                {/* Location Card - Enhanced responsive design */}
                <div
                  className="flex flex-col items-center text-center p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-neon-purple/10 to-neon-purple/20 hover:bg-neon-purple/30 focus:bg-neon-purple/30 focus:ring-2 focus:ring-neon-purple/30 focus:outline-none transition-all duration-300 group cursor-pointer rainbow-border"
                  role="button"
                  tabIndex={0}
                  aria-label="Lokalizacja: Polska"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="relative p-2 sm:p-3 md:p-3.5 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-purple/50 group-hover:from-neon-purple/40 group-hover:to-neon-purple/60 group-focus:from-neon-purple/40 group-focus:to-neon-purple/60 transition-all duration-300 shadow-lg shadow-neon-purple/25 mb-2 sm:mb-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 group-focus:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-neon-purple via-blue-400 to-neon-purple bg-clip-text text-transparent mb-1">Polska</span>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">lokalizacja</span>
                </div>

                {/* Online Status Card - Enhanced responsive design */}
                <div
                  className="flex flex-col items-center text-center p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-green-400/10 to-green-400/20 hover:bg-green-400/30 focus:bg-green-400/30 focus:ring-2 focus:ring-green-400/30 focus:outline-none transition-all duration-300 group cursor-pointer rainbow-border"
                  role="button"
                  tabIndex={0}
                  aria-label="Status: Online"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="relative p-2 sm:p-3 md:p-3.5 rounded-full bg-gradient-to-br from-green-400/30 to-green-400/50 group-hover:from-green-400/40 group-hover:to-green-400/60 group-focus:from-green-400/40 group-focus:to-green-400/60 transition-all duration-300 shadow-lg shadow-green-400/25 mb-2 sm:mb-3">
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-current group-hover:scale-110 group-focus:scale-110 transition-transform duration-300 animate-pulse" />
                  </div>
                  <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-1">Online</span>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">dostępna teraz</span>
                </div>
              </div>
            </motion.div>

            {/* Description Section - Enhanced responsive typewriter text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="relative"
            >
              {/* Section title with improved responsive typography */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 md:mb-5 text-center lg:text-left">
                O mnie
              </h3>

              <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-dark-800/70 via-purple-900/50 to-dark-800/70 backdrop-blur-lg border border-neon-pink/25 hover:border-neon-pink/40 focus-within:border-neon-pink/50 transition-all duration-500 shadow-xl shadow-neon-pink/8">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-playfair italic text-white leading-relaxed text-center lg:text-left">
                  <span
                    className="typewriter border-r-2 border-neon-pink pr-1 sm:pr-2 animate-pulse"
                    aria-label="Opis: W dzień studentka blockchain, w nocy spełniam Twoje najdziksze wyobrażenia"
                  >
                    {typewriterText}
                  </span>
                </p>

                {/* Responsive decorative quote marks */}
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-2xl sm:text-3xl md:text-4xl text-neon-pink/25 font-serif">"</div>
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-2xl sm:text-3xl md:text-4xl text-neon-pink/25 font-serif rotate-180">"</div>
              </div>

              {/* Optimized glow behind text box */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/8 via-neon-purple/8 to-neon-pink/8 rounded-2xl blur-xl -z-10"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust & CTA Section - Enhanced responsive layout */}
        <div className="text-center space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
          {/* Trust Boosters Section - Improved responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="relative"
          >
            {/* Section header with better responsive typography */}
            <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-10">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                Dlaczego warto mi zaufać?
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
                Twoje bezpieczeństwo i prywatność są dla mnie najważniejsze
              </p>
            </div>

            {/* Enhanced trust boosters grid with better responsive behavior */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {trustBoosters.map((booster, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.6 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-4 sm:p-5 md:p-6 lg:p-7 rounded-xl bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg hover:border-neon-pink/40 focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/30 focus:outline-none transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-neon-pink/15 min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
                  role="button"
                  tabIndex={0}
                  aria-label={booster.ariaLabel}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      // Could add tooltip or modal functionality here
                    }
                  }}
                >
                  <div className={`${booster.color} ${booster.bgColor} p-3 sm:p-3.5 md:p-4 rounded-full flex-shrink-0 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300 mb-3 sm:mb-4 md:mb-5 shadow-lg`}>
                    <booster.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 font-medium leading-relaxed group-hover:text-white group-focus:text-white transition-colors duration-300 px-2">
                    {booster.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons with better responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center px-4"
          >
            {/* Primary CTA - Enhanced responsive design */}
            <motion.button
              onClick={() => scrollToSection('preview-gallery')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-bold flex items-center gap-3 sm:gap-4 overflow-hidden focus:outline-none focus:ring-2 focus:ring-neon-pink focus:ring-offset-2 focus:ring-offset-dark-900 min-h-[48px] sm:min-h-[56px] md:min-h-[64px] w-full sm:w-auto max-w-sm sm:max-w-none"
              aria-label="Zobacz galerię zdjęć i filmów"
            >
              {/* Optimized animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-purple-500 to-neon-purple rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 scale-110"></div>

              {/* Content with improved responsive sizing */}
              <div className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4 text-white">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight">Zobacz co robię za zamkniętymi drzwiami</span>
              </div>

              {/* Optimized shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>

            {/* Secondary CTA - Enhanced responsive design */}
            <motion.button
              onClick={() => scrollToSection('social-hub')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-bold border-2 border-neon-pink text-neon-pink hover:text-white transition-all duration-500 flex items-center gap-3 sm:gap-4 overflow-hidden backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-neon-pink focus:ring-offset-2 focus:ring-offset-dark-900 min-h-[48px] sm:min-h-[56px] md:min-h-[64px] w-full sm:w-auto max-w-sm sm:max-w-none"
              aria-label="Przejdź do sekcji kontaktu i social media"
            >
              {/* Enhanced animated background fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Optimized glow effect */}
              <div className="absolute inset-0 bg-neon-pink/12 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-110"></div>

              {/* Content with improved responsive sizing */}
              <div className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight">Zacznij rozmowę ze mną</span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator with better responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 group cursor-pointer"
          onClick={() => scrollToSection('preview-gallery')}
          role="button"
          tabIndex={0}
          aria-label="Przewiń w dół do galerii"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollToSection('preview-gallery')
            }
          }}
        >
          <div className="relative">
            {/* Optimized glow effect */}
            <div className="absolute inset-0 bg-neon-pink/15 rounded-full blur-lg scale-150 group-hover:scale-200 group-focus:scale-200 transition-transform duration-500"></div>

            {/* Enhanced main indicator with better responsive sizing */}
            <div className="relative w-5 h-8 sm:w-6 sm:h-10 md:w-8 md:h-12 border-2 border-neon-pink rounded-full flex justify-center group-hover:border-yellow-400 group-focus:border-yellow-400 transition-colors duration-300 bg-dark-800/50 backdrop-blur-sm group-focus:ring-2 group-focus:ring-neon-pink group-focus:ring-offset-2 group-focus:ring-offset-dark-900 group-focus:outline-none">
              <div className="w-0.5 h-2 sm:w-1 sm:h-3 md:w-1.5 md:h-4 bg-gradient-to-b from-neon-pink to-neon-purple rounded-full mt-1.5 sm:mt-2 animate-bounce group-hover:animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced text hint with better responsive typography */}
          <div className="absolute top-full mt-2 sm:mt-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-400 group-hover:text-white group-focus:text-white transition-colors duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100">
            Przewiń w dół
          </div>
        </motion.div>

        {/* Optimized Floating Elements with better performance */}
        <div className="absolute inset-0 pointer-events-none" role="img" aria-label="Dekoracyjne animowane elementy crypto">
          {/* Floating crypto decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0], y: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4, type: "tween", ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 hidden sm:block w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg shadow-amber-400/50 flex items-center justify-center"
          >
            <Bitcoin className="w-2.5 h-2.5 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0], y: [10, -10, 10], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 6, type: "tween", ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 hidden sm:block w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-400/50 flex items-center justify-center"
          >
            <Coins className="w-2 h-2 text-white" />
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
