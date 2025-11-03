'use client';

import { useState, useEffect, useRef } from "react";

/**
 * Cursor Follower Component
 * Smooth cursor follower with hover effects using your hacker theme colors
 * Optimized for performance with throttled animations
 */
export const CursorFollower = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({ dot: { x: 0, y: 0 }, border: { x: 0, y: 0 } });
  const [isHovering, setIsHovering] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const frameSkipRef = useRef(false);
  const isVisibleRef = useRef(true);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    // Skip on server-side
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    // Select interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, img, input, textarea, select, [role='button'], [tabindex='0']"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Visibility check for performance
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation function for smooth movement - Throttled to 30fps
    const animate = () => {
      // Skip if tab is hidden
      if (!isVisibleRef.current) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to 30fps (every other frame)
      frameSkipRef.current = !frameSkipRef.current;
      if (frameSkipRef.current) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.body.style.cursor = "auto";
      
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Return null on server-side to prevent SSR issues
  if (typeof window === "undefined") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Inner dot - Matrix Green */}
      <div
        className="absolute rounded-full bg-matrix-green shadow-lg shadow-matrix-green/50"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
          transition: "opacity 0.2s",
        }}
      />

      {/* Outer border - Cyber Cyan with glow effect */}
      <div
        className="absolute rounded-full border-2 border-cyber-cyan shadow-lg shadow-cyber-cyan/40"
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: "width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s",
          borderColor: isHovering ? "#00ffff" : "rgba(0, 255, 255, 0.6)",
        }}
      />

      {/* Glow effect on hover */}
      {isHovering && (
        <div
          className="absolute rounded-full bg-cyber-cyan/20 blur-xl"
          style={{
            width: "60px",
            height: "60px",
            transform: "translate(-50%, -50%)",
            left: `${renderPos.border.x}px`,
            top: `${renderPos.border.y}px`,
            transition: "opacity 0.3s",
          }}
        />
      )}
    </div>
  );
};

