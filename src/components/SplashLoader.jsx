import React, { useState, useEffect } from 'react'

export default function SplashLoader({ onDone }) {
  const [phase, setPhase] = useState('name') // name → line → fade

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('line'), 1200)
    const t2 = setTimeout(() => setPhase('fade'), 2400)
    const t3 = setTimeout(() => onDone(), 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: '#081C4D',
        opacity: phase === 'fade' ? 0 : 1,
        transition: 'opacity 0.9s ease',
        pointerEvents: phase === 'fade' ? 'none' : 'all'
      }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      <h1 className="splash-name" style={{ position: 'relative', zIndex: 1 }}>
        ALBIN
      </h1>
      {phase !== 'name' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
            animation: 'fadeUp 0.6s ease forwards',
            opacity: 0
          }}
        >
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.25)',
              animation: 'lineReveal 0.8s ease forwards'
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'JetBrains Mono,monospace',
              textTransform: 'uppercase'
            }}
          >
            AI · FULLSTACK · ENGINEER
          </span>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.25)',
              animation: 'lineReveal 0.8s ease forwards'
            }}
          />
        </div>
      )}
    </div>
  )
}
