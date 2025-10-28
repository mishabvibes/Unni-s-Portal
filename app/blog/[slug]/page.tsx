'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getPostBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

/**
 * Individual blog post page
 */
export default function BlogPostPage() {
  const params = useParams()
  const post = getPostBySlug(params.slug as string)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist.
        </p>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{post.author.avatar}</div>
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>
        </div>

        {/* Featured image placeholder */}
        <div className="relative h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl mb-12 flex items-center justify-center">
          <div className="text-8xl">{post.author.avatar}</div>
        </div>

        {/* Article content */}
        <Card className="glass">
          <CardContent className="pt-12 pb-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
              
              <p className="leading-relaxed mb-6">
                This is a sample blog post. In a real application, you would integrate with a CMS 
                like Sanity, Contentful, or use MDX files to manage your blog content. The current 
                implementation shows the structure and design of a blog post page.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
              <p className="leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Key Points</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>First important point about the topic</li>
                <li>Second crucial aspect to consider</li>
                <li>Third essential element to understand</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Deep Dive</h2>
              <p className="leading-relaxed mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "This is an inspiring quote that adds value to the article and provides 
                additional context or perspective."
              </blockquote>

              <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p className="leading-relaxed mb-6">
                To integrate real blog content, consider using MDX with next-mdx-remote or a 
                headless CMS. This will allow you to write rich content with proper formatting, 
                code blocks, images, and more.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related posts section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Continue Reading</h3>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <Button variant="outline">All Articles</Button>
            </Link>
            <Link href="/contact">
              <Button variant="gradient">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



