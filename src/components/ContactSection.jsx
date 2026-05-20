import React, { useEffect, useRef } from 'react'

const stickers = [
  { label: '01 MUMO', bg: '#f5c5c5', rot: '-8deg', top: '8%', left: '3%', delay: '0s' },
  { label: '06 BUKHOORIE', bg: '#5a3e28', rot: '-3deg', top: '28%', left: '2%', delay: '0.6s', dark: true },
  { label: '04 PORTAPALM', bg: '#d4c9a8', rot: '4deg', top: '50%', left: '1%', delay: '1.2s' },
  { label: '$ BLACKFOREST', bg: '#1a3a1a', rot: '-6deg', top: '72%', left: '3%', delay: '0.3s', dark: true },
  { label: '02 CASCADER', bg: '#c8d8e8', rot: '5deg', top: '88%', left: '2%', delay: '0.9s' },
  { label: '03 VERSA GRIP', bg: '#c8a860', rot: '6deg', top: '8%', right: '3%', delay: '0.4s' },
  { label: 'CONCEPT LIBRARY', bg: '#e85020', rot: '-4deg', top: '30%', right: '1%', delay: '1s', dark: true },
  { label: '05 MYCROCHET', bg: '#8b5e3c', rot: '8deg', top: '52%', right: '2%', delay: '0.7s', dark: true },
  { label: '02 CASCADER.', bg: '#ddeeff', rot: '-7deg', top: '74%', right: '3%', delay: '0.2s' },
  { label: '$ DIGITAL', bg: '#1a3a1a', rot: '3deg', top: '90%', right: '2%', delay: '1.4s', dark: true },
]

export default function ContactSection() {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const lastPos = useRef(null)

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const resize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const startDraw = (e) => {
    drawing.current = true
    lastPos.current = getPos(e, canvasRef.current)
  }

  const draw = (e) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = 'rgba(100,100,100,0.35)'
    ctx.lineWidth = 1.5
    ctx.lineCap = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = () => {
    drawing.current = false
    lastPos.current = null
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <section id="contact" className="relative w-full min-h-screen py-32 overflow-hidden flex flex-col justify-center" style={{ background: 'transparent' }}>
      {/* Drawing canvas */}
      <canvas ref={canvasRef} id="draw-canvas"
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
        onDoubleClick={clearCanvas}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* Floating stickers */}
      {stickers.map((s, i) => (
        <div key={i} className="sticker absolute select-none z-10"
          style={{
            top: s.top, left: s.left, right: s.right,
            '--rot': s.rot,
            animationDelay: s.delay,
            width: '90px'
          }}>
          <div className="rounded-lg p-2 text-center shadow-lg"
            style={{ background: s.bg, color: s.dark ? '#fff' : '#333', fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.3 }}>
            {s.label}
          </div>
        </div>
      ))}

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 font-sans">Kochi, Kerala, India</p>
        <h2 className="font-display font-bold text-5xl md:text-7xl text-gray-900 mb-10" style={{ letterSpacing: '-0.02em' }}>
          Let's Connect
        </h2>

        {/* Email & Phone envelope block */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-48 h-32 mb-6 mx-auto flex items-center justify-center" style={{ background: '#ffffff', borderRadius: '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(8,28,77,0.06)' }}>
            <svg viewBox="0 0 120 80" className="w-24" fill="none">
              <rect x="4" y="4" width="112" height="72" rx="12" fill="#fafafa" stroke="rgba(8,28,77,0.08)" strokeWidth="1.5"/>
              <path d="M4 4 L60 46 L116 4" stroke="rgba(8,28,77,0.12)" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          
          <div className="flex flex-col gap-2.5 items-center">
            <a href="mailto:albinjohn2427@gmail.com"
              className="pointer-events-auto inline-flex items-center gap-3 bg-gray-900 text-white text-xs font-mono font-medium px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
              albinjohn2427@gmail.com
              <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[8px]">↗</span>
            </a>
            
            <a href="tel:+919392690212" className="pointer-events-auto text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors">
              +91 9392690212
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {[
            { label: 'GitHub', url: 'https://github.com/albin' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/albin' }
          ].map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              className="pointer-events-auto px-5 py-2 rounded-full border border-gray-200/80 bg-white/80 text-xs font-mono font-semibold text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors shadow-sm">
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-12 text-xs tracking-widest text-gray-400 uppercase pointer-events-none">
          Move your cursor to leave a mark · Double-click to clear
        </p>
      </div>
    </section>
  )
}
