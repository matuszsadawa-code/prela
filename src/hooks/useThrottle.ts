import { useRef, useCallback } from 'react'

/**
 * Throttle hook that limits function execution to once per specified delay.
 * Uses requestAnimationFrame for optimal performance at 60fps.
 * 
 * @param callback - Function to throttle
 * @param delay - Minimum time between executions in ms (default: 16ms for 60fps)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 16 // ~60fps
): (...args: Parameters<T>) => void {
  const lastRun = useRef(Date.now())
  const timeoutRef = useRef<number>()

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const timeSinceLastRun = now - lastRun.current

      if (timeSinceLastRun >= delay) {
        callback(...args)
        lastRun.current = now
      } else {
        // Schedule the next call
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(() => {
          callback(...args)
          lastRun.current = Date.now()
        }, delay - timeSinceLastRun)
      }
    },
    [callback, delay]
  )
}
