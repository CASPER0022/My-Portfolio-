import React from 'react'

const skills = [
  'Python', 'JavaScript', 'SQL', 'C/C++', 'PyTorch', 'Scikit-Learn', 
  'OpenCV', 'LangGraph', 'FastAPI', 'React.js', 'ChromaDB', 'Docker', 'n8n'
]

const experiences = [
  {
    role: 'AI Intern',
    company: 'Klyonix Tech Consulting',
    period: 'Feb 2026 – Present',
    bullets: [
      'Developed a multi-tenant enterprise chatbot using hybrid RAG + Text-to-SQL architecture over PostgreSQL & MySQL.',
      'Engineered a dynamic SQL generation pipeline to retrieve key business metrics, reducing manual reporting effort by 60%.',
      'Implemented role-based access control (RBAC) at the LLM reasoning layer to enforce secure, hierarchy-based data access.'
    ]
  },
  {
    role: 'AI & Computer Vision Intern',
    company: 'AI4SEES',
    period: 'May 2025 – Aug 2025',
    bullets: [
      'Engineered an end-to-end computer vision system using YOLOv8 for real-time hazard tracking and object segmentation.',
      'Fine-tuned a custom theft detection model and optimized the inference pipeline for high-FPS video streams integrated with React.'
    ]
  }
]

const activities = [
  {
    title: 'House Captain & Badminton Sub-Lead',
    org: 'Sportec - IIITK',
    period: 'Oct 2025 – Present',
    desc: 'Led a contingent of 500+ students as Blue House Captain, coordinating athletes across 15+ events and represented IIITK in Inter-IIIT badminton tournaments.'
  },
  {
    title: 'Social Media Lead',
    org: 'Trendles Club - IIITK',
    period: 'Oct 2025 – Apr 2026',
    desc: 'Spearheaded the digital presence of the college media wing, curating technical content and hosting knowledge-sharing sessions.'
  }
]

export default function CVSection() {
  return (
    <section id="cv" className="w-full min-h-screen py-32 px-8 flex flex-col justify-center" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        
        {/* Skills Ticker */}
        <div className="overflow-hidden mb-6">
          <div className="ticker-track flex gap-4 whitespace-nowrap">
            {[...skills, ...skills, ...skills].map((t, i) => (
              <span key={i} className="text-[10px] font-mono text-gray-500 font-semibold tracking-wider uppercase border border-gray-200/80 px-3.5 py-1.5 rounded-full bg-white/70 shadow-sm">
                ✦ {t}
              </span>
            ))}
          </div>
        </div>

        {/* Master Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Left Block: Experience (Span 7) */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div>
              <p className="text-[10px] font-mono tracking-widest font-bold text-blue-600 uppercase mb-1">Career Timeline</p>
              <h2 className="font-display font-bold text-3xl text-gray-900">Experience</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="font-sans font-bold text-base text-gray-900">{exp.role}</h3>
                      <p className="text-xs text-gray-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{exp.period}</span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-gray-500 leading-relaxed flex flex-col gap-1.5 mt-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Education & Leadership (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Education */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] font-mono tracking-widest font-bold text-blue-600 uppercase mb-1">Academic Credentials</p>
                <h2 className="font-display font-bold text-3xl text-gray-900">Education</h2>
              </div>
              
              <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <h3 className="font-sans font-bold text-[13.5px] text-gray-900">IIIT Kottayam</h3>
                  <span className="text-[9px] font-mono font-bold text-gray-400">2023 – 2027</span>
                </div>
                <p className="text-[11.5px] font-semibold text-gray-500">B.Tech in CSE (Specialization in AI & Data Science)</p>
                <p className="text-[11px] font-mono text-blue-600 mt-1">Cumulative CGPA: 8.84 / 10</p>
              </div>
            </div>

            {/* Leadership & Extracurriculars */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-gray-900">Leadership & Impact</h2>
              </div>
              
              <div className="flex flex-col gap-3">
                {activities.map((act, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-white/70 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-sans font-bold text-[12px] text-gray-900">{act.title}</h4>
                      <span className="text-[8px] font-mono text-gray-400">{act.period}</span>
                    </div>
                    <p className="text-[10.5px] font-medium text-gray-400 mb-1.5">{act.org}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
