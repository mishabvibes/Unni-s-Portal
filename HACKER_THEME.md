# 🖥️ Hacker Theme Documentation

## Overview

Your portfolio now features a **professional cyberpunk/hacker theme** with Matrix-inspired aesthetics, neon colors, and terminal-style visuals.

## 🎨 Color Palette

### Primary Colors
- **Matrix Green**: `#00ff00` - Main theme color (primary)
- **Cyber Cyan**: `#00ffff` - Secondary accent color
- **Neon Pink/Magenta**: `#ff00ff` - Accent color
- **Neon Purple**: `#9d00ff` - Additional accent
- **Terminal Green**: `#00ff41` - Authentic terminal green
- **Hacker Red**: `#ff0040` - Error/destructive states

### Background Colors
- **Deep Black**: `#000000` (0 0% 3%) - Primary background
- **Dark Gray**: `#0a0a0a` (0 0% 5%) - Card backgrounds
- **Muted Dark**: `#1a1a1a` (0 0% 10%) - Muted backgrounds

## ✨ Features

### 1. **Custom Hacker Cursor**
- Physics-based smooth animation
- Matrix green neon glow effect
- Rotates based on movement direction
- Scales on movement for dynamic feel

### 2. **Cyber Grid Background**
- Animated grid pattern
- Moving perspective effect
- Subtle green glow
- Canvas-based for performance

### 3. **Scanline Effect**
- CRT monitor-style scanlines
- Applied to entire layout
- Subtle retro terminal feel

### 4. **Neon Effects**
Available CSS classes:
```css
.neon-text      /* Text with green glow */
.neon-border    /* Border with green glow */
.cyber-grid     /* Grid background pattern */
.terminal-text  /* Monospace terminal-style text */
.scanlines      /* CRT scanline overlay */
```

### 5. **Custom Animations**
- `animate-neon-pulse` - Pulsing neon glow
- `animate-glitch` - Glitch effect
- `animate-terminal-blink` - Cursor blink
- `animate-scan` - Scanning line effect

## 🎯 Usage Examples

### Neon Text
```tsx
<h1 className="neon-text">Hacker Text</h1>
```

### Gradient Text (Cyber Colors)
```tsx
<span className="gradient-text">Rainbow Cyber Text</span>
```

### Terminal Style
```tsx
<code className="terminal-text">$ sudo make me a sandwich</code>
```

### Glass Effect (Updated)
```tsx
<div className="glass">
  Matrix-style glassmorphism
</div>
```

## 🔧 Customization

### Change Primary Color
Edit `app/globals.css`:
```css
--primary: 142 100% 50%; /* Hue Saturation Lightness */
```

### Adjust Neon Intensity
Edit the glow in `app/globals.css`:
```css
.neon-text {
  text-shadow: 
    0 0 5px #00ff00,   /* Increase for more glow */
    0 0 10px #00ff00,
    0 0 20px #00ff00,
    0 0 40px #00ff00;
}
```

### Grid Size
Edit `components/ui/cyber-grid.tsx`:
```tsx
const gridSize = 50; // Change grid cell size
```

## 🚀 Additional Components

### Matrix Rain (Optional)
For a Matrix-style falling character effect:
```tsx
import { MatrixRain } from '@/components/ui/matrix-rain'

// Add to layout
<MatrixRain />
```

## 🎨 Tailwind Custom Colors

Use these anywhere in your components:
```tsx
className="text-matrix-green"
className="bg-cyber-cyan"
className="border-neon-pink"
className="text-neon-purple"
className="bg-terminal-green"
className="text-hacker-red"
```

## 💡 Tips

1. **Contrast**: Matrix green (#00ff00) on black (#000000) provides excellent readability
2. **Accessibility**: Consider adding a theme toggle for users sensitive to bright colors
3. **Performance**: The cyber grid uses canvas for optimal performance
4. **Mobile**: Cursor effects are hidden on mobile, grid remains visible

## 🌟 Theme Philosophy

This hacker theme represents:
- **Technical Excellence**: Terminal aesthetics for developers
- **Cyberpunk Vibes**: Neon colors and futuristic design
- **Professionalism**: Clean, modern implementation despite the "hacker" theme
- **Passion**: Shows personality and creativity

## 🔄 Future Enhancements

Consider adding:
- Toggle between Matrix Rain and Cyber Grid
- Sound effects (typing sounds, etc.)
- More glitch effects on hover
- Binary code rain variation
- Custom terminal prompt component

---

**Created for**: Mishab's Portfolio  
**Theme**: Professional Hacker/Cyberpunk  
**Colors**: Matrix Green, Cyber Cyan, Neon Pink  
**Vibe**: 🖥️ Terminal Wizard ✨

