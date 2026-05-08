import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label="Toggle dark/light mode"
      className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      style={{ background: dark ? '#6366f1' : '#cbd5e1' }}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 flex items-center justify-center text-xs
          ${dark ? 'translate-x-6' : 'translate-x-0'}`}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
