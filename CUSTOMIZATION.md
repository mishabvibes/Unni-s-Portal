# 🎨 Customization Guide

Complete guide to personalizing your portfolio.

## 🌈 Colors & Theme

### Primary Brand Colors

Edit `app/globals.css` to change your color scheme:

```css
:root {
  /* Primary color - Main brand color */
  --primary: 221.2 83.2% 53.3%;  /* Blue */
  
  /* Secondary color - Accent color */
  --secondary: 210 40% 96.1%;     /* Light gray */
  
  /* Background colors */
  --background: 0 0% 100%;        /* White */
  --foreground: 222.2 84% 4.9%;   /* Dark text */
}

.dark {
  /* Dark mode colors */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark mode colors */
}
```

### Gradient Colors

Update gradient classes throughout the site:
```tsx
// Current: from-primary to-purple-600
// Change to your preferred gradient
className="bg-gradient-to-r from-blue-500 to-cyan-500"
```

### Pre-made Color Schemes

#### Professional Blue (Default)
```css
--primary: 221.2 83.2% 53.3%;  /* #3B82F6 */
```

#### Creative Purple
```css
--primary: 271.2 81% 56%;      /* #9333EA */
```

#### Tech Green
```css
--primary: 142.1 70.6% 45.3%;  /* #10B981 */
```

#### Warm Orange
```css
--primary: 24.6 95% 53.1%;     /* #F97316 */
```

## 📝 Content Customization

### Home Page

File: `app/page.tsx`

```tsx
// Change your name
<span className="gradient-text">Your Name</span>

// Update tagline
<p>Full Stack Developer & Creative Technologist</p>

// Modify stats
{ number: '50+', label: 'Projects Completed' }
{ number: '5+', label: 'Years Experience' }
{ number: '100%', label: 'Client Satisfaction' }

// Update social links
const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Mail, href: '/contact', label: 'Email' },
]
```

### About Page

File: `app/about/page.tsx`

#### Update Bio
```tsx
<p className="text-muted-foreground mb-4 leading-relaxed">
  Your professional summary here...
</p>
```

#### Modify Skills
```tsx
const skills = [
  { name: 'Your Skill', level: 90, category: 'Category' },
  // Add more skills
]
```

#### Update Timeline
```tsx
const timeline = [
  {
    year: '2024',
    title: 'Your Position',
    company: 'Company Name',
    description: 'What you did...',
    icon: Briefcase,
  },
  // Add more experience
]
```

### Projects Page

File: `app/projects/page.tsx`

#### Add Your Projects
```tsx
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Short description',
    longDescription: 'Detailed description for modal',
    image: '/projects/your-project.jpg',
    category: 'Web App', // or 'Website', 'Mobile App'
    tags: ['React', 'Next.js', 'TypeScript'],
    link: 'https://your-project.com',
    github: 'https://github.com/you/project',
  },
  // Add more projects
]
```

#### Customize Categories
```tsx
const categories = ['All', 'Web App', 'Mobile', 'Design']
```

### Blog Page

File: `lib/blog.ts`

#### Add Blog Posts
```tsx
export const blogPosts: BlogPost[] = [
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    excerpt: 'Brief summary...',
    content: 'Full content...',
    date: '2024-01-15',
    readingTime: 5,
    tags: ['Tag1', 'Tag2'],
    author: {
      name: 'Your Name',
      avatar: '👨‍💻',
    },
  },
]
```

### Contact Page

File: `app/contact/page.tsx`

#### Update Contact Info
```tsx
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Your City, Country',
    href: '#',
  },
]
```

## 🎭 Animations

### Adjust Animation Speed

In component files, modify Framer Motion transitions:

```tsx
// Slower animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }} // Increase from 0.5
/>

// Remove animation
<div> // Just use regular div instead of motion.div
```

### Disable Animations Globally

In `tailwind.config.ts`:
```tsx
animation: {
  // Comment out animations you don't want
  // 'fade-up': 'fade-up 0.5s ease-out',
}
```

## 🖼️ Images & Assets

### Add Your Images

Create these folders in `public/`:
```
public/
├── profile.jpg        # Your profile photo
├── og-image.jpg       # Social media preview (1200x630px)
├── favicon.ico        # Browser icon
├── projects/          # Project screenshots
│   ├── project1.jpg
│   └── project2.jpg
└── blog/              # Blog post images
    ├── post1.jpg
    └── post2.jpg
```

### Update Profile Image

Replace emoji with image in `app/about/page.tsx`:
```tsx
// Replace:
<div className="text-8xl">👨‍💻</div>

// With:
<Image 
  src="/profile.jpg"
  alt="Your Name"
  fill
  className="object-cover"
/>
```

