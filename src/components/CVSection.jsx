import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'AI & ML', 'Web Dev', 'Cybersecurity', 'Awards']

const certifications = [
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera & DeepLearning.AI',
    category: 'AI & ML',
    tag: 'Machine Learning',
    link: '#',
    color: '#8b5cf6'
  },
  {
    title: 'MERN Stack & Full Stack Web Development',
    issuer: 'Full Stack Academy',
    category: 'Web Dev',
    tag: 'Full Stack',
    link: '#',
    color: '#06b6d4'
  },
  {
    title: 'IBM AI Foundations & Workflows',
    issuer: 'IBM Skills Network',
    category: 'AI & ML',
    tag: 'Artificial Intelligence',
    link: '#',
    color: '#3b82f6'
  },
  {
    title: 'Python Libraries for Data Science',
    issuer: 'Coursera',
    category: 'AI & ML',
    tag: 'Data Science',
    link: '#',
    color: '#3b82f6'
  },
  {
    title: 'Introduction to Natural Language Processing (NLP)',
    issuer: 'Cognitive Class',
    category: 'AI & ML',
    tag: 'NLP',
    link: '#',
    color: '#8b5cf6'
  },
  {
    title: 'Fundamentals of Information Security',
    issuer: 'Cognitive Class',
    category: 'Cybersecurity',
    tag: 'Security',
    link: '#',
    color: '#ef4444'
  },
  {
    title: 'Chatbot Building Essentials',
    issuer: 'Cognitive Class',
    category: 'AI & ML',
    tag: 'Conversational AI',
    link: '#',
    color: '#10b981'
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Cognitive Class',
    category: 'AI & ML',
    tag: 'Data Science',
    link: '#',
    color: '#3b82f6'
  },
  {
    title: 'Fundamentals of JavaScript',
    issuer: 'Cognitive Class',
    category: 'Web Dev',
    tag: 'Frontend',
    link: '#',
    color: '#eab308'
  },
  {
    title: 'JavaScript Programming Core',
    issuer: 'Cognitive Class',
    category: 'Web Dev',
    tag: 'Programming',
    link: '#',
    color: '#eab308'
  },
  {
    title: 'Rajya Puraskar Scout Award',
    issuer: 'Bharat Scouts & Guides',
    category: 'Awards',
    tag: 'State Honors',
    link: '#',
    color: '#f97316'
  },
  {
    title: "Chief Minister's Shield Award",
    issuer: 'State Government',
    category: 'Awards',
    tag: 'State Honors',
    link: '#',
    color: '#f97316'
  },
  {
    title: 'Drone Technology & Assembly Workshop',
    issuer: 'IIIT Kottayam',
    category: 'Awards',
    tag: 'Robotics',
    link: '#',
    color: '#ec4899'
  }
]

