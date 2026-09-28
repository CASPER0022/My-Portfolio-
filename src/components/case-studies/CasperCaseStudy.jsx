import { CaseStudyHero, Markers, Node, Section } from './shared'

// Deep-dive page for Casper 2.0 (github.com/CASPER0022/Casper-2.0-Web-Assistant).
// Everything described here is taken from agent.py, main.py and frontend/src/App.jsx.

/* ── 1. System architecture ── */

function ArchitectureDiagram() {
  const lane = { fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em' }
  return (
    <svg viewBox="0 0 1000 560" role="img" aria-labelledby="c-arch-title c-arch-desc" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="c-arch-title">Casper system architecture</title>
      <desc id="c-arch-desc">The React client opens an EventSource to FastAPI, which streams a LangGraph run. Inside the graph a chatbot node calling Groq loops with a tools node calling DuckDuckGo until the model stops calling tools or the search budget is reached. Each node update is forwarded to the browser as a server-sent event.</desc>
      <Markers />

      {/* Client + API */}
      <Node x={20} y={60} w={200} h={120} n="1" tone="navy" title="React client" lines={['EventSource stream', 'budget slider (1–8)', 'thought-process UI']} />
      <Node x={270} y={60} w={200} h={120} n="2" title="FastAPI · main.py" lines={['GET /api/research', '?query&max_searches', 'EventSourceResponse']} />
      <line x1="222" y1="100" x2="266" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="268" y1="150" x2="224" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-grey)" />
      <text x="245" y="208" textAnchor="middle" fontSize="11" fill="#64748b">GET → · ← server-sent events</text>

      <Node x={270} y={240} w={200} h={150} tone="blue" title="SSE event types" lines={['search_start', 'search_result', 'chatbot_response', 'done · error']} />
      <line x1="370" y1="182" x2="370" y2="236" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <Node x={20} y={240} w={200} h={150} tone="navy" title="Client state" lines={['logs → thought cards', 'loop_count → progress', 'localStorage: 20 runs', 'copy · export .md']} />
      <line x1="268" y1="315" x2="224" y2="315" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />

      {/* API ↔ graph */}
      <line x1="472" y1="100" x2="506" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="506" y1="150" x2="474" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-grey)" />
      <text x="489" y="86" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="600">astream</text>
      <text x="489" y="170" textAnchor="middle" fontSize="10" fill="#64748b">updates</text>

      {/* LangGraph panel */}
      <rect x="510" y="20" width="470" height="380" rx="20" fill="#faf5ff" stroke="#c4b5fd" strokeDasharray="6 5" />
      <text x="528" y="46" fill="#7c3aed" {...lane}>LANGGRAPH · StateGraph(AgentState)</text>
      <rect x="528" y="60" width="434" height="44" rx="10" fill="#ffffff" stroke="#ddd6fe" />
      <text x="545" y="87" fontSize="12" fill="#1e293b">
        <tspan fontWeight="700">AgentState:</tspan> messages (add_messages) · loop_count · max_searches
      </text>

      <rect x="528" y="160" width="64" height="30" rx="15" fill="#0f1f4b" />
      <text x="560" y="179" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="monospace">START</text>
      <line x1="594" y1="175" x2="622" y2="175" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />

      <Node x={626} y={130} w={140} h={110} tone="violet" n="3" title="chatbot" lines={['Groq, tools bound', 'while loop < budget']} />
      <Node x={822} y={130} w={140} h={110} tone="blue" n="4" title="tools" lines={['ToolNode', 'web_search()']} />
      <line x1="768" y1="160" x2="818" y2="160" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-violet)" />
      <text x="793" y="152" textAnchor="middle" fontSize="10.5" fill="#7c3aed" fontWeight="600">tool_calls</text>
      <line x1="820" y1="210" x2="770" y2="210" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <text x="795" y="228" textAnchor="middle" fontSize="10.5" fill="#2563eb" fontWeight="600">results</text>

      <rect x="528" y="300" width="64" height="30" rx="15" fill="#0f1f4b" />
      <text x="560" y="319" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="monospace">END</text>
      <path d="M660 242 V315 H596" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />
      <text x="668" y="284" fontSize="10.5" fill="#64748b" fontWeight="600">no tool calls</text>

      <rect x="790" y="262" width="118" height="50" rx="10" fill="#fef2f2" stroke="#fecaca" />
      <text x="849" y="283" textAnchor="middle" fontSize="10.5" fill="#b91c1c" fontWeight="600">budget reached →</text>
      <text x="849" y="299" textAnchor="middle" fontSize="10.5" fill="#b91c1c">no tools bound</text>

      {/* External services */}
      <line x1="730" y1="242" x2="730" y2="436" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-violet)" />
      <line x1="935" y1="242" x2="935" y2="436" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-blue)" />
      <Node x={610} y={440} w={170} h={100} tone="violet" title="Groq API" lines={['llama-3.1-8b-instant', 'temperature 0']} />
      <Node x={800} y={440} w={180} h={100} tone="blue" title="DuckDuckGo" lines={['DDGS · top 5 results', '→ Title / URL / Snippet']} />
    </svg>
  )
}

