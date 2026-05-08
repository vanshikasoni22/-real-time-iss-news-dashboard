import { useState, useCallback, useEffect } from 'react'
import { useISS } from '../context/ISSContext'
import { useNews } from '../context/NewsContext'

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN
const STORAGE_KEY = 'iss-chat-messages'
const MAX_MESSAGES = 30

export function useChatbot() {
  const { position, speed, location } = useISS()
  const { articles } = useNews()

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved).slice(-MAX_MESSAGES) : []
    } catch { return [] }
  })
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)))
    } catch {}
  }, [messages])

  const buildContext = useCallback(() => {
    const lat = position?.latitude?.toFixed(4) ?? 'unknown'
    const lon = position?.longitude?.toFixed(4) ?? 'unknown'
    const spd = speed ?? 'unknown'
    const loc = location ?? 'unknown'

    const allArticles = [...(articles.technology || []), ...(articles.science || [])]
    const headlines = allArticles
      .slice(0, 8)
      .map((a, i) => `${i + 1}. [${a.source?.name}] ${a.title}`)
      .join('\n')

    return `You are a helpful dashboard assistant. ONLY answer questions using the data below. Do NOT use outside knowledge or make things up.

CURRENT DATA:
- ISS Position: Latitude ${lat}°, Longitude ${lon}°
- ISS Speed: ${spd} km/h
- ISS Nearest Location: ${loc}

RECENT NEWS HEADLINES:
${headlines || 'No headlines loaded yet.'}

Answer only what can be determined from this data. If the user asks something outside this data, say "I can only answer based on current dashboard data."`
  }, [position, speed, location, articles])

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return
    setError(null)

    const userMsg = { role: 'user', text: userText, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      if (!HF_TOKEN || HF_TOKEN === 'your_huggingface_token_here') {
        throw new Error('NO_HF_TOKEN')
      }

      const systemPrompt = buildContext()
      const prompt = `<s>[INST] ${systemPrompt}\n\nUser: ${userText} [/INST]`

      const res = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { max_new_tokens: 300, temperature: 0.7, return_full_text: false },
          }),
        }
      )

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      let reply = Array.isArray(data)
        ? data[0]?.generated_text || 'No response generated.'
        : data?.generated_text || 'No response generated.'

      // Strip any echoed prompt
      reply = reply.replace(/\[INST\][\s\S]*?\[\/INST\]/g, '').trim()
      if (!reply) reply = 'Sorry, I couldn\'t generate a response. Try again.'

      setMessages(prev => [...prev, { role: 'assistant', text: reply, ts: Date.now() }])
    } catch (err) {
      const msg = err.message === 'NO_HF_TOKEN'
        ? 'HuggingFace token not set. Add VITE_HF_TOKEN to your .env file.'
        : `Error: ${err.message}`
      setMessages(prev => [...prev, { role: 'assistant', text: msg, ts: Date.now(), isError: true }])
      setError(msg)
    } finally {
      setIsTyping(false)
    }
  }, [buildContext])

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { messages, isTyping, error, sendMessage, clearChat }
}
