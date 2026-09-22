import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brandIcons } from '../data/brandIcons'

// A few official brand colors (NumPy, Django, GitHub) are so dark they'd be
// nearly invisible directly on this section's near-black background now that
// icons no longer sit inside a lighter tile. Mix those toward white so they
// stay legible while everything else keeps its real brand color.
function readableFill(hex) {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance >= 0.22) return `#${hex}`
  const mix = (c) => Math.round(c + (255 - c) * 0.72)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

// Renders an authentic brand mark from the simple-icons (or, for the rare
// icon it lacks, devicon) dataset.
function BrandIcon({ slug, size = 18 }) {
  const icon = brandIcons[slug]
  if (!icon) return null
  return (
    <svg width={size} height={size} viewBox={icon.viewBox || '0 0 24 24'} fill={readableFill(icon.hex)}>
      <path d={icon.path} />
    </svg>
  )
}

const getTechLogo = (name) => {
  const norm = name.toLowerCase().trim()

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
  // Order matters: these two are checked before the generic sql/database
  // match below, since both their skill labels contain "sql"/"database".
  if (norm.includes('text-to-sql')) {
    return (
      <svg className="w-[18px] h-[18px] text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <path d="M10 7h4m0 0l-2-2m2 2l-2 2" />
        <ellipse cx="17" cy="12" rx="4" ry="2" />
      </svg>
    )
  }
  if (norm.includes('vector') || norm.includes('chroma')) {
    return (
      <svg className="w-[18px] h-[18px] text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    )
  }
  if (norm.includes('python')) return <BrandIcon slug="python" />
  if (norm.includes('sql') || norm.includes('database')) return <BrandIcon slug="postgresql" />
  if (norm.includes('c/c++')) return <BrandIcon slug="cplusplus" />
  if (norm.includes('java') && !norm.includes('script')) {
    return (
      <svg className="w-[18px] h-[18px] text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 8h1a4 4 0 014 4v1a4 4 0 01-4 4h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 1v4M10 1v4M14 1v4" />
      </svg>
    )
  }
  if (norm.includes('html/css')) return <BrandIcon slug="html5" />
  if (norm.includes('pytorch')) return <BrandIcon slug="pytorch" />
  if (norm.includes('scikit-learn')) return <BrandIcon slug="scikitlearn" />
  if (norm.includes('opencv')) return <BrandIcon slug="opencv" />
  if (norm.includes('numpy')) return <BrandIcon slug="numpy" />
  if (norm.includes('scipy')) return <BrandIcon slug="scipy" />
  if (norm.includes('tensorflow')) return <BrandIcon slug="tensorflow" />
  if (norm.includes('langchain')) return <BrandIcon slug="langchain" />
  if (norm.includes('langgraph')) return <BrandIcon slug="langgraph" />
  if (norm.includes('fastapi')) return <BrandIcon slug="fastapi" />
  if (norm.includes('react')) return <BrandIcon slug="react" />
  if (norm.includes('vite')) return <BrandIcon slug="vite" />
  if (norm.includes('tailwind')) return <BrandIcon slug="tailwindcss" />
  if (norm.includes('flask')) return <BrandIcon slug="flask" />
  if (norm.includes('django')) return <BrandIcon slug="django" />
  if (norm.includes('node')) return <BrandIcon slug="nodedotjs" />
  if (norm.includes('git') && !norm.includes('hub')) return <BrandIcon slug="git" />
  if (norm.includes('github')) return <BrandIcon slug="github" />
  if (norm.includes('docker')) return <BrandIcon slug="docker" />
  if (norm.includes('vs code')) return <BrandIcon slug="vscode" />
  if (norm.includes('n8n')) return <BrandIcon slug="n8n" />

  return (
    <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
    </svg>
  )
}

// Each group's accentColor drives the hover glow for its tiles in the flat
// grid below; the groups themselves are no longer shown/labeled on screen.
const skillCategories = [
  {
    accentColor: '#3b82f6',
    skills: ['Python', 'JavaScript', 'SQL (PostgreSQL/MySQL)', 'C/C++', 'Java', 'HTML/CSS']
  },
  {
    accentColor: '#8b5cf6',
    skills: ['PyTorch', 'Scikit-Learn', 'OpenCV', 'NumPy', 'SciPy', 'TensorFlow']
  },
  {
    accentColor: '#10b981',
    skills: ['LangChain', 'LangGraph', 'Text-to-SQL', 'Vector Databases (ChromaDB)']
  },
  {
    accentColor: '#06b6d4',
    skills: ['FastAPI', 'React.js', 'Vite', 'Tailwind CSS', 'Flask', 'Django', 'Node.js']
  },
  {
    accentColor: '#f97316',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'n8n']
  }
]

// Flattened, de-duplicated skill list (each tile keeps its category's
// accent color for the hover glow, but categories aren't shown/grouped).
const flatSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({ skill, accentColor: cat.accentColor }))
)

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02
    }
  }
}

const tileVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function SkillsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section 
      className="w-full relative select-none overflow-hidden"
      style={{
        paddingTop: '100px',
        paddingBottom: '120px',
        background: 'transparent',
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

        {/* Flat logo wall: bare icons, no tile containers, tooltip on hover */}
        <motion.div
          className="grid gap-x-10 gap-y-12 w-full max-w-[1200px] mx-auto"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))' }}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {flatSkills.map(({ skill, accentColor }, idx) => {
            const isHovered = hoveredIdx === idx

            return (
              <motion.div
                key={`${skill}-${idx}`}
                variants={tileVariants}
                className="relative flex items-center justify-center aspect-square cursor-default"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  // Raised above sibling tiles on hover so the tooltip below
                  // isn't painted over by the next row.
                  zIndex: isHovered ? 30 : 1
                }}
                whileHover={{ scale: 1.15, y: -3 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    transform: 'scale(2.6)',
                    filter: isHovered ? `drop-shadow(0 0 10px ${accentColor}99)` : 'none',
                    transition: 'filter 0.3s ease'
                  }}
                >
                  {getTechLogo(skill)}
                </span>

                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md pointer-events-none z-10"
                      style={{
                        background: '#0d1320',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#e2e8f0'
                      }}
                    >
                      {skill}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
