'use client'

import { useState, useMemo, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Palette, Rocket, Briefcase, GraduationCap, Zap, Heart } from 'lucide-react'
import { Timeline, type TimelineItem } from '@/components/ui/timeline'
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal'
import HolographicCard from '@/components/ui/holographic-card'
import Image from 'next/image'

// Lazy load heavy shader background
const ShaderBackground = lazy(() => 
  import('@/components/ui/shader-background').then(module => ({ default: module.default }))
)

/**
 * About Page - Mishab's Story
 * Full-Stack Alchemist from Kerala, India
 */

// Real skills from Mishab's GitHub profile
const skills = [
  { name: 'Next.js & React', level: 95, category: 'Frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'Languages', icon: '📘' },
  { name: 'Django & Python', level: 88, category: 'Backend', icon: '🐍' },
  { name: 'Node.js & Express', level: 85, category: 'Backend', icon: '🟢' },
  { name: 'Tailwind CSS', level: 95, category: 'Styling', icon: '🎨' },
  { name: 'MongoDB & PostgreSQL', level: 82, category: 'Database', icon: '🗄️' },
  { name: 'Firebase & Supabase', level: 80, category: 'Backend', icon: '🔥' },
  { name: 'Git & GitHub', level: 90, category: 'Tools', icon: '📦' },
]

// Timeline data based on his profile
const timeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    description: 'Building cutting-edge web applications with modern tech stack. Creating magic with Next.js, React, and Django.',
    timestamp: new Date('2024-01-01'),
    status: 'completed',
    icon: <Rocket className="h-3 w-3" />,
    content: <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500">DigiBayt</Badge>,
  },
  {
    id: '2',
    title: 'Major Projects',
    description: 'Developed FunoonFiesta (event management), IT Stock Management System, and various AI-powered applications.',
    timestamp: new Date('2023-01-01'),
    status: 'completed',
    icon: <Code className="h-3 w-3" />,
    content: <Badge variant="outline">Open Source & Freelance</Badge>,
  },
  {
    id: '3',
    title: 'Web Development Journey',
    description: 'Mastered modern web development, from Django backends to React frontends. Built 39+ repositories and counting!',
    timestamp: new Date('2022-01-01'),
    status: 'completed',
    icon: <Zap className="h-3 w-3" />,
    content: <Badge variant="outline">Self-Learning & Building</Badge>,
  },
  {
    id: '4',
    title: 'The Beginning',
    description: 'Started the journey into programming. Fell in love with creating things that live on the internet.',
    timestamp: new Date('2021-01-01'),
    status: 'completed',
    icon: <Heart className="h-3 w-3" />,
    content: <Badge className="bg-gradient-to-r from-orange-500 to-red-500">Code Enthusiast</Badge>,
  },
]

// Technologies Mishab works with
const techStack = {
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
  backend: ['Django', 'Node.js', 'Express.js', 'Python', 'RESTful APIs'],
  database: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Docker'],
}

