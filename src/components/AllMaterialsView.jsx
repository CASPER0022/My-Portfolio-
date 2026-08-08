import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const materials = [
  {
    id: 'oops',
    cat: 'Placement Material . 01',
    title: 'Object-Oriented Programming',
    shortTitle: 'OOPS Field Manual',
    desc: 'Comprehensive placement interview manual covering OOP paradigms, four pillars, memory layouts, vtables, SOLID principles, design patterns, and 110+ placement Q&A.',
    tech: ['Java', 'C++', 'Python', 'SOLID Principles', 'Design Patterns'],
    fileUrl: '/interview/OOP-Field-Manual.html',
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
  }
]

export default function AllMaterialsView({ onSelectMaterial, onBack }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getGridStyle = () => {
    if (windowWidth < 640) {
      return { display: 'grid', gridTemplateColumns: '1fr', gap: '24px', width: '100%' }
    }
    if (windowWidth < 1024) {
      return { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%' }
    }
    return { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', width: '100%' }
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
            STUDY GUIDES &amp; MANUALS
          </p>
          <div className="flex items-center justify-center gap-3 relative">
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4" style={{ color: '#1d1d1f' }} fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight" style={{ color: '#1d1d1f' }}>
              All Placement Materials
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 font-sans mt-2 max-w-lg leading-relaxed font-normal">
            Complete curriculum notebooks, field manuals, and theory reference sets.
          </p>
        </motion.div>

        {/* Materials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={getGridStyle()}
        >
          {materials.map((m, i) => {
            return (
              <div 
                key={m.id}
                onClick={() => onSelectMaterial(m)}
                className="project-card-container hover-card-border-glow"
                style={{
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px -10px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  boxSizing: 'border-box',
                  position: 'relative'
                }}
              >
                <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#0e1620', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                  <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ textAlign: 'left', marginTop: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '8.5px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {m.cat}
                  </p>
                  <h3 style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '800', color: '#0f1f4b', fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.65', marginBottom: '16px', flexGrow: 1 }}>
                    {m.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {m.tech.map(t => (
                      <span key={t} style={{ fontSize: '10px', fontFamily: 'monospace', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#14497f', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Read Interactive Guide
                    </span>
                    <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textDecoration: 'none' }}>
                      Direct Link ↗
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}