/* ── 2. Budget enforcement, unrolled ── */

const RUN = [
  ['chatbot', 'loop 0 < 3', '→ tool call', 'violet'],
  ['tools', 'search #1', '', 'blue'],
  ['chatbot', 'loop 1 < 3', '→ tool call', 'violet'],
  ['tools', 'search #2', '', 'blue'],
  ['chatbot', 'loop 2 < 3', '→ tool call', 'violet'],
  ['tools', 'search #3', '', 'blue'],
  ['chatbot', 'loop 3 = max', 'tools unbound', 'red']
]

function BudgetDiagram() {
  const colors = {
    violet: ['#faf5ff', '#c4b5fd', '#7c3aed'],
    blue: ['#ffffff', '#93c5fd', '#2563eb'],
    red: ['#fef2f2', '#fca5a5', '#b91c1c']
  }
  return (
    <svg viewBox="0 0 1000 220" role="img" aria-labelledby="c-budget-title" fontFamily="system-ui, -apple-system, sans-serif">
      <title id="c-budget-title">A run with max_searches = 3, unrolled: three search loops, then a final chatbot call without tools</title>
      <Markers />
      {RUN.map(([name, l1, l2, tone], i) => {
        const x = 20 + i * 122
        const [fill, stroke, ink] = colors[tone]
        return (
          <g key={i}>
            <rect x={x} y="80" width="100" height="84" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
            <text x={x + 50} y="104" textAnchor="middle" fontSize="13" fontWeight="800" fill={ink}>{name}</text>
            <text x={x + 50} y="126" textAnchor="middle" fontSize="11" fill="#475569">{l1}</text>
            {l2 && <text x={x + 50} y="144" textAnchor="middle" fontSize="11" fill="#64748b">{l2}</text>}
            <line x1={x + 102} y1="122" x2={x + 118} y2="122" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-grey)" />
            {name === 'tools' && (
              <text x={x + 50} y="186" textAnchor="middle" fontSize="10.5" fill="#94a3b8" fontFamily="monospace">loop_count={(i + 1) / 2}</text>
            )}
          </g>
        )
      })}
      <rect x={20 + 7 * 122} y="102" width="100" height="40" rx="20" fill="#0f1f4b" />
      <text x={20 + 7 * 122 + 50} y="127" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff" fontFamily="monospace">END</text>
      <text x={20 + 7 * 122 + 50} y="166" textAnchor="middle" fontSize="11" fill="#64748b">final summary</text>

      <line x1="752" y1="34" x2="752" y2="200" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="6 5" />
      <text x="760" y="46" fontSize="11.5" fill="#b91c1c" fontWeight="700" fontFamily="monospace">max_searches = 3</text>
      <text x="20" y="46" fontSize="11.5" fill="#64748b" fontFamily="monospace">START →</text>
    </svg>
  )
}

/* ── Page ── */

const STATS = [
  ['2 nodes', 'chatbot and tools, wired as a cycle in LangGraph'],
  ['1–8', 'user-set search budget, enforced in graph state'],
  ['5', 'DuckDuckGo results per search: title, URL and snippet'],
  ['0.0', 'temperature on Groq’s llama-3.1-8b-instant'],
  ['5', 'server-sent event types streamed to the UI'],
  ['20', 'past research runs cached in the browser']
]

