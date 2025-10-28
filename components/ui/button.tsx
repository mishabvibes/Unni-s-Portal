'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Button variants following 21st.dev minimal design principles
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient' | 'neon' | 'terminal'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean // Add asChild prop (for Radix UI compatibility)
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20',
      outline: 'border-2 border-primary/30 bg-background hover:bg-primary/10 hover:border-primary/50 hover:shadow-md hover:shadow-primary/20',
      ghost: 'hover:bg-secondary hover:text-secondary-foreground',
      gradient: 'bg-gradient-to-r from-matrix-green via-cyber-cyan to-neon-pink text-black hover:shadow-lg hover:shadow-matrix-green/50 font-semibold',
      neon: 'border-2 border-matrix-green bg-transparent text-matrix-green hover:bg-matrix-green hover:text-black hover:shadow-lg hover:shadow-matrix-green/50 transition-all duration-300',
      terminal: 'bg-black border-2 border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover:shadow-md hover:shadow-terminal-green/30 font-mono',
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    }

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )

    // If asChild is true, render children directly with classes applied
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonClasses, (children as React.ReactElement).props?.className),
      })
    }

    // Default button rendering
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={buttonClasses}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }



