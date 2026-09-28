import { CaseStudyHero, Markers, Node, Section } from './shared'

// Deep-dive page for Parallel Medical Image Processing
// (github.com/CASPER0022/Parallel-Medical-Image-Processing).
// Code details come from medical_serial.cpp / medical_parallel.cpp; timings come
// from the project report (PDC Project.pdf) in the same repo.

const SAMPLES = '/Projects/parallel processing/samples/'

/* ── 1. Per-image pipeline ── */

function PipelineDiagram() {
  return (
    <svg viewBox="0 0 1000 420" role="img" aria-labelledby="pp-pipe-title pp-pipe-desc" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="pp-pipe-title">Per-image processing pipeline</title>
      <desc id="pp-pipe-desc">Inside an OpenMP parallel loop over images, each PNG is loaded as 8-bit grayscale with stb_image, copied into a 2D matrix, then turned into a negative image and a Sobel edge image, each written back to disk as PNG.</desc>
      <Markers />
      <rect x="1" y="14" width="998" height="396" rx="20" fill="#f0f9ff" stroke="#7dd3fc" strokeDasharray="6 5" />
      <text x="22" y="42" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#0369a1">#pragma omp parallel for schedule(dynamic) reduction(+:totalProcessed)</text>
      <text x="978" y="42" textAnchor="end" fontSize="11" fill="#64748b">one iteration = one image</text>

      <Node x={30} y={150} w={170} n="1" tone="navy" title="PNG input" lines={['image1…6.png', '512 × 512 CT slice']} />
      <Node x={230} y={150} w={170} n="2" title="stbi_load" lines={['req_comp = 1', '→ 8-bit grayscale']} />
      <Node x={430} y={150} w={170} n="3" title="2D matrix" lines={['vector<vector<int>>', 'H × W, 0–255']} />
      <Node x={650} y={60} w={170} n="4" tone="teal" title="Negative" lines={['s = 255 − r', 'per-pixel, collapse(2)']} />
      <Node x={650} y={260} w={170} n="5" tone="violet" title="Sobel 3×3" lines={['Gx, Gy convolution', '√(Gx²+Gy²), clamp 255']} />
      <Node x={858} y={60} w={122} tone="navy" title="write" lines={['stbi_write_png', 'negative/']} />
      <Node x={858} y={260} w={122} tone="navy" title="write" lines={['stbi_write_png', 'edge/']} />

      <line x1="202" y1="200" x2="226" y2="200" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="402" y1="200" x2="426" y2="200" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <path d="M602 200 H625 V110 H646" fill="none" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-teal)" />
      <path d="M602 200 H625 V310 H646" fill="none" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <line x1="822" y1="110" x2="854" y2="110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />
      <line x1="822" y1="310" x2="854" y2="310" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />

      <text x="30" y="392" fontSize="11.5" fill="#64748b">
        then <tspan fontFamily="monospace">stbi_image_free()</tspan> · <tspan fontFamily="monospace">#pragma omp critical</tspan> around console output so log lines from different threads don’t interleave
      </text>
    </svg>
  )
}

/* ── 2. Serial vs parallel schedule (Gantt) ── */

