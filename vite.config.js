import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
}

function newsApiProxy(apiKey) {
  return {
    name: 'newsapi-local-proxy',
    configureServer(server) {
      server.middlewares.use('/api/news', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'GET') {
          sendJson(res, 405, { status: 'error', message: 'Method not allowed.' });
          return;
        }

        if (!apiKey || apiKey === 'your_newsapi_key_here') {
          sendJson(res, 500, { status: 'error', message: 'Missing VITE_NEWS_API_KEY in .env.' });
          return;
        }

        const { searchParams } = new URL(req.url || '', 'http://localhost');
        searchParams.set('apiKey', apiKey);
        searchParams.delete('vercel-sc-query');

        const path = searchParams.get('endpoint') || 'top-headlines';
        searchParams.delete('endpoint');

        try {
          const response = await fetch(`https://newsapi.org/v2/${path}?${searchParams.toString()}`, {
            headers: {
              'User-Agent': 'FOAI-Dashboard-App'
            }
          });
          const data = await response.json();
          sendJson(res, response.status, data);
        } catch (error) {
          sendJson(res, 500, { status: 'error', message: error.message });
        }
      });
    }
  };
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        if (chunks.length === 0) {
          resolve({});
          return;
        }
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function geocodeProxy() {
  return {
    name: 'nominatim-local-proxy',
    configureServer(server) {
      server.middlewares.use('/api/geocode', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'GET') {
          sendJson(res, 405, { status: 'error', message: 'Method not allowed.' });
          return;
        }

        const { searchParams } = new URL(req.url || '', 'http://localhost');
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');

        if (!lat || !lon) {
          sendJson(res, 400, { status: 'error', message: 'lat and lon are required.' });
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
            sendJson(res, 200, { display_name: 'Over open ocean or remote region' });
            return;
          }

          sendJson(res, 200, JSON.parse(text));
        } catch (error) {
          sendJson(res, 200, { display_name: 'Over open ocean or remote region', note: error.message });
        }
      });
    }
  };
}

function chatProxy(token) {
  const model = 'Qwen/Qwen3-4B-Instruct-2507:featherless-ai';

  return {
    name: 'huggingface-qwen-local-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, { status: 'error', message: 'Method not allowed.' });
          return;
        }

        if (!token || token === 'your_huggingface_token_here') {
          sendJson(res, 500, { status: 'error', message: 'Missing VITE_HF_TOKEN in .env.' });
          return;
        }

        try {
          const { prompt } = await readRequestBody(req);

          if (!prompt) {
            sendJson(res, 400, { status: 'error', message: 'prompt is required.' });
            return;
          }

          const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: prompt }],
              max_tokens: 300
            })
          });

          const textBody = await response.text();
          const contentType = response.headers.get('content-type') || '';
          const data = contentType.includes('application/json') ? JSON.parse(textBody) : null;

          if (!response.ok) {
            sendJson(res, response.status, {
              status: 'error',
              message: data?.error?.message || data?.error || `Assistant request failed with status ${response.status}`
            });
            return;
          }

          const text = data?.choices?.[0]?.message?.content;
          sendJson(res, 200, {
            text: text?.trim() || 'I could not produce an answer from the current dashboard data.'
          });
        } catch (error) {
          sendJson(res, 500, { status: 'error', message: error.message });
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      newsApiProxy(env.VITE_NEWS_API_KEY || process.env.VITE_NEWS_API_KEY),
      geocodeProxy(),
      chatProxy(env.VITE_HF_TOKEN || process.env.VITE_HF_TOKEN)
    ]
  };
});
