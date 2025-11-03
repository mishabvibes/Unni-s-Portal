/**
 * Script to generate blog posts directly (bypassing API)
 * Uses Gemini AI and Google Sheets directly
 */

require('dotenv').config({ path: '.env.local' })

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { google } = require('googleapis')

// Google Sheets helper functions (copied from lib/google-sheets.ts)
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function getSpreadsheetId() {
  const id = process.env.GOOGLE_SHEETS_ID
  if (!id) {
    throw new Error('GOOGLE_SHEETS_ID is not configured')
  }
  return id
}

async function postExistsInSheets(slug) {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:A',
    })
    
    const rows = response.data.values || []
    if (rows.length <= 1) return false
    
    // Check if slug exists (column A)
    return rows.some(row => row[0] === slug)
  } catch (error) {
    console.error('Error checking if post exists:', error)
    return false
  }
}

async function initializeSheet() {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    
    // Check if sheet exists and has headers
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Posts!A1:J1',
      })
      
      const headers = response.data.values?.[0] || []
      if (headers.length > 0) {
        return // Sheet already initialized
      }
    } catch (error) {
      // Sheet might not exist, continue to create
    }
    
    // Add headers
    const headers = [
      'slug', 'title', 'excerpt', 'content', 'date', 
      'readingTime', 'tags', 'authorName', 'authorAvatar', 'imageUrl'
    ]
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Posts!A1:J1',
      valueInputOption: 'RAW',
      resource: { values: [headers] },
    })
  } catch (error) {
    console.error('Error initializing sheet:', error)
    throw error
  }
}

