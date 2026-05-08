import { useEffect } from 'react'
import { useNews, CATEGORIES } from '../../context/NewsContext'
import { useNewsLoader } from '../../hooks/useNews'
import NewsCard from './NewsCard'
import { SkeletonCard } from '../UI/Skeleton'

export default function NewsFeed() {
  const {
    filteredArticles, loading, error,
    activeCategory, setActiveCategory,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    donutFilter, setDonutFilter,
  } = useNews()

  const { fetchCategory, fetchAll } = useNewsLoader()

  // Initial load
  useEffect(() => { fetchAll() }, [fetchAll])

  const displayCategory = donutFilter || activeCategory

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="section-title flex items-center gap-2">📰 News Feed</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <button id="news-refresh-btn" onClick={() => fetchCategory(displayCategory, true)} className="btn-ghost text-xs">
            🔄 Refresh
          </button>
          <select
            id="news-sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field !w-auto text-xs py-1.5 px-2.5"
          >
            <option value="date">Sort: Date</option>
            <option value="source">Sort: Source</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <input
        id="news-search-input"
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="🔍 Search articles..."
        className="input-field"
      />

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {donutFilter && (
          <button
            onClick={() => setDonutFilter(null)}
            className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 cursor-pointer hover:opacity-80 transition-opacity"
          >
            ✕ Clear chart filter
          </button>
        )}
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            id={`news-tab-${cat}`}
            onClick={() => { setActiveCategory(cat); setDonutFilter(null) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize
              ${displayCategory === cat && !donutFilter
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            {cat === 'technology' ? '💻' : '🔬'} {cat}
          </button>
        ))}
      </div>

      {/* Error state */}
      {error[displayCategory] && (
        <div className="card p-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-400">⚠️ {error[displayCategory]}</p>
          <button
            className="btn-primary mt-2 text-xs bg-red-600 hover:bg-red-700"
            onClick={() => fetchCategory(displayCategory, true)}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Loading skeletons */}
      {loading[displayCategory] && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => <SkeletonCard key={i} lines={4} />)}
        </div>
      )}

      {/* Articles grid */}
      {!loading[displayCategory] && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article, i) => (
            <NewsCard key={article.url || i} article={article} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading[displayCategory] && filteredArticles.length === 0 && !error[displayCategory] && (
        <div className="card p-10 text-center text-slate-400 dark:text-slate-500">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-medium">No articles found</p>
          <p className="text-sm mt-1">
            {searchQuery ? 'Try a different search term' : 'Add your NewsAPI key to load articles'}
          </p>
        </div>
      )}
    </div>
  )
}
