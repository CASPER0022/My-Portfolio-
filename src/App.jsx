import React, { useState, useEffect, useCallback } from 'react'
import Cursor from './components/Cursor'
import SplashLoader from './components/SplashLoader'
import Navbar from './components/Navbar'
import LandingSection from './components/LandingSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import WorkSection from './components/WorkSection'
import SkillsSection from './components/SkillsSection'
import CVSection from './components/CVSection'
import ExtracurricularSection from './components/ExtracurricularSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ProjectDetailsView from './components/ProjectDetailsView'

export default function App() {
  const [showHero, setShowHero] = useState(true)
  const [active, setActive] = useState('Landing')
  const [selectedProject, setSelectedProject] = useState(null)

  const handleHeroDone = useCallback(() => {
    setShowHero(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Detect active section on standard scroll using high-performance IntersectionObserver
  useEffect(() => {
    if (showHero) return

    const sections = ['landing', 'about', 'work', 'experience', 'skills', 'cv', 'extracurricular', 'contact']
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          // Capitalize active state to match Navbar links
          if (id === 'landing') setActive('Landing')
          else if (id === 'about') setActive('ABOUT')
          else if (id === 'work') setActive('PROJECTS')
          else if (id === 'experience') setActive('EXPERIENCE')
          else if (id === 'skills') setActive('SKILLS')
          else if (id === 'cv') setActive('CERTIFICATIONS')
          else if (id === 'extracurricular') setActive('EXTRACURRICULAR')
          else if (id === 'contact') setActive('CONTACT')
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger exactly when section occupies center focus
      threshold: 0
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [showHero])

  const handleNav = useCallback((section) => {
    let id = section.toLowerCase()
    if (id === 'landing' || id === 'hero') id = 'landing'
    if (id === 'projects') id = 'work'
    if (id === 'certifications') id = 'cv'

    setSelectedProject(null)

    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setActive(section)
      }
    }, 50)
  }, [])

  const handleViewWork = useCallback(() => handleNav('PROJECTS'), [handleNav])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <Cursor />
      {showHero && <SplashLoader onDone={handleHeroDone} />}

      {/* Floating Top Navbar (Sticky by index.css rules) */}
      {!showHero && <Navbar active={selectedProject ? 'PROJECTS' : active} onNav={handleNav} />}

      {/* Conditionally display separate Project Page */}
      {selectedProject ? (
        <ProjectDetailsView 
          project={selectedProject} 
          onBack={() => {
            setSelectedProject(null)
            setTimeout(() => {
              const el = document.getElementById('work')
              if (el) el.scrollIntoView({ behavior: 'instant' })
            }, 80)
          }} 
        />
      ) : (
        /* Standard Document Flow with Sticky/Fixed Navigation */
        <div 
        style={{ 
          opacity: showHero ? 0 : 1, 
          transition: 'opacity 0.5s ease 0.3s',
          pointerEvents: showHero ? 'none' : 'auto'
        }}
      >

        {/* Section 1: Landing (Precisely 100vh viewport) */}
        <div id="landing" className="w-full min-h-screen bg-white relative">
          <LandingSection onViewWork={handleViewWork} />
        </div>

        {/* Section 1.25: About Me Section */}
        <div id="about" className="w-full relative" style={{ background: 'linear-gradient(to bottom, #112240, #0a0c14)' }}>
          {/* Top smooth light-to-dark transition out of Landing section */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to bottom, #ffffff, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          <AboutSection />
        </div>

        {/* Section 2: Selected Work (Auto height for luxury 3-column 6-card grid) */}
        <div id="work" className="w-full relative overflow-hidden" style={{ background: '#f8f9fb' }}>
          {/* Top smooth dark transition out of About section */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to bottom, #0a0c14, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          {/* Background Image Layer with reduced opacity */}
          <div 
            style={{ 
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('luxury_topo_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15, // Extremely subtle luxury topographic contours
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <WorkSection onSelectProject={setSelectedProject} />
          </div>
        </div>

        {/* Section 1.5: Curated Work Experience Journey */}
        <div id="experience" className="w-full relative overflow-hidden" style={{ background: '#f8f9fb' }}>
          {/* Background Image Layer with reduced opacity */}
          <div 
            style={{ 
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('experience_topo_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15, // Barely visible, subtle luxury architectural lines
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <ExperienceSection />
          </div>
          {/* Bottom smooth dark transition into Skills section */}
          <div 
            style={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to top, #0a0c14, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Section 3: Technical Skills & Expertise */}
        <div id="skills" className="w-full relative overflow-hidden" style={{ background: '#0a0c14' }}>
          {/* Background Image Layer with reduced opacity */}
          <div 
            style={{ 
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('skills_tech_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.25, // Subtle, luxurious futuristic technology node patterns
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SkillsSection />
          </div>
        </div>

        {/* Section 4: CV Timeline */}
        <div id="cv" className="w-full relative overflow-hidden" style={{ background: '#ededed' }}>
          {/* Top smooth dark-to-light transition out of Skills section */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to bottom, #0a0c14, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          {/* Background Image Layer with reduced opacity */}
          <div 
            style={{ 
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('cv_timeline_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15, // Extremely subtle academic vector curves
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <CVSection />
          </div>
        </div>

        {/* Section 4.5: Leadership & Extracurricular Section */}
        <div id="extracurricular" className="w-full bg-[#0a0c14] relative">
          {/* Top smooth light-to-dark transition out of CV section */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to bottom, #ededed, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          <ExtracurricularSection />
        </div>

        {/* Section 5: Dynamic Contact & Canvas Drawing */}
        <div id="contact" className="w-full bg-[#ededed] relative flex flex-col justify-between overflow-hidden">
          {/* Top smooth dark-to-light transition out of Extracurricular section */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '10px',
              background: 'linear-gradient(to bottom, #0a0c14, transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          <div className="w-full flex-grow flex items-center justify-center">
            <ContactSection />
          </div>
        </div>

        {/* Section 6: Premium Footer */}
        <Footer />
      </div>
      )}
    </div>
  )
}
