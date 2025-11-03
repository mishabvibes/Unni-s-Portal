import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { addBlogPostToSheets, postExistsInSheets, initializeSheet } from '@/lib/google-sheets'

/**
 * API Route: Generate blog post using Gemini AI
 * Generates high-quality, original content on programming or cybersecurity topics
 * Stores posts in Google Sheets
 */
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { topic, category } = await request.json()

    // Validate input
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      )
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
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      blogData = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('Failed to parse JSON:', text)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    // Generate a unique slug from title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Check if post already exists
    const exists = await postExistsInSheets(slug)
    if (exists) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      )
    }

    // Get current date
    const date = new Date().toISOString().split('T')[0]

    // Get tech-related image using Unsplash API with tech-specific search
    const imageKeywords = blogData.suggestedImageKeywords || topic
    
    // Clean and normalize keywords - prioritize tech terms
    const cleanKeywords = imageKeywords.split(',').slice(0, 2).map((k: string) => k.trim().toLowerCase()).join(',')
    
    // Always prioritize tech-specific search terms
    const techSearchTerms = ['code', 'programming', 'computer', 'technology', 'software', 'developer', 'laptop', 'coding']
    const primaryKeyword = cleanKeywords || topic.toLowerCase()
    
    // Generate a consistent index based on keywords hash
    const keywordHash = (primaryKeyword).split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
    const index = keywordHash % techSearchTerms.length
    
    // Use Pexels API for reliable tech images
    // Pexels has a free API with excellent tech/programming images
    // Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?w=1600&h=900&fit=crop
    
    // Verified Pexels tech/programming photo IDs
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
      return NextResponse.json(
        { error: 'Failed to save blog post to Google Sheets' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      post: blogPost,
      message: 'Blog post generated and saved to Google Sheets successfully',
    })
  } catch (error: any) {
    console.error('Error generating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post', details: error.message },
      { status: 500 }
    )
  }
}

