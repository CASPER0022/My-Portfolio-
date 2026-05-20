import React from 'react'

export default function NeuralNetViz() {
  const L = [
    { x: 60,  ys: [110,175,240,305,370] },
    { x: 190, ys: [80,145,210,275,340,405] },
    { x: 320, ys: [80,145,210,275,340,405] },
    { x: 450, ys: [110,175,240,305,370] },
    { x: 560, ys: [175,240,305] },
  ]
  const labels = [
    { x: 60, y: 52, text: 'INPUT' },
    { x: 255, y: 52, text: 'HIDDEN LAYERS' },
    { x: 450, y: 52, text: 'ENCODER' },
    { x: 560, y: 52, text: 'OUTPUT' },
  ]
  const floats = [
    { x: 640, y: 110, text: 'Transformer' },
    { x: 640, y: 200, text: 'Attention' },
    { x: 640, y: 290, text: 'Embeddings' },
    { x: 640, y: 380, text: 'Inference' },
  ]
  // Build all edges between adjacent layers
  const edges = []
  L.slice(0,-1).forEach((layer, li) =>
    layer.ys.forEach(y1 =>
      L[li+1].ys.forEach(y2 =>
        edges.push({ x1: layer.x, y1, x2: L[li+1].x, y2, key: `${li}-${y1}-${y2}` })
      )
    )
  )
  // Pick ~12 edges for animated data flow dots
  const animated = edges.filter((_,i) => i % 8 === 0).slice(0,14)

  return (
    <div className="viz-container" style={{ height: '100%', minHeight: 480 }}>
      <svg viewBox="0 0 750 470" style={{ width: '100%', maxWidth: 560, overflow: 'visible' }}>
        <defs>
          <radialGradient id="nodeGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#081C4D" />
          </radialGradient>
          <radialGradient id="nodeGradActive" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(37,99,235,0.5)" />
          </marker>
        </defs>

        {/* Blueprint grid */}
        {Array.from({length:8}).map((_,i) => (
          <line key={`gv${i}`} x1={i*110} y1={0} x2={i*110} y2={470}
            stroke="rgba(8,28,77,0.04)" strokeWidth="0.8" />
        ))}
        {Array.from({length:5}).map((_,i) => (
          <line key={`gh${i}`} x1={0} y1={i*118} x2={750} y2={i*118}
            stroke="rgba(8,28,77,0.04)" strokeWidth="0.8" />
        ))}

        {/* Edges */}
        {edges.map(e => (
          <line key={e.key}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(37,99,235,0.12)" strokeWidth="0.8"
            className="edge-pulse"
            style={{ animationDelay: `${Math.random()*2}s` }}
          />
        ))}

        {/* Animated data-flow dots */}
        {animated.map((e, i) => (
          <circle key={`dot${i}`} r="3" fill="#2563EB" opacity="0.85">
            <animateMotion
              dur={`${1.8 + i * 0.3}s`}
              repeatCount="indefinite"
              path={`M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`}
            />
          </circle>
        ))}

        {/* Nodes */}
        {L.map((layer, li) =>
          layer.ys.map((y, ni) => (
            <g key={`n${li}-${ni}`} filter="url(#nodeGlow)">
              <circle cx={layer.x} cy={y} r={7} fill="url(#nodeGrad)" />
              <circle cx={layer.x} cy={y} r={3} fill="rgba(255,255,255,0.9)" className="node-pulse"
                style={{ animationDelay: `${(li+ni)*0.4}s` }} />
            </g>
          ))
        )}

        {/* Layer labels */}
        {labels.map((l,i) => (
          <text key={i} x={l.x} y={l.y} textAnchor="middle"
            fill="rgba(8,28,77,0.35)" fontSize="8"
            fontFamily="JetBrains Mono,monospace" letterSpacing="0.15em">
            {l.text}
          </text>
        ))}

        {/* Floating concept labels */}
        {floats.map((f,i) => (
          <g key={i} className="float-label" style={{ animationDelay: `${i*0.7}s` }}>
            <rect x={f.x} y={f.y-10} width={80} height={18} rx={4}
              fill="rgba(37,99,235,0.07)" stroke="rgba(37,99,235,0.2)" strokeWidth="0.8"/>
            <text x={f.x+40} y={f.y+2} textAnchor="middle" dominantBaseline="middle"
              fill="rgba(37,99,235,0.8)" fontSize="7.5"
              fontFamily="JetBrains Mono,monospace">{f.text}</text>
          </g>
        ))}

        {/* Connecting lines to float labels */}
        {floats.map((f,i) => (
          <line key={`fl${i}`} x1={560} y1={L[4].ys[Math.min(i,2)]} x2={f.x} y2={f.y}
            stroke="rgba(37,99,235,0.18)" strokeWidth="0.7" strokeDasharray="4,3"
            markerEnd="url(#arrow)" />
        ))}

        {/* System label */}
        <text x={375} y={455} textAnchor="middle"
          fill="rgba(8,28,77,0.25)" fontSize="7.5"
          fontFamily="JetBrains Mono,monospace" letterSpacing="0.2em">
          DEEP LEARNING ARCHITECTURE · 6-LAYER MLP
        </text>
      </svg>
    </div>
  )
}
