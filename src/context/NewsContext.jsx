import { createContext, useContext, useState, useCallback } from 'react'

const NewsContext = createContext()

export const CATEGORIES = ['technology', 'science']

const MOCK_NEWS = {
  technology: [
    { title: 'New Quantum Processor Breaks Records', source: { name: 'TechDaily' }, author: 'Sarah Chen', publishedAt: new Date().toISOString(), description: 'Researchers have unveiled a new 1121-qubit processor that maintains coherence for record times.', url: '#' },
    { title: 'AI-Driven Materials Discovery', source: { name: 'ScienceToday' }, author: 'James Wilson', publishedAt: new Date().toISOString(), description: 'Artificial intelligence is accelerating the discovery of new battery materials by 10x.', url: '#' },
    { title: 'Global 6G Standards Finalized', source: { name: 'NetWorld' }, author: 'Elena Gomez', publishedAt: new Date().toISOString(), description: 'The first draft for global 6G telecommunications has been officially approved.', url: '#' },
    { title: 'Sustainable Semiconductor Manufacturing', source: { name: 'EcoChip' }, author: 'Michael Lee', publishedAt: new Date().toISOString(), description: 'New water-recycling methods are saving millions of gallons in chip production.', url: '#' },
    { title: 'Neuralink Competitor Begins Human Trials', source: { name: 'BioTech' }, author: 'Dr. David Aris', publishedAt: new Date().toISOString(), description: 'A new brain-computer interface has shown promising results in initial clinical trials.', url: '#' }
  ],
  science: [
    { title: 'Water Found on Exoplanet K2-18b', source: { name: 'AstroWeekly' }, author: 'Dr. Emily Vance', publishedAt: new Date().toISOString(), description: 'Spectroscopic analysis confirms the presence of water vapor in the atmosphere of a distant super-Earth.', url: '#' },
    { title: 'ISS Research on Microgravity Plants', source: { name: 'NASA News' }, author: 'NASA Admin', publishedAt: new Date().toISOString(), description: 'A new crop of space-grown tomatoes has been successfully harvested aboard the station.', url: '#' },
    { title: 'Deep Sea Species Discovered in Mariana Trench', source: { name: 'Oceanic' }, author: 'Capt. Nemo', publishedAt: new Date().toISOString(), description: 'A submersible expedition has identified three previously unknown species of snailfish.', url: '#' },
    { title: 'Fusion Energy Breakthrough in UK', source: { name: 'EnergyHub' }, author: 'Prof. Mark Stern', publishedAt: new Date().toISOString(), description: 'The JET laboratory has set a new record for energy output from a fusion reaction.', url: '#' },
    { title: 'James Webb Telescope Captures Dying Star', source: { name: 'SpaceWatch' }, author: 'Alice Moon', publishedAt: new Date().toISOString(), description: 'Stunning new infrared images show the intricate dust patterns of a supernova remnant.', url: '#' }
  ]
}

export function NewsProvider({ children }) {
  const [articles, setArticles] = useState(MOCK_NEWS)
  const [loading, setLoading] = useState({ technology: false, science: false })
  const [error, setError] = useState({ technology: null, science: null })
  const [activeCategory, setActiveCategory] = useState('technology')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [donutFilter, setDonutFilter] = useState(null)

  const setArticlesForCategory = useCallback((category, data) => {
    setArticles(prev => ({ ...prev, [category]: data }))
  }, [])

  const setLoadingForCategory = useCallback((category, val) => {
    setLoading(prev => ({ ...prev, [category]: val }))
  }, [])

  const setErrorForCategory = useCallback((category, val) => {
    setError(prev => ({ ...prev, [category]: val }))
  }, [])

  const filteredArticles = (articles[donutFilter || activeCategory] || []).filter(a => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.source?.name?.toLowerCase().includes(q)
    )
  }).sort((a, b) => {
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
