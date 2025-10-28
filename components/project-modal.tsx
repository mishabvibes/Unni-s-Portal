'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect } from 'react'

/**
 * Project detail modal with animations
 */
interface ProjectModalProps {
  project: {
    title: string
    description: string
    longDescription: string
    image: string
    tags: string[]
    category: string
    link?: string
    github?: string
  } | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-card border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center z-10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Project image */}
              <div className="relative h-64 md:h-96 bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🚀
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">{project.category}</Badge>
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Long description */}
                <div className="prose prose-sm dark:prose-invert mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 px-6 text-base bg-gradient-to-r from-matrix-green via-cyber-cyan to-neon-pink text-black hover:shadow-lg hover:shadow-matrix-green/50 font-semibold"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 px-6 text-base border-2 border-primary/30 bg-background hover:bg-primary/10 hover:border-primary/50 hover:shadow-md hover:shadow-primary/20"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}