async function addBlogPostToSheets(blogPost) {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    
    const row = [
      blogPost.slug,
      blogPost.title,
      blogPost.excerpt,
      blogPost.content,
      blogPost.date,
      blogPost.readingTime,
      blogPost.tags.join(','),
      blogPost.author.name,
      blogPost.author.avatar,
      blogPost.imageUrl || '',
    ]
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Posts!A:J',
      valueInputOption: 'RAW',
      resource: { values: [row] },
    })
    
    return true
  } catch (error) {
    console.error('Error adding post to sheets:', error)
    return false
  }
}

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
    
    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })

    // Generate blog content
    const prompt = `Write a comprehensive, original blog post about "${topic}" in the ${category || 'programming'} category. 

IMPORTANT FORMATTING RULES:
- Use Markdown formatting (NOT HTML)
- Use ## for main headings, ### for subheadings
- Use **bold** for emphasis, *italic* for subtle emphasis
- Use \`code\` for inline code and \`\`\`language blocks for code examples
- Use - for bullet points and 1. for numbered lists
- Do NOT use HTML tags like <h2>, <p>, <strong>, etc.
- Write in clear, engaging paragraphs separated by blank lines
- Make it readable and well-structured

Requirements:
1. Create an engaging, unique title
2. Write a compelling excerpt (2-3 sentences)
3. Write full content with introduction, main points, examples, and conclusion (800-1200 words)
   - Use proper Markdown formatting only
   - Structure with headings (## and ###)
   - Include code examples where relevant
   - Use lists for key points
4. Suggest 3-5 relevant tags
5. Estimate reading time (5-10 minutes)
6. Make it informative, practical, and valuable for developers
7. Provide 3-5 tech-related keywords for the article image (MUST be tech-related: programming, coding, software, technology, computer, developer, code editor, laptop, software development, etc. - NO nature, landscapes, or non-tech terms)

Format the response as JSON:
{
  "title": "Your title here",
  "excerpt": "Your excerpt here",
  "content": "Full content in Markdown format (NO HTML tags)",
  "tags": ["tag1", "tag2", "tag3"],
  "readingTime": 8,
  "suggestedImageKeywords": "keyword1, keyword2, keyword3"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON from response
    let blogData
    try {
      // Remove markdown code blocks if present
      let jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      // Remove any leading text before the first {
      const firstBrace = jsonText.indexOf('{')
      if (firstBrace > 0) {
        jsonText = jsonText.substring(firstBrace)
      }
      
      // Remove any trailing text after the last }
      const lastBrace = jsonText.lastIndexOf('}')
      if (lastBrace > 0 && lastBrace < jsonText.length - 1) {
        jsonText = jsonText.substring(0, lastBrace + 1)
      }
      
      // Fix trailing commas in JSON (common AI issue)
      jsonText = jsonText.replace(/,(\s*[}\]])/g, '$1')
      
      blogData = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('Failed to parse JSON, trying alternative method...')
      // Try to extract JSON object manually if standard parsing fails
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          let manualJson = jsonMatch[0]
          // Remove trailing commas
          manualJson = manualJson.replace(/,(\s*[}\]])/g, '$1')
          blogData = JSON.parse(manualJson)
          console.log('✅ Successfully parsed using alternative method')
        } else {
          throw parseError
        }
      } catch {
        console.error('Failed to parse JSON:', text.substring(0, 300) + '...')
        throw new Error('Failed to parse AI response')
      }
    }

    // Generate a unique slug from title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Check if post already exists
    const exists = await postExistsInSheets(slug)
    if (exists) {
      console.log(`⚠️  Post with slug "${slug}" already exists, skipping...`)
      return { success: false, error: 'Post already exists' }
    }

    // Get current date
    const date = new Date().toISOString().split('T')[0]

    // Get tech-related image using Unsplash API with tech-specific photos
    const imageKeywords = blogData.suggestedImageKeywords || topic
    
    // Clean and normalize keywords - prioritize tech terms
    let cleanKeywords = imageKeywords.split(',').slice(0, 2).map(k => k.trim().toLowerCase()).join(',')
    
    // Always prioritize tech-specific search terms
    const primaryKeyword = cleanKeywords || topic.toLowerCase()
    
    // Generate a consistent index based on keywords hash
    const keywordHash = (primaryKeyword).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    // Use Pexels API for reliable tech images
    // Pexels has a free API with excellent tech/programming images
    const techPhotoIds = [
      577585, // Code on screen
      1181677, // Computer with code
      1181263, // Developer workspace
      1181675, // Programming laptop
      1181696, // Tech workspace
      1181244, // Code editor
      4974914, // Modern programming setup
      4974920, // Developer coding
      3861958, // Computer screen with code
      3861972, // Tech development
      3184357, // Software development
      3184460, // Programming environment
    ]
    
    const photoIdIndex = keywordHash % techPhotoIds.length
    const photoId = techPhotoIds[photoIdIndex]
    
    // Use Pexels CDN with verified photo ID
    // Pexels allows hotlinking and provides reliable image URLs
    const imageUrl = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop`

    const blogPost = {
      slug,
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      date,
      readingTime: blogData.readingTime || 8,
      tags: blogData.tags || [],
      author: {
        name: 'Mishab',
        avatar: '🧙‍♂️',
      },
      imageUrl,
    }

    // Initialize sheet if needed
    await initializeSheet()

    // Save to Google Sheets
    const success = await addBlogPostToSheets(blogPost)

    if (!success) {
      throw new Error('Failed to save blog post to Google Sheets')
    }

    console.log(`✅ Success! Created: ${blogPost.title}`)
    console.log(`   Slug: ${blogPost.slug}`)
    console.log(`   Image: ${imageUrl}`)
    
    return { success: true, data: blogPost }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function generateAllPosts() {
  console.log('🚀 Starting fresh blog post generation (direct mode)...\n')
  console.log('='.repeat(60))

  const results = []
  
  for (let i = 0; i < topics.length; i++) {
    const { topic, category } = topics[i]
    const result = await generatePost(topic, category)
    results.push({ topic, category, ...result })
    
    // Add delay between requests to avoid rate limiting
    if (i < topics.length - 1) {
      console.log('⏳ Waiting 4 seconds before next post...')
      await new Promise(resolve => setTimeout(resolve, 4000))
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

  console.log(`\n🎉 Generation complete! Visit your blog to see the new posts.`)
}

// Run the script
generateAllPosts().catch(error => {
  console.error('\n❌ Script error:', error)
  process.exit(1)
})

