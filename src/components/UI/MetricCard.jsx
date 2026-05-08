export default function MetricCard({ label, value, detail, tone = 'default' }) {
  const toneClass =
    tone === 'teal'
      ? 'border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-900/70 dark:bg-teal-950/40 dark:text-teal-100'
      : 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100';

  return (
    <div className={`rounded-md border p-4 shadow-sm ${toneClass}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 break-words text-2xl font-semibold">{value}</p>
      {detail ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p> : null}
    </div>
  );
}
