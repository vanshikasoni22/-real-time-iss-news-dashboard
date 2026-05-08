import { ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function NewsCard({ article }) {
  const image = article.urlToImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80';

  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <img src={image} alt="" className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded bg-teal-100 px-2 py-1 font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
            {article.category}
          </span>
          <span>{article.source?.name || 'Unknown source'}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-950 dark:text-white">{article.title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">By {article.author || 'Unknown author'}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {article.description || 'No short description was provided for this article.'}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Read More
          <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}
