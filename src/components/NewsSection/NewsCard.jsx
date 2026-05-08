export default function NewsCard({ article }) {
  const { title, source, author, publishedAt, urlToImage, description, url } = article
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : ''

  return (
    <article className="card flex flex-col overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
      {urlToImage ? (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-40 object-cover"
          onError={e => { e.target.style.display = 'none' }}
        />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center text-4xl">
          📰
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs">
            {source?.name || 'Unknown'}
          </span>
          {date && <span className="text-xs text-slate-400">{date}</span>}
        </div>

        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {author && (
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">By {author}</p>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          id={`read-more-${encodeURIComponent(title?.slice(0, 20) || 'article')}`}
          className="btn-primary mt-auto self-start text-xs px-3 py-1.5"
        >
          Read More →
        </a>
      </div>
    </article>
  )
}
