import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import TechDiagramSVG from './TechDiagramSVG'
import AIBrainReveal from './AIBrainReveal'

export default function LandingSection({ onViewWork }) {
  const sectionRef = useRef(null)

  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)
  const circle3Ref = useRef(null)
  const circle4Ref = useRef(null)

  const mousePos = useRef({ x: -1000, y: -1000 })

  const [isHovered, setIsHovered] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)

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
    { n: '10+', label: 'Projects Built' },
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

      {/* 3. PORTRAIT PROFILE PHOTO LAYER (zIndex: 2, perfectly aligned, slides away on hover) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2
        }}
      >
        <div className="hero-grid" style={{ height: '100%' }}>
          {/* Spacer Left Column to match layout exactly */}
          <div style={{ visibility: 'hidden' }} />
          
          {/* Right Column containing the clean borderless profile image */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: '2.5rem',
            transform: 'translateY(-70px)',
            position: 'relative'
          }}>
            {/* The photo itself (No frame box, no double-borders, just massive and borderless!) */}
            <img 
              src="/profile.png" 
              alt="Albin John Portrait"
              style={{
                width: 'min(500px, 95%)',
                aspectRatio: '0.82',
                objectFit: 'cover',
                borderRadius: '32px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
                pointerEvents: 'none',
                // Smoothly slide out to the right when hovered (or initially hidden)
                transform: (!hasRevealed || isHovered) 
                  ? 'translateX(120%) scale(0.85) rotate(12deg)' 
                  : 'translateX(0) scale(1) rotate(0deg)',
                opacity: (!hasRevealed || isHovered) ? 0 : 1,
                filter: (!hasRevealed || isHovered) ? 'blur(8px)' : 'blur(0px)',
                // Elastic bouncy transition for the magic entry on mouse leave!
                transition: (!hasRevealed || isHovered) 
                  ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease'
                  : 'transform 0.95s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease, filter 0.5s ease'
              }}
            />

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
      </div>

      {/* 4. STATIC HERO LAYOUT */}
      <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Left Column (Relative container) */}
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          padding:'clamp(2rem,5vw,4.5rem)', paddingBottom:'clamp(2.5rem,5vw,4rem)', gap:'1.5rem', position: 'relative' }}>
          
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
            <button className="btn-secondary">
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
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              maskImage: 'url(#gooey-mask)',
              WebkitMaskImage: 'url(#gooey-mask)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(2rem,5vw,4.5rem)',
              paddingBottom: 'clamp(2.5rem,5vw,4rem)',
              gap: '1.5rem'
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

        {/* Right Column Spacer (Transparent active hover capture zone, aligned at translateY(-70px)) */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            if (!hasRevealed) setHasRevealed(true)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: '2.5rem',
            transform: 'translateY(-70px)',
            background: 'transparent'
          }}
        >
          <div style={{
            width: 'min(500px, 95%)',
            aspectRatio: '0.82',
            background: 'transparent'
          }} />
        </div>
      </div>

      {/* STATS BAR */}
      <motion.div className="stats-bar"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
        style={{ position:'relative', zIndex:10 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-number">{s.n}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ zIndex:10 }}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
