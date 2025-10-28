"use client"

import { FC } from "react"

/**
 * Hacker-themed cursor SVG with matrix green glow
 */
export const HackerCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      className="hacker-cursor-svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#00ffff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Outer glow circle */}
      <circle 
        cx="20" 
        cy="20" 
        r="15" 
        fill="none" 
        stroke="#00ff00" 
        strokeWidth="0.5" 
        opacity="0.3"
        filter="url(#glow)"
      />
      
      {/* Main cursor pointer */}
      <path
        d="M20 5 L35 20 L25 22 L30 35 L24 37 L19 24 L12 30 Z"
        fill="url(#neonGradient)"
        stroke="#00ff00"
        strokeWidth="1"
        filter="url(#glow)"
      />
      
      {/* Inner accent */}
      <path
        d="M20 5 L35 20 L25 22 L30 35 L24 37 L19 24 L12 30 Z"
        fill="none"
        stroke="#00ffff"
        strokeWidth="0.5"
        opacity="0.6"
      />
      
      {/* Terminal dots */}
      <circle cx="20" cy="20" r="2" fill="#00ffff" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      
      <style>{`
        .hacker-cursor-svg {
          filter: drop-shadow(0 0 3px #00ff00) drop-shadow(0 0 8px #00ff00);
        }
      `}</style>
    </svg>
  )
}

/**
 * Terminal-style crosshair cursor
 */
export const TerminalCrosshair: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
    >
      <defs>
        <filter id="terminal-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Crosshair lines */}
      <line x1="15" y1="0" x2="15" y2="12" stroke="#00ff00" strokeWidth="1" filter="url(#terminal-glow)" />
      <line x1="15" y1="18" x2="15" y2="30" stroke="#00ff00" strokeWidth="1" filter="url(#terminal-glow)" />
      <line x1="0" y1="15" x2="12" y2="15" stroke="#00ff00" strokeWidth="1" filter="url(#terminal-glow)" />
      <line x1="18" y1="15" x2="30" y2="15" stroke="#00ff00" strokeWidth="1" filter="url(#terminal-glow)" />
      
      {/* Center circle */}
      <circle cx="15" cy="15" r="4" fill="none" stroke="#00ff00" strokeWidth="1" filter="url(#terminal-glow)" />
      <circle cx="15" cy="15" r="2" fill="#00ff00" opacity="0.5">
        <animate
          attributeName="r"
          values="1;3;1"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Corner brackets */}
      <path d="M 5 5 L 0 5 L 0 0" stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 25 5 L 30 5 L 30 0" stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 5 25 L 0 25 L 0 30" stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 25 25 L 30 25 L 30 30" stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  )
}

