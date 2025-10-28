/**
 * Blog data and utilities - Mishab's Tech Blog
 * In production, integrate with a CMS or use MDX files
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  tags: string[]
  author: {
    name: string
    avatar: string
  }
}

// Sample blog posts - Replace with your actual content
export const blogPosts: BlogPost[] = [
  {
    slug: 'building-funoonfiesta',
    title: 'Building FunoonFiesta: A Journey into Event Management',
    excerpt: 'How I built a complete event management platform from scratch using modern web technologies. Lessons learned and challenges overcome.',
    content: 'Full blog post content would go here...',
    date: '2024-02-15',
    readingTime: 8,
    tags: ['Next.js', 'Firebase', 'Real-time', 'Project Story'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'django-vs-nextjs',
    title: 'Django vs Next.js: When to Use What?',
    excerpt: 'As someone who works with both Django and Next.js regularly, here\'s my take on when to use each framework and why.',
    content: 'Full blog post content would go here...',
    date: '2024-02-01',
    readingTime: 6,
    tags: ['Django', 'Next.js', 'Backend', 'Frontend'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'ai-habeebi-story',
    title: 'Creating an AI Chatbot with Python',
    excerpt: 'The story behind AI Habeebi - my journey into natural language processing and building an intelligent chatbot from scratch.',
    content: 'Full blog post content would go here...',
    date: '2024-01-20',
    readingTime: 10,
    tags: ['Python', 'AI', 'NLP', 'Machine Learning'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'real-time-chat-websockets',
    title: 'Building Real-time Chat with WebSockets',
    excerpt: 'A deep dive into implementing real-time features using Socket.io and Node.js. Perfect for anyone wanting to add live features to their apps.',
    content: 'Full blog post content would go here...',
    date: '2024-01-10',
    readingTime: 7,
    tags: ['Node.js', 'WebSocket', 'Real-time', 'Chat'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'tailwind-tips-tricks',
    title: 'Tailwind CSS: My Favorite Tips and Tricks',
    excerpt: 'After building dozens of projects with Tailwind CSS, here are the tips and tricks I wish I knew when I started.',
    content: 'Full blog post content would go here...',
    date: '2023-12-28',
    readingTime: 5,
    tags: ['Tailwind CSS', 'CSS', 'Web Design', 'Tips'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'developer-journey-kerala',
    title: 'My Developer Journey: From Kerala to the Web',
    excerpt: 'The story of how a curious kid from Palakkad fell in love with coding and became a full-stack developer. Inspiration for aspiring devs!',
    content: 'Full blog post content would go here...',
    date: '2023-12-15',
    readingTime: 6,
    tags: ['Personal', 'Career', 'Inspiration', 'Story'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'typescript-is-worth-it',
    title: 'Why TypeScript Changed My Development Game',
    excerpt: 'How TypeScript helped me write better code, catch bugs early, and become a more confident developer. Here\'s why you should try it too!',
    content: 'Full blog post content would go here...',
    date: '2023-12-01',
    readingTime: 5,
    tags: ['TypeScript', 'JavaScript', 'Development', 'Best Practices'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
  {
    slug: 'mongodb-vs-postgresql',
    title: 'MongoDB vs PostgreSQL: A Practical Comparison',
    excerpt: 'Having worked with both databases extensively, here\'s my honest comparison to help you choose the right database for your next project.',
    content: 'Full blog post content would go here...',
    date: '2023-11-20',
    readingTime: 8,
    tags: ['MongoDB', 'PostgreSQL', 'Database', 'Backend'],
    author: {
      name: 'Mishab',
      avatar: '🧙‍♂️',
    },
  },
]

/**
 * Get all blog posts sorted by date
 */
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

/**
 * Get featured posts (most recent 3)
 */
export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().slice(0, 3)
}
