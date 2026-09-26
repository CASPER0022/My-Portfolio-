// Shared placement/interview material datasets.
// Centralized here so the router (App.jsx) can resolve a material from a URL
// on direct load / refresh, and so the data isn't duplicated across views.

export const placementMaterials = [
  {
    id: 'oops',
    cat: 'Placement Material . 01',
    title: 'Object-Oriented Programming',
    shortTitle: 'OOPS Field Manual',
    desc: 'Comprehensive placement interview manual covering OOP paradigms, four pillars, memory layouts, vtables, SOLID principles, design patterns, and 110+ placement Q&A.',
    tech: ['Java', 'C++', 'Python', 'SOLID Principles', 'Design Patterns'],
    fileUrl: '/interview/oop-placement-notebook.html',
    img: '/interview/oops.png'
  },
  {
    id: 'dbms',
    cat: 'Placement Material . 02',
    title: 'Database Management Systems',
    shortTitle: 'DBMS Notebook',
    desc: 'Complete database management system guide covering ER modeling, SQL query writing, normalization, ACID properties, transaction concurrency, index structures, and 150+ drill questions.',
    tech: ['SQL', 'Database Design', 'Transactions & ACID', 'Indexing & B+ Trees', 'Normalization'],
    fileUrl: '/interview/dbms-placement-notebook.html',
    img: '/interview/dbms.png'
  },
  {
    id: 'cn',
    cat: 'Placement Material . 03',
    title: 'Computer Networks',
    shortTitle: 'CN Notebook',
    desc: 'Deep-dive Computer Networks notebook covering the OSI and TCP/IP models, layer-by-layer protocols, physical layer, data link layer framing, subnetting arithmetic, routing, TCP/UDP transport, security, and 180+ interview Q&A.',
    tech: ['OSI Model', 'TCP/IP', 'Subnetting', 'Routing & IP', 'Network Security'],
    fileUrl: '/interview/computer-networks-interview-notebook.html',
    img: '/interview/cn.png'
  },
  {
    id: 'system_design',
    cat: 'Placement Material . 04',
    title: 'System Design',
    shortTitle: 'System Design Notebook',
    desc: 'Complete System Design notebook for placement interviews, featuring 23 sections, foundations, building blocks (scaling, caching, databases, sharding, CAP), high-level case studies (8 designs), low-level design, and 150+ interview Q&A.',
    tech: ['HLD & LLD', 'Scaling & Replicas', 'CAP & Consistency', 'Case Studies', 'LLD Patterns'],
    fileUrl: '/interview/system-design-notebook.html',
    img: '/interview/system_design.png'
  },
  {
    id: 'machine_learning',
    cat: 'Placement Material . 05',
    title: 'Machine Learning',
    shortTitle: 'Machine Learning Notebook',
    desc: 'Deep-dive Machine Learning notebook for placement interviews, featuring 25 sections, classical algorithms (regression, naive bayes, svm, trees), deep learning (cnn, rnn, transformers), derived mathematics, and 170+ interview Q&A.',
    tech: ['Supervised & Unsupervised', 'Derived Maths', 'Deep Learning', 'Transformers', 'Evaluation Metrics'],
    fileUrl: '/interview/Machine-Learning-Notebook.html',
    img: '/interview/machine learning.png'
  },
  {
    id: 'javascript',
    cat: 'Placement Material . 06',
    title: 'JavaScript',
    shortTitle: 'JavaScript Notebook',
    desc: 'Complete JavaScript notebook from variables and hoisting to async, event loops, promises, closures, prototypes, and backend Express.js APIs. Includes 155+ runnable code benches and 125+ interview Q&A.',
    tech: ['ES6+', 'Event Loop & Async', 'Closures & Scope', 'Prototypes', 'Express.js backend'],
    fileUrl: '/interview/javascript-notebook.html',
    img: '/interview/javascript.png'
  },
  {
    id: 'os',
    cat: 'Placement Material . 07',
    title: 'Operating Systems',
    shortTitle: 'OS Notebook',
    desc: 'Complete Operating Systems study notebook for placement interviews, featuring 13 chapters, processes, threads, CPU scheduling, synchronization, deadlocks, memory management, and 130+ Q&A.',
    tech: ['Process & IPC', 'CPU Scheduling', 'Deadlocks', 'Memory & Virtual Memory', 'File Systems'],
    fileUrl: '/interview/operating-systems-notebook.html',
    img: '/interview/os.png'
  },
  {
    id: 'dsa',
    cat: 'Placement Material . 08',
    title: 'Data Structures & Algorithms',
    shortTitle: 'DSA Field Guide',
    desc: 'Comprehensive collection of Data Structures and Algorithms interview preparation guides, split into core concepts, patterns, complexity analyses, and topic-wise walkthroughs.',
    tech: ['Searching & Sorting', 'Arrays & Lists', 'Trees & Graphs', 'Dynamic Programming', 'Complexity'],
    fileUrl: '',
    img: '/interview/dsa.png'
  },
  {
    id: 'react',
    cat: 'Placement Material . 09',
    title: 'React',
    shortTitle: 'React Notebook',
    desc: 'Complete React study notebook from scratch, covering fundamentals, rendering cycles, hooks, state lifting, refs, optimization, useReducer, Context, React 19 features, and 100+ interview Q&A.',
    tech: ['Hooks & State', 'Reconciliation', 'React 19', 'Optimization', 'Context API'],
    fileUrl: '/interview/react-from-scratch-notebook.html',
    img: '/interview/react.png'
  },
  {
    id: 'sql',
    cat: 'Placement Material . 10',
    title: 'SQL',
    shortTitle: 'SQL Notebook',
    desc: 'Complete SQL study notebook for placements, covering foundations, keys, constraints, normalization, indexes, joins, subqueries, CTEs, window functions, and 150+ interview Q&A.',
    tech: ['Queries & Joins', 'Window Functions', 'Constraints', 'Indexes & Query Tuning', 'CTE & Subqueries'],
    fileUrl: '/interview/sql-placement-notebook.html',
    img: '/interview/sql.png'
  },
  {
    id: 'sql_problems',
    cat: 'Placement Material . 12',
    title: 'SQL Problems',
    shortTitle: 'SQL Query Ladder',
    desc: 'Interactive SQL Query Ladder practice notebook with progressive query challenges, problem sets, and practical SQL drills for interview preparation.',
    tech: ['SQL Drills', 'Aggregations', 'Joins & Subqueries', 'Window Functions', 'Query Optimization'],
    fileUrl: '/interview/sql-query-ladder.html',
    img: '/interview/SQL Problems.png'
  },
  {
    id: 'backend_development',
    cat: 'Placement Material . 11',
    title: 'Backend Development',
    shortTitle: 'Backend Notebook',
    desc: 'Complete from-scratch backend engineering notebook covering HTTP, REST, databases, caching, auth, security (OWASP Top 10), queues, scaling, and 250+ Q&A.',
    tech: ['HTTP & REST', 'Database & Transactions', 'Caching & Redis', 'Auth & Security', 'Scaling & System Design'],
    fileUrl: '/interview/Backend-Development-Notebook.html',
    img: '/interview/backend-development.png'
  }
]

