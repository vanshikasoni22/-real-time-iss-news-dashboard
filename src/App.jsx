import ThemeToggle from './components/UI/ThemeToggle'
import ISSMap from './components/ISSTracker/ISSMap'
import ISSStats from './components/ISSTracker/ISSStats'
import NewsFeed from './components/NewsSection/NewsFeed'
import SpeedChart from './components/Charts/SpeedChart'
import NewsDonutChart from './components/Charts/NewsDonutChart'
import AstronautList from './components/ISSTracker/AstronautList'
import ChatBot from './components/Chatbot/ChatBot'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { useISSTracker } from './hooks/useISSTracker'

export default function App() {
  const { manualRefresh, positionCount } = useISSTracker()

  return (
    <div className="min-h-screen pb-12 transition-all duration-500 bg-[var(--bg-main)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 space-y-8">

        {/* ── Header ── */}
        <header className="glass-card p-6 flex flex-col sm:flex-row justify-between items-center gap-6 animate-fadeIn">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse-soft">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.25em] mb-0.5">
                Global Operations Center
              </p>
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                ISS Intelligence <span className="text-blue-500">&</span> News Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">System Status</span>
              <span className="text-xs font-bold text-green-500 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                ALL SYSTEMS NOMINAL
              </span>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>
            <ThemeToggle />
          </div>
        </header>

        {/* ── Main Content Grid ── */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 units) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tracking Header */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Orbital Tracking</h2>
              </div>
              <button 
                onClick={manualRefresh} 
                className="btn-secondary-premium !py-1.5 !px-4 text-xs group"
              >
                <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync Data
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ErrorBoundary>
                <ISSStats positionCount={positionCount} onRefresh={manualRefresh} />
              </ErrorBoundary>
            </div>

            {/* Map Container */}
            <div className="glass-card p-2 h-[450px]">
              <ErrorBoundary>
                <ISSMap />
              </ErrorBoundary>
            </div>

            {/* News Feed */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Global Intelligence Feed</h2>
              </div>
              <ErrorBoundary>
                <NewsFeed />
              </ErrorBoundary>
            </div>
          </div>

          {/* Right Column (4 units) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Charts Section */}
            <section className="glass-card p-6 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Velocity Trend</h3>
                <div className="h-[240px]">
                  <SpeedChart />
                </div>
              </div>
              
              <div className="pt-8 border-t border-[var(--card-border)]">
                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Topic Distribution</h3>
                <div className="h-[240px]">
                  <ErrorBoundary>
                    <NewsDonutChart />
                  </ErrorBoundary>
                </div>
              </div>
            </section>

            {/* Crew Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Station Personnel</h2>
              </div>
              <ErrorBoundary>
                <AstronautList />
              </ErrorBoundary>
            </section>
          </aside>
        </main>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span>Core System v2.1.0</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
          </div>
          <span>Mission Control © 2026 Space Intelligence Agency</span>
        </footer>
      </div>

      {/* Floating Chatbot */}
      <ChatBot />
    </div>
  )
}

