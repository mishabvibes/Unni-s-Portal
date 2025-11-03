'use client'

import { useRef } from 'react'
import PortfolioTerminal from '@/components/ui/interactive-portfolio-terminal'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { motion } from 'framer-motion'
import { Zap, Database, Cpu, Network } from 'lucide-react'
 

/**
 * Interactive Terminal Page
 * Professional full-screen terminal experience
 * Optimized for mobile and desktop
 */
export default function TerminalPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  // Power source refs
  const powerSource1 = useRef<HTMLDivElement>(null)
  const powerSource2 = useRef<HTMLDivElement>(null)
  const powerSource3 = useRef<HTMLDivElement>(null)
  const powerSource4 = useRef<HTMLDivElement>(null)

  return (
    <div className="fixed inset-0 min-h-screen h-screen relative overflow-hidden flex items-center justify-center py-0 sm:py-2 md:py-4 px-0 sm:px-2 md:px-4">
      {/* Subtle cyber grid background */}
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="w-full h-full flex flex-col justify-center items-center">
        {/* Power Sources Grid - Hidden on mobile for cleaner design */}
        <div ref={containerRef} className="relative flex flex-col items-center justify-center gap-0 md:gap-4 lg:gap-8 w-full h-full">
          
          {/* Power Sources Grid - Hidden on mobile */}
          <div className="hidden md:block w-full max-w-5xl relative z-10 mb-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-4 sm:mb-6 md:mb-8 text-matrix-green neon-text px-4"
            >
              POWER SOURCES
            </motion.h1>
            
            <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-2">
              {/* Power Source 1 - Database */}
              <motion.div
                ref={powerSource1}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-matrix-green/20 rounded-xl sm:rounded-2xl blur-xl group-hover:bg-matrix-green/30 transition-all" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-matrix-green/30 hover:border-matrix-green transition-all">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <Database className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-matrix-green group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm text-cyber-cyan font-mono font-bold">DATABASE</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-matrix-green animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Power Source 2 - CPU */}
              <motion.div
                ref={powerSource2}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-cyber-cyan/20 rounded-xl sm:rounded-2xl blur-xl group-hover:bg-cyber-cyan/30 transition-all" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-cyber-cyan/30 hover:border-cyber-cyan transition-all">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <Cpu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-cyber-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm text-matrix-green font-mono font-bold">CPU</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Power Source 3 - Network */}
              <motion.div
                ref={powerSource3}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-terminal-green/20 rounded-xl sm:rounded-2xl blur-xl group-hover:bg-terminal-green/30 transition-all" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-terminal-green/30 hover:border-terminal-green transition-all">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <Network className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-terminal-green group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm text-cyber-cyan font-mono font-bold">NETWORK</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-green animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Power Source 4 - Power */}
              <motion.div
                ref={powerSource4}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-neon-pink/20 rounded-xl sm:rounded-2xl blur-xl group-hover:bg-neon-pink/30 transition-all" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-neon-pink/30 hover:border-neon-pink transition-all">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-neon-pink group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm text-cyber-cyan font-mono font-bold">POWER</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neon-pink animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={powerSource1}
            toRef={terminalRef}
            curvature={-100}
            gradientStartColor="#00ff00"
            gradientStopColor="#00ff00"
            pathColor="#00ff00"
            pathWidth={2}
            pathOpacity={0.2}
            duration={4}
            delay={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={powerSource2}
            toRef={terminalRef}
            curvature={-70}
            gradientStartColor="#00ffff"
            gradientStopColor="#00ffff"
            pathColor="#00ffff"
            pathWidth={2}
            pathOpacity={0.2}
            duration={5}
            delay={0.5}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={powerSource3}
            toRef={terminalRef}
            curvature={-70}
            gradientStartColor="#00ff41"
            gradientStopColor="#00ff41"
            pathColor="#00ff41"
            pathWidth={2}
            pathOpacity={0.2}
            duration={4.5}
            delay={1}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={powerSource4}
            toRef={terminalRef}
            curvature={-100}
            gradientStartColor="#ff00ff"
            gradientStopColor="#ff00ff"
            pathColor="#ff00ff"
            pathWidth={2}
            pathOpacity={0.2}
            duration={6}
            delay={1.5}
          />

          {/* Terminal - Professional full-screen design for mobile */}
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full h-full md:h-[85vh] md:max-w-5xl relative z-10 flex items-center justify-center"
          >
            <div className="w-full h-full overflow-hidden rounded-none sm:rounded-lg md:rounded-xl border-0 sm:border-2 border-matrix-green/20 md:border-matrix-green/30 shadow-2xl shadow-matrix-green/10">
              <PortfolioTerminal />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
