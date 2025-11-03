'use client'

import { useState, useRef, useEffect } from 'react'

export default function PortfolioTerminal() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: '/welcome', output: `
███╗   ███╗██╗███████╗██╗  ██╗ █████╗ ██████╗     ██████╗  ██████╗ ██████╗ ████████╗███████╗
████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██╔████╔██║██║███████╗███████║███████║██████╔╝    ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║╚██╔╝██║██║╚════██║██╔══██║██╔══██║██╔══██╗    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║ ╚═╝ ██║██║███████║██║  ██║██║  ██║██████╔╝    ██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝     ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

[SYSTEM INITIALIZED] - Terminal Portfolio v1.0
[STATUS] Full-Stack Alchemist | Web Magician | Code Connoisseur

Welcome to Mishab's Interactive Terminal! Type 'help' to see available commands.` },
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = {
    'help': () => `
[AVAILABLE_COMMANDS]

about       Display personal information
projects    View project portfolio
skills      Show technical skills stack
experience  Display work history
education   View educational background
contact     Show contact information
clear       Clear terminal screen
help        Display this help message
social      Show social media links
status      Check current availability
    `,
    'about': () => `
Name: Muhammed Mishab
Role: Full-Stack Developer & Web Magician
Location: Palakkad, Kerala, India
Organization: DigiBayt
Status: 🟢 Open to opportunities

Bio: Passionate full-stack alchemist with expertise in building 
modern web applications. I transform coffee into code and ideas 
into reality. Specializing in Next.js, React, Django, and creating 
awesome user experiences that make people say "Wow!"

Philosophy: Code with passion, debug with patience, deploy with confidence.
    `,
    'projects': () => `
[PROJECT PORTFOLIO]

🚀 Featured Projects:

1. Modern Portfolio Website
   • Tech Stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
   • Features: Hacker theme, smooth cursor, cyber grid, terminal UI
   • Highlights: Custom animations, responsive design, SEO optimized
   • GitHub: https://github.com/mishabvibes

2. Full-Stack E-Commerce Platform
   • Tech Stack: React, Node.js, MongoDB, Stripe Integration
   • Features: Real-time inventory, payment processing, admin dashboard
   • Impact: Streamlined online shopping experience
   • Status: In production

3. Django Web Application
   • Tech Stack: Django, Python, PostgreSQL, REST API
   • Features: User authentication, data management, API endpoints
   • Performance: Fast and scalable backend architecture
   • Status: Live and serving users

4. React Dashboard
   • Tech Stack: React, Redux, Chart.js, Material-UI
   • Features: Data visualization, real-time updates, analytics
   • Purpose: Business intelligence and reporting
   • Status: Client project - deployed

💡 More projects available on GitHub!
    `,
    'skills': () => `
[TECHNICAL SKILLS MATRIX]

Frontend Development:
  React.js/Next.js      ████████████████████ 95%
  TypeScript            ██████████████████   90%
  HTML/CSS/Tailwind     ████████████████████ 98%
  JavaScript (ES6+)     ████████████████████ 95%
  Framer Motion         ████████████████     80%

Backend Development:
  Node.js/Express       ██████████████████   90%
  Django/Python         ██████████████████   90%
  REST APIs             ████████████████████ 95%
  PostgreSQL/MongoDB    ██████████████████   85%
  GraphQL               ██████████████       70%

Tools & DevOps:
  Git/GitHub            ████████████████████ 100%
  VS Code               ████████████████████ 100%
  Linux/Terminal        ██████████████████   90%
  Docker                ████████████         60%
  Vercel/Netlify        ████████████████████ 95%

Design & UX:
  Figma                 ██████████████       70%
  Responsive Design     ████████████████████ 95%
  UI/UX Principles      ████████████████     80%
  Animation             ████████████████     85%
    `,
    'experience': () => `
[WORK EXPERIENCE]

2023 - Present | Full-Stack Developer
DigiBayt, Kerala, India
• Building modern web applications with Next.js and React
• Developing scalable backend solutions with Django and Node.js
• Implementing responsive and accessible user interfaces
• Collaborating with teams to deliver high-quality projects
• Technologies: Next.js, React, Django, TypeScript, Tailwind CSS

2020 - 2023 | Web Developer & Designer
Freelance, Remote
• Created custom websites for various clients
• Developed e-commerce solutions and business platforms
• Implemented SEO best practices and performance optimization
• Provided ongoing maintenance and support
• Technologies: React, WordPress, PHP, MySQL

Projects & Open Source:
• Active contributor to open-source projects
• Building tools and libraries for the developer community
• Sharing knowledge through code and documentation
    `,
    'education': () => `
[EDUCATION & LEARNING]

Self-Taught Developer Journey:
• Started coding in 2020
• Learned through online courses, documentation, and practice
• Built 39+ projects to solidify understanding
• Continuous learner always exploring new technologies

Learning Path:
• HTML, CSS, JavaScript fundamentals
• React and modern frontend development
• Backend development with Node.js and Django
• Database design and management
• DevOps and deployment strategies

Online Courses & Certifications:
• Various web development courses and tutorials
• React and Next.js specialization
• Django and Python backend development
• Database and API design

Current Focus:
• Advanced TypeScript patterns
• Microservices architecture
• Cloud computing (AWS/GCP)
• AI/ML integration in web apps
    `,
    'contact': () => `
[CONTACT INFORMATION]

📧 Email: mishabvibes@gmail.com
🐙 GitHub: https://github.com/mishabvibes
💼 LinkedIn: https://www.linkedin.com/in/muhammed-mishab-nk/
📸 Instagram: https://instagram.com/heymishab
🌐 Portfolio: https://mishabvibes.github.io
📍 Location: Palakkad, Kerala, India

💬 Let's Connect!
I'm always excited to collaborate on interesting projects,
discuss new technologies, or just chat about code!

Response Time: Usually within 24 hours
Best Contact Method: Email or LinkedIn
Available for: Freelance projects, full-time opportunities, collaborations

"Let's build something awesome together!" 🚀
    `,
    'social': () => `
[SOCIAL MEDIA & LINKS]

🐙 GitHub:     https://github.com/mishabvibes
   • 39+ public repositories
   • Active contributor and maintainer
   
💼 LinkedIn:   https://linkedin.com/in/muhammed-mishab-71311034a
   • Professional network and updates
   
📸 Instagram:  https://instagram.com/heymishab
   • Behind the scenes and personal updates
   
📧 Email:      mishabvibes@gmail.com
   • For professional inquiries
   
🌐 Portfolio:  https://mishabvibes.github.io
   • Showcase of projects and skills

Follow me to stay updated on my latest projects and tech adventures!
    `,
    'status': () => `
[CURRENT STATUS]

🟢 Availability: ONLINE & READY

Work Status:
  • Currently employed at DigiBayt
  • Open to freelance opportunities
  • Available for interesting projects
  • Remote work preferred

What I'm Looking For:
  • Challenging full-stack projects
  • Innovative web applications
  • Collaborative team environments
  • Opportunities to learn and grow

Current Projects:
  • Building portfolio enhancements
  • Exploring AI integration in web apps
  • Contributing to open source
  • Learning new technologies daily

Contact me if you have exciting opportunities! 🚀
    `,
    'clear': () => {
      setHistory([])
      return ''
    },
  }

  const handleCommand = () => {
    const cmd = currentCommand.trim().toLowerCase()
    const commandFn = commands[cmd as keyof typeof commands]
    const output = commandFn ? commandFn() : `Command not found: ${cmd}
Type 'help' to see available commands.`

    if (cmd !== 'clear') {
      setHistory(prev => [...prev, { command: currentCommand, output }])
    }
    
    setCurrentCommand('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.min(prev + 1, history.length - 1)
        if (history.length > 0) {
          setCurrentCommand(history[history.length - 1 - newIndex]?.command || '')
        }
        return newIndex
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.max(prev - 1, -1)
        setCurrentCommand(newIndex === -1 ? '' : history[history.length - 1 - newIndex]?.command || '')
        return newIndex
      })
    }
  }

  useEffect(() => {
    // Scroll only within the terminal container, not the entire page
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [history])

  useEffect(() => {
    // Focus input when component mounts or when terminal is clicked
    const handleClick = () => {
      inputRef.current?.focus()
    }
    
    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleClick)
    }
    
    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [])

  const renderOutput = (output: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
    
    let parts = output.split(urlRegex)
    parts = parts.flatMap(part => 
      urlRegex.test(part) ? [part] : part.split(emailRegex)
    )
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-cyber-cyan hover:underline hover:text-cyber-cyan/80 transition-colors">
            {part}
          </a>
        )
      } else if (emailRegex.test(part)) {
        return (
          <a key={index} href={`mailto:${part}`} className="text-cyber-cyan hover:underline hover:text-cyber-cyan/80 transition-colors">
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent text-matrix-green font-mono">
      <div className="w-full h-full flex flex-col bg-black overflow-hidden">
        {/* Terminal Header - Compact & Professional */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 bg-muted/10 text-[10px] sm:text-xs text-muted-foreground border-b border-matrix-green/20 flex-shrink-0">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-hacker-red hover:bg-hacker-red/80 transition-colors cursor-pointer shadow-sm shadow-hacker-red/50" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-cyber-cyan hover:bg-cyber-cyan/80 transition-colors cursor-pointer shadow-sm shadow-cyber-cyan/50" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-matrix-green hover:bg-matrix-green/80 transition-colors cursor-pointer shadow-sm shadow-matrix-green/50" />
          </div>
          <div className="flex-1 text-center font-semibold text-matrix-green text-[9px] sm:text-[10px] md:text-xs lg:text-sm truncate px-1">
            <span className="hidden sm:inline">mishab@portfolio-terminal:~$</span>
            <span className="hidden md:inline"> | </span>
            <span className="sm:hidden">Terminal</span>
            <span className="hidden sm:inline">Interactive Portfolio v1.0</span>
          </div>
          <div className="text-[10px] sm:text-xs flex items-center gap-1">
            <span className="text-matrix-green animate-pulse">●</span>
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Terminal Output - Full height responsive */}
        <div 
          ref={terminalRef} 
          className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 bg-black cursor-text scrollbar-thin"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#00ff00 #1f2937'
          }}
        >
          {history.map((entry, i) => (
            <div key={i} className="space-y-1 sm:space-y-2">
              <div className="flex gap-1 sm:gap-2 flex-wrap items-start">
                <span className="text-cyber-cyan font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0">mishab@portfolio:~$</span>
                <span className="text-white text-xs sm:text-sm break-words break-all">{entry.command}</span>
              </div>
              <div className="whitespace-pre-wrap text-terminal-green pl-2 sm:pl-3 md:pl-4 lg:pl-6 leading-relaxed text-xs sm:text-sm break-words break-all overflow-wrap-anywhere font-mono">
                {renderOutput(entry.output)}
              </div>
            </div>
          ))}

          {/* Current Command Input - Professional responsive */}
          <div className="flex gap-1 sm:gap-2 items-center flex-wrap bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 rounded border border-matrix-green/10 sticky bottom-0 z-10">
            <span className="text-cyber-cyan font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0">mishab@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={e => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[80px] sm:min-w-[120px] bg-transparent outline-none text-white caret-matrix-green text-xs sm:text-sm placeholder:text-muted-foreground/50"
              placeholder="Type command..."
              autoFocus
              spellCheck="false"
            />
            <span className="text-matrix-green animate-pulse text-xs sm:text-sm flex-shrink-0">█</span>
          </div>

          {/* Auto-scroll anchor */}
          <div ref={bottomRef} />
        </div>
        
        {/* Terminal Footer - Compact & Hidden on mobile */}
        <div className="hidden sm:flex bg-muted/10 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground border-t border-matrix-green/20 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 w-full">
            <span className="text-terminal-green text-[9px] sm:text-[10px]">Type 'help' for commands • Use ↑/↓ for history</span>
            <span className="text-cyber-cyan text-[9px] sm:text-[10px]">Press Enter • 'clear' to reset</span>
          </div>
        </div>
      </div>
    </div>
  )
}

