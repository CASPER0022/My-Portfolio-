import { CaseStudyHero, Markers, Node, Section } from './shared'

// Deep-dive page for the SE-GCN replication (github.com/CASPER0022/Spectral-Encoder-GCN).
// All results are the printed / plotted outputs of the four SE_GCN_Extended_*.ipynb
// notebooks; dataset statistics come from the same runs.

const CHARTS = '/Projects/spectral gcn/charts/'

const RESULTS = [
  // name, degree, betweenness, closeness, eigenvector, SE-GCN, weighted SE-GCN
  ['Brain connectome', 0.534, 0.262, 0.677, 0.715, 0.781, 0.927],
  ['C. elegans', 0.589, 0.467, 0.531, 0.632, 0.928, 0.982],
  ['Cargo ships', 0.669, 0.533, 0.644, 0.695, 0.923, 0.944],
  ['US airports', 0.653, 0.415, 0.582, 0.621, 0.828, 0.755]
]

/* ── 1. Pipeline ── */

function PipelineDiagram() {
  return (
    <svg viewBox="0 0 1000 460" role="img" aria-labelledby="se-pipe-title se-pipe-desc" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="se-pipe-title">SE-GCN training and evaluation pipeline</title>
      <desc id="se-pipe-desc">From an edge list, SIR simulations produce influence labels; k-hop degree sequences produce a structural similarity matrix used as node features; a normalized adjacency matrix drives a two-layer GCN and MLP, trained with MSE against the labels and evaluated with Kendall's tau. The weighted variant uses node strength and weighted adjacency.</desc>
      <Markers />
      <Node x={20} y={180} w={170} n="1" tone="navy" title="Edge list" lines={['u  v  weight', 'NetworkX graph']} />

      <Node x={230} y={40} w={180} n="2" tone="violet" title="SIR simulation" lines={['every node as seed', '25–50 runs, β = 1.5·βc']} />
      <Node x={440} y={40} w={170} tone="violet" title="Influence labels" lines={['mean outbreak size', 'normalized → y']} />

      <Node x={440} y={180} w={170} n="3" title="Adjacency Â" lines={['A + I, symmetric', 'D̂^−½ (A+I) D̂^−½']} />

      <Node x={230} y={320} w={180} n="4" tone="teal" title="Degree sequences" lines={['S₀, S₁, S₂ per node', '1- and 2-hop, sorted ↓']} />
      <Node x={440} y={320} w={170} tone="teal" title="Similarity W" lines={['pairwise distance X', 'W = exp(−X), N × N']} />

      <Node x={650} y={180} w={170} n="5" title="GCN → MLP" lines={['N → 64 → 32', '→ 16 → 1']} />
      <Node x={858} y={180} w={122} tone="navy" title="Train · rank" lines={['MSE vs y', "Kendall's τ"]} />

      <path d="M105 178 V90 H226" fill="none" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <path d="M105 282 V370 H226" fill="none" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-teal)" />
      <line x1="192" y1="230" x2="436" y2="230" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="412" y1="90" x2="436" y2="90" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <line x1="412" y1="370" x2="436" y2="370" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-teal)" />
      <line x1="612" y1="230" x2="646" y2="230" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <path d="M612 370 H735 V286" fill="none" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-teal)" />
      <text x="742" y="330" fontSize="11" fill="#0d9488" fontWeight="600">node features</text>
      <line x1="822" y1="230" x2="854" y2="230" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <path d="M612 90 H919 V176" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-violet)" />
      <text x="760" y="82" fontSize="11" fill="#7c3aed" fontWeight="600">targets</text>

      <text x="525" y="304" textAnchor="middle" fontSize="11" fill="#ea580c" fontWeight="700">weighted run: A uses edge weights</text>
      <text x="320" y="446" textAnchor="middle" fontSize="11" fill="#ea580c" fontWeight="700">weighted run: sequences use node strength</text>
    </svg>
  )
}

