import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Star,
  Flame,
  Heart,
  Sparkles,
  Check,
  XIcon,
  Calendar,
  MessageCircle,
  Video,
  Phone,
  Lock,
  Gift
} from 'lucide-react'
import { SUBSCRIPTION_FEATURES } from '../../utils/constants'

interface ContentItem {
  id: string
  title: string
  description: string
  type: 'exclusive' | 'interaction' | 'bonus'
  icon: React.ReactNode
  preview?: string
  isNew?: boolean
  isHot?: boolean
  value?: string
}

interface VIPPlan {
  id: string
  duration: string
  price: number
  originalPrice?: number
  savings?: string
  popular?: boolean
  icon: React.ReactNode
}

const PremiumContentSection: React.FC = () => {
  const [selectedCategory] = useState<'all' | 'exclusive' | 'interaction' | 'bonus'>('all')
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false)

  const contentItems: ContentItem[] = [
    // Funkcje Platformy - Poznanie się bliżej (PIERWSZY KAFELEK)
    {
      id: 'ad-free',
      title: 'Poznaj Mnie Prawdziwie - Spotkania Na Żywo',
      description: 'Wyjdźmy poza internet! Możliwość spotkań na żywo, realne znajomości i prawdziwe emocje. Więcej niż tylko online - doświadcz pełnej bliskości.',
      type: 'bonus',
      icon: <Heart className="w-6 h-6" />,
      preview: 'Spotkania na żywo i prawdziwa bliskość...',
      isHot: true,
      value: 'VIP'
    },

    // Ekskluzywne Treści Premium
    {
      id: 'premium-content',
      title: 'Ekskluzywne Treści - Codziennie Nowe',
      description: 'Świeże, ekskluzywne zdjęcia i filmy każdego dnia! Najwyższa jakość, intymne momenty i treści, których nie zobaczysz nigdzie indziej. Twoja prywatna kolekcja rośnie każdego dnia.',
      type: 'exclusive',
      icon: <Gift className="w-6 h-6" />,
      preview: 'Codzienna dawka ekskluzywnych treści...',
      isHot: true,
      value: 'Codziennie'
    },
    {
      id: 'behind-scenes',
      title: 'Mój Prywatny Numer - Bezpośredni Kontakt',
      description: 'Masz mój prywatny numer telefonu i WhatsApp! Rozmawiaj ze mną osobiście, kiedy chcesz. Najbardziej intymna i bezpośrednia forma kontaktu - jak z prawdziwą dziewczyną.',
      type: 'exclusive',
      icon: <Phone className="w-6 h-6" />,
      preview: 'Bezpośredni kontakt w każdej chwili...',
      isNew: true,
      value: 'VIP'
    },
    {
      id: 'hd-content',
      title: 'Sexting Premium z Live Video',
      description: 'Gorące wiadomości z ekskluzywnymi materiałami wideo i zdjęciami na żywo! Real-time sexting dostosowany do Twoich fantazji. Najintymniejsza forma komunikacji - tylko dla Ciebie.',
      type: 'exclusive',
      icon: <Video className="w-6 h-6" />,
      preview: 'Live video sexting w czasie rzeczywistym...',
      isHot: true,
      value: 'Na żywo'
    },
    {
      id: 'early-access',
      title: 'Girlfriend Experience - Prawdziwa Relacja',
      description: 'Autentyczna relacja jak z prawdziwą dziewczyną! Codzienne rozmowy, zainteresowanie Twoim życiem, wspólne chwile i prawdziwe emocjonalne połączenie. Doświadcz pełni GFE.',
      type: 'exclusive',
      icon: <Sparkles className="w-6 h-6" />,
      preview: 'Prawdziwa relacja pełna emocji...',
      isNew: true,
      value: 'GFE'
    },

    // Interakcja Premium
    {
      id: 'direct-messages',
      title: 'Nieograniczona Prywatna Komunikacja',
      description: 'Piszę do Ciebie sama, zawsze i wszędzie! Nieograniczone wiadomości, szybkie odpowiedzi i autentyczna rozmowa. Każda wiadomość to osobista uwaga tylko dla Ciebie.',
      type: 'interaction',
      icon: <MessageCircle className="w-6 h-6" />,
      preview: 'Autentyczne wiadomości bezpośrednio ode mnie...',
      isHot: true,
      value: '24/7'
    },
    {
      id: 'live-streams',
      title: 'Ekskluzywne Live Streamy - Tylko Dla Ciebie',
      description: 'Prywatne transmisje na żywo tylko dla moich subskrybentów! Interaktywne sesje, gdzie jesteś w centrum uwagi. Real-time show dostosowany do Twoich preferencji.',
      type: 'interaction',
      icon: <Video className="w-6 h-6" />,
      preview: 'Prywatne live show specjalnie dla Ciebie...',
      isNew: true,
      value: 'Live'
    },
    {
      id: 'custom-requests',
      title: 'Treści Na Twoje Zamówienie',
      description: 'Spełniam Twoje fantazje! Zamów personalizowane zdjęcia, filmy i treści dokładnie według Twoich preferencji. Każda prośba to wyjątkowa okazja do stworzenia czegoś specjalnego dla Ciebie.',
      type: 'interaction',
      icon: <Crown className="w-6 h-6" />,
      preview: 'Personalizowane treści na Twoje zamówienie...',
      isHot: true,
      value: 'Custom'
    },

    // Funkcje Platformy - Archiwum
    {
      id: 'archive-access',
      title: 'Nieograniczone Archiwum - Cała Historia',
      description: 'Masz dostęp do całej mojej historii treści! Tysiące zdjęć, setki filmów - wszystko w jednym miejscu. Od pierwszych dni do teraz - pełna kolekcja tylko dla Ciebie.',
      type: 'bonus',
      icon: <Lock className="w-6 h-6" />,
      preview: 'Cała kolekcja treści w jednym miejscu...',
      isNew: true,
      value: 'Pełne'
    }
  ]



  const filteredItems = selectedCategory === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type === selectedCategory)

  const vipPlans: VIPPlan[] = [
    {
      id: '1-month',
      duration: '1 MIESIĄC',
      price: 19.99,
      originalPrice: 29.99,
      savings: 'Oszczędzasz 10 zł',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: '3-months',
      duration: '3 MIESIĄCE',
      price: 49.99,
      originalPrice: 89.97,
      savings: 'Oszczędzasz 40 zł',
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: '6-months',
      duration: '6 MIESIĘCY',
      price: 89.99,
      originalPrice: 179.94,
      savings: 'Oszczędzasz 90 zł',
      icon: <Crown className="w-6 h-6" />
    }
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exclusive': return 'from-pink-500/20 to-purple-500/20'
      case 'interaction': return 'from-red-500/20 to-pink-500/20'
      case 'bonus': return 'from-yellow-500/20 to-orange-500/20'
      default: return 'from-purple-500/20 to-pink-500/20'
    }
  }

  const getTypeAccent = (type: string) => {
    switch (type) {
      case 'exclusive': return 'text-pink-400'
      case 'interaction': return 'text-red-400'
      case 'bonus': return 'text-yellow-400'
      default: return 'text-purple-400'
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  const handlePlanSelect = (planId: string) => {
    // Tu można dodać logikę przekierowania do płatności
    console.log(`Selected plan: ${planId}`)
    setIsVIPModalOpen(false)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">Premium Content</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              BENEFITY SUBSKRYBENTA
            </span>
            <br />
          </h2>
          

          

        </motion.div>



        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                transition={{
                  duration: 0.6,
                  type: "tween",
                  ease: "easeOut"
                }}
                className="group relative"
              >
                <div className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${getTypeColor(item.type)} backdrop-blur-xl transition-all duration-500 hover:transform hover:scale-[1.02] magnetic-hover rainbow-border-animated touch-manipulation`}>
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {item.isNew && (
                      <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                        NOWE
                      </span>
                    )}
                    {item.isHot && (
                      <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} rainbow-border`}>
                      <div className={getTypeAccent(item.type)}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="relative mb-4">
                    <div className="p-4 rounded-xl bg-black/20 border border-yellow-400/10 content-reveal">
                      <p className="text-gray-400 text-sm">{item.preview}</p>
                    </div>
                  </div>



                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fanvue Profile Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="relative max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-pink-400/30"
            >
              <motion.a
                href="https://www.fanvue.com/mayalubicz"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                Przejdź do profilu Fanvue
              </motion.a>
              <p className="text-purple-200 text-sm font-medium tracking-wider mt-4">
                Subskrybuj i uzyskaj dostęp do ekskluzywnych treści
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* VIP Modal */}
      <AnimatePresence>
        {isVIPModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVIPModalOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <Crown className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Wybierz Plan Subskrypcji
                    </h2>
                    <p className="text-gray-400">Wybierz plan subskrypcji Fanvue, który najlepiej odpowiada Twoim potrzebom</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVIPModalOpen(false)}
                  className="p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Plans Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {vipPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/30 border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50 hover:border-purple-500/30'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                        NAJPOPULARNIEJSZY
                      </div>
                    )}

                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-xl ${plan.popular ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30' : 'bg-gray-700/50 border border-gray-600/30'}`}>
                          <div className={plan.popular ? 'text-purple-400' : 'text-gray-400'}>
                            {plan.icon}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{plan.duration}</h3>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {plan.price} zł
                          </span>
                        </div>
                        {plan.originalPrice && (
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="text-gray-500 line-through text-sm">{plan.originalPrice} zł</span>
                          </div>
                        )}
                        {plan.savings && (
                          <p className="text-green-400 text-sm font-medium mt-1">{plan.savings}</p>
                        )}
                      </div>

                      <button
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full py-3 px-6 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25'
                            : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white border border-gray-600/30 hover:border-gray-500/50'
                        }`}
                      >
                        Wybierz Plan
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Co otrzymasz w subskrypcji Fanvue:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {SUBSCRIPTION_FEATURES.vip.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Bezpieczne płatności • Anuluj w każdej chwili</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-gray-500 text-xs">
                  Wszystkie płatności są zabezpieczone. Możesz anulować subskrypcję w każdej chwili.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PremiumContentSection