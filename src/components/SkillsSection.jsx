import React, { useState } from 'react'
import { motion } from 'framer-motion'

const getTechLogo = (name) => {
  const norm = name.toLowerCase().trim()
  
  if (norm.includes('python')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18c.9 0 1.66.76 1.66 1.66v2.91h-3.32v.83h3.32v2.91c0 .9-.76 1.66-1.66 1.66H9.27c-.9 0-1.66-.76-1.66-1.66V5.58c0-.9.76-1.66 1.66-1.66h4.98zm-4.98 12c-.9 0-1.66-.76-1.66-1.66V7.61h3.32v-.83H9.27c-.9 0-1.66-.76-1.66-1.66V2.21c0-.9.76-1.66 1.66-1.66h4.98c.9 0 1.66.76 1.66 1.66v2.91h-4.98z" />
      </svg>
    )
  }
  if (norm.includes('javascript')) {
    return (
      <span className="text-[10px] font-extrabold bg-[#f7df1e] text-black px-1 rounded-[3px] leading-none select-none font-sans">JS</span>
    )
  }
  if (norm.includes('typescript')) {
    return (
      <span className="text-[10px] font-extrabold bg-[#3178c6] text-white px-1 rounded-[3px] leading-none select-none font-sans">TS</span>
    )
  }
  if (norm.includes('sql') || norm.includes('database')) {
    return (
      <svg className="w-[18px] h-[18px] text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    )
  }
  if (norm.includes('c/c++')) {
    return (
      <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/45 px-1 py-0.5 rounded border border-blue-400/20 leading-none select-none">C++</span>
    )
  }
  if (norm.includes('java') && !norm.includes('script')) {
    return (
      <svg className="w-[18px] h-[18px] text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 8h1a4 4 0 014 4v1a4 4 0 01-4 4h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 1v4M10 1v4M14 1v4" />
      </svg>
    )
  }
  if (norm.includes('html/css')) {
    return (
      <svg className="w-[18px] h-[18px] text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22l8-4V5l-8-3-8 3v13l8 4z" />
      </svg>
    )
  }
  if (norm.includes('pytorch')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#ee4c2c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2C8 6 4 10 4 14a8 8 0 0016 0c0-4-4-8-8-12z" />
      </svg>
    )
  }
  if (norm.includes('scikit-learn')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#f7931e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 6l6 6M12 12l6 6" />
      </svg>
    )
  }
  if (norm.includes('opencv')) {
    return (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
        <circle cx="12" cy="7" r="4" stroke="#ff0000" />
        <circle cx="7" cy="16" r="4" stroke="#00ff00" />
        <circle cx="17" cy="16" r="4" stroke="#0000ff" />
      </svg>
    )
  }
  if (norm.includes('numpy')) {
    return (
      <svg className="w-[18px] h-[18px] text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
        <path d="M2 7v10M22 7v10M12 12v10" />
      </svg>
    )
  }
  if (norm.includes('scipy')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#1a5b8c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />
      </svg>
    )
  }
  if (norm.includes('tensorflow')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#ff9200]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zM12 2v18" />
      </svg>
    )
  }
  if (norm.includes('langchain')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    )
  }
  if (norm.includes('langgraph')) {
    return (
      <svg className="w-[18px] h-[18px] text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="19" cy="5" r="2.5" />
        <circle cx="12" cy="19" r="2.5" />
        <path d="M5 7.5L12 16.5M19 7.5L12 16.5" />
      </svg>
    )
  }
  if (norm.includes('text-to-sql')) {
    return (
      <svg className="w-[18px] h-[18px] text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <path d="M10 7h4m0 0l-2-2m2 2l-2 2" />
        <ellipse cx="17" cy="12" rx="4" ry="2" />
      </svg>
    )
  }
  if (norm.includes('fastapi')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#009688]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  }
  if (norm.includes('react')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#61dafb] animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse rx="10" ry="4.5" transform="rotate(0)" />
        <ellipse rx="10" ry="4.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4.5" transform="rotate(120)" />
        <circle r="2" fill="currentColor" />
      </svg>
    )
  }
  if (norm.includes('vite')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#bd34fe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L3.5 12h7l-1.5 10 8.5-10h-7L12 2z" />
      </svg>
    )
  }
  if (norm.includes('tailwind')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#38bdf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3c-1.2 0-2.4.6-3.6 1.8L3 10.2A3 3 0 003 14.4l4.2 4.2a3 3 0 004.2 0l5.4-5.4A3 3 0 0016.8 9l-4.2-4.2A3 3 0 0012 3z" />
        <path d="M19 12c-1.2 0-2.4.6-3.6 1.8l-5.4 5.4a3 3 0 01-4.2 0l-.8-.8a3 3 0 010-4.2l5.4-5.4" />
      </svg>
    )
  }
  if (norm.includes('flask')) {
    return (
      <svg className="w-[18px] h-[18px] text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 3h6M10 3v4L4 18a2 2 0 002 2h12a2 2 0 002-2L14 7V3" />
      </svg>
    )
  }
  if (norm.includes('django')) {
    return (
      <span className="text-[9px] font-extrabold bg-[#092e20] text-white px-1 py-0.5 rounded leading-none select-none font-sans">dj</span>
    )
  }
  if (norm.includes('node')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#339933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
  if (norm.includes('git') && !norm.includes('hub')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#f05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6M9 9l6 6" />
      </svg>
    )
  }
  if (norm.includes('github')) {
    return (
      <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )
  }
  if (norm.includes('docker')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#2496ed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="10" width="20" height="8" rx="2" />
        <rect x="6" y="6" width="3" height="3" />
        <rect x="10" y="6" width="3" height="3" />
        <rect x="14" y="6" width="3" height="3" />
      </svg>
    )
  }
  if (norm.includes('vs code')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#007acc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2l10 5v10l-10 5-10-5v-10z" />
        <path d="M12 22V2M2 7l20 10M2 17l20-10" />
      </svg>
    )
  }
  if (norm.includes('n8n')) {
    return (
      <svg className="w-[18px] h-[18px] text-[#f95738]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
      </svg>
    )
  }
  return (
    <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
    </svg>
  )
}

