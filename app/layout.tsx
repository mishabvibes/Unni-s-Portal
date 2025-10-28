import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { HackerCursorSVG } from '@/components/ui/hacker-cursor'
import { CyberGrid } from '@/components/ui/cyber-grid'
import { AccessGranted } from '@/components/ui/access-granted'
import { DockTabs } from '@/components/ui/dock-tabs'
import { MusicToggle } from '@/components/ui/music-toggle'

const inter = Inter({ subsets: ['latin'] })

/**
 * Site metadata for SEO - Mishab's Portfolio
 */
export const metadata: Metadata = {
  title: {
    default: 'Mishab | Full-Stack Developer',
    template: '%s | Mishab',
  },
  description:
    'Full-Stack Alchemist 🧪 | Web Magician ✨ | Building awesome web apps with Next.js, React, Django & more. Based in Kerala, India.',
  keywords: [
    'Mishab',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js',
    'Django',
    'TypeScript',
    'Kerala Developer',
    'India',
    'Web Development',
    'Portfolio',
    'mishabvibes',
  ],
  authors: [{ name: 'Muhammed Mishab', url: 'https://github.com/mishabvibes' }],
  creator: 'Mishab',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mishabvibes.github.io',
    title: 'Mishab | Full-Stack Developer & Web Magician',
    description: 'Full-Stack Alchemist building awesome web experiences with Next.js, React, and Django',
    siteName: 'Mishab Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mishab - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mishab | Full-Stack Developer',
    description: 'Full-Stack Alchemist 🧪 | Web Magician ✨',
    creator: '@mishabvibes',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

/**
 * Root layout component
 * Wraps all pages with theme provider and navigation
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AccessGranted />
          <CyberGrid />
          {/* Hide custom cursor on mobile, show only on desktop */}
          <div className="hidden md:block">
            <SmoothCursor cursor={<HackerCursorSVG />} />
          </div>
          {/* Simple Music Toggle */}
          <MusicToggle />
          <div className="flex flex-col min-h-screen scanlines relative z-10">
            <main className="flex-1">{children}</main>
            <Footer />
            <DockTabs />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
