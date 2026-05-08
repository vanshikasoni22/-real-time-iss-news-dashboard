export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    res.status(400).json({ status: 'error', message: 'lat and lon are required.' });
    return;
  }

  const url = new URL('https://nominatim.openstreetmap.org/reverse');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('lat', lat);
  url.searchParams.set('lon', lon);
  url.searchParams.set('zoom', searchParams.get('zoom') || '5');

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'FOAI-Dashboard-App/1.0'
      }
    });
    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok || !contentType.includes('application/json')) {
      res.status(200).json({ display_name: 'Over open ocean or remote region' });
      return;
    }

    res.status(200).json(JSON.parse(text));
  } catch (error) {
    res.status(200).json({ display_name: 'Over open ocean or remote region', note: error.message });
  }
}
