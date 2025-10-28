'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Animated gradient background component
 * Magic UI inspired effect
 */
interface AnimatedGradientProps {
  className?: string
  children?: React.ReactNode
}

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.5) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.5) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {children}
    </div>
  )
}



