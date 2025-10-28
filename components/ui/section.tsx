'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer'

/**
 * Section component with scroll-triggered animations
 * Wrapper for page sections with fade-in effects
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  delay?: number
}

export function Section({ children, className, delay = 0, ...props }: SectionProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={cn('py-16 md:py-24', className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {children}
    </motion.section>
  )
}



