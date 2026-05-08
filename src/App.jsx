import { Activity, Newspaper, Satellite } from 'lucide-react';
import ChartsGrid from './components/Charts/ChartsGrid.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx';
import ISSTracker from './components/ISSTracker/ISSTracker.jsx';
import NewsSection from './components/NewsSection/NewsSection.jsx';
import ThemeToggle from './components/UI/ThemeToggle.jsx';
import { useToast } from './context/ToastContext.jsx';
import { useISSData } from './hooks/useISSData';
import { useNews } from './hooks/useNews';

export default function App() {
  const { notify } = useToast();
  const issData = useISSData(notify);
  const newsData = useNews(notify);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-[800] border-b border-slate-200 bg-white/92 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-teal-500 text-white">
              <Satellite size={22} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Real-time dashboard</p>
              <h1 className="text-xl font-semibold text-slate-950 dark:text-white">ISS & News Command Center</h1>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="#iss"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 sm:inline-flex"
            >
              <Satellite size={16} />
              ISS
            </a>
            <a
              href="#charts"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 sm:inline-flex"
            >
              <Activity size={16} />
              Charts
            </a>
            <a
              href="#news"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 sm:inline-flex"
            >
              <Newspaper size={16} />
              News
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section id="iss">
          <ISSTracker issData={issData} />
        </section>
        <section id="charts">
          <ChartsGrid issData={issData} newsData={newsData} />
        </section>
        <section id="news">
          <NewsSection newsData={newsData} />
        </section>
      </main>

      <Chatbot issData={issData} articles={newsData.allArticles} />
    </div>
  );
}
