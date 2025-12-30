import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook for managing sound effects with toggle control.
 * Sound state is persisted in localStorage.
 */
export const useSoundEffects = () => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('soundEffectsEnabled')
            return stored !== null ? stored === 'true' : false
        }
        return false
    })

    useEffect(() => {
        localStorage.setItem('soundEffectsEnabled', String(isSoundEnabled))
    }, [isSoundEnabled])

    const toggleSound = useCallback(() => {
        setIsSoundEnabled((prev) => !prev)
    }, [])

    const playClickSound = useCallback(() => {
        if (!isSoundEnabled) return

        // Create a simple click sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.value = 800
            oscillator.type = 'sine'

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.1)
        } catch {
            // Silently fail if audio context is not available
        }
    }, [isSoundEnabled])

    return { isSoundEnabled, toggleSound, playClickSound }
}

export default useSoundEffects
