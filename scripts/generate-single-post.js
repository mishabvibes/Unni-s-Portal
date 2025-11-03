/**
 * Script to generate a single blog post (for retrying failed posts)
 */

require('dotenv').config({ path: '.env.local' })

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { google } = require('googleapis')

// Google Sheets helper functions
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
    
    return rows.some(row => row[0] === slug)
  } catch (error) {
    console.error('Error checking if post exists:', error)
    return false
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

async function generatePost(topic, category) {
  try {
    console.log(`\n📝 Generating post: "${topic}" (${category})...`)
    
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })

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

IMPORTANT: Return ONLY valid JSON, no markdown code blocks, no explanations, just the JSON object.

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
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          let manualJson = jsonMatch[0].replace(/,(\s*[}\]])/g, '$1')
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

    // Generate slug
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

    const date = new Date().toISOString().split('T')[0]

    // Get tech-related image
    const imageKeywords = blogData.suggestedImageKeywords || topic
    let cleanKeywords = imageKeywords.split(',').slice(0, 2).map(k => k.trim().toLowerCase()).join(',')
    const primaryKeyword = cleanKeywords || topic.toLowerCase()
    const keywordHash = (primaryKeyword).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    const techPhotoIds = [
      '1461749280689-e7b566d2e32e', // Code on laptop screen
      '1516321318427-f06f85e504b3', // Code editor
      '1504639722590-daf26ad5570f', // Computer with code
      '1517076114515-06a607ac2818', // Developer workspace
      '1460925895917-afdab827c52f', // Programming
      '1498050108023-c5249f4df085', // Tech workspace
      '1507721999472-8aa4423d234d', // Code screen
      '1488590528505-98d2b5aba04b', // Software development
      '1550751827-4bd9c3c8bc32', // Programming code
      '1517180102440-fc74b33e5eac', // Developer coding
      '1498050108023-c5249f4df085', // Tech setup
      '1504384308090-c894fdcc538d', // Computer programming
    ]
    
    const photoIdIndex = keywordHash % techPhotoIds.length
    const photoId = techPhotoIds[photoIdIndex]
    const imageUrl = `https://images.unsplash.com/photo-${photoId}?w=1600&h=900&fit=crop&q=80`

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

// Get topic and category from command line
const topic = process.argv[2] || 'API Security and Authentication Best Practices'
const category = process.argv[3] || 'cybersecurity'

generatePost(topic, category).then(result => {
  if (result.success) {
    console.log('\n🎉 Post generated successfully!')
    process.exit(0)
  } else {
    console.log('\n❌ Failed to generate post')
    process.exit(1)
  }
}).catch(error => {
  console.error('\n❌ Script error:', error)
  process.exit(1)
})

