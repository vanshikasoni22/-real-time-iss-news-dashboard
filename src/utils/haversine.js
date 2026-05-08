// Haversine formula — returns distance in km between two lat/lon points
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Calculate speed in km/h given two positions and elapsed seconds
export function calculateSpeed(pos1, pos2, elapsedSeconds = 15) {
  const dist = haversineDistance(
    parseFloat(pos1.latitude), parseFloat(pos1.longitude),
    parseFloat(pos2.latitude), parseFloat(pos2.longitude)
  )
  const hours = elapsedSeconds / 3600
  return dist / hours
}
