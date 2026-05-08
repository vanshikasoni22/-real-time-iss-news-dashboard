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
  const { data } = await axios.get('/api/geocode', {
    params: {
      lat,
      lon,
      zoom: 5
    }
  });

  if (data.status === 'error') {
    throw new Error(data.message || 'Unable to reverse geocode ISS position.');
  }

  return data.display_name || data.name || 'Over open ocean';
}

export async function fetchNewsCategory(category) {
  const { data } = await axios.get('/api/news', {
    params: {
      endpoint: 'everything',
      q: category,
      pageSize: 5,
      sortBy: 'publishedAt',
      language: 'en'
    }
  });

  if (data.status === 'error') {
    throw new Error(data.message || `Unable to load ${category} news.`);
  }

  return (data.articles || []).map((article) => ({
    ...article,
    category
  }));
}

export async function askHuggingFace(prompt) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Assistant request failed with status ${response.status}`);
  }

  return data.text || 'I could not produce an answer from the current dashboard data.';
}
