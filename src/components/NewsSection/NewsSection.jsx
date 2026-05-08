import { RefreshCcw } from 'lucide-react';
import { Skeleton, Spinner } from '../UI/Loader.jsx';
import NewsCard from './NewsCard.jsx';
import NewsControls from './NewsControls.jsx';

export default function NewsSection({ newsData }) {
  const {
    categories,
    visibleArticles,
    loading,
    errors,
    search,
    setSearch,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    refreshCategory
  } = newsData;

  const hasLoading = Object.values(loading).some(Boolean);

  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">Technology and science</p>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">News Dashboard</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => refreshCategory(category)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCcw size={15} />
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <NewsControls
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {categories.map((category) =>
          errors[category] ? (
            <div
              key={category}
              className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200"
            >
              {errors[category]}
              <button type="button" onClick={() => refreshCategory(category)} className="ml-3 font-semibold underline">
                Retry
              </button>
            </div>
          ) : null
        )}
      </div>

      {hasLoading && visibleArticles.length === 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <Skeleton className="h-40" />
              <Skeleton className="mt-4 h-5" />
              <Skeleton className="mt-2 h-5 w-4/5" />
              <Skeleton className="mt-4 h-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleArticles.map((article) => (
            <NewsCard key={`${article.url}-${article.category}`} article={article} />
          ))}
        </div>
      )}

      {hasLoading && visibleArticles.length > 0 ? (
        <div className="mt-4">
          <Spinner label="Refreshing news" />
        </div>
      ) : null}

      {!hasLoading && visibleArticles.length === 0 ? (
        <p className="mt-6 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No articles match the current filters.
        </p>
      ) : null}
    </section>
  );
}
