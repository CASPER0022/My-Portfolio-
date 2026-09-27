import React, { useState, useEffect, useCallback } from 'react'
import { Analytics } from '@vercel/analytics/react'
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
import InterviewSection from './components/InterviewSection'
import InterviewDocView from './components/InterviewDocView'
import SecretProjectsSection from './components/SecretProjectsSection'
import AllMaterialsView from './components/AllMaterialsView'
import DsaConceptsSection from './components/DsaConceptsSection'
import GateConceptsSection from './components/GateConceptsSection'
import { projects } from './data/projects'
import { findMaterialById } from './data/materials'

// --- Lightweight History-API router -----------------------------------
// This app is a single page of scroll sections plus a handful of
// full-screen "pages" (a project's details, a placement-material doc,
// the all-materials list, the secret-projects list, the DSA list).
// Each full-screen page is represented as an entry in a `stack`. The top
// of the stack is what's rendered; pushing a screen updates the URL via
// pushState, and the browser Back button (popstate) restores the exact
// stack that was current at that point in history, so Back always closes
// the current page instead of leaving the site.

const HOME_SCREEN = { type: 'home' }

function pathForScreen(screen) {
  switch (screen.type) {
    case 'project-doc':
      return `/projects/${screen.project.id}`
    case 'material-doc':
      return `/materials/${screen.material.id}`
    case 'materials-list':
      return '/materials'
    case 'dsa-list':
      return '/dsa-concepts'
    case 'gate-list':
      return '/gate-concepts'
    case 'secret-list':
      return '/secret-projects'
    default:
      return '/'
  }
}

// Resolves whatever full-screen page a URL path points to, so a direct
// visit or a hard refresh on a deep link (e.g. /materials/dbms) lands on
// the right page instead of always showing the home landing section.
function resolveStackFromPath(pathname) {
  const projectMatch = pathname.match(/^\/projects\/([^/]+)\/?$/)
  if (projectMatch) {
    const project = projects.find((p) => String(p.id) === projectMatch[1])
    if (project) return [HOME_SCREEN, { type: 'project-doc', project }]
  }

  const materialMatch = pathname.match(/^\/materials\/([^/]+)\/?$/)
  if (materialMatch) {
    if (materialMatch[1] === 'dsa') return [HOME_SCREEN, { type: 'dsa-list' }]
    if (materialMatch[1] === 'gate') return [HOME_SCREEN, { type: 'gate-list' }]
    const material = findMaterialById(materialMatch[1])
    if (material) return [HOME_SCREEN, { type: 'material-doc', material }]
  }

  if (/^\/materials\/?$/.test(pathname)) return [HOME_SCREEN, { type: 'materials-list' }]
  if (/^\/dsa-concepts\/?$/.test(pathname)) return [HOME_SCREEN, { type: 'dsa-list' }]
  if (/^\/gate-concepts\/?$/.test(pathname)) return [HOME_SCREEN, { type: 'gate-list' }]
  if (/^\/secret-projects\/?$/.test(pathname)) return [HOME_SCREEN, { type: 'secret-list' }]

  return [HOME_SCREEN]
}