const skillCategories = [
  {
    title: 'Languages',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accentColor: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.15)',
    skills: ['Python', 'JavaScript', 'SQL (PostgreSQL/MySQL)', 'C/C++', 'Java', 'HTML/CSS']
  },
  {
    title: 'AI/ML & CV',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.15)',
    skills: ['PyTorch', 'Scikit-Learn', 'OpenCV', 'NumPy', 'SciPy', 'TensorFlow']
  },
  {
    title: 'LLM & GenAI',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096a.402.402 0 00-.332-.332L2.76 14.76a.402.402 0 010-.765l5.096-.813a.402.402 0 00.332-.332L9 7.76l.813 5.096a.402.402 0 00.332.332l5.096.813a.402.402 0 010 .765l-5.096.813a.402.402 0 00-.332.332zM19.07 4.93l-.235 1.47a.2.2 0 01-.39 0l-.235-1.47a.2.2 0 00-.166-.166L16.574 4.53a.2.2 0 010-.39l1.47-.235a.2.2 0 00.166-.166L18.445 2.27a.2.2 0 01.39 0l.235 1.47a.2.2 0 00.166.166l1.47.235a.2.2 0 010 .39l-1.47.235a.2.2 0 00-.166.166z" />
      </svg>
    ),
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.15)',
    skills: ['LangChain', 'LangGraph', 'Text-to-SQL', 'Vector Databases (ChromaDB)']
  },
  {
    title: 'Web Frameworks',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.15)',
    skills: ['FastAPI', 'React.js', 'Vite', 'Tailwind CSS', 'Flask', 'Django', 'Node.js']
  },
  {
    title: 'Developer Tools',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 0020.25 18l-5.83-5.83M11.42 15.17l2.42-2.42M11.42 15.17L6 10.25M13.84 12.75l2.42-2.42m0 0l-5.83-5.83a2.67 2.67 0 00-3 3l5.83 5.83m0 0L10.25 6" />
      </svg>
    ),
    accentColor: '#f97316',
    accentGlow: 'rgba(249, 115, 22, 0.15)',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'n8n']
  }
]

