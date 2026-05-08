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
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: '#f5f2e8' }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] mb-1">
              Mission Control Dashboard
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Real-Time ISS and News Intelligence
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* ── ISS Section ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Stats + Map */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">ISS Live Tracking</h2>
                <div className="flex items-center gap-3">
                  <button onClick={manualRefresh} className="btn-primary text-xs">
                    Refresh Now
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Auto-Refresh: ON
                  </span>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ErrorBoundary>
                  <ISSStats positionCount={positionCount} onRefresh={manualRefresh} />
                </ErrorBoundary>
              </div>

              {/* Map */}
              <div className="h-[380px]">
                <ErrorBoundary>
                  <ISSMap />
                </ErrorBoundary>
              </div>
            </div>

            {/* Right: Speed Chart + Donut + Crew */}
            <div className="lg:col-span-4 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-slate-800 mb-3">ISS Speed Trend</h2>
                <div className="h-[260px]">
                  <SpeedChart />
                </div>
              </section>

              <section>
                <div className="h-[260px]">
                  <ErrorBoundary>
                    <NewsDonutChart />
                  </ErrorBoundary>
                </div>
              </section>

              <ErrorBoundary>
                <AstronautList />
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* ── Breaking News Section ── */}
        <section className="card p-6">
          <ErrorBoundary>
            <NewsFeed />
          </ErrorBoundary>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>ISS Live Data System v1.0.4</span>
          <span>© 2026 Mission Control</span>
        </footer>
      </div>

      {/* Floating Chatbot */}
      <ChatBot />
    </div>
  )
}
