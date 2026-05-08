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
      const targetUrl = `https://api.currentsapi.services/v1/search?keywords=${category}&language=en&apiKey=${API_KEY}`
      
      let data = null
      const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        url => `https://thingproxy.freeboard.io/fetch/${url}`
      ]

      for (const proxy of proxies) {
        try {
          const res = await fetch(proxy(targetUrl))
          if (res.ok) {
            data = await res.json()
            break
          }
        } catch (e) {
          console.warn('Proxy failed:', e)
        }
      }

      if (!data) throw new Error('Could not fetch news from any proxy')

      if (data.status !== 'ok') {
        throw new Error(data.message || 'Currents API error')
      }

      // Map Currents API format to our NewsCard format
      const articles = (data.news || []).map(item => ({
        title: item.title,
        source: { name: item.author || 'Currents' },
        author: item.author || 'Unknown',
        publishedAt: item.published,
        urlToImage: item.image !== 'None' ? item.image : null,
        description: item.description,
        url: item.url
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
