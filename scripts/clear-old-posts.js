/**
 * Script to clear all old blog posts from Google Sheets
 * Use this for a fresh start
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

async function clearAllPosts() {
  try {
    console.log('🗑️  Clearing all old blog posts from Google Sheets...\n')
    
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    // Get all posts to count them
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:J',
    })

    const rows = response.data.values || []
    
    if (rows.length <= 1) {
      console.log('ℹ️  No posts found to clear (only headers or empty sheet)')
      return
    }

    const postCount = rows.length - 1 // Exclude header
    console.log(`📝 Found ${postCount} posts to clear`)

    // Clear all rows except headers
    // Keep only the header row (row 1)
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Posts!A2:J1000', // Clear from row 2 to 1000
    })

    console.log(`✅ Successfully cleared ${postCount} posts from Google Sheets!`)
    console.log('📋 Headers are preserved. Sheet is ready for new posts.\n')
    
    // Verify the sheet only has headers now
    const verifyResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:J',
    })
    
    const remainingRows = verifyResponse.data.values || []
    if (remainingRows.length <= 1) {
      console.log('✅ Verification: Sheet cleared successfully (only headers remain)')
    } else {
      console.log(`⚠️  Warning: ${remainingRows.length - 1} rows still remain`)
    }

  } catch (error) {
    console.error('❌ Error clearing posts:', error.message)
    process.exit(1)
  }
}

// Run the script
clearAllPosts().catch(error => {
  console.error('❌ Script error:', error)
  process.exit(1)
})

