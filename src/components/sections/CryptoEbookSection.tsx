import React from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Zap,
    ArrowRight,
    Star,
    Users,
    Shield,
    Target,
    BarChart3,
    Brain,
    Lock,
    Trophy
} from 'lucide-react'
import tradeImage from '../../assets/trade.jpg'
import { trackCTAClick, trackPurchaseIntent } from '../../utils/analytics'

const CryptoEbookSection: React.FC = () => {
    const purchaseUrl = 'https://google.com'
    const originalPrice = '100,00 zł'
    const promoPrice = '50,00 zł'

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
        trackCTAClick('crypto_ebook_buy', 'crypto_ebook_section')
        trackPurchaseIntent('ebook_crypto_leverage_trading', 50.00)
        window.open(purchaseUrl, '_blank')
    }

    return (
        <section id="crypto-ebook-section" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
            </div>

            <div className="container mx-auto relative z-10">
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                    >
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium text-white">Profesjonalny Trading Lewarowany</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Mistrzostwo Rynku Krypto
                        </span>
                    </h2>
                    <p className="mt-2 sm:mt-3 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                        Odkryj tajniki profesjonalnego tradingu z wykorzystaniem metodologii Smart Money Concept i Fair Value Gaps
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
                    {/* Cover / Visual — Real Image - NA MOBILE JAKO PIERWSZE */}
                    <motion.div variants={itemVariants} className="order-1 lg:order-1">
                        <div className="relative group">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl">
                                <img
                                    src={tradeImage}
                                    alt="Trading Crypto Ebook Cover"
                                    className="w-full h-full object-cover"
                                />
                                {/* 50% OFF Badge */}
                                <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg flex items-center gap-2 animate-pulse">
                                    <Zap className="w-4 h-4" />
                                    50% OFF
                                </div>
                            </div>
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl blur-[42px] bg-purple-500/25 opacity-70 group-hover:opacity-95 transition-opacity" aria-hidden="true"></div>
                        </div>
                    </motion.div>

                    {/* Copy & Pricing - NA MOBILE JAKO DRUGIE */}
                    <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2">
                        <div className="relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-400/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-purple-500/30 shadow-xl sm:shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 rainbow-border-animated">
                            <div className="relative z-10">
                                <div className="flex items-start md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">Trading Lewarowany: Od Zera do Mistrza</h3>
                                        <p className="mt-2 text-gray-300 text-sm md:text-base">
                                            Poznaj Smart Money Concept i Fair Value Gaps - strategie profesjonalistów rynku crypto.
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            -50%
                                        </span>
                                    </div>
                                </div>

                                {/* Key Features - Smart Money & FVG */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                                    {[
                                        { icon: <Brain className="w-5 h-5 text-purple-400" />, text: 'Smart Money Concept: Myśl jak instytucje' },
                                        { icon: <Target className="w-5 h-5 text-pink-400" />, text: 'Fair Value Gaps: Precyzyjne punkty wejścia' },
                                        { icon: <BarChart3 className="w-5 h-5 text-blue-400" />, text: 'Zarządzanie ryzykiem na lewarze 10x-100x' },
                                        { icon: <Shield className="w-5 h-5 text-green-400" />, text: 'Strategie stop-loss i take-profit' },
                                        { icon: <TrendingUp className="w-5 h-5 text-yellow-400" />, text: 'Order Blocks i Liquidity Sweeps' },
                                        { icon: <Trophy className="w-5 h-5 text-orange-400" />, text: 'Psychologia tradingu wysokiej dźwigni' },
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl px-3 py-2 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
                                        >
                                            {item.icon}
                                            <span className="text-gray-200 text-sm">{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>

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
                                        { icon: <Users className="w-5 h-5 text-purple-400" />, value: '150+', label: 'traderów w społeczności' },
                                        { icon: <Star className="w-5 h-5 text-yellow-400" />, value: '4.8/5', label: 'średnia ocena kursu' },
                                        { icon: <TrendingUp className="w-5 h-5 text-green-400" />, value: '20+', label: 'strategii krok po kroku' }
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            className="rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 px-4 py-3 flex items-center gap-3 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                                        >
                                            {stat.icon}
                                            <div>
                                                <p className="text-white font-bold text-lg">{stat.value}</p>
                                                <p className="text-xs text-gray-400">{stat.label}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pricing & CTA */}
                                <motion.div
                                    className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-gray-400 line-through text-lg" aria-label={`Cena oryginalna ${originalPrice}`}>{originalPrice}</span>
                                        <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent" aria-label={`Cena promocyjna ${promoPrice}`}>{promoPrice}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            onClick={handleBuyClick}
                                            whileHover={{ scale: 1.04, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative px-8 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:text-white transition-all duration-500 flex items-center gap-2 overflow-hidden backdrop-blur btn-magnetic focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
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
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-purple-500/20"><Shield className="w-4 h-4 text-purple-400" /><span>Bezpieczne płatności</span></div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-pink-500/20"><Zap className="w-4 h-4 text-pink-400" /><span>Natychmiastowy dostęp</span></div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-green-500/20"><Lock className="w-4 h-4 text-green-400" /><span>Dożywotni dostęp</span></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default CryptoEbookSection
