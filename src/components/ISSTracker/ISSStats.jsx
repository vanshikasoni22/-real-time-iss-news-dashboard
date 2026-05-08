import { useISS } from '../../context/ISSContext'

export default function ISSStats({ positionCount }) {
  const { position, speed, location } = useISS()

  const stats = [
    { label: 'Latitude / Longitude', value: position ? `${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}` : '—' },
    { label: 'Speed', value: speed ? `${speed.toLocaleString()} km/h` : '—' },
    { label: 'Nearest Place', value: location || '—' },
    { label: 'Tracked Positions', value: positionCount || '0' },
  ]

  return (
    <>
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <p className="stat-label mb-1">{s.label}</p>
          <p className="stat-value">{s.value}</p>
        </div>
      ))}
    </>
  )
}
