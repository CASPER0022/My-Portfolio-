import React, { useState, useEffect, useRef } from 'react'

export default function ApproachSection() {
  const [linesVisible, setLinesVisible] = useState(false)
  const [activeNode, setActiveNode] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setLinesVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const nodes = [
    { label: 'Ingest',    x: 12, y: 12 },
    { label: 'Analyze',   x: 12, y: 32 },
    { label: 'Model',     x: 12, y: 52 },
    { label: 'Agentic',   x: 12, y: 72 },
    { label: 'Deploy',    x: 12, y: 90 },
  ]
  const conceptX = 50, conceptY = 36
  const expX = 72, expY = 66

  return (
    <section id="approach" ref={ref} className="relative w-full min-h-screen py-32 flex flex-col justify-center" style={{ background: 'transparent' }}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-4 font-sans">Systemic Approach</p>
        <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}>
          Different datasets.<br />One intelligence.
        </h2>
        <p className="text-gray-400 max-w-md text-base leading-relaxed">
          I bridge the gap between unstructured data, advanced machine intelligence, and high-performance user interfaces.
        </p>
      </div>

      {/* Interactive node diagram */}
      <div className="w-full px-4 pb-16" style={{ height: '420px', position: 'relative' }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Lines: source nodes → Concept */}
          {nodes.map((n, i) => (
            <path key={`lc${i}`}
              className={`node-line ${linesVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
              d={`M ${n.x + 10} ${n.y} C ${(n.x + conceptX) / 2} ${n.y}, ${(n.x + conceptX) / 2} ${conceptY}, ${conceptX - 8} ${conceptY}`}
              fill="none" stroke="rgba(100,140,220,0.45)" strokeWidth="0.4"
            />
          ))}
          {/* Lines: Concept → Experience */}
          <path className={`node-line ${linesVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.8s' }}
            d={`M ${conceptX + 8} ${conceptY} C ${(conceptX + expX) / 2} ${conceptY}, ${(conceptX + expX) / 2} ${expY}, ${expX - 10} ${expY}`}
            fill="none" stroke="rgba(100,140,220,0.45)" strokeWidth="0.4"
          />
          {/* Lines: Experience → right edge */}
          <path className={`node-line ${linesVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '1s' }}
            d={`M ${expX + 14} ${expY} C 90 ${expY}, 95 ${expY - 5}, 100 ${expY - 10}`}
            fill="none" stroke="rgba(100,140,220,0.3)" strokeWidth="0.4"
          />
          {nodes.map((n, i) => (
            <g key={`n${i}`} style={{ cursor: 'none' }} onMouseEnter={() => setActiveNode(n.label)} onMouseLeave={() => setActiveNode(null)}>
              <rect x={n.x - 1} y={n.y - 4} width="22" height="8" rx="4"
                fill={activeNode === n.label ? '#1e3a6e' : '#0f1729'}
                stroke={activeNode === n.label ? 'rgba(100,160,255,0.6)' : 'rgba(80,120,200,0.3)'}
                strokeWidth="0.3" style={{ transition: 'all 0.3s' }} />
              <text x={n.x + 10} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="2.5" fontFamily="Syne, sans-serif" fontWeight="600">{n.label}</text>
            </g>
          ))}
          {/* Concept node */}
          <g onMouseEnter={() => setActiveNode('Inference')} onMouseLeave={() => setActiveNode(null)}>
            <ellipse cx={conceptX} cy={conceptY} rx="9" ry="5"
              fill={activeNode === 'Inference' ? '#1e3a6e' : '#0f1729'}
              stroke="rgba(80,120,200,0.4)" strokeWidth="0.3" style={{ transition: 'all 0.3s' }} />
            <text x={conceptX} y={conceptY} textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="2.8" fontFamily="Syne, sans-serif" fontWeight="700">Inference</text>
          </g>
          {/* Experience node */}
          <g onMouseEnter={() => setActiveNode('Intelligence')} onMouseLeave={() => setActiveNode(null)}>
            <ellipse cx={expX} cy={expY} rx="13" ry="5.5"
              fill={activeNode === 'Intelligence' ? '#1e3a6e' : '#0f1729'}
              stroke="rgba(80,120,200,0.4)" strokeWidth="0.3" style={{ transition: 'all 0.3s' }} />
            <text x={expX} y={expY} textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="2.8" fontFamily="Syne, sans-serif" fontWeight="700">Intelligence</text>
          </g>
        </svg>
        {activeNode && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-blue-400 font-mono tracking-widest uppercase opacity-70">
            {activeNode} — Active Pipeline Stage
          </div>
        )}
      </div>
    </section>
  )
}
