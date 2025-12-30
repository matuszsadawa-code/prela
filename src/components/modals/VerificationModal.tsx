import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import VerificationSection from '../sections/VerificationSection'

interface VerificationModalProps {
    isOpen: boolean
    onClose: () => void
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-black/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative gradient header */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>

                        {/* Close Button */}
                        <div className="sticky top-0 z-50 flex justify-end p-4 bg-transparent pointer-events-none">
                            <button
                                onClick={onClose}
                                className="group relative p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 hover:border-white/30 transition-all duration-300 pointer-events-auto backdrop-blur-md"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Verification Section Content */}
                        <div className="pb-8">
                            <VerificationSection isModal={true} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default VerificationModal
