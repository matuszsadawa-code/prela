import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Calendar, MapPin, Star, Award, Verified } from 'lucide-react';
import lauraVerificationImage from '../../assets/laura-verification.jpg';
import AudioPlayer from '../ui/AudioPlayer';

const VerificationSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const verificationItems = [
    {
      icon: Shield,
      title: "Tożsamość zweryfikowana",
      description: "Moja tożsamość została potwierdzona przez administrację platformy poprzez oficjalny dokument tożsamości.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      glowColor: "shadow-green-400/10"
    },
    {
      icon: Calendar,
      title: "Wiek potwierdzony",
      description: "Mam ukończone 22 lata, co zostało potwierdzone oficjalnym dokumentem tożsamości.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      glowColor: "shadow-blue-400/10"
    },
    {
      icon: MapPin,
      title: "Lokalizacja potwierdzona",
      description: "Mieszkam w Warszawie, co zostało potwierdzone przez geolokalizację i adres zamieszkania.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      glowColor: "shadow-purple-400/10"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-purple-900/10 to-dark-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-neon-pink/5 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6 text-white">
            Zweryfikowana tożsamość
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Moja tożsamość została potwierdzona przez platformę, abyś mógł czuć się bezpiecznie i mieć pewność autentyczności
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center bg-green-400/10 border border-green-400/20 rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm font-medium">Zaufany Profil</span>
            </div>
            <div className="flex items-center bg-blue-400/10 border border-blue-400/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-400 text-sm font-medium">Premium Creator</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Enhanced Verification Photo Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-neon-pink/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>

            <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-700/80 to-dark-800/80 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 lg:p-8 h-full group-hover:border-green-400/50 transition-all duration-300">
              {/* Verification Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg shadow-green-400/25 animate-pulse-slow">
                <CheckCircle className="w-4 h-4 mr-2" />
                Zweryfikowane
              </div>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full flex items-center justify-center mr-4">
                  <Verified className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Zdjęcie weryfikacyjne</h3>
              </div>

              <div className="relative rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={lauraVerificationImage}
                  alt="Laura trzymająca kartkę z datą i nazwą platformy"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border border-green-400/20">
                    <p className="text-white text-sm font-medium mb-1">
                      📅 Zdjęcie wykonane: 12.05.2023
                    </p>
                    <p className="text-gray-300 text-xs">
                      Z kartką potwierdzającą tożsamość i datę
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional verification info */}
              <div className="mt-6 p-4 bg-green-400/5 border border-green-400/20 rounded-xl">
                <div className="flex items-center text-green-400 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Weryfikacja przeprowadzona przez administrację platformy
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Verification Details */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>

            <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-700/80 to-dark-800/80 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6 lg:p-8 h-full group-hover:border-gray-500/50 transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink/20 to-purple-400/20 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="text-2xl font-bold text-white">Potwierdzone informacje</h3>
              </div>

              <div className="space-y-6">
                {verificationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group/item flex items-start p-4 rounded-xl ${item.bgColor} ${item.borderColor} border hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
                  >
                    <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 group-hover/item:text-gray-100 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover/item:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Voice Verification */}
              <div className="mt-8">
                <AudioPlayer
                  title="Weryfikacja głosowa"
                  description="Nagranie potwierdzające moją tożsamość i autentyczność profilu"
                  duration="0:45"
                  className="relative"
                />
              </div>

              {/* Trust Score */}
              <div className="mt-8 p-6 bg-gradient-to-r from-neon-pink/10 to-purple-400/10 border border-neon-pink/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold mb-1">Poziom zaufania</h4>
                    <p className="text-gray-300 text-sm">Maksymalny poziom weryfikacji</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-neon-pink">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerificationSection;