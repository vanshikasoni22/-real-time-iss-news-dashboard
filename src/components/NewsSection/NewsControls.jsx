import { Search } from 'lucide-react';

export default function NewsControls({ search, setSearch, sortBy, setSortBy, activeCategory, setActiveCategory }) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_160px]">
      <label className="relative block">
        <span className="sr-only">Search articles</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search headlines, authors, sources"
          className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        aria-label="Sort articles"
      >
        <option value="date">Sort by date</option>
        <option value="source">Sort by source</option>
      </select>
      <select
        value={activeCategory}
        onChange={(event) => setActiveCategory(event.target.value)}
        className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        aria-label="Filter by category"
      >
        <option value="All">All categories</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
      </select>
    </div>
  );
}