export default function CVSection() {
  const [activeTab, setActiveTab] = useState('All')
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredCerts = activeTab === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === activeTab)

  const visibleCerts = isExpanded ? filteredCerts : filteredCerts.slice(0, 9)

  const handleTabChange = (cat) => {
    setActiveTab(cat)
    setIsExpanded(false)
  }

  return (
    <section 
      id="cv" 
      className="w-full relative select-none px-10 md:px-16 flex flex-col items-center justify-center bg-[#ededed]"
      style={{ paddingTop: '80px', paddingBottom: '120px' }}
    >
      <div className="max-w-[1080px] w-full flex flex-col gap-12 mx-auto">
        
        {/* Editorial Section Header */}
        <div className="text-center flex flex-col items-center justify-center gap-2.5">
          <p className="text-[10px] font-mono font-bold tracking-[0.6em] uppercase pl-[0.6em] text-blue-600">ACCREDITATIONS</p>
          <div className="flex items-center justify-center gap-3 relative">
            <div className="w-5 h-5 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] translate-y-[-1px] select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-gray-900" fill="currentColor">
                <path d="M25 15 L75 50 L25 85 Z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-gray-900">Certifications</h2>
          </div>
          <p className="text-[14px] text-gray-500 font-sans mt-3 max-w-lg leading-relaxed font-normal">
            A curated directory of professional certifications, technical awards, and academic honors.
          </p>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 my-4">
          {categories.map((cat) => {
            const isActive = activeTab === cat
            let displayLabel = cat
            if (cat === 'Web Dev') displayLabel = 'Web Development'
            if (cat === 'Cybersecurity') displayLabel = 'Cybersecurity'
            if (cat === 'Awards') displayLabel = 'Awards & Honors'
            if (cat === 'AI & ML') displayLabel = 'AI & Machine Learning'

            return (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                className="relative px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 select-none cursor-default"
                style={{
                  background: isActive ? '#0f1f4b' : 'rgba(255, 255, 255, 0.75)',
                  border: isActive ? '1px solid #0f1f4b' : '1px solid rgba(0, 0, 0, 0.05)',
                  color: isActive ? '#ffffff' : '#475569',
                  boxShadow: isActive ? '0 10px 20px rgba(15, 31, 75, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.01)'
                }}
              >
                {displayLabel}
              </button>
            )
          })}
        </div>

        {/* Dynamic Filterable Card Grid with layout transitions */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4 justify-center justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {visibleCerts.map((cert, idx) => {
              const isHovered = hoveredIdx === idx
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  key={cert.title}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative w-full max-w-full flex flex-col justify-between"
                  style={{
                    background: '#ffffff',
                    border: isHovered 
                      ? `1px solid ${cert.color}40` 
                      : '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '24px',
                    padding: '28px',
                    boxShadow: isHovered
                      ? `0 20px 40px ${cert.color}12, 0 10px 20px rgba(0,0,0,0.02)`
                      : '0 4px 20px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    minHeight: '220px'
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Row: Category Tag & Icon */}
                    <div className="flex justify-between items-center w-full">
                      <span 
                        className="text-[9px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-md"
                        style={{
                          background: `${cert.color}08`,
                          border: `1px solid ${cert.color}25`,
                          color: cert.color
                        }}
                      >
                        {cert.tag}
                      </span>
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>

                    {/* Title takes full length/width of card */}
                    <h3 className="font-sans font-extrabold text-base text-gray-900 leading-tight text-left w-full">
                      {cert.title}
                    </h3>
                    
                    {/* Bottom Row: Issuer on Left, CSS Certificate Mini Preview on Right */}
                    <div className="flex gap-4 items-end justify-between w-full mt-1">
                      {/* Left Block: Issuer */}
                      <p className="text-xs text-gray-400 font-medium font-sans text-left pb-1">
                        {cert.issuer}
                      </p>
                      
                      {/* Right Block: Offline-Compatible CSS Certificate Mini Preview */}
                      <div 
                        className="flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-gray-150 bg-gray-50 flex items-center justify-center relative transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] group-hover:border-blue-400/20"
                        style={{ perspective: '600px' }}
                      >
                        {/* CSS Certificate Mini Blueprint */}
                        <div className="absolute inset-1 border border-dashed border-gray-300/80 rounded-lg flex flex-col justify-between p-1.5 bg-white select-none pointer-events-none">
                          {/* Certificate header line */}
                          <div className="w-7 h-[2px] rounded-full bg-gray-300/80" />
                          {/* Certificate dynamic badge/text lines */}
                          <div className="flex flex-col gap-1 items-center w-full">
                            <div className="w-12 h-[3px] rounded-full" style={{ background: `${cert.color}40` }} />
                            <div className="w-8 h-[2px] rounded-full bg-gray-200" />
                          </div>
                          {/* Bottom seal & signatures */}
                          <div className="flex justify-between items-center w-full px-1">
                            <div className="w-3 h-[1.5px] rounded-full bg-gray-250" />
                            {/* Gold Seal with ribbon */}
                            <div className="relative w-3.5 h-3.5 rounded-full flex items-center justify-center bg-amber-400/20 border border-amber-400/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              {/* Ribbon tails */}
                              <div className="absolute top-[80%] left-[20%] w-[2px] h-2 bg-amber-500/60 rotate-[20deg] origin-top" />
                              <div className="absolute top-[80%] right-[20%] w-[2px] h-2 bg-amber-500/60 rotate-[-20deg] origin-top" />
                            </div>
                            <div className="w-3 h-[1.5px] rounded-full bg-gray-250" />
                          </div>
                        </div>
                        {/* High-end overlay with verification eye icon */}
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Certificate Link CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100/80 w-full flex justify-start">
                    <a
                      href={cert.link}
                      className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500 hover:text-blue-600 transition-colors select-none"
                    >
                      View Certificate
                      <span className="text-[12px] font-bold">↗</span>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* See More / See Less Button Option */}
        {filteredCerts.length > 9 && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 select-none cursor-default border border-[#0f1f4b]/20 text-[#0f1f4b] hover:bg-[#0f1f4b] hover:text-white hover:border-[#0f1f4b] hover:shadow-[0_10px_20px_rgba(15,31,75,0.15)] flex items-center gap-2"
              style={{
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {isExpanded ? (
                <>
                  See Less
                  <svg className="w-3.5 h-3.5 transform rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </>
              ) : (
                <>
                  See More ({filteredCerts.length - 9} remaining)
                  <svg className="w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
        
      </div>
    </section>
  )
}
