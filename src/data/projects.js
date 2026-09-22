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
    desc: 'A high-performance multi-agent conversational AI assistant engineered with LangGraph.',
    tech: ['React.js', 'LangGraph', 'FastAPI', 'Python', 'OpenAI'],
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
    desc: 'A research-driven graph neural network framework applying extended spectral encoding to diverse network types, with Jupyter notebooks, datasets, and LaTeX paper.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/AlbinJohn/NeuralFlow',
    live: 'https://neuralflow-app.vercel.app',
    img: '/Projects/spectral gcn/spectral gcn.jpg'
  },
  {
    id: 6,
    cat: 'Project. 06',
    title: 'Parallel Image Processing',
    desc: 'Medical image processor leveraging C++ and OpenMP for efficient serial and parallel PNG transformations, featuring negative and edge detection filters.',
    tech: ['C++', 'C', 'OpenMP'],
    github: 'https://github.com/AlbinJohn/VectorMind',
    live: 'https://vectormind-search.vercel.app',
    img: '/Projects/parallel processing/parallel processing.jpg'
  }
]
