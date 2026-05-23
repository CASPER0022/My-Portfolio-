import React from 'react'
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

  return (
    <section
      className="w-full relative select-none overflow-hidden text-white"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        background: 'linear-gradient(to bottom, #112240, #0a0c14)',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating abstract glowing orbs */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

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
                  background: 'linear-gradient(to top right, rgba(99, 102, 241, 0.25), rgba(59, 130, 246, 0.3))',
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
                  background: '#0c1a36',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transform: 'rotate(-3deg) translate(-12px, 12px)',
                  zIndex: -10,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.5s ease'
                }}
              />
              
              {/* Layer 3: Main photo container */}
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl relative group bg-[#0e1b35]">
                <img 
                  src="/albin.png" 
                  alt="Albin John Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Clean glass-like glare gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 via-transparent to-transparent opacity-75 pointer-events-none" />
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
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-blue-400 uppercase mb-3">
                01 / INTRODUCING ALBIN
              </span>
              <h2 className="font-sans font-extrabold text-4xl md:text-[50px] text-white tracking-tight leading-none relative pb-5">
                About Me
                <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-blue-500 rounded-full" />
              </h2>
            </div>

            {/* Rewritten Professional Profile Copy */}
            <div className="flex flex-col gap-5">
              <p className="text-base md:text-[17px] leading-[1.8] text-gray-300/95 font-sans font-normal">
                I am a Computer Science student at IIIT Kottayam and a dedicated Full-Stack Engineer who thrives at the intersection of robust backend architectures and fluid, interactive frontend designs. Over the past 2 years, I have focused on engineering scalable web architectures, crafting high-performance user experiences, and exploring intelligent systems.
              </p>
              <p className="text-base md:text-[17px] leading-[1.8] text-gray-300/95 font-sans font-normal">
                What drives me is the challenge of transforming complex algorithmic concepts into clean, accessible, and high-impact digital products. Armed with a strong foundation in modern tech stacks, I approach software engineering not just as writing code, but as building reliable, scalable systems that solve tangible, real-world problems.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Visual Divider Line (Accented blue glowing line with balanced spacing) */}
        <div 
          style={{
            width: '100%',
            height: '1px',
            marginTop: '60px',
            marginBottom: '35px',
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.45), transparent)'
          }}
        />

        {/* Row 2: 4-Column Balanced Centered Stats Grid (Guaranteed centered and narrower alignment) */}
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
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '40px 24px',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
                  cursor: 'none'
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
                    background: `${s.accentColor}15`,
                    border: `1px solid ${s.accentColor}25`
                  }}
                >
                  {s.icon}
                </div>
                
                {/* Bold White Number centered */}
                <span className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-none mb-3 group-hover:text-blue-200 transition-colors duration-300">
                  {s.num}
                </span>
                
                {/* Elegant Gray Label centered */}
                <span className="text-[12px] md:text-[13px] font-sans font-semibold tracking-wide text-gray-400 group-hover:text-white transition-colors duration-300 leading-snug">
                  {s.label}
                </span>

                {/* Light glow reflection border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-[24px] pointer-events-none transition-all duration-300" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
