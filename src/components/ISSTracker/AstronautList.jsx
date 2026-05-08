import { useISS } from '../../context/ISSContext'
import { SkeletonCard } from '../UI/Skeleton'

export default function AstronautList() {
  const { astronauts, loading } = useISS()

  if (loading && astronauts.number === 0) {
    return <SkeletonCard lines={5} />
  }

  return (
    <div className="card p-4 space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="section-title flex items-center gap-2">
          👨‍🚀 People in Space
        </h3>
        <span className="badge bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
          {astronauts.number} aboard
        </span>
      </div>

      {astronauts.people.length === 0 ? (
        <p className="text-sm text-slate-400">Loading crew data...</p>
      ) : (
        <ul className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {astronauts.people.map((person, i) => (
            <li key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-lg">
                {['👨‍🚀', '👩‍🚀', '🧑‍🚀'][i % 3]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                  {person.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {person.craft}
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
