export function formatCoordinate(value) {
  return Number(value).toFixed(4);
}

export function formatSpeed(value) {
  if (!Number.isFinite(value)) return '0';
  return Math.round(value).toLocaleString();
}

export function formatDate(value) {
  if (!value) return 'Unknown date';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

export function formatTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(value));
}
