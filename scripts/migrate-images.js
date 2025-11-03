/**
 * Migration script to update Unsplash image URLs to Picsum
 * Run this once to fix existing blog posts in Google Sheets
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const https = require('https')
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

function generatePicsumUrl(imageUrl, slug) {
  // For Unsplash URLs, generate a Picsum URL based on the slug
  const slugHash = Array.from(slug).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const imageId = (slugHash % 1000) + 1
  return `https://picsum.photos/1600/900?random=${imageId}`
}

async function migrateImages() {
  try {
    console.log('🔧 Starting image URL migration...')
    
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    // Get all posts
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:J',
    })

    const rows = response.data.values
    
    if (!rows || rows.length <= 1) {
      console.log('ℹ️  No posts found to migrate')
      return
    }

    // Skip header row
    const postsToUpdate = []
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const slug = row[0] || ''
      const currentImageUrl = row[9] || '' // Column J (index 9)
      
      // Check if it's an Unsplash URL
      if (currentImageUrl.includes('source.unsplash.com')) {
        const newImageUrl = generatePicsumUrl(currentImageUrl, slug)
        postsToUpdate.push({
          rowIndex: i + 1, // +1 because row indices are 1-based
          slug,
          newImageUrl,
          oldImageUrl: currentImageUrl,
        })
      }
    }

    if (postsToUpdate.length === 0) {
      console.log('✅ No Unsplash URLs found to migrate')
      return
    }

    console.log(`📝 Found ${postsToUpdate.length} posts to update`)

    // Update each post
    for (const post of postsToUpdate) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Posts!J${post.rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[post.newImageUrl]],
        },
      })
      console.log(`✅ Updated: ${post.slug}`)
      console.log(`   Old: ${post.oldImageUrl.substring(0, 50)}...`)
      console.log(`   New: ${post.newImageUrl}`)
    }

    console.log(`\n🎉 Successfully migrated ${postsToUpdate.length} image URLs!`)
    console.log('✅ All blog posts now use Picsum.photos for reliable image hosting')

  } catch (error) {
    console.error('❌ Error migrating images:', error)
    process.exit(1)
  }
}

// Run migration
migrateImages()

