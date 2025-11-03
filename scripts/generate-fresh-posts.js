/**
 * Script to generate fresh blog posts with proper formatting
 */

require('dotenv').config({ path: '.env.local' })

const baseUrl = process.argv[2] || 'https://heymishab.vercel.app'

const topics = [
  { topic: 'Modern Web Development Best Practices', category: 'programming' },
  { topic: 'Cybersecurity Fundamentals for Developers', category: 'cybersecurity' },
  { topic: 'Building Scalable Applications with Next.js', category: 'programming' },
  { topic: 'API Security and Authentication Best Practices', category: 'cybersecurity' },
  { topic: 'TypeScript Advanced Patterns and Techniques', category: 'programming' },
]

async function generatePost(topic, category) {
  try {
    console.log(`\n📝 Generating post: "${topic}" (${category})...`)
    
    const response = await fetch(`${baseUrl}/api/generate-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, category }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: errorText || `HTTP ${response.status}` }
      }
      console.log(`❌ Failed: ${errorData.error || errorData.details || `HTTP ${response.status}`}`)
      return { success: false, error: errorData.error || errorData.details }
    }

    const data = await response.json()

    if (data.post || data.slug) {
      const post = data.post || data
      console.log(`✅ Success! Created: ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      return { success: true, data: post }
    } else {
      console.log(`❌ Failed: ${data.error || 'Unknown error'}`)
      return { success: false, error: data.error }
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log(`❌ Error: Cannot connect to ${baseUrl}`)
      console.log(`   Make sure your dev server is running: npm run dev`)
    } else {
      console.log(`❌ Error: ${error.message}`)
    }
    return { success: false, error: error.message }
  }
}

async function generateAllPosts() {
  console.log('🚀 Starting fresh blog post generation...\n')
  console.log('=' .repeat(60))

  const results = []
  
  for (let i = 0; i < topics.length; i++) {
    const { topic, category } = topics[i]
    const result = await generatePost(topic, category)
    results.push({ topic, category, ...result })
    
    // Add delay between requests to avoid rate limiting
    if (i < topics.length - 1) {
      console.log('⏳ Waiting 3 seconds before next post...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 GENERATION SUMMARY:\n')
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}\n`)

  if (successful > 0) {
    console.log('📝 Generated Posts:')
    results.filter(r => r.success).forEach(r => {
      console.log(`   • ${r.data.title}`)
    })
  }

  if (failed > 0) {
    console.log('\n❌ Failed Posts:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   • ${r.topic}: ${r.error}`)
    })
  }

  console.log(`\n🎉 Generation complete! Visit ${baseUrl}/blog to see your new posts.`)
}

// Run the script
generateAllPosts().catch(error => {
  console.error('\n❌ Script error:', error)
  process.exit(1)
})

