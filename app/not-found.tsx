'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradient } from '@/components/ui/animated-gradient'

/**
 * Custom 404 Not Found Page
 * Creative design with navigation options
 */
export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGradient className="absolute inset-0 opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none">
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for seems to have wandered off into the digital void.
              <br />
              Don't worry, we'll help you find your way back.
            </p>
          </motion.div>

          {/* Animated illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="text-8xl mb-4">
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="inline-block"
              >
                🧭
              </motion.span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" variant="gradient">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => typeof window !== 'undefined' && window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 pt-8 border-t"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {typeof window !== 'undefined' && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {['🚀', '⭐', '🌟', '💫', '✨'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}



