'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin, Copy, Check, User, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

/**
 * Professional Individual Blog Post Page
 * Features: Enhanced typography, share buttons, author section, related posts
 */
export default function BlogPostPage() {
  const prefersReducedMotion = useReducedMotion()
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const posts = await response.json()
        setAllPosts(posts)
        const foundPost = posts.find((p: BlogPost) => p.slug === params.slug)
        setPost(foundPost || null)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [params.slug])

  // Memoize related posts for performance
  const relatedPosts = useMemo(() => 
    allPosts
      .filter((p: BlogPost) => p.slug !== params.slug)
      .slice(0, 3),
    [allPosts, params.slug]
  )

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl)
    const title = encodeURIComponent(post?.title || '')
    const text = encodeURIComponent(post?.excerpt || '')

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 bg-muted rounded-lg w-48 mb-8 animate-pulse" />
          <div className="h-96 bg-muted rounded-2xl mb-12 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 bg-muted rounded-lg w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  // Not found state
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? {} : { duration: 0.3 }}
            className="mb-8"
          >
            <div className="text-8xl mb-6">📄</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Post Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg">Back to Blog</Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">{post.author.name}</div>
                  <div className="text-xs">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm text-muted-foreground font-medium">Share:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 w-full h-full flex items-center justify-center">
                <div className="text-9xl opacity-30">{post.author.avatar}</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-2 border-border">
            <CardContent className="pt-12 pb-12 px-8 md:px-16">
              {/* Article content with enhanced typography - using react-markdown */}
              <article className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-foreground 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-bold
                prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground border-b border-border pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground" {...props} />,
                    p: ({node, ...props}) => <p className="text-lg leading-relaxed mb-6 text-foreground/90" {...props} />,
                    code: ({node, className, ...props}: any) => {
                      const isInline = !className
                      return isInline ? (
                        <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm text-primary font-mono" {...props} />
                      ) : (
                        <code className={className} {...props} />
                      )
                    },
                    pre: ({node, ...props}) => <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto mb-6" {...props} />,
                    a: ({node, ...props}) => <a className="text-primary no-underline hover:underline" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-6 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2 text-foreground/90" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />,
                  }}
                >
                  {post.content || post.excerpt}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Author Section */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl flex-shrink-0">
                  {post.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold">{post.author.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Passionate developer and writer sharing insights on web development, cybersecurity, and modern technology.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold">Related Articles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost, index: number) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {relatedPost.imageUrl ? (
                          <Image
                            src={relatedPost.imageUrl}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <div className="text-6xl opacity-50">{relatedPost.author.avatar}</div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3" />
                          {formatDate(relatedPost.date)}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Navigation CTA */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="glass border-2 border-primary/20">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-muted-foreground mb-8">
                Explore more articles or get in touch to discuss your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/blog">
                  <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                    Browse All Articles
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
