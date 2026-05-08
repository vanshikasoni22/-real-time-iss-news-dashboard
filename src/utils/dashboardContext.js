export function buildDashboardPrompt({ issData, articles }) {
  const headlines = articles
    .slice(0, 10)
    .map((article, index) => `${index + 1}. ${article.title} (${article.source?.name || 'Unknown source'})`)
    .join('\n');

  const issSummary = issData?.current
    ? `ISS is at latitude ${issData.current.lat.toFixed(4)}, longitude ${issData.current.lon.toFixed(4)}, moving at ${Math.round(issData.current.speed)} km/h near ${issData.location || 'an unknown location'}.`
    : 'ISS data is currently unavailable.';

  return `You are a dashboard assistant. Only answer using this data. Do not use outside knowledge.

${issSummary}
Positions tracked: ${issData?.positions?.length || 0}.
People in space: ${issData?.astronauts?.number || 0}.

News headlines:
${headlines || 'No news headlines are loaded.'}`;
}
