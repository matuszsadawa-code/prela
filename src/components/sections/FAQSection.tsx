import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Co jest w VIP kanale?',
      answer: 'VIP kanał zawiera ekskluzywne zdjęcia i filmy NSFW, które nie są dostępne nigdzie indziej. Codziennie dodaję nowe treści, prowadzę live sessions i odpowiadam na prywatne wiadomości. To miejsce, gdzie mogę być sobą bez ograniczeń.'
    },
    {
      id: '2',
      question: 'Czy odpisujesz sama?',
      answer: 'Tak! Wszystkie wiadomości piszę osobiście. Nie mam żadnego zespołu ani botów. Gdy piszesz do mnie, rozmawiasz bezpośrednio ze mną. Czasami może minąć kilka godzin zanim odpowiem (szczególnie gdy śpię lub jestem na zajęciach), ale zawsze odpisuję.'
    },
    {
      id: '3',
      question: 'Jak długo trwa dostęp?',
      answer: 'Dostęp jest miesięczny i odnawia się automatycznie. Możesz anulować subskrypcję w każdej chwili - zachowasz dostęp do końca opłaconego okresu. Nie ma żadnych ukrytych opłat czy długoterminowych zobowiązań.'
    },
    {
      id: '4',
      question: 'Czy jest możliwość live\'a?',
      answer: 'Tak! Regularnie organizuję live sessions dla VIP członków. Zazwyczaj są to spontaniczne transmisje, o których informuję z wyprzedzeniem. Dla WhatsApp Premium oferuję również prywatne video calls - to najbardziej intymne doświadczenie, jakie mogę zaoferować.'
    },
    {
      id: '5',
      question: 'Czy mogę anulować w każdej chwili?',
      answer: 'Oczywiście! Nie ma żadnych zobowiązań długoterminowych. Możesz anulować subskrypcję kiedy chcesz przez platformę, na której ją wykupiłeś. Twój dostęp będzie aktywny do końca opłaconego okresu.'
    },
    {
      id: '6',
      question: 'Czy przyjmujesz custom requests?',
      answer: 'Tak, ale tylko dla VIP członków. Mogę zrobić zdjęcia lub filmy według Twoich życzeń (w granicach rozsądku). Ceny zależą od złożoności request\'u. Napisz do mnie prywatnie, a omówimy szczegóły.'
    }
  ]

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-neon-pink" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold glow-text">
              Często zadawane pytania
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Masz pytania? Prawdopodobnie znajdziesz odpowiedź tutaj. 
            Jeśli nie, napisz do mnie bezpośrednio!
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-neon-pink/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-dark-700/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-neon-pink" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-600/50 pt-4">
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
       
      </div>
    </section>
  )
}

export default FAQSection
