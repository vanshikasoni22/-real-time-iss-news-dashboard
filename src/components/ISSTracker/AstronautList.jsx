import { useISS } from '../../context/ISSContext'
import { SkeletonCard } from '../UI/Skeleton'

export default function AstronautList() {
  const { astronauts, loading } = useISS()

  if (loading && astronauts.number === 0) {
    return <SkeletonCard lines={5} />
  }

  return (
    <div className="glass-card p-6 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Active Crew
        </h3>
        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold rounded-full border border-purple-500/20">
          {astronauts.number} SOULS ABOARD
        </span>
      </div>

      {astronauts.people.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs text-slate-400 animate-pulse">Establishing connection to manifest...</p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {astronauts.people.map((person, i) => (
            <li key={i} className="group flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-transparent hover:border-purple-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-transform">
                {['👨‍🚀', '👩‍🚀', '🧑‍🚀'][i % 3]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                  {person.name}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                  {person.craft} Station
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="text-[8px] font-bold text-green-500">LIVE</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

