import React, { useEffect, useRef } from 'react'

export default function AIBrainReveal() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const handleMove = (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }
    const handleLeave = () => {
      mouseRef.current.active = false
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    // Setup GNN nodes (Spacious, floats in top area above title text)
    const nodeCount = 14
    const nodes = []
    const centerX = () => (canvas.width / (window.devicePixelRatio || 1)) * 0.80
    const centerY = () => 150

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 65 + Math.random() * 45
      nodes.push({
        id: i,
        angle,
        radius,
        baseRadius: radius,
        baseAngle: angle,
        x: 0,
        y: 0,
        size: 5.5 + Math.random() * 3.5, // Rescaled node size to be substantial and massive
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        glow: 0
      })
    }

    const connections = []
    for (let i = 0; i < nodeCount; i++) {
      connections.push([i, (i + 1) % nodeCount])
      const r1 = Math.floor(Math.random() * nodeCount)
      if (r1 !== i) connections.push([i, r1])
    }

    // Setup background elements (isolated white/blue coordinates, compasses, cubes, circles, squares, and equations outside GNN and MLP)
    const bgElements = []
    const elementTypes = ['crosshair', 'vector', 'packet', 'histogram', 'equation', 'dotgrid', 'compass', 'cube', 'square', 'circle']
    const mathExpressions = [
      'softmax(z)', 'W^T x + b', 'f(x) = ReLu(x)', 'grad(L_CE)', 'theta_t+1', 'd/dt', 
      'sigma(z)', 'E[x_t]', 'z ~ N(0,I)', 'Attention(Q,K,V)', 'softmax(QK^T/sqrt(d_k))',
      'Loss = -sum(y_i * log(p_i))', 'dx/dt = A x + B u', 'x_hat = A x_hat + L(y - C x_hat)'
    ]
    for (let i = 0; i < 80; i++) {
      bgElements.push({
        x: Math.random(),
        y: Math.random(),
        type: elementTypes[i % elementTypes.length],
        color: i % 2 === 0 ? 'rgba(96, 165, 250, 0.45)' : 'rgba(255, 255, 255, 0.38)',
        speedX: -0.010 - Math.random() * 0.015,
        speedY: (Math.random() - 0.5) * 0.010,
        val: i % 3 === 0 ? `[w:${(Math.random()*2-1).toFixed(2)}]` : i % 3 === 1 ? `[x:${Math.random().toFixed(2)}, y:${Math.random().toFixed(2)}]` : '0x' + Math.floor(Math.random()*256).toString(16).toUpperCase(),
        expr: mathExpressions[i % mathExpressions.length],
        rot: Math.random() * Math.PI * 2,
        rotSpeed: 0.002 + Math.random() * 0.005
      })
    }

    // Setup pipelines
    const paths = [
      {
        points: [
          { x: 120, y: 150 },
          { x: 420, y: 110 },
          { x: 740, y: 220 },
        ],
        particles: [0.1, 0.45, 0.8],
      },
      {
        points: [
          { x: 90, y: 480 },
          { x: 380, y: 560 },
          { x: 620, y: 490 },
        ],
        particles: [0.2, 0.6, 0.9],
      },
      {
        points: [
          { x: 680, y: 640 },
          { x: 880, y: 720 },
          { x: 1040, y: 620 },
        ],
        particles: [0.0, 0.35, 0.7],
      }
    ]

    // Setup equations (Vertex AI-safe standard ASCII)
    const equations = [
      { text: "Attention(Q,K,V) = softmax(Q * K^T / sqrt(d_k)) * V", x: 220, y: 240, vx: 0.16, vy: -0.05, alpha: 0.85 },
      { text: "L_CE = -1/N * sum(y * log(p))", x: 480, y: 680, vx: -0.11, vy: 0.07, alpha: 0.75 },
      { text: "h_i^(l+1) = sigmoid(sum(W_ij * h_j^l + b_i))", x: 780, y: 180, vx: 0.13, vy: 0.11, alpha: 0.8 },
      { text: "ReLU(x) = max(0, x)", x: 140, y: 580, vx: -0.07, vy: -0.04, alpha: 0.6 },
      { text: "theta_t = theta_t-1 - eta * grad(L(theta))", x: 520, y: 210, vx: 0.14, vy: -0.07, alpha: 0.8 },
      { text: "Dropout(p) = Bernoulli(1-p) * h", x: 310, y: 440, vx: 0.1, vy: 0.08, alpha: 0.7 },
      { text: "Adam(t): m_t = beta_1 * m_t-1 + (1-beta_1) * g_t", x: 620, y: 520, vx: -0.09, vy: -0.08, alpha: 0.75 },
      { text: "y_hat = Softmax(W_out * h + b_out)", x: 820, y: 390, vx: -0.12, vy: 0.1, alpha: 0.8 },
      { text: "d_model = 512, h = 8, d_ff = 2048", x: 190, y: 130, vx: 0.08, vy: 0.06, alpha: 0.65 },
      { text: "P(y|x) = exp(s_y) / sum(exp(s_j))", x: 740, y: 620, vx: 0.15, vy: -0.05, alpha: 0.85 }
    ]

    const logs = [
      'SYS.INIT: CALIBRATED',
      'GPU.TEMP: 44.8°C (OPTIMAL)',
      'MEM.ALLOC: 16.42GB/24.00GB',
      'VECTOR_SPACE_DIM: 1536 (OK)',
      'KV_CACHE: ALLOCATED',
      'ATTN_HEADS: 12/12 SYNCHRONIZED',
      'MODEL_TYPE: TRANSFORMER-DECODER',
      'BACKPROPAGATION: STABLE',
      'LOSS_VAL: 0.0382 (CONVERGING)',
      'GRAPH_COMPUTE_ENG: 60.00 FPS',
      'AGENT: INFERENCE_CALIBRATED',
      'EMBEDDINGS: RETRIEVED_OK',
      'NEURAL_WEB_ENG: CALIBRATING',
    ]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      time++
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // 1. Aura glow centered at cursor — reduced and focused
      if (mouseRef.current.active) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 250)
        glow.addColorStop(0, 'rgba(37,99,235,0.18)')  // Soft electric blue
        glow.addColorStop(0.5, 'rgba(8,47,137,0.06)') // Navy blue glow
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      // 2. Dense grid of technical digital coordinates/dots (resolves empty spots)
      ctx.fillStyle = 'rgba(37,99,235,0.06)'
      const dotSpacing = 32
      for (let dx = dotSpacing / 2; dx < width; dx += dotSpacing) {
        for (let dy = dotSpacing / 2; dy < height; dy += dotSpacing) {
          ctx.fillRect(dx - 0.5, dy - 0.5, 1, 1)
        }
      }

      // Draw intricate PCB trace shapes on the left/middle
      ctx.strokeStyle = 'rgba(37,99,235,0.05)'
      ctx.lineWidth = 0.8
      const pcbTraces = [
        [[100, 200], [220, 200], [280, 260], [280, 380]],
        [[350, 80], [450, 80], [500, 130], [500, 200]],
        [[180, 600], [240, 660], [350, 660], [380, 690]],
        [[420, 300], [480, 300], [540, 360], [600, 360]]
      ]
      pcbTraces.forEach(trace => {
        ctx.beginPath()
        ctx.moveTo(trace[0][0], trace[0][1])
        for (let i = 1; i < trace.length; i++) {
          ctx.lineTo(trace[i][0], trace[i][1])
        }
        ctx.stroke()
        
        ctx.fillStyle = 'rgba(37,99,235,0.18)'
        ctx.fillRect(trace[0][0] - 2, trace[0][1] - 2, 4, 4)
        ctx.fillRect(trace[trace.length-1][0] - 2, trace[trace.length-1][1] - 2, 4, 4)
      })

      // Blueprint subtle coordinate grid
      ctx.strokeStyle = 'rgba(37,99,235,0.04)'
      ctx.lineWidth = 0.5
      for (let gx = 0; gx < width; gx += 80) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, height)
        ctx.stroke()
      }
      for (let gy = 0; gy < height; gy += 80) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(width, gy)
        ctx.stroke()
      }

      // Cross ticks
      ctx.fillStyle = 'rgba(37,99,235,0.2)'
      ctx.font = '7px "JetBrains Mono", monospace'
      for (let gx = 160; gx < width; gx += 320) {
        for (let gy = 160; gy < height; gy += 240) {
          ctx.fillText(`LOC: [${gx}, ${gy}]`, gx + 4, gy - 4)
          ctx.beginPath()
          ctx.arc(gx, gy, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3. Scrolling status logs in bottom corner
      ctx.font = '8px "JetBrains Mono", monospace'
      const logX = 40
      const logYBase = height - 130
      const logOffset = (time * 0.18) % 14
      const logIdx = Math.floor(time * 0.01)

      for (let i = 0; i < 7; i++) {
        const idx = (logIdx + i) % logs.length
        const alpha = (i / 7) * 0.65
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fillText(`> ${logs[idx]}`, logX, logYBase + i * 14 - logOffset)
      }

      // 4. Rotating GNN Node Graph
      const cxVal = centerX()
      const cyVal = centerY()

      // Draw isolated background technical elements (outside MLP/GNN bounds) in white and blue
      bgElements.forEach(el => {
        el.x += el.speedX * 0.12 * 0.016
        el.y += el.speedY * 0.12 * 0.016
        if (el.x < 0) el.x = 1
        if (el.y < 0) el.y = 1
        if (el.y > 1) el.y = 0

        const ex = el.x * width
        const ey = el.y * height

        // Skip drawing if too close to GNN center to keep GNN graph clean
        const distGNN = Math.sqrt(Math.pow(ex - cxVal, 2) + Math.pow(ey - cyVal, 2))
        if (distGNN < 170) return

        // Strictly exclude background elements from entering the colossal MLP Neural Network area on the right half
        if (ex > width * 0.41) return

        ctx.save()
        ctx.strokeStyle = el.color
        ctx.fillStyle = el.color
        ctx.lineWidth = 0.8

        if (el.type === 'crosshair') {
          ctx.translate(ex, ey)
          el.rot += el.rotSpeed
          ctx.rotate(el.rot)
          ctx.beginPath()
          ctx.moveTo(-8, 0); ctx.lineTo(8, 0)
          ctx.moveTo(0, -8); ctx.lineTo(0, 8)
          ctx.stroke()
          
          ctx.beginPath()
          ctx.arc(0, 0, 3.5, 0, Math.PI*2)
          ctx.stroke()
        } else if (el.type === 'vector') {
          ctx.font = '6.5px "JetBrains Mono", monospace'
          ctx.fillText(el.val, ex, ey)
        } else if (el.type === 'histogram') {
          const h1 = 7 + Math.sin(time * 0.05 + ex) * 4
          const h2 = 11 + Math.cos(time * 0.04 + ey) * 6
          const h3 = 6 + Math.sin(time * 0.03 + ex + ey) * 3
          ctx.fillStyle = el.color
          ctx.fillRect(ex, ey, 2.5, -h1)
          ctx.fillRect(ex + 5, ey, 2.5, -h2)
          ctx.fillRect(ex + 10, ey, 2.5, -h3)
          ctx.font = '4.5px "JetBrains Mono", monospace'
          ctx.fillText('HIST', ex, ey + 6)
        } else if (el.type === 'equation') {
          ctx.font = '6.5px "JetBrains Mono", monospace'
          ctx.fillText(el.expr, ex, ey)
        } else if (el.type === 'dotgrid') {
          ctx.fillStyle = el.color
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              ctx.beginPath()
              ctx.arc(ex + c * 7.5, ey + r * 7.5, 0.8, 0, Math.PI*2)
              ctx.fill()
            }
          }
          ctx.font = '4.5px "JetBrains Mono", monospace'
          ctx.fillText('LATENT_GRID', ex, ey + 22)
        } else if (el.type === 'compass') {
          ctx.translate(ex, ey)
          el.rot += el.rotSpeed * 0.25
          ctx.rotate(el.rot)
          ctx.beginPath()
          ctx.arc(0, 0, 22, 0, Math.PI*2)
          ctx.stroke()
          
          ctx.setLineDash([2, 2])
          ctx.beginPath()
          ctx.arc(0, 0, 12, 0, Math.PI*2)
          ctx.stroke()
          ctx.setLineDash([])
          
          ctx.beginPath()
          ctx.moveTo(-26, 0); ctx.lineTo(26, 0)
          ctx.moveTo(0, -26); ctx.lineTo(0, 26)
          ctx.stroke()
        } else if (el.type === 'cube') {
          const sz = 14
          ctx.translate(ex, ey)
          const vertices = [
            { x: -sz, y: -sz/2, z: -sz },
            { x: sz, y: -sz/2, z: -sz },
            { x: sz, y: sz/2, z: -sz },
            { x: -sz, y: sz/2, z: -sz },
            { x: -sz, y: -sz/2, z: sz },
            { x: sz, y: -sz/2, z: sz },
            { x: sz, y: sz/2, z: sz },
            { x: -sz, y: sz/2, z: sz }
          ]
          const angX = time * 0.012
          const angY = time * 0.015
          const projected = vertices.map(v => {
            const y1 = v.y * Math.cos(angX) - v.z * Math.sin(angX)
            const z1 = v.y * Math.sin(angX) + v.z * Math.cos(angX)
            const x2 = v.x * Math.cos(angY) - z1 * Math.sin(angY)
            return { x: x2, y: y1 }
          })
          const edges = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7]
          ]
          ctx.beginPath()
          edges.forEach(([u,v]) => {
            ctx.moveTo(projected[u].x, projected[u].y)
            ctx.lineTo(projected[v].x, projected[v].y)
          })
          ctx.stroke()
        } else if (el.type === 'square') {
          ctx.strokeRect(ex - 14, ey - 14, 28, 28)
          ctx.strokeStyle = el.color.replace(/0\.\d+/, '0.15')
          ctx.strokeRect(ex - 7, ey - 7, 14, 14)
          ctx.beginPath()
          ctx.moveTo(ex - 18, ey); ctx.lineTo(ex + 18, ey)
          ctx.moveTo(ex, ey - 18); ctx.lineTo(ex, ey + 18) // Fixed typo gy to ey
          ctx.stroke()
        } else if (el.type === 'circle') {
          ctx.translate(ex, ey)
          ctx.beginPath()
          ctx.arc(0, 0, 18, 0, Math.PI*2)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(0, 0, 8, 0, Math.PI*2)
          ctx.stroke()
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
            ctx.beginPath()
            ctx.moveTo(Math.cos(a) * 18, Math.sin(a) * 18)
            ctx.lineTo(Math.cos(a) * 22, Math.sin(a) * 22)
            ctx.stroke()
          }
        } else {
          ctx.beginPath()
          ctx.arc(ex, ey, 1.5, 0, Math.PI*2)
          ctx.fill()
          
          ctx.beginPath()
          ctx.moveTo(ex, ey)
          ctx.lineTo(ex + 10, ey - 6)
          ctx.stroke()
          
          ctx.font = '5px "JetBrains Mono", monospace'
          ctx.fillText('v_t', ex + 12, ey - 6)
        }
        ctx.restore()
      })

      const angleOffset = time * 0.0012

      nodes.forEach(node => {
        const currentAngle = node.baseAngle + angleOffset
        node.x = cxVal + Math.cos(currentAngle) * node.radius
        node.y = cyVal + Math.sin(currentAngle) * node.radius

        if (mouseRef.current.active) {
          const dx = mx - node.x
          const dy = my - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220) {
            const force = (220 - dist) / 220
            node.x += dx * force * 0.18
            node.y += dy * force * 0.18
            node.glow = force
          } else {
            node.glow = 0
          }
        } else {
          node.glow = 0
        }
      })

      // Connection edges
      connections.forEach(([n1, n2]) => {
        const nodeA = nodes[n1]
        const nodeB = nodes[n2]
        const glow = Math.max(nodeA.glow || 0, nodeB.glow || 0)
        ctx.strokeStyle = glow > 0 
          ? `rgba(59, 130, 246, ${0.15 + glow * 0.45})` 
          : 'rgba(37, 99, 235, 0.12)'
        ctx.lineWidth = glow > 0 ? 1.0 : 0.6
        ctx.beginPath()
        ctx.moveTo(nodeA.x, nodeA.y)
        ctx.lineTo(nodeB.x, nodeB.y)
        ctx.stroke()
      })

      // Draw GNN nodes
      nodes.forEach(node => {
        const pulseVal = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 1.5
        const drawSize = node.size + pulseVal
        const glow = node.glow || 0

        if (glow > 0) {
          ctx.shadowColor = '#2563EB'
          ctx.shadowBlur = 10 + glow * 10
        }

        ctx.fillStyle = glow > 0 ? '#60A5FA' : 'rgba(255, 255, 255, 0.85)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, drawSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = glow > 0 ? '#93C5FD' : 'rgba(37, 99, 235, 0.4)'
        ctx.lineWidth = 1.0
        ctx.beginPath()
        ctx.arc(node.x, node.y, drawSize + 7.5, 0, Math.PI * 2)
        ctx.stroke()

        ctx.shadowBlur = 0
      })

      // 5. Flowing Data Streams (Pipelines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 0.8
      ctx.setLineDash([4, 4])
      paths.forEach(path => {
        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y)
        }
        ctx.stroke()
      })
      ctx.setLineDash([])

      paths.forEach(path => {
        path.particles.forEach((pVal, idx) => {
          path.particles[idx] = (pVal + 0.0022) % 1.0
          const segmentCount = path.points.length - 1
          const totalP = path.particles[idx]
          const currentSegment = Math.min(Math.floor(totalP * segmentCount), segmentCount - 1)
          const segmentP = (totalP * segmentCount) - currentSegment

          const pStart = path.points[currentSegment]
          const pEnd = path.points[currentSegment + 1]

          const px = pStart.x + (pEnd.x - pStart.x) * segmentP
          const py = pStart.y + (pEnd.y - pStart.y) * segmentP

          ctx.fillStyle = '#60A5FA'
          ctx.shadowColor = '#2563EB'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(px, py, 3.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        })
      })

      // 6. Drifting Equations (Vertex AI-safe standard ASCII)
      equations.forEach(eq => {
        eq.x += eq.vx
        eq.y += eq.vy

        if (eq.x < -200 || eq.x > width + 200 || eq.y < -50 || eq.y > height + 50) {
          eq.x = Math.random() * (width - 100) + 50
          eq.y = Math.random() * (height - 100) + 50
        }

        const currentAlpha = eq.alpha * (0.35 + Math.sin(time * 0.02 + eq.x) * 0.15)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.55})`
        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.fillText(eq.text, eq.x, eq.y)
      })

      // 7. Vector Embedding projection space
      const gridX = width * 0.16
      const gridY = 170
      ctx.strokeStyle = 'rgba(37,99,235,0.08)'
      ctx.lineWidth = 0.8

      ctx.beginPath()
      ctx.moveTo(gridX, gridY)
      ctx.lineTo(gridX + 80, gridY - 40)
      ctx.lineTo(gridX + 160, gridY)
      ctx.lineTo(gridX + 80, gridY + 40)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(gridX, gridY - 80)
      ctx.lineTo(gridX + 80, gridY - 120)
      ctx.lineTo(gridX + 160, gridY - 80)
      ctx.lineTo(gridX + 80, gridY - 40)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(gridX, gridY)
      ctx.lineTo(gridX, gridY - 80)
      ctx.moveTo(gridX + 80, gridY + 40)
      ctx.moveTo(gridX + 80, gridY - 40)
      ctx.moveTo(gridX + 160, gridY)
      ctx.lineTo(gridX + 160, gridY - 80)
      ctx.stroke()

      const vecPoints = [
        { rx: 35, ry: 8, rz: 35, col: '#60A5FA' },
        { rx: 65, ry: -15, rz: 22, col: '#3B82F6' },
        { rx: 105, ry: -25, rz: 55, col: '#ffffff' },
      ]
      vecPoints.forEach(p => {
        const px = gridX + p.rx + p.ry * 0.5
        const py = gridY - p.rz + p.ry * 0.25
        const floorY = gridY + p.ry * 0.25

        ctx.strokeStyle = 'rgba(255,255,255,0.1)'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(px, floorY)
        ctx.stroke()

        ctx.fillStyle = p.col
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.fillStyle = 'rgba(37,99,235,0.35)'
      ctx.fillText('EMBEDDING SPACE [3D_PROJ]', gridX, gridY - 95)

      // 8. Fully Connected MLP Neural Network (NEW) - Scaled dynamically to be colossal
      const mlpStartX = width * 0.46
      const mlpStartY = height * 0.52
      const mlpSpacingX = 150
      const mlpSpacingY = 44
      const mlpLayers = [4, 7, 6, 3]
      const mlpLayerNodes = []

      // Calculate node positions dynamically based on canvas dimensions
      mlpLayers.forEach((nodeCount, lIdx) => {
        const layerNodes = []
        const totalHeight = (nodeCount - 1) * mlpSpacingY
        const startY = mlpStartY - totalHeight / 2
        for (let nIdx = 0; nIdx < nodeCount; nIdx++) {
          layerNodes.push({
            x: mlpStartX + lIdx * mlpSpacingX,
            y: startY + nIdx * mlpSpacingY
          })
        }
        mlpLayerNodes.push(layerNodes)
      })

      // Draw Fully Connected Synapses (Weights)
      ctx.lineWidth = 0.5
      for (let l = 0; l < mlpLayerNodes.length - 1; l++) {
        const currentLayer = mlpLayerNodes[l]
        const nextLayer = mlpLayerNodes[l + 1]
        currentLayer.forEach(nodeA => {
          nextLayer.forEach(nodeB => {
            const pulse = 0.04 + Math.sin(time * 0.015 + nodeA.x * 0.01 + nodeA.y * 0.02) * 0.03
            ctx.strokeStyle = `rgba(37, 99, 235, ${pulse})`
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()
          })
        })
      }

      // Draw Synapse Signal Particles Traveling
      ctx.fillStyle = '#60A5FA'
      ctx.shadowColor = '#2563EB'
      for (let l = 0; l < mlpLayerNodes.length - 1; l++) {
        const currentLayer = mlpLayerNodes[l]
        const nextLayer = mlpLayerNodes[l + 1]
        
        currentLayer.forEach((nodeA, aIdx) => {
          nextLayer.forEach((nodeB, bIdx) => {
            if ((aIdx + bIdx + l) % 3 === 0) {
              const speed = 0.008 + ((aIdx * 0.002) % 0.006)
              const prog = (time * speed + (aIdx * 0.15) + (l * 0.25)) % 1.0
              const px = nodeA.x + (nodeB.x - nodeA.x) * prog
              const py = nodeA.y + (nodeB.y - nodeA.y) * prog
              
              ctx.beginPath()
              ctx.arc(px, py, 2.2, 0, Math.PI * 2)
              ctx.fill()
            }
          })
        })
      }
      ctx.shadowBlur = 0

      // Draw MLP nodes - Massive glowing nodes
      mlpLayerNodes.forEach((layer, lIdx) => {
        layer.forEach(node => {
          ctx.fillStyle = lIdx === 0 ? '#60A5FA' : lIdx === mlpLayers.length - 1 ? '#3B82F6' : '#ffffff'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 5.2, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.55)'
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.arc(node.x, node.y, 11, 0, Math.PI * 2)
          ctx.stroke()
        })
      })

      // Add MLP layer labels aligned to layer heights
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillText('INPUT_x', mlpStartX - 38, mlpStartY - 84)
      ctx.fillText('LATENT_h1', mlpStartX + mlpSpacingX - 20, mlpStartY - 150)
      ctx.fillText('LATENT_h2', mlpStartX + mlpSpacingX * 2 - 20, mlpStartY - 128)
      ctx.fillText('SOFTMAX_y', mlpStartX + mlpSpacingX * 3 + 12, mlpStartY - 62)

      // 9. Transformer Self-Attention Grid (NEW)
      const attnStartX = width * 0.12
      const attnStartY = height * 0.26
      const cellSize = 11
      const cellSpacing = 2
      
      ctx.fillStyle = 'rgba(37,99,235,0.35)'
      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillText('SELF-ATTENTION WEIGHT MATRIX', attnStartX, attnStartY - 10)

      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const cx = attnStartX + c * (cellSize + cellSpacing)
          const cy = attnStartY + r * (cellSize + cellSpacing)
          
          const noise = Math.sin(time * 0.02 + r * 0.5 + c * 0.8) * 0.5 + 0.5
          const baseWeight = (r === c) ? 0.7 : ((r + c) % 3 === 0) ? 0.45 : 0.15
          const weight = Math.min(1.0, Math.max(0.0, baseWeight + noise * 0.2))
          
          ctx.fillStyle = `rgba(59, 130, 246, ${weight * 0.35})`
          ctx.fillRect(cx, cy, cellSize, cellSize)
          
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.05 + weight * 0.15})`
          ctx.lineWidth = 0.6
          ctx.strokeRect(cx, cy, cellSize, cellSize)
        }
      }

      // Draw Query/Key/Value labels
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fillText('Q-proj [6x64]', attnStartX - 42, attnStartY + 25)
      ctx.fillText('K-proj [6x64]', attnStartX + 10, attnStartY + (cellSize + cellSpacing) * 6 + 12)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
