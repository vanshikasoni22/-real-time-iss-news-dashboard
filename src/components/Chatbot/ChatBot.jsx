import { useState, useRef, useEffect } from 'react'
import { useChatbot } from '../../hooks/useChatbot'
import ChatMessage, { TypingIndicator } from './ChatMessage'

const SUGGESTED = [
  'Where is the ISS right now?',
  'How fast is the ISS moving?',
  'Who is in space right now?',
  'What are the latest headlines?',
]

export default function ChatBot() {
  const [open, setOpen]   = useState(false)
  const [input, setInput] = useState('')
  const { messages, isTyping, sendMessage, clearChat } = useChatbot()
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open, messages, isTyping])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isTyping) return
    setInput('')
    sendMessage(text)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <>
      {/* Floating toggle */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI chatbot"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-2xl text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{ 
          background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
          boxShadow: '0 8px 32px rgba(37,99,235,0.4)' 
        }}
      >
        {open ? (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          id="chatbot-window"
          className="fixed bottom-28 right-8 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-card flex flex-col overflow-hidden animate-slideUp"
          style={{ height: 520 }}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none">Astro Intel AI</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Always Standby</span>
                  </div>
                </div>
              </div>
              <button
                id="chatbot-clear-btn"
                onClick={clearChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                title="Clear conversations"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-main)]">
            {messages.length === 0 && (
              <div className="space-y-4 pt-4">
                <div className="text-center space-y-2 px-4">
                  <p className="text-sm font-bold text-[var(--text-primary)]">Greetings, Commander!</p>
                  <p className="text-xs text-[var(--text-secondary)]">I'm your AI assistant for orbital data and global intelligence. How can I help you today?</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      onClick={() => { if (!isTyping) sendMessage(q) }}
                      className="text-xs text-left px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex items-center gap-2">
              <input
                id="chatbot-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                id="chatbot-send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-40 shadow-lg shadow-blue-500/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

