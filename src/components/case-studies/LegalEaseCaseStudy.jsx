import { CaseStudyHero, Markers, Node, Section } from './shared'

// Deep-dive page for LegalEase (github.com/CASPER0022/Legal-RAG-Assistant).
// Every number here comes from the repo: backend/ingest.py, retriever.py,
// output.py, eval.py, Dockerfile and the kb/text statute PDFs.


/* ── 1. System architecture ── */

function ArchitectureDiagram() {
  const lane = { fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em' }
  const note = { fontSize: 11, fill: '#64748b' }
  return (
    <svg viewBox="0 0 1000 656" role="img" aria-labelledby="arch-title arch-desc" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="arch-title">LegalEase system architecture</title>
      <desc id="arch-desc">An offline pipeline turns three statute PDFs into embedded chunks in ChromaDB. At query time the React client calls FastAPI, which embeds the question, pulls 25 candidates from ChromaDB, re-ranks them to 8 with FlashRank, builds a source-tagged prompt with session memory, asks gpt-oss:120b for JSON, parses it and returns it to the UI.</desc>
      <Markers />

      {/* Offline lane */}
      <rect x="1" y="1" width="998" height="194" rx="20" fill="#f0fdfa" stroke="#99f6e4" strokeDasharray="6 5" />
      <text x="20" y="30" fill="#0d9488" {...lane}>OFFLINE · INDEX BUILD</text>
      <text x="980" y="30" textAnchor="end" {...note}>runs once, at image build: RUN python ingest.py</text>
      <Node x={20} y={56} n="A" tone="teal" title="Knowledge base" lines={['BNS · BNSS · BSA (2023)', '3 gazette PDFs · 398 pp']} />
      <Node x={218} y={56} n="B" tone="teal" title="Text extraction" lines={['PyPDF2, page by page', 'source + path metadata']} />
      <Node x={416} y={56} n="C" tone="teal" title="Chunking" lines={['Recursive splitter', '1200 chars · 200 overlap']} />
      <Node x={614} y={56} n="D" tone="teal" title="Embedding" lines={['all-MiniLM-L6-v2', '384-d, L2-normalized']} />
      <Node x={812} y={56} n="E" tone="teal" title="Vector store" lines={['ChromaDB (persistent)', 'upsert → kb_chunks']} />
      {[188, 386, 584, 782].map((x) => (
        <line key={x} x1={x + 2} y1="106" x2={x + 26} y2="106" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-teal)" />
      ))}

      {/* Online lane */}
      <rect x="1" y="226" width="998" height="428" rx="20" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="6 5" />
      <text x="20" y="255" fill="#2563eb" {...lane}>ONLINE · QUERY PATH (PER REQUEST)</text>

      <Node x={20} y={276} n="1" tone="navy" title="React client" lines={['Vite · Tailwind · axios', 'per-browser session id']} />
      <Node x={218} y={276} n="2" title="FastAPI" lines={['POST /api/chat', '{ query, session_id }']} />
      <Node x={416} y={276} n="3" title="Query encoder" lines={['same MiniLM model', '→ 384-d vector']} />
      <Node x={812} y={276} n="4" title="Dense search" lines={['Chroma nearest-neighbour', 'k = 25 candidates']} />

      <Node x={812} y={436} n="5" title="Re-ranker" lines={['FlashRank cross-encoder', 'ms-marco-MiniLM-L-12 → 8']} />
      <Node x={614} y={436} n="6" title="Prompt builder" lines={['[Source: file] chunks', '+ last 3 exchanges']} />
      <Node x={416} y={436} n="7" tone="violet" title="LLM" lines={['gpt-oss:120b via Ollama', 'JSON mode · temp 0.0']} />
      <Node x={218} y={436} n="8" title="Parser" lines={['json.loads → regex', '3-level fallback']} />
      <Node x={20} y={436} n="9" tone="navy" title="Answer UI" lines={['Markdown answer', 'citation cards · confidence']} />

      <Node x={614} y={576} h={60} title="Session memory" lines={[]} tone="navy" />
      <text x={630} y={622} fontSize="11.5" fill="#64748b">chat_history.json · cap 50</text>

      {/* index → dense search */}
      <line x1="896" y1="158" x2="896" y2="272" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-teal)" />
      <text x="906" y="215" fontSize="11" fill="#0d9488" fontWeight="600">cosine top-25</text>

      {/* row 1 */}
      <line x1="190" y1="326" x2="214" y2="326" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="388" y1="326" x2="412" y2="326" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="586" y1="326" x2="808" y2="326" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <text x="697" y="316" textAnchor="middle" fontSize="11" fill="#2563eb" fontWeight="600">384-d query vector</text>
      <text x="697" y="352" textAnchor="middle" fontSize="11" fill="#94a3b8" fontStyle="italic">0 hits → early reply,</text>
      <text x="697" y="367" textAnchor="middle" fontSize="11" fill="#94a3b8" fontStyle="italic">LLM is never called</text>

      {/* dense → rerank */}
      <line x1="896" y1="378" x2="896" y2="432" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <text x="906" y="410" fontSize="11" fill="#2563eb" fontWeight="600">25 passages</text>

      {/* row 2, right to left */}
      <line x1="810" y1="486" x2="786" y2="486" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="612" y1="486" x2="588" y2="486" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <line x1="414" y1="486" x2="390" y2="486" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <line x1="216" y1="486" x2="192" y2="486" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />

      {/* answer back to client */}
      <line x1="104" y1="434" x2="104" y2="382" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />
      <text x="114" y="412" fontSize="11" fill="#64748b" fontWeight="600">JSON response</text>

      {/* prompt builder ↔ session memory */}
      <line x1="698" y1="540" x2="698" y2="572" stroke="#94a3b8" strokeWidth="2" markerStart="url(#arrow-grey)" markerEnd="url(#arrow-grey)" />
      <text x="708" y="560" fontSize="11" fill="#64748b">read last 3 · append</text>
    </svg>
  )
}

