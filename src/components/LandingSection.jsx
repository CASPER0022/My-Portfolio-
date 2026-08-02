import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TechDiagramSVG from './TechDiagramSVG'
import AIBrainReveal from './AIBrainReveal'
import RobotCanvas from './RobotCanvas'

export default function LandingSection({ onViewWork, onViewMaterials }) {
  const sectionRef = useRef(null)

  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)
  const circle3Ref = useRef(null)
  const circle4Ref = useRef(null)

  const mousePos = useRef({ x: -1000, y: -1000 })

  const [isHovered, setIsHovered] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showResume])

  useEffect(() => {
    let x1 = -1000, y1 = -1000
    let x2 = -1000, y2 = -1000
    let x3 = -1000, y3 = -1000
    let x4 = -1000, y4 = -1000

    let animId

    const update = () => {
      const target = mousePos.current

      if (target.x === -1000 && target.y === -1000) {
        // Smoothly return off-screen when inactive
        x1 += (-1000 - x1) * 0.2
        y1 += (-1000 - y1) * 0.2
        x2 += (-1000 - x2) * 0.2
        y2 += (-1000 - y2) * 0.2
        x3 += (-1000 - x3) * 0.2
        y3 += (-1000 - y3) * 0.2
        x4 += (-1000 - x4) * 0.2
        y4 += (-1000 - y4) * 0.2
      } else {
        // If coming from off-screen, snap to target instantly to prevent visual lag
        if (x1 < -500) {
          x1 = target.x; y1 = target.y
          x2 = target.x; y2 = target.y
          x3 = target.x; y3 = target.y
          x4 = target.x; y4 = target.y
        }

        // Elegant fluid metaball lag trail mathematics
        x1 += (target.x - x1) * 0.28
        y1 += (target.y - y1) * 0.28
        
        x2 += (x1 - x2) * 0.22
        y2 += (y1 - y2) * 0.22
        
        x3 += (x2 - x3) * 0.16
        y3 += (y2 - y3) * 0.16
        
        x4 += (x3 - x4) * 0.12
        y4 += (y3 - y4) * 0.12
      }

      // Statically inject attributes directly on the DOM nodes at 60FPS
      if (circle1Ref.current) {
        circle1Ref.current.setAttribute('cx', x1.toFixed(1))
        circle1Ref.current.setAttribute('cy', y1.toFixed(1))
      }
      if (circle2Ref.current) {
        circle2Ref.current.setAttribute('cx', x2.toFixed(1))
        circle2Ref.current.setAttribute('cy', y2.toFixed(1))
      }
      if (circle3Ref.current) {
        circle3Ref.current.setAttribute('cx', x3.toFixed(1))
        circle3Ref.current.setAttribute('cy', y3.toFixed(1))
      }
      if (circle4Ref.current) {
        circle4Ref.current.setAttribute('cx', x4.toFixed(1))
        circle4Ref.current.setAttribute('cy', y4.toFixed(1))
      }

      animId = requestAnimationFrame(update)
    }

    update()
    return () => cancelAnimationFrame(animId)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) {
      mousePos.current.x = e.clientX - rect.left
      mousePos.current.y = e.clientY - rect.top
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePos.current.x = -1000
    mousePos.current.y = -1000
  }, [])

  useEffect(() => {
    mousePos.current.x = -1000
    mousePos.current.y = -1000
  }, [])

  const stats = [
    { n: '20+', label: 'Projects Built' },
    { n: 'AI/ML', label: 'Specialization' },
    { n: 'Full Stack', label: 'Engineering' },
    { n: 'Open', label: 'to Opportunities' },
  ]

  return (
    <section id="landing" ref={sectionRef} className="hero-section"
      style={{ cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 4.2 -0.8" result="goo" />
          </filter>
          
          <g id="gooey-circles" filter="url(#gooey-filter)">
            <circle ref={circle1Ref} cx="-1000" cy="-1000" r="95" />
            <circle ref={circle2Ref} cx="-1000" cy="-1000" r="76" />
            <circle ref={circle3Ref} cx="-1000" cy="-1000" r="60" />
            <circle ref={circle4Ref} cx="-1000" cy="-1000" r="42" />
          </g>

          <mask id="gooey-mask" maskContentUnits="userSpaceOnUse">
            <use href="#gooey-circles" fill="white" />
          </mask>
          
          <mask id="inverse-gooey-mask" maskContentUnits="userSpaceOnUse">
            <rect x="-10%" y="-10%" width="120%" height="120%" fill="white" />
            <use href="#gooey-circles" fill="black" />
          </mask>
        </defs>
      </svg>

      {/* 1. DEFAULT BACKGROUND (zIndex: 0) */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <TechDiagramSVG opacity={0.015} />
      </div>

      {/* 2. REVEAL STATE BACKGROUND CANVAS (zIndex: 1, pointer-events: none, masked) */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, maskImage: 'url(#gooey-mask)', WebkitMaskImage: 'url(#gooey-mask)' }}>
        <AIBrainReveal />
      </motion.div>



      {/* 4. STATIC HERO LAYOUT */}
      <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Left Column (Relative container) */}
        <div className="hero-content-col" style={{ position: 'relative' }}>
          
          {/* DEFAULT BLACK HEADING */}
          <h1 className="hero-name" style={{ color: '#111111' }}>
            ALBIN'S<br />
            ENGINEERING<br />
            ARCHIVE
          </h1>

          {/* Role pills — positioned above white layer for correct hover and colors */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', position: 'relative', zIndex: 10 }}>
            <span className="hero-pill">Full Stack Developer</span>
            <span className="hero-pill">AI / ML Engineer</span>
          </div>

          {/* DEFAULT BLACK DESCRIPTION */}
          <p className="hero-statement" style={{ color: '#374151' }}>
            Building intelligent systems, scalable software, and AI-powered products that solve real-world problems.
          </p>

          {/* Interactive Buttons — positioned above white layer */}
          <div style={{ display:'flex', gap:'0.875rem', flexWrap:'wrap', marginTop:'0.5rem', position: 'relative', zIndex: 10 }}>
            <button className="btn-primary" onClick={onViewWork}>
              View Projects
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-primary" onClick={onViewMaterials} style={{ background: '#14497f' }}>
              Placement Materials
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => setShowResume(true)}
              className="btn-secondary"
              style={{ textDecoration: 'none', background: 'none', border: '1.5px solid rgba(8,28,77,0.25)' }}
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Prompt text — positioned above white layer */}
          <p style={{ fontSize:'0.65rem', color:'rgba(107,114,128,0.55)', letterSpacing:'0.15em',
            fontFamily:'JetBrains Mono,monospace', textTransform:'uppercase', position: 'relative', zIndex: 10 }}>
            ✦ Move cursor to reveal hidden AI diagrams
          </p>

          {/* WHITE TEXT SPOTLIGHT OVERLAY (zIndex: 5, pointer-events: none, masked) */}
          <motion.div 
            className="hero-content-col absolute inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              maskImage: 'url(#gooey-mask)',
              WebkitMaskImage: 'url(#gooey-mask)'
            }}>
            {/* White Heading */}
            <h1 className="hero-name" style={{ color: '#ffffff' }}>
              ALBIN'S<br />
              ENGINEERING<br />
              ARCHIVE
            </h1>
            {/* Pill Spacer */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', visibility: 'hidden' }}>
              <span className="hero-pill">Spacer</span>
            </div>
            {/* White Description */}
            <p className="hero-statement" style={{ color: '#ffffff' }}>
              Building intelligent systems, scalable software, and AI-powered products that solve real-world problems.
            </p>
            {/* Button Spacer */}
            <div style={{ display:'flex', gap:'0.875rem', flexWrap:'wrap', marginTop:'0.5rem', visibility: 'hidden' }}>
              <button className="btn-primary">Spacer</button>
            </div>
            {/* Prompt Spacer */}
            <p style={{ fontSize:'0.65rem', visibility: 'hidden' }}>Spacer</p>
          </motion.div>
        </div>

        {/* Right Column containing the interactive 3D robot */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            if (!hasRevealed) setHasRevealed(true)
          }}
          className="hero-robot-container"
        >
          {/* Transparent click-to-drag WebGL container */}
          <div className="hero-robot-canvas-wrapper relative">
            <RobotCanvas />
          </div>

          {/* Swipe Side Guides for Mobile Scrolling (only visible on mobile screens) */}
          <div className="absolute left-[6%] inset-y-0 w-10 flex flex-col items-center justify-center pointer-events-none md:hidden" style={{ zIndex: 20 }}>
            <div className="flex flex-col items-center gap-2.5 opacity-55" style={{ animation: 'bounce 2s infinite' }}>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-gray-500 [writing-mode:vertical-lr] uppercase pl-1">Swipe Side</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          <div className="absolute right-[6%] inset-y-0 w-10 flex flex-col items-center justify-center pointer-events-none md:hidden" style={{ zIndex: 20 }}>
            <div className="flex flex-col items-center gap-2.5 opacity-55" style={{ animation: 'bounce 2s infinite' }}>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-gray-500 [writing-mode:vertical-lr] uppercase pl-1">Swipe Side</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

          {/* Glowing Cyber Ash Particle Emitter */}
          {(isHovered && hasRevealed) && Array.from({ length: 22 }).map((_, idx) => {
            const size = Math.random() * 5 + 3; // size between 3px and 8px
            const delay = Math.random() * 0.35;
            const duration = Math.random() * 0.7 + 0.5;
            const topVal = Math.random() * 70 + 15; // percentage
            const rightVal = Math.random() * 40 + 20; // percentage
            const animName = `ashDrift${(idx % 3) + 1}`;
            const color = Math.random() > 0.45 ? '#00f0ff' : '#ffffff';
            
            return (
              <div 
                key={idx}
                style={{
                  position: 'absolute',
                  top: `${topVal}%`,
                  right: `${rightVal}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: color,
                  boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                  pointerEvents: 'none',
                  zIndex: 15,
                  animation: `${animName} ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s forwards`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Default Stats Bar */}
      <motion.div className="stats-bar"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
        style={{ position:'relative', zIndex: 2 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-number">{s.n}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Section-wide White Stats Spotlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'url(#gooey-mask)',
          WebkitMaskImage: 'url(#gooey-mask)',
          zIndex: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <motion.div className="stats-bar"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
          style={{ 
            borderTop: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent'
          }}
        >
          {stats.map((s, i) => (
            <div key={i} className="stat-item" style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <span className="stat-number" style={{ color: '#ffffff' }}>{s.n}</span>
              <span className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium Resume Preview Modal - Similar to Certifications Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="relative w-full max-w-4xl h-[80vh] md:h-[85vh] bg-transparent flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Glassmorphic Controls Group (Download & Close) */}
              <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <a
                  href="/resume/My Resume.pdf"
                  download="My_Resume.pdf"
                  className="p-2.5 rounded-full bg-slate-900/90 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 border border-white/10 shadow-xl cursor-pointer"
                  title="Download Resume"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  className="p-2.5 rounded-full bg-slate-900/90 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 border border-white/10 shadow-xl cursor-pointer"
                  title="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Minimalist Document Stage */}
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                <iframe
                  src="/resume/My Resume.pdf#toolbar=0&navpanes=0&statusbar=0&messages=0"
                  title="Resume"
                  className="w-full h-full border-0 rounded-2xl bg-white shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ zIndex:10 }}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