export const projectPrepMaterials = [
  {
    id: 'legalease_prep',
    cat: 'Project Prep . 01',
    title: 'LegalEase Codex',
    shortTitle: 'LegalEase Prep Guide',
    desc: 'Advanced technical reference and interview preparation guide for LegalEase, detailing retrieval-augmented generation architectures, semantic ingestion pipelines, context synthesis, and potential interview Q&A.',
    tech: ['FastAPI', 'LangChain', 'ChromaDB', 'BM25 Hybrid RAG', 'Evaluation'],
    fileUrl: '/interview/LegalEase-Interview-Codex.html',
    img: '/Projects/Legal ease/legalease.jpg'
  },
  {
    id: 'casper_prep',
    cat: 'Project Prep . 02',
    title: 'Casper Codex',
    shortTitle: 'Casper Prep Guide',
    desc: 'Deep-dive reference and interview preparation guide for Casper, covering stateful multi-agent topology, supervisor node routers, Sandboxed code execution, and LangGraph workflow orchestration.',
    tech: ['LangGraph', 'FastAPI', 'Python', 'OpenAI API', 'State Machines'],
    fileUrl: '/interview/Casper-2.0-Interview-Notebook.html',
    img: '/Projects/casper/casper.jpg'
  },
  {
    id: 'shipsy_prep',
    cat: 'Company Prep . 03',
    title: 'Shipsy Interview Codex',
    shortTitle: 'Shipsy Prep Guide',
    desc: 'Comprehensive applied AI engineering & customer experience interview playbook for Shipsy, detailing ARISE escalation frameworks, scenario questions, support automation, and logistics systems.',
    tech: ['Applied AI', 'Support Automation', 'ARISE Framework', 'Logistics Systems', 'RAG & Agents'],
    fileUrl: '/interview/shipsy-interview-prep.html',
    img: '/Projects/shipsy/shipsy.jpg'
  },
  {
    id: 'kalkitech_prep',
    cat: 'Company Prep . 04',
    title: 'Kalkitech Interview Codex',
    shortTitle: 'Kalkitech Prep Guide',
    desc: 'Comprehensive technical interview reference and playbook for Kalkitech, covering power system automation, DLMS/COSEM, IEC 61850, Modbus, SCADA protocols, and smart grid IoT architectures.',
    tech: ['DLMS/COSEM', 'IEC 61850', 'Modbus', 'SCADA & Smart Grid', 'Embedded & IoT'],
    fileUrl: '/interview/kalkitech-interview-notebook.html',
    img: '/interview/kalkitech.png'
  },
  {
    id: 'soti_prep',
    cat: 'Company Prep . 05',
    title: 'SOTI SDET Interview Codex',
    shortTitle: 'SOTI SDET Prep Guide',
    desc: 'Comprehensive technical interview manual for SOTI SDET, covering Enterprise Mobility Management (MobiControl), test automation frameworks, API & UI testing, C#/.NET automation, and QA architecture.',
    tech: ['C# / .NET', 'Test Automation', 'API & UI Testing', 'EMM / MobiControl', 'QA Architecture'],
    fileUrl: '/interview/SOTI-SDET-Interview-Notebook.html',
    img: '/interview/soti.png'
  }
]

