import { useState, useRef, useEffect } from 'react'
import { useChatbot } from '../../hooks/useChatbot'
import ChatMessage, { TypingIndicator } from './ChatMessage'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, isTyping, sendMessage, clearChat } = useChatbot()
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
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

  const SUGGESTED = [
    'Where is the ISS right now?',
    'How fast is the ISS moving?',
    'What are the top news headlines?',
    'Who is in space right now?',
  ]

  return (
    <>
      {/* Floating toggle button */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.5)' }}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div
          id="chatbot-window"
          className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] card-glass flex flex-col animate-slide-up overflow-hidden"
          style={{ height: 480 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-brand-600 to-brand-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="text-sm font-semibold text-white">Dashboard AI</p>
                <p className="text-[10px] text-brand-200">Powered by Mistral-7B</p>
              </div>
            </div>
            <button
              id="chatbot-clear-btn"
              onClick={clearChat}
              className="text-brand-200 hover:text-white text-xs transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                  Ask me about the ISS or current news!
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs text-left px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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

          {/* Input */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input
              id="chatbot-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about ISS or news..."
              disabled={isTyping}
              className="input-field flex-1 text-xs py-2"
            />
            <button
              id="chatbot-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="btn-primary px-3 py-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}
