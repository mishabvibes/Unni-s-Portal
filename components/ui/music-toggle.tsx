'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Volume2, VolumeX } from 'lucide-react'

interface MusicToggleProps {
  audioSrc?: string
  defaultVolume?: number
}

export function MusicToggle({ 
  audioSrc = '/music/background.mp3',
  defaultVolume = 0.3 
}: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Setup audio and autoplay
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Configure audio
    audio.volume = defaultVolume
    audio.loop = true

    // Multiple autoplay attempts
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        console.log('🎵 MUSIC PLAYING!')
        return true
      } catch (err) {
        console.log('🎵 Autoplay blocked:', err)
        return false
      }
    }

    // Attempt 1: Immediate
    playAudio()

    // Attempt 2: After 100ms
    const timer1 = setTimeout(playAudio, 100)

    // Attempt 3: After 500ms
    const timer2 = setTimeout(playAudio, 500)

    // Attempt 4: After 1 second
    const timer3 = setTimeout(playAudio, 1000)

    // Setup interaction handlers as fallback
    const startOnInteraction = async () => {
      const success = await playAudio()
      if (success) {
        // Remove all event listeners after successful play
        events.forEach(event => {
          document.removeEventListener(event, startOnInteraction)
        })
      }
    }

    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'scroll', 'mousemove']
    events.forEach(event => {
      document.addEventListener(event, startOnInteraction, { passive: true })
    })

    // Cleanup
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      events.forEach(event => {
        document.removeEventListener(event, startOnInteraction)
      })
    }
  }, [defaultVolume])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.volume = isMuted ? 0 : defaultVolume
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Failed to toggle music:', error)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    
    if (isMuted) {
      audioRef.current.volume = defaultVolume
      setIsMuted(false)
    } else {
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        preload="auto"
        playsInline
        muted={false}
      />
      
      {/* Vertical Music Toggle - Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 md:gap-2"
      >
        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          className="relative group"
        >
          {/* Glow effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-xl md:rounded-2xl bg-matrix-green/30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Button Container - Smaller on mobile */}
          <div className={`relative flex flex-col items-center gap-1.5 md:gap-3 px-2 md:px-3 py-3 md:py-6 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
            isPlaying 
              ? 'bg-black/90 border-matrix-green shadow-[0_0_20px_rgba(0,255,0,0.4)]' 
              : 'bg-black/70 border-matrix-green/30 shadow-lg'
          }`}>
            {/* Music Icon - Smaller on mobile */}
            <motion.div
              animate={isPlaying ? {
                y: [0, -4, 0],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Music className={`h-4 w-4 md:h-6 md:w-6 ${
                isPlaying ? 'text-matrix-green' : 'text-muted-foreground'
              }`} />
            </motion.div>

            {/* Status Bars - Smaller on mobile */}
            <div className="flex gap-0.5 md:gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`w-0.5 md:w-1 rounded-full ${
                    isPlaying ? 'bg-matrix-green' : 'bg-muted-foreground/30'
                  }`}
                  animate={isPlaying ? {
                    height: ['6px', '14px', '6px'],
                  } : {
                    height: '6px'
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Status Text - Smaller on mobile */}
            <div className="text-[6px] md:text-[8px] font-mono tracking-wider">
              {isPlaying ? (
                <span className="text-matrix-green">ON</span>
              ) : (
                <span className="text-muted-foreground">OFF</span>
              )}
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-black/95 border border-matrix-green/40 rounded-lg px-3 py-2">
              <div className="text-xs font-mono text-matrix-green mb-1">
                BACKGROUND MUSIC
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">
                {isPlaying ? 'Click to turn OFF' : 'Click to turn ON'}
              </div>
            </div>
          </div>
        </motion.button>

        {/* Volume Toggle (when playing) - Smaller on mobile */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="relative group"
          >
            <div className="relative flex items-center justify-center px-1.5 md:px-2 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-black/80 border border-matrix-green/30 hover:border-matrix-green/60 transition-colors">
              {isMuted ? (
                <VolumeX className="h-3 w-3 md:h-4 md:w-4 text-hacker-red" />
              ) : (
                <Volume2 className="h-3 w-3 md:h-4 md:w-4 text-cyber-cyan" />
              )}
            </div>

            {/* Volume Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <div className="bg-black/95 border border-matrix-green/40 rounded-lg px-3 py-1.5">
                <div className="text-[10px] font-mono text-matrix-green">
                  {isMuted ? 'UNMUTE' : 'MUTE'}
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </motion.div>
    </>
  )
}

