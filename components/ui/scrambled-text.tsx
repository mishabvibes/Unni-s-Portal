// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

'use client'

import React, { useEffect, useRef } from 'react';

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:!@#$%^&*()01',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const originalTextRef = useRef<string>('');

  useEffect(() => {
    if (!rootRef.current) return;

    const paragraph = rootRef.current.querySelector('p');
    if (!paragraph) return;

    originalTextRef.current = paragraph.textContent || '';
    
    // Split text into characters, preserve spaces
    const chars = originalTextRef.current.split('');
    paragraph.innerHTML = chars.map(char => 
      char === ' ' 
        ? `<span class="inline-block" data-char=" " style="width: 0.25em;">&nbsp;</span>`
        : `<span class="inline-block" data-char="${char}">${char}</span>`
    ).join('');

    const charElements = paragraph.querySelectorAll('span');

    const scrambleChar = (element: Element, originalChar: string) => {
      const chars = scrambleChars.split('');
      let iterations = 0;
      const maxIterations = Math.floor(duration * 1000 / 50);

      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          element.textContent = originalChar;
          clearInterval(interval);
          return;
        }
        
        if (originalChar === ' ') {
          element.textContent = ' ';
          clearInterval(interval);
          return;
        }

        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        element.textContent = randomChar;
        iterations++;
      }, 50);

      return interval;
    };

    const handleMove = (e: PointerEvent) => {
      charElements.forEach((el) => {
        const charEl = el as HTMLElement;
        const originalChar = charEl.dataset.char || '';
        const { left, top, width, height } = charEl.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          scrambleChar(charEl, originalChar);
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`font-mono ${className}`}
      style={{ whiteSpace: 'pre-wrap', ...style }}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;

