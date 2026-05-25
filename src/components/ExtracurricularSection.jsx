import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ExtracurricularSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const galleryItems = [
    {
      id: 1,
      title: "Inter-IIIT Tournament",
      subtitle: "National Arena",
      img: "extracurricular/extra3.jpeg",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Blue House Contingent",
      subtitle: "Championship Runner-Up",
      img: "extracurricular/extra2.jpeg",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.303-1.2-.81-1.543-1.66-1.11-3.1-2.16-4.185-3.09a1.5 1.5 0 00-1.01-.397H7.5a1.5 1.5 0 00-1.01.397c-1.086.93-2.525 1.98-4.185 3.09A1.875 1.875 0 001.5 15.375V18.75m18 0v-11.25A2.25 2.25 0 0017.25 5.25h-3m3 13.5H3.75m13.5-.001V18.75m0-13.5A2.25 2.25 0 0015 3h-6a2.25 2.25 0 00-2.25 2.25V15" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Event Operations",
      subtitle: "200+ Participant Logistics",
      img: "extracurricular/extra1.jpeg",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    }
  ]

  const styleSheet = `
    .extracurricular-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 24px;
      padding: 1px;
      background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.05), transparent);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  `

  return (
    <section 
      id="extracurricular" 
      className="w-full relative select-none overflow-hidden px-8 md:px-12 flex flex-col items-center justify-center"
      style={{
        paddingTop: '100px',
        paddingBottom: '120px',
        background: '#0a0c14',
        boxSizing: 'border-box'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />

      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating abstract glowing orbs */}
      <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1080px] w-full flex flex-col gap-12 mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center flex flex-col items-center justify-center gap-2.5">
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
              CAMPUS LIFE
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 relative">
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none text-white">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-white">Leadership & Extracurricular</h2>
          </div>
          <p className="text-[14px] text-gray-400 font-sans mt-3 max-w-lg leading-relaxed font-normal">
            Fostering competitive spirit, managing sports operations, and leading large student bodies.
          </p>
        </div>

        {/* 2-Column Content Layout: Details Card on Left, Gallery Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4 w-full">
          
          {/* Left Column: Stack of two premium Leadership & Activity Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between items-stretch w-full">
            
            {/* Card 1: House Captain */}
            <div className="relative flex flex-col justify-between extracurricular-card w-full"
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Header row */}
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#3b82f6] uppercase">
                      SPORTEC - IIITK
                    </span>
                    <h3 className="font-sans font-extrabold text-xl text-white leading-tight mt-1">
                      Blue House Captain
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 font-mono text-[9px] text-right">
                    <span className="text-gray-300 font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-wider">
                      Oct. 2025 – Present
                    </span>
                    <span className="text-gray-500 mt-1">
                      IIIT Kottayam
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex gap-3.5 items-start text-left mt-2">
                  <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center bg-blue-500/10 border border-blue-500/35 mt-0.5 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <p className="text-[13.5px] text-gray-300 leading-relaxed font-sans font-medium">
                    Led a contingent of 500+ students as Blue House Captain, coordinating athletes across 15+ events to secure Runner-Up in the intra-college sports meet and managing logistics for tournaments with 200+ participants.
                  </p>
                </div>
              </div>

              {/* Stats block */}
              <div className="mt-6 pt-4 border-t border-white/5 flex gap-8 justify-start text-left">
                <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Contingent Size</p>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">500+ Students</h4>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Coordinated Events</p>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">15+ Sports</h4>
                </div>
              </div>
            </div>

            {/* Card 2: Badminton Sub-Lead */}
            <div className="relative flex flex-col justify-between extracurricular-card w-full"
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Header row */}
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                      SPORTEC - IIITK
                    </span>
                    <h3 className="font-sans font-extrabold text-xl text-white leading-tight mt-1">
                      Badminton Sub-Lead
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 font-mono text-[9px] text-right">
                    <span className="text-gray-300 font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-wider">
                      Oct. 2025 – Present
                    </span>
                    <span className="text-gray-500 mt-1">
                      IIIT Kottayam
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex gap-3.5 items-start text-left mt-2">
                  <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center bg-purple-500/10 border border-purple-500/35 mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                  <p className="text-[13.5px] text-gray-300 leading-relaxed font-sans font-medium">
                    Represented IIIT Kottayam in national level Inter-IIIT badminton tournaments, demonstrating strong competitive performance, teamwork, and leadership skills.
                  </p>
                </div>
              </div>

              {/* Stats block */}
              <div className="mt-6 pt-4 border-t border-white/5 flex gap-8 justify-start text-left">
                <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Competition Level</p>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">National Inter-IIIT</h4>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Sport Focus</p>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">Badminton Operations</h4>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Grid Image Gallery (2 Squares Up, 1 Wide Down) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-stretch">
            
            {/* Top Left: Card 1 (Inter-IIIT Tournament) */}
            <div 
              onMouseEnter={() => setHoveredIdx(1)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="col-span-2 sm:col-span-1 rounded-[24px] overflow-hidden border border-white/5 relative bg-slate-900 flex flex-col justify-end transition-all duration-300 hover:border-blue-500/25 shadow-lg group"
              style={{ padding: '20px', height: '230px' }}
            >
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                style={{ backgroundImage: `url(${galleryItems[0].img})`, backgroundPosition: 'center 15%' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
              
              <div className="relative z-20 flex flex-col gap-1 text-left">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-[#3b82f6] shadow-md mb-1">
                  {galleryItems[0].icon}
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-[#3b82f6] uppercase tracking-wider">{galleryItems[0].subtitle}</p>
                  <h4 className="font-sans font-bold text-sm text-white mt-0.5">{galleryItems[0].title}</h4>
                </div>
              </div>
            </div>

            {/* Top Right: Card 2 (Blue House Contingent) */}
            <div 
              onMouseEnter={() => setHoveredIdx(2)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="col-span-2 sm:col-span-1 rounded-[24px] overflow-hidden border border-white/5 relative bg-slate-900 flex flex-col justify-end transition-all duration-300 hover:border-purple-500/25 shadow-lg group"
              style={{ padding: '20px', height: '230px' }}
            >
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                style={{ backgroundImage: `url(${galleryItems[1].img})`, backgroundPosition: 'center 20%' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
              
              <div className="relative z-20 flex flex-col gap-1 text-left">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-md mb-1">
                  {galleryItems[1].icon}
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-wider">{galleryItems[1].subtitle}</p>
                  <h4 className="font-sans font-bold text-sm text-white mt-0.5">{galleryItems[1].title}</h4>
                </div>
              </div>
            </div>

            {/* Bottom Row: Card 3 (Event Operations - Full-width Horizontal Banner) */}
            <div 
              onMouseEnter={() => setHoveredIdx(3)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="col-span-2 rounded-[24px] overflow-hidden border border-white/5 relative bg-slate-900 flex flex-col justify-end transition-all duration-300 hover:border-cyan-500/25 shadow-lg group"
              style={{ padding: '20px', height: '270px' }}
            >
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                style={{ backgroundImage: `url(${galleryItems[2].img})`, backgroundPosition: 'center 25%' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
              
              <div className="relative z-20 flex flex-col gap-1 text-left">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-md mb-1">
                  {galleryItems[2].icon}
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{galleryItems[2].subtitle}</p>
                  <h4 className="font-sans font-bold text-sm text-white mt-0.5">{galleryItems[2].title}</h4>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