/* ── 2. Request lifecycle (sequence) ── */

const ACTORS = [
  ['Browser', 70],
  ['FastAPI', 215],
  ['Retriever', 360],
  ['ChromaDB', 505],
  ['FlashRank', 650],
  ['Session', 795],
  ['gpt-oss', 930]
]
const X = Object.fromEntries(ACTORS)

const MESSAGES = [
  ['Browser', 'FastAPI', 'POST /api/chat { query, session_id }'],
  ['FastAPI', 'Retriever', 'retrieve(query, k=25, rerank_k=8)'],
  ['Retriever', 'ChromaDB', 'query(embedding, n_results=25)'],
  ['ChromaDB', 'Retriever', '25 chunks + metadata', true],
  ['Retriever', 'FlashRank', 'rerank(query, passages)'],
  ['FlashRank', 'Retriever', 'top 8 + relevance scores', true],
  ['Retriever', 'FastAPI', 'docs, metadatas, scores', true],
  null,
  ['FastAPI', 'Session', 'load last 3 exchanges'],
  ['FastAPI', 'gpt-oss', 'generate(prompt, format=json, temperature=0)'],
  ['gpt-oss', 'FastAPI', 'JSON string', true],
  ['FastAPI', 'Session', 'append exchange → chat_history.json'],
  ['FastAPI', 'Browser', '{ answer, legal_terms, relevant_articles, confidence }', true]
]

// Row positions: messages are 36 units apart, the "no docs" note takes 48.
const SEQ_ROWS = (() => {
  let y = 92
  let n = 0
  return MESSAGES.map((m) => {
    const row = { m, y, n: m ? ++n : null }
    y += m ? 36 : 48
    return row
  })
})()
const SEQ_HEIGHT = SEQ_ROWS[SEQ_ROWS.length - 1].y + 40

