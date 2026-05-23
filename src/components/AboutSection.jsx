import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section
      className="w-full relative select-none overflow-hidden text-white"
      style={{
        paddingTop: '160px',
        paddingBottom: '160px',
        background: 'linear-gradient(to bottom, #0b132b, #112240, #0b132b)',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating abstract glowing orbs */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container with Guaranteed Luxury Margins */}
      <div 
        className="max-w-[1400px] mx-auto w-full relative z-10"
        style={{
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
              
              {/* Layer 1: Outermost skewed decorative glowing backing (Rotated oppositely to original) */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-indigo-500/25 to-blue-600/30 transform -rotate-[4deg] -translate-x-3 translate-y-3 -z-10 filter blur-[2px] transition-transform duration-500 hover:rotate-0 hover:translate-x-0 hover:translate-y-0" />

              {/* Layer 2: Intermediate skewed solid card background */}
              <div className="absolute inset-0 rounded-[24px] bg-[#0c1a36] border border-white/[0.05] transform rotate-[3deg] translate-x-2 -translate-y-2 -z-10 shadow-lg transition-transform duration-500 hover:rotate-0 hover:translate-x-0 hover:translate-y-0" />
              
              {/* Layer 3: Main photo container */}
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl relative group bg-[#0e1b35]">
                <img 
                  src="/profile.png" 
                  alt="Albin John Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Clean glass-like glare gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 via-transparent to-transparent opacity-75 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Header + Story + Accent Stat Badges */}
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

            {/* Modern Sidebar Stat Badges (Side-by-side layout with left-accent borders & SVG Icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              
              {/* Stat Badge 1: Projects */}
              <div 
                className="flex items-center p-5 rounded-[16px] border border-white/[0.04] border-l-4 border-l-blue-500 bg-white/[0.02] backdrop-blur-md shadow-md hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 mr-4 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight">
                    10+
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                    Projects Done
                  </span>
                </div>
              </div>

              {/* Stat Badge 2: Years Experience */}
              <div 
                className="flex items-center p-5 rounded-[16px] border border-white/[0.04] border-l-4 border-l-indigo-500 bg-white/[0.02] backdrop-blur-md shadow-md hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-indigo-500/10 mr-4 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight">
                    2 Years
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                    In Engineering
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
