import { Bot, Send, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToast } from '../../context/ToastContext.jsx';
import { askHuggingFace } from '../../services/api';
import { buildDashboardPrompt } from '../../utils/dashboardContext';
import { getStoredValue, setStoredValue } from '../../utils/storage';

const CHAT_KEY = 'dashboard-chat-messages';

export default function Chatbot({ issData, articles }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => getStoredValue(CHAT_KEY, []));
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const { notify } = useToast();

  const contextPrompt = useMemo(() => buildDashboardPrompt({ issData, articles }), [articles, issData]);

  useEffect(() => {
    setStoredValue(CHAT_KEY, messages.slice(-30));
  }, [messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || typing) return;

    const nextUserMessage = { id: crypto.randomUUID(), role: 'user', content: question };
    setMessages((current) => [...current, nextUserMessage].slice(-30));
    setInput('');
    setTyping(true);

    try {
      const prompt = `${contextPrompt}

User question: ${question}
Answer briefly and only from the dashboard data.`;
      const answer = await askHuggingFace(prompt);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: answer }].slice(-30));
    } catch (caught) {
      const message = caught.message || 'Assistant failed to respond.';
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: message }].slice(-30));
      notify(message, 'error');
    } finally {
      setTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    notify('Chat cleared', 'success');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-[900] inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-panel transition hover:bg-teal-600"
        aria-label="Open dashboard assistant"
        title="Dashboard assistant"
      >
        {open ? <X size={24} /> : <Bot size={25} />}
      </button>

      {open ? (
        <aside className="fixed bottom-24 right-5 z-[900] flex h-[min(620px,calc(100vh-8rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">Dashboard Assistant</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Answers only from current ISS and news data</p>
            </div>
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <Trash2 size={17} />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <p className="rounded-md bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Ask about the ISS position, speed, people in space, or loaded headlines.
              </p>
            ) : null}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-md px-3 py-2 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'ml-auto bg-teal-500 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {message.content}
              </div>
            ))}
            {typing ? (
              <div className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 dark:bg-slate-800">
                <span className="typing-dot h-2 w-2 rounded-full bg-teal-500" />
                <span className="typing-dot h-2 w-2 rounded-full bg-teal-500" />
                <span className="typing-dot h-2 w-2 rounded-full bg-teal-500" />
              </div>
            ) : null}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-800">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask from dashboard data"
              className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              disabled={typing}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-500 text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send message"
              title="Send"
            >
              <Send size={17} />
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
}
