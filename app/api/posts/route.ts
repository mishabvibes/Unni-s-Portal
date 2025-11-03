import { NextResponse } from 'next/server'
import { getAllBlogPostsFromSheets } from '@/lib/google-sheets'
import type { BlogPost } from '@/lib/blog'

/**
 * API Route: Get all blog posts from Google Sheets
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get posts from Google Sheets only (no static posts)
    const aiPosts = await getAllBlogPostsFromSheets()

    // Sort by date (newest first)
    const allPosts = aiPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(allPosts)
  } catch (error: unknown) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

