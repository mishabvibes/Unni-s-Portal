import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: Generate 3 weekly blog posts automatically
 * This endpoint should be called by a cron job weekly
 */
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional but recommended)
    const cronSecret = request.headers.get('x-cron-secret')
    if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const baseUrl = request.nextUrl.origin
    const programmingTopics = [
      'Building Real-time Applications with Next.js',
      'Mastering TypeScript Advanced Types',
      'Introduction to Server Components in React',
      'Optimizing Database Queries for Performance',
      'Building RESTful APIs with Node.js',
      'Understanding WebSockets and Socket.io',
      'The Art of Code Refactoring',
      'Implementing Authentication in Next.js',
      'Testing Strategies for Modern Web Apps',
      'Building Responsive UIs with Tailwind CSS',
      'Understanding and Using Git Effectively',
      'Docker for Web Developers',
    ]

    const cybersecurityTopics = [
      'Essential Cybersecurity Practices for Developers',
      'Understanding OWASP Top 10 Vulnerabilities',
      'Secure Authentication Implementation',
      'Protecting Against XSS and CSRF Attacks',
      'Introduction to Penetration Testing',
      'Secure API Design Principles',
      'Understanding Encryption and Hashing',
      'Building Secure Authentication Systems',
      'Common Web Application Vulnerabilities',
      'Implementing HTTPS and SSL/TLS',
      'Security Best Practices for Next.js',
      'Understanding CORS and Security Headers',
    ]

    // Mix programming and cybersecurity topics
    const allTopics = [...programmingTopics, ...cybersecurityTopics]

    // Randomly select 3 topics
    const selectedTopics = []
    const availableTopics = [...allTopics]
    
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * availableTopics.length)
      selectedTopics.push(availableTopics.splice(randomIndex, 1)[0])
    }

    // Generate 3 blog posts
    const results = []
    for (const topic of selectedTopics) {
      const category = programmingTopics.includes(topic) ? 'programming' : 'cybersecurity'
      
      try {
        const response = await fetch(`${baseUrl}/api/generate-blog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic, category }),
        })

        const data = await response.json()
        results.push({
          topic,
          category,
          success: response.ok,
          data: response.ok ? data : null,
          error: response.ok ? null : data.error,
        })
      } catch (error: any) {
        results.push({
          topic,
          category,
          success: false,
          data: null,
          error: error.message,
        })
      }

      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    const successful = results.filter(r => r.success).length

    return NextResponse.json({
      success: true,
      message: `Generated ${successful} out of 3 blog posts`,
      results,
    })
  } catch (error: any) {
    console.error('Error generating weekly blogs:', error)
    return NextResponse.json(
      { error: 'Failed to generate weekly blogs', details: error.message },
      { status: 500 }
    )
  }
}

