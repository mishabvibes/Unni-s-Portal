'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowDown, Github, Linkedin, Mail, Instagram, Code2, Coffee, 
  Sparkles as SparklesIcon, Terminal as TerminalIcon, Rocket, 
  Zap, Database, Globe, Server, Smartphone, Eye, ExternalLink,
  CheckCircle2, Award, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal'
import { KaliTerminalDemo, MacOSTerminalDemo, MatrixTerminalDemo } from '@/components/ui/enhanced-terminal'
import { TechBadge, StatusBadge } from '@/components/ui/cyber-badge'
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer'
import ElectricBorder from '@/components/ui/electric-border'
import Lightning from '@/components/ui/lightning'
import GlitchText from '@/components/ui/glitch-text'
import ScrambledText from '@/components/ui/scrambled-text'

/**
 * Home Page - Professional Portfolio Homepage
 * Mishab - Full-Stack Developer
 */

// Tech stack categories
const techStack = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Django', 'Python', 'Express'],
  database: ['MongoDB', 'PostgreSQL', 'Firebase','Supabase'],
  tools: ['Git', 'Docker', 'VS Code', 'Figma'],
}

// Featured services/expertise
const expertise = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Building modern, responsive web applications with cutting-edge technologies',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Creating scalable APIs and robust server-side solutions',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design',
    description: 'Crafting beautiful, intuitive user interfaces that users love',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Designing efficient database architectures for optimal performance',
    gradient: 'from-orange-500 to-red-500',
  },
]

// Featured projects
const featuredProjects = [
  {
    title: 'Modern Portfolio',
    description: 'Interactive hacker-themed portfolio with terminal interface and smooth animations',
    tech: ['Next.js', 'TypeScript', 'Framer Motion'],
    link: '#',
    gradient: 'from-matrix-green to-cyber-cyan',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Django Web App',
    description: 'Scalable web application with RESTful API and real-time features',
    tech: ['Django', 'Python', 'PostgreSQL'],
    link: '#',
    gradient: 'from-blue-500 to-indigo-500',
  },
]

