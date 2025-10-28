"use client"

import { cn } from "@/lib/utils"

interface CyberBadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info"
  glow?: boolean
  className?: string
}

/**
 * Cyber-themed badge component with optional neon glow
 */
export function CyberBadge({ 
  children, 
  variant = "default", 
  glow = true,
  className 
}: CyberBadgeProps) {
  const variants = {
    default: "border-matrix-green text-matrix-green bg-matrix-green/10",
    success: "border-terminal-green text-terminal-green bg-terminal-green/10",
    warning: "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10",
    error: "border-hacker-red text-hacker-red bg-hacker-red/10",
    info: "border-neon-purple text-neon-purple bg-neon-purple/10",
  }

  const glowStyles = glow ? {
    default: "shadow-md shadow-matrix-green/30",
    success: "shadow-md shadow-terminal-green/30",
    warning: "shadow-md shadow-cyber-cyan/30",
    error: "shadow-md shadow-hacker-red/30",
    info: "shadow-md shadow-neon-purple/30",
  } : {}

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-md border font-mono text-xs font-medium uppercase tracking-wider transition-all",
        variants[variant],
        glow && glowStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * Cyber tech stack badge
 */
interface TechBadgeProps {
  tech: string
  className?: string
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <div className={cn("group relative inline-block", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-matrix-green via-cyber-cyan to-neon-pink rounded-md blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
      <span className="relative inline-flex items-center px-3 py-1.5 bg-black border border-matrix-green/30 rounded-md text-matrix-green font-mono text-sm hover:border-matrix-green/60 transition-all">
        <span className="mr-2 text-cyber-cyan">{'<'}</span>
        {tech}
        <span className="ml-2 text-cyber-cyan">{'/>'}</span>
      </span>
    </div>
  )
}

/**
 * Status indicator badge
 */
interface StatusBadgeProps {
  status: "online" | "offline" | "busy" | "away"
  showText?: boolean
  className?: string
}

export function StatusBadge({ 
  status, 
  showText = true,
  className 
}: StatusBadgeProps) {
  const statusConfig = {
    online: {
      color: "bg-terminal-green",
      text: "Online",
      glow: "shadow-terminal-green/50",
    },
    offline: {
      color: "bg-muted",
      text: "Offline",
      glow: "shadow-muted/50",
    },
    busy: {
      color: "bg-hacker-red",
      text: "Busy",
      glow: "shadow-hacker-red/50",
    },
    away: {
      color: "bg-cyber-cyan",
      text: "Away",
      glow: "shadow-cyber-cyan/50",
    },
  }

  const config = statusConfig[status]

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="relative">
        <div
          className={cn(
            "h-2 w-2 rounded-full animate-pulse",
            config.color,
            `shadow-md ${config.glow}`
          )}
        />
        <div
          className={cn(
            "absolute inset-0 h-2 w-2 rounded-full animate-ping",
            config.color,
            "opacity-75"
          )}
        />
      </div>
      {showText && (
        <span className="text-xs font-mono uppercase text-muted-foreground">
          {config.text}
        </span>
      )}
    </div>
  )
}

