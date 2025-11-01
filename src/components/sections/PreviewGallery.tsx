import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Lock, Play, Image, Video } from 'lucide-react'

// Import new gallery images
import newImg1 from '../../assets/gallery/550356917_24256911460671885_5800828560684937416_n.jpg'
import newImg2 from '../../assets/gallery/550372666_1905971153666919_4016956151902033765_n.jpg'
import newImg3 from '../../assets/gallery/550784987_1197507292423767_2731495334881486222_n.jpg'
import newImg4 from '../../assets/gallery/550874721_1204005315093003_6627928048095184566_n.jpg'
import newImg5 from '../../assets/gallery/551512832_1348450783573678_9108959535084188996_n.jpg'
import newImg6 from '../../assets/gallery/552150357_1262415842297978_7194948604814903546_n.jpg'

interface GalleryItem {
  id: string
  type: 'image' | 'video'
  category: 'nsfw' | 'lifestyle' | 'reels'
  title: string
  preview: string
  isBlurred: boolean
  imageUrl?: string
  thumbnailUrl?: string
}

const PreviewGallery: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      type: 'image',
      category: 'lifestyle',
      title: 'Lifestyle Photo 1',
      preview: 'Exclusive lifestyle content',
      isBlurred: false,
      imageUrl: newImg1,
      thumbnailUrl: newImg1,
    },
    {
      id: '2',
      type: 'image',
      category: 'lifestyle',
      title: 'Lifestyle Photo 2',
      preview: 'Premium lifestyle content',
      isBlurred: false,
      imageUrl: newImg2,
      thumbnailUrl: newImg2,
    },
    {
      id: '3',
      type: 'image',
      category: 'nsfw',
      title: 'Exclusive Content 1',
      preview: 'Premium exclusive content',
      isBlurred: true,
      imageUrl: newImg3,
      thumbnailUrl: newImg3,
    },
    {
      id: '4',
      type: 'image',
      category: 'nsfw',
      title: 'Exclusive Content 2',
      preview: 'Premium exclusive content',
      isBlurred: true,
      imageUrl: newImg4,
      thumbnailUrl: newImg4,
    },
    {
      id: '5',
      type: 'image',
      category: 'lifestyle',
      title: 'Lifestyle Photo 3',
      preview: 'Beautiful lifestyle moments',
      isBlurred: false,
      imageUrl: newImg5,
      thumbnailUrl: newImg5,
    },
    {
      id: '6',
      type: 'image',
      category: 'nsfw',
      title: 'Exclusive Content 3',
      preview: 'Premium exclusive content',
      isBlurred: true,
      imageUrl: newImg6,
      thumbnailUrl: newImg6,
    },
  ]

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || isPaused) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth
    const singleSetWidth = scrollWidth / 3 // Since we have 3 copies of items

    if (singleSetWidth <= clientWidth) return

    let scrollPosition = scrollContainer.scrollLeft || 0
    const scrollSpeed = 0.5 // pixels per frame
    let animationId: number

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed

        // Reset to beginning when reaching end of first set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0
        }

        scrollContainer.scrollLeft = scrollPosition
        animationId = requestAnimationFrame(autoScroll)
      }
    }

    animationId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  const handleItemClick = (item: GalleryItem) => {
    if (item.isBlurred) {
      // Redirect to subscription comparison section
      const subscriptionSection = document.getElementById('subscription-comparison')
      if (subscriptionSection) {
        subscriptionSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="preview-gallery" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">


        {/* Gallery Horizontal Scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Duplicate items for seamless infinite scroll */}
            {[...galleryItems, ...galleryItems, ...galleryItems].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                className="relative group cursor-pointer flex-shrink-0"
              >
                {/* Image/Video Container */}
                <div className="relative w-48 sm:w-56 md:w-64 aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-700 touch-manipulation">
                  {/* Actual Image */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Fallback Content if no image */}
                  {!item.imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {item.type === 'video' ? (
                          <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        ) : (
                          <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        )}
                        <p className="text-gray-400 text-sm">{item.title}</p>
                      </div>
                    </div>
                  )}

                {/* Blur Overlay for NSFW */}
                {item.isBlurred && (
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/30 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-neon-pink mx-auto mb-4" />
                      <p className="text-white font-semibold mb-2">Treści VIP</p>
                      <p className="text-gray-300 text-sm">Kliknij aby odblokować</p>
                    </div>
                  </div>
                )}

                {/* Play Button for Videos */}
                {item.type === 'video' && !item.isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-neon-pink/80 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                  transition-opacity duration-300
                  ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.preview}</p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`
                  absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-300 -z-10
                  ${hoveredItem === item.id ? 'opacity-30' : 'opacity-0'}
                  ${item.isBlurred 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                    : 'bg-gradient-to-r from-neon-pink to-neon-purple'
                  }
                `}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

export default PreviewGallery
