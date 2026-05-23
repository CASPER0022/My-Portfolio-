import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const stats = [
    {
      num: '3+',
      label: 'Years of Experience',
      accentColor: '#3B82F6',
      accentColor2: '#60A5FA',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      num: '80+',
      label: 'LeetCode Problems Solved',
      accentColor: '#6366F1',
      accentColor2: '#818CF8',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
    {
      num: '8+',
      label: 'Completed Projects',
      accentColor: '#06B6D4',
      accentColor2: '#22D3EE',
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      num: '13+',
      label: 'Course Certifications',
      accentColor: '#8B5CF6',
      accentColor2: '#A78BFA',
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      )
    }
  ]

  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      className="w-full relative select-none overflow-hidden text-[#1d1d1f]"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        background: '#ededed',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating abstract glowing orbs */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container with Guaranteed Luxury Margins & Perfect Centering */}
      <div 
        className="w-full relative z-10"
        style={{
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'max(32px, 8vw)',
          paddingRight: 'max(32px, 8vw)',
          boxSizing: 'border-box'
        }}
      >
        
        {/* Asymmetric 2-Column Layout (Photo on LEFT, Story & Header on RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Portrait Stack with Tilt & Glow */}
          <motion.div
            className="flex items-center justify-center relative py-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Wrapper with locked dimensions */}
            <div className="relative w-[260px] sm:w-[290px] md:w-[320px] aspect-[4/5]">
              
              {/* Layer 1: Outermost skewed decorative glowing backing (Guaranteed bottom and left shift) */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: 'linear-gradient(to top right, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.2))',
                  transform: 'rotate(-6deg) translate(-24px, 24px)',
                  zIndex: -10,
                  filter: 'blur(2px)',
                  transition: 'transform 0.5s ease'
                }}
              />

              {/* Layer 2: Intermediate skewed solid card background (Guaranteed bottom and left shift) */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transform: 'rotate(-3deg) translate(-12px, 12px)',
                  zIndex: -10,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.5s ease'
                }}
              />
              
              {/* Layer 3: Main photo container */}
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-black/[0.04] shadow-xl relative group bg-[#ffffff]">
                <img 
                  src="/albin.png" 
                  alt="Albin John Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Clean glass-like glare gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#ededed]/40 via-transparent to-transparent opacity-75 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Header + Story */}
          <motion.div
            className="flex flex-col gap-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Editorial Header Block aligned Left with Right Column */}
            <div className="flex flex-col items-start w-full">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#86868b' }}>
                01 / INTRODUCING ALBIN
              </span>
              <h2 className="font-sans font-extrabold text-4xl md:text-[50px] tracking-tight leading-none relative pb-5" style={{ color: '#1d1d1f' }}>
                About Me
                <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-blue-500 rounded-full" />
              </h2>
            </div>

            {/* Rewritten Profile Copy */}
            <div className="flex flex-col gap-5">
              <p className="text-base md:text-[17px] leading-[1.8] text-slate-600 font-sans font-normal">
                I am a Computer Science student at IIIT Kottayam and a dedicated Full-Stack Engineer who thrives at the intersection of robust backend architectures and fluid, interactive frontend designs. Over the past 2 years, I have focused on engineering scalable web architectures, crafting high-performance user experiences, and exploring intelligent systems.
              </p>
              <p className="text-base md:text-[17px] leading-[1.8] text-slate-600 font-sans font-normal">
                What drives me is the challenge of transforming complex algorithmic concepts into clean, accessible, and high-impact digital products. Armed with a strong foundation in modern tech stacks, I approach software engineering not just as writing code, but as building reliable, scalable systems that solve tangible, real-world problems.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Visual Divider Line */}
        <div 
          style={{
            width: '100%',
            height: '1px',
            marginTop: '60px',
            marginBottom: '35px',
            background: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.08), transparent)'
          }}
        />

        {/* Row 2: 4-Column Balanced Centered Stats Grid */}
        <div 
          style={{ 
            width: '100%', 
            paddingLeft: '20px', 
            paddingRight: '20px', 
            boxSizing: 'border-box' 
          }}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            style={{
              maxWidth: '1200px',
              marginLeft: 'auto',
              marginRight: 'auto',
              boxSizing: 'border-box'
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center rounded-[24px] transition-all duration-300 group relative overflow-hidden"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.045)',
                  padding: '40px 24px',
                  boxShadow: hoveredIdx === idx
                    ? '0 20px 40px -10px rgba(0, 0, 0, 0.06), 0 10px 20px -8px rgba(0, 0, 0, 0.04)'
                    : '0 8px 24px -10px rgba(0, 0, 0, 0.03)',
                  cursor: 'pointer',
                  transform: hoveredIdx === idx ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Top Accent Gradient Border */}
                <div 
                  className="absolute top-0 inset-x-0 h-[4px] transition-all duration-300 opacity-60 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, ${s.accentColor}, ${s.accentColor2})`
                  }}
                />

                {/* Glassmorphic Icon Badge centered */}
                <div 
                  className="p-3.5 rounded-2xl mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${s.accentColor}10`,
                    border: `1px solid ${s.accentColor}20`
                  }}
                >
                  {s.icon}
                </div>
                
                {/* Bold Number centered */}
                <span className="font-sans font-extrabold text-3xl md:text-4xl tracking-tight leading-none mb-3 transition-colors duration-300" style={{ color: '#1d1d1f' }}>
                  {s.num}
                </span>
                
                {/* Elegant Label centered */}
                <span className="text-[12px] md:text-[13px] font-sans font-semibold tracking-wide transition-colors duration-300 leading-snug" style={{ color: '#64748b' }}>
                  {s.label}
                </span>

                {/* Light glow reflection border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-black/5 rounded-[24px] pointer-events-none transition-all duration-300" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
