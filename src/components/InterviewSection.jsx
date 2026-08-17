import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const materials = [
  {
    id: 'oops',
    cat: 'Placement Material . 01',
    title: 'Object-Oriented Programming',
    shortTitle: 'OOPS Field Manual',
    desc: 'Comprehensive placement interview manual covering OOP paradigms, four pillars, memory layouts, vtables, SOLID principles, design patterns, and 110+ placement Q&A.',
    tech: ['Java', 'C++', 'Python', 'SOLID Principles', 'Design Patterns'],
    fileUrl: '/interview/oop-placement-notebook.html',
    img: 'interview/oops.png'
  },
  {
    id: 'dbms',
    cat: 'Placement Material . 02',
    title: 'Database Management Systems',
    shortTitle: 'DBMS Notebook',
    desc: 'Complete database management system guide covering ER modeling, SQL query writing, normalization, ACID properties, transaction concurrency, index structures, and 150+ drill questions.',
    tech: ['SQL', 'Database Design', 'Transactions & ACID', 'Indexing & B+ Trees', 'Normalization'],
    fileUrl: '/interview/dbms-placement-notebook.html',
    img: 'interview/dbms.png'
  },
  {
    id: 'cn',
    cat: 'Placement Material . 03',
    title: 'Computer Networks',
    shortTitle: 'CN Notebook',
    desc: 'Deep-dive Computer Networks notebook covering the OSI and TCP/IP models, layer-by-layer protocols, physical layer, data link layer framing, subnetting arithmetic, routing, TCP/UDP transport, security, and 180+ interview Q&A.',
    tech: ['OSI Model', 'TCP/IP', 'Subnetting', 'Routing & IP', 'Network Security'],
    fileUrl: '/interview/computer-networks-interview-notebook.html',
    img: 'interview/cn.png'
  },
  {
    id: 'system_design',
    cat: 'Placement Material . 04',
    title: 'System Design',
    shortTitle: 'System Design Notebook',
    desc: 'Complete System Design notebook for placement interviews, featuring 23 sections, foundations, building blocks (scaling, caching, databases, sharding, CAP), high-level case studies (8 designs), low-level design, and 150+ interview Q&A.',
    tech: ['HLD & LLD', 'Scaling & Replicas', 'CAP & Consistency', 'Case Studies', 'LLD Patterns'],
    fileUrl: '/interview/system-design-notebook.html',
    img: 'interview/system_design.png'
  },
  {
    id: 'machine_learning',
    cat: 'Placement Material . 05',
    title: 'Machine Learning',
    shortTitle: 'Machine Learning Notebook',
    desc: 'Deep-dive Machine Learning notebook for placement interviews, featuring 25 sections, classical algorithms (regression, naive bayes, svm, trees), deep learning (cnn, rnn, transformers), derived mathematics, and 170+ interview Q&A.',
    tech: ['Supervised & Unsupervised', 'Derived Maths', 'Deep Learning', 'Transformers', 'Evaluation Metrics'],
    fileUrl: '/interview/Machine-Learning-Notebook.html',
    img: 'interview/machine learning.png'
  },
  {
    id: 'javascript',
    cat: 'Placement Material . 06',
    title: 'JavaScript',
    shortTitle: 'JavaScript Notebook',
    desc: 'Complete JavaScript notebook from variables and hoisting to async, event loops, promises, closures, prototypes, and backend Express.js APIs. Includes 155+ runnable code benches and 125+ interview Q&A.',
    tech: ['ES6+', 'Event Loop & Async', 'Closures & Scope', 'Prototypes', 'Express.js backend'],
    fileUrl: '/interview/javascript-notebook.html',
    img: 'interview/javascript.png'
  },
  {
    id: 'os',
    cat: 'Placement Material . 07',
    title: 'Operating Systems',
    shortTitle: 'OS Notebook',
    desc: 'Complete Operating Systems study notebook for placement interviews, featuring 13 chapters, processes, threads, CPU scheduling, synchronization, deadlocks, memory management, and 130+ Q&A.',
    tech: ['Process & IPC', 'CPU Scheduling', 'Deadlocks', 'Memory & Virtual Memory', 'File Systems'],
    fileUrl: '/interview/operating-systems-notebook.html',
    img: 'interview/os.png'
  },
  {
    id: 'dsa',
    cat: 'Placement Material . 08',
    title: 'Data Structures & Algorithms',
    shortTitle: 'DSA Field Guide',
    desc: 'Comprehensive collection of Data Structures and Algorithms interview preparation guides, split into core concepts, patterns, complexity analyses, and topic-wise walkthroughs.',
    tech: ['Searching & Sorting', 'Arrays & Lists', 'Trees & Graphs', 'Dynamic Programming', 'Complexity'],
    fileUrl: '',
    img: 'interview/dsa.png'
  },
  {
    id: 'react',
    cat: 'Placement Material . 09',
    title: 'React',
    shortTitle: 'React Notebook',
    desc: 'Complete React study notebook from scratch, covering fundamentals, rendering cycles, hooks, state lifting, refs, optimization, useReducer, Context, React 19 features, and 100+ interview Q&A.',
    tech: ['Hooks & State', 'Reconciliation', 'React 19', 'Optimization', 'Context API'],
    fileUrl: '/interview/react-from-scratch-notebook.html',
    img: 'interview/react.png'
  },
  {
    id: 'sql',
    cat: 'Placement Material . 10',
    title: 'SQL',
    shortTitle: 'SQL Notebook',
    desc: 'Complete SQL study notebook for placements, covering foundations, keys, constraints, normalization, indexes, joins, subqueries, CTEs, window functions, and 150+ interview Q&A.',
    tech: ['Queries & Joins', 'Window Functions', 'Constraints', 'Indexes & Query Tuning', 'CTE & Subqueries'],
    fileUrl: '/interview/sql-placement-notebook.html',
    img: 'interview/sql.png'
  },
  {
    id: 'backend_development',
    cat: 'Placement Material . 11',
    title: 'Backend Development',
    shortTitle: 'Backend Notebook',
    desc: 'Complete from-scratch backend engineering notebook covering HTTP, REST, databases, caching, auth, security (OWASP Top 10), queues, scaling, and 250+ Q&A.',
    tech: ['HTTP & REST', 'Database & Transactions', 'Caching & Redis', 'Auth & Security', 'Scaling & System Design'],
    fileUrl: '/interview/Backend-Development-Notebook.html',
    img: 'interview/backend-development.png'
  }
]

