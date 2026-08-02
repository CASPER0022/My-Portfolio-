import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InterviewDocView({ material, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [material])

  if (!material) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0e1620',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Responsive Top Bar Navigation */}
      <div
        className="w-full bg-[#131a22] border-b border-[#233040] flex items-center justify-between px-3 md:px-6 h-[56px] md:h-[60px] shrink-0 z-10 select-none gap-2"
      >
        {/* Left: Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono font-bold tracking-wider uppercase bg-white/10 border border-white/15 text-slate-200 hover:bg-white/20 hover:text-white transition-all cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="inline sm:hidden">Back</span>
        </button>

        {/* Center: Title / Badge */}
        <div className="flex items-center gap-2 min-w-0 max-w-[40%] sm:max-w-none justify-center">
          <span className="text-xs md:text-sm font-sans font-bold text-white tracking-tight truncate">
            {material.shortTitle || material.title}
          </span>
          <span className="hidden lg:inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#14497f] text-white tracking-widest uppercase shrink-0">
            STUDY MATERIAL
          </span>
        </div>

        {/* Right: Open New Tab Button */}
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono font-bold tracking-wider uppercase bg-[#14497f] text-white hover:bg-[#1e60a3] transition-all text-decoration-none shrink-0"
        >
          <span className="hidden sm:inline">Open New Tab</span>
          <span className="inline sm:hidden">Open</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
          </svg>
        </a>
      </div>

      {/* Embedded Document Webpage Frame */}
      <iframe
        src={material.fileUrl}
        title={material.title}
        className="w-full border-0 bg-[#e8edf2] flex-1"
        style={{
          height: 'calc(100vh - 56px)'
        }}
      />
    </motion.div>
  )
}
