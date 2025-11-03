/**
 * Script to migrate existing Unsplash image URLs to Picsum.photos
 * Fixes 503 errors from Unsplash Source API
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

function generatePicsumUrl(oldUrl, slug) {
  // Generate a deterministic seed based on slug
  const seedHash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seed = seedHash % 10000
  
  // Use Picsum with seed for consistent images
  return `https://picsum.photos/seed/tech-${seed}/1600/900`
}

async function migrateImages() {
  try {
    console.log('🔄 Migrating Unsplash URLs to Picsum.photos...\n')
    
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

    const headers = rows[0]
    const posts = rows.slice(1)
    
    console.log(`📝 Found ${posts.length} posts to check\n`)

    let updatedCount = 0

    // Update each post with Unsplash URLs
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const slug = post[0] // Column A
      const imageUrl = post[9] || '' // Column J (imageUrl)
      
      if (imageUrl && imageUrl.includes('unsplash.com')) {
        const newUrl = generatePicsumUrl(imageUrl, slug)
        
        // Update the imageUrl column (column J = index 9)
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Posts!J${i + 2}`, // Row i+2 (1-indexed, +1 for header)
          valueInputOption: 'RAW',
          resource: { values: [[newUrl]] },
        })
        
        console.log(`✅ Updated: ${slug}`)
        console.log(`   Old: ${imageUrl.substring(0, 80)}...`)
        console.log(`   New: ${newUrl}\n`)
        updatedCount++
      }
    }

    console.log(`\n✅ Migration complete!`)
    console.log(`   Updated: ${updatedCount} posts`)
    console.log(`   Skipped: ${posts.length - updatedCount} posts (no Unsplash URLs)`)

  } catch (error) {
    console.error('❌ Error migrating images:', error.message)
    process.exit(1)
  }
}

// Run the migration
migrateImages().catch(error => {
  console.error('❌ Script error:', error)
  process.exit(1)
})

