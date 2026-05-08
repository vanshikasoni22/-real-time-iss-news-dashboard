import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label="Toggle dark/light mode"
      className="btn-primary text-sm"
    >
      {dark ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  )
}
