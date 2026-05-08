import { useState } from 'react'
import ThemeToggle from './components/UI/ThemeToggle'
import ISSMap from './components/ISSTracker/ISSMap'
import ISSStats from './components/ISSTracker/ISSStats'
import NewsFeed from './components/NewsSection/NewsFeed'
import SpeedChart from './components/Charts/SpeedChart'
import NewsDonutChart from './components/Charts/NewsDonutChart'
import ChatBot from './components/Chatbot/ChatBot'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { useISSTracker } from './hooks/useISSTracker'

export default function App() {
  const { manualRefresh, positionCount } = useISSTracker()
  const [activeTab, setActiveTab] = useState('iss')

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] mb-1">Mission Control Dashboard</p>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real-Time ISS and News Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab(activeTab === 'iss' ? 'news' : 'iss')}
              className="btn-primary"
            >
              Switch to {activeTab === 'iss' ? 'News' : 'Tracker'}
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main>
          {activeTab === 'iss' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
              {/* Left Column: Tracking & Map */}
              <div className="lg:col-span-8 space-y-6">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold flex items-center gap-2">ISS Live Tracking</h2>
                    <div className="flex items-center gap-4">
                      <button onClick={manualRefresh} className="btn-primary text-xs">Refresh Now</button>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Refresh: ON</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <ISSStats positionCount={positionCount} onRefresh={manualRefresh} />
                  </div>

                  <div className="h-[400px]">
                    <ISSMap />
                  </div>
                </section>
              </div>

              {/* Right Column: Speed Trend & Chart */}
              <div className="lg:col-span-4 space-y-6">
                <section className="space-y-4">
                  <h2 className="text-lg font-bold">ISS Speed Trend</h2>
                  <div className="h-[300px]">
                    <SpeedChart />
                  </div>
                </section>
                <section className="space-y-4">
                  <h2 className="text-lg font-bold">News Distribution</h2>
                  <div className="h-[250px]">
                    <NewsDonutChart />
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <NewsFeed />
            </div>
          )}
        </main>

        <footer className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>ISS Live Data System v1.0.4</span>
          <span>© 2026 Mission Control</span>
        </footer>
      </div>

      <ChatBot />
    </div>
  )
}
