import React, { useState, useEffect } from 'react'

export default function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const links = [
    { id: 'work',     label: 'WORK' },
    { id: 'approach', label: 'APPROACH' },
    { id: 'cv',       label: 'CV' },
    { id: 'contact',  label: 'CONTACT' },
  ]
  const isDark = active === 'Approach'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        {links.map(l => (
          <button key={l.id} className={`nav-link ${active === l.label || active.toLowerCase() === l.id ? 'active' : ''}`}
            style={{ color: isDark ? 'rgba(255,255,255,0.55)' : undefined }}
            onClick={() => onNav(l.label)}>
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