// Animated skill bar component
function SkillBar({ name, level, category, icon, delay }: { name: string; level: number; category: string; icon: string; delay: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <div ref={ref} className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
          <span className="font-medium">{name}</span>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-[0.10rem] bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.6, delay: Math.min(delay, 0.2), ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0 }}
            style={{ width: '50%' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <>
      {/* Shader Background - Lazy loaded for better performance */}
      <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10" />}>
        <ShaderBackground />
      </Suspense>
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A code wizard from Kerala, turning ideas into reality 🪄
          </p>
        </motion.div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-0 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
          <div className="relative w-full max-w-xs sm:max-w-md aspect-square">
          <HolographicCard>
                <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-5">
                  {/* Skull Avatar */}
                  <motion.div 
                    className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-4 sm:mb-5"
                    animate={{ 
                      filter: [
                        'drop-shadow(0 0 35px rgba(0, 255, 0, 0.65))',
                        'drop-shadow(0 0 55px rgba(0, 255, 255, 0.65))',
                        'drop-shadow(0 0 35px rgba(0, 255, 0, 0.65))'
                      ]
                    }}
                    transition={{ 
                      filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Image
                      src="/assets/face.png"
                      alt="Mishab - Hacker Avatar"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                  
                  {/* Name */}
                  <h3 className="component-title text-xl sm:text-2xl md:text-3xl mb-2">
                    MISHAB
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-cyber-cyan text-xs sm:text-sm md:text-base font-mono">
                    Full-Stack Developer
                  </p>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-matrix-green/20 border border-matrix-green/40 text-matrix-green text-[10px] sm:text-xs font-medium backdrop-blur-sm"
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🇮🇳 Kerala
                  </motion.div>
                </div>
              </HolographicCard>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Hello! I'm Mishab 👋
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A passionate <span className="text-primary font-semibold">Full-Stack Developer</span> from 
              the beautiful state of Kerala, India 🌴. I'm currently working at{' '}
              <span className="text-primary font-semibold">DigiBayt</span>, where I get to build 
              awesome web applications that make a difference.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              My journey in tech has been nothing short of magical ✨. From crafting elegant UIs 
              with React and Next.js to building robust backends with Django and Node.js, I love 
              every aspect of bringing ideas to life through code.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or brewing the perfect cup of coffee ☕. I believe in writing 
              clean code, creating delightful user experiences, and never stopping learning.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="glass border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1">🎯</div>
                  <div className="text-2xl font-bold gradient-text">39+</div>
                  <div className="text-xs text-muted-foreground">GitHub Repos</div>
                </CardContent>
              </Card>
              <Card className="glass border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1">🚀</div>
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-xs text-muted-foreground">Projects Live</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Terminal Demo Section */}
      <Section>
        <h2 className="text-3xl font-bold mb-12 text-center">
          Terminal <span className="gradient-text">Mode</span> 💻
        </h2>
        <div className="flex justify-center mb-16">
          <Terminal className="max-w-2xl">
            <TypingAnimation>mishab@portfolio:~$ whoami</TypingAnimation>
            <AnimatedSpan>Full-Stack Developer | Code Wizard 🧙‍♂️</AnimatedSpan>
            <AnimatedSpan className="text-muted-foreground">Location: Kerala, India 🌴</AnimatedSpan>
            <TypingAnimation>mishab@portfolio:~$ cat skills.txt</TypingAnimation>
            <AnimatedSpan>✓ React.js & Next.js</AnimatedSpan>
            <AnimatedSpan>✓ TypeScript & JavaScript</AnimatedSpan>
            <AnimatedSpan>✓ Django & Python</AnimatedSpan>
            <AnimatedSpan>✓ Node.js & Express</AnimatedSpan>
            <TypingAnimation>mishab@portfolio:~$ echo $STATUS</TypingAnimation>
            <AnimatedSpan>🟢 Available for awesome projects!</AnimatedSpan>
          </Terminal>
        </div>
      </Section>

      {/* Tech Stack Section */}
      <Section>
        <h2 className="text-3xl font-bold mb-12 text-center">
          My <span className="gradient-text">Tech Arsenal</span> 🛠️
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(techStack).map(([category, techs], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full group hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="capitalize text-lg flex items-center gap-2">
                    <span className="text-2xl">
                      {category === 'frontend' ? '🎨' : 
                       category === 'backend' ? '⚙️' : 
                       category === 'database' ? '🗄️' : '🔧'}
                    </span>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills Section with animated bars */}
      <Section>
        <h2 className="text-3xl font-bold mb-12 text-center">
          Skill <span className="gradient-text">Proficiency</span> 📊
        </h2>
        <div className="max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              category={skill.category}
              icon={skill.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Timeline Section */}
      <Section className="mt-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          My <span className="gradient-text">Journey</span> 🗺️
        </h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Timeline 
              items={timeline} 
              variant="spacious"
              timestampPosition="top"
            />
          </motion.div>
        </div>
      </Section>

      {/* Fun Facts Section */}
      <Section className="mt-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Fun <span className="gradient-text">Facts</span> 🎉
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: '☕', text: 'Coffee is my debugging tool', color: 'from-amber-500 to-orange-500' },
            { icon: '🌙', text: 'Night owl coder (best code at 2 AM!)', color: 'from-blue-500 to-purple-500' },
            { icon: '🎮', text: 'Gaming breaks = creativity boost', color: 'from-green-500 to-emerald-500' },
          ].map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-5xl mb-4">{fact.icon}</div>
                  <p className={`bg-gradient-to-r ${fact.color} bg-clip-text text-transparent font-medium`}>
                    {fact.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mt-24">
        <Card className="text-center max-w-2xl mx-auto glass border-primary/20">
          <CardContent className="pt-12 pb-12">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing!</h3>
            <p className="text-muted-foreground mb-6">
              Got a cool project idea? Need a developer who's passionate about creating 
              awesome web experiences? Let's chat!
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-medium"
            >
              Get in Touch ✨
            </motion.a>
          </CardContent>
        </Card>
      </Section>
    </div>
    </>
  )
}
