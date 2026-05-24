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

export default function App() {
  const [showHero, setShowHero] = useState(true)
  const [active, setActive] = useState('Landing')

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
          else if (id === 'experience') setActive('WORK')
          else if (id === 'work') setActive('WORK')
          else if (id === 'skills') setActive('SKILLS')
          else if (id === 'cv' || id === 'extracurricular') setActive('CERTIFICATIONS')
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

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActive(section)
    }
  }, [])

  const handleViewWork = useCallback(() => handleNav('work'), [handleNav])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <Cursor />
      {showHero && <SplashLoader onDone={handleHeroDone} />}

      {/* Standard Document Flow with Sticky/Fixed Navigation */}
      <div 
        style={{ 
          opacity: showHero ? 0 : 1, 
          transition: 'opacity 0.5s ease 0.3s',
          pointerEvents: showHero ? 'none' : 'auto'
        }}
      >
        {/* Floating Top Navbar (Sticky by index.css rules) */}
        <Navbar active={active} onNav={handleNav} />

        {/* Section 1: Landing (Precisely 100vh viewport) */}
        <div id="landing" className="w-full min-h-screen bg-white relative">
          <LandingSection onViewWork={handleViewWork} />
        </div>

        {/* Section 1.25: About Me Section */}
        <div id="about" className="w-full relative" style={{ background: 'linear-gradient(to bottom, #112240, #0a0c14)' }}>
          <AboutSection />
        </div>

        {/* Section 2: Selected Work (Auto height for luxury 3-column 6-card grid) */}
        <div id="work" className="w-full relative" style={{ background: '#f8f9fb' }}>
          <WorkSection />
        </div>

        {/* Section 1.5: Curated Work Experience Journey */}
        <div id="experience" className="w-full relative" style={{ background: '#f8f9fb' }}>
          <ExperienceSection />
        </div>

        {/* Section 3: Technical Skills & Expertise */}
        <div id="skills" className="w-full bg-[#0a0c14] relative">
          <SkillsSection />
        </div>

        {/* Section 4: CV Timeline */}
        <div id="cv" className="w-full bg-[#ededed] relative">
          <CVSection />
        </div>

        {/* Section 4.5: Leadership & Extracurricular Section */}
        <div id="extracurricular" className="w-full bg-[#0a0c14] relative">
          <ExtracurricularSection />
        </div>

        {/* Section 5: Dynamic Contact & Canvas Drawing */}
        <div id="contact" className="w-full bg-[#ededed] relative flex flex-col justify-between">
          <div className="w-full flex-grow flex items-center justify-center">
            <ContactSection />
          </div>
        </div>

        {/* Section 6: Premium Footer */}
        <Footer />
      </div>
    </div>
  )
}
