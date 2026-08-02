import React, { useState, useEffect } from 'react'

export default function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { id: 'about',           label: 'ABOUT' },
    { id: 'work',            label: 'PROJECTS' },
    { id: 'experience',      label: 'EXPERIENCE' },
    { id: 'interview',       label: 'PLACEMENT MATERIALS' },
    { id: 'skills',          label: 'SKILLS' },
    { id: 'cv',              label: 'CERTIFICATIONS' },
    { id: 'extracurricular', label: 'EXTRACURRICULAR' },
    { id: 'contact',         label: 'CONTACT' }
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Programmatic viewport dark section scan (immune to observer overlaps)
      const darkSections = ['about', 'skills', 'extracurricular']
      let currentIsDark = false
      
      for (const id of darkSections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Navbar has a height of 68px. If a dark section covers this region, navbar turns dark!
          if (rect.top <= 68 && rect.bottom >= 68) {
            currentIsDark = true
            break
          }
        }
      }
      setIsDark(currentIsDark)
    }

    onScroll() // Set initial state
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when a navigation item is selected
  const handleMobileNav = (label) => {
    setIsOpen(false)
    onNav(label)
  }

  return (
    <>
      <header className={`navbar ${isDark ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => handleMobileNav('Landing')}>
          Albin.
        </button>
        
        {/* Desktop Links (Hidden on mobile via CSS) */}
        <nav className="nav-links">
          {links.map(l => {
            const isActive = active === l.label || active.toLowerCase() === l.id || (l.id === 'work' && active === 'WORK_DARK')
            return (
              <button key={l.id} className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => onNav(l.label)}>
                {l.label}
              </button>
            )
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={`burger-btn ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {links.map((l, index) => {
          const isActive = active === l.label || active.toLowerCase() === l.id || (l.id === 'work' && active === 'WORK_DARK')
          return (
            <button
              key={l.id}
              className={`mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={() => handleMobileNav(l.label)}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
              }}
            >
              {l.label}
            </button>
          )
        })}
      </div>
    </>
  )
}
