export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateSpeed(previous, current) {
  if (!previous || !current) return 0;

  const distance = haversineDistance(previous.lat, previous.lon, current.lat, current.lon);
  const seconds = Math.max(1, current.timestamp - previous.timestamp);
  return distance / (seconds / 3600);
}
