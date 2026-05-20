import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