function ScheduleDiagram() {
  const x0 = 150
  const full = 800 // px for the serial 0.321 s
  const par = Math.round((0.098 / 0.321) * full) // ≈ 244 px
  const serialW = full / 6
  const parW = par / 2
  const lanes = [
    ['T0', [1, 5]],
    ['T1', [2, 6]],
    ['T2', [3]],
    ['T3', [4]]
  ]
  return (
    <svg viewBox="0 0 1000 320" role="img" aria-labelledby="pp-gantt-title" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="pp-gantt-title">Serial run on one thread versus an illustrative four-thread OpenMP schedule, to scale with the measured batch times</title>
      <text x="20" y="62" fontSize="13" fontWeight="800" fill="#b45309">Serial</text>
      <text x="20" y="78" fontSize="11" fill="#64748b" fontFamily="monospace">thread 0</text>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * serialW} y="44" width={serialW - 4} height="38" rx="8" fill="#fef3c7" stroke="#f59e0b" />
          <text x={x0 + i * serialW + serialW / 2 - 2} y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">image{i + 1}</text>
        </g>
      ))}

      <text x="20" y="134" fontSize="13" fontWeight="800" fill="#0e7490">OpenMP</text>
      <text x="20" y="150" fontSize="11" fill="#64748b" fontFamily="monospace">dynamic</text>
      {lanes.map(([name, imgs], li) => {
        const y = 118 + li * 42
        return (
          <g key={name}>
            <text x={x0 - 12} y={y + 21} textAnchor="end" fontSize="11" fontFamily="monospace" fill="#475569">{name}</text>
            {imgs.map((n, k) => (
              <g key={n}>
                <rect x={x0 + k * parW} y={y} width={parW - 4} height="32" rx="8" fill="#cffafe" stroke="#22d3ee" />
                <text x={x0 + k * parW + parW / 2 - 2} y={y + 21} textAnchor="middle" fontSize="12" fontWeight="700" fill="#155e75">image{n}</text>
              </g>
            ))}
          </g>
        )
      })}

      <line x1={x0} y1="292" x2={x0 + full} y2="292" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={x0 + par} y1="104" x2={x0 + par} y2="300" stroke="#0891b2" strokeWidth="1.8" strokeDasharray="5 4" />
      <text x={x0 + par} y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490" fontFamily="monospace">0.098 s</text>
      <line x1={x0 + full} y1="30" x2={x0 + full} y2="300" stroke="#d97706" strokeWidth="1.8" strokeDasharray="5 4" />
      <text x={x0 + full} y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309" fontFamily="monospace">0.321 s</text>
      <text x={x0} y="314" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="monospace">0</text>
      <text x={x0 + par + 20} y="210" fontSize="11.5" fill="#64748b">two idle threads once the</text>
      <text x={x0 + par + 20} y="226" fontSize="11.5" fill="#64748b">6 images are handed out</text>
    </svg>
  )
}

function Kernel({ label, m }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div className="cs-kernel">
        {m.flat().map((v, i) => <span key={i} className={v > 0 ? 'pos' : v < 0 ? 'neg' : ''}>{v}</span>)}
      </div>
      <span className="cs-card-kicker">{label}</span>
    </div>
  )
}

/* ── Page ── */

const STATS = [
  ['3.28×', 'speedup of the OpenMP build over the serial build'],
  ['0.321 → 0.098 s', 'batch time, serial vs parallel (omp_get_wtime)'],
  ['6 × 512²', 'CT slices per batch: about 1.57 million pixels'],
  ['2 outputs', 'per slice: a negative image and a Sobel edge map'],
  ['18', 'multiply-adds per pixel for the two 3×3 Sobel kernels'],
  ['O(N·H·W)', 'total work, linear in the number of pixels']
]

