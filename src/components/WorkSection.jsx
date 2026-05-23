import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const projects = [
  {
    id: 1,
    cat: 'CAT. 01',
    title: 'LegalEase',
    desc: 'An AI-powered legal document intelligence platform with advanced RAG architectures. Features semantic search and citation extraction for modern legal practitioners.',
    tech: ['React.js', 'FastAPI', 'LangChain', 'ChromaDB', 'Python'],
    github: 'https://github.com/AlbinJohn/LegalEase',
    live: 'https://legalease-demo.vercel.app',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    cat: 'CAT. 02',
    title: 'Casper',
    desc: 'A high-performance multi-agent conversational AI assistant engineered with LangGraph. Offers autonomous orchestration and tool-calling workflows.',
    tech: ['React.js', 'LangGraph', 'FastAPI', 'Python', 'OpenAI'],
    github: 'https://github.com/AlbinJohn/casper-agent',
    live: 'https://casper-ai.vercel.app',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    cat: 'CAT. 03',
    title: 'AuthentiScan',
    desc: 'A hybrid AI-powered image forgery detection platform. Combines frequency domain analysis and deep CNN feature extraction for pixel-level integrity localization.',
    tech: ['PyTorch', 'FastAPI', 'React.js', 'OpenCV', 'Python'],
    github: 'https://github.com/AlbinJohn/AuthentiScan',
    live: 'https://authentiscan-detector.vercel.app',
    img: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    cat: 'CAT. 04',
    title: 'NeuralFlow',
    desc: 'An intelligent workflow automation engine powered by autonomous LLM orchestrators. Features an interactive visual drag-and-drop canvas.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/AlbinJohn/NeuralFlow',
    live: 'https://neuralflow-app.vercel.app',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    cat: 'CAT. 05',
    title: 'VisionEdge',
    desc: 'A real-time computer vision analytics system for industrial assembly monitoring. Leverages custom deep learning models for automated defect detection.',
    tech: ['PyTorch', 'OpenCV', 'Python', 'FastAPI', 'Docker'],
    github: 'https://github.com/AlbinJohn/VisionEdge',
    live: 'https://visionedge-analytics.vercel.app',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    cat: 'CAT. 06',
    title: 'VectorMind',
    desc: 'An enterprise-grade RAG search engine featuring sub-second vector retrieval. Engineered with Qdrant vector database and hybrid dense-sparse embeddings.',
    tech: ['React.js', 'FastAPI', 'Qdrant', 'OpenAI', 'Python'],
    github: 'https://github.com/AlbinJohn/VectorMind',
    live: 'https://vectormind-search.vercel.app',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
  }
]

// Animated Tactile 3D Project Card Component
function ProjectCard({ p, i }) {
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
    
    // Relative coordinate mapping (-width/2 to +width/2)
    const mouseXVal = e.clientX - rect.left - width / 2
    const mouseYVal = e.clientY - rect.top - height / 2
    
    // 3D Tilt calculation (max 9 degrees of rot for cute, classy feel)
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
      className="hover-card-border-glow"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
        padding: '24px 20px',
        boxShadow: hovered 
          ? '0 30px 60px -15px rgba(0,0,0,0.12), 0 15px 30px -10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' 
          : '0 8px 24px -10px rgba(0,0,0,0.03), 0 4px 12px -8px rgba(0,0,0,0.01), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: hovered ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.035)',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '495px',
        boxSizing: 'border-box',
        position: 'relative',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backfaceVisibility: 'hidden'
      }}
      whileHover={{ 
        y: -10,
        scale: 1.025
      }}
    >
      <div style={{ transformStyle: 'preserve-3d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', flexGrow: 1 }}>
        
        <div>
          {/* Cute Sized Viewport Container (h-180px) with translateZ perspective */}
          <div 
            style={{ 
              borderRadius: '16px', 
              background: '#f1f5f9',
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
              height: '180px',
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
                opacity: 0.95,
                pointerEvents: 'none'
              }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Sized-Down Glassmorphic Floating Magnetic Pill CTA with heavy translateZ */}
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
                  View Project <span style={{ fontSize: '10px' }}>↗</span>
                </span>
              </motion.div>
            </div>

          </div>

          {/* Content Details with subtle translateZ perspective for 3D alignment */}
          <div 
            style={{ 
              transform: 'translateZ(15px)',
              padding: '20px 8px 4px 8px',
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
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '800',
                fontSize: '20px',
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
              style={{
                fontSize: '13px',
                lineHeight: '1.65',
                color: '#475569',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '400',
                marginBottom: '20px',
                userSelect: 'none'
              }}
            >
              {p.desc}
            </p>
          </div>
        </div>

        {/* Bottom Details Section (Tech Stacks + Links) with translateZ */}
        <div 
          style={{ 
            transform: 'translateZ(25px)',
            paddingLeft: '8px',
            paddingRight: '8px'
          }}
        >
          {/* Tech Badges */}
          <div 
            style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '20px'
            }}
          >
            {p.tech.map((t, idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '9.5px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links Bar */}
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0'
            }}
          >
            <a 
              href={p.github} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontSize: '12px',
                fontWeight: '600',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0f1f4b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Code
            </a>
            <a 
              href={p.live} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontSize: '12px',
                fontWeight: '600',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0f1f4b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
              Live Demo
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default function WorkSection() {
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

  const styleSheet = `
    @keyframes borderRotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .hover-card-border-glow {
      position: relative;
      z-index: 1;
    }
    .hover-card-border-glow::before {
      content: "";
      position: absolute;
      inset: -1.5px;
      border-radius: 25px;
      padding: 1.5px;
      background: linear-gradient(90deg, #cbd5e1, #64748b, #cbd5e1, #e2e8f0, #cbd5e1);
      background-size: 300% 300%;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: -1;
      pointer-events: none;
    }
    .hover-card-border-glow:hover::before {
      opacity: 1;
      animation: borderRotate 4s linear infinite;
    }
  `;

  return (
    <section 
      id="work" 
      className="w-full px-8 select-none flex flex-col items-center justify-center" 
      style={{ background: 'transparent', paddingTop: '60px', paddingBottom: '100px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div className="max-w-[1200px] w-full flex flex-col items-center gap-12">
        
        {/* Perfectly Centered Editorial Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center gap-2.5"
        >
          <p className="text-[9px] font-mono font-bold tracking-[0.6em] text-blue-400 uppercase pl-[0.6em]">SELECTED WORK</p>
          <div className="flex items-center justify-center gap-3 relative">
            {/* Centered custom wedge pointer matching template signature */}
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight">Featured Projects</h2>
          </div>
        </motion.div>

        {/* Curated Cute Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
