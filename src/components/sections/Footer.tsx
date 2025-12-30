import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
      color: 'from-pink-500 to-purple-500',
      hoverColor: 'hover:text-pink-400'
    },
    {
      name: 'TikTok',
      href: SOCIAL_LINKS.tiktok,
      icon: ({ className }: { className?: string }) => (
        <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3v15.5c0 1.38-1.12 2.5-2.5 2.5S14 19.88 14 18.5s1.12-2.5 2.5-2.5c.54 0 1.04.18 1.5.48V7h-10v11.5c0 1.38-1.12 2.5-2.5 2.5S3 19.88 3 18.5 4.12 16 5.5 16c.54 0 1.04.18 1.5.48V5h12v-2z" />
        </svg>
      ),
      color: 'from-cyan-400 to-pink-500',
      hoverColor: 'hover:text-cyan-400'
    },
    {
      name: 'Telegram',
      href: SOCIAL_LINKS.telegram,
      icon: MessageCircle,
      color: 'from-blue-400 to-cyan-400',
      hoverColor: 'hover:text-blue-400'
    },
    {
      name: 'X',
      href: SOCIAL_LINKS.twitter,
      icon: ({ className }: { className?: string }) => (
        <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'from-gray-400 to-gray-600',
      hoverColor: 'hover:text-gray-300'
    }
  ]

  const footerLinks = [
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: 'mailto:kontakt@example.com' }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-16 py-12 px-4 md:px-6 lg:px-8 pb-24 sm:pb-12"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top decorative line */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mx-auto mb-10"></div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
              Maja Lubicz
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Twoja ekskluzywna przestrzeń premium. Dołącz do społeczności VIP.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Linki
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Obserwuj
            </h4>
            <div className="flex justify-center md:justify-end gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${social.hoverColor} hover:border-white/20 hover:bg-white/10 transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8 mb-6">
          <p className="text-xs text-gray-500 text-center leading-relaxed max-w-2xl mx-auto">
            Ta strona zawiera treści przeznaczone wyłącznie dla osób pełnoletnich (18+).
            Wchodząc na stronę, potwierdzasz, że masz ukończone 18 lat.
            Wszystkie prezentowane materiały są fikcyjne i służą celom rozrywkowym.
          </p>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400">
            © 2025 Maja Lubicz. Wszystkie prawa zastrzeżone.
          </p>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500/30 rounded-full"
              style={{
                left: `${15 + i * 18}%`,
                top: '50%',
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer