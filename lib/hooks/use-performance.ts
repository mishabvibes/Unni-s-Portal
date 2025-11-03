/**
 * Performance optimization hooks
 * For better performance on low-spec devices
 */

import { useReducedMotion } from 'framer-motion'

/**
 * Get optimized animation settings based on device preferences
 */
export function useOptimizedAnimations() {
  const prefersReducedMotion = useReducedMotion()
  
  return {
    prefersReducedMotion: !!prefersReducedMotion,
    // Default animation settings
    defaultInitial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    defaultAnimate: { opacity: 1, y: 0 },
    defaultTransition: prefersReducedMotion ? {} : { duration: 0.3 },
    // Reduced delays
    getDelay: (baseDelay: number) => prefersReducedMotion ? 0 : Math.min(baseDelay, 0.2),
  }
}

