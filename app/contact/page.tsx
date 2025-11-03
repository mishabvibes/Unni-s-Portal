'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Github, Send, CheckCircle, Loader2, Instagram, Linkedin, Code2, Coffee, Zap, Target } from 'lucide-react'
import { Component as MatrixCodeRain } from '@/components/ui/matrix-code-rain'

// Lazy load the heavy DottedMap component for better performance
const DottedMap = lazy(() => import('@/components/ui/dotted-map').then(module => ({ default: module.DottedMap })))

/**
 * Contact Page - Get in touch with Mishab!
 */

// Form validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Mishab's actual contact info
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mishabvibes@gmail.com',
    href: 'mailto:mishabvibes@gmail.com',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'mishabvibes',
    href: 'https://github.com/mishabvibes',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'muhammed-mishab-nk',
    href: 'https://www.linkedin.com/in/muhammed-mishab-nk/',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@heymishab',
    href: 'https://instagram.com/heymishab',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Palakkad, Kerala, India 🇮🇳',
    href: '#',
    color: 'from-green-500 to-emerald-500',
  },
]

// Fun quick contact options
const quickActions = [
  { icon: Coffee, label: 'Coffee Chat', desc: 'Let\'s grab a virtual coffee!', emoji: '☕' },
  { icon: Code2, label: 'Code Collab', desc: 'Want to build something together?', emoji: '👨‍💻' },
  { icon: Zap, label: 'Quick Question', desc: 'I respond within 24 hours!', emoji: '⚡' },
]

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call - You can integrate with Formspree or Resend
    try {
      // Uncomment when you have a form endpoint
      // const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form data:', data)
      setIsSuccess(true)
      reset()
      
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <MatrixCodeRain />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
      {/* Header */}
      <Section>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-6">
            <motion.span
              animate={prefersReducedMotion ? {} : { rotate: [0, 14, -8, 14, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block"
            >
              👋
            </motion.span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect!</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got an exciting project? Want to collaborate? Or just want to say hi? 
            Drop me a message! 🚀
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -5 }}
              className="glass rounded-xl p-6 text-center border border-primary/20"
            >
              <div className="text-4xl mb-3">{action.emoji}</div>
              <h3 className="font-semibold mb-1">{action.label}</h3>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Me Online 🌐</h2>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out through any of these channels. I'm most active on GitHub and LinkedIn!
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="block group"
                >
                  <Card className="group-hover:shadow-xl transition-all border-2 border-transparent group-hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`h-12 w-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <item.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium group-hover:text-primary transition-colors">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Availability status */}
            {/* <Card className="glass border-2 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-3 w-3 rounded-full bg-green-500"
                    />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping" />
                  </div>
                  <div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      Available for Projects! 🎉
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Open to exciting opportunities
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Fun fact */}
            {/* <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">⚡</div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Pro tip:</span> Mention "coffee" 
                  in your message for a faster reply! ☕😄
                </p>
              </CardContent>
            </Card> */}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" />
                  Send me a message
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and I'll get back to you ASAP!
                </p>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Awesome! Message Sent! 🎉</h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out! I'll get back to you within 24 hours. 
                      In the meantime, check out my <a href="/projects" className="text-primary hover:underline">projects</a>!
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1 flex items-center gap-1"
                        >
                          ⚠️ {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Email field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1 flex items-center gap-1"
                        >
                          ⚠️ {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Subject field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        placeholder="Let's build something amazing!"
                        {...register('subject')}
                        className={errors.subject ? 'border-red-500' : ''}
                      />
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1 flex items-center gap-1"
                        >
                          ⚠️ {errors.subject.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Message field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project, idea, or just say hi! Don't forget to mention coffee for bonus points! ☕"
                        {...register('message')}
                        className={errors.message ? 'border-red-500' : ''}
                        rows={6}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1 flex items-center gap-1"
                        >
                          ⚠️ {errors.message.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending your message...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message 🚀
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      💡 <span className="font-medium">Response time:</span> Usually within 24 hours!
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Location Map Section */}
      <Section className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Target className="h-6 w-6 text-matrix-green" />
              <h2 className="text-3xl font-bold">
                <span className="gradient-text">Target Location</span>
              </h2>
            </motion.div>
            <p className="text-muted-foreground text-lg">
              Based in Palakkad, Kerala, India 🇮🇳
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative overflow-hidden border-2 border-matrix-green/30 bg-black/60 backdrop-blur-sm">
              {/* Removed scanlines for performance */}

              <CardContent className="p-0 relative">
                {/* Map Container */}
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                  {/* Static crosshair overlay - No animation for better performance */}
                  <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-50">
                    <div className="relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 border-2 border-matrix-green rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Map - Lazy loaded for better performance */}
                  <Suspense fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-matrix-green" />
                        <span className="text-sm text-matrix-green font-mono">LOADING MAP...</span>
                      </div>
                    </div>
                  }>
                    <DottedMap
                      width={200}
                      height={100}
                      mapSamples={1500}
                      markers={[
                        {
                          lat: 10.8505,  // Palakkad, Kerala latitude
                          lng: 76.2711,  // Palakkad, Kerala longitude
                          size: 0.8,
                      },
                    ]}
                    dotRadius={0.15}
                    markerColor="#00ff00"
                    className="text-matrix-green/40"
                  />
                  </Suspense>

                  {/* Corner brackets (hacker UI) */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-matrix-green/60" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-matrix-green/60" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-matrix-green/60" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-matrix-green/60" />
                </div>

                {/* Location Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div>
                      <div className="text-xs text-cyber-cyan font-mono mb-1">
                        TARGET ACQUIRED
                      </div>
                      <div className="text-base sm:text-lg font-bold text-matrix-green font-mono">
                        10.8505°N, 76.2711°E
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                        Palakkad, Kerala, India
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-matrix-green shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                      <span className="text-xs text-matrix-green font-mono font-bold">
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 text-center"
            >
              <div className="inline-block bg-black/60 border border-matrix-green/20 rounded-lg px-3 sm:px-6 py-2 sm:py-3 font-mono text-[10px] sm:text-xs text-muted-foreground backdrop-blur-sm max-w-full overflow-x-auto">
                <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-1">
                  <span className="text-matrix-green">[</span>
                  <span className="text-cyber-cyan whitespace-nowrap">SYSTEM</span>
                  <span className="text-matrix-green">]</span>
                  <span className="text-matrix-green/50">:</span>
                  <span className="text-terminal-green whitespace-nowrap">Tracking Active</span>
                  <span className="text-matrix-green/50 hidden sm:inline">|</span>
                  <span className="whitespace-nowrap">Timezone: IST</span>
                  <span className="text-matrix-green/50 hidden sm:inline">|</span>
                  <span className="whitespace-nowrap">Region: South Asia</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* FAQ Section */}
      <Section className="mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Quick <span className="gradient-text">Answers</span> 💬
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What\'s your typical response time?',
                a: 'I usually respond within 24 hours! For urgent matters, try reaching out on LinkedIn or Instagram.',
                emoji: '⏱️',
              },
              {
                q: 'What kind of projects are you interested in?',
                a: 'I love working on web apps, AI/ML projects, and anything that involves modern tech stacks. Bonus points if it involves Next.js or Django!',
                emoji: '💡',
              },
              {
                q: 'Do you freelance?',
                a: 'Yes! I\'m open to interesting freelance projects. Let\'s discuss your requirements and see if we\'re a good fit!',
                emoji: '💼',
              },
              {
                q: 'Can we collaborate on open source?',
                a: 'Absolutely! I\'m always excited about open source collaborations. Check out my GitHub and let\'s build something cool together!',
                emoji: '🤝',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="group hover:shadow-lg transition-all border border-primary/10 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {faq.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {faq.q}
                        </h3>
                        <p className="text-muted-foreground text-sm">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      </div>
    </div>
  )
}
