import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const [heartScale, setHeartScale] = useState(1)
  const [hoveredSocialFooter, setHoveredSocialFooter] = useState(null)

  useEffect(() => {
    // A fun beating heart micro-animation
    const interval = setInterval(() => {
      setHeartScale(1.2)
      setTimeout(() => setHeartScale(1), 150)
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkStyle = (name) => {
    const isHovered = hoveredLink === name
    return {
      fontSize: '13.5px',
      color: isHovered ? '#6366f1' : '#9ca3af',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      transform: isHovered ? 'translateX(4px)' : 'none',
      display: 'inline-block',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: '500',
      textAlign: 'left'
    }
  }

  return (
    <footer 
      style={{
        background: '#0a0c14',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '56px',
        paddingBottom: '40px',
        width: '100%',
        color: '#ffffff',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Soft dark glowing atmosphere */}
      <div className="absolute -top-40 right-1/4 w-[400px] h-[400px] bg-indigo-650/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main content grid */}
      <div 
        style={{
          maxWidth: '1080px',
          width: '100%',
          paddingLeft: 'max(24px, 4vw)',
          paddingRight: 'max(24px, 4vw)',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          alignItems: 'start',
          zIndex: 10
        }}
      >
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <h3 
            style={{
              fontSize: '24px',
              fontWeight: '900',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Albin John
          </h3>
          <h4 
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#6366f1',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 'bold',
              margin: 0
            }}
          >
            Building the future with AI & Backend Systems
          </h4>
          <p 
            style={{
              fontSize: '13.5px',
              color: '#9ca3af',
              lineHeight: '1.6',
              margin: 0,
              fontWeight: '400',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Building the future one line of code at a time. Always learning, always creating.
          </p>
        </div>

        {/* Quick Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <h5 
            style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: 0,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '8px'
            }}
          >
            Quick Links
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'landing', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'work', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a 
                key={link.id}
                onClick={() => handleScroll(link.id)}
                style={linkStyle(link.label)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Connect & Views Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <h5 
            style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: 0,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '8px'
            }}
          >
            Connect
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a 
              href="mailto:albinjohn2427@gmail.com"
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                color: '#6366f1',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                wordBreak: 'break-all'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
            >
              albinjohn2427@gmail.com
            </a>

            {/* Social media icons below email */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', marginBottom: '4px', alignItems: 'center' }}>
              {[
                {
                  key: 'github',
                  url: 'https://github.com/CASPER0022/',
                  icon: (
                    <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                  color: '#ffffff',
                  hoverBg: 'rgba(255, 255, 255, 0.08)'
                },
                {
                  key: 'linkedin',
                  url: 'https://www.linkedin.com/in/albin-john-/',
                  icon: (
                    <svg style={{ width: '13px', height: '13px' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  color: '#0a66c2',
                  hoverBg: 'rgba(10, 102, 194, 0.15)'
                },
                {
                  key: 'instagram',
                  url: 'https://www.instagram.com/albin_joh_n/',
                  icon: (
                    <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  color: '#e1306c',
                  hoverBg: 'rgba(225, 48, 108, 0.15)'
                },
                {
                  key: 'leetcode',
                  url: 'https://leetcode.com/u/casper22/',
                  icon: (
                    <img src="/leetcode_logo.png" alt="LeetCode" style={{ width: '13px', height: '13px', objectFit: 'contain' }} />
                  ),
                  color: '#ffa116',
                  hoverBg: 'rgba(255, 161, 22, 0.15)'
                }
              ].map((item) => {
                const isHovered = hoveredSocialFooter === item.key
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: isHovered ? item.hoverBg : 'rgba(255, 255, 255, 0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? item.color : '#9ca3af',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredSocialFooter(item.key)}
                    onMouseLeave={() => setHoveredSocialFooter(null)}
                  >
                    {item.icon}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div 
        style={{
          maxWidth: '1080px',
          width: 'calc(100% - 2 * max(24px, 4vw))',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          marginTop: '60px',
          marginBottom: '30px',
          zIndex: 10
        }}
      />

      {/* Footer Bottom copyright and author tags */}
      <div 
        style={{
          maxWidth: '1080px',
          width: '100%',
          paddingLeft: 'max(24px, 4vw)',
          paddingRight: 'max(24px, 4vw)',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '11.5px',
          fontFamily: 'monospace',
          color: '#6b7280',
          zIndex: 10
        }}
      >
        <span>
          &copy; 2026 Albin John. All rights reserved.
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Made with 
          <span 
            style={{ 
              color: '#ef4444', 
              display: 'inline-block', 
              transform: `scale(${heartScale})`,
              transition: 'transform 0.15s ease'
            }}
          >
            ❤️
          </span> 
          by Albin John
        </span>
      </div>
    </footer>
  )
}
