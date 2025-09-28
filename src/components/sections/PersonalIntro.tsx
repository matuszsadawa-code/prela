import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Activity, Heart, CheckCircle, Shield, Lock, ShieldCheck, Calendar, Weight, Ruler, User } from 'lucide-react'
import lauraImage from '../../assets/ig_00032_.png'

const PersonalIntro: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Trust certificates data
  const trustCertificates = [
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
      icon: ShieldCheck,
      text: "Bezpieczne Płatności",
      color: "text-neon-pink",
      bgColor: "bg-neon-pink/10",
      ariaLabel: "Szyfrowane i bezpieczne metody płatności"
    }
  ]

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 lg:order-1">
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-playfair font-bold mb-6 glow-text"
              >
                Hej! Jestem Laura
              </motion.h2>

              {/* Mobile Image - pokazuje się tylko na mobile pod nagłówkiem */}
              <motion.div
                variants={itemVariants}
                className="lg:hidden mb-8"
              >
                <div className="relative group max-w-sm mx-auto">
                  {/* Hero-style Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse-slow transition-opacity duration-500"></div>

                  {/* Hero-style Image Container */}
                  <div className="relative bg-gradient-to-br from-neon-pink via-purple-500 to-neon-purple rounded-3xl p-1.5 group-hover:scale-105 transition-all duration-500 shadow-2xl shadow-neon-pink/25">
                    <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-dark-900 to-dark-800 overflow-hidden relative border border-gray-700/25">
                      <img
                        src={lauraImage}
                        alt="Laura - Sensual Portrait"
                        className="w-full h-full object-cover object-center rounded-3xl group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                        loading="lazy"
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent rounded-3xl"></div>

                      {/* Enhanced shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                    </div>

                    {/* Hero-style Verification Badge */}
                    <div
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-2.5 rounded-full shadow-xl shadow-green-500/40 animate-bounce-slow border-2 border-white/20"
                      aria-label="Profil zweryfikowany"
                      role="img"
                    >
                      <CheckCircle className="w-5 h-5 drop-shadow-lg" />
                      <div className="absolute inset-0 bg-green-400/15 rounded-full blur-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Hero-style floating particles */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-neon-pink rounded-full animate-float opacity-50 shadow-lg shadow-neon-pink/40" role="img" aria-label="Dekoracyjny element"></div>
                  <div className="absolute bottom-1/4 -right-2 w-2 h-2 bg-neon-purple rounded-full animate-float delay-1500 opacity-50 shadow-lg shadow-neon-purple/40" role="img" aria-label="Dekoracyjny element"></div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-300">
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-8 h-8 text-neon-pink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Studentka medycyny</h3>
                    <p>Studiuję medycynę na jednej z najlepszych uczelni w Polsce. Dzień spędzam nad książkami, ale wieczory... to już inna historia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-8 h-8 text-neon-purple mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Trochę zbyt pewna siebie</h3>
                    <p>Wiem czego chcę i nie boję się tego pokazać. Moja pewność siebie może być... uzależniająca.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Activity className="w-8 h-8 text-neon-pink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Aktywna i sumienna</h3>
                    <p>Codziennie aktywna, zawsze odpowiadam na wiadomości. Moi fani wiedzą, że mogą na mnie liczyć.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neon-pink/20"
            >
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-neon-pink/10 p-2 rounded-full group-hover:bg-neon-pink/20 transition-colors duration-300">
                    <Calendar className="w-5 h-5 text-neon-pink" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neon-pink mb-2">22</div>
                <div className="text-sm text-gray-400">Wiek</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-neon-purple/10 p-2 rounded-full group-hover:bg-neon-purple/20 transition-colors duration-300">
                    <Weight className="w-5 h-5 text-neon-purple" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neon-purple mb-2">52kg</div>
                <div className="text-sm text-gray-400">Waga</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-neon-pink/10 p-2 rounded-full group-hover:bg-neon-pink/20 transition-colors duration-300">
                    <Ruler className="w-5 h-5 text-neon-pink" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neon-pink mb-2">165cm</div>
                <div className="text-sm text-gray-400">Wzrost</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-neon-purple/10 p-2 rounded-full group-hover:bg-neon-purple/20 transition-colors duration-300">
                    <User className="w-5 h-5 text-neon-purple" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neon-purple mb-2">85C</div>
                <div className="text-sm text-gray-400">Biust</div>
              </div>
            </motion.div>

            {/* Trust Certificates */}
            <motion.div
              variants={itemVariants}
              className="pt-8 mt-8 border-t border-neon-purple/20"
            >
       

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {trustCertificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="flex flex-col items-center text-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg border border-gray-600/25 hover:border-neon-pink/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-neon-pink/15 min-h-[100px] md:min-h-[120px]"
                    role="button"
                    tabIndex={0}
                    aria-label={certificate.ariaLabel}
                  >
                    <div className={`${certificate.color} ${certificate.bgColor} p-2.5 md:p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2 md:mb-3 shadow-lg`}>
                      <certificate.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300 px-1">
                      {certificate.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Image - ukryte na mobile */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block order-2 lg:order-2"
          >
            <div className="relative group">
              {/* Hero-style Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse-slow transition-opacity duration-500"></div>

              {/* Hero-style Image Container with original sizing */}
              <div className="relative bg-gradient-to-br from-neon-pink via-purple-500 to-neon-purple rounded-3xl p-1.5 group-hover:scale-105 transition-all duration-500 shadow-2xl shadow-neon-pink/25">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-dark-900 to-dark-800 overflow-hidden relative border border-gray-700/25">
                  <img
                    src={lauraImage}
                    alt="Laura - Sensual Portrait"
                    className="w-full h-full object-cover object-center rounded-3xl group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent rounded-3xl"></div>

                  {/* Enhanced shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                </div>

                {/* Hero-style Verification Badge */}
                <div
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-2.5 sm:p-3 rounded-full shadow-xl shadow-green-500/40 animate-bounce-slow border-2 border-white/20"
                  aria-label="Profil zweryfikowany"
                  role="img"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-green-400/15 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>

              {/* Hero-style floating particles */}
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-neon-pink rounded-full animate-float opacity-50 shadow-lg shadow-neon-pink/40" role="img" aria-label="Dekoracyjny element"></div>
              <div className="absolute bottom-1/4 -right-2 sm:-right-3 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-neon-purple rounded-full animate-float delay-1500 opacity-50 shadow-lg shadow-neon-purple/40" role="img" aria-label="Dekoracyjny element"></div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 bg-neon-purple/20 backdrop-blur-sm rounded-full p-3"
            >
              <Heart className="w-6 h-6 text-neon-purple" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-neon-pink/20 backdrop-blur-sm rounded-full p-3"
            >
              <Star className="w-6 h-6 text-neon-pink" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalIntro
