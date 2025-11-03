/**
 * Script to generate weekly blog posts
 * Run this script using node-cron or a scheduled task
 * 
 * Usage:
 *   node scripts/generate-weekly-blogs.js
 * 
 * Or set up as a cron job:
 *   0 9 * * 1 node /path/to/scripts/generate-weekly-blogs.js
 */

const https = require('https')
const http = require('http')

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'
const CRON_SECRET = process.env.CRON_SECRET || ''

// Topics to rotate through
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
  'Modern JavaScript Best Practices',
  'Creating Reusable React Components',
  'Optimizing Next.js Performance',
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
  'Password Security Best Practices',
  'Database Security Fundamentals',
  'Secure Deployment Strategies',
]

// Function to make HTTP request
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const isHttps = urlObj.protocol === 'https:'
    const httpModule = isHttps ? https : http

    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    }

    if (CRON_SECRET) {
      requestOptions.headers['x-cron-secret'] = CRON_SECRET
    }

    const req = httpModule.request(requestOptions, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve({ status: res.statusCode, data: json })
        } catch (error) {
          resolve({ status: res.statusCode, data })
        }
      })
    })

    req.on('error', reject)
    
    if (options.body) {
      req.write(options.body)
    }
    
    req.end()
  })
}

// Main function
async function generateWeeklyBlogs() {
  console.log('🔄 Starting weekly blog generation...')
  
  try {
    const url = `${API_BASE_URL}/api/generate-weekly-blogs`
    console.log(`📡 Calling API: ${url}`)
    
    const response = await makeRequest(url)
    
    if (response.status === 200) {
      console.log('✅ Successfully generated weekly blogs!')
      console.log('📊 Results:', JSON.stringify(response.data, null, 2))
    } else {
      console.error('❌ Failed to generate blogs:', response.data)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  generateWeeklyBlogs()
}

module.exports = { generateWeeklyBlogs }

