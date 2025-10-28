"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from "lucide-react"

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'info'
  content: string
  delay?: number
}

interface EnhancedTerminalProps {
  lines: TerminalLine[]
  username?: string
  hostname?: string
  theme?: 'kali' | 'macos' | 'matrix'
  autoPlay?: boolean
  className?: string
}

/**
 * Enhanced Terminal Component - Kali Linux / macOS Style
 * With realistic animations and styling
 */
export function EnhancedTerminal({
  lines,
  username = "mishab",
  hostname = "portfolio",
  theme = "kali",
  autoPlay = true,
  className = "",
}: EnhancedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentTyping, setCurrentTyping] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const themeConfig = {
    kali: {
      bg: "bg-[#0a0a0a]",
      header: "bg-[#2d2d2d]",
      text: "text-[#00ff00]",
      prompt: "text-[#00ff00]",
      output: "text-[#b8b8b8]",
      success: "text-[#00ff00]",
      error: "text-[#ff0000]",
      info: "text-[#00ffff]",
      border: "border-[#00ff00]/30",
      dot1: "bg-[#ff5f56]",
      dot2: "bg-[#ffbd2e]",
      dot3: "bg-[#27c93f]",
    },
    macos: {
      bg: "bg-[#1e1e1e]",
      header: "bg-[#323232]",
      text: "text-[#d4d4d4]",
      prompt: "text-[#4ec9b0]",
      output: "text-[#cccccc]",
      success: "text-[#4ec9b0]",
      error: "text-[#f48771]",
      info: "text-[#569cd6]",
      border: "border-[#4ec9b0]/30",
      dot1: "bg-[#ff5f56]",
      dot2: "bg-[#ffbd2e]",
      dot3: "bg-[#27c93f]",
    },
    matrix: {
      bg: "bg-black",
      header: "bg-[#0a0a0a]",
      text: "text-matrix-green",
      prompt: "text-matrix-green",
      output: "text-terminal-green",
      success: "text-matrix-green",
      error: "text-hacker-red",
      info: "text-cyber-cyan",
      border: "border-matrix-green/30",
      dot1: "bg-hacker-red",
      dot2: "bg-cyber-cyan",
      dot3: "bg-matrix-green",
    },
  }

  const config = themeConfig[theme]

  useEffect(() => {
    if (!autoPlay) return

    let currentLine = 0
    let charIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeNextChar = () => {
      if (currentLine >= lines.length) return

      const line = lines[currentLine]
      
      if (line.type === 'command') {
        if (charIndex < line.content.length) {
          setIsTyping(true)
          setCurrentTyping(line.content.substring(0, charIndex + 1))
          charIndex++
          timeoutId = setTimeout(typeNextChar, 50 + Math.random() * 50)
        } else {
          setIsTyping(false)
          setCurrentTyping("")
          setVisibleLines(currentLine + 1)
          currentLine++
          charIndex = 0
          timeoutId = setTimeout(typeNextChar, line.delay || 500)
        }
      } else {
        setVisibleLines(currentLine + 1)
        currentLine++
        timeoutId = setTimeout(typeNextChar, line.delay || 300)
      }
    }

    timeoutId = setTimeout(typeNextChar, 1000)

    return () => clearTimeout(timeoutId)
  }, [lines, autoPlay])

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'success':
        return config.success
      case 'error':
        return config.error
      case 'info':
        return config.info
      case 'output':
        return config.output
      default:
        return config.text
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg overflow-hidden shadow-2xl ${config.border} border-2 ${className}`}
    >
      {/* Terminal Header */}
      <div className={`${config.header} px-4 py-3 flex items-center justify-between border-b ${config.border}`}>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${config.dot1} shadow-sm`} />
          <div className={`w-3 h-3 rounded-full ${config.dot2} shadow-sm`} />
          <div className={`w-3 h-3 rounded-full ${config.dot3} shadow-sm`} />
        </div>
        <div className="flex items-center gap-2">
          <TerminalIcon className={`h-4 w-4 ${config.text}`} />
          <span className={`text-sm font-mono ${config.text}`}>
            {username}@{hostname}
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <Minimize2 className={`h-3 w-3 ${config.text} cursor-pointer hover:opacity-100`} />
          <Maximize2 className={`h-3 w-3 ${config.text} cursor-pointer hover:opacity-100`} />
          <X className={`h-3 w-3 ${config.text} cursor-pointer hover:opacity-100`} />
        </div>
      </div>

      {/* Terminal Body */}
      <div className={`${config.bg} p-6 font-mono text-sm min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin`}>
        <div className="space-y-2">
          {lines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="leading-relaxed"
            >
              {line.type === 'command' ? (
                <div className="flex items-start gap-2">
                  <span className={`${config.prompt} flex-shrink-0`}>
                    {username}@{hostname}:~$
                  </span>
                  <span className={config.text}>{line.content}</span>
                </div>
              ) : (
                <div className={`pl-2 ${getLineColor(line.type)}`}>
                  {line.content.split('\n').map((text, i) => (
                    <div key={i}>{text}</div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Current typing line */}
          {isTyping && currentTyping && (
            <div className="flex items-start gap-2">
              <span className={`${config.prompt} flex-shrink-0`}>
                {username}@{hostname}:~$
              </span>
              <span className={config.text}>
                {currentTyping}
                <span className="animate-pulse">▋</span>
              </span>
            </div>
          )}

          {/* Blinking cursor when idle */}
          {!isTyping && visibleLines === lines.length && (
            <div className="flex items-start gap-2">
              <span className={`${config.prompt} flex-shrink-0`}>
                {username}@{hostname}:~$
              </span>
              <span className={`${config.text} animate-pulse`}>▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Footer (optional) */}
      <div className={`${config.header} px-4 py-2 border-t ${config.border}`}>
        <div className="flex items-center justify-between text-xs">
          <span className={`${config.text} opacity-50`}>
            {theme.toUpperCase()} Terminal v1.0
          </span>
          <span className={`${config.success} flex items-center gap-1`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            CONNECTED
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Preset Terminal Demos
 */

// Kali Linux style demo
export function KaliTerminalDemo() {
  const lines: TerminalLine[] = [
    { type: 'command', content: 'neofetch', delay: 800 },
    { type: 'output', content: '       _,met$$$$$gg.          mishab@portfolio', delay: 200 },
    { type: 'output', content: '    ,g$$$$$$$$$$$$$$$P.       ----------------', delay: 100 },
    { type: 'output', content: '  ,g$$P"     """Y$$.".        OS: Kali Linux', delay: 100 },
    { type: 'output', content: ' ,$$P\'              `$$$.     Host: Portfolio System', delay: 100 },
    { type: 'info', content: '\'$$P       ,ggs.     `$$b:    Kernel: 6.5.0-kali', delay: 100 },
    { type: 'info', content: '`d$$\'     ,$P"\'   .    $$$    Uptime: 1337 days', delay: 100 },
    { type: 'success', content: ' $$P      d$\'     ,    $$P    Shell: zsh 5.9', delay: 800 },
    { type: 'command', content: 'cat skills.txt', delay: 800 },
    { type: 'success', content: '✓ React.js & Next.js - Expert', delay: 200 },
    { type: 'success', content: '✓ TypeScript - Advanced', delay: 200 },
    { type: 'success', content: '✓ Django & Python - Expert', delay: 200 },
    { type: 'success', content: '✓ Node.js & Express - Advanced', delay: 800 },
    { type: 'command', content: './check_status.sh', delay: 800 },
    { type: 'success', content: '[✓] System Status: ONLINE', delay: 200 },
    { type: 'success', content: '[✓] Portfolio Status: ACTIVE', delay: 200 },
    { type: 'success', content: '[✓] Availability: OPEN FOR PROJECTS', delay: 200 },
    { type: 'info', content: '[i] Location: Kerala, India 🇮🇳', delay: 200 },
    { type: 'success', content: '[✓] Ready to code amazing projects!', delay: 500 },
  ]

  return <EnhancedTerminal lines={lines} theme="kali" username="mishab" hostname="dev-machine" />
}

// macOS style demo
export function MacOSTerminalDemo() {
  const lines: TerminalLine[] = [
    { type: 'command', content: 'whoami', delay: 800 },
    { type: 'output', content: 'mishab - Full-Stack Developer', delay: 500 },
    { type: 'command', content: 'pwd', delay: 800 },
    { type: 'output', content: '/home/mishab/portfolio', delay: 500 },
    { type: 'command', content: 'ls -la skills/', delay: 800 },
    { type: 'info', content: 'drwxr-xr-x  frontend/', delay: 150 },
    { type: 'info', content: 'drwxr-xr-x  backend/', delay: 150 },
    { type: 'info', content: 'drwxr-xr-x  database/', delay: 150 },
    { type: 'info', content: 'drwxr-xr-x  tools/', delay: 500 },
    { type: 'command', content: 'cat frontend/expertise.json', delay: 800 },
    { type: 'success', content: '{ "react": "expert", "nextjs": "expert", "typescript": "advanced" }', delay: 500 },
    { type: 'command', content: 'echo $STATUS', delay: 800 },
    { type: 'success', content: '🟢 Available for awesome projects!', delay: 300 },
  ]

  return <EnhancedTerminal lines={lines} theme="macos" username="mishab" hostname="macbook-pro" />
}

// Matrix style demo
export function MatrixTerminalDemo() {
  const lines: TerminalLine[] = [
    { type: 'command', content: 'ACCESS PORTFOLIO DATABASE...', delay: 800 },
    { type: 'success', content: '[CONNECTED] Neural Interface Online', delay: 300 },
    { type: 'command', content: 'QUERY: DEVELOPER_INFO', delay: 800 },
    { type: 'info', content: '> Name: MISHAB', delay: 200 },
    { type: 'info', content: '> Role: FULL-STACK ALCHEMIST', delay: 200 },
    { type: 'info', content: '> Location: KERALA, INDIA', delay: 200 },
    { type: 'success', content: '> Status: MATRIX CONNECTED', delay: 500 },
    { type: 'command', content: 'SCAN: TECH_STACK', delay: 800 },
    { type: 'success', content: '[████████████████████] 100% - React.js', delay: 150 },
    { type: 'success', content: '[████████████████████] 100% - Next.js', delay: 150 },
    { type: 'success', content: '[█████████████████   ] 90% - TypeScript', delay: 150 },
    { type: 'success', content: '[█████████████████   ] 90% - Django', delay: 150 },
    { type: 'success', content: '[████████████████    ] 85% - Node.js', delay: 500 },
    { type: 'command', content: 'EXECUTE: AVAILABILITY_CHECK', delay: 800 },
    { type: 'success', content: '>>> SYSTEM READY FOR NEW MISSIONS <<<', delay: 300 },
    { type: 'success', content: '>>> AWAITING PROJECT INITIALIZATION <<<', delay: 300 },
  ]

  return <EnhancedTerminal lines={lines} theme="matrix" username="NEO" hostname="MATRIX" />
}