/* ── 2. Results chart ── */

function ResultsChart() {
  const x0 = 70
  const h = 240
  const base = 290
  const groupW = 225
  return (
    <svg viewBox="0 0 1000 340" role="img" aria-labelledby="se-res-title" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="se-res-title">Kendall's tau against the SIR ranking: best classical centrality, SE-GCN and weighted SE-GCN on four networks</title>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={x0 - 10} y1={base - t * h} x2="980" y2={base - t * h} stroke="#e2e8f0" strokeWidth="1" />
          <text x={x0 - 16} y={base - t * h + 4} textAnchor="end" fontSize="11" fill="#94a3b8" fontFamily="monospace">{t.toFixed(2)}</text>
        </g>
      ))}
      {RESULTS.map(([name, ...v], gi) => {
        const best = Math.max(v[0], v[1], v[2], v[3])
        const bars = [[best, '#94a3b8', '#475569'], [v[4], '#3b82f6', '#1d4ed8'], [v[5], '#f97316', '#c2410c']]
        const gx = x0 + 20 + gi * groupW
        return (
          <g key={name}>
            {bars.map(([val, fill, ink], bi) => {
              const bx = gx + bi * 58
              return (
                <g key={bi}>
                  <rect x={bx} y={base - val * h} width="48" height={val * h} rx="5" fill={fill} />
                  <text x={bx + 24} y={base - val * h - 7} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ink} fontFamily="monospace">{val.toFixed(3)}</text>
                </g>
              )
            })}
            <text x={gx + 82} y={base + 24} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f1f4b">{name}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Page ── */

const STATS = [
  ['4 networks', 'brain, worm nervous system, shipping and flight routes'],
  ['0.982', "best Kendall's τ: weighted SE-GCN on C. elegans"],
  ['4 / 4', 'networks where SE-GCN beats every classical centrality'],
  ['3 / 4', 'networks where adding edge weights improves SE-GCN'],
  ['+0.146', 'τ gained from edge weights on the brain connectome'],
  ['N × N', 'structural similarity matrix used as node features']
]

const DATASETS = [
  ['Brain connectome', 'Budapest human connectome (sample)', '480', '1,000', '0.300', '18', '1 – 156'],
  ['C. elegans', 'Nematode neural network', '297', '2,148', '0.292', '5', '1 – 70'],
  ['Cargo ships', 'Global maritime shipping routes', '834', '4,349', '0.417', '22', '2 – 8,785'],
  ['US airports', 'Domestic flight routes', '500', '2,980', '0.617', '10', '9 – 2.25 M']
]

export default function SEGCNCaseStudy({ project }) {
  return (
    <div className="cs">
      <CaseStudyHero
        project={project}
        video="/Projects/spectral gcn/segcn-overview.mp4"
        poster="/Projects/spectral gcn/segcn-overview-poster.jpg"
        videoLabel="21-second overview of SE-GCN: an outbreak spreading across a network, the structural-equivalence pipeline, and Kendall's tau results on four real networks"
        subtitle="Replicating and extending SE-GCN to find the most influential spreaders in real networks"
        lede={
          'If an outbreak, a rumour or a cascading failure starts at one node, how far does it get? SE-GCN (Patel & Singh, 2025) ' +
          'answers that by describing each node through the degrees of its 1- and 2-hop neighbourhood, comparing every pair of nodes ' +
          'for structural equivalence, and training a graph convolutional network to predict SIR outbreak size. We replicated it ' +
          'on four real networks and extended it to use edge weights. The learned rankings beat every classical centrality on all ' +
          'four networks, and the weighted version reaches Kendall’s τ = 0.982.'
        }
        tags={['Python', 'PyTorch', 'NetworkX', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter', 'LaTeX']}
        role="Four-person group project for Network Science Analytics at IIIT Kottayam (April 2026): paper replication, the weighted extension, experiments on four networks and the written report."
        stats={STATS}
      />

      {/* 01 Problem */}
      <Section
        eyebrow="01 — The problem"
        title="Who spreads it furthest?"
        intro="Finding influential spreaders matters for containing epidemics, seeding information and protecting infrastructure. The classical answers are centrality measures, and each one sees only part of the picture."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Degree</span>
            <h4>Local only</h4>
            <p>Counts direct neighbours. It is fast, but blind to whether those neighbours lead anywhere.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Betweenness · closeness</span>
            <h4>Shortest paths only</h4>
            <p>Assumes spread follows shortest paths. Epidemics don’t, and betweenness was the weakest predictor on all four networks.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">SE-GCN</span>
            <h4>Structural equivalence</h4>
            <p>Nodes with similar neighbourhood structure should have similar influence, even if they are far apart. The “SE” in the repo name refers to structural equivalence.</p>
          </div>
        </div>
      </Section>

      {/* 02 Datasets */}
      <Section
        eyebrow="02 — Networks"
        title="Four very different real networks"
        intro="Each network is a weighted edge list. Its statistics below come from the notebook runs. The weight column matters later: it spans a 70× range on C. elegans and about a 250,000× range on US airports."
      >
        <div className="cs-table-wrap">
          <table className="cs-table" style={{ minWidth: '760px' }}>
            <thead>
              <tr><th>Network</th><th>What it is</th><th>Nodes</th><th>Edges</th><th>Clustering</th><th>Communities</th><th>Edge weights</th></tr>
            </thead>
            <tbody>
              {DATASETS.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => <td key={i} style={i >= 2 ? { fontFamily: 'monospace', fontSize: '12.5px' } : undefined}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 03 Pipeline */}
      <Section
        eyebrow="03 — Pipeline"
        title="Simulate the ground truth, learn it from structure"
        intro="Two branches start from the same graph. One simulates outbreaks to get the answer, the other builds the structural features. The GCN learns to map the second onto the first."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <PipelineDiagram />
          </div>
          <div className="cs-legend">
            <span><i style={{ background: '#c4b5fd' }} />SIR ground truth</span>
            <span><i style={{ background: '#5eead4' }} />Structural features</span>
            <span><i style={{ background: '#93c5fd' }} />Graph convolution &amp; training</span>
            <span><i style={{ background: '#fb923c' }} />Weighted extension</span>
          </div>
        </div>
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">Ground truth · SIR</span>
            <h4>Outbreak size from every seed</h4>
            <p>Transmission is set just above the epidemic threshold, β = 1.5 · β<sub>c</sub> with β<sub>c</sub> = ⟨k⟩ / (⟨k²⟩ − ⟨k⟩), and recovery μ = 1. Each node seeds 25–50 simulated outbreaks of up to 100 steps; the mean number recovered, normalized to [0, 1], is its influence label.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Evaluation</span>
            <h4>Kendall’s τ between rankings</h4>
            <p>Absolute values don’t matter; the order does. Kendall’s τ measures how often two rankings agree on which of a pair of nodes is more influential. The same score is computed for degree, betweenness, closeness and eigenvector centrality.</p>
          </div>
        </div>
      </Section>

      {/* 04 Structural equivalence */}
      <Section
        eyebrow="04 — Structural equivalence"
        title="Describe a node by its neighbourhood’s degrees"
        intro="For each node, SE-GCN builds three sorted sequences: its own degree, the degrees of its neighbours, and the degrees of nodes two hops away. Two nodes are structurally equivalent when these sequences match, even if the nodes are nowhere near each other."
      >
        <div className="cs-two-col" style={{ alignItems: 'start' }}>
          <pre className="cs-code">{`S₀(v) = [deg(v)]
S₁(v) = sort↓ { deg(u) : u ∈ N(v) }
S₂(v) = sort↓ { deg(u) : u two hops from v }

`}<span className="c">{'// ratio distance between aligned sequences'}</span>{`
M(A, B) = Σᵢ ( max(Aᵢ, Bᵢ) / min(Aᵢ, Bᵢ) − 1 )
          + | len(A) − len(B) |

X(u, v) = M(S₀) + M(S₁) + M(S₂)
W       = exp(−X)          `}<span className="c">{'// N × N similarity'}</span></pre>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="cs-card">
              <span className="cs-card-kicker">Features</span>
              <h4>Each node’s row of W is its feature vector</h4>
              <p>The model sees how similar every node is to every other node, then standardizes that. Graph convolution then mixes these rows along actual edges, so each node’s prediction combines what it resembles and who it is connected to.</p>
            </div>
            <div className="cs-card">
              <span className="cs-card-kicker">Extension</span>
              <h4>Degree → strength</h4>
              <p>The weighted variant builds the same sequences from node strength (sum of edge weights) instead of degree, and uses the weighted adjacency in the convolution. A few strong ties can then outweigh many weak ones.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 Model */}
      <Section eyebrow="05 — Model & training" title="A small GCN, trained full-batch">
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead><tr><th>Component</th><th>Setting</th></tr></thead>
            <tbody>
              {[
                ['Propagation', 'Â = D̂^−½ (A + I) D̂^−½, full graph in memory'],
                ['Layers', 'GCN N → 64 → GCN 64 → 32 → Linear 32 → 16 → Linear 16 → 1, ReLU between'],
                ['Output', 'Raw regression output (no sigmoid), trained on standardized labels'],
                ['Loss · optimizer', 'MSE · Adam, lr 0.005, weight decay 1e-4'],
                ['Training', '500 epochs, full batch; unweighted and weighted models trained separately'],
                ['Baselines', 'Degree, betweenness, closeness, eigenvector centrality (NetworkX)']
              ].map(([a, b]) => (
                <tr key={a}><td>{a}</td><td>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 06 Results */}
      <Section
        eyebrow="06 — Results"
        title="SE-GCN wins on every network"
        intro="Kendall’s τ against the SIR ranking. The replicated SE-GCN beats the best classical centrality on all four networks, by 0.07 to 0.30, and edge weights push three of the four higher still."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the chart →</span>
          <div className="cs-diagram-scroll">
            <ResultsChart />
          </div>
          <div className="cs-legend">
            <span><i style={{ background: '#94a3b8' }} />Best classical centrality</span>
            <span><i style={{ background: '#3b82f6' }} />SE-GCN (replication)</span>
            <span><i style={{ background: '#f97316' }} />Weighted SE-GCN (extension)</span>
          </div>
        </div>
        <div className="cs-table-wrap">
          <table className="cs-table" style={{ minWidth: '720px' }}>
            <thead>
              <tr><th>Network</th><th>Degree</th><th>Betweenness</th><th>Closeness</th><th>Eigenvector</th><th>SE-GCN</th><th>Weighted</th></tr>
            </thead>
            <tbody>
              {RESULTS.map(([name, ...v]) => {
                const top = Math.max(...v)
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    {v.map((x, i) => (
                      <td key={i} style={{ fontFamily: 'monospace', fontSize: '12.5px', fontWeight: x === top ? 800 : 400, color: x === top ? '#0f1f4b' : undefined }}>{x.toFixed(3)}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 07 Weights */}
      <Section
        eyebrow="07 — When do weights help?"
        title="Edge weights help, until their range explodes"
        intro="Three networks gain from weights. The one that loses, US airports, is the network whose edge weights vary far more than any other, by five orders of magnitude."
      >
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead><tr><th>Network</th><th>Weight range (max / min)</th><th>SE-GCN → weighted</th><th>Change</th></tr></thead>
            <tbody>
              {[
                ['C. elegans', '70×', '0.928 → 0.982', '+0.054', '#15803d'],
                ['Brain connectome', '156×', '0.781 → 0.927', '+0.146', '#15803d'],
                ['Cargo ships', '≈ 4,400×', '0.923 → 0.944', '+0.021', '#15803d'],
                ['US airports', '≈ 250,000×', '0.828 → 0.755', '−0.073', '#b91c1c']
              ].map(([a, b, c, d, col]) => (
                <tr key={a}><td>{a}</td><td style={{ fontFamily: 'monospace' }}>{b}</td><td style={{ fontFamily: 'monospace' }}>{c}</td><td style={{ fontFamily: 'monospace', fontWeight: 800, color: col }}>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">Why airports break</span>
            <h4>Raw passenger counts swamp the ratios</h4>
            <p>The distance compares sequences by ratio, max / min. With airport weights running from 9 to over 2 million, node strengths span several orders of magnitude, so a handful of mega-hubs dominate X and exp(−X) pushes almost every other pair toward zero similarity. The weighted adjacency is dominated by the same few edges.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">The fix to try</span>
            <h4>Compress the weights first</h4>
            <p>Log-scaling (log(1 + w)) or rank-normalizing weights before computing strength would keep “strong ties matter” without letting one edge outweigh a thousand. This is the first experiment to run next.</p>
          </div>
        </div>
      </Section>

      {/* 08 Caveats */}
      <Section
        eyebrow="08 — Reading the numbers"
        title="What these scores do and don’t show"
        intro="The results are strong, and they come with limits that are worth stating plainly."
      >
        <div className="cs-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="cs-card">
            <span className="cs-card-kicker">Transductive</span>
            <h4>Scored on the nodes it trained on</h4>
            <p>Each model is fit on every node of a graph and τ is computed on those same nodes. It shows how well structure can explain spreading, not yet how well it predicts for unseen nodes.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Labels</span>
            <h4>One SIR setting</h4>
            <p>Both models learn labels simulated on the unweighted graph at a single β. The weighted model is judged against unweighted spreading.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Variance</span>
            <h4>Single runs</h4>
            <p>Each number comes from one training run with one set of SIR simulations; there are no error bars across seeds yet.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Scale</span>
            <h4>O(N²) features</h4>
            <p>The similarity matrix compares every pair of nodes in Python loops, about 700,000 pairs for cargo ships. That is fine here, but not for million-node graphs.</p>
          </div>
        </div>
      </Section>

      {/* 09 Raw outputs */}
      <Section
        eyebrow="09 — Raw notebook output"
        title="The original plots"
        intro="The Kendall’s τ charts exactly as each notebook produced them. Blue is the replicated SE-GCN, orange is the weighted extension."
      >
        <div className="cs-img-grid">
          {[
            ['Budapest', 'Brain connectome'],
            ['C_elegans', 'C. elegans'],
            ['CargoShips', 'Cargo ships'],
            ['US_airports', 'US airports']
          ].map(([f, label]) => (
            <figure key={f}>
              <img src={encodeURI(`${CHARTS}${f}-kendall.png`)} alt={`Kendall's tau bar chart for ${label}`} loading="lazy" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* 10 Next */}
      <Section eyebrow="10 — What’s next" title="Turning a strong fit into a strong predictor">
        <div className="cs-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="cs-card">
            <span className="cs-card-kicker">Generalization</span>
            <h4>Held-out nodes and graphs</h4>
            <p>Train on a subset of nodes and score the rest, or train on one network and rank another. That is the real test of structural equivalence.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Weights</span>
            <h4>Log weights, weighted SIR</h4>
            <p>Compress heavy-tailed weights, and simulate spreading with weight-dependent transmission, so the weighted model is scored against weighted dynamics.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Robustness</span>
            <h4>Seeds and β sweeps</h4>
            <p>Repeat over random seeds and a range of transmission rates, and report mean ± spread for every method.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Scale</span>
            <h4>Sparse similarity</h4>
            <p>Vectorize the sequence distance and keep only each node’s top-k most similar peers, turning the N × N features into a sparse matrix.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
