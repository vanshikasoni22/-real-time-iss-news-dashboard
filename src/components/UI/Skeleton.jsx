export function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`card p-4 space-y-3 ${className}`}>
      <div className="skeleton h-4 rounded-lg w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton h-3 rounded-lg ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  )
}

export function SkeletonStat({ className = '' }) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="skeleton h-3 w-16 rounded" />
      <div className="skeleton h-8 w-24 rounded-lg mt-1" />
      <div className="skeleton h-3 w-20 rounded mt-1" />
    </div>
  )
}

export function SkeletonText({ width = 'full', height = 4 }) {
  return <div className={`skeleton h-${height} w-${width} rounded-lg`} />
}

export function SkeletonMap({ className = '' }) {
  return (
    <div className={`skeleton rounded-2xl ${className}`} style={{ minHeight: 320 }} />
  )
}
