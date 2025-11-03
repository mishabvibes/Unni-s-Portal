import { google } from 'googleapis'

/**
 * Google Sheets service for blog data storage
 */

// Initialize Google Sheets API
function getSheetsClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error)
    throw error
  }
}

// Get the spreadsheet ID from environment
function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_ID 
  if (!id) {
    throw new Error('GOOGLE_SHEETS_ID is not configured')
  }
  return id
}

/**
 * Get all blog posts from Google Sheets
 */
export async function getAllBlogPostsFromSheets() {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A:J', // Assuming columns A-J contain the post data
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return []
    }

    // Skip header row and convert to blog post objects
    const posts = rows.slice(1).map((row: any[]) => ({
      slug: row[0] || '',
      title: row[1] || '',
      excerpt: row[2] || '',
      content: row[3] || '',
      date: row[4] || '',
      readingTime: parseInt(row[5] || '8'),
      tags: row[6] ? row[6].split(',').map((tag: string) => tag.trim()) : [],
      author: {
        name: row[7] || 'Mishab',
        avatar: row[8] || '🧙‍♂️',
      },
      imageUrl: row[9] || '',
    }))

    return posts
  } catch (error) {
    console.error('Error fetching posts from Google Sheets:', error)
    return []
  }
}

/**
 * Add a new blog post to Google Sheets
 */
export async function addBlogPostToSheets(post: {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  tags: string[]
  author: { name: string; avatar: string }
  imageUrl?: string
}) {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    // Prepare row data
    const row = [
      post.slug,
      post.title,
      post.excerpt,
      post.content,
      post.date,
      post.readingTime.toString(),
      post.tags.join(', '),
      post.author.name,
      post.author.avatar,
      post.imageUrl || '',
    ]

    // Append row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Posts!A:J',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    })

    console.log('Successfully added post to Google Sheets:', post.slug)
    return true
  } catch (error) {
    console.error('Error adding post to Google Sheets:', error)
    return false
  }
}

/**
 * Check if a post with given slug already exists
 */
export async function postExistsInSheets(slug: string): Promise<boolean> {
  try {
    const posts = await getAllBlogPostsFromSheets()
    return posts.some((post: any) => post.slug === slug)
  } catch (error) {
    console.error('Error checking if post exists:', error)
    return false
  }
}

/**
 * Initialize the Google Sheets with headers if needed
 */
export async function initializeSheet() {
  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()

    // First, check if "Posts" sheet exists
    let postsSheetExists = false
    try {
      const metadata = await sheets.spreadsheets.get({
        spreadsheetId,
      })
      postsSheetExists = metadata.data.sheets?.some(
        (sheet: any) => sheet.properties.title === 'Posts'
      ) || false
    } catch (error) {
      console.error('Error checking sheet existence:', error)
    }

    // Create "Posts" sheet if it doesn't exist
    if (!postsSheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Posts',
              },
            },
          }],
        },
      })
      console.log('Created "Posts" sheet in Google Sheets')
    }

    // Check if sheet has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Posts!A1:J1',
    })

    const hasHeaders = response.data.values && response.data.values.length > 0

    if (!hasHeaders) {
      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Posts!A1:J1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'slug',
            'title',
            'excerpt',
            'content',
            'date',
            'readingTime',
            'tags',
            'authorName',
            'authorAvatar',
            'imageUrl',
          ]],
        },
      })

      console.log('Initialized Google Sheet with headers')
    }
  } catch (error) {
    console.error('Error initializing sheet:', error)
  }
}