function SequenceDiagram() {
  const rows = SEQ_ROWS.map(({ m, y, n }, i) => {
    if (!m) {
      return (
        <g key={i}>
          <rect x="150" y={y - 16} width="440" height="34" rx="8" fill="#fffbeb" stroke="#fcd34d" />
          <text x="370" y={y + 5} textAnchor="middle" fontSize="11.5" fill="#92400e">
            if docs is empty → return “No relevant documents…” (LLM never called)
          </text>
        </g>
      )
    }
    const [from, to, label, dashed] = m
    const x1 = X[from]
    const x2 = X[to]
    const dir = x2 > x1 ? 1 : -1
    const mid = (x1 + x2) / 2
    return (
      <g key={i}>
        <line
          x1={x1 + dir * 4}
          y1={y}
          x2={x2 - dir * 6}
          y2={y}
          stroke={dashed ? '#94a3b8' : '#60a5fa'}
          strokeWidth="1.8"
          strokeDasharray={dashed ? '5 4' : undefined}
          markerEnd={dashed ? 'url(#arrow-grey)' : 'url(#arrow-blue)'}
        />
        <text x={mid} y={y - 7} textAnchor="middle" fontSize="11.5" fill={dashed ? '#64748b' : '#1e293b'}>
          <tspan fontFamily="monospace" fontWeight="700" fill="#2563eb">{n}  </tspan>
          {label}
        </text>
      </g>
    )
  })
  const height = SEQ_HEIGHT
  return (
    <svg viewBox={`0 0 1000 ${height}`} role="img" aria-labelledby="seq-title" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="seq-title">Request lifecycle for one chat message, from browser to model and back</title>
      <Markers />
      {ACTORS.map(([name, x]) => (
        <g key={name}>
          <line x1={x} y1="46" x2={x} y2={height - 6} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x={x - 56} y="10" width="112" height="34" rx="10" fill={name === 'gpt-oss' ? '#faf5ff' : '#ffffff'} stroke={name === 'gpt-oss' ? '#c4b5fd' : '#cbd5e1'} strokeWidth="1.5" />
          <text x={x} y="32" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0f1f4b">{name}</text>
        </g>
      ))}
      {rows}
    </svg>
  )
}

/* ── 3. Advocate decision loop ── */

function AdvocateDiagram() {
  return (
    <svg viewBox="0 0 1000 250" role="img" aria-labelledby="adv-title" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="adv-title">How the advocate persona decides between asking questions and giving a strategy</title>
      <Markers />
      <rect x="20" y="95" width="160" height="60" rx="14" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="100" y="121" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#0f1f4b">Client message</text>
      <text x="100" y="140" textAnchor="middle" fontSize="11.5" fill="#64748b">+ session history</text>
      <line x1="182" y1="125" x2="206" y2="125" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />

      <polygon points="300,62 392,125 300,188 208,125" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="300" y="122" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f1f4b">Enough</text>
      <text x="300" y="138" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f1f4b">facts?</text>

      {/* no → ask */}
      <path d="M300 62 V52 H464" fill="none" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <text x="318" y="44" fontSize="11.5" fontWeight="700" fill="#2563eb">no</text>
      <rect x="470" y="20" width="220" height="64" rx="14" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="580" y="46" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#0f1f4b">Ask 1–3 clarifying questions</text>
      <text x="580" y="66" textAnchor="middle" fontSize="11.5" fill="#64748b">injury? location? intent? — nothing else</text>
      <line x1="692" y1="52" x2="756" y2="52" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <rect x="762" y="20" width="218" height="64" rx="14" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="871" y="46" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#0f1f4b">Client replies</text>
      <text x="871" y="66" textAnchor="middle" fontSize="11.5" fill="#64748b">stored in session memory</text>

      {/* loop back */}
      <path d="M800 86 V125 H396" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-grey)" />
      <text x="600" y="118" textAnchor="middle" fontSize="11" fill="#64748b">re-evaluated with the new facts</text>

      {/* declines → final */}
      <line x1="945" y1="86" x2="945" y2="162" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-violet)" />
      <text x="935" y="146" textAnchor="end" fontSize="11" fill="#7c3aed" fontWeight="600">declines / “just advise me”</text>

      {/* yes → final */}
      <path d="M300 188 V198 H464" fill="none" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <text x="318" y="216" fontSize="11.5" fontWeight="700" fill="#7c3aed">yes</text>
      <rect x="470" y="166" width="510" height="64" rx="14" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="725" y="192" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#0f1f4b">Final strategy</text>
      <text x="725" y="212" textAnchor="middle" fontSize="11.5" fill="#64748b">cited Sections · penalties &amp; fines · compensation · step-by-step plan</text>
    </svg>
  )
}

/* ── Retrieval funnel (HTML) ── */

function Bars({ count, cols, on = [] }) {
  return (
    <div className="cs-funnel-bars" style={{ gridTemplateColumns: `repeat(${cols}, 26px)` }}>
      {Array.from({ length: count }, (_, i) => (
        <b key={i} className={on === 'all' || on.includes(i) ? 'on' : ''} />
      ))}
    </div>
  )
}

