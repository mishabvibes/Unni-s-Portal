/**
 * Script to migrate existing blog post images to tech-specific Unsplash photos
 * Updates all posts with curated tech/programming images
 */

require('dotenv').config({ path: '.env.local' })

const { google } = require('googleapis')

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

// Verified tech/programming photo IDs from Unsplash
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

function generateTechImageUrl(slug) {
  // Generate a consistent index based on slug hash
  const slugHash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const photoIdIndex = slugHash % techPhotoIds.length
  const photoId = techPhotoIds[photoIdIndex]
  
  // Use Unsplash CDN directly with photo ID
  return `https://images.unsplash.com/photo-${photoId}?w=1600&h=900&fit=crop&q=80`
}

async function migrateToTechImages() {
  try {
    console.log('🔄 Migrating all blog post images to tech-specific Unsplash photos...\n')
    
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    // Get all posts
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:J',
    })

    const rows = response.data.values || []
    
    if (rows.length <= 1) {
      console.log('ℹ️  No posts found to migrate')
      return
    }

    const posts = rows.slice(1)
    
    console.log(`📝 Found ${posts.length} posts to migrate\n`)

    let updatedCount = 0

    // Update each post with tech-specific image
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const slug = post[0] // Column A
      const currentImageUrl = post[9] || '' // Column J (imageUrl)
      
      const newImageUrl = generateTechImageUrl(slug)
      
      // Update the imageUrl column (column J = index 9)
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Posts!J${i + 2}`, // Row i+2 (1-indexed, +1 for header)
        valueInputOption: 'RAW',
        resource: { values: [[newImageUrl]] },
      })
      
      console.log(`✅ Updated: ${slug}`)
      console.log(`   Old: ${currentImageUrl ? currentImageUrl.substring(0, 60) + '...' : '(none)'}`)
      console.log(`   New: ${newImageUrl}\n`)
      updatedCount++
    }

    console.log(`\n✅ Migration complete!`)
    console.log(`   Updated: ${updatedCount} posts with tech-specific images`)
    console.log(`   All images are now tech/programming related!`)

  } catch (error) {
    console.error('❌ Error migrating images:', error.message)
    process.exit(1)
  }
}

// Run the migration
migrateToTechImages().catch(error => {
  console.error('❌ Script error:', error)
  process.exit(1)
})

