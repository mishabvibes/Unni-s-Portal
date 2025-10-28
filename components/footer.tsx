'use client'

import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, Heart, Coffee } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Footer component - Mishab's Portfolio
 */
const socialLinks = [
  { icon: Github, href: 'https://github.com/mishabvibes', label: 'GitHub', count: '39+ repos' },
  { icon: Linkedin, href: 'https://linkedin.com/in/muhammed-mishab-71311034a', label: 'LinkedIn', count: 'Connect' },
  { icon: Instagram, href: 'https://instagram.com/heymishab', label: 'Instagram', count: '@heymishab' },
  { icon: Mail, href: 'mailto:mishabvibes@gmail.com', label: 'Email', count: 'Say hi!' },
]

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const funQuotes = [
  "Powered by coffee ☕ and curiosity 🚀",
  "Turning bugs into features since 2021 🐛✨",
  "Code is poetry, bugs are... plot twists! 📖",
  "Building the web, one commit at a time 💻",
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const randomQuote = funQuotes[Math.floor(Math.random() * funQuotes.length)]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-4 flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ⚡
              </motion.span>
              Mishab's Portfolio
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Full-Stack Alchemist 🧪 | Web Magician ✨ | Code Connoisseur ☕
            </p>
            <p className="text-xs text-muted-foreground italic">
              {randomQuote}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Coffee className="h-4 w-4" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
              🌐 Let's Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <social.icon className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{social.label}</div>
                    <div className="text-[10px] text-muted-foreground group-hover:text-primary-foreground/80 truncate">
                      {social.count}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap justify-center">
              <span>© {currentYear} Mishab.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> 
                and lots of <Coffee className="h-3 w-3 text-amber-600" />
              </span>
              <span className="hidden md:inline">•</span>
              <span>Built with Next.js & Tailwind CSS</span>
            </p>
            <div className="flex items-center gap-2">
              <motion.a
                href="https://github.com/mishabvibes"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium"
              >
                ⭐ Star on GitHub
              </motion.a>
            </div>
          </div>
          
          {/* Fun Easter egg */}
          <div className="mt-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-muted-foreground"
            >
              <span className="opacity-50">
                💡 Fun fact: This site has {Math.floor(Math.random() * 100)}% less bugs than my first project! 😄
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}
