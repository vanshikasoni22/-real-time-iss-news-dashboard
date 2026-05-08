import { useEffect, useRef } from 'react'

export default function ChatMessage({ message }) {
  const { role, text, ts, isError } = message
  const isUser = role === 'user'
  const time = ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-[80%] space-y-1`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${isUser
              ? 'bg-brand-600 text-white rounded-br-sm'
              : isError
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-bl-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm'
            }`}
        >
          {text}
        </div>
        <p className={`text-[10px] text-slate-400 ${isUser ? 'text-right' : 'text-left'}`}>{time}</p>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}