### Add Favicon

Replace `app/favicon.ico` or add to `app/layout.tsx`:
```tsx
<link rel="icon" href="/favicon.ico" />
```

## 🎨 Typography

### Change Font

File: `app/layout.tsx`

```tsx
// Current: Inter
import { Inter } from 'next/font/google'

// Change to another Google Font
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

// Then use in body:
<body className={poppins.className}>
```

Popular font combinations:
- **Modern**: Inter + Space Grotesk
- **Classic**: Merriweather + Open Sans
- **Tech**: JetBrains Mono + Inter
- **Creative**: Playfair Display + Raleway

### Adjust Font Sizes

In `tailwind.config.ts`:
```tsx
fontSize: {
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',     // Body text
  'lg': '1.125rem',
  'xl': '1.25rem',
  // Customize these
}
```

## 🎪 Layout Options

### Narrow vs Wide Layout

In `components/` files, change container max-width:

```tsx
// Current (default)
<div className="container mx-auto px-4">

// Narrower (better for reading)
<div className="container mx-auto px-4 max-w-4xl">

// Wider (more content)
<div className="container mx-auto px-4 max-w-7xl">

// Full width
<div className="w-full px-4">
```

### Navigation Style

File: `components/navigation.tsx`

```tsx
// Change navigation background blur
className="bg-background/80 backdrop-blur-md"

// More blur:
className="bg-background/60 backdrop-blur-xl"

// Solid background:
className="bg-background"
```

## 🔲 Cards & Components

### Card Style

File: `components/ui/card.tsx`

```tsx
// Current: Subtle border
className="border bg-card"

// Bold border:
className="border-2 border-primary/20 bg-card"

// No border (shadow only):
className="shadow-lg bg-card"

// Glassmorphism:
className="glass"
```

### Button Variants

File: `components/ui/button.tsx`

Add custom button variants:
```tsx
const variants = {
  default: 'bg-primary text-primary-foreground',
  outline: 'border-2 border-primary',
  ghost: 'hover:bg-secondary',
  gradient: 'bg-gradient-to-r from-primary to-purple-600',
  // Add your own:
  custom: 'bg-cyan-500 text-white hover:bg-cyan-600',
}
```

## 🌟 Special Effects

### Remove Glassmorphism

Delete or comment out `.glass` in `app/globals.css`

### Add More Sparkles

In pages using `<Sparkles>`:
```tsx
<Sparkles count={50} /> // Increase from 30
```

### Gradient Backgrounds

Modify `AnimatedGradient` colors:
```tsx
// In components/ui/animated-gradient.tsx
background: [
  'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)',
  // Change colors: rgba(R, G, B, opacity)
]
```

## 📱 Responsive Tweaks

### Mobile Breakpoints

Adjust Tailwind breakpoints in `tailwind.config.ts`:
```tsx
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### Mobile-Specific Styles

```tsx
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="block md:hidden"

// Different sizes
className="text-2xl md:text-4xl lg:text-6xl"
```

## 🎯 SEO Customization

File: `app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Your Name | Portfolio',
    template: '%s | Your Name',
  },
  description: 'Your professional description',
  keywords: ['Your', 'Skills', 'Here'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name | Portfolio',
    description: 'Your description',
    url: 'https://yourdomain.com',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name | Portfolio',
    creator: '@yourusername',
  },
}
```

## 🚀 Quick Customization Checklist

- [ ] Update colors in `app/globals.css`
- [ ] Change name and tagline in `app/page.tsx`
- [ ] Add your bio in `app/about/page.tsx`
- [ ] Update skills and experience
- [ ] Add your projects with real data
- [ ] Update contact information
- [ ] Add your social media links
- [ ] Replace placeholder images
- [ ] Change fonts if desired
- [ ] Adjust animations to taste
- [ ] Update SEO metadata
- [ ] Add favicon
- [ ] Test on mobile devices

## 💡 Tips

1. **Start Small**: Change one thing at a time and test
2. **Use Dev Tools**: Chrome DevTools for testing responsive design
3. **Keep Backups**: Commit to Git before major changes
4. **Test Dark Mode**: Always test both themes
5. **Performance**: Run Lighthouse after major changes

## 🆘 Need Help?

- Check component files for inline comments
- Refer to [Tailwind CSS docs](https://tailwindcss.com/docs)
- See [Framer Motion docs](https://www.framer.com/motion/)
- Ask in GitHub Issues

---

**Happy customizing! Make it uniquely yours! 🎨**



