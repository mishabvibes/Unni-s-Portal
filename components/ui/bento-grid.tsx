'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Bento Grid component - Modern card layout
 * 21st.dev style component
 */
interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  icon?: ReactNode
  span?: 'col-span-1' | 'col-span-2' | 'col-span-3' | 'row-span-2'
}

export function BentoCard({
  children,
  className,
  title,
  description,
  icon,
  span = 'col-span-1',
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-card p-6',
        'transition-all hover:shadow-2xl hover:border-primary/50',
        span,
        className
      )}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 text-4xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
        )}
        
        {children}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.div>
  )
}



