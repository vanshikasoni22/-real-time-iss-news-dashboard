import { createContext, useContext, useState, useCallback } from 'react'

const NewsContext = createContext()

export const CATEGORIES = ['technology', 'science']

export function NewsProvider({ children }) {
  const [articles, setArticles] = useState({ technology: [], science: [] })
  const [loading, setLoading] = useState({ technology: false, science: false })
  const [error, setError] = useState({ technology: null, science: null })
  const [activeCategory, setActiveCategory] = useState('technology')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date') // 'date' | 'source'
  const [donutFilter, setDonutFilter] = useState(null) // category filtered via chart

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
