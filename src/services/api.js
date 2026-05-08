import axios from 'axios';

const openNotify = axios.create({
  baseURL: 'http://api.open-notify.org'
});

export async function fetchISSPosition() {
  const { data } = await openNotify.get('/iss-now.json');
  return {
    lat: Number(data.iss_position.latitude),
    lon: Number(data.iss_position.longitude),
    timestamp: Number(data.timestamp)
  };
}

export async function fetchAstronauts() {
  const { data } = await openNotify.get('/astros.json');
  return data;
}

export async function reverseGeocode(lat, lon) {
  const { data } = await axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      format: 'jsonv2',
      lat,
      lon,
      zoom: 5
    },
    headers: {
      Accept: 'application/json'
    }
  });

  return data.display_name || data.name || 'Over open ocean';
}

export async function fetchNewsCategory(category) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    throw new Error('Add VITE_NEWS_API_KEY to .env to load live news.');
  }

  const { data } = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: category,
      pageSize: 5,
      sortBy: 'publishedAt',
      language: 'en',
      apiKey
    }
  });

  return (data.articles || []).map((article) => ({
    ...article,
    category
  }));
}

export async function askHuggingFace(prompt) {
  const token = import.meta.env.VITE_HF_TOKEN;
  if (!token || token === 'your_huggingface_token_here') {
    throw new Error('Add VITE_HF_TOKEN to .env to use the assistant.');
  }

  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 300 }
    })
  });

  if (!response.ok) {
    throw new Error(`Assistant request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
  return text?.replace(prompt, '').trim() || 'I could not produce an answer from the current dashboard data.';
}
