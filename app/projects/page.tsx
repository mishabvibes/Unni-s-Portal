'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Filter, Star } from 'lucide-react'
import { ProjectModal } from '@/components/project-modal'

/**
 * Projects Page - Mishab's Real Projects
 * Based on GitHub: github.com/mishabvibes
 */

// Real projects from Mishab's GitHub
const projects = [
  {
    id: 1,
    title: 'FunoonFiesta',
    description: 'Event management platform with real-time updates and booking system',
    longDescription: 'A comprehensive event management platform built for organizing and managing cultural events. Features real-time updates, booking system, participant management, and beautiful UI. Built with modern web technologies for optimal performance and user experience.',
    image: '/projects/funoon.jpg',
    category: 'Web App',
    tags: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Real-time'],
    link: 'https://github.com/mishabvibes/FunoonFiesta',
    github: 'https://github.com/mishabvibes/FunoonFiesta',
    featured: true,
  },
  {
    id: 2,
    title: 'IT Stock Management System',
    description: 'Smart inventory management system for IT assets',
    longDescription: 'A robust inventory management system designed specifically for IT stock management. Features include asset tracking, automated alerts for low stock, detailed reporting, and role-based access control. Built with Django backend for reliability and security.',
    image: '/projects/stock.jpg',
    category: 'Web App',
    tags: ['Django', 'Python', 'PostgreSQL', 'Bootstrap', 'REST API'],
    link: 'https://github.com/mishabvibes/IT-Stock-Management-System',
    github: 'https://github.com/mishabvibes/IT-Stock-Management-System',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Habeebi',
    description: 'AI-powered chatbot with natural language processing',
    longDescription: 'An intelligent chatbot application leveraging AI and natural language processing to provide meaningful conversations. Features include context awareness, multi-language support, and integration with various APIs. Built with Python and modern NLP libraries.',
    image: '/projects/ai-habeebi.jpg',
    category: 'AI/ML',
    tags: ['Python', 'NLP', 'AI', 'Machine Learning', 'APIs'],
    link: 'https://github.com/mishabvibes/Ai_Habeebi_python',
    github: 'https://github.com/mishabvibes/Ai_Habeebi_python',
    featured: true,
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: 'Modern chat app with WebSocket support',
    longDescription: 'A feature-rich real-time chat application supporting group chats, private messages, file sharing, and typing indicators. Built with Node.js and Socket.io for seamless real-time communication. Includes user authentication, message encryption, and beautiful responsive UI.',
    image: '/projects/chat.jpg',
    category: 'Web App',
    tags: ['Node.js', 'Socket.io', 'MongoDB', 'Express', 'WebSocket'],
    link: 'https://github.com/mishabvibes/chat-app',
    github: 'https://github.com/mishabvibes/chat-app',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Personal portfolio with stunning animations',
    longDescription: 'My personal portfolio website built with Next.js and featuring stunning animations powered by Framer Motion. Showcases my projects, skills, and blog posts. Fully responsive, SEO-optimized, and includes dark mode support.',
    image: '/projects/portfolio.jpg',
    category: 'Website',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
    link: 'https://mishabvibes.github.io/Mishab_vibes',
    github: 'https://github.com/mishabvibes/Mishab_vibes',
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with payment integration',
    longDescription: 'A complete e-commerce solution with product management, shopping cart, secure payment gateway integration, order tracking, and admin dashboard. Built with Django backend and React frontend for a seamless shopping experience.',
    image: '/projects/ecommerce.jpg',
    category: 'Web App',
    tags: ['Django', 'React', 'PostgreSQL', 'Payment Gateway'],
    github: 'https://github.com/mishabvibes',
  },
]

const categories = ['All', 'Web App', 'AI/ML', 'Website']

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Memoize filtered projects for performance
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All' 
      ? projects 
      : projects.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  const featuredProjects = useMemo(() => 
    projects.filter(p => p.featured), []
  )

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <Section>
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.3 }}
            className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              My <span className="gradient-text">Projects</span> 🚀
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              From ideas to reality - here's what I've been building
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>Check out my</span>
              <a 
                href="https://github.com/mishabvibes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                GitHub (39+ repos)
              </a>
              <span>for more!</span>
            </div>
          </motion.div>

          {/* Featured Projects Banner */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <h2 className="text-2xl font-bold">Featured Projects</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.2, delay: Math.min(0.2 + idx * 0.05, 0.3) }}
                  >
                    <Card 
                      className="h-full cursor-pointer group border-2 border-primary/20 hover:border-primary/50 transition-all"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-t-xl overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                          {project.category === 'AI/ML' ? '🤖' : '💫'}
                        </div>
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-white">
                          Featured
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Category filter */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <Filter className="h-5 w-5 text-muted-foreground mr-2 mt-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'gradient' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className="group"
              >
                {category}
                {selectedCategory === category && (
                  <motion.span
                    layoutId="category-indicator"
                    className="ml-2"
                  >
                    ✨
                  </motion.span>
                )}
              </Button>
            ))}
          </motion.div>

          {/* All Projects grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">All Projects</h2>
          </div>
          <motion.div 
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={prefersReducedMotion ? {} : { duration: 0.2, delay: Math.min(index * 0.02, 0.1) }}
              >
                    <Card 
                      className="h-full cursor-pointer group hover:shadow-xl transition-shadow duration-200"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Project image placeholder */}
                      <div className="relative h-48 bg-secondary rounded-t-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 group-hover:from-primary/30 group-hover:to-purple-600/30 transition-colors duration-200" />
                        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-200">
                      {project.category === 'AI/ML' ? '🤖' : 
                       project.category === 'Website' ? '🌐' : '🚀'}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      {project.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-muted-foreground text-lg mb-4">
                No projects found in this category.
              </p>
              <Button variant="outline" onClick={() => setSelectedCategory('All')}>
                Show All Projects
              </Button>
            </motion.div>
          )}

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="max-w-2xl mx-auto glass border-primary/20">
              <CardContent className="pt-12 pb-12">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="text-2xl font-bold mb-4">Want to See More?</h3>
                <p className="text-muted-foreground mb-6">
                  I have <span className="text-primary font-bold">39+ repositories</span> on GitHub 
                  with lots of cool experiments and projects!
                </p>
                <motion.a
                  href="https://github.com/mishabvibes"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-medium"
                >
                  Visit My GitHub ⭐
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>
        </Section>
      </div>

      {/* Project modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
