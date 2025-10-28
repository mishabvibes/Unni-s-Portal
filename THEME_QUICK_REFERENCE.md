# 🚀 Hacker Theme - Quick Reference

## 🎨 Color Variables

### Use in Tailwind Classes
```tsx
// Text colors
className="text-matrix-green"      // #00ff00
className="text-cyber-cyan"        // #00ffff
className="text-neon-pink"         // #ff00ff
className="text-neon-purple"       // #9d00ff
className="text-terminal-green"    // #00ff41
className="text-hacker-red"        // #ff0040

// Background colors
className="bg-matrix-green"
className="bg-cyber-cyan"
className="bg-neon-pink"

// Border colors
className="border-matrix-green"
className="border-cyber-cyan"
```

## 🎯 Button Variants

```tsx
import { Button } from '@/components/ui/button'

// Default - Matrix green glow
<Button variant="default">Click Me</Button>

// Neon - Green border with hover fill
<Button variant="neon">Neon Button</Button>

// Terminal - Monospace terminal style
<Button variant="terminal">$ run_command</Button>

// Gradient - Rainbow cyber gradient
<Button variant="gradient">Cyber Button</Button>

// Outline - Subtle border
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## ✨ Special Effects Classes

```tsx
// Neon text with glow
<h1 className="neon-text">Glowing Text</h1>

// Gradient cyber text
<span className="gradient-text">Rainbow Text</span>

// Terminal monospace
<code className="terminal-text">$ command</code>

// Neon border with glow
<div className="neon-border p-4">Content</div>

// Glass effect (updated for theme)
<div className="glass p-6">Glassmorphism</div>

// Cyber grid background
<div className="cyber-grid">Grid Pattern</div>

// Scanlines overlay
<div className="scanlines">CRT Effect</div>
```

## 🎬 Animations

```tsx
// Neon pulse
<div className="animate-neon-pulse">Pulsing Glow</div>

// Glitch effect
<div className="animate-glitch">Glitch</div>

// Terminal cursor blink
<span className="animate-terminal-blink">|</span>

// Scanning line
<div className="animate-scan">Scan</div>
```

## 🖥️ Components

### Terminal Prompt
```tsx
import { TerminalPrompt } from '@/components/ui/terminal-prompt'

<TerminalPrompt 
  text="Hello, World!" 
  speed={50} 
/>
```

### Terminal Output
```tsx
import { TerminalOutput } from '@/components/ui/terminal-prompt'

<TerminalOutput 
  lines={[
    'Initializing system...',
    'Loading modules...',
    'Ready!'
  ]}
  delay={100}
/>
```

### Cyber Grid
```tsx
import { CyberGrid } from '@/components/ui/cyber-grid'

<CyberGrid />
```

### Matrix Rain (Optional)
```tsx
import { MatrixRain } from '@/components/ui/matrix-rain'

<MatrixRain />
```

### Hacker Cursor
```tsx
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { HackerCursorSVG } from '@/components/ui/hacker-cursor'

<SmoothCursor cursor={<HackerCursorSVG />} />
```

## 🎨 CSS Custom Properties

```css
/* Hacker theme colors in HSL */
--primary: 142 100% 50%;        /* Matrix green */
--secondary: 180 100% 50%;      /* Cyber cyan */
--accent: 300 100% 50%;         /* Neon pink */
--background: 0 0% 3%;          /* Deep black */
--foreground: 142 100% 50%;     /* Matrix green text */
```

## 💡 Quick Tips

1. **High Contrast**: Matrix green on black provides excellent readability
2. **Combine Effects**: Use `neon-text` with `animate-neon-pulse` for extra impact
3. **Terminal Feel**: Use `font-mono` with `terminal-text` class
4. **Glassmorphism**: The `glass` class now has green-tinted glow
5. **Buttons**: Use `neon` or `terminal` variants for authentic hacker feel

## 🎯 Common Patterns

### Hero Section with Glow
```tsx
<h1 className="text-6xl font-bold neon-text animate-neon-pulse">
  Welcome, Hacker
</h1>
```

### Card with Cyber Border
```tsx
<div className="glass neon-border rounded-lg p-6">
  <h3 className="gradient-text text-2xl mb-4">Project Name</h3>
  <p className="text-foreground">Description...</p>
</div>
```

### Terminal-Style Code Block
```tsx
<div className="bg-black border-2 border-terminal-green rounded-lg p-4">
  <code className="terminal-text">
    $ npm install hacker-mode
  </code>
</div>
```

### Call-to-Action Button
```tsx
<Button variant="gradient" size="lg" className="animate-neon-pulse">
  <Terminal className="mr-2" />
  Start Hacking
</Button>
```

## 🚀 Performance Tips

- The `CyberGrid` uses Canvas API for optimal performance
- Cursor is GPU-accelerated with CSS transforms
- Scanlines use pseudo-elements (no extra DOM nodes)
- All animations use CSS/GPU acceleration

---

**Theme**: Professional Hacker/Cyberpunk  
**Primary Color**: Matrix Green (#00ff00)  
**Vibe**: 🖥️💚✨ Terminal Wizard

