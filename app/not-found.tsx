'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Home, AlertTriangle, Terminal } from 'lucide-react'
import FuzzyText from '@/components/ui/fuzzy-text'
import { motion } from 'framer-motion'

/**
 * Custom 404 Page - Hacker Theme
 * Shown when a page is not found
 */
export default function NotFound() {
  return (
    <Section className="min-h-[calc(100vh-200px)] flex items-center justify-center relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-10" />
      
      <div className="text-center space-y-8 max-w-3xl mx-auto px-4 relative z-10">
        {/* Warning Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 0, 0.3)',
                  '0 0 40px rgba(0, 255, 0, 0.6)',
                  '0 0 20px rgba(0, 255, 0, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full p-4 border-2 border-matrix-green bg-black/60 backdrop-blur-sm"
            >
              <AlertTriangle className="h-16 w-16 text-matrix-green" />
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-cyber-cyan mb-4"
        >
          <span className="text-matrix-green">root@mishab</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-cyber-cyan">~</span>
          <span className="text-muted-foreground">$</span>
          <span className="text-hacker-red ml-2">ERROR: PAGE_NOT_FOUND</span>
        </motion.div>
        
        {/* Fuzzy 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={0.5} 
            enableHover={true}
            fontSize="clamp(4rem, 20vw, 12rem)"
            fontWeight={900}
            color="#00ff00"
          >
            404
          </FuzzyText>
        </motion.div>
        
        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-matrix-green neon-text">
            ACCESS DENIED
          </h2>
          
          <div className="glass border border-matrix-green/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="font-mono text-sm space-y-2">
              <p className="text-hacker-red">
                <span className="text-matrix-green">[</span>
                <span className="text-cyber-cyan">ERROR</span>
                <span className="text-matrix-green">]</span>
                <span className="ml-2">The requested resource could not be found on this server.</span>
              </p>
              <p className="text-muted-foreground">
                <span className="text-matrix-green">[</span>
                <span className="text-cyber-cyan">INFO</span>
                <span className="text-matrix-green">]</span>
                <span className="ml-2">The page you&apos;re looking for doesn&apos;t exist or has been moved.</span>
              </p>
              <p className="text-terminal-green">
                <span className="text-matrix-green">[</span>
                <span className="text-cyber-cyan">STATUS</span>
                <span className="text-matrix-green">]</span>
                <span className="ml-2">Code: 404 | Protocol: HTTP/1.1</span>
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap pt-4"
        >
          <Button asChild size="lg" variant="neon">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="terminal">
            <Link href="/terminal">
              <Terminal className="mr-2 h-5 w-5" />
              Terminal
            </Link>
          </Button>
        </motion.div>

        {/* Corner Brackets (Hacker UI) */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-matrix-green/40 hidden md:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-matrix-green/40 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-matrix-green/40 hidden md:block" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-matrix-green/40 hidden md:block" />
      </div>
    </Section>
  )
}
