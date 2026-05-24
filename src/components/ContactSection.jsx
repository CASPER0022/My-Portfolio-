import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const [focusedField, setFocusedField] = useState(null)
  const [btnHovered, setBtnHovered] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormState({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 4500)
    }, 1800)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('nakulkrishnakumar86@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)'
    ctx.lineWidth = 2
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

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '750',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    textAlign: 'left',
    display: 'block'
  }

  const inputStyle = (fieldName) => {
    const isFocused = focusedField === fieldName
    return {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '12px',
      border: isFocused ? '1.5px solid #6366f1' : '1.5px solid rgba(0, 0, 0, 0.12)',
      background: isFocused ? '#ffffff' : '#f9fafb',
      fontSize: '14px',
      color: '#1f2937',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: isFocused ? '0 0 0 4px rgba(99, 102, 241, 0.08)' : 'none',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0
    }
  }

  const rightCardStyle = {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '28px 32px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.015), 0 2px 8px rgba(0, 0, 0, 0.005)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
    textAlign: 'left',
    width: '100%'
  }

  const socialRowStyle = (key, hoveredColor, activeBg) => {
    const isHovered = hoveredSocial === key
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '14px',
      border: isHovered ? `1px solid ${hoveredColor}` : '1px solid rgba(0, 0, 0, 0.06)',
      background: isHovered ? activeBg : '#f9fafb',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: isHovered ? 'translateY(-2px)' : 'none',
      boxShadow: isHovered ? '0 6px 16px rgba(0, 0, 0, 0.02)' : 'none',
      boxSizing: 'border-box',
      cursor: 'pointer'
    }
  }

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen py-24 overflow-hidden flex flex-col justify-center bg-[#fafafb] select-none"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Interactive Drawing Canvas */}
      <canvas 
        ref={canvasRef} 
        id="draw-canvas"
        onMouseDown={startDraw} 
        onMouseMove={draw} 
        onMouseUp={stopDraw} 
        onMouseLeave={stopDraw}
        onDoubleClick={clearCanvas}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ zIndex: 1 }} 
      />

      {/* Futuristic Glowing Orbs */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Stickers */}
      <div className="absolute inset-0 pointer-events-none z-10 select-none">
        {stickers.map((s, i) => (
          <div key={i} className="sticker absolute select-none"
            style={{
              top: s.top, left: s.left, right: s.right,
              '--rot': s.rot,
              animationDelay: s.delay,
              width: '90px'
            }}>
            <div className="rounded-xl p-2.5 text-center shadow-sm border border-black/5"
              style={{ background: s.bg, color: s.dark ? '#fff' : '#333', fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Container Wrapper */}
      <div 
        className="relative z-20 w-full flex flex-col gap-12 mx-auto pointer-events-none"
        style={{ maxWidth: '1080px', paddingLeft: 'max(24px, 4vw)', paddingRight: 'max(24px, 4vw)', boxSizing: 'border-box' }}
      >
        
        {/* Perfectly Centered Elegant Header */}
        <div className="text-center flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="flex flex-col items-center mb-1 select-none">
            <span 
              className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase pl-[0.45em]"
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: '#6366f1',
                padding: '6px 14px',
                borderRadius: '100px'
              }}
            >
              LET'S COLLABORATE
            </span>
          </div>
          <h2 
            className="font-display font-extrabold tracking-tight text-gray-900"
            style={{ fontSize: 'min(44px, 9vw)', fontWeight: '900', color: '#111827', margin: '8px 0 0 0', border: 'none' }}
          >
            Let's Connect
          </h2>
          <p 
            className="font-sans text-gray-500 font-medium"
            style={{ fontSize: '14.5px', maxWidth: '480px', lineHeight: '1.6', marginTop: '8px', marginHorizontal: 'auto' }}
          >
            Fusing innovative ideas with robust engineering. Drop me a line, and let's craft something remarkable together.
          </p>
        </div>

        {/* Form and Stack Grid (Responsive columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left Column: Form Card with Full Inline Styles */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-7 pointer-events-auto"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.01)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}
          >
            <div>
              <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight" style={{ margin: 0 }}>
                Send a Message
              </h3>
            </div>

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* Name */}
              <div className="flex flex-col text-left">
                <label style={labelStyle}>Name *</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  style={inputStyle('name')}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col text-left">
                <label style={labelStyle}>Email *</label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  style={inputStyle('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col text-left w-full">
              <label style={labelStyle}>Subject</label>
              <input 
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                style={inputStyle('subject')}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col text-left w-full">
              <label style={labelStyle}>Message *</label>
              <textarea 
                name="message"
                required
                rows="5"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, idea, or just say hello..."
                style={{ ...inputStyle('message'), resize: 'none', height: '140px' }}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '12px',
                background: btnHovered ? '#4f46e5' : '#6366f1',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '800',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                border: 'none',
                outline: 'none',
                boxShadow: btnHovered ? '0 12px 30px rgba(99, 102, 241, 0.35)' : '0 8px 20px rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: btnHovered ? 'translateY(-2px)' : 'none',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              {isSubmitting ? (
                <span>SENDING MESSAGE...</span>
              ) : submitSuccess ? (
                <span className="text-emerald-300 flex items-center gap-2">
                  MESSAGE SENT SUCCESSFULLY! ✓
                </span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>SEND MESSAGE</span>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: btnHovered ? 'translateX(2px) translateY(-1px)' : 'none', transition: 'transform 0.3s ease' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Right Column: Stack of Info Cards with Full Inline Styles */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full pointer-events-auto">
            
            {/* Box 1: Contact Information */}
            <div style={rightCardStyle}>
              <h4 className="font-sans font-extrabold text-lg text-gray-900 tracking-tight uppercase" style={{ margin: 0 }}>
                Contact Information
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                {/* Email Info */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e0e7ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center', color: '#4f46e5', flexShrink: 0 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontSize: '10px', fontMono: 'true', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Email Address</span>
                      <a href="mailto:nakulkrishnakumar86@gmail.com" style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none', wordBreak: 'break-all' }}>
                        nakulkrishnakumar86@gmail.com
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={copyEmail}
                    style={{
                      flexShrink: 0,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      background: '#f9fafb',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: '#4b5563',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e0e7ff'; e.currentTarget.style.color = '#4f46e5'; e.currentTarget.style.borderColor = '#c7d2fe'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>

                {/* Location Info */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', width: '100%' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', flexShrink: 0 }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: '10px', fontMono: 'true', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Location</span>
                    <span style={{ fontSize: '13px', fontSans: 'true', fontWeight: 'bold', color: '#1f2937' }}>
                      India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Connect With Me Social Rows */}
            <div style={rightCardStyle}>
              <h4 className="font-sans font-extrabold text-lg text-gray-900 tracking-tight uppercase" style={{ margin: 0 }}>
                Connect With Me
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px', width: '100%' }}>
                {[
                  {
                    key: 'github',
                    name: 'GitHub',
                    desc: 'Check out my projects',
                    url: 'https://github.com/AlbinJohn',
                    color: '#111827',
                    bg: 'rgba(17, 24, 39, 0.05)',
                    icon: (
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    )
                  },
                  {
                    key: 'linkedin',
                    name: 'LinkedIn',
                    desc: 'Connect professionally',
                    url: 'https://linkedin.com/in/AlbinJohn',
                    color: '#0a66c2',
                    bg: 'rgba(10, 102, 194, 0.05)',
                    icon: (
                      <svg className="w-4 h-4 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    )
                  },
                  {
                    key: 'discord',
                    name: 'Discord',
                    desc: 'Chat with me',
                    url: 'https://discord.com',
                    color: '#5865f2',
                    bg: 'rgba(88, 101, 242, 0.05)',
                    icon: (
                      <svg className="w-4 h-4 text-[#5865f2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a 
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={socialRowStyle(social.key, social.color, social.bg)}
                    onMouseEnter={() => setHoveredSocial(social.key)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                        {social.icon}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#1f2937', lineHeight: '1.2' }}>{social.name}</span>
                        <span style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'system-ui, -apple-system, sans-serif', marginTop: '2px', lineHeight: '1' }}>{social.desc}</span>
                      </div>
                    </div>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ color: hoveredSocial === social.key ? social.color : '#cbd5e1', transform: hoveredSocial === social.key ? 'translateX(2px)' : 'none', transition: 'all 0.3s ease' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Box 3: Currently Available Pulsing Card */}
            <div style={rightCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ position: 'relative', display: 'flex', width: '12px', height: '12px' }}>
                  <span style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '9999px', background: '#34d399', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
                  <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px', borderRadius: '9999px', background: '#10b981' }}></span>
                </span>
                <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '850', fontSize: '11px', color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Currently Available
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#6b7280', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6', margin: '4px 0 0 0', fontWeight: '500' }}>
                Open for freelance projects, internships, and collaboration opportunities. Let's build something amazing together!
              </p>
            </div>

          </div>

        </div>

        {/* Instructions */}
        <div style={{ marginTop: '12px', width: '100%', textAlign: 'center', fontSize: '10.5px', fontModel: 'true', fontFamily: 'monospace', letterSpacing: '0.12em', color: '#9ca3af', textTransform: 'uppercase' }}>
          Move your cursor to leave a mark · Double-click to clear canvas
        </div>

      </div>
    </section>
  )
}
