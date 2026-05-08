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
    <div className="space-y-6">
      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search intelligence feed..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="flex-1 md:w-40 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="date">Latest First</option>
            <option value="source">By Source</option>
          </select>
          
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {['technology', 'science'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredArticles.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No intelligence reports matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('technology'); }}
              className="mt-4 text-blue-500 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        
        {filteredArticles.map((article, i) => (
          <div key={i} className="news-card-premium group">
            <div className="flex-1 flex flex-col md:flex-row gap-6">
              {/* Image Thumbnail */}
              <div className="w-full md:w-48 h-32 flex-shrink-0 relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">
                    📡
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-[0.2em] rounded">
                    {article.source?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Active Intel
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })} • {new Date(article.publishedAt).toLocaleTimeString([], {
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {article.author && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Analyst: {article.author.split(',')[0]}
                      </span>
                    )}
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-500 flex items-center gap-1 group/link"
                  >
                    FULL REPORT
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

