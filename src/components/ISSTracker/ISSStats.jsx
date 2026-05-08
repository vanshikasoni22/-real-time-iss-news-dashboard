import { useISS } from '../../context/ISSContext'
import { SkeletonStat } from '../UI/Skeleton'

const stats = [
  { key: 'latitude', label: 'Latitude', icon: '🌐', format: v => `${parseFloat(v).toFixed(4)}°` },
  { key: 'longitude', label: 'Longitude', icon: '🗺️', format: v => `${parseFloat(v).toFixed(4)}°` },
  { key: 'speed', label: 'Speed', icon: '⚡', format: v => `${v.toLocaleString()} km/h` },
  { key: 'location', label: 'Nearest Location', icon: '📍', format: v => v },
]

export default function ISSStats({ positionCount, onRefresh }) {
  const { position, speed, location, loading, lastUpdated } = useISS()

  if (loading && !position) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map(i => <SkeletonStat key={i} />)}
      </div>
    )
  }

  const values = {
    latitude: position?.latitude ?? '—',
    longitude: position?.longitude ?? '—',
    speed,
    location,
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => (
          <div key={s.key} className="stat-card animate-fade-in">
            <div className="stat-label flex items-center gap-1">
              <span>{s.icon}</span> {s.label}
            </div>
            <div className="stat-value text-xl leading-tight truncate">
              {values[s.key] != null && values[s.key] !== '—'
                ? s.format(values[s.key])
                : <span className="text-slate-400 text-base">Fetching...</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between card px-4 py-3">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            📡 <span className="font-semibold text-slate-700 dark:text-slate-200">{positionCount}</span> positions tracked
          </span>
          {lastUpdated && (
            <span className="text-slate-400 dark:text-slate-500 text-xs hidden sm:block">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">LIVE</span>
          </span>
          <button id="iss-refresh-btn" onClick={onRefresh} className="btn-ghost text-xs px-2 py-1">
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
