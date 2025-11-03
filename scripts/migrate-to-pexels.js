/**
 * Script to migrate all blog post images to Pexels (reliable tech images)
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

function generateTechImageUrl(slug) {
  // Generate a consistent index based on slug hash
  const slugHash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const photoIdIndex = slugHash % techPhotoIds.length
  const photoId = techPhotoIds[photoIdIndex]
  
  // Use Pexels CDN with verified photo ID
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop`
}

async function migrateToPexels() {
  try {
    console.log('🔄 Migrating all blog post images to Pexels (reliable tech images)...\n')
    
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

    // Update each post with Pexels tech image
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
    console.log(`   Updated: ${updatedCount} posts with Pexels tech images`)
    console.log(`   All images are now tech/programming related and reliable!`)

  } catch (error) {
    console.error('❌ Error migrating images:', error.message)
    process.exit(1)
  }
}

// Run the migration
migrateToPexels().catch(error => {
  console.error('❌ Script error:', error)
  process.exit(1)
})