function RetrievalFunnel() {
  return (
    <div className="cs-blueprint">
      <div className="cs-funnel">
        <div className="cs-funnel-stage">
          <div className="cs-funnel-n">Index</div>
          <Bars count={40} cols={8} />
          <div className="cs-funnel-caption"><strong>Every chunk of BNS · BNSS · BSA</strong><span>1200-char chunks in Chroma</span></div>
        </div>
        <div className="cs-funnel-arrow">→</div>
        <div className="cs-funnel-stage">
          <div className="cs-funnel-n">25</div>
          <Bars count={25} cols={5} on={[1, 4, 7, 9, 12, 16, 20, 23]} />
          <div className="cs-funnel-caption"><strong>Bi-encoder recall</strong><span>MiniLM · cosine · fast</span></div>
        </div>
        <div className="cs-funnel-arrow">→</div>
        <div className="cs-funnel-stage">
          <div className="cs-funnel-n" style={{ color: '#2563eb' }}>8</div>
          <Bars count={8} cols={4} on="all" />
          <div className="cs-funnel-caption"><strong>Cross-encoder precision</strong><span>FlashRank · reads query + passage</span></div>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */

const STATS = [
  ['398', 'pages of statute indexed: BNS, BNSS and BSA'],
  ['25 → 8', 'dense candidates, re-ranked by a cross-encoder'],
  ['1200 / 200', 'chunk size and overlap, in characters'],
  ['0.0', 'LLM temperature, with JSON-mode output'],
  ['3', 'past exchanges carried as session memory'],
  ['4', 'RAGAS metrics in the evaluation harness']
]

const OFFLINE_STEPS = [
  ['A', 'Knowledge base', 'The official English gazette PDFs of the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam live in kb/text.'],
  ['B', 'Extract', 'PyPDF2 pulls text page by page; each document keeps its filename as source metadata, which later becomes the citation badge.'],
  ['C', 'Chunk', 'RecursiveCharacterTextSplitter cuts on paragraph → line → word boundaries at 1200 characters with 200 overlap, so a section and its sub-clauses usually stay together.'],
  ['D', 'Embed', 'all-MiniLM-L6-v2 encodes every chunk into a normalized 384-d vector, so cosine similarity is a plain dot product.'],
  ['E', 'Store', 'Chunks are upserted into a persistent ChromaDB collection with deterministic ids (file-chunkN), so re-running ingest is idempotent.']
]

const ONLINE_STEPS = [
  ['1', 'Client', 'React sends the query plus a session id generated once per browser and kept in localStorage.'],
  ['2', 'API', 'FastAPI exposes /api/chat and /api/clear; the chat handler delegates to generate_answer().'],
  ['3–4', 'Recall', 'The question is embedded with the same MiniLM model and matched against Chroma for the 25 nearest chunks.'],
  ['5', 'Precision', 'FlashRank’s ms-marco cross-encoder scores each (query, passage) pair and keeps the best 8.'],
  ['6', 'Prompt', 'Each chunk is tagged [Source: file]; the last 3 exchanges of this session are prepended as conversation context.'],
  ['7', 'Generate', 'gpt-oss:120b (Ollama API) answers at temperature 0 in JSON mode, capped at 2048 tokens and a 60 s timeout.'],
  ['8', 'Parse', 'Strict json.loads, then first-{…}-block extraction, then a regex that rescues the answer and confidence fields.'],
  ['9', 'Render', 'The UI renders the Markdown answer, legal-term citation cards with verbatim quotes, and an expandable list of articles.']
]

export default function LegalEaseCaseStudy({ project }) {
  return (
    <div className="cs">
      <CaseStudyHero
        project={project}
        video="/Projects/Legal ease/legalease-overview.mp4"
        poster="/Projects/Legal ease/legalease-overview-poster.jpg"
        videoLabel="21-second overview of LegalEase: a legal question goes in, a cited answer comes out"
        subtitle="A retrieval-augmented legal advisor for India’s new criminal codes"
        lede={
          'Ask LegalEase what you can do after an assault, a theft or a police refusal, and it answers the way a trial ' +
          'advocate would: it asks for the facts it is missing, then gives a step-by-step strategy that names the exact ' +
          'Section of the BNS, BNSS or BSA and quotes the statute text that supports it. Answers come only from the ' +
          'retrieved law; if a section number isn’t in the retrieved text, the model is told not to invent one.'
        }
        tags={['React 19', 'Vite', 'Tailwind', 'FastAPI', 'ChromaDB', 'Sentence-Transformers', 'FlashRank', 'LangChain splitters', 'gpt-oss:120b', 'Ollama API', 'RAGAS', 'Docker']}
        role="Solo build: ingestion pipeline, retrieval and re-ranking, prompt design, FastAPI service, React client, Docker packaging and the evaluation harness."
        stats={STATS}
      />

      {/* 01 Problem */}
      <Section
        eyebrow="01 — The problem"
        title="The answer exists. It’s buried in 398 pages."
        intro="In July 2024 India replaced the IPC, CrPC and Evidence Act with three new codes. Someone who has just been hurt, robbed or turned away at a police station doesn’t know which code applies, let alone which section, and a general-purpose chatbot will happily quote an IPC section that no longer exists."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Vocabulary gap</span>
            <h4>People don’t speak statute</h4>
            <p>“Someone hit me” has no keyword overlap with “voluntarily causes hurt”. Keyword search misses it, so retrieval has to work on meaning.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Hallucination</span>
            <h4>LLMs invent section numbers</h4>
            <p>A confident answer citing a wrong or repealed section is worse than no answer. Every claim has to trace back to retrieved text.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Missing facts</span>
            <h4>Real questions are underspecified</h4>
            <p>Injury severity, location and intent change which section applies. A good advisor asks before it advises.</p>
          </div>
        </div>
      </Section>

      {/* 02 Architecture */}
      <Section
        eyebrow="02 — System architecture"
        title="Two pipelines: build the index once, answer every query from it"
        intro="The offline lane runs once, inside the Docker build, so every container starts with the vector index already built. The online lane runs on every message and is a two-stage retriever followed by a grounded, structured generator."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <ArchitectureDiagram />
          </div>
          <div className="cs-legend">
            <span><i style={{ background: '#5eead4' }} />Offline indexing</span>
            <span><i style={{ background: '#93c5fd' }} />Retrieval &amp; API</span>
            <span><i style={{ background: '#c4b5fd' }} />Generation</span>
            <span><i style={{ background: '#94a3b8' }} />Client &amp; state</span>
          </div>
        </div>
        <div className="cs-two-col">
          <div className="cs-card" style={{ gap: '16px' }}>
            <span className="cs-card-kicker">Offline · ingest.py</span>
            {OFFLINE_STEPS.map(([n, t, d]) => (
              <div key={n} className="cs-step">
                <span className="cs-step-n teal">{n}</span>
                <div className="cs-step-body"><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>
          <div className="cs-card" style={{ gap: '16px' }}>
            <span className="cs-card-kicker">Online · api.py → retriever.py → output.py</span>
            {ONLINE_STEPS.map(([n, t, d]) => (
              <div key={n} className="cs-step">
                <span className="cs-step-n" style={n.length > 1 ? { width: 'auto', padding: '0 6px', borderRadius: '9999px' } : undefined}>{n}</span>
                <div className="cs-step-body"><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 03 Lifecycle */}
      <Section
        eyebrow="03 — Request lifecycle"
        title="One message, end to end"
        intro="What happens between pressing send and seeing a cited answer. The retriever returns before the model is ever called, so an empty retrieval costs no LLM tokens and can’t produce an ungrounded answer."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <SequenceDiagram />
          </div>
        </div>
      </Section>

      {/* 04 Retrieval */}
      <Section
        eyebrow="04 — Retrieval"
        title="Cast a wide net, then read closely"
        intro="A bi-encoder embeds the query and each chunk separately, which is fast enough to search the whole index but only approximates relevance. A cross-encoder reads the query and passage together and scores them much more accurately, but is too slow to run over every chunk. LegalEase uses each where it’s strong."
      >
        <RetrievalFunnel />
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Chunking</span>
            <h4>Large chunks keep sections whole</h4>
            <p>Statute sections carry their meaning in sub-clauses and explanations. 1200-character chunks with 200 overlap keep a section number together with its punishment clause, so a citation and its penalty come from the same chunk.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Re-ranking</span>
            <h4>Only 8 chunks reach the model</h4>
            <p>Re-ranking 25 → 8 keeps the prompt short and relevant: less noise for the model to wrongly cite, fewer tokens per request, and room left in context for conversation history.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Resilience</span>
            <h4>Degrades instead of failing</h4>
            <p>If the FlashRank model can’t load (memory limits, a cold-start download failure) or <code>DISABLE_RERANKER=true</code>, the retriever falls back to dense-only top-8 and the API stays up.</p>
          </div>
        </div>
      </Section>

      {/* 05 Advocate */}
      <Section
        eyebrow="05 — Prompt design"
        title="An advocate that asks before it advises"
        intro="The system prompt casts the model as a trial advocate speaking directly to a client, with explicit rules for when to ask questions and when to give a strategy. Session memory is what makes the question-and-answer loop work across turns."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <AdvocateDiagram />
          </div>
        </div>
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">Grounding rule</span>
            <h4>No section number the context doesn’t contain</h4>
            <p>The prompt ends with an explicit instruction: if an article, section or penalty isn’t in the provided context, don’t invent it. Every retrieved chunk is prefixed with its source file, so the model can attribute each claim.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Determinism</span>
            <h4>Temperature 0, JSON mode</h4>
            <p>Ollama’s <code>format: "json"</code> plus temperature 0 makes the output machine-readable and repeatable: the same question over the same retrieval gives the same answer, which is what legal advice needs.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Voice</span>
            <h4>Citations woven into the plan</h4>
            <p>Section numbers go into headers and steps (“Under Section 115(2) of the BNS…”), and the answer is Markdown with bold sub-headers and numbered steps instead of a wall of text.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Respecting the client</span>
            <h4>Stop asking when told to</h4>
            <p>If the client says “I’d rather not say” or asks for the strategy directly, the model stops asking and gives the best advice it can with the facts it has.</p>
          </div>
        </div>
      </Section>

      {/* 06 Contract */}
      <Section
        eyebrow="06 — Response contract"
        title="Structured output the UI can trust"
        intro="The model returns one JSON object. The React client maps each field to a component, so citations render as cards with verbatim quotes, not as prose the user has to take on faith."
      >
        <div className="cs-two-col" style={{ alignItems: 'start' }}>
          <pre className="cs-code">{`{
  `}<span className="k">"answer"</span>{`: `}<span className="s">"## Under Section 115(2) of the BNS…"</span>{`,
  `}<span className="k">"legal_terms"</span>{`: [{
    `}<span className="k">"term"</span>{`:    `}<span className="s">"Voluntarily causing hurt"</span>{`,
    `}<span className="k">"article"</span>{`: `}<span className="s">"Section 115(2) of the BNS"</span>{`,
    `}<span className="k">"quote"</span>{`:   `}<span className="s">"…may extend to one year…"</span>{`,
    `}<span className="k">"source"</span>{`:  `}<span className="s">"250883_english_01042024.pdf"</span>{`
  }],
  `}<span className="k">"relevant_articles"</span>{`: [{
    `}<span className="k">"article"</span>{`: `}<span className="s">"Section 173(1) of the BNSS"</span>{`,
    `}<span className="k">"reason"</span>{`:  `}<span className="s">"FIR can be filed at any station"</span>{`
  }],
  `}<span className="k">"confidence"</span>{`: `}<span className="s">"high"</span>{`  `}<span className="c">{'// low | medium | high'}</span>{`
}`}</pre>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              ['answer', 'Rendered with react-markdown: headers, numbered steps, bold section references.'],
              ['legal_terms', 'One card per term: the term, its citation, a source badge and the verbatim quote from the statute.'],
              ['relevant_articles', 'Collapsible “View Referenced Articles” panel explaining why each section matters to this case.'],
              ['confidence', 'The model’s own rating of how directly the retrieved text supports the answer.']
            ].map(([k, d]) => (
              <div key={k} className="cs-step">
                <span className="cs-step-n" style={{ width: 'auto', padding: '0 8px', fontSize: '10.5px' }}>{k}</span>
                <div className="cs-step-body"><span>{d}</span></div>
              </div>
            ))}
            <div className="cs-card" style={{ marginTop: '6px' }}>
              <span className="cs-card-kicker">Never a blank reply</span>
              <p>Large models occasionally emit malformed JSON. The parser tries strict parsing, then the first <code>{'{…}'}</code> block, then a regex that recovers <code>answer</code> and <code>confidence</code> from broken output, and finally returns the raw text. The client applies one more cleanup pass if it receives JSON inside the answer string.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 Ops */}
      <Section
        eyebrow="07 — Sessions & deployment"
        title="Built to run on a free tier"
        intro="The frontend is a static Vite build on Vercel; the API is a Docker image. Free-tier hosts have little memory and sleep when idle, and several decisions follow from that."
      >
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">Per-user memory</span>
            <h4>Sessions keyed by a browser UUID</h4>
            <p>Each browser gets a <code>crypto.randomUUID()</code> session id. The server keeps a dict of sessions, persists it to <code>chat_history.json</code>, caps each at 50 exchanges and feeds the last 3 into the prompt. “New Session” calls <code>/api/clear</code>. Older single-list history files are upgraded on load.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Index in the image</span>
            <h4>Cold starts don’t re-ingest</h4>
            <p>The Dockerfile runs <code>python ingest.py</code> at build time, so the ChromaDB index ships inside the image and a new container can answer immediately.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Memory budget</span>
            <h4>Small models, one thread</h4>
            <p>PyTorch is pinned to one thread, both encoders are MiniLM-sized, and the re-ranker can be switched off with an environment variable on hosts that can’t fit it.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Cold-start UX</span>
            <h4>The client expects a sleeping server</h4>
            <p>Requests get a 90 s timeout. After 8 s the loader changes to “the server may be waking up from idle”, and a timeout produces a clear retry message instead of a generic error.</p>
          </div>
        </div>
      </Section>

      {/* 08 Evaluation */}
      <Section
        eyebrow="08 — Evaluation"
        title="Measuring the pipeline, not just eyeballing it"
        intro="eval.py runs the real retrieve → generate path over a golden set of questions with reference answers, scores it with RAGAS and exports the results to CSV, so changes to chunking, k or the prompt can be compared instead of guessed at."
      >
        <div className="cs-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            ['Faithfulness', 'Is every claim in the answer supported by the retrieved chunks? The anti-hallucination metric.'],
            ['Answer relevance', 'Does the answer address the question that was actually asked?'],
            ['Context precision', 'Are the chunks that reach the model the relevant ones? Measures what the re-ranker adds.'],
            ['Context recall', 'Did retrieval find everything the reference answer needs? Measures the dense stage and chunking.']
          ].map(([t, d]) => (
            <div key={t} className="cs-card">
              <span className="cs-card-kicker">RAGAS</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 09 Stack */}
      <Section eyebrow="09 — Stack" title="What each piece does">
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead>
              <tr><th>Layer</th><th>Technology</th><th>Role</th></tr>
            </thead>
            <tbody>
              {[
                ['Frontend', 'React 19 · Vite · Tailwind · lucide-react · react-markdown · axios', 'Chat UI, citation cards, session id, cold-start handling'],
                ['API', 'FastAPI · Uvicorn · Pydantic', '/api/chat and /api/clear, CORS, request models'],
                ['Ingestion', 'PyPDF2 · LangChain RecursiveCharacterTextSplitter', 'PDF text extraction and boundary-aware chunking'],
                ['Embeddings', 'sentence-transformers/all-MiniLM-L6-v2', '384-d normalized vectors for chunks and queries'],
                ['Vector DB', 'ChromaDB (persistent client)', 'Nearest-neighbour search over kb_chunks'],
                ['Re-ranker', 'FlashRank · ms-marco-MiniLM-L-12-v2', 'Cross-encoder scoring, 25 → 8'],
                ['LLM', 'gpt-oss:120b via the Ollama API', 'Grounded, JSON-structured advocate responses'],
                ['Evaluation', 'RAGAS · HuggingFace datasets · pandas', 'Faithfulness, relevance, context precision and recall'],
                ['Delivery', 'Docker (python:3.10-slim) · Vercel', 'API image with a pre-built index; static frontend']
              ].map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 10 Next */}
      <Section
        eyebrow="10 — What’s next"
        title="Where the pipeline goes from here"
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Retrieval</span>
            <h4>Hybrid BM25 + dense</h4>
            <p>Exact tokens like “Section 173” are where lexical search beats embeddings. <code>rank_bm25</code> is already a dependency, and the retriever was written to accept a hybrid first stage.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Indexing</span>
            <h4>Section-aware chunks</h4>
            <p>Splitting on section headings and storing the act and section number as metadata would let citations be verified against metadata, not just the prompt rule.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">UX</span>
            <h4>Streaming answers</h4>
            <p>Streaming tokens would make long strategies feel faster, with citation cards attached once the JSON completes.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
