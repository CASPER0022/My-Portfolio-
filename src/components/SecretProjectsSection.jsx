import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const projectMaterials = [
  {
    id: 'legalease_prep',
    cat: 'Project Prep . 01',
    title: 'LegalEase Codex',
    shortTitle: 'LegalEase Prep Guide',
    desc: 'Advanced technical reference and interview preparation guide for LegalEase, detailing retrieval-augmented generation architectures, semantic ingestion pipelines, context synthesis, and potential interview Q&A.',
    tech: ['FastAPI', 'LangChain', 'ChromaDB', 'BM25 Hybrid RAG', 'Evaluation'],
    fileUrl: '/interview/LegalEase-Interview-Codex.html',
    img: 'Projects/Legal ease/legalease.jpg'
  },
  {
    id: 'casper_prep',
    cat: 'Project Prep . 02',
    title: 'Casper Codex',
    shortTitle: 'Casper Prep Guide',
    desc: 'Deep-dive reference and interview preparation guide for Casper, covering stateful multi-agent topology, supervisor node routers, Sandboxed code execution, and LangGraph workflow orchestration.',
    tech: ['LangGraph', 'FastAPI', 'Python', 'OpenAI API', 'State Machines'],
    fileUrl: '/interview/Casper-2.0-Interview-Notebook.html',
    img: 'Projects/casper/casper.jpg'
  }
]

// Tactile 3D Card for Project Prep
function ProjectPrepCard({ p, i, onSelect }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 }
  
  const rX = useMotionValue(0)
  const rY = useMotionValue(0)
  const rotateX = useSpring(rX, springConfig)
  const rotateY = useSpring(rY, springConfig)

  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const mouseX = useSpring(btnX, springConfig)
  const mouseY = useSpring(btnY, springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseXVal = e.clientX - rect.left - width / 2
    const mouseYVal = e.clientY - rect.top - height / 2
    
    const targetRotateX = -(mouseYVal / (height / 2)) * 9
    const targetRotateY = (mouseXVal / (width / 2)) * 9
    
    rX.set(targetRotateX)
    rY.set(targetRotateY)

    const strength = 12
    const angle = Math.atan2(mouseYVal, mouseXVal)
    const dist = Math.min(strength, Math.sqrt(mouseXVal * mouseXVal + mouseYVal * mouseYVal) * 0.1)
    btnX.set(Math.cos(angle) * dist)
    btnY.set(Math.sin(angle) * dist)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    rX.set(0)
    rY.set(0)
    btnX.set(0)
    btnY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(p)}
      className="project-card-container hover-card-border-glow"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderRadius: '24px',
        background: '#ffffff',
        boxShadow: hovered 
          ? '0 30px 60px -15px rgba(0,0,0,0.12), 0 15px 30px -10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' 
          : '0 8px 24px -10px rgba(0,0,0,0.03), 0 4px 12px -8px rgba(0,0,0,0.01), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: hovered ? '1px solid rgba(0,0,0,0.12)' : '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        isolation: 'isolate'
      }}
      whileHover={{ 
        y: -10,
        scale: 1.025
      }}
    >
      <div style={{ transformStyle: 'preserve-3d', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
        <div>
          <div 
            className="project-card-image-wrapper"
            style={{ 
              borderRadius: '16px', 
              background: '#f1f5f9',
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <motion.img 
              src={p.img} 
              alt={p.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 1,
                pointerEvents: 'none',
                imageRendering: 'high-quality',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            <div 
              style={{ 
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                paddingBottom: '16px',
                pointerEvents: 'none',
                zIndex: 20,
                transform: 'translateZ(40px)'
              }}
            >
              <motion.div
                style={{ 
                  x: mouseX, 
                  y: mouseY,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                animate={{ 
                  opacity: hovered ? 1 : 0, 
                  y: hovered ? 0 : 12
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span 
                  style={{
                    fontSize: '9px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View Codex <span style={{ fontSize: '10px' }}>↗</span>
                </span>
              </motion.div>
            </div>
          </div>

          <div 
            className="project-card-details-wrapper"
            style={{ 
              transform: 'translateZ(15px)',
              textAlign: 'left'
            }}
          >
            <p 
              style={{
                fontSize: '8.5px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '8px',
                userSelect: 'none'
              }}
            >
              {p.cat}
            </p>
            <h3 
              className="project-card-title"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '800',
                color: '#0f1f4b',
                marginBottom: '10px',
                lineHeight: '1.2',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                userSelect: 'none'
              }}
            >
              {p.title}
            </h3>
            <p 
              className="project-card-desc"
              style={{
                lineHeight: '1.65',
                color: '#475569',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '400',
                marginBottom: '4px',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {p.desc}
            </p>
          </div>
        </div>

        <div 
          style={{ 
            transform: 'translateZ(25px)',
            paddingLeft: '8px',
            paddingRight: '8px',
            marginTop: 'auto'
          }}
        >
          <div 
            className="project-card-links-bar"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0',
              justifyContent: 'space-between'
            }}
          >
            <span 
              onClick={(e) => {
                e.stopPropagation()
                onSelect(p)
              }}
              style={{ 
                fontSize: '12px',
                fontWeight: '600',
                color: '#14497f',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
              </svg>
              Read Study Guide
            </span>
            
            <a 
              href={p.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                fontSize: '12px',
                fontWeight: '600',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0f1f4b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              Full Page
              <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SecretProjectsSection({ onSelectMaterial, onBack }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div
      style={{
        background: '#f8f9fb',
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '22px',
        paddingBottom: '100px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden'
      }}
    >
      <div 
        style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('luxury_topo_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="max-w-[1080px] w-full flex flex-col items-center gap-12 relative z-10 px-6">
        
        {/* Navigation / Back Bar */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <button 
            onClick={onBack}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#475569',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Return to Portfolio
          </button>
        </div>

        {/* Centered Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center gap-2.5"
        >
          <p className="text-[9px] font-mono font-bold tracking-[0.6em] uppercase pl-[0.6em]" style={{ color: '#6366f1' }}>
            INTERNAL ARCHIVE
          </p>
          <div className="flex items-center justify-center gap-3 relative">
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4" style={{ color: '#1d1d1f' }} fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight" style={{ color: '#1d1d1f' }}>
              Project Prep Guides
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 font-sans mt-2 max-w-lg leading-relaxed font-normal">
            Private reference manuals and system design codex for internal portfolio projects.
          </p>
        </motion.div>

        {/* Project Prep Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectMaterials.map((p, i) => (
            <ProjectPrepCard key={p.id} p={p} i={i} onSelect={onSelectMaterial} />
          ))}
        </motion.div>

      </div>
    </div>
  )
}
