"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * "Access Granted" boot-up animation - Hacker style
 */
export function AccessGranted() {
  const [show, setShow] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)

  const bootLines = [
    "INITIALIZING SYSTEM...",
    "LOADING NEURAL NETWORK...",
    "ESTABLISHING SECURE CONNECTION...",
    "VERIFYING CREDENTIALS...",
    "ACCESS GRANTED ✓",
  ]

  useEffect(() => {
    // Show lines one by one
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < bootLines.length - 1) {
          return prev + 1
        }
        clearInterval(lineInterval)
        return prev
      })
    }, 300)

    // Hide the entire component after animation
    const hideTimeout = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearInterval(lineInterval)
      clearTimeout(hideTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          <div className="space-y-2 font-mono text-sm md:text-base">
            {bootLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 ${
                  index === bootLines.length - 1
                    ? "text-matrix-green text-xl md:text-2xl font-bold animate-neon-pulse"
                    : "text-terminal-green"
                }`}
              >
                <span className="text-cyber-cyan">{'>'}</span>
                {line}
                {index === currentLine && index < bootLines.length - 1 && (
                  <span className="animate-terminal-blink">▋</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