// Animated counter component
function AnimatedCounter({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass neon-border rounded-xl p-6 text-center group cursor-default"
    >
      <div className="text-5xl font-bold gradient-text mb-2 group-hover:animate-neon-pulse">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mishabvibes', label: 'GitHub', color: 'hover:text-matrix-green' },
    { icon: Linkedin, href: 'https://linkedin.com/in/muhammed-mishab-71311034a', label: 'LinkedIn', color: 'hover:text-cyber-cyan' },
    { icon: Instagram, href: 'https://instagram.com/heymishab', label: 'Instagram', color: 'hover:text-neon-pink' },
    { icon: Mail, href: 'mailto:mishabvibes@gmail.com', label: 'Email', color: 'hover:text-terminal-green' },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen py-12 md:py-0 flex items-center justify-center overflow-hidden">
        {/* Lightning Background Effect */}
        <div className="absolute inset-0 opacity-30">
          <Lightning
            hue={120}
            xOffset={0}
            speed={0.5}
            intensity={0.8}
            size={1.5}
          />
        </div>
        
        <motion.div style={{ opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        </motion.div>

      {/* Hero content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass neon-border">
                <StatusBadge status="online" showText={false} />
                <span className="text-sm font-mono text-terminal-green">AVAILABLE FOR PROJECTS</span>
              </div>
          </motion.div>

            {/* Main heading with typing effect */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="mb-4 flex justify-center">
                <GlitchText
                  speed={0.7}
                  enableShadows={true}
                  enableOnHover={false}
                  className="text-5xl md:text-7xl lg:text-8xl"
                >
                  MISHAB
                </GlitchText>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                <span className="gradient-text">Full-Stack Developer</span>
              </div>
            </motion.div>

            {/* Tagline with Scrambled Text Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              <ScrambledText
                radius={120}
                duration={0.8}
                speed={0.5}
                scrambleChars=".:!@#$%^&*()01<>/?"
                className="text-muted-foreground text-center"
              >
                Transforming ideas into elegant digital solutions. Specializing in modern web development with React, Next.js, and Django.
              </ScrambledText>
            </motion.div>

            {/* Location & Company */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Badge className="px-4 py-2 text-sm bg-matrix-green/10 border-matrix-green/30 text-matrix-green">
                <span className="mr-2">📍</span> Palakkad, Kerala, India
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan">
                <span className="mr-2">💼</span> DigiBayt
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-neon-pink/10 border-neon-pink/30 text-neon-pink">
                <span className="mr-2">⚡</span> 3+ Years Experience
              </Badge>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/projects">
                <Button size="lg" variant="default" className="group min-w-[200px]">
                  <Rocket className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View Projects
                </Button>
              </Link>
              <Link href="/terminal">
                <Button size="lg" variant="neon" className="group min-w-[200px]">
                  <TerminalIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Launch Terminal
              </Button>
            </Link>
            <Link href="/contact">
                <Button size="lg" variant="outline" className="group min-w-[200px]">
                <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get in Touch
              </Button>
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex gap-4 justify-center mb-20"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                  className={`h-14 w-14 rounded-full glass neon-border flex items-center justify-center transition-all ${social.color}`}
                aria-label={social.label}
              >
                  <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground font-mono">SCROLL TO EXPLORE</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-6 w-6 text-primary animate-neon-pulse" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <AnimatedCounter value="39+" label="GitHub Repos" delay={0} />
            <AnimatedCounter value="15+" label="Projects Delivered" delay={0.1} />
            <AnimatedCounter value="10+" label="Technologies" delay={0.2} />
            <AnimatedCounter value="100%" label="Client Satisfaction" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Terminal Demo Section - Enhanced Scroll Reveal */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header with Advanced Scroll Reveal */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            {/* Title - Slide from top with scale */}
            <motion.h2
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            >
              <span className="gradient-text">Interactive Experience</span>
            </motion.h2>

            {/* Description - Fade and slide from bottom */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                delay: 0.15,
                ease: "easeOut"
              }}
              className="text-muted-foreground text-lg mb-4"
            >
              Experience my portfolio through realistic terminal interfaces
            </motion.p>

            {/* Badges - Staggered slide from left and right */}
            <div className="flex gap-2 justify-center flex-wrap">
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Badge className="bg-matrix-green/10 border-matrix-green/30 text-matrix-green hover:scale-110 transition-transform cursor-default">
                  Kali Linux Style
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.35,
                  ease: "backOut"
                }}
              >
                <Badge className="bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan hover:scale-110 transition-transform cursor-default">
                  Live Typing Animation
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Badge className="bg-neon-pink/10 border-neon-pink/30 text-neon-pink hover:scale-110 transition-transform cursor-default">
                  Realistic Terminal
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Terminal - Slide from bottom with scale and glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="max-w-5xl mx-auto"
          >
            {/* Glow effect wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Animated glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 80px rgba(0, 255, 0, 0.1)',
                    '0 0 120px rgba(0, 255, 255, 0.15)',
                    '0 0 80px rgba(0, 255, 0, 0.1)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-50 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 255, 0.1))' }}
              />
              
              {/* Kali Linux Terminal */}
              <div className="relative z-10">
                <KaliTerminalDemo />
            </div>
            </motion.div>

            {/* Link to full terminal - Bounce in from bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1] // Bounce ease
              }}
              className="text-center mt-8"
            >
              <Link href="/terminal">
                <Button size="lg" variant="neon" className="group relative overflow-hidden">
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-green/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <TerminalIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Try Full Interactive Terminal</span>
                  <ArrowDown className="h-5 w-5 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-20 left-10 text-6xl pointer-events-none"
          >
            <motion.span
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block text-matrix-green"
            >
              💻
            </motion.span>
          </motion.div>
          
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-20 right-10 text-6xl pointer-events-none"
          >
            <motion.span
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block text-cyber-cyan"
            >
              ⚡
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What I <span className="gradient-text">Do</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Specializing in modern web development and creating exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full glass neon-border group hover:shadow-2xl hover:shadow-primary/20 transition-all">
                  <CardHeader>
                    <div className={`h-14 w-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-7 w-7 text-white" />
                </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies I use to build amazing products
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(techStack).map(([category, techs], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="glass neon-border">
                    <CardHeader>
                      <CardTitle className="capitalize text-lg text-primary">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <TechBadge key={tech} tech={tech} className="text-xs" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg px-4">
              Some of my recent work that I'm proud of
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => {
              // Center card (index 1) has permanent electrical effect
              const isCenterCard = index === 1
              
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {isCenterCard ? (
                    // Center card - Always active electrical border with enhanced glow
                    <div className="h-full relative">
                      {/* Permanent glow effect for center card */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 40px rgba(0, 255, 0, 0.3)',
                            '0 0 60px rgba(0, 255, 255, 0.4)',
                            '0 0 40px rgba(0, 255, 0, 0.3)',
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -inset-2 rounded-xl blur-xl opacity-60 pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 255, 0.2))' }}
                      />
                      
                      <ElectricBorder
                        color="#00ff00"
                        speed={1.5}
                        chaos={0.5}
                        thickness={2}
                        style={{ borderRadius: 12, height: '100%' }}
                        className="h-full permanent-active"
                        alwaysActive={true}
                      >
                        <Card className="h-full glass border border-matrix-green/40 group shadow-2xl shadow-matrix-green/30 bg-black/60 scale-[1.02] relative">
                          {/* Featured badge */}
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-4 right-4 z-10"
                          >
                            <Badge className="bg-matrix-green/20 border-matrix-green text-matrix-green font-bold text-xs">
                              ⚡ FEATURED
                            </Badge>
                          </motion.div>
                          
                          <CardHeader>
                            <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-lg mb-4 opacity-100 transition-opacity`} />
                            <CardTitle className="text-xl text-matrix-green transition-colors">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-foreground transition-colors">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs bg-matrix-green/20 border-matrix-green/50 text-matrix-green transition-all">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <Link href={project.link}>
                              <Button variant="ghost" className="w-full group/btn hover:bg-matrix-green/10 hover:text-matrix-green">
                                <span>View Project</span>
                                <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </ElectricBorder>
                    </div>
                  ) : (
                    // Other cards - Hover-activated electrical border
                    <ElectricBorder
                      color="#00ff00"
                      speed={1.5}
                      chaos={0.5}
                      thickness={2}
                      style={{ borderRadius: 12, height: '100%' }}
                      className="h-full"
                    >
                      <Card className="h-full glass border border-matrix-green/20 group hover:shadow-2xl hover:shadow-matrix-green/30 transition-all duration-500 bg-black/50 hover:border-matrix-green/40 hover:scale-[1.02]">
                        <CardHeader>
                          <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity`} />
                          <CardTitle className="text-xl group-hover:text-matrix-green transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs bg-matrix-green/10 border-matrix-green/30 text-matrix-green group-hover:bg-matrix-green/20 group-hover:border-matrix-green/50 transition-all">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Link href={project.link}>
                            <Button variant="ghost" className="w-full group/btn hover:bg-matrix-green/10 hover:text-matrix-green">
                              <span>View Project</span>
                              <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </ElectricBorder>
                  )}
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button size="lg" variant="neon" className="group">
                View All Projects
                <ArrowDown className="h-5 w-5 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass neon-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
              <CardContent className="relative p-12 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-6xl mb-6"
                >
                  🚀
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Let's Build Something <span className="gradient-text">Amazing</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Have a project in mind? Looking for a passionate developer to bring your ideas to life? 
                  Let's collaborate and create something extraordinary together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="default" className="min-w-[200px]">
                      <Mail className="h-5 w-5 mr-2" />
                      Start a Project
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="min-w-[200px]">
                      <Eye className="h-5 w-5 mr-2" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
      </div>
      </section>
    </div>
  )
}
