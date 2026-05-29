import React, { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const experiences = [
  {
    id: 'exp-1',
    num: '1',
    company: 'Idukki Origins · Part-time',
    logo: 'experience/idukki origins logo.png',
    role: 'Founder & Full-Stack Developer',
    date: 'May 2026 – Present',
    active: true,
    subtitle: 'E-COMMERCE & FULL-STACK DEVELOPMENT',
    desc: 'Engineered and deployed a high-performance e-commerce platform for authentic spices, utilizing React (Vite) on the frontend and Node.js/Express on the backend.',
    bullets: [
      'Designed a responsive, modern UI/UX with Tailwind CSS v4 and designed the global state using the React Context API to ensure seamless, real-time cart and catalog updates',
      'Implemented secure user authentication and authorization utilizing JSON Web Tokens (JWT) and bcryptjs password encryption',
      'Modeled and managed relational database schemas using Prisma ORM coupled with a cloud-hosted PostgreSQL (Neon Serverless) database',
      'Integrated the Razorpay Node SDK to build a secure, frictionless payment overlay workflow with instant payment verification',
      'Acted as sole product owner, overseeing everything from raw spice sourcing and branding to deployment and business strategy'
    ],
    tags: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Razorpay']
  },
  {
    id: 'exp-2',
    num: '2',
    company: 'KlyONIX Tech Consulting Pvt Ltd.',
    logo: 'experience/klyonix.jpg',
    role: 'AI/ML Intern',
    date: '2026 Feb – Present',
    active: true,
    subtitle: 'AI INTEGRATION & INTELLIGENT SYSTEMS',
    desc: 'Working on AI-powered CRM systems, customer support agents, RAG pipelines, LangGraph workflows, testing AI integrations, and intelligent automation solutions.',
    bullets: [
      'Developed a multi-tenant enterprise chatbot using hybrid RAG + Text-to-SQL architecture to enable natural language querying over relational databases (PostgreSQL, MySQL) and real-time business insights',
      'Engineered a dynamic SQL generation pipeline to retrieve key metrics (sales, profit, attendance), reducing manual reporting effort by 60%, and optimized prompt-chaining for accurate handling of complex temporal queries and multi-table joins',
      'Implemented role-based access control (RBAC) at the LLM reasoning layer to enforce secure, hierarchy-based data access while ensuring high accuracy in natural language to SQL translation'
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'React', 'ChromaDB', 'OpenAI']
  },
  {
    id: 'exp-3',
    num: '3',
    company: 'AI4SEES',
    logo: 'experience/ai4sees.jpg',
    role: 'AI & Web Dev Intern',
    date: '2025 May - 2025 August',
    active: false,
    subtitle: 'ROBOTICS & MULTI-AGENT SYSTEMS',
    desc: 'Developing intelligent robotic systems, multi-agent decision frameworks, and production-safe AI workflows.',
    bullets: [
      'Engineered an end-to-end computer vision system using YOLOv8 for real-time object detection, segmentation,and hazard tracking, and fine-tuned a theft detection model on edge-case datasets to improve performance in high-noise environments',
      'Optimized the inference pipeline for high-FPS video streams and integrated ML outputs with a responsive React.js frontend for real-time visualization and monitoring'
    ],
    tags: ['PyTorch', 'OpenCV','YoloV8', 'LangGraph', 'FastAPI', 'Python', 'Docker']
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
      style={{ paddingTop: '120px', paddingBottom: '60px', background: 'transparent' }}
      className="w-full relative select-none overflow-hidden"
    >
      {/* Editorial Container with max 1400px width and generous side padding */}
      <div 
        className="max-w-[1400px] w-full px-6 md:px-20 relative"
        style={{
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative'
        }}
      >
        
        {/* Centered Editorial Header */}
        <div 
          style={{
            marginBottom: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
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
            className="hidden md:block absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-24 w-[2px] pointer-events-none z-10"
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
              const isEven = idx % 2 === 0

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
                  {/* 3-COLUMN LAYOUT: Left (Company), Center (Node gap), Right (Details Card) */}
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_120px_1fr] w-full items-start gap-4 md:gap-0">
                    
                    {/* Left Column: Date + Company + Role */}
                    <div className={`w-full flex flex-col text-left pl-0 pr-0 pt-3 md:justify-start ${isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-3'}`}>
                      
                      {/* Logo rendered directly above date on mobile */}
                      <div className="flex md:hidden items-center justify-start mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl border-2 bg-white flex items-center justify-center p-2 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
                            exp.active ? 'border-[#0f1f4b]' : 'border-[#e2e8f0]'
                          }`}
                        >
                          {exp.logo ? (
                            <img 
                              src={exp.logo} 
                              alt={`${exp.company} logo`} 
                              className="w-full h-full object-contain rounded-xl" 
                              style={{ imageRendering: 'high-quality' }}
                            />
                          ) : (
                            <span className="font-sans text-[13px] font-bold text-[#0f1f4b]">
                              {exp.num}
                            </span>
                          )}
                        </div>
                      </div>

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
                    <div className="hidden md:flex items-center justify-center w-full pt-3 md:order-2">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        
                        {/* Glowing outer aura rings for active node */}
                        <motion.div
                          animate={{
                            scale: isNodeActive ? 1.35 : 0,
                            opacity: isNodeActive ? 0.35 : 0
                          }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 rounded-full bg-[#0f1f4b]/15 blur-[4px]"
                        />
                        
                        {/* Central Circle Badge with Logo */}
                        <motion.div
                          animate={{
                            scale: isNodeActive ? 1.1 : 1,
                            borderColor: isNodeActive ? '#0f1f4b' : '#e2e8f0',
                            boxShadow: isNodeActive 
                              ? '0 6px 20px rgba(15,31,75,0.2)' 
                              : '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ borderStyle: 'solid' }}
                          className="w-18 h-18 rounded-full border-2 bg-white flex items-center justify-center z-30 p-2 overflow-hidden"
                        >
                          {exp.logo ? (
                            <img 
                              src={exp.logo} 
                              alt={`${exp.company} logo`} 
                              className="w-full h-full object-contain rounded-full" 
                              style={{ imageRendering: 'high-quality' }}
                            />
                          ) : (
                            <span className={`font-sans text-[13px] font-bold ${exp.active ? 'text-white' : 'text-[#0f1f4b]'}`}>
                              {exp.num}
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Right Column: Detailed Experience Card */}
                    <div className={`w-full flex items-start justify-start pl-0 pr-0 ${isEven ? 'md:justify-start md:order-3' : 'md:justify-end md:order-1'}`}>
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
