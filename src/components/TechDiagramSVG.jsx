
import React from 'react'

const NN_LAYERS = [
  { x: 90,  nodes: [130,180,230,280,330,380] },
  { x: 250, nodes: [105,155,205,255,305,355,400] },
  { x: 420, nodes: [105,155,205,255,305,355,400] },
  { x: 590, nodes: [130,180,230,280,330,380] },
  { x: 720, nodes: [190,255,320] },
]

export default function TechDiagramSVG({ opacity = 1 }) {
  const col = `rgba(29,78,216,${opacity})`
  const colFaint = `rgba(29,78,216,${opacity * 0.45})`
  const colText = `rgba(37,99,235,${opacity * 0.85})`

  return (
    <svg
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
    >
      {/* ── GRID LINES ── */}
      {Array.from({length:14}).map((_,i)=>(
        <line key={`gv${i}`} x1={i*100} y1={0} x2={i*100} y2={900}
          stroke={colFaint} strokeWidth="0.3" />
      ))}
      {Array.from({length:10}).map((_,i)=>(
        <line key={`gh${i}`} x1={0} y1={i*100} x2={1400} y2={i*100}
          stroke={colFaint} strokeWidth="0.3" />
      ))}

      {/* ── NEURAL NETWORK CONNECTIONS ── */}
      {NN_LAYERS.slice(0,-1).map((layer,li)=>
        layer.nodes.map((y1,ni)=>
          NN_LAYERS[li+1].nodes.map((y2,nj)=>(
            <line key={`c${li}-${ni}-${nj}`}
              x1={layer.x} y1={y1}
              x2={NN_LAYERS[li+1].x} y2={y2}
              stroke={colFaint} strokeWidth="0.5"
            />
          ))
        )
      )}

      {/* ── NEURAL NETWORK NODES ── */}
      {NN_LAYERS.map((layer,li)=>
        layer.nodes.map((y,ni)=>(
          <g key={`n${li}-${ni}`}>
            <circle cx={layer.x} cy={y} r={7} fill="none" stroke={col} strokeWidth="1.4" />
            <circle cx={layer.x} cy={y} r={2.5} fill={col} />
          </g>
        ))
      )}

      {/* NN Layer labels */}
      {['INPUT','HIDDEN','HIDDEN','HIDDEN','OUTPUT'].map((label,i)=>(
        <text key={`ll${i}`} x={NN_LAYERS[i].x} y={425}
          textAnchor="middle" fill={colText}
          fontSize="9" fontFamily="JetBrains Mono,monospace" letterSpacing="0.12em">
          {label}
        </text>
      ))}

      {/* ── CIRCUIT TRACES (right half) ── */}
      {[
        'M 820 80 H 1350 M 820 80 V 160 H 1100 M 1100 160 V 80',
        'M 870 160 V 240 H 1280 M 1280 240 V 160',
        'M 940 240 V 320 H 1200 M 1200 320 V 240',
        'M 1000 320 V 400 H 1350 M 1350 400 V 320',
        'M 860 400 V 460 H 1150',
      ].map((d,i)=>(
        <path key={`ct${i}`} d={d} fill="none" stroke={col} strokeWidth="1.2" />
      ))}
      {/* Junction dots */}
      {[[820,80],[1100,160],[870,160],[1280,240],[940,240],[1200,320],[1000,320],[1350,400],[860,400]].map(([x,y],i)=>(
        <rect key={`jd${i}`} x={x-3} y={y-3} width={6} height={6} fill={col} />
      ))}
      {/* IC Chip */}
      <rect x="1050" y="190" width="80" height="40" rx="3"
        fill="none" stroke={col} strokeWidth="1.2" />
      {[-1,0,1].map(i=>(
        <g key={`ic${i}`}>
          <line x1={1050} y1={210+i*12} x2={1038} y2={210+i*12} stroke={col} strokeWidth="1" />
          <line x1={1130} y1={210+i*12} x2={1142} y2={210+i*12} stroke={col} strokeWidth="1" />
        </g>
      ))}
      <text x="1090" y="214" textAnchor="middle" fill={colText} fontSize="8"
        fontFamily="JetBrains Mono,monospace">GPU</text>
    </svg>
  )
}
