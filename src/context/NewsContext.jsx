import { createContext, useContext, useState, useCallback } from 'react'

const NewsContext = createContext()

export const CATEGORIES = ['technology', 'science']

// Rich mock articles matching reference UI (numbered list with thumbnails)
const MOCK_NEWS = {
  technology: [
    {
      title: 'Buenos Aires Hosts Global AI Summit on Frontier Models',
      source: { name: 'BUENOS AIRES' },
      author: 'Carlos Mendez',
      publishedAt: '2026-04-10T05:30:00Z',
      description: 'World leaders and AI researchers converge in Argentina to set new safety standards for frontier AI models.',
      urlToImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&q=80',
      url: '#',
    },
    {
      title: 'New Quantum Processor Breaks Coherence Records at IBM Research',
      source: { name: 'TECH INSIDER' },
      author: 'Sarah Chen',
      publishedAt: '2026-04-10T05:30:00Z',
      description: 'IBM unveils a 1121-qubit processor that maintains quantum coherence for record-breaking durations.',
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&q=80',
      url: '#',
    },
    {
      title: 'Global 6G Standards Officially Ratified by ITU Committee',
      source: { name: 'NET WORLD' },
      author: 'Elena Gomez',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'The first international framework for 6G telecommunications has been formally approved by the ITU.',
      urlToImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
      url: '#',
    },
    {
      title: 'Tehran Tech Expo Showcases Iranian AI Startup Ecosystem',
      source: { name: 'TEHRAN' },
      author: 'Ahmad Hosseini',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'Over 300 startups exhibit at Iran\'s largest technology exposition, with AI at the forefront.',
      urlToImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=80',
      url: '#',
    },
    {
      title: 'Paris Introduces Europe\'s Largest Urban Neural Network Grid',
      source: { name: 'PARIS' },
      author: 'Isabelle Dupont',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'The French capital rolls out an AI-powered traffic and energy management system across all 20 arrondissements.',
      urlToImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80',
      url: '#',
    },
    {
      title: 'Neuralink Competitor Precision Neuroscience Begins Phase 2 Trials',
      source: { name: 'BIOTECH NOW' },
      author: 'Dr. David Aris',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'The brain-computer interface company reports successful motor cortex signal decoding in 12 patients.',
      urlToImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&q=80',
      url: '#',
    },
    {
      title: 'Santa Ponsa Becomes First Carbon-Neutral Smart City in Europe',
      source: { name: 'SANTA PONSA' },
      author: 'Maria Balaguer',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'The Mallorcan town achieves net-zero emissions through an integrated IoT energy grid and EV fleet.',
      urlToImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80',
      url: '#',
    },
    {
      title: 'Sustainable Semiconductor Manufacturing Breakthrough Cuts Water Use by 60%',
      source: { name: 'ECO CHIP' },
      author: 'Michael Lee',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'A new water-recycling process at TSMC fabs dramatically reduces the environmental footprint of chip production.',
      urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80',
      url: '#',
    },
    {
      title: 'Pendik Innovation Hub Attracts €500M in Deep-Tech Investment',
      source: { name: 'PENDIK' },
      author: 'Ayse Yilmaz',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'Istanbul\'s Pendik district emerges as a major European technology hub following major VC commitments.',
      urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80',
      url: '#',
    },
    {
      title: 'AI-Driven Drug Discovery Cuts Development Time from 12 Years to 18 Months',
      source: { name: 'PHARMA TECH' },
      author: 'Dr. Leila Nasser',
      publishedAt: '2026-04-08T05:30:00Z',
      description: 'DeepMind\'s AlphaFold 3 integration enables unprecedented speed in identifying viable drug compounds.',
      urlToImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=80',
      url: '#',
    },
  ],
  science: [
    {
      title: 'James Webb Telescope Captures Clearest Image of Protoplanetary Disk',
      source: { name: 'SPACE WATCH' },
      author: 'Dr. Alice Moon',
      publishedAt: '2026-04-10T05:30:00Z',
      description: 'JWST\'s new infrared survey resolves planet-forming material around a young star 450 light-years away.',
      urlToImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&q=80',
      url: '#',
    },
    {
      title: 'ISS Crew Successfully Harvests Third Generation of Space-Grown Tomatoes',
      source: { name: 'NASA NEWS' },
      author: 'NASA Admin',
      publishedAt: '2026-04-10T05:30:00Z',
      description: 'Microgravity horticulture experiment yields healthy crop, paving the way for deep-space food systems.',
      urlToImage: 'https://images.unsplash.com/photo-1446941303997-e89e4c50de80?w=200&q=80',
      url: '#',
    },
    {
      title: 'Water Molecules Confirmed in Atmosphere of Exoplanet K2-18b',
      source: { name: 'ASTRO WEEKLY' },
      author: 'Dr. Emily Vance',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'Spectroscopic analysis from the JWST confirms abundant water vapour in the atmosphere of the super-Earth.',
      urlToImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&q=80',
      url: '#',
    },
    {
      title: 'Fusion Energy: JET Reactor Breaks All-Time Output Record',
      source: { name: 'ENERGY HUB' },
      author: 'Prof. Mark Stern',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'The Joint European Torus produced 69 megajoules of sustained fusion energy, doubling the previous world record.',
      urlToImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
      url: '#',
    },
    {
      title: 'Three New Deep-Sea Species Discovered in Mariana Trench Expedition',
      source: { name: 'OCEANIC' },
      author: 'Capt. J. Nemo',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'Autonomous submersibles identify bioluminescent snailfish and two molluscs never previously catalogued.',
      urlToImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=200&q=80',
      url: '#',
    },
    {
      title: 'Antarctic Ice Core Reveals 1.2 Million Years of Earth\'s Climate History',
      source: { name: 'CLIMATE LAB' },
      author: 'Dr. Hans Berger',
      publishedAt: '2026-04-09T05:30:00Z',
      description: 'A record-breaking ice core sample gives scientists unprecedented data on prehistoric CO₂ cycles.',
      urlToImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80',
      url: '#',
    },
    {
      title: 'CRISPR 3.0 Achieves First In-Vivo Correction of Sickle Cell Gene',
      source: { name: 'BIO RESEARCH' },
      author: 'Dr. Priya Rajan',
      publishedAt: '2026-04-08T05:30:00Z',
      description: 'A next-generation base-editing tool corrects the HBB gene mutation directly inside living patients.',
      urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&q=80',
      url: '#',
    },
    {
      title: 'Dark Matter Signal Detected by Underground Xenon Detector LZ',
      source: { name: 'PHYSICS TODAY' },
      author: 'Prof. Thomas Klein',
      publishedAt: '2026-04-08T05:30:00Z',
      description: 'The LUX-ZEPLIN experiment records an anomalous signal consistent with WIMPs at 40 GeV mass.',
      urlToImage: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=200&q=80',
      url: '#',
    },
  ],
}

