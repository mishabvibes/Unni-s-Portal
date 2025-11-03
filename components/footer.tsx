'use client'

import { Github, Linkedin, Instagram, Mail, Terminal, Code2, Cpu, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Footer component - Hacker Theme
 */
const socialLinks = [
  { icon: Github, href: 'https://github.com/mishabvibes', label: 'GITHUB', handle: 'mishabvibes' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammed-mishab-nk/', label: 'LINKEDIN', handle: 'mishab' },
  { icon: Instagram, href: 'https://instagram.com/heymishab', label: 'INSTAGRAM', handle: '@heymishab' },
  { icon: Mail, href: 'mailto:mishabvibes@gmail.com', label: 'EMAIL', handle: 'mishabvibes@gmail.com' },
]

const stats = [
  { icon: Code2, label: 'LINES OF CODE', value: '10K+' },
  // { icon: Terminal, label: 'PROJECTS', value: '39+' },
  { icon: Cpu, label: 'COMMITS', value: '500+' },
  { icon: Zap, label: 'UPTIME', value: '99.9%' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-matrix-green/20 bg-black/80 backdrop-blur-sm mb-20">
      {/* Scanlines overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />
      
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-matrix-green/30 rounded-lg p-3 sm:p-4 hover:border-matrix-green/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded bg-matrix-green/10">
                    <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-matrix-green" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-matrix-green font-mono group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs text-cyber-cyan font-mono tracking-wide truncate">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h3 className="text-lg font-black text-matrix-green font-mono tracking-wider mb-1 neon-text">
                [ CONNECT ]
              </h3>
              <div className="h-[2px] bg-gradient-to-r from-transparent via-matrix-green to-transparent" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-black/60 backdrop-blur-sm border border-matrix-green/30 rounded-lg p-4 hover:border-matrix-green transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-matrix-green/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative flex flex-col items-center gap-2">
                  <social.icon className="h-5 w-5 text-matrix-green group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <div className="text-xs font-bold text-cyber-cyan font-mono">
                      {social.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono truncate w-full">
                      {social.handle}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Terminal Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-matrix-green/20 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono">
            <div className="text-center md:text-left">
              <div className="text-matrix-green mb-1 text-[10px] sm:text-xs">
                <span className="opacity-50">root@mishab:~$</span>{' '}
                <span className="text-cyber-cyan">whoami</span>
              </div>
              <div className="text-muted-foreground text-[10px] sm:text-xs">
                © {currentYear} MISHAB <span className="text-matrix-green/50 mx-1 sm:mx-2 hidden sm:inline">|</span> 
                <span className="text-cyber-cyan block sm:inline mt-1 sm:mt-0">Full-Stack Developer</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <motion.a
                href="https://github.com/mishabvibes"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-black border border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all font-mono text-[10px] sm:text-xs font-bold"
              >
                <span className="inline-block mr-1 sm:mr-2">{'>'}</span>
                GITHUB
              </motion.a>

              <div className="flex items-center gap-1">
                <motion.div
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-matrix-green shadow-[0_0_10px_rgba(0,255,0,0.8)]"
                />
                <span className="text-matrix-green font-mono text-[10px] sm:text-xs">ONLINE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
