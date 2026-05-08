export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    res.status(500).json({ status: 'error', message: 'Missing VITE_NEWS_API_KEY on the server.' });
    return;
  }

  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  searchParams.set('apiKey', apiKey);
  searchParams.delete('vercel-sc-query');

  const path = searchParams.get('endpoint') || 'top-headlines';
  searchParams.delete('endpoint');

  const url = `https://newsapi.org/v2/${path}?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'FOAI-Dashboard-App'
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