export default function ParallelImagingCaseStudy({ project }) {
  return (
    <div className="cs">
      <CaseStudyHero
        project={project}
        video="/Projects/parallel processing/parallel-overview.mp4"
        poster="/Projects/parallel processing/parallel-overview-poster.jpg"
        videoLabel="21-second overview: six CT slices processed one at a time on a single core, then across four OpenMP threads, 3.28 times faster"
        subtitle="Serial vs OpenMP negative and Sobel edge detection on CT scans"
        lede={
          'Radiology workflows push large batches of scans through the same preprocessing steps before anyone looks at them. ' +
          'This project implements two of those steps in C++, a negative transform that flips contrast and a Sobel filter ' +
          'that traces tissue and organ boundaries, first as a plain serial program and then with OpenMP spreading the batch ' +
          'across CPU threads. On a batch of six 512 × 512 CT slices, the parallel build finishes in 0.098 s against 0.321 s.'
        }
        tags={['C++17', 'OpenMP', 'GCC · MinGW-w64', 'stb_image', 'stb_image_write', 'std::filesystem']}
        role="Two-person course project with Rupsika Thipparthi for CSS 311 Parallel and Distributed Computing at IIIT Kottayam: serial and OpenMP implementations, benchmarking and the written report."
        stats={STATS}
      />

      {/* 01 Problem */}
      <Section
        eyebrow="01 — The problem"
        title="Every pixel is independent, so the work shouldn’t wait in line"
        intro="Both transforms compute each output pixel from the input alone (the negative from one pixel, Sobel from a 3×3 neighbourhood) and never from other outputs. Nothing has to happen in order, which is exactly the shape of problem that splits cleanly across cores. A serial loop leaves all but one core idle."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Negative</span>
            <h4>Contrast inversion</h4>
            <p>Flipping intensities (dark ↔ light) makes faint bright structures easier to see against a light background.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Sobel</span>
            <h4>Boundary detection</h4>
            <p>The gradient magnitude peaks where intensity changes sharply: the outlines of lungs, heart, vessels and bone.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Scale</span>
            <h4>Batches grow fast</h4>
            <p>Work is O(N·H·W): double the resolution and the pixel count quadruples. The serial time grows with it; the parallel time grows with it divided by the core count.</p>
          </div>
        </div>
      </Section>

      {/* 02 Results */}
      <Section
        eyebrow="02 — Output"
        title="Real slices, real output"
        intro="Three of the six CT slices from the benchmark batch, exactly as the program wrote them to the negative/ and edge/ folders."
      >
        <div className="cs-blueprint" style={{ gap: '18px' }}>
          <div className="cs-gallery-head">
            <span>Input</span><span>Negative · 255 − r</span><span>Sobel edges</span>
          </div>
          {[1, 3, 5].map((n) => (
            <div key={n} className="cs-gallery-row">
              <img src={encodeURI(`${SAMPLES}in${n}.png`)} alt={`CT slice ${n}, input`} loading="lazy" />
              <img src={encodeURI(`${SAMPLES}neg${n}.png`)} alt={`CT slice ${n}, negative transform`} loading="lazy" />
              <img src={encodeURI(`${SAMPLES}edge${n}.png`)} alt={`CT slice ${n}, Sobel edge map`} loading="lazy" />
            </div>
          ))}
        </div>
      </Section>

      {/* 03 Pipeline */}
      <Section
        eyebrow="03 — Architecture"
        title="One pipeline per image, many images at once"
        intro="Both builds run the same per-image pipeline; the only difference is the OpenMP pragmas. The outer loop over files is where the parallelism comes from: each thread takes a whole image and carries it from PNG in to both PNGs out."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <PipelineDiagram />
          </div>
        </div>
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">I/O</span>
            <h4>Header-only image libraries</h4>
            <p><code>stb_image</code> decodes each PNG straight to one 8-bit channel (<code>req_comp = 1</code>), and <code>stb_image_write</code> encodes the results. No OpenCV, no build system: one <code>g++ -std=c++17 -fopenmp</code> command.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Thread safety</span>
            <h4>No shared writes</h4>
            <p>Every thread allocates its own matrix and output buffers, so no locks are needed on pixel data. <code>reduction(+:totalProcessed)</code> gives each thread a private counter, and <code>omp critical</code> serializes only the console output.</p>
          </div>
        </div>
      </Section>

      {/* 04 Schedule */}
      <Section
        eyebrow="04 — Parallel execution"
        title="A pool of threads pulling images off a queue"
        intro="With schedule(dynamic), a thread that finishes an image immediately takes the next one from the queue instead of working through a fixed block. That matters when images differ in size or disk latency. The chart is drawn to scale against the two measured totals; the four-thread assignment (as in the report’s flowchart) is illustrative."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <ScheduleDiagram />
          </div>
        </div>
      </Section>

      {/* 05 Kernels */}
      <Section
        eyebrow="05 — The pixel math"
        title="Two transforms, a handful of integer operations"
      >
        <div className="cs-two-col" style={{ alignItems: 'start' }}>
          <div className="cs-card" style={{ gap: '14px' }}>
            <span className="cs-card-kicker">Negative transform</span>
            <h4>s = (L − 1) − r, with L = 256</h4>
            <p>One subtraction per pixel. It reads one input value and writes one output value, so the loop is limited by memory bandwidth, not arithmetic.</p>
            <pre className="cs-code">{`negativeData[i * width + j] = 255 - image[i][j];`}</pre>
          </div>
          <div className="cs-card" style={{ gap: '14px' }}>
            <span className="cs-card-kicker">Sobel edge detection</span>
            <h4>G = √(Gx² + Gy²), clamped to 255</h4>
            <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap', padding: '6px 0' }}>
              <Kernel label="Gx · horizontal" m={[[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]} />
              <Kernel label="Gy · vertical" m={[[-1, -2, -1], [0, 0, 0], [1, 2, 1]]} />
            </div>
            <p>Each interior pixel convolves its 3×3 neighbourhood with both kernels (18 multiply-adds), then takes the magnitude. The one-pixel border is left black because it has no full neighbourhood.</p>
          </div>
        </div>
      </Section>

      {/* 06 Performance */}
      <Section
        eyebrow="06 — Performance"
        title="3.28× faster on the same batch"
        intro="Both builds were timed end to end with omp_get_wtime(), from before the first file is read until after the last PNG is written, so disk I/O is included in both numbers."
      >
        <div className="cs-blueprint" style={{ gap: '22px' }}>
          {[
            ['Serial', '0.321 s', 1, '#f59e0b', '#b45309'],
            ['OpenMP', '0.098 s', 0.098 / 0.321, '#22d3ee', '#0e7490']
          ].map(([name, val, frac, fill, ink]) => (
            <div key={name} className="cs-perf-row">
              <strong style={{ color: ink }}>{name}</strong>
              <div className="cs-perf-track"><i style={{ width: `${frac * 100}%`, background: fill }} /></div>
              <span className="mono" style={{ color: ink }}>{val}</span>
            </div>
          ))}
        </div>
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead><tr><th>Build</th><th>Batch time</th><th>Speedup</th><th>Workload</th></tr></thead>
            <tbody>
              <tr><td>Serial</td><td>0.321 s</td><td>1×</td><td>6 PNG slices, 512 × 512, grayscale</td></tr>
              <tr><td>OpenMP</td><td>0.098 s</td><td>3.28×</td><td>Same files; parallel over images, dynamic schedule</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 07 Finding */}
      <Section
        eyebrow="07 — What we found"
        title="The inner pragmas don’t add threads, and that’s the interesting part"
        intro="The parallel build also puts #pragma omp parallel for collapse(2) on every pixel loop. But those loops run inside the outer parallel loop, and OpenMP disables nested parallelism by default: an inner parallel region started by a thread that’s already in a team gets a team of one. So each image’s pixel loops run on the thread that owns the image, and the whole 3.28× comes from processing images side by side."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Why it still works</span>
            <h4>Image-level parallelism is enough, for batches</h4>
            <p>As long as there are at least as many images as cores, every core stays busy on its own image with no synchronization inside the pixel loops. It stops helping when a batch has fewer images than cores, or is a single very large scan.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">What we tried</span>
            <h4>Running Negative and Sobel side by side</h4>
            <p>The two transforms of one image are independent, but they run one after the other. Our attempts to split them across threads ran everything on thread 0 or came out slower, which is the nested-region behaviour above.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">The fix</span>
            <h4>Flatten, or use tasks</h4>
            <p>Parallelize one level only: over images × rows, or over pixels with images in sequence. Alternatively, spawn Negative and Sobel as <code>#pragma omp task</code>s. <code>omp_set_max_active_levels(2)</code> also works, but risks oversubscribing the cores.</p>
          </div>
        </div>
      </Section>

      {/* 08 Stack */}
      <Section eyebrow="08 — Stack" title="What each piece does">
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead><tr><th>Piece</th><th>Technology</th><th>Role</th></tr></thead>
            <tbody>
              {[
                ['Language', 'C++17', 'std::filesystem for output folders, vectors for buffers'],
                ['Parallelism', 'OpenMP (libgomp)', 'parallel for, schedule(dynamic), reduction, critical, collapse'],
                ['Compiler', 'GCC via MinGW-w64', 'g++ -std=c++17 -fopenmp on Windows'],
                ['Image I/O', 'stb_image · stb_image_write', 'Header-only PNG decode to grayscale and PNG encode'],
                ['Timing', 'omp_get_wtime()', 'Wall-clock time for the whole batch, I/O included'],
                ['Data', 'CT slices (PNG + 100 TIFF in repo)', 'Six 512 × 512 PNGs benchmarked; TIFF set kept for scale-up']
              ].map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 09 Next */}
      <Section eyebrow="09 — What’s next" title="Where this goes from here">
        <div className="cs-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="cs-card">
            <span className="cs-card-kicker">Memory layout</span>
            <h4>Flat buffers, one pass</h4>
            <p>Replace <code>vector&lt;vector&lt;int&gt;&gt;</code> with one contiguous buffer and compute the negative and Sobel values in a single sweep, so each pixel is read from memory once.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Benchmark</span>
            <h4>The 100-slice TIFF set</h4>
            <p>The repo already holds 100 CT slices as TIFF. stb_image doesn’t read TIFF, so converting them (or adding a TIFF reader) would give a much larger batch and a proper thread-scaling curve.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Scale out</span>
            <h4>MPI and CUDA</h4>
            <p>MPI to spread batches across machines; CUDA for the per-pixel kernels, where thousands of GPU threads suit Sobel’s regular 3×3 access pattern.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Preprocessing</span>
            <h4>More filters</h4>
            <p>Noise removal, histogram equalization and adaptive thresholding would make the pipeline closer to a real diagnostic preprocessing stage.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
