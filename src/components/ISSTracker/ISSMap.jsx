import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useISS } from '../../context/ISSContext'

// Custom ISS SVG icon
const issIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
  <circle cx="32" cy="32" r="10" fill="#6366f1" stroke="#fff" stroke-width="2"/>
  <rect x="4" y="29" width="56" height="6" rx="3" fill="#94a3b8" stroke="#6366f1" stroke-width="1.5"/>
  <rect x="14" y="20" width="36" height="8" rx="2" fill="#cbd5e1" stroke="#6366f1" stroke-width="1"/>
  <rect x="14" y="36" width="36" height="8" rx="2" fill="#cbd5e1" stroke="#6366f1" stroke-width="1"/>
  <circle cx="32" cy="32" r="5" fill="#fff" stroke="#6366f1" stroke-width="1.5"/>
  <circle cx="32" cy="32" r="2" fill="#6366f1"/>
</svg>`

const issIcon = L.divIcon({
  html: issIconSvg,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
})

function MapPanner({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo([position.latitude, position.longitude], map.getZoom(), { duration: 1.2 })
    }
  }, [position, map])
  return null
}

export default function ISSMap() {
  const { position, history, speed, location, loading } = useISS()

  const polylinePositions = history.map(p => [p.latitude, p.longitude])
  const center = position
    ? [position.latitude, position.longitude]
    : [0, 0]

  return (
    <div className="card overflow-hidden" style={{ minHeight: 360 }}>
      {loading && !position ? (
        <div className="skeleton w-full" style={{ minHeight: 360 }} />
      ) : (
        <MapContainer
          center={center}
          zoom={3}
          style={{ height: 360, width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CartoDB'
          />

          {/* Trajectory polyline */}
          {polylinePositions.length > 1 && (
            <Polyline
              positions={polylinePositions}
              color="#6366f1"
              weight={2.5}
              opacity={0.7}
              dashArray="6 6"
            />
          )}

          {/* ISS Marker */}
          {position && (
            <Marker position={[position.latitude, position.longitude]} icon={issIcon}>
              <Tooltip permanent direction="top" offset={[0, -28]} className="!bg-slate-900 !text-white !border-brand-500 !rounded-xl !text-xs !font-medium">
                <div className="space-y-0.5 py-0.5">
                  <div>🛸 ISS Live</div>
                  <div>📍 {position.latitude.toFixed(3)}°, {position.longitude.toFixed(3)}°</div>
                  <div>⚡ {speed.toLocaleString()} km/h</div>
                  {location && <div>🌍 {location}</div>}
                </div>
              </Tooltip>
            </Marker>
          )}

          <MapPanner position={position} />
        </MapContainer>
      )}
    </div>
  )
}
