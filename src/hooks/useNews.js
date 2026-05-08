import { useCallback } from 'react'
import { useNews, CATEGORIES } from '../context/NewsContext'
import { getCached, setCache } from '../utils/newsCache'
import toast from 'react-hot-toast'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export function useNewsLoader() {
  const { setArticlesForCategory, setLoadingForCategory, setErrorForCategory } = useNews()

  const fetchCategory = useCallback(async (category, force = false) => {
    const cacheKey = `news_${category}`
    if (!force) {
      const cached = getCached(cacheKey)
      if (cached) {
        setArticlesForCategory(category, cached)
        return
      }
    }

    setLoadingForCategory(category, true)
    setErrorForCategory(category, null)

    try {
      if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
        throw new Error('NO_API_KEY')
      }
      const targetUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=5&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const wrapper = await res.json()
      const data = JSON.parse(wrapper.contents)

      if (data.status === 'error') {
        throw new Error(data.message || 'NewsAPI error')
      }

      const articles = (data.articles || []).filter(a => a.title && a.title !== '[Removed]')
      setCache(cacheKey, articles)
      setArticlesForCategory(category, articles)
      toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} news updated`)
    } catch (err) {
      const msg = err.message === 'NO_API_KEY'
        ? 'Add your NewsAPI key to .env (VITE_NEWS_API_KEY)'
        : err.message.includes('cors') || err.message.includes('Failed to fetch')
          ? 'NewsAPI requires a backend proxy on free tier. Using cached data if available.'
          : err.message
      setErrorForCategory(category, msg)
      toast.error(`News error: ${msg.slice(0, 60)}`)
    } finally {
      setLoadingForCategory(category, false)
    }
  }, [setArticlesForCategory, setLoadingForCategory, setErrorForCategory])

  const fetchAll = useCallback((force = false) => {
    CATEGORIES.forEach(cat => fetchCategory(cat, force))
  }, [fetchCategory])

  return { fetchCategory, fetchAll }
}