export function NewsProvider({ children }) {
  const [articles,       setArticles]       = useState(MOCK_NEWS)
  const [loading,        setLoadingState]   = useState({ technology: false, science: false })
  const [error,          setErrorState]     = useState({ technology: null,  science: null  })
  const [activeCategory, setActiveCategory] = useState('technology')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [sortBy,         setSortBy]         = useState('date')
  const [donutFilter,    setDonutFilter]    = useState(null)

  const setArticlesForCategory = useCallback((category, data) => {
    setArticles(prev => ({ ...prev, [category]: data }))
  }, [])

  const setLoadingForCategory = useCallback((category, val) => {
    setLoadingState(prev => ({ ...prev, [category]: val }))
  }, [])

  const setErrorForCategory = useCallback((category, val) => {
    setErrorState(prev => ({ ...prev, [category]: val }))
  }, [])

  const filteredArticles = (articles[donutFilter || activeCategory] || [])
    .filter(a => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        a.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.source?.name?.toLowerCase().includes(q) ||
        a.author?.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'source') return (a.source?.name || '').localeCompare(b.source?.name || '')
      return new Date(b.publishedAt) - new Date(a.publishedAt)
    })

  return (
    <NewsContext.Provider value={{
      articles, setArticlesForCategory,
      loading, setLoadingForCategory,
      error, setErrorForCategory,
      activeCategory, setActiveCategory,
      searchQuery, setSearchQuery,
      sortBy, setSortBy,
      donutFilter, setDonutFilter,
      filteredArticles,
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  return useContext(NewsContext)
}
