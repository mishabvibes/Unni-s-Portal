'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

/**
 * Floating dock component - macOS-style dock
 * 21st.dev inspired component
 */
interface DockItem {
  icon: LucideIcon
  label: string
  href: string
  color?: string
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  return (
    <div className={cn('flex items-end gap-2 p-2 rounded-2xl glass border border-primary/20', className)}>
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -12, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'relative h-12 w-12 rounded-xl flex items-center justify-center group',
            'bg-gradient-to-br transition-all',
            item.color || 'from-primary/20 to-purple-500/20 hover:from-primary/40 hover:to-purple-500/40'
          )}
        >
          <item.icon className="h-6 w-6 text-foreground group-hover:scale-110 transition-transform" />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: -10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover border rounded-md text-xs whitespace-nowrap pointer-events-none"
          >
            {item.label}
          </motion.div>
        </motion.a>
      ))}
    </div>
  )
}



