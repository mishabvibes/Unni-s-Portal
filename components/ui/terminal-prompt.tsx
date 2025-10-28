"use client"

import { useState, useEffect } from "react"

interface TerminalPromptProps {
  text: string
  className?: string
  speed?: number
}

/**
 * Terminal-style typing animation component
 */
export function TerminalPrompt({ 
  text, 
  className = "", 
  speed = 50 
}: TerminalPromptProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={`font-mono ${className}`}>
      <span className="text-terminal-green">$</span>{" "}
      <span className="text-foreground">{displayText}</span>
      <span className="animate-terminal-blink text-terminal-green">▋</span>
    </div>
  )
}

/**
 * Multi-line terminal output component
 */
interface TerminalOutputProps {
  lines: string[]
  className?: string
  delay?: number
}

export function TerminalOutput({ 
  lines, 
  className = "",
  delay = 100 
}: TerminalOutputProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    let currentLine = 0
    
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setVisibleLines(prev => [...prev, lines[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
      }
    }, delay)

    return () => clearInterval(interval)
  }, [lines, delay])

  return (
    <div className={`font-mono space-y-1 ${className}`}>
      {visibleLines.map((line, index) => (
        <div key={index} className="text-terminal-green">
          <span className="text-muted-foreground">{'>'}</span> {line}
        </div>
      ))}
    </div>
  )
}