export const dsaConcepts = [
  {
    id: 'binary_search',
    cat: 'DSA Concept . 01',
    title: 'Binary Search',
    shortTitle: 'Binary Search Notebook',
    desc: 'Deep-dive Binary Search study guide, covering search spaces, dynamic ranges, numerical search, double binary search, and 30+ interview drills.',
    tech: ['Binary Search', 'Divide & Conquer', 'Search Space', 'Drill Questions'],
    fileUrl: '/interview/Binary-Search-Notebook.html',
    img: 'interview/binary search.png'
  },
  {
    id: 'arrays',
    cat: 'DSA Concept . 02',
    title: 'Arrays',
    shortTitle: 'Arrays Notebook',
    desc: 'Complete Arrays placement revision notebook covering all 40 problems from Striver A2Z sheet, including 10 reusable patterns, brute-to-optimal progressions, complexity analysis, and C++/Python solutions.',
    tech: ['Contiguous Blocks', 'Two Pointers', 'Sliding Window', 'In-place Swaps', 'Prefix Sums'],
    fileUrl: '/interview/Arrays-Notebook.html',
    img: 'interview/array.png'
  }
]

// Looks up a material by id across every material dataset (used to resolve
// a deep-linked /materials/:id URL on first load/refresh).
export function findMaterialById(id) {
  return (
    placementMaterials.find((m) => m.id === id) ||
    projectPrepMaterials.find((m) => m.id === id) ||
    dsaConcepts.find((m) => m.id === id) ||
    null
  )
}
