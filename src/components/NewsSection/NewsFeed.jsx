import { useNews } from '../../context/NewsContext'

export default function NewsFeed() {
  const { filteredArticles, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useNews()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Breaking News</h2>
        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs">Refresh</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          type="text"
          placeholder="Search title, source, author..."
          className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm">
          <option>Sort by Date</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredArticles.map((article, i) => (
          <div key={i} className="group card p-3 flex items-center justify-between hover:border-sky-300 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{article.source.name}</span>
                  <span className="text-[10px] font-bold text-slate-400">{new Date(article.publishedAt).toLocaleString()}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">{article.title}</h3>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-sky-500 transition-colors">
              ▼
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
