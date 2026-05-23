import React, { useState, useEffect } from 'react'

export default function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  const links = [
    { id: 'about',    label: 'ABOUT' },
    { id: 'work',     label: 'WORK' },
    { id: 'approach', label: 'APPROACH' },
    { id: 'cv',       label: 'CV' },
    { id: 'contact',  label: 'CONTACT' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Programmatic viewport dark section scan (immune to observer overlaps)
      const darkSections = ['approach']
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
      <button className="nav-logo" onClick={() => onNav('Landing')}
        style={{ color: isDark ? '#ffffff' : '#111111' }}>
        Albin.
      </button>
      <nav className="nav-links">
        {links.map(l => {
          const isActive = active === l.label || active.toLowerCase() === l.id || (l.id === 'work' && active === 'WORK_DARK')
          return (
            <button key={l.id} className={`nav-link ${isActive ? 'active' : ''}`}
              style={{ color: isDark ? (isActive ? '#ffffff' : 'rgba(255,255,255,0.55)') : undefined }}
              onClick={() => onNav(l.label)}>
              {l.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
