'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Sparkles animation effect
 * Adds magical floating particles
 */
interface SparklesProps {
  className?: string
  count?: number
}

export function Sparkles({ className, count = 20 }: SparklesProps) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}



