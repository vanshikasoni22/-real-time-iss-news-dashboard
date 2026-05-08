import { useState } from 'react'
import ThemeToggle from './components/UI/ThemeToggle'
import ISSMap from './components/ISSTracker/ISSMap'
import ISSStats from './components/ISSTracker/ISSStats'
import AstronautList from './components/ISSTracker/AstronautList'
import NewsFeed from './components/NewsSection/NewsFeed'
import SpeedChart from './components/Charts/SpeedChart'
import NewsDonutChart from './components/Charts/NewsDonutChart'
import ChatBot from './components/Chatbot/ChatBot'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { useISSTracker } from './hooks/useISSTracker'

const NAV_ITEMS = [
  { id: 'iss', label: 'ISS Tracker', icon: '🛸' },
  { id: 'news', label: 'News Feed', icon: '📰' },
  { id: 'charts', label: 'Charts', icon: '📊' },
]

function ISSSection({ manualRefresh, positionCount }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          🛸 ISS Live Tracker
        </h2>
        <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1">
          ● Auto-updates every 15s
        </span>
      </div>
      <ErrorBoundary>
        <ISSMap />
      </ErrorBoundary>
      <ErrorBoundary>
        <ISSStats positionCount={positionCount} onRefresh={manualRefresh} />
      </ErrorBoundary>
      <ErrorBoundary>
        <AstronautList />
      </ErrorBoundary>
    </div>
  )
}

function AppInner() {
  const { manualRefresh, positionCount } = useISSTracker()
  const [activeNav, setActiveNav] = useState('iss')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-lg shadow-sm">
              🛸
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">ISS Dashboard</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Live tracking & news</p>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeNav === item.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* ISS Tab */}
        {activeNav === 'iss' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
            {/* Map + stats - left 2 cols */}
            <div className="xl:col-span-2 space-y-4">
              <ISSSection manualRefresh={manualRefresh} positionCount={positionCount} />
            </div>
            {/* Speed chart + astronauts - right col */}
            <div className="space-y-4">
              <ErrorBoundary><SpeedChart /></ErrorBoundary>
              <ErrorBoundary><NewsDonutChart /></ErrorBoundary>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeNav === 'news' && (
          <div className="animate-fade-in">
            <ErrorBoundary>
              <NewsFeed />
            </ErrorBoundary>
          </div>
        )}

        {/* Charts Tab */}
        {activeNav === 'charts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <ErrorBoundary><SpeedChart /></ErrorBoundary>
            <ErrorBoundary><NewsDonutChart /></ErrorBoundary>
            <div className="md:col-span-2">
              <ErrorBoundary><ISSMap /></ErrorBoundary>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 dark:text-slate-600">
        ISS & News Dashboard — Data: Open Notify API, NewsAPI, Nominatim • Built with React + Vite + Tailwind
      </footer>

      {/* Floating AI Chatbot */}
      <ErrorBoundary>
        <ChatBot />
      </ErrorBoundary>
    </div>
  )
}

export default function App() {
  return <AppInner />
}
