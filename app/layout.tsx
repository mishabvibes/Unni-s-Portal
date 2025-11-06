import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ConditionalFooter } from '@/components/conditional-footer'
import { LayoutClient, LayoutFooter } from '@/components/layout-client'

const inter = Inter({ subsets: ['latin'] })

/**
 * Site metadata for SEO - Mishab's Portfolio
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://heymishab.vercel.app'),
  title: {
    default: 'Mishab NK | Full-Stack Developer | React, Next.js & Django Expert',
    template: '%s | Mishab NK - Full-Stack Developer',
  },
  description:
    'Professional Full-Stack Developer specializing in React, Next.js, Django, and TypeScript. 3+ years experience building scalable web applications. Based in Palakkad, Kerala, India. Available for freelance projects and collaborations.',
  keywords: [
    // Primary Keywords
    'Mishab NK',
    'Muhammed Mishab',
    'Full Stack Developer',
    'Full-Stack Developer India',
    'Web Developer Kerala',
    
    // Technology Keywords
    'React Developer',
    'Next.js Developer',
    'Django Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Node.js Developer',
    'Python Developer',
    
    // Skills
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Developer',
    'Responsive Web Design',
    'RESTful API Development',
    'Database Design',
    
    // Location-based
    'Developer Palakkad',
    'Developer Kerala',
    'Developer India',
    'Freelance Developer India',
    
    // Services
    'Web Application Development',
    'E-commerce Development',
    'Custom Software Development',
    'Website Development',
    'Mobile-First Development',
    
    // Company/Brand
    'DigiBayt',
    'mishabvibes',
    'Mishab Portfolio',
    
    // Technologies Stack
    'MongoDB',
    'PostgreSQL',
    'Firebase',
    'Supabase',
    'Tailwind CSS',
    'Framer Motion',
    'Git',
    'GitHub',
  ],
  authors: [
    { name: 'Muhammed Mishab NK', url: 'https://github.com/mishabvibes' },
    { name: 'Mishab NK', url: 'https://heymishab.vercel.app' },
  ],
  creator: 'Mishab NK',
  publisher: 'Mishab NK',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'Technology',
  classification: 'Web Development, Software Development',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://heymishab.vercel.app',
    title: 'Mishab NK | Professional Full-Stack Developer | React, Next.js & Django',
    description: 'Professional Full-Stack Developer with 3+ years experience. Specializing in React, Next.js, Django, TypeScript. Building scalable web applications. Available for freelance projects.',
    siteName: 'Mishab NK',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mishab NK - Professional Full-Stack Developer specializing in React, Next.js, and Django',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mishabvibes',
    creator: '@mishabvibes',
    title: 'Mishab NK | Full-Stack Developer | React & Next.js Expert',
    description: 'Professional Full-Stack Developer • React • Next.js • Django • TypeScript • 3+ Years Experience • Available for Projects',
    images: {
      url: '/og-image.jpg',
      alt: 'Mishab NK - Full-Stack Developer',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'FfzVsyaS2M5ojeVmNI3qwKlkP6yqjM7mHMN9lL-_twA', // Google Search Console verification
  },
  alternates: {
    canonical: 'https://heymishab.vercel.app',
    languages: {
      'en-US': 'https://heymishab.vercel.app',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon.ico',
      },
    ],
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
      <head>
        {/* Favicon - Multiple formats for better compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Muhammed Mishab NK',
              alternateName: 'Mishab NK',
              url: 'https://heymishab.vercel.app',
              image: 'https://heymishab.vercel.app/og-image.jpg',
              sameAs: [
                'https://github.com/mishabvibes',
                'https://www.linkedin.com/in/muhammed-mishab-nk/',
                'https://twitter.com/mishabvibes',
              ],
              jobTitle: 'Full-Stack Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'DigiBayt',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Palakkad',
                addressRegion: 'Kerala',
                addressCountry: 'India',
              },
              email: 'mishabvibes@gmail.com',
              knowsAbout: [
                'React',
                'Next.js',
                'Django',
                'TypeScript',
                'JavaScript',
                'Python',
                'Node.js',
                'Web Development',
                'Full-Stack Development',
                'Frontend Development',
                'Backend Development',
              ],
              description: 'Professional Full-Stack Developer with 3+ years of experience specializing in React, Next.js, Django, and TypeScript. Expert in building scalable web applications and modern user interfaces.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mishab NK',
              alternateName: 'Mishab NK - Full-Stack Developer Portfolio',
              url: 'https://heymishab.vercel.app',
              description: 'Professional portfolio of Mishab NK, a Full-Stack Developer specializing in React, Next.js, and Django',
              author: {
                '@type': 'Person',
                name: 'Mishab NK',
              },
              publisher: {
                '@type': 'Person',
                name: 'Mishab NK',
              },
              inLanguage: 'en-US',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://heymishab.vercel.app/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mishab NK',
              alternateName: 'Mishab NK - Full-Stack Developer',
              url: 'https://heymishab.vercel.app',
              logo: 'https://heymishab.vercel.app/favicon.ico',
              image: 'https://heymishab.vercel.app/og-image.jpg',
              description: 'Professional Full-Stack Developer specializing in React, Next.js, Django, and TypeScript',
              founder: {
                '@type': 'Person',
                name: 'Mishab NK',
              },
              sameAs: [
                'https://github.com/mishabvibes',
                'https://www.linkedin.com/in/muhammed-mishab-nk/',
                'https://twitter.com/mishabvibes',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Mishab NK - Full-Stack Development Services',
              description: 'Professional web development services specializing in React, Next.js, Django, and full-stack solutions',
              provider: {
                '@type': 'Person',
                name: 'Mishab NK',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Palakkad',
                addressRegion: 'Kerala',
                addressCountry: 'India',
              },
              areaServed: {
                '@type': 'Country',
                name: 'India',
              },
              serviceType: [
                'Web Development',
                'Full-Stack Development',
                'React Development',
                'Next.js Development',
                'Django Development',
                'Frontend Development',
                'Backend Development',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Lazy loaded client components for better performance */}
          <LayoutClient />
          <div className="flex flex-col min-h-screen scanlines relative z-10">
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
            <LayoutFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
