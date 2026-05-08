// Reverse geocoding via Nominatim — returns human-readable location name
// Rate-limited to 1 request per second per Nominatim policy

let lastCallTime = 0
const MIN_INTERVAL_MS = 1200 // ~1 req/s

export async function reverseGeocode(lat, lon) {
  const now = Date.now()
  const wait = MIN_INTERVAL_MS - (now - lastCallTime)
  if (wait > 0) await new Promise(r => setTimeout(r, wait))
  lastCallTime = Date.now()

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'en', 'User-Agent': 'ISS-Dashboard/1.0' }
    })
    if (!res.ok) return 'Over ocean / unknown'
    const data = await res.json()
    if (data.error) return 'Over ocean / unknown'
    const addr = data.address
    return (
      addr.country ||
      addr.state ||
      addr.city ||
      addr.town ||
      data.display_name?.split(',').slice(-2).join(',').trim() ||
      'Unknown location'
    )
  } catch {
    return 'Location unavailable'
  }
}
