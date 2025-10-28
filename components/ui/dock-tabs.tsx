"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Home, User, Briefcase, FileText, Terminal, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DockItem {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  href: string
}

const dockItems: DockItem[] = [
  { id: "home", name: "Home", icon: <Home />, color: "from-matrix-green to-terminal-green", href: "/" },
  { id: "about", name: "About", icon: <User />, color: "from-cyber-cyan to-blue-500", href: "/about" },
  { id: "projects", name: "Projects", icon: <Briefcase />, color: "from-neon-purple to-purple-600", href: "/projects" },
  { id: "blog", name: "Blog", icon: <FileText />, color: "from-neon-pink to-pink-600", href: "/blog" },
  { id: "terminal", name: "Terminal", icon: <Terminal />, color: "from-terminal-green to-matrix-green", href: "/terminal" },
  { id: "contact", name: "Contact", icon: <Mail />, color: "from-hacker-red to-red-600", href: "/contact" },
]

function DockIcon({ item, mouseX, isActive }: { item: DockItem; mouseX: any; isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Responsive sizing: smaller on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const baseSize = isMobile ? 40 : 48
  const maxSize = isMobile ? 56 : 72
  
  const widthSync = useTransform(distance, [-150, 0, 150], [baseSize, maxSize, baseSize])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 })

  const heightSync = useTransform(distance, [-150, 0, 150], [baseSize, maxSize, baseSize])
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 200, damping: 15 })

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      className="aspect-square cursor-pointer flex items-center justify-center relative group"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
    >
      <motion.div
        className={`w-full h-full rounded-[18px] shadow-lg flex items-center justify-center text-white relative overflow-hidden bg-gradient-to-br ${item.color} border border-white/20`}
        animate={{
          y: isClicked ? 1 : isHovered ? -12 : 0,
          boxShadow: isActive 
            ? "0 0 25px rgba(0, 255, 0, 0.7), 0 0 40px rgba(0, 255, 0, 0.3), 0 8px 30px rgba(0, 0, 0, 0.4)"
            : isHovered
            ? "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 255, 0, 0.4)"
            : "0 4px 12px rgba(0, 0, 0, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
      >
        <motion.div
          className="text-[22px]"
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
        >
          {item.icon}
        </motion.div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-[18px]"
          animate={{
            opacity: isHovered ? 0.4 : 0.15,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Active glow ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-[18px] border-2 border-matrix-green"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Hacker scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent rounded-[18px]"
          animate={{
            y: isHovered ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -30 : 20,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
        }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/95 text-matrix-green text-sm px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none backdrop-blur-md border border-matrix-green/50 font-mono font-semibold shadow-lg z-50"
        style={{
          boxShadow: "0 0 15px rgba(0, 255, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        {item.name}
        {/* Tooltip arrow */}
        <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/95 border-r border-b border-matrix-green/50 rotate-45" />
      </motion.div>

      {/* Active indicator dot */}
      <motion.div
        className={`absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${isActive ? 'bg-matrix-green shadow-[0_0_10px_rgba(0,255,0,0.8)]' : 'bg-white/40'}`}
        animate={{
          scale: isActive ? [1, 1.4, 1] : isClicked ? 1.4 : 1,
          opacity: isActive ? 1 : isClicked ? 1 : 0.6,
        }}
        transition={{
          scale: isActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 500, damping: 30 },
        }}
      />
    </motion.div>
  )

  // Wrap with Link for internal routes, a for external
  if (item.href.startsWith('http')) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return <Link href={item.href}>{content}</Link>
}

export function DockTabs() {
  const mouseX = useMotionValue(Infinity)
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-6 pointer-events-none flex items-center justify-center">
      <div className="flex items-center justify-center px-2 sm:px-4 py-6 sm:py-8">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="pointer-events-auto flex h-[64px] sm:h-[80px] items-center justify-center gap-2 sm:gap-4 rounded-[20px] sm:rounded-[24px] bg-black/90 backdrop-blur-2xl px-3 sm:px-6 py-2 sm:py-3 border border-matrix-green/40 shadow-2xl relative"
          style={{
            boxShadow: "0 0 60px rgba(0, 255, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(0, 255, 0, 0.2)",
            overflow: "visible",
          }}
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 0.2,
          }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-green/5 to-transparent rounded-[24px] pointer-events-none"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Cyber grid pattern background */}
          <div className="absolute inset-0 opacity-5 rounded-[24px] overflow-hidden pointer-events-none">
            <div className="cyber-grid" />
          </div>

          {/* Scanlines effect */}
          <div className="scanlines absolute inset-0 pointer-events-none opacity-30 rounded-[24px]" />

          {/* Bottom glow line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-matrix-green to-transparent rounded-b-[24px] pointer-events-none"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 flex items-center justify-center gap-4">
            {dockItems.map((item) => (
              <DockIcon 
                key={item.id} 
                item={item} 
                mouseX={mouseX} 
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

