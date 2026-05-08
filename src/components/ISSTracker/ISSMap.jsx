import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { formatCoordinate, formatSpeed } from '../../utils/formatters';

function createISSIcon() {
  return L.divIcon({
    className: 'custom-iss-icon',
    html: `
      <div style="width:44px;height:44px;border-radius:999px;background:#14b8a6;display:grid;place-items:center;border:3px solid white;box-shadow:0 10px 30px rgba(20,184,166,.45)">
        <span style="font-size:11px;font-weight:800;letter-spacing:0;color:white;line-height:1">ISS</span>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
}

function MapAutoPan({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lon], map.getZoom(), { duration: 1.2 });
    }
  }, [map, position]);

  return null;
}

export default function ISSMap({ positions, current }) {
  const path = useMemo(() => positions.map((point) => [point.lat, point.lon]), [positions]);
  const icon = useMemo(() => createISSIcon(), []);
  const center = current ? [current.lat, current.lon] : [0, 0];

  return (
    <div className="h-[360px] overflow-hidden rounded-md border border-slate-200 shadow-sm dark:border-slate-800 lg:h-[460px]">
      <MapContainer center={center} zoom={3} minZoom={2} maxZoom={8} scrollWheelZoom className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {path.length > 1 ? <Polyline positions={path} pathOptions={{ color: '#14b8a6', weight: 3 }} /> : null}
        {current ? (
          <Marker position={[current.lat, current.lon]} icon={icon}>
            <Tooltip permanent={false} direction="top">
              <div>
                <strong>ISS</strong>
                <br />
                Lat {formatCoordinate(current.lat)}, Lon {formatCoordinate(current.lon)}
                <br />
                {formatSpeed(current.speed)} km/h
              </div>
            </Tooltip>
          </Marker>
        ) : null}
        <MapAutoPan position={current} />
      </MapContainer>
    </div>
  );
}
