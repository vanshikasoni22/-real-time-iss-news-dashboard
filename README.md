# Real-Time ISS & News Dashboard

A React + Vite dashboard for tracking the International Space Station, reading technology and science headlines, and chatting with an AI assistant constrained to the current dashboard data.

## Features

- Live ISS position refresh every 15 seconds
- Leaflet map with custom ISS marker, tooltip, and trajectory polyline
- Haversine speed calculation from consecutive positions
- Reverse geocoded nearest location via OpenStreetMap Nominatim
- People currently in space from Open Notify
- NewsAPI technology and science feeds with cache, search, sort, and retry
- Chart.js ISS speed line chart and news distribution doughnut chart
- Hugging Face chatbot that only answers from dashboard context
- Light and dark themes, skeleton loaders, toast notifications, and error boundaries

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill in your API keys in `.env` before using the news and chatbot features.
