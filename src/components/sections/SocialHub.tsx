import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Send, Phone, Facebook, Star, Sparkles, Crown, Users, ArrowUpRight } from 'lucide-react'

interface SocialLink {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  preview: string
  url: string
  isPremium?: boolean
  isVIP?: boolean
  specialBadge?: string
}

const SocialHub: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Social Media platforms with enhanced data
  const socialMediaLinks: SocialLink[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8" />,
      description: 'Codzienne życie i za kulisami',
      preview: 'Zobacz moje codzienne życie i ekskluzywne momenty',
      url: '#',
      specialBadge: ''
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">TT</div>,
      description: 'Viral content & trendy vibes',
      preview: 'Krótkie, ale intensywne filmiki które pokochasz',
      url: '#',
      specialBadge: ''
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: <Twitter className="w-8 h-8" />,
      description: 'Bez cenzury i filtru',
      preview: 'Tutaj jestem bez cenzury i mówię co myślę 😈',
      url: '#',
      specialBadge: ''
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-8 h-8" />,
      description: 'Społeczność i wydarzenia',
      preview: 'Dołącz do mojej społeczności na FB',
      url: '#',
      specialBadge: ''
    },
  ]

  // Exclusive Content platforms with enhanced features
  const exclusiveContentLinks: SocialLink[] = [
    {
      id: 'telegram-free',
      name: 'KANAŁ TELEGRAM',
      icon: <Send className="w-8 h-8" />,
      description: 'Darmowe próbki i teasery',
      preview: 'Darmowy kanał z próbkami moich najlepszych treści',
      url: '#',
      specialBadge: ''
    },
    {
      id: 'whatsapp-free',
      name: 'KANAŁ WHATSAPP',
      icon: <Phone className="w-8 h-8" />,
      description: 'Codzienne updates i newsy',
      preview: 'Otrzymuj codzienne wiadomości i aktualizacje',
      url: '#',
      specialBadge: ''
    },
    {
      id: 'telegram-vip',
      name: 'TELEGRAM 18+',
      icon: <div className="relative">
        <Send className="w-8 h-8" />
        <Crown className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400" />
      </div>,
      description: 'Ekskluzywne treści premium',
      preview: 'Najgorętsze treści tylko dla VIP członków',
      url: '#',
      isVIP: true,
      specialBadge: 'VIP WYMAGANY'
    },
    {
      id: 'whatsapp-vip',
      name: 'WHATSAPP 18+',
      icon: <div className="relative">
        <Phone className="w-8 h-8" />
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400" />
      </div>,
      description: 'Prywatne rozmowy 1:1',
      preview: 'Bezpośredni kontakt ze mną - tylko dla VIP',
      url: '#',
      isVIP: true,
      specialBadge: 'VIP WYMAGANY'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="social-hub" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects - Updated to match new sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-purple-900/10 to-pink-900/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="max-w-7xl mx-auto relative z-10">




        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          {/* Social Media Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-white flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-neon-pink" />
              Social Media
            </h3>
            <p className="text-gray-400 text-lg">Śledź mnie na moich ulubionych platformach</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
                {socialMediaLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    variants={cardVariants}
                    onHoverStart={() => setHoveredCard(link.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative group cursor-pointer"
                    style={{ zIndex: hoveredCard === link.id ? 10 : 1 }}
                  >
                    {/* Enhanced Card - Updated to match new sections */}
                    <div className={`
                      relative p-8 rounded-2xl border transition-all duration-500 text-center
                      bg-dark-800/80 backdrop-blur-xl
                      border-gray-600/30
                      ${hoveredCard === link.id ? 'scale-105 shadow-2xl border-neon-pink/50' : 'hover:border-gray-500/50'}
                      transform-gpu
                    `}>
                      {/* Special Badge */}
                      {link.specialBadge && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg"
                        >
                          <Star className="w-3 h-3 inline mr-1" />
                          {link.specialBadge}
                        </motion.div>
                      )}

                      {/* Enhanced Icon without background */}
                      <motion.div
                        className="mb-6 flex items-center justify-center mx-auto"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`
                          ${link.id === 'instagram'
                            ? 'text-pink-400'
                            : link.id === 'tiktok'
                              ? 'text-white'
                              : link.id === 'twitter'
                                ? 'text-blue-400'
                                : 'text-blue-400'
                          }
                        `}>
                          {link.icon}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3 font-playfair">{link.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{link.description}</p>
                      {/* Preview Quote - Always Visible */}
                      <div className={`p-4 rounded-xl border mb-4 ${
                        'bg-gradient-to-r from-black/20 to-black/10 border-neon-pink/20'
                      }`}>
                        <p className={`text-sm italic leading-relaxed ${'text-neon-pink'}`}>"{link.preview}"</p>
                      </div>

                      {/* Arrow link button */}
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          rotate: 15
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                          absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                          ${link.id === 'instagram'
                            ? 'bg-pink-500/20 border-pink-500/50 text-pink-400 hover:bg-pink-500/30 hover:border-pink-400'
                            : link.id === 'tiktok'
                              ? 'bg-pink-500/20 border-pink-500/50 text-white hover:bg-pink-500/30 hover:border-pink-400'
                              : link.id === 'twitter'
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30 hover:border-blue-400'
                                : 'bg-blue-600/20 border-blue-500/50 text-blue-400 hover:bg-blue-600/30 hover:border-blue-400'
                          }
                        `}
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Enhanced Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-500 -z-10"
                      animate={{
                        opacity: hoveredCard === link.id ? 0.3 : 0,
                        scale: hoveredCard === link.id ? 1.05 : 1
                      }}
                      style={{
                        background: `linear-gradient(135deg, ${
                          link.id === 'instagram' ? '#E4405F, #F56040' :
                          link.id === 'tiktok' ? '#FF0050, #00F2EA' :
                          link.id === 'twitter' ? '#1DA1F2, #14171A' :
                          '#4267B2, #898F9C'
                        })`
                      }}
                    />
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>

        {/* Exclusive Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          {/* Exclusive Content Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-white flex items-center justify-center gap-3">
              <Crown className="w-8 h-8 text-yellow-500" />
              Treści Exclusive
            </h3>
            <p className="text-gray-400 text-lg">Ekskluzywne kanały tylko dla dorosłych</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
                {exclusiveContentLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    variants={cardVariants}
                    onHoverStart={() => setHoveredCard(link.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative group cursor-pointer"
                    style={{ zIndex: hoveredCard === link.id ? 10 : 1 }}
                  >
                    {/* Unified Card Design - Updated to match new sections */}
                    <div className={`
                      relative p-8 rounded-2xl border transition-all duration-500 text-center
                      bg-dark-800/80 backdrop-blur-xl
                      ${link.isVIP
                        ? 'border-yellow-500/40'
                        : 'border-gray-600/30'
                      }
                      ${hoveredCard === link.id ? 'scale-105 shadow-2xl' : 'hover:border-gray-500/50'}
                      ${hoveredCard === link.id && link.isVIP ? 'border-yellow-400/60' : ''}
                      ${hoveredCard === link.id && !link.isVIP ? 'border-neon-pink/50' : ''}
                      transform-gpu
                    `}>
                      {/* Single Special Badge */}
                      {link.specialBadge && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                            link.isVIP
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                              : 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                          }`}
                        >
                          {link.isVIP ? <Crown className="w-3 h-3 inline mr-1" /> : <Star className="w-3 h-3 inline mr-1" />}
                          {link.specialBadge}
                        </motion.div>
                      )}

                      {/* Enhanced Icon without background */}
                      <motion.div
                        className="mb-6 flex items-center justify-center mx-auto"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`
                          ${link.isVIP
                            ? 'text-yellow-400'
                            : link.id.includes('telegram')
                              ? 'text-blue-400'
                              : 'text-green-400'
                          }
                        `}>
                          {link.icon}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3 font-playfair">{link.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{link.description}</p>

                      {/* Preview Quote - Always Visible */}
                      <div className={`p-4 rounded-xl border mb-4 ${
                        link.isVIP
                          ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                          : 'bg-gradient-to-r from-black/20 to-black/10 border-neon-pink/20'
                      }`}>
                        <p className={`text-sm italic leading-relaxed ${
                          link.isVIP ? 'text-yellow-300' : 'text-neon-pink'
                        }`}>"{link.preview}"</p>
                      </div>

                      {/* Arrow link button */}
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          rotate: 15
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                          absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                          ${link.isVIP
                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/30 hover:border-yellow-400'
                            : link.id.includes('telegram')
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30 hover:border-blue-400'
                              : 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30 hover:border-green-400'
                          }
                        `}
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Enhanced Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-500 -z-10"
                      animate={{
                        opacity: hoveredCard === link.id ? 0.3 : 0,
                        scale: hoveredCard === link.id ? 1.05 : 1
                      }}
                      style={{
                        background: link.isVIP
                          ? 'linear-gradient(135deg, #f59e0b, #ea580c)'
                          : link.id.includes('telegram')
                            ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                            : 'linear-gradient(135deg, #10b981, #059669)'
                      }}
                    />
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default SocialHub
