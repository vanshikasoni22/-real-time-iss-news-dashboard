const QWEN_MODEL = 'Qwen/Qwen3-4B-Instruct-2507:featherless-ai';

async function readJsonBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', message: 'Method not allowed.' });
    return;
  }

  const token = process.env.VITE_HF_TOKEN;

  if (!token || token === 'your_huggingface_token_here') {
    res.status(500).json({ status: 'error', message: 'Missing VITE_HF_TOKEN on the server.' });
    return;
  }

  try {
    const { prompt } = await readJsonBody(req);

    if (!prompt) {
      res.status(400).json({ status: 'error', message: 'prompt is required.' });
      return;
    }

    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: QWEN_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300
      })
    });

    const textBody = await response.text();
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? JSON.parse(textBody) : null;

    if (!response.ok) {
      res.status(response.status).json({
        status: 'error',
        message: data?.error?.message || data?.error || `Assistant request failed with status ${response.status}`
      });
      return;
    }

    const text = data?.choices?.[0]?.message?.content;
    res.status(200).json({ text: text?.trim() || 'I could not produce an answer from the current dashboard data.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
