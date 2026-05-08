import { useState, useCallback, useEffect } from 'react'
import { useISS } from '../context/ISSContext'
import { useNews } from '../context/NewsContext'

const STORAGE_KEY = 'iss-chat-messages'
const MAX_MESSAGES = 30

// ── Fully local rule-based AI ──────────────────────────────────────────────
function localAI(userText, issData, newsData) {
  const q = userText.toLowerCase().trim()

  const { position, speed, location, astronauts, lastUpdated } = issData
  const lat  = position?.latitude?.toFixed(4)  ?? '—'
  const lon  = position?.longitude?.toFixed(4) ?? '—'
  const spd  = speed ? `${speed.toLocaleString()} km/h` : '—'
  const loc  = location ?? 'unknown'
  const crew = astronauts?.people ?? []
  const headlineList = newsData
    .slice(0, 6)
    .map((a, i) => `${i + 1}. ${a.title} (${a.source?.name})`)
    .join('\n')

  // ISS position
  if (/(where|position|location|coordinates|lat|lon)/i.test(q) && /(iss|station|space station)/i.test(q)) {
    return `🛸 The ISS is currently at:\n• Latitude: ${lat}°\n• Longitude: ${lon}°\n• Nearest location: ${loc}\n\nLast updated: ${lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'just now'}`
  }

  // ISS speed
  if (/(speed|fast|velocity|km\/h|mph)/i.test(q)) {
    return `🚀 The ISS is traveling at approximately **${spd}** — that's about 7.7 km per second, completing one orbit of Earth every ~92 minutes!`
  }

  // Astronauts / crew
  if (/(astronaut|crew|people|who|human|cosmonaut|aboard|space right now)/i.test(q)) {
    if (crew.length === 0) {
      return `👨‍🚀 There are ${astronauts?.number ?? 7} people aboard the ISS currently.`
    }
    const names = crew.map(p => `• ${p.name} (${p.craft})`).join('\n')
    return `👨‍🚀 There are **${crew.length} people** currently aboard the ISS:\n\n${names}`
  }

  // News / headlines
  if (/(news|headline|latest|top story|breaking)/i.test(q)) {
    if (!headlineList) return '📰 No news articles are currently loaded.'
    return `📰 Here are the latest headlines from the dashboard:\n\n${headlineList}`
  }

  // Orbit / altitude
  if (/(orbit|altitude|high|above earth)/i.test(q)) {
    return `🌍 The ISS orbits Earth at an altitude of approximately **408 km** (253 miles) above the surface. It completes 15.5 orbits per day.`
  }

  // ISS size / facts
  if (/(size|big|large|weight|mass|fact)/i.test(q)) {
    return `📏 ISS Quick Facts:\n• Length: 109 m (football field)\n• Mass: ~420,000 kg\n• Solar panels span: 73 m\n• Habitable volume: ~388 m³\n• Operating since: 2000`
  }

  // Temperature
  if (/(temperature|hot|cold|celsius|fahrenheit)/i.test(q)) {
    return `🌡️ Outside the ISS, temperatures swing from **-157°C** in shade to **+121°C** in direct sunlight. Inside, it's a comfortable **~22°C**.`
  }

  // Dashboard / help
  if (/(help|what can you|commands|about you|who are you)/i.test(q)) {
    return `🤖 I'm the Dashboard AI assistant! I can answer questions about:\n\n• 📍 ISS current position\n• 🚀 ISS speed and altitude\n• 👨‍🚀 Current crew members\n• 📰 Latest news headlines\n• 🛸 ISS facts and figures\n\nJust ask me anything!`
  }

  // Greeting
  if (/^(hi|hello|hey|good morning|good evening|howdy)/i.test(q)) {
    return `👋 Hello! I'm your Mission Control AI. I have live ISS data and the latest news right here. What would you like to know?`
  }

  // Thanks
  if (/(thank|thanks|great|awesome|cool)/i.test(q)) {
    return `😊 You're welcome! Ask me anything else about the ISS or the latest news.`
  }

  // Default
  return `🤔 I can only answer questions based on the current dashboard data:\n\n• ISS position (currently over ${loc})\n• ISS speed (${spd})\n• Current crew (${crew.length} people)\n• Latest news headlines\n\nTry asking: "Where is the ISS right now?" or "Who is in space?"`
}

export function useChatbot() {
  const { position, speed, location, astronauts, lastUpdated } = useISS()
  const { articles } = useNews()

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved).slice(-MAX_MESSAGES) : []
    } catch { return [] }
  })
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)))
    } catch {}
  }, [messages])

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isTyping) return

    const userMsg = { role: 'user', text: userText, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 600 + Math.random() * 600))

    const allNews = [...(articles.technology || []), ...(articles.science || [])]
    const reply = localAI(
      userText,
      { position, speed, location, astronauts, lastUpdated },
      allNews
    )

    setMessages(prev => [...prev, { role: 'assistant', text: reply, ts: Date.now() }])
    setIsTyping(false)
  }, [position, speed, location, astronauts, lastUpdated, articles, isTyping])

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { messages, isTyping, sendMessage, clearChat }
}
