'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Search, Tag, TrendingUp, Sparkles, ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

/**
 * Professional Blog Page - Modern, Creative Design
 * Features: Hero section, featured post, advanced filtering, smooth animations
 */
export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9
  const prefersReducedMotion = useReducedMotion()
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const posts = await response.json()
        setAllPosts(posts)
        
        // Extract unique tags
        const tags = new Set<string>()
        posts.forEach((post: BlogPost) => {
          post.tags.forEach((tag) => tags.add(tag))
        })
        setAllTags(Array.from(tags).sort())
      } catch (error) {
        console.error('Error fetching posts:', error)
        setAllPosts([])
        setAllTags([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Memoized filtered posts for performance
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      if (selectedTag && !post.tags.includes(selectedTag)) return false
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    })
  }, [allPosts, searchQuery, selectedTag])

  // Memoized pagination logic
  const { totalPages, startIndex, endIndex, paginatedPosts, featuredPost, regularPosts } = useMemo(() => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    const featuredPost = currentPage === 1 && paginatedPosts.length > 0 ? paginatedPosts[0] : null
    const regularPosts = currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts
    return { totalPages, startIndex, endIndex, paginatedPosts, featuredPost, regularPosts }
  }, [filteredPosts, currentPage, postsPerPage])
  
  // Debounced search for better performance
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value) // Update input immediately for responsive UI
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 300) // 300ms debounce
  }, [])
  
  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTag])

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-16 bg-muted rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-muted rounded-lg w-64 mx-auto animate-pulse" />
          </div>
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {allPosts.length} Articles Available
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { delay: 0.2, duration: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Blog
            </span>
            <span className="text-foreground"> & Articles</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Discover insights on web development, cybersecurity, and cutting-edge technology
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { delay: 0.4, duration: 0.4 }}
            className="relative max-w-2xl mx-auto mb-6"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search articles, topics, tags..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-14 pr-14 h-14 text-lg bg-card/50 border-2 border-border hover:border-primary/50 focus:border-primary transition-colors"
            />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchInput('')
                  setSearchQuery('')
                  if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                Clear
              </Button>
            )}
          </motion.div>

          {/* Tags filter - Always visible, modern design */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { delay: 0.5, duration: 0.3 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div className="flex items-center justify-center flex-wrap gap-3 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Button
                variant={selectedTag === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full transition-all hover:scale-105"
              >
                All
              </Button>
              {allTags.slice(0, 10).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-full transition-colors hover:border-primary/50"
                >
                  {tag}
                </Button>
              ))}
              {allTags.length > 10 && (
                <Badge variant="secondary" className="text-xs">
                  +{allTags.length - 10} more
                </Badge>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Featured Post Section */}
      {featuredPost && (
        <Section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="group cursor-pointer overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-shadow duration-200 shadow-lg hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                    {featuredPost.imageUrl ? (
                      <Image
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        quality={80}
                        className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 w-full h-full flex items-center justify-center">
                        <div className="text-8xl opacity-50">{featuredPost.author.avatar}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
                    <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readingTime} min read
                      </div>
                    </div>

                    <CardTitle className="text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors line-clamp-3">
                      {featuredPost.title}
                    </CardTitle>

                    <CardDescription className="text-base mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </CardDescription>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </Section>
      )}

      {/* Regular Posts Grid */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold">
              {searchQuery || selectedTag ? 'Search Results' : 'All Articles'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
              {selectedTag && (
                <Badge variant="secondary" className="gap-2">
                  <Tag className="h-3 w-3" />
                  {selectedTag}
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="ml-1 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </motion.div>

          {paginatedPosts.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.2, delay: Math.min(index * 0.02, 0.1) }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="h-full group cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-200 border-2 hover:border-primary/20">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                              quality={75}
                              className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 w-full h-full flex items-center justify-center">
                              <div className="text-6xl opacity-50">{post.author.avatar}</div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>

                        <CardHeader>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readingTime} min
                            </div>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 text-xl">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 mt-2">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read more
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Pagination Controls - Modern Design */}
            {totalPages > 1 && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.2 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                {/* Page Info */}
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
                </div>
                
                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1) ||
                        (currentPage <= 3 && page <= 5) ||
                        (currentPage >= totalPages - 2 && page >= totalPages - 4)
                      
                      if (!showPage) {
                        // Show ellipsis
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )
                        }
                        return null
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[40px] ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>
                  
                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTag(null)
                  setShowFilters(false)
                }}
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Newsletter CTA - Enhanced */}
      <Section className="mt-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="text-center glass border-2 border-primary/20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-50" />
            
            <CardContent className="pt-16 pb-16 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-6"
              >
                📬
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
                Subscribe to get notified about new articles, latest updates, and exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 h-12 text-base bg-background/50"
                />
                <Button variant="gradient" size="lg" className="h-12 px-8">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </div>
  )
}
