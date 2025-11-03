"use client"

import { useEffect, useRef } from "react"

/**
 * Animated cyber grid background - Matrix/Terminal style
 * Optimized: Throttled to 30fps, pauses when hidden/off-screen
 */
export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafIdRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)
  const frameSkipRef = useRef<boolean>(false)
  const isVisibleRef = useRef<boolean>(true)
  const isInViewRef = useRef<boolean>(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Grid properties
    const gridSize = 50
    let offset = 0

    // Visibility check
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Intersection Observer for viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        isInViewRef.current = entries[0].isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Animation - Throttled to 30fps (~33ms per frame)
    const animate = (currentTime: number) => {
      // Skip if tab is hidden or off-screen
      if (!isVisibleRef.current || !isInViewRef.current) {
        rafIdRef.current = requestAnimationFrame(animate)
        return
      }

      // Throttle to 30fps (every other frame at 60fps = 30fps)
      frameSkipRef.current = !frameSkipRef.current
      if (frameSkipRef.current) {
        rafIdRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastFrameTimeRef.current
      if (deltaTime < 30) { // ~30fps
        rafIdRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrameTimeRef.current = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid
      ctx.strokeStyle = "rgba(0, 255, 0, 0.1)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = offset; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Animated offset
      offset += 0.5
      if (offset >= gridSize) offset = 0

      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  )
}

