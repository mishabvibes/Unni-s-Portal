"use client"

import { useEffect, useRef } from "react"

/**
 * Lightweight simple cursor - Better performance than smooth cursor
 * Uses CSS transforms instead of heavy spring animations
 */
export function SimpleCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number | null = null
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const updateCursor = () => {
      // Smooth interpolation (easing)
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`

      // Only continue if still moving
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updateCursor)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor)
      }
    }

    // Hide default cursor
    document.body.style.cursor = "none"
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] hidden md:block"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Simple dot cursor */}
      <div className="w-full h-full rounded-full bg-white/80 shadow-lg backdrop-blur-sm border border-white/50" />
      {/* Small pulse effect */}
      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
    </div>
  )
}

