import React, { useState, useEffect } from 'react'

export default function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  const links = [
    { id: 'about',    label: 'ABOUT' },
    { id: 'work',     label: 'WORK' },
    { id: 'skills',   label: 'SKILLS' },
    { id: 'cv',       label: 'CERTIFICATIONS' },
    { id: 'contact',  label: 'CONTACT' }
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

  return (
    <header className={`navbar ${isDark ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <button className="nav-logo" onClick={() => onNav('Landing')}>
        Albin.
      </button>
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
    </header>
  )
}
