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
      if (!API_KEY || API_KEY.startsWith('your_')) {
        throw new Error('NO_API_KEY')
      }
      // NewsData.io endpoint
      const targetUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${category}&language=en`
      const url = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
      
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const data = await res.json()

      if (data.status !== 'success') {
        throw new Error(data.message || 'News API error')
      }

      // Map NewsData.io format to our NewsCard format
      const articles = (data.results || []).map(item => ({
        title: item.title,
        source: { name: item.source_id },
        author: item.creator?.[0] || 'Unknown',
        publishedAt: item.pubDate,
        urlToImage: item.image_url,
        description: item.description,
        url: item.link
      })).filter(a => a.title)
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
