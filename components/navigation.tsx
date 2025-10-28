'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles, Home, User, Briefcase, FileText, Terminal as TerminalIcon, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'
import { useScrollProgress } from '@/lib/hooks/use-scroll-progress'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/**
 * Main navigation component with scroll progress indicator and breadcrumbs
 * Enhanced with personality for Mishab's portfolio
 */
const navLinks = [
  { href: '/', label: 'Home', emoji: '🏠', icon: Home },
  { href: '/about', label: 'About', emoji: '👨‍💻', icon: User },
  { href: '/projects', label: 'Projects', emoji: '🚀', icon: Briefcase },
  { href: '/blog', label: 'Blog', emoji: '📝', icon: FileText },
  { href: '/terminal', label: 'Terminal', emoji: '💻', icon: TerminalIcon },
  { href: '/contact', label: 'Contact', emoji: '📧', icon: Mail },
]

// Get breadcrumb path from pathname
function getBreadcrumbPath(pathname: string) {
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ href: '/', label: 'Home', icon: Home }]
  
  let currentPath = ''
  paths.forEach((path) => {
    currentPath += `/${path}`
    const navLink = navLinks.find(link => link.href === currentPath)
    if (navLink) {
      breadcrumbs.push({
        href: navLink.href,
        label: navLink.label,
        icon: navLink.icon
      })
    } else {
      // For dynamic routes like /blog/[slug]
      breadcrumbs.push({
        href: currentPath,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        icon: FileText
      })
    }
  })
  
  return breadcrumbs
}

export function Navigation() {
  const pathname = usePathname()
  const scrollProgress = useScrollProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const breadcrumbs = getBreadcrumbPath(pathname)
  const showBreadcrumbs = pathname !== '/' // Always show on non-home pages

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Main navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-matrix-green/10' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-2xl"
              >
                ⚡
              </motion.div>
              <span className="text-xl font-bold gradient-text">
                Mishab
              </span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all relative group',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="group-hover:scale-125 transition-transform inline-block">
                      {link.emoji}
                    </span>
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-secondary rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Theme toggle and mobile menu button */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Breadcrumbs - Always visible on non-home pages */}
          {showBreadcrumbs && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-3 border-t border-matrix-green/20 pt-3 bg-gradient-to-r from-transparent via-matrix-green/5 to-transparent"
            >
              <Breadcrumb>
                <BreadcrumbList className="text-sm">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    const Icon = crumb.icon
                    
                    return (
                      <React.Fragment key={crumb.href}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="inline-flex items-center gap-2 text-matrix-green font-semibold">
                              <Icon className="w-4 h-4" />
                              {crumb.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink 
                              href={crumb.href}
                              className="inline-flex items-center gap-2 text-muted-foreground hover:text-matrix-green transition-colors hover:scale-105 transform"
                            >
                              <Icon className="w-4 h-4" />
                              {crumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator>
                            <span className="text-matrix-green font-bold">/</span>
                          </BreadcrumbSeparator>
                        )}
                      </React.Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          )}
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <span className="text-xl">{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
