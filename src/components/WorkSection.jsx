import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const projects = [
  {
    id: 1,
    cat: 'CAT. 01',
    title: 'LegalEase',
    desc: 'AI-powered legal document intelligence platform with RAG architecture and semantic search.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    cat: 'CAT. 02',
    title: 'Casper',
    desc: 'Multi-agent conversational AI assistant built using LangGraph and advanced tool-calling workflows.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    cat: 'CAT. 03',
    title: 'AuthentiScan',
    desc: 'Hybrid AI image forgery detector combining frequency analysis and deep feature extraction.',
    img: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    cat: 'CAT. 04',
    title: 'NeuralFlow',
    desc: 'Intelligent workflow automation platform powered by autonomous AI agents.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    cat: 'CAT. 05',
    title: 'VisionEdge',
    desc: 'Real-time computer vision analytics system for industrial monitoring and defect detection.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    cat: 'CAT. 06',
    title: 'VectorMind',
    desc: 'Enterprise RAG platform for semantic retrieval, knowledge management, and contextual AI search.',
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
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #fcfcfc 100%)',
        padding: '16px',
        boxShadow: hovered 
          ? '0 30px 60px -15px rgba(0,0,0,0.1), 0 15px 30px -10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' 
          : '0 8px 24px -10px rgba(0,0,0,0.04), 0 4px 12px -8px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: '1px solid rgba(0,0,0,0.035)',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s'
      }}
      whileHover={{ 
        y: -10,
        scale: 1.025,
        borderColor: 'rgba(0,0,0,0.06)'
      }}
      className="flex flex-col justify-between group"
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Cute Sized Viewport Container (h-180px) with translateZ perspective */}
        <div className="overflow-hidden h-[180px] w-full flex items-center justify-center relative select-none"
          style={{ 
            borderRadius: '16px', 
            background: '#f8f8f8',
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}>
          
          <motion.img 
            src={p.img} 
            alt={p.title} 
            className="w-full h-full object-cover opacity-95 pointer-events-none"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Sized-Down Glassmorphic Floating Magnetic Pill CTA with heavy translateZ */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none z-20"
            style={{ transform: 'translateZ(40px)' }}>
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              animate={{ 
                opacity: hovered ? 1 : 0, 
                y: hovered ? 0 : 12
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_12px_24px_rgba(0,0,0,0.08)] rounded-full px-4 py-2 flex items-center justify-center"
            >
              <span className="text-[9px] font-sans font-bold tracking-wide text-[#111111] flex items-center gap-1.5 whitespace-nowrap">
                View Project <span className="text-[10px]">↗</span>
              </span>
            </motion.div>
          </div>

        </div>

        {/* Content Details with subtle translateZ perspective for 3D alignment */}
        <div className="px-2 pt-4 pb-1 text-left" style={{ transform: 'translateZ(15px)' }}>
          <p className="text-[8.5px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase mb-1.5 select-none">{p.cat}</p>
          <h3 className="font-display font-bold text-[16px] text-gray-900 mb-1 leading-tight select-none uppercase tracking-wide">{p.title}</h3>
          <p className="text-[11.5px] text-gray-400 leading-normal font-sans font-medium h-[34px] overflow-hidden line-clamp-2 select-none">{p.desc}</p>
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

  return (
    <section 
      id="work" 
      className="w-full px-8 select-none flex flex-col items-center justify-center" 
      style={{ background: '#F7F7F7', paddingTop: '60px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1000px] w-full flex flex-col items-center gap-12">
        
        {/* Perfectly Centered Editorial Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center gap-2.5"
        >
          <p className="text-[9px] font-mono font-bold tracking-[0.6em] text-gray-400 uppercase pl-[0.6em]">SELECTED WORK</p>
          <div className="flex items-center justify-center gap-3 relative">
            {/* Centered custom wedge pointer matching template signature */}
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-[#111111]" fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#111111] tracking-tight">Featured Projects</h2>
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
