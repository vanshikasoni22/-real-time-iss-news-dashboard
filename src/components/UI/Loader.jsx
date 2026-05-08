export default function Loader({ size = 'md', label = 'Loading...' }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-4' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <div className={`${sizes[size]} rounded-full border-brand-200 dark:border-slate-700 border-t-brand-600 animate-spin`} />
      {label && <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>}
    </div>
  )
}
