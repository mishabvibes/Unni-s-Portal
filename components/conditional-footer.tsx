'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/footer'

/**
 * Conditionally renders footer based on current pathname
 * Hides footer on terminal page for immersive experience
 */
export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide footer on terminal page
  if (pathname === '/terminal') {
    return null
  }
  
  return <Footer />
}

