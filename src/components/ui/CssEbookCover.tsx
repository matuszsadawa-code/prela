import React from 'react'

// Dekoracyjna grafika CSS (bez obrazków) pod „okładkę” e-booka.
// Zastosowano neon/glass styl spójny z prelandingiem: gradienty, siatka, koła/„monety”, błyszczący pasek.
// Grafika jest dekoracyjna – aria-hidden oraz role="img" z etykietą opisującą charakter dekoracji.

type AnimationVariant = 'calm' | 'vivid'

interface CssEbookCoverProps {
  showRibbon?: boolean
  ribbonText?: string
  animationVariant?: AnimationVariant
}

const CssEbookCover: React.FC<CssEbookCoverProps> = ({
  showRibbon = false,
  ribbonText = 'Promocja',
  animationVariant = 'calm'
}) => {
  const floatClass = animationVariant === 'vivid' ? 'animate-float-vivid' : 'animate-float'
  return (
    <div className="relative w-full h-full">
      {/* Pseudo-grzbiet książki */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-6 sm:w-7 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-700/90 shadow-inner"
      />
      {/* Tło radialne */}
      <div
        aria-label="Dekoracyjna grafika CSS okładki e-booka"
        role="img"
        className="absolute inset-0 rounded-3xl bg-gradient-radial from-neon-pink/25 via-neon-purple/10 to-transparent blur-[1px]"
      />

      {/* Subtelna siatka */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 rounded-3xl"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)'
        }}
      />

      {/* Błyszczący ukośny pasek (gloss) */}
      <div
        aria-hidden="true"
        className="absolute -left-8 top-8 w-[65%] h-10 sm:h-12 bg-gradient-to-r from-white/35 via-white/10 to-transparent rounded-2xl blur-md rotate-[-18deg]"
      />

      {/* Delikatne promienie światła */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-conic from-neon-pink/20 via-transparent to-transparent blur-xl" />
        <div className="absolute bottom-1/5 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-conic from-neon-purple/20 via-transparent to-transparent blur-xl" />
      </div>

      {/* Akcentowe „monety”/kręgi */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className={`absolute left-8 bottom-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-neon-pink/40 to-neon-purple/30 border border-pink-400/40 shadow-lg shadow-neon-pink/30 ${floatClass}`} />
        <div className={`absolute right-10 top-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-pink/30 border border-pink-400/40 shadow-lg shadow-neon-purple/30 ${floatClass} delay-500`} />
        <div className={`absolute right-16 bottom-12 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-neon-pink/40 to-neon-purple/30 border border-pink-400/40 shadow-lg shadow-neon-pink/30 ${floatClass} delay-1000`} />
      </div>

      {/* Ramka wewnętrzna z subtelną poświatą i gradientową obwódką */}
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-2xl border border-pink-400/20 shadow-inner"
      />
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl pointer-events-none">
        <div className="absolute inset-0 rounded-3xl" style={{
          padding: '2px',
          background: 'linear-gradient(135deg, rgba(255,20,147,0.35), rgba(147,51,234,0.25))',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor' as any,
          maskComposite: 'exclude'
        }} />
      </div>

      {/* Tytuł na okładce (CSS-only, bez obrazka) z lekkim efektem tłoczenia */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="backdrop-blur-[2px]">
          <h3
            className="text-white font-playfair font-extrabold text-xl sm:text-2xl tracking-wide"
            style={{
              textShadow: '0 1px 0 rgba(255,255,255,0.15), 0 6px 14px rgba(147,51,234,0.25)'
            }}
          >
            Zarabiaj na Kryptowalutach
          </h3>
          <p className="mt-1 text-gray-300 text-xs sm:text-sm tracking-wide">by Maja Lubicz</p>
        </div>
      </div>

      {/* Róg „Promocja” jako wstążka — sterowane przez props */}
      {showRibbon && (
        <div aria-hidden="true" className="absolute -top-2 -right-2">
          <div className="relative">
            <div className="absolute right-0 top-0 origin-top-right rotate-45 bg-gradient-to-r from-neon-pink to-neon-purple text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-sm shadow-lg">
              {ribbonText}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CssEbookCover