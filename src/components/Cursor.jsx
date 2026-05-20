import React, { useState, useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px'
        ref.current.style.top = e.clientY + 'px'
      }
    }
    const over = (e) => {
      setHovering(
        e.target.closest('a, button, .project-card, .sticker, nav a') !== null
      )
    }
    
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return <div ref={ref} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
}
