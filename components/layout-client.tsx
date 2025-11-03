'use client'

import { lazy, Suspense } from 'react'

// Lazy load heavy components for better performance
const CyberGrid = lazy(() => 
  import('@/components/ui/cyber-grid').then(module => ({ default: module.CyberGrid }))
)
const AccessGranted = lazy(() => 
  import('@/components/ui/access-granted').then(module => ({ default: module.AccessGranted }))
)
const DockTabs = lazy(() => 
  import('@/components/ui/dock-tabs').then(module => ({ default: module.DockTabs }))
)
const MusicToggle = lazy(() => 
  import('@/components/ui/music-toggle').then(module => ({ default: module.MusicToggle }))
)

/**
 * Client Layout Components
 * Lazy loads heavy components for better performance on low-spec devices
 */
export function LayoutClient() {
  return (
    <>
      {/* AccessGranted - Lazy loaded with minimal placeholder */}
      <Suspense fallback={null}>
        <AccessGranted />
      </Suspense>

      {/* CyberGrid - Lazy loaded background */}
      <Suspense fallback={<div className="cyber-grid absolute inset-0 opacity-5" />}>
        <CyberGrid />
      </Suspense>

      {/* Music Toggle - Lazy loaded */}
      <Suspense fallback={null}>
        <MusicToggle />
      </Suspense>
    </>
  )
}

/**
 * Footer and DockTabs wrapper - Lazy loaded
 */
export function LayoutFooter() {
  return (
    <>
      <Suspense fallback={null}>
        <DockTabs />
      </Suspense>
    </>
  )
}

