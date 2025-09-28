import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Coffee } from 'lucide-react';

const MyStorySection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-playfair font-bold mb-3">
            Moja historia
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Poznaj mnie bliżej i dowiedz się, dlaczego zdecydowałam się dzielić swoim życiem online
          </p>
        </motion.div>

        <div className="bg-dark-800/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/30">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <img 
                src="/images/laura-casual.jpg" 
                alt="Laura w codziennym wydaniu" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <p className="text-gray-200 leading-relaxed">
                Cześć, jestem Laura. Mam 22 lata i studiuję medycynę na trzecim roku. Zawsze byłam ambitną osobą z wieloma pasjami, ale studia medyczne są drogie, a życie w Warszawie kosztowne.
              </p>
              
              <p className="text-gray-200 leading-relaxed">
                Zaczęłam dzielić się swoim życiem online, aby sfinansować studia i jednocześnie realizować swoją kreatywną stronę. To, co zaczęło się jako sposób na zarobienie dodatkowych pieniędzy, szybko stało się moją pasją.
              </p>
              
              <p className="text-gray-200 leading-relaxed">
                Uwielbiam kontakt z moimi subskrybentami i możliwość bycia sobą bez ograniczeń. Dzięki Wam mogę kontynuować naukę i jednocześnie cieszyć się życiem na własnych zasadach.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-neon-pink mr-2" />
                  <span className="text-gray-300">3 rok medycyny</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-neon-pink mr-2" />
                  <span className="text-gray-300">Pasjonatka fotografii</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="w-5 h-5 text-neon-pink mr-2" />
                  <span className="text-gray-300">Uzależniona od kawy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;