export default function SkillsSection() {
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null)
  const [hoveredTag, setHoveredTag] = useState(null)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <section 
      className="w-full relative select-none overflow-hidden"
      style={{
        paddingTop: '100px',
        paddingBottom: '120px',
        background: '#0a0c14',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating abstract glowing orbs */}
      <div className="absolute top-1/4 -right-48 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div 
        className="w-full relative z-10"
        style={{
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'max(24px, 6vw)',
          paddingRight: 'max(24px, 6vw)',
          boxSizing: 'border-box'
        }}
      >
        {/* Perfectly Centered Editorial Header */}
        <div 
          className="text-center flex flex-col items-center justify-center"
          style={{
            marginBottom: '80px',
            width: '100%'
          }}
        >
          <div className="flex flex-col items-center mb-2">
            <span 
              className="text-[10px] font-mono font-bold tracking-[0.40em] uppercase pl-[0.40em]"
              style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#3b82f6',
                padding: '6px 14px',
                borderRadius: '100px'
              }}
            >
              Technical Expertise
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-5xl md:text-[56px] text-white tracking-tight leading-none mt-4">
            Skills & Technologies
          </h2>
          <p className="text-[14px] text-gray-400 font-sans mt-4 max-w-lg leading-relaxed font-normal">
            Technologies I work with to build modern, production-grade applications.
          </p>
        </div>

        {/* 5-Card responsive balanced grid layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1200px] mx-auto justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {skillCategories.map((cat, idx) => {
            const isHovered = hoveredCardIdx === idx
            
            return (
              <motion.div
                key={cat.title}
                variants={cardVariants}
                className="relative w-full max-w-[400px] mx-auto"
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isHovered 
                    ? `1px solid ${cat.accentColor}40` 
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: isHovered
                    ? `0 20px 40px ${cat.accentColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`
                    : '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.02)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
                whileHover={{ y: -6 }}
              >
                {/* Accent line indicator on top of cards */}
                <div 
                  className="absolute top-0 inset-x-0 h-[3px] rounded-t-full transition-opacity duration-300"
                  style={{
                    background: cat.accentColor,
                    opacity: isHovered ? 1 : 0.4
                  }}
                />

                {/* Header: Icon Container + Category Title */}
                <div className="flex items-center gap-4">
                  <div 
                    className="p-3 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHovered ? `${cat.accentColor}15` : 'rgba(255, 255, 255, 0.03)',
                      border: isHovered ? `1px solid ${cat.accentColor}30` : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isHovered ? cat.accentColor : 'rgba(255, 255, 255, 0.85)'
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white tracking-wide uppercase">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills wrap list */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {cat.skills.map((skill) => {
                    const tagKey = `${cat.title}-${skill}`
                    const isTagHovered = hoveredTag === tagKey

                    return (
                      <div
                        key={skill}
                        onMouseEnter={() => setHoveredTag(tagKey)}
                        onMouseLeave={() => setHoveredTag(null)}
                        className="inline-flex items-center gap-3 text-[15px] font-sans font-bold tracking-wide px-5 py-3 rounded-xl cursor-default select-none transition-all duration-200"
                        style={{
                          background: isTagHovered 
                            ? `${cat.accentColor}18` 
                            : 'rgba(255, 255, 255, 0.02)',
                          border: isTagHovered
                            ? `1px solid ${cat.accentColor}`
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isTagHovered ? '#ffffff' : '#cbd5e1',
                          transform: isTagHovered ? 'translateY(-2px) scale(1.04)' : 'none',
                          boxShadow: isTagHovered 
                            ? `0 8px 20px ${cat.accentColor}15`
                            : 'none'
                        }}
                      >
                        <span className="flex items-center justify-center transition-transform duration-200">
                          {getTechLogo(skill)}
                        </span>
                        <span>{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