export default function App() {
  const [showHero, setShowHero] = useState(true)
  const [active, setActive] = useState('Landing')
  const [stack, setStack] = useState(() => resolveStackFromPath(window.location.pathname))

  const current = stack[stack.length - 1]

  // Attach the resolved stack to the initial history entry (replacing,
  // not pushing) so that a later Back press has correct state to restore,
  // and so an unresolvable deep link corrects the URL back to "/".
  useEffect(() => {
    window.history.replaceState({ stack }, '', pathForScreen(current))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Browser Back/Forward: restore whatever stack was active at that point
  // in history, and (when landing back on the home screen) scroll to the
  // section the user was viewing before they opened the sub-page.
  useEffect(() => {
    const onPopState = (event) => {
      const restored = (event.state && event.state.stack) || [HOME_SCREEN]
      const leaving = stack[stack.length - 1]
      const landingOnHome = restored.length === 1 && restored[0].type === 'home'

      setStack(restored)

      if (landingOnHome) {
        let anchor = null
        if (leaving.type === 'project-doc') anchor = 'work'
        else if (leaving.type === 'material-doc') anchor = 'interview'

        if (anchor) {
          setTimeout(() => {
            const el = document.getElementById(anchor)
            if (el) el.scrollIntoView({ behavior: 'instant' })
          }, 80)
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [stack])

  const navigate = useCallback((newStack) => {
    const top = newStack[newStack.length - 1]
    window.history.pushState({ stack: newStack }, '', pathForScreen(top))
    setStack(newStack)
  }, [])

  const goBack = useCallback(() => {
    window.history.back()
  }, [])

  const handleHeroDone = useCallback(() => {
    setShowHero(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Detect active section on standard scroll using high-performance IntersectionObserver
  useEffect(() => {
    if (showHero) return

    const sections = ['landing', 'about', 'work', 'experience', 'interview', 'skills', 'cv', 'extracurricular', 'contact']
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          // Capitalize active state to match Navbar links
          if (id === 'landing') setActive('Landing')
          else if (id === 'about') setActive('ABOUT')
          else if (id === 'work') setActive('PROJECTS')
          else if (id === 'experience') setActive('EXPERIENCE')
          else if (id === 'interview') setActive('PLACEMENT MATERIALS')
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
    if (id === 'placement materials' || id === 'placement' || id === 'interview' || id === 'interview prep') id = 'interview'
    if (id === 'certifications') id = 'cv'

    setStack((prevStack) => {
      if (prevStack.length > 1) {
        window.history.pushState({ stack: [HOME_SCREEN] }, '', '/')
        return [HOME_SCREEN]
      }
      return prevStack
    })

    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setActive(section)
      }
    }, 50)
  }, [])

  const handleViewWork = useCallback(() => handleNav('PROJECTS'), [handleNav])
  const handleViewMaterials = useCallback(() => handleNav('PLACEMENT MATERIALS'), [handleNav])

  const openMaterial = useCallback((material) => {
    if (material.id === 'dsa') {
      navigate([...stack, { type: 'dsa-list' }])
    } else if (material.id === 'gate') {
      navigate([...stack, { type: 'gate-list' }])
    } else {
      navigate([...stack, { type: 'material-doc', material }])
    }
  }, [navigate, stack])

  const navbarActive = current.type === 'project-doc'
    ? 'PROJECTS'
    : current.type === 'material-doc' || current.type === 'materials-list' || current.type === 'dsa-list' || current.type === 'gate-list' || current.type === 'secret-list'
      ? 'PLACEMENT MATERIALS'
      : active

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <Cursor />
      {showHero && <SplashLoader onDone={handleHeroDone} />}

      {/* Floating Top Navbar (Sticky by index.css rules) */}
      {!showHero && (
        <Navbar
          active={navbarActive}
          onNav={handleNav}
        />
      )}

      {/* Conditionally display separate Material/Project Page */}
      {current.type === 'material-doc' ? (
        <InterviewDocView
          material={current.material}
          onBack={goBack}
        />
      ) : current.type === 'project-doc' ? (
        <ProjectDetailsView
          project={current.project}
          onBack={goBack}
        />
      ) : current.type === 'secret-list' ? (
        <SecretProjectsSection
          onSelectMaterial={(material) => navigate([...stack, { type: 'material-doc', material }])}
          onBack={goBack}
        />
      ) : current.type === 'dsa-list' ? (
        <DsaConceptsSection
          onSelectMaterial={(material) => navigate([...stack, { type: 'material-doc', material }])}
          onBack={goBack}
        />
      ) : current.type === 'gate-list' ? (
        <GateConceptsSection
          onSelectMaterial={(material) => navigate([...stack, { type: 'material-doc', material }])}
          onBack={goBack}
        />
      ) : current.type === 'materials-list' ? (
        <AllMaterialsView
          onSelectMaterial={openMaterial}
          onBack={goBack}
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
          <LandingSection onViewWork={handleViewWork} onViewMaterials={handleViewMaterials} />
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
            <WorkSection onSelectProject={(project) => navigate([...stack, { type: 'project-doc', project }])} />
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
        </div>

        {/* Section 1.75: Placement & Interview Materials */}
        <div id="interview" className="w-full relative overflow-hidden" style={{ background: '#f8f9fb' }}>
          {/* Background Image Layer with reduced opacity */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('luxury_topo_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <InterviewSection
              onSelectMaterial={openMaterial}
              onViewAll={() => {
                navigate([...stack, { type: 'materials-list' }])
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
            />
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
        <Footer onSecretClick={() => {
          navigate([...stack, { type: 'secret-list' }])
          window.scrollTo({ top: 0, behavior: 'instant' })
        }} />
      </div>
      )}
      <Analytics />
    </div>
  )
}
