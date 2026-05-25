import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ProjectDetailsView({ project, onBack }) {
  // Scroll to top when view is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [project])

  if (!project) return null

  // Custom detailed data per project to render the requested detailed desc, tech, architecture
  const detailedData = {
    1: {
      subtitle: 'AI-Powered Legal Document Intelligence Platform',
      architectureText: 'The LegalEase system is structured across a three-tier RAG (Retrieval-Augmented Generation) framework designed to optimize retrieval accuracy while maintaining low latency.',
      architecturePoints: [
        { title: 'Semantic Ingestion Pipeline', desc: 'Converts unstructured PDFs into normalized text chunks using customized paragraph-aware recursive chunk splitters, capturing context headers.' },
        { title: 'Vector Embeddings & Storage', desc: 'Chunks are vectorized through OpenAI text-embedding-3-small and indexed in ChromaDB with hierarchical navigators.' },
        { title: 'Hybrid Retrieval Engine', desc: 'Employs a custom BM25 + Vector ranking algorithm inside FastAPI to compile high-scoring legal paragraphs.' },
        { title: 'Context-Synthesized Generation', desc: 'Structured prompts route context to GPT-4o, generating a clear summary complete with exact document source citations.' }
      ],
      details: [
        { title: 'The Legal Inefficiencies', desc: 'Reviewing hundreds of compliance pages and complex contracts manually creates a massive bottleneck for legal counsels. LegalEase automates context compilation down to seconds.' },
        { title: 'Key Innovations', desc: 'Implements absolute source citation mapping, preventing LLM hallucinations, alongside customizable legal summarization templates tailored for distinct contract profiles.' }
      ]
    },
    2: {
      subtitle: 'High-Performance Multi-Agent Conversational Workspace',
      architectureText: 'Casper leverages a stateful multi-agent topology orchestrated via LangGraph, enabling high-autonomy task planning, execution, and self-debugging.',
      architecturePoints: [
        { title: 'Supervisor Node Router', desc: 'Parses the prompt, breaks tasks down into distinct sub-tasks, and handles conditional state routing across worker nodes.' },
        { title: 'Web Scraping & Tavily Agent', desc: 'Autonomously queries search engines, fetches live web structures, and summarizes findings into a state dictionary.' },
        { title: 'Safe Python Exec Sandbox', desc: 'Worker agent runs generated code blocks inside an isolated secure sandbox environment, returning stdout and traceback errors.' },
        { title: 'State Synchronization Core', desc: 'Maintains transaction locks and memory checks across all nodes to ensure state consistency during parallel execution.' }
      ],
      details: [
        { title: 'Autonomous Workflow Execution', desc: 'Unlike linear chat assistants, Casper can loop recursively between writing, executing, and debugging code without human intervention until the final goal is met.' },
        { title: 'Real-Time State Mapping', desc: 'Provides a live visual log of which agent currently holds execution focus, making deep reasoning processes fully transparent to the user.' }
      ]
    },
    3: {
      subtitle: 'Hybrid AI-Powered Image Forgery Detection Platform',
      architectureText: 'AuthentiScan combines low-level noise analysis with deep learning models to capture compression anomalies and altered edge splicing boundaries.',
      architecturePoints: [
        { title: 'FastAPI Processing Gateway', desc: 'Accepts high-res media files and delegates concurrent background checks across specialized analysis modules.' },
        { title: 'OpenCV Error Level Analysis', desc: 'ELA highlights JPEG compression ratio discrepancies, isolating regions that have been edited and resaved at different quality tiers.' },
        { title: 'PyTorch CNN Deep Neural Net', desc: 'A custom Convolutional Neural Network trained on splice databases maps micro-texture alterations to flag forged boundaries.' },
        { title: 'EXIF Metadata Parser', desc: 'Scans image files for metadata tampering, device signatures, and software discrepancies to trace origin.' }
      ],
      details: [
        { title: 'Combating Visual Forgery', desc: 'As generative AI and advanced photo editing software become ubiquitous, digital forensics require hybrid solutions. AuthentiScan validates visual integrity across multiple layers of proof.' },
        { title: 'Visual Heatmap Rendering', desc: 'Outputs interactive dual-view canvas layouts displaying the original image side-by-side with an ELA contrast heatmap, highlighting tampered pixels.' }
      ]
    },
    4: {
      subtitle: 'Spectral Graph Convolutional Neural Network Framework',
      architectureText: 'Spectral GCN implements node classification and link prediction using Graph Laplacian eigendecompositions, capturing global topological frequencies.',
      architecturePoints: [
        { title: 'Normalized Laplacian Solver', desc: 'Computes normalized laplacian matrices of graph inputs to extract eigenvectors, mapping graph structures into spectral domains.' },
        { title: 'Fourier Domain Filters', desc: 'Applies learned convolution filters in the spectral domain, filtering high-frequency noise from global spatial signals.' },
        { title: 'Hybrid Message Passing', desc: 'Integrates graph spatial neighbors with eigenvalues to prevent over-smoothing issues in deeper GNN layers.' },
        { title: 'Benchmark Processing pipeline', desc: 'Preconfigured pipelines load, normalize, and split standard node classification datasets (Cora, Citeseer, PubMed).' }
      ],
      details: [
        { title: 'Research-Driven Design', desc: 'Structures deep spectral graph convolutions to analyze highly non-linear relations in citation and social networks.' },
        { title: 'Comprehensive Evaluation Notebooks', desc: 'Packaged with structured Jupyter notebooks demonstrating train/val loss convergence and multi-class node cluster projections.' }
      ]
    },
    5: {
      subtitle: 'Premium Full-Stack Marketplace for Kerala Spices',
      architectureText: 'SpiceNest is built with a resilient, modern decoupled full-stack architecture that optimizes load speed and ensures transactional consistency.',
      architecturePoints: [
        { title: 'React Frontend Client', desc: 'Renders high-resolution catalog grids, manages instant cart updates, and provides smooth, fluid interactions.' },
        { title: 'Express.js Gateway API', desc: 'Handles secure route control, rate limiting, and cart management logic with stateless JWT session tokens.' },
        { title: 'Prisma ORM & PostgreSQL', desc: 'Organizes spice catalog schemas, inventory tables, and user accounts with robust relational keys.' },
        { title: 'Secure Transaction Syncing', desc: 'Employs inventory locks and atomic database updates to prevent cart disparities and stock out-of-sync events.' }
      ],
      details: [
        { title: 'Connecting Farmers directly', desc: 'Brings high-quality organic spices straight from agricultural estates in Kerala to global users, bypassing complex middleman chains.' },
        { title: 'Immersive Catalog Browsing', desc: 'Features advanced catalog filters, live stock tracking, secure account signups, and transaction receipt compilations.' }
      ]
    },
    6: {
      subtitle: 'Multi-Threaded PNG Processing Engine in C++/OpenMP',
      architectureText: 'This parallel engine load PNG pixels into contiguous shared memory arrays, applying heavy calculations across CPU threads via OpenMP.',
      architecturePoints: [
        { title: 'Shared Memory Array Layout', desc: 'Raw binary PNG row segments are mapped into shared memory buffers to prevent memory access bottlenecking.' },
        { title: 'OpenMP Thread Scheduling', desc: 'Employs parallel loop scheduling constructs to dynamically distribute image rows across multicore processing cores.' },
        { title: 'Cache Contiguity Optimization', desc: 'Loops are aligned contiguous in row-major memory order to prevent cache line trashing and false sharing.' },
        { title: 'Multi-threaded Filter Kernels', desc: 'Applies discrete 3x3 mathematical convolution matrices across pixel grids for sharpening, edge detection, and blur.' }
      ],
      details: [
        { title: 'Low-Level Acceleration', desc: 'Demonstrates maximum performance scaling, showing substantial execution speedup ratios over traditional sequential C++ processing.' },
        { title: 'Forensic Medical Application', desc: 'Tailored for high-speed batch transformation of massive medical imagery sets, making negative transformations instantly scalable.' }
      ]
    }
  }

  const pData = detailedData[project.id] || {
    subtitle: 'Advanced Software Engineering Project',
    architectureText: 'Structured architecture optimizing execution performance and scalability.',
    architecturePoints: [],
    details: []
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#f8f9fb',
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '22px', // Snapped closer to the sticky Navbar
        paddingBottom: '100px',
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        zIndex: 90
      }}
    >
      {/* Absolute Background Topography Layer with reduced opacity */}
      <div 
        style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('luxury_topo_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Inline Custom Navigation Bar */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(226, 232, 240, 0.9)'
          }}
        >
          <button 
            onClick={onBack}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#475569',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(59,130,246,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#475569',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0f1f4b'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <svg style={{ width: '15px', height: '15px' }} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: '#0f1f4b',
                color: '#white',
                textColor: '#ffffff',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(15,31,75,0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1e3a8a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0f1f4b'; }}
            >
              Demo
              <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
            </a>
          </div>
        </div>

        {/* WooCommerce Split Row: Left for Image, Right for Product Info */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            width: '100%',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Big Product-style Image */}
          <div 
            style={{
              flex: '1 1 480px',
              height: '420px',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.04)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={project.img} 
              alt={project.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Right Column: Title (Name), Subtitle, Tech Stack, Overview */}
          <div 
            style={{
              flex: '1 1 400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'left'
            }}
          >
            {/* Title Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex' }}>
                <span 
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    fontWeight: '900',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'rgba(59, 130, 246, 0.06)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    color: '#3b82f6'
                  }}
                >
                  {project.cat}
                </span>
              </div>
              <h1 
                style={{
                  fontSize: '38px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-0.02em',
                  color: '#0f1f4b',
                  margin: '4px 0 0 0',
                  textTransform: 'uppercase',
                  lineHeight: '1.1'
                }}
              >
                {project.title}
              </h1>
              <p 
                style={{
                  fontSize: '15px',
                  color: '#64748b',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  margin: '2px 0 0 0'
                }}
              >
                {pData.subtitle}
              </p>
            </div>

            {/* Tech Stack Chips Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                TECHNOLOGY STACK
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tech.map((t, idx) => (
                  <span 
                    key={idx}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      letterSpacing: '0.05em',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.01)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Description Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                PROJECT OVERVIEW
              </h3>
              <p 
                style={{
                  fontSize: '14.5px',
                  lineHeight: '1.65',
                  color: '#475569',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '400',
                  margin: 0
                }}
              >
                {project.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Lower Row: Extra Details & Full-Width System Architecture Blueprint */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            width: '100%',
            marginTop: '20px',
            textAlign: 'left'
          }}
        >
          {/* Additional details */}
          {pData.details.length > 0 && (
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '30px',
                width: '100%'
              }}
            >
              {pData.details.map((detail, idx) => (
                <div key={idx} style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 
                    style={{
                      fontSize: '15px',
                      fontWeight: '800',
                      color: '#0f1f4b',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      margin: 0
                    }}
                  >
                    {detail.title}
                  </h4>
                  <p 
                    style={{
                      fontSize: '13.5px',
                      lineHeight: '1.6',
                      color: '#64748b',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      margin: 0
                    }}
                  >
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* System Architecture Blueprint (Generous Full-Width design) */}
          <div 
            style={{
              background: '#ffffff',
              border: '1.5px dashed rgba(15, 31, 75, 0.15)',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.01)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                  flexShrink: 0
                }}
              >
                <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                SYSTEM ARCHITECTURE
              </h3>
            </div>

            <p 
              style={{
                fontSize: '13px',
                color: '#64748b',
                lineHeight: '1.6',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                margin: 0
              }}
            >
              {pData.architectureText}
            </p>

            {/* Blueprint Pipeline Steps in full width grid flow */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '24px', 
                position: 'relative',
                marginTop: '10px'
              }}
            >
              {pData.architecturePoints.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'start', position: 'relative' }}>
                  {/* Visual Connector Dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div 
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '9999px',
                        background: '#eff6ff',
                        border: '2px solid #60a5fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: '#2563eb',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span 
                      style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1.2'
                      }}
                    >
                      {pt.title}
                    </span>
                    <span 
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontWeight: 'normal',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1.4'
                      }}
                    >
                      {pt.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Back Button Action */}
        <div 
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(226, 232, 240, 0.9)'
          }}
        >
          <button 
            onClick={onBack}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 32px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#0f1f4b',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 10px 25px rgba(15,31,75,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1d3557'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,31,75,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0f1f4b'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(15,31,75,0.15)'; }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Return to Portfolio
          </button>
        </div>
      </div>
    </motion.div>
  )
}
