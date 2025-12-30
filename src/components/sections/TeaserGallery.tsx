import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

// Imports for gallery images
import img1 from '../../assets/gallery/550356917_24256911460671885_5800828560684937416_n.jpg'
import img2 from '../../assets/gallery/550372666_1905971153666919_4016956151902033765_n.jpg'
import img3 from '../../assets/gallery/550784987_1197507292423767_2731495334881486222_n.jpg'
import img4 from '../../assets/gallery/550874721_1204005315093003_6627928048095184566_n.jpg'
import img5 from '../../assets/gallery/551512832_1348450783573678_9108959535084188996_n.jpg'
import img6 from '../../assets/gallery/552150357_1262415842297978_7194948604814903546_n.jpg'

interface GalleryItem {
    id: number
    src: string
    isLocked: boolean
    alt: string
}

const niceGalleryItems: GalleryItem[] = [
    { id: 1, src: img1, isLocked: false, alt: "Maja Lubicz Photo 1" },
    { id: 3, src: img3, isLocked: false, alt: "Maja Lubicz Photo 2" },
    { id: 5, src: img5, isLocked: false, alt: "Maja Lubicz Photo 3" },
    { id: 2, src: img4, isLocked: true, alt: "Maja Lubicz Locked 1" },
    { id: 4, src: img6, isLocked: true, alt: "Maja Lubicz Locked 2" },
    { id: 6, src: img2, isLocked: true, alt: "Maja Lubicz Locked 3" },
]

const naughtyGalleryItems: GalleryItem[] = [
    { id: 2, src: img4, isLocked: true, alt: "Maja Exclusive 1" },
    { id: 4, src: img6, isLocked: true, alt: "Maja Exclusive 2" },
    { id: 6, src: img2, isLocked: true, alt: "Maja Exclusive 3" },
    { id: 1, src: img1, isLocked: true, alt: "Maja Secret 1" },
    { id: 3, src: img3, isLocked: false, alt: "Maja Photo 2" },
    { id: 5, src: img5, isLocked: true, alt: "Maja Secret 2" },
]

interface TeaserGalleryProps {
    isNaughty: boolean
}

// Skeleton loader component
const SkeletonCard: React.FC<{ index: number }> = ({ index }) => (
    <div
        className="relative flex-none w-[260px] xs:w-[280px] sm:w-[calc(33.333%-16px)] snap-center aspect-[3/4] rounded-xl overflow-hidden"
    >
        <motion.div
            className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 0.2
                }}
            />
        </motion.div>
        <div className="absolute inset-0 border-2 rounded-xl border-gray-700/50" />
    </div>
)

const TeaserGallery: React.FC<TeaserGalleryProps> = ({ isNaughty }) => {
    const currentItems = isNaughty ? naughtyGalleryItems : niceGalleryItems
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
    const [isInitialLoading, setIsInitialLoading] = useState(true)

    // Simulate initial loading delay for skeleton effect
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => new Set(prev).add(id))
    }

    return (
        <div className="w-full max-w-5xl mx-auto mt-12 px-2">
            <div className="text-center mb-8">
                <h2 className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent mb-2 transition-all duration-500 ${isNaughty ? "bg-gradient-to-r from-red-500 to-rose-600" : "bg-gradient-to-r from-pink-400 to-purple-400"}`}>
                    {isNaughty ? "Prywatna Galeria 😈" : "Ostatnie Zdjęcia 📸"}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                    {isNaughty
                        ? <span className="text-red-400 font-medium">To, czego nie pokazuję na Instagramie...</span>
                        : <span>Dla fanów VIP mam coś <span className="text-pink-400 font-semibold">znacznie</span> ciekawszego...</span>
                    }
                </p>
            </div>

            <div className="relative w-full">
                {/* Horizontal Slider Container */}
                <motion.div
                    layout
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-4 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',  /* Firefox */
                        msOverflowStyle: 'none',  /* IE and Edge */
                    }}
                >
                    <AnimatePresence mode='popLayout'>
                        {isInitialLoading ? (
                            // Show skeleton loaders while initial loading
                            [...Array(6)].map((_, index) => (
                                <SkeletonCard key={`skeleton-${index}`} index={index} />
                            ))
                        ) : (
                            currentItems.map((item, index) => (
                                <motion.div
                                    key={`${isNaughty ? 'naughty' : 'nice'}-${item.id}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className={`relative flex-none w-[260px] xs:w-[280px] sm:w-[calc(33.333%-16px)] snap-center aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer shadow-lg`}
                                >
                                    {/* Skeleton placeholder while image loads */}
                                    {!loadedImages.has(item.id) && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-skeleton">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                                animate={{
                                                    x: ['-100%', '100%'],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            />
                                        </div>
                                    )}

                                    <motion.div
                                        className={`w-full h-full transition-all duration-500 ${item.isLocked ? 'blur-md scale-105 contrast-125 brightness-50' : 'group-hover:scale-110'}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: loadedImages.has(item.id) ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover pointer-events-none select-none"
                                            loading="lazy"
                                            draggable="false"
                                            onLoad={() => handleImageLoad(item.id)}
                                        />
                                    </motion.div>

                                    {item.isLocked && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full backdrop-blur-md border flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(236,72,153,0.3)] ${isNaughty ? "bg-red-500/20 border-red-500/30" : "bg-white/10 border-white/20"}`}
                                            >
                                                <Lock className={`w-6 h-6 sm:w-8 sm:h-8 ${isNaughty ? "text-red-400" : "text-pink-400"}`} />
                                            </motion.div>
                                        </div>
                                    )}
                                    <div className={`absolute inset-0 border-2 rounded-xl pointer-events-none transition-colors duration-300 ${item.isLocked ? (isNaughty ? 'border-red-500/30' : 'border-pink-500/30') : 'border-white/10 group-hover:border-white/30'}`} />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Custom scrollbar hide style for Webkit */}
                <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `}</style>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
                <a href="/vip-access" className={`inline-flex items-center gap-2 text-sm transition-colors border-b pb-0.5 ${isNaughty ? "text-red-400 hover:text-red-300 border-red-400/30 hover:border-red-300" : "text-pink-400 hover:text-pink-300 border-pink-400/30 hover:border-pink-300"}`}>
                    {isNaughty ? "Odblokuj wszystko teraz" : "Zobacz pełną, nieocenzurowaną galerię"} <Lock className="w-3 h-3" />
                </a>
            </motion.div>
        </div>
    )
}
export default TeaserGallery