const STEPS = [
  ['1', 'Ask', 'The client opens an EventSource on /api/research with the question and the budget from the slider.'],
  ['2', 'Stream', 'FastAPI seeds the graph state and iterates app.astream(state), turning each node update into an SSE message.'],
  ['3', 'Reason', 'The chatbot node calls Llama 3.1 on Groq with the web_search tool bound, unless the budget is spent.'],
  ['4', 'Act', 'LangGraph’s ToolNode runs web_search, which queries DuckDuckGo and returns five formatted results.'],
  ['↺', 'Reflect', 'The tools → chatbot edge sends results back to the model, which decides whether to search again or answer.'],
  ['✓', 'Answer', 'When the model stops calling tools (or is forced to), tools_condition routes to END and the summary streams out.']
]

const EVENTS = [
  ['chatbot returns tool_calls', 'search_start', 'query, loop_count', '“Reasoning Loop · Search n/N” card and a progress bar'],
  ['tools finishes', 'search_result', 'raw results, loop_count', '“Executed Web Search (k sources found)” with favicon source cards'],
  ['chatbot returns text', 'chatbot_response', 'content', '“Synthesizing Information” card, then the Research Summary'],
  ['graph completes', 'done', '—', '“Research process finished”; run saved to history'],
  ['exception in the run', 'error', 'message', 'Error card; the partial run is still saved']
]

