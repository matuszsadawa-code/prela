import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Lock } from 'lucide-react'
import heroVideo from '../../assets/kling_20251210_Image_to_Video_The_subjec_1306_0.mp4'

interface SecretMessageProps {
    isNaughty: boolean
}

type ChatStatus = 'idle' | 'typing' | 'sending' | 'sent' | 'replying' | 'locked_reply'

const SecretMessage: React.FC<SecretMessageProps> = ({ isNaughty }) => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<ChatStatus>('idle')
    const [chatHistory, setChatHistory] = useState<{ id: number; text: string; sender: 'me' | 'maja'; isLocked?: boolean }[]>([])
    const chatEndRef = useRef<HTMLDivElement>(null)

    // Initialize chat with welcome message
    useEffect(() => {
        setChatHistory([
            {
                id: 1,
                text: isNaughty
                    ? "Jestem teraz sama w sypialni... o czym myślisz? 😈"
                    : "Hej! Masz do mnie jakieś pytanie? Śmiało, odpisuję! 🥰",
                sender: 'maja'
            }
        ])
        setStatus('idle')
        setMessage('')
    }, [isNaughty])

    // Scroll to bottom on new message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, status])

    const handleSend = async () => {
        if (!message.trim()) return

        const userMsg = message
        setMessage('')
        setStatus('sending')

        // Add user message
        setChatHistory(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'me' }])
        setStatus('sent')

        // Simulate "Read" and "Typing"
        setTimeout(() => {
            setStatus('replying')

            // Simulate reply delay
            setTimeout(() => {
                setStatus('locked_reply')
                setChatHistory(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Hidden Content",
                    sender: 'maja',
                    isLocked: true
                }])
            }, 2500)
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto mt-20 px-4">
            <div className="relative">

                {/* Decorative elements */}
                <div className={`absolute -inset-1 rounded-3xl opacity-30 blur-xl transition-colors duration-1000 ${isNaughty
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-800"
                    : "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
                    }`} />

                {/* Chat Card */}
                <div className={`relative rounded-3xl border backdrop-blur-xl overflow-hidden shadow-2xl transition-colors duration-500 ${isNaughty
                    ? "bg-black/60 border-red-500/30 shadow-red-900/20"
                    : "bg-white/5 border-white/10 shadow-purple-900/20"
                    }`}>

                    {/* Header */}
                    <div className={`px-5 py-4 flex items-center gap-3 border-b transition-colors duration-500 ${isNaughty ? "border-red-500/20 bg-red-950/30" : "border-white/10 bg-white/5"
                        }`}>
                        <div className="relative">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/20">
                                <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm sm:text-base">Maja Lubicz</h3>
                            <p className={`text-xs opacity-80 ${isNaughty ? "text-red-300" : "text-purple-200"}`}>
                                {status === 'replying' ? 'Pisze...' : 'Dostępna teraz'}
                            </p>
                        </div>
                        {/* VIP Indicator */}
                        <div className="ml-auto">
                            <div className={`px-2 py-1 rounded-full text-[10px] font-bold border ${isNaughty ? "bg-red-500/20 border-red-500/40 text-red-200" : "bg-purple-500/20 border-purple-500/40 text-purple-200"}`}>
                                VIP CHAT
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {chatHistory.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'maja' && !msg.isLocked && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 self-end shrink-0 border border-white/10">
                                        <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {msg.isLocked ? (
                                    // LOCKED MESSAGE BUBBLE
                                    <div className="relative max-w-[85%]">
                                        <motion.div
                                            initial={{ filter: "blur(0px)" }}
                                            animate={{ filter: "blur(0px)" }}
                                            className={`rounded-2xl rounded-tl-none p-4 relative overflow-hidden ${isNaughty
                                                ? "bg-red-900/40 border border-red-500/30 text-white"
                                                : "bg-purple-900/40 border border-purple-500/30 text-white"
                                                }`}
                                        >
                                            <div className="filter blur-sm select-none opacity-50 space-y-1">
                                                <div className="h-2 w-32 bg-current rounded opacity-20"></div>
                                                <div className="h-2 w-48 bg-current rounded opacity-20"></div>
                                                <div className="h-2 w-24 bg-current rounded opacity-20"></div>
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                                <Lock className={`w-6 h-6 mb-1 ${isNaughty ? "text-red-400" : "text-pink-400"}`} />
                                                <span className="text-xs font-bold uppercase tracking-wider text-white">Wiadomość ukryta</span>
                                            </div>
                                        </motion.div>

                                        <motion.a
                                            href="/vip-access"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`block mt-2 text-xs text-center border-b pb-0.5 w-max mx-auto hover:opacity-80 transition-opacity ${isNaughty ? "text-red-400 border-red-400/30" : "text-pink-400 border-pink-400/30"
                                                }`}
                                        >
                                            Odblokuj czat, aby przeczytać
                                        </motion.a>
                                    </div>
                                ) : (
                                    // STANDARD MESSAGE BUBBLE
                                    <div className={`p-3 sm:p-4 rounded-2xl max-w-[80%] text-sm sm:text-base ${msg.sender === 'me'
                                        ? (isNaughty ? "bg-red-600 text-white rounded-br-none" : "bg-purple-600 text-white rounded-br-none")
                                        : (isNaughty ? "bg-white/10 text-gray-100 rounded-tl-none border border-white/5" : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5")
                                        }`}>
                                        {msg.text}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {status === 'replying' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-start"
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 self-end shrink-0 border border-white/10">
                                    <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                </div>
                                <div className={`p-4 rounded-2xl rounded-tl-none border ${isNaughty ? "bg-white/5 border-white/5" : "bg-white/5 border-white/5"}`}>
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            className="w-2 h-2 rounded-full bg-gray-400"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            className="w-2 h-2 rounded-full bg-gray-400"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            className="w-2 h-2 rounded-full bg-gray-400"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className={`p-3 sm:p-4 border-t transition-colors duration-500 ${isNaughty ? "border-red-500/20 bg-red-950/20" : "border-white/10 bg-white/5"}`}>
                        <div className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isNaughty ? "Napisz coś niegrzecznego..." : "Napisz wiadomość..."}
                                disabled={status === 'locked_reply' || status === 'sending'}
                                className={`w-full bg-black/30 border text-white rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 transition-all placeholder-gray-500 text-sm sm:text-base ${isNaughty
                                    ? "border-red-500/30 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20"
                                    }`}
                            />

                            <button
                                onClick={handleSend}
                                disabled={!message.trim() || status === 'locked_reply' || status === 'sending'}
                                className={`absolute right-2 p-2 rounded-full transition-all ${message.trim() && status !== 'locked_reply'
                                    ? (isNaughty ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50" : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50")
                                    : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                            </button>
                        </div>
                        <p className="text-[10px] text-center mt-2 text-gray-500">
                            Maja zazwyczaj odpisuje w ciągu <span className={isNaughty ? "text-red-400" : "text-purple-400"}>kilku minut</span>.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SecretMessage
