import { motion } from 'framer-motion'

// Building blocks shared by the project case-study pages.

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
}

export function Section({ eyebrow, title, intro, children }) {
  return (
    <motion.section className="cs-section" {...reveal}>
      <div className="cs-section-head">
        <span className="cs-eyebrow">{eyebrow}</span>
        <h2 className="cs-h2">{title}</h2>
        {intro && <p className="cs-p">{intro}</p>}
      </div>
      {children}
    </motion.section>
  )
}

/* ── Diagram primitives ── */

const TONES = {
  teal: { stroke: '#5eead4', fill: '#ffffff', badge: '#0d9488' },
  blue: { stroke: '#93c5fd', fill: '#ffffff', badge: '#2563eb' },
  violet: { stroke: '#c4b5fd', fill: '#faf5ff', badge: '#7c3aed' },
  navy: { stroke: '#94a3b8', fill: '#ffffff', badge: '#0f1f4b' }
}

export function Node({ x, y, w = 168, h = 100, n, title, lines = [], tone = 'blue' }) {
  const t = TONES[tone]
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={t.fill} stroke={t.stroke} strokeWidth="1.5" />
      {n && (
        <g>
          <circle cx={x + 20} cy={y + 21} r="11" fill={t.badge} />
          <text x={x + 20} y={y + 25} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="monospace">{n}</text>
        </g>
      )}
      <text x={x + (n ? 38 : 16)} y={y + 26} fontSize="13.5" fontWeight="800" fill="#0f1f4b">{title}</text>
      {lines.map((l, i) => (
        <text key={i} x={x + 16} y={y + 54 + i * 18} fontSize="11.5" fill="#64748b">{l}</text>
      ))}
    </g>
  )
}

export function Markers() {
  return (
    <defs>
      {[['arrow-blue', '#60a5fa'], ['arrow-teal', '#2dd4bf'], ['arrow-grey', '#94a3b8'], ['arrow-violet', '#a78bfa']].map(([id, c]) => (
        <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={c} />
        </marker>
      ))}
    </defs>
  )
}


// Overview video, title block and key-number strip at the top of every case study.
export function CaseStudyHero({ project, video, poster, videoLabel, subtitle, lede, tags, role, stats }) {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={reveal.transition}>
        <div className="cs-video-frame">
          <video
            src={encodeURI(video)}
            poster={encodeURI(poster)}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={videoLabel}
          />
        </div>
        <div className="cs-video-caption">
          <span>▶ 21 s product overview</span>
          <span>Unmute for sound</span>
        </div>
      </motion.div>

      <motion.div className="cs-header" {...reveal}>
        <div>
          <span className="cs-chip">{project.cat}</span>
          <h1 className="project-details-title" style={{ marginTop: '12px' }}>{project.title}</h1>
          <p className="cs-subtitle">{subtitle}</p>
          <p className="cs-lede">{lede}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 className="cs-label">Technology stack</h3>
            <div className="cs-tags">
              {tags.map((t) => (
                <span key={t} className="cs-tag">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="cs-label">My role</h3>
            <p className="cs-p" style={{ fontSize: '13.5px' }}>{role}</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="cs-stats" {...reveal}>
        {stats.map(([v, l]) => (
          <div key={v} className="cs-stat">
            <span className="cs-stat-value">{v}</span>
            <span className="cs-stat-label">{l}</span>
          </div>
        ))}
      </motion.div>
    </>
  )
}