export default function CasperCaseStudy({ project }) {
  return (
    <div className="cs">
      <CaseStudyHero
        project={project}
        video="/Projects/casper/casper-overview.mp4"
        poster="/Projects/casper/casper-overview-poster.jpg"
        videoLabel="21-second overview of Casper 2.0: a question goes in, the agent searches and reflects live, and a cited summary comes out"
        subtitle="An autonomous web-research agent that shows its work"
        lede={
          'Give Casper a question and a search budget. It decides what to look up, searches the web, reads what comes back, ' +
          'decides whether it needs another search, and writes a summary that cites its sources. Every step streams to the ' +
          'dashboard as it happens, so you watch the agent think instead of waiting on a spinner, and the budget is a hard ' +
          'limit the agent cannot talk its way past.'
        }
        tags={['React 19', 'Vite', 'lucide-react', 'FastAPI', 'sse-starlette', 'LangGraph', 'LangChain', 'Groq', 'Llama 3.1 8B', 'DuckDuckGo']}
        role="Solo build: agent graph and budget control, search tool, SSE streaming API and the React research dashboard."
        stats={STATS}
      />

      {/* 01 Problem */}
      <Section
        eyebrow="01 — The problem"
        title="A chatbot answers from memory. Research needs a loop."
        intro="A single LLM call can only repeat what the model saw in training, and it can’t tell you where a claim came from. Real research is iterative: search, read, notice a gap, search again, then write it up. But an agent that loops on its own raises two new problems."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Freshness</span>
            <h4>Answers need today’s web</h4>
            <p>Questions like “the latest AI safety guidelines in the EU” change month to month. The agent has to go and look, and cite what it found.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Black box</span>
            <h4>Agents are opaque</h4>
            <p>A research run can take a dozen seconds. Without seeing which queries it ran and what came back, users have no reason to trust the summary.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Runaway loops</span>
            <h4>Loops need a hard stop</h4>
            <p>Left alone, a model can keep searching for the same thing and burn tokens and rate limits. The limit has to live in code, not only in the prompt.</p>
          </div>
        </div>
      </Section>

      {/* 02 Architecture */}
      <Section
        eyebrow="02 — System architecture"
        title="A cyclic graph behind a streaming API"
        intro="The backend is two files. agent.py defines and compiles the LangGraph; main.py wraps it in a single streaming endpoint. The frontend listens to that stream and turns each event into a piece of UI."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <ArchitectureDiagram />
          </div>
          <div className="cs-legend">
            <span><i style={{ background: '#94a3b8' }} />Client &amp; state</span>
            <span><i style={{ background: '#93c5fd' }} />API, streaming &amp; tools</span>
            <span><i style={{ background: '#c4b5fd' }} />Agent graph &amp; LLM</span>
          </div>
        </div>
        <div className="cs-steps">
          {STEPS.map(([n, t, d]) => (
            <div key={t} className="cs-step">
              <span className="cs-step-n">{n}</span>
              <div className="cs-step-body"><strong>{t}</strong><span>{d}</span></div>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 Agent loop */}
      <Section
        eyebrow="03 — The agent loop"
        title="ReAct, expressed as a graph"
        intro="Plain LangChain chains run straight through. Casper needs to loop, so it uses a LangGraph StateGraph: nodes read and update a shared state, and edges (including conditional ones) decide what runs next."
      >
        <div className="cs-two-col">
          <div className="cs-card">
            <span className="cs-card-kicker">State</span>
            <h4>Three fields carry the whole run</h4>
            <p><code>messages</code> uses LangGraph’s <code>add_messages</code> reducer, so every node appends to the conversation instead of overwriting it. <code>loop_count</code> and <code>max_searches</code> travel alongside and are what the budget check reads.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Reason</span>
            <h4>chatbot node</h4>
            <p>Builds a system prompt (use web_search, don’t repeat searches, cite URLs), binds the tool, and calls <code>llama-3.1-8b-instant</code> at temperature 0 for stable tool-calling. If the reply contains tool calls, it increments <code>loop_count</code>.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Route</span>
            <h4>tools_condition</h4>
            <p>The prebuilt conditional edge sends the run to the tools node if the last message has tool calls, and to END if it doesn’t. There is no hand-written router to get wrong.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Reflect</span>
            <h4>tools → chatbot</h4>
            <p>A fixed edge sends every search result back to the model. That return trip is the reflection step: the model reads the snippets and decides whether it has enough to answer.</p>
          </div>
        </div>
      </Section>

      {/* 04 Budget */}
      <Section
        eyebrow="04 — Budget control"
        title="The budget is enforced by removing the tool"
        intro="The slider sets max_searches from 1 to 8. Every chatbot turn that calls a tool increments loop_count. Once loop_count reaches the budget, the chatbot node calls the model without bind_tools(), with a prompt telling it to summarize what it already has. Without a bound tool it cannot search again, whatever it decides."
      >
        <div className="cs-blueprint">
          <span className="cs-scroll-hint">Swipe to explore the diagram →</span>
          <div className="cs-diagram-scroll">
            <BudgetDiagram />
          </div>
        </div>
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Why not just prompt it?</span>
            <h4>Code beats instructions</h4>
            <p>“Don’t search more than 4 times” in a prompt is a request. An unbound tool is a guarantee. The prompt change only tells the model why it has to answer now.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Stops early too</span>
            <h4>The budget is a ceiling</h4>
            <p>The system prompt discourages redundant searches, so when the first results are enough the model answers straight away and the graph ends before the budget is used.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Bounded runtime</span>
            <h4>Well inside LangGraph’s limit</h4>
            <p>A full 8-search run is 17 node steps (8 × chatbot + tools, plus the final answer), comfortably under LangGraph’s default recursion limit of 25.</p>
          </div>
        </div>
      </Section>

      {/* 05 Streaming */}
      <Section
        eyebrow="05 — Live streaming"
        title="Every node update becomes an event"
        intro="main.py iterates the graph with astream() and translates each node’s latest message into a small JSON event. The browser’s built-in EventSource consumes them. Server-sent events fit this one-way, server-to-client flow better than WebSockets: plain HTTP, no handshake protocol, and reconnection built into the browser."
      >
        <div className="cs-table-wrap">
          <table className="cs-table" style={{ minWidth: '720px' }}>
            <thead>
              <tr><th>Graph event</th><th>SSE type</th><th>Payload</th><th>What the UI shows</th></tr>
            </thead>
            <tbody>
              {EVENTS.map(([g, t, p, u]) => (
                <tr key={t}>
                  <td>{g}</td>
                  <td><code style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 700 }}>{t}</code></td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{p}</td>
                  <td>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 06 Robustness */}
      <Section
        eyebrow="06 — Robustness"
        title="Small models misbehave; the loop has to survive it"
        intro="An 8B model on a free API is fast and cheap, but it occasionally writes a tool call as text instead of using the structured tool-calling format. Searches fail. Connections drop. Each of these is handled so that a run ends with an answer or a clear error, never a hang."
      >
        <div className="cs-two-col" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="cs-card-kicker">Model output (text, no tool_calls)</span>
            <pre className="cs-code">{`<web_search>{"query": "EU AI Act timeline"}</function>`}</pre>
            <span className="cs-card-kicker">Recovered by the chatbot node</span>
            <pre className="cs-code">{`tool_calls = [{
  `}<span className="k">"name"</span>{`: `}<span className="s">"web_search"</span>{`,
  `}<span className="k">"args"</span>{`: { `}<span className="k">"query"</span>{`: `}<span className="s">"EU AI Act timeline"</span>{` },
  `}<span className="k">"id"</span>{`:   `}<span className="s">"call_3f9a1c2e"</span>{`,
  `}<span className="k">"type"</span>{`: `}<span className="s">"tool_call"</span>{`
}]
content = ""  `}<span className="c">{'// raw tags never reach the UI'}</span></pre>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="cs-card">
              <span className="cs-card-kicker">Text tool-call recovery</span>
              <p>If a reply has no structured tool calls, a regex looks for <code>{'<name>{json}</function>'}</code> or <code>{'<name>{json}</name>'}</code>, parses the JSON and rebuilds proper tool calls with generated ids, so routing and the budget still work.</p>
            </div>
            <div className="cs-card">
              <span className="cs-card-kicker">Search never throws</span>
              <p><code>web_search</code> tries DDGS first, falls back to LangChain’s DuckDuckGoSearchRun, and if both fail returns the error as text. The model sees “Search error…” and can adapt instead of the graph crashing.</p>
            </div>
            <div className="cs-card">
              <span className="cs-card-kicker">Errors are events</span>
              <p>Exceptions inside the stream become an <code>error</code> event. If the connection itself drops, the client closes the EventSource, shows “Lost connection to backend server.” and still saves the partial run.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 Frontend */}
      <Section
        eyebrow="07 — The dashboard"
        title="Built to make the reasoning readable"
        intro="The React app has a single runtime dependency besides React: lucide-react for icons. Parsing, markdown rendering and persistence are all hand-written."
      >
        <div className="cs-grid-3">
          <div className="cs-card">
            <span className="cs-card-kicker">Thought process</span>
            <h4>Live log cards</h4>
            <p>Reasoning, search and synthesis steps each get their own card style, with a “Live Stream” badge and progress bars that fill as <code>loop_count</code> rises.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Sources</span>
            <h4>Structured source cards</h4>
            <p>Raw search text is split on <code>---</code> into title, URL and snippet, then shown as expandable cards with site favicons and outbound links.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Citations</span>
            <h4>Inline citation links</h4>
            <p>A small regex renderer turns <code>[title](url)</code> into citation chips and handles headings and lists, with no markdown library.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">History</span>
            <h4>Instant replays</h4>
            <p>The last 20 runs (logs, summary, budget) are kept in localStorage, de-duplicated by query, and reload without calling the LLM again.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Export</span>
            <h4>Report as Markdown</h4>
            <p>One click downloads a <code>.md</code> report with the query, the summary and the full reasoning log, or copies just the summary.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Theme</span>
            <h4>Dark and light</h4>
            <p>A CSS-variable design system drives a glassmorphic dark theme and a high-contrast light theme, persisted per browser.</p>
          </div>
        </div>
      </Section>

      {/* 08 Stack */}
      <Section eyebrow="08 — Stack" title="What each piece does">
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead>
              <tr><th>Layer</th><th>Technology</th><th>Role</th></tr>
            </thead>
            <tbody>
              {[
                ['Agent', 'LangGraph StateGraph · ToolNode · tools_condition', 'Cyclic reason → act → reflect loop with budget state'],
                ['LLM', 'Groq · llama-3.1-8b-instant (langchain-groq)', 'Fast, low-cost native tool calling at temperature 0'],
                ['Search', 'duckduckgo-search (DDGS) · DuckDuckGoSearchRun', 'Keyless web search with a fallback path'],
                ['API', 'FastAPI · sse-starlette · Uvicorn', 'Single streaming endpoint, CORS'],
                ['Frontend', 'React 19 · Vite · lucide-react', 'Dashboard, EventSource client, custom renderer'],
                ['Persistence', 'Browser localStorage', 'History (20 runs) and theme preference']
              ].map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 09 Next */}
      <Section eyebrow="09 — What’s next" title="Where the agent goes from here">
        <div className="cs-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="cs-card">
            <span className="cs-card-kicker">Depth</span>
            <h4>Read pages, not snippets</h4>
            <p>A fetch-and-extract tool would let the agent read the most promising results in full instead of reasoning over five short snippets.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Memory</span>
            <h4>Follow-up questions</h4>
            <p>Each run starts from fresh state today. A LangGraph checkpointer keyed by thread would allow “now compare that with the US”.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Budget</span>
            <h4>Count per tool call</h4>
            <p><code>loop_count</code> counts turns, so parallel tool calls in one turn count once. Counting each call would make the budget exact.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-kicker">Deploy</span>
            <h4>Configurable API URL</h4>
            <p>The client points at a local backend. An environment-based base URL is the step between this and a hosted demo.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
