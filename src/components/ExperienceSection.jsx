import React, { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const experiences = [
  {
    id: 'exp-1',
    num: '1',
    company: 'Klyonix Innovations',
    role: 'AI/ML Intern',
    date: '2025 – Present',
    active: true,
    subtitle: 'AI INTEGRATION & INTELLIGENT SYSTEMS',
    desc: 'Working on AI-powered CRM systems, customer support agents, RAG pipelines, LangGraph workflows, testing AI integrations, and intelligent automation solutions.',
    bullets: [
      'Engineered autonomous RAG pipelines with LangGraph, improving response accuracy by 35%.',
      'Developed multi-agent customer support workflows with advanced tool-calling.',
      'Integrated vector search, semantic caching, and intelligent routing for scalable AI systems.'
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'React', 'ChromaDB', 'OpenAI']
  },
  {
    id: 'exp-2',
    num: '2',
    company: 'Origin Labs',
    role: 'ML Engineer Intern',
    date: 'Future Opportunity',
    active: false,
    subtitle: 'ROBOTICS & MULTI-AGENT SYSTEMS',
    desc: 'Developing intelligent robotic systems, multi-agent decision frameworks, and production-safe AI workflows.',
    bullets: [
      'Designing simulation environments for multi-agent coordinated decision frameworks.',
      'Architecting resilient AI workflows with predictive safety bounds.',
      'Integrating ML inference pipelines on embedded robotic hardware.'
    ],
    tags: ['PyTorch', 'ROS2', 'LangGraph', 'FastAPI', 'Python', 'Docker']
  },
  {
    id: 'exp-3',
    num: '3',
    company: 'Freelance AI Developer',
    role: 'AI/ML Developer',
    date: '2024 – Present',
    active: true,
    subtitle: 'AI APPLICATIONS & INTELLIGENT SOFTWARE',
    desc: 'Building AI applications, legal assistants, conversational agents, and intelligent software products for real-world use cases.',
    bullets: [
      'Built LLM-powered legal assistants with RAG and document understanding.',
      'Developed intelligent chatbots and AI agents for multiple industries.',
      'End-to-end development of scalable AI applications and APIs.'
    ],
    tags: ['Python', 'LangChain', 'FastAPI', 'React', 'ChromaDB', 'PostgreSQL', 'OpenAI']
  }
]

export default function ExperienceSection() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track scroll progress of the entire section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Smooth spring motion for progress line filling
  const scaleYSpring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  })

  // Fade out line near the projects section transition
  const opacityTransform = useTransform(scrollYProgress, [0.88, 0.98], [1, 0])
  const timelineOpacity = useSpring(opacityTransform, { stiffness: 90, damping: 25 })

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      className="w-full bg-[#f8f9fb] relative select-none overflow-hidden"
    >
      {/* Editorial Container with max 1400px width and generous side padding */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-20 relative">
        
        {/* Centered Editorial Header */}
        <div style={{ marginBottom: '100px' }} className="flex flex-col items-center text-center w-full">
          <div className="flex flex-col items-center mb-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-[#3b6fd4] uppercase">
              01 / JOURNEY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b6fd4] mt-2 mb-4" />
          </div>
          <h2 className="font-sans font-extrabold text-5xl md:text-[56px] text-[#0f1f4b] tracking-tight leading-none">
            Work Experience
          </h2>
          <p className="text-[14px] text-gray-500 font-sans mt-4 max-w-lg leading-relaxed font-normal">
            A curated chronological timeline showcasing my evolution as an AI/ML developer and engineer.
          </p>
        </div>

        {/* Timeline Content Axis Column */}
        <div className="relative w-full pt-6">
          
          {/* VERTICAL TRACK LINE (2px solid dark navy #0f1f4b spine) */}
          <motion.div
            style={{ opacity: timelineOpacity }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-24 w-[2px] pointer-events-none z-10"
          >
            {/* Background Light-Navy Spine */}
            <div className="w-full h-full bg-[#0f1f4b]/10 rounded-full" />
            
            {/* Scroll-driven Navy Progress Fill */}
            <motion.div
              style={{
                scaleY: scaleYSpring,
                transformOrigin: 'top'
              }}
              className="absolute inset-x-0 top-0 bottom-0 bg-[#0f1f4b] rounded-full"
            />
          </motion.div>

          {/* TIMELINE LIST */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-20">
            {experiences.map((exp, idx) => {
              const isNodeActive = activeIndex === idx

              return (
                <motion.div
                  key={exp.id}
                  id={exp.id}
                  onViewportEnter={() => setActiveIndex(idx)}
                  viewport={{ once: false, amount: 0.4 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  className="relative w-full min-h-[220px]"
                >
                  {/* MOBILE ONLY NODE (Absolute positioned at left-6, hidden on desktop) */}
                  <div className="absolute left-6 -translate-x-1/2 top-4 flex md:hidden items-center justify-center z-30 pt-3">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                          exp.active ? 'bg-[#0f1f4b] border-[#0f1f4b] text-white' : 'bg-white border-[#e2e8f0] text-[#0f1f4b]'
                        }`}
                      >
                        <span className="font-sans text-[13px] font-bold">
                          {exp.num}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3-COLUMN LAYOUT: Left (Company), Center (Node gap), Right (Details Card) */}
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_120px_1fr] w-full items-start gap-4 md:gap-0">
                    
                    {/* Left Column: Date + Company + Role */}
                    <div className="w-full flex flex-col text-left md:text-right pl-16 pr-8 md:pl-0 md:pr-0 pt-3 md:justify-start">
                      <span className="text-[12px] font-sans font-bold text-[#3b6fd4] tracking-wide mb-1.5 uppercase">
                        {exp.date}
                      </span>
                      <h4 className="font-sans font-extrabold text-2xl md:text-[26px] text-[#0f1f4b] tracking-tight leading-tight">
                        {exp.company}
                      </h4>
                      <span className="text-[13px] text-gray-500 font-sans font-medium mt-1">
                        {exp.role}
                      </span>
                    </div>

                    {/* Center Column: Node (Desktop Grid Node - Aligns perfectly and stays separated) */}
                    <div className="hidden md:flex items-center justify-center w-full pt-3">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        
                        {/* Glowing outer aura rings for active node */}
                        <motion.div
                          animate={{
                            scale: isNodeActive ? 1.35 : 0,
                            opacity: isNodeActive ? 0.35 : 0
                          }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 rounded-full bg-[#0f1f4b]/15 blur-[4px]"
                        />
                        
                        {/* Central Circle Badge with Number */}
                        <motion.div
                          animate={{
                            scale: isNodeActive ? 1.1 : 1,
                            borderColor: isNodeActive ? '#0f1f4b' : '#e2e8f0',
                            backgroundColor: exp.active ? '#0f1f4b' : '#ffffff',
                            boxShadow: isNodeActive 
                              ? '0 6px 20px rgba(15,31,75,0.2)' 
                              : '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ borderStyle: 'solid' }}
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-30"
                        >
                          <span className={`font-sans text-[13px] font-bold ${exp.active ? 'text-white' : 'text-[#0f1f4b]'}`}>
                            {exp.num}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right Column: Detailed Experience Card */}
                    <div className="w-full flex items-start justify-start pl-8 pr-16 md:pl-0 md:pr-0">
                      <motion.div
                        animate={{
                          opacity: isNodeActive ? 1 : 0.85,
                          y: isNodeActive ? 0 : 4
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-[580px] text-left relative bg-white !border !border-[#e2e8f0] !rounded-[16px] !p-6 md:!p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 group"
                      >
                        {/* Category Label */}
                        <span className="block text-[10px] font-bold tracking-[0.15em] text-[#3b6fd4] uppercase !mb-3.5 select-none">
                          {exp.subtitle}
                        </span>
                        
                        {/* Summary Paragraph */}
                        <p className="text-[14px] leading-relaxed text-[#475569] font-sans !mb-5">
                          {exp.desc}
                        </p>

                        {/* Bullet Points with sparkle prefix icon in blue */}
                        <div className="flex flex-col gap-3.5 !mb-6">
                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#475569] font-sans">
                              <span className="text-[#3b6fd4] font-bold select-none mt-0.5">✦</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Label & navy border pills */}
                        <div className="!border-t !border-[#e2e8f0] !pt-5 !mt-5">
                          <h4 className="block text-[10px] font-mono font-bold tracking-[0.15em] text-[#94a3b8] uppercase !mb-3 select-none">
                            TECH STACK
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <span
                                key={`${exp.id}-${tag}`}
                                className="inline-block text-[10px] font-bold font-mono text-[#0f1f4b] !border !border-[#0f1f4b] !px-3.5 !py-1.5 !rounded-full bg-white hover:bg-[#0f1f4b] hover:text-white hover:scale-105 transition-all duration-200 cursor-default select-none"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </div>

                </motion.div>
              )
            })}
          </div>

          {/* FOOTER: Below last entry, sparkle icon and italic journey continues */}
          <div style={{ marginTop: '80px' }} className="flex items-center justify-center gap-2 relative z-20 select-none">
            <span className="text-[#3b6fd4] text-sm font-bold">✦</span>
            <span className="text-[13px] text-gray-500 font-sans italic">
              The journey continues...
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}