// Tactile 3D Material Card Component matching Projects section template
function MaterialCard({ m, i, onSelect }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  
  // Spring configurations for ultra-smooth 3D tracking
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 }
  
  // Card 3D tilt
  const rX = useMotionValue(0)
  const rY = useMotionValue(0)
  const rotateX = useSpring(rX, springConfig)
  const rotateY = useSpring(rY, springConfig)

  // Floating button magnetic springs
  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const mouseX = useSpring(btnX, springConfig)
  const mouseY = useSpring(btnY, springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Relative coordinate mapping
    const mouseXVal = e.clientX - rect.left - width / 2
    const mouseYVal = e.clientY - rect.top - height / 2
    
    // 3D Tilt calculation
    const targetRotateX = -(mouseYVal / (height / 2)) * 9
    const targetRotateY = (mouseXVal / (width / 2)) * 9
    
    rX.set(targetRotateX)
    rY.set(targetRotateY)

    // Button magnetic capsule pull
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'none' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'none',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(m)}
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
          {/* Viewport Container with translateZ perspective */}
          <div 
            className="project-card-image-wrapper"
            style={{ 
              borderRadius: '16px', 
              background: '#0e1620',
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
              src={m.img} 
              alt={m.title} 
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

            {/* Glassmorphic Floating Magnetic Pill CTA */}
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
                  Read Material <span style={{ fontSize: '10px' }}>↗</span>
                </span>
              </motion.div>
            </div>

          </div>

          {/* Content Details */}
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
              {m.cat}
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
              {m.title}
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
              {m.desc}
            </p>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div 
          style={{ 
            transform: 'translateZ(25px)',
            paddingLeft: '8px',
            paddingRight: '8px',
            marginTop: 'auto'
          }}
        >
          {/* Links Bar */}
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
                onSelect(m)
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
              Read Interactive Guide
            </span>
            
            <a 
              href={m.fileUrl} 
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
              Direct Link
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

export default function InterviewSection({ onSelectMaterial, onViewAll }) {
  const scrollRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCardStyle = () => {
    if (windowWidth < 640) {
      return { flex: '0 0 100%', maxWidth: '100%' }
    }
    if (windowWidth < 1024) {
      return { flex: '0 0 calc((100% - 24px) / 2)', maxWidth: 'calc((100% - 24px) / 2)' }
    }
    return { flex: '0 0 calc((100% - 48px) / 3)', maxWidth: 'calc((100% - 48px) / 3)' }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current
      // Scroll by approximately one card width plus gap (e.g. 360px)
      const cardWidth = 360
      const scrollTo = direction === 'left' 
        ? scrollLeft - cardWidth 
        : scrollLeft + cardWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

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
    <section 
      id="interview" 
      className="w-full px-8 select-none flex flex-col items-center justify-center relative" 
      style={{ background: '#f8f9fb', paddingTop: '60px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1080px] w-full flex flex-col items-center gap-12 relative">
        
        {/* Centered Editorial Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center gap-2.5"
        >
          <p className="text-[9px] font-mono font-bold tracking-[0.6em] uppercase pl-[0.6em]" style={{ color: '#86868b' }}>
            CAREER &amp; PLACEMENT RESOURCES
          </p>
          <div className="flex items-center justify-center gap-3 relative">
            {/* Centered custom wedge pointer */}
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4" style={{ color: '#1d1d1f' }} fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight" style={{ color: '#1d1d1f' }}>
              Placement Materials
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 font-sans mt-2 max-w-lg leading-relaxed font-normal">
            Curated CS core guides, field manuals, and interview preparation notebooks.
          </p>
        </motion.div>

        {/* Carousel Container with Arrows */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }} className="group w-full">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            style={{ 
              position: 'absolute',
              left: '-50px',
              zIndex: 20,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            className="hidden md:flex"
            aria-label="Scroll left"
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            style={{ 
              display: 'flex', 
              gap: '24px', 
              overflowX: 'auto', 
              scrollBehavior: 'smooth',
              width: '100%',
              padding: '12px 4px 20px 4px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            className="no-scrollbar"
          >
            {materials.map((m, i) => (
              <div 
                key={m.id} 
                style={getCardStyle()}
              >
                <MaterialCard m={m} i={i} onSelect={onSelectMaterial} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            style={{ 
              position: 'absolute',
              right: '-50px',
              zIndex: 20,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            className="hidden md:flex"
            aria-label="Scroll right"
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* View More Button */}
        <div style={{ marginTop: '12px' }}>
          <button 
            onClick={onViewAll}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#1d1d1f',
              border: 'none',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#6366f1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1d1d1f'; }}
          >
            View More Materials 
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
