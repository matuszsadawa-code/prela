import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Check, ArrowRight, Star, Users } from 'lucide-react'
import CssEbookCover from '../ui/CssEbookCover'
import { trackCTAClick, trackPurchaseIntent } from '../../utils/analytics'

const EbookSection: React.FC = () => {
  const placeholderUrl = 'https://example.com/ebook-maja-lubicz'
  const originalPrice = '299,00 zł'
  const promoPrice = '149,99 zł'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  }

  const handleBuyClick = () => {
    trackCTAClick('ebook_buy', 'ebook_section')
    trackPurchaseIntent('ebook_krypto_maja_lubicz', 149.99)
    window.open(placeholderUrl, '_blank')
  }

  return (
    <section id="ebook-section" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink/20 to-purple-500/20 mb-6 hover:from-neon-pink/30 hover:to-purple-500/30 transition-all duration-300 rainbow-border-animated"
          >
            <Zap className="w-5 h-5 text-neon-pink" />
            <span className="text-sm font-medium text-neon-pink">Edukacja Kryptograficzna</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              E-book: Zarabiaj na Kryptowalutach
            </span>
          </h2>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Krok po kroku jak zacząć i zarabiać na rynku krypto i minimalizować straty
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Cover / Visual — CSS-only graphic */}
          <motion.div variants={itemVariants} className="hidden lg:block order-2 lg:order-1">
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-neon-pink/30 via-purple-500/20 to-indigo-500/20 border border-pink-400/20 backdrop-blur-xl">
                <CssEbookCover showRibbon ribbonText="Promocja" animationVariant="vivid" />
              </div>
              {/* Glow — wzmocniony dla wyrazistego wariantu */}
              <div className="absolute inset-0 rounded-3xl blur-[42px] bg-neon-pink/25 opacity-70 group-hover:opacity-95 transition-opacity" aria-hidden="true"></div>
            </div>
          </motion.div>

          {/* Copy & Pricing */}
          <motion.div variants={itemVariants} className="space-y-6 order-1 lg:order-2">
            <div className="relative bg-gradient-to-br from-dark-800/90 via-purple-900/30 to-dark-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gradient-to-r from-neon-pink/30 via-purple-500/20 to-cyan-400/10 shadow-2xl shadow-neon-pink/10 hover:shadow-neon-pink/20 transition-all duration-500">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-pink/20 via-purple-500/10 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
              <div className="relative z-10">
              <div className="flex items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Kompleksowy przewodnik</h3>
                  <p className="mt-2 text-gray-300 text-sm md:text-base">
                    Od bezpiecznego startu po sprawdzone strategie. Otrzymasz praktyczne frameworki, checklisty i plan działania krok po kroku.
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow">Promocja</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  { icon: <Shield className="w-5 h-5 text-neon-pink" />, text: 'Bezpieczny start: portfele i ochrona' },
                  { icon: <Zap className="w-5 h-5 text-neon-pink" />, text: 'Prosty framework i narzędzia do analizy rynku' },
                  { icon: <Check className="w-5 h-5 text-neon-pink" />, text: 'Strategie Fair Value Gaps & Smart Money Concept' },
                  { icon: <Check className="w-5 h-5 text-neon-pink" />, text: 'Dywersyfikacja i zarządzanie ryzykiem' },
                  { icon: <Check className="w-5 h-5 text-neon-pink" />, text: 'Psychologia inwestora bez tajemnic' },
                  { icon: <Check className="w-5 h-5 text-neon-pink" />, text: 'Checklisty i plan działania' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-dark-700/60 to-purple-900/30 hover:from-dark-700/80 hover:to-purple-900/50 rounded-xl px-3 py-2 border border-purple-500/20 hover:border-neon-pink/30 transition-all duration-300 cursor-pointer"
                  >
                    {item.icon}
                    <span className="text-gray-200 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Why it works */}
              <motion.div
                data-testid="why-it-works"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 rounded-2xl bg-gradient-to-r from-purple-900/40 to-dark-700/40 p-4 md:p-5 border border-gradient-to-r from-neon-pink/30 to-purple-500/20 backdrop-blur-sm hover:border-neon-pink/50 transition-all duration-300"
                aria-label="Dlaczego ten e-book działa"
              >
                <h4 className="text-white text-base md:text-lg font-semibold bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">Dlaczego ten e-book działa</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: <Zap className="w-5 h-5 text-neon-pink flex-shrink-0" />, text: 'Frameworki i checklisty do działania od razu – bez zbędnej teorii.' },
                    { icon: <Shield className="w-5 h-5 text-neon-pink flex-shrink-0" />, text: 'Ryzyko pod kontrolą – proste zasady zarządzania kapitałem i dywersyfikacji.' },
                    { icon: <Check className="w-5 h-5 text-neon-pink flex-shrink-0" />, text: 'Przykłady i reguły decyzyjne – jasna ścieżka krok po kroku.' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-dark-800/40 hover:bg-dark-800/60 border border-purple-500/20 hover:border-neon-pink/30 transition-all duration-300"
                    >
                      {item.icon}
                      <p className="text-sm text-gray-200">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Proof: Stats */}
              <motion.div
                data-testid="social-proof-stats"
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                aria-label="Statystyki społecznego dowodu słuszności"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: <Users className="w-5 h-5 text-neon-pink" />, value: '300+', label: 'czytelników i kursantów' },
                  { icon: <Star className="w-5 h-5 text-neon-pink" />, value: '4.9/5', label: 'średnia ocena materiałów' },
                  { icon: <Check className="w-5 h-5 text-neon-pink" />, value: '50+', label: 'praktycznych narzędzi i checklist' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="rounded-xl bg-gradient-to-br from-purple-900/40 to-dark-700/40 px-4 py-3 flex items-center gap-3 border border-purple-500/20 hover:border-neon-pink/40 transition-all duration-300 cursor-pointer"
                  >
                    {stat.icon}
                    <div>
                      <p className="text-white font-bold text-lg">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Proof: Testimonials (mobile-first slider) */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-white text-sm font-semibold mb-3 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">Opinie czytelników</h4>
                <div
                  data-testid="social-proof-testimonials"
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible pb-2"
                  aria-label="Opinie czytelników — przewijane na urządzeniach mobilnych"
                >
                  {[
                    { name: 'Kasia', text: 'Dzięki prostym schematom przestałam popełniać te same błędy. Pierwszy miesiąc na plusie!'},
                    { name: 'Michał', text: 'Konkret, zero lania wody. Najbardziej pomógł rozdział o ryzyku i planie działań.'},
                    { name: 'Ola', text: 'Świetnie wyjaśnione FVG i SMC na przykładach. Wreszcie czuję, że mam ramę decyzyjną.'}
                  ].map((opinion, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="min-w-[260px] sm:min-w-0 snap-start rounded-xl bg-gradient-to-br from-purple-900/40 to-dark-700/40 p-4 border border-gradient-to-r from-neon-pink/30 to-purple-500/20 hover:border-neon-pink/50 transition-all duration-300 cursor-pointer"
                      aria-label={`Opinia czytelnika ${opinion.name}`}
                    >
                      <div className="flex items-center gap-2 text-neon-pink">
                        <Star className="w-4 h-4" aria-hidden="true" />
                        <span className="text-xs">Polecane</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-200">“{opinion.text}”</p>
                      <p className="mt-2 text-xs text-gray-400">— {opinion.name}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Pricing & CTA */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-neon-pink/10 to-purple-500/10 border border-neon-pink/20 hover:border-neon-pink/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-gray-400 line-through text-lg" aria-label={`Cena oryginalna ${originalPrice}`}>{originalPrice}</span>
                  <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent" aria-label={`Cena promocyjna ${promoPrice}`}>{promoPrice}</span>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleBuyClick}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-3 rounded-full font-bold bg-gradient-to-r from-neon-pink to-purple-600 text-white hover:text-white transition-all duration-500 flex items-center gap-2 overflow-hidden backdrop-blur btn-magnetic focus:outline-none focus:ring-2 focus:ring-neon-pink shadow-lg shadow-neon-pink/30 hover:shadow-neon-pink/50"
                    aria-label="Kup teraz e-book – przejdź do platformy sprzedażowej"
                  >
                    <span className="relative z-10">Kup teraz</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/40 border border-purple-500/20"><Shield className="w-4 h-4 text-neon-pink" /><span>Szyfrowane płatności SSL</span></div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/40 border border-purple-500/20"><Zap className="w-4 h-4 text-neon-pink" /><span>Natychmiastowy dostęp</span></div>
              </motion.div>
              </div>
              </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky mobile CTA */}
      <motion.div
        data-testid="mobile-sticky-cta"
        className="sm:hidden fixed bottom-4 left-4 right-4 z-50"
        aria-label="Przyklejony pasek CTA na urządzeniach mobilnych"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="rounded-full bg-gradient-to-r from-dark-800/95 to-purple-900/40 backdrop-blur-xl border border-gradient-to-r from-neon-pink/40 to-purple-500/30 shadow-2xl shadow-neon-pink/20 flex items-center justify-between px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
            <span className="text-base font-extrabold bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">{promoPrice}</span>
          </div>
          <motion.button
            onClick={handleBuyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink to-purple-600 text-white text-sm font-bold shadow-lg shadow-neon-pink/30 hover:shadow-neon-pink/50 transition-all duration-300"
            aria-label="Kup teraz — mobilny CTA"
          >
            Kup teraz
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

export default EbookSection