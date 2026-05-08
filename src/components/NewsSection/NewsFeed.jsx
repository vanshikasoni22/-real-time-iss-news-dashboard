import { useState } from 'react'
import { useNews } from '../../context/NewsContext'

export default function NewsFeed() {
  const {
    filteredArticles,
    activeCategory, setActiveCategory,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
  } = useNews()

  const [expanded, setExpanded] = useState(null)

  const toggle = (i) => setExpanded(expanded === i ? null : i)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Breaking News</h2>
        <div className="flex items-center gap-2">
          <button
            className="btn-primary text-xs"
            onClick={() => {
              setSearchQuery('')
              setExpanded(null)
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {['technology', 'science'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
              activeCategory === cat
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-white text-slate-500 border-slate-200 hover:border-sky-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search title, source, author..."
          className="flex-1 input-field"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select
          className="input-field sm:w-40"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="source">Sort by Source</option>
        </select>
      </div>

      {/* Article List */}
      <div className="space-y-2">
        {filteredArticles.length === 0 && (
          <div className="card p-8 text-center text-slate-400 text-sm">
            No articles found.
          </div>
        )}
        {filteredArticles.map((article, i) => (
          <div key={i} className="card overflow-hidden">
            {/* Collapsed Row */}
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-amber-50/60 transition-colors"
              onClick={() => toggle(i)}
            >
              {/* Number badge */}
              <div className="w-7 h-7 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-[11px] font-black text-white">
                {i + 1}
              </div>

              {/* Thumbnail */}
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-16 h-11 object-cover rounded-lg flex-shrink-0"
                  onError={e => { e.target.style.display = 'none' }}
                />
              ) : (
                <div className="w-16 h-11 rounded-lg bg-gradient-to-br from-sky-100 to-indigo-100 flex-shrink-0 flex items-center justify-center text-lg">
                  📰
                </div>
              )}

              {/* Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">
                    {article.source?.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                    })}, {new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                  {article.title}
                </p>
              </div>

              {/* Expand arrow */}
              <div
                className={`text-red-400 text-sm flex-shrink-0 transition-transform duration-200 ${
                  expanded === i ? 'rotate-180' : ''
                }`}
              >
                ▼
              </div>
            </div>

            {/* Expanded Detail */}
            {expanded === i && (
              <div className="px-4 pb-4 pt-1 border-t border-[var(--card-border)] animate-fade-in">
                <div className="flex gap-4">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  )}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-800 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3">
                      {article.author && (
                        <span className="text-[10px] text-slate-400">By {article.author}</span>
                      )}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-[11px] px-3 py-1"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
