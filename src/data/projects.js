// Shared project dataset.
// Centralized here so the router (App.jsx) can resolve a project from a URL
// on direct load / refresh, and so the data isn't duplicated across views.

export const projects = [
  {
    id: 5,
    cat: 'Project. 01',
    title: 'Idukki Origins',
    desc: 'A modern full-stack eCommerce platform for premium Kerala spices, featuring secure payments, cart management, and product browsing.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/CASPER0022/SpiceNest',
    live: 'https://www.idukkiorigins.com/',
    img: '/Projects/spicenest/spicenest.jpg'
  },
  {
    id: 1,
    cat: 'Project. 02',
    title: 'LegalEase',
    desc: 'An AI-powered legal document intelligence platform with advanced RAG architectures.',
    tech: ['React.js', 'FastAPI', 'LangChain', 'ChromaDB', 'Python'],
    github: 'https://github.com/CASPER0022/Legal-RAG-Assistant',
    live: 'https://legal-rag-assistant.vercel.app/',
    img: '/Projects/Legal ease/legalease.jpg'
  },
  {
    id: 2,
    cat: 'Project. 03',
    title: 'Casper',
    desc: 'An autonomous web-research agent built with LangGraph that searches, reflects and cites, streaming its reasoning live.',
    tech: ['React.js', 'LangGraph', 'FastAPI', 'Python', 'Groq'],
    github: 'https://github.com/CASPER0022/Casper-2.0-Web-Assistant',
    live: 'https://casper.app',
    img: '/Projects/casper/casper.jpg'
  },
  {
    id: 3,
    cat: 'Project. 04',
    title: 'AuthentiScan',
    desc: 'A hybrid AI-powered image forgery detection platform.',
    tech: ['PyTorch', 'FastAPI', 'React.js', 'OpenCV', 'Python'],
    github: 'https://github.com/AlbinJohn/AuthentiScan',
    live: 'https://authentiscan-detector.vercel.app',
    img: '/Projects/Authentiscan/authentiscan.jpg'
  },
  {
    id: 4,
    cat: 'Project. 05',
    title: 'Spectral Encoder GCN',
    desc: 'Replication and weighted extension of SE-GCN for finding influential spreaders, evaluated against SIR simulations on four real networks.',
    tech: ['PyTorch', 'NetworkX', 'Python', 'Jupyter', 'LaTeX'],
    github: 'https://github.com/CASPER0022/Spectral-Encoder-GCN',
    live: null,
    img: '/Projects/spectral gcn/spectral gcn.jpg'
  },
  {
    id: 6,
    cat: 'Project. 06',
    title: 'Parallel Image Processing',
    desc: 'Serial vs OpenMP negative and Sobel edge detection on CT scans in C++, 3.28x faster on a six-slice batch.',
    tech: ['C++17', 'OpenMP', 'stb_image'],
    github: 'https://github.com/CASPER0022/Parallel-Medical-Image-Processing',
    live: null,
    img: '/Projects/parallel processing/parallel processing.jpg'
  }
]